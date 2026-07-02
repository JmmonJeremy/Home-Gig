package main

import (
	"bytes"
	"encoding/json"
	"io"
	"log"
	"net/http"
	"os"
	"strings"
	"time"
)

const goBaseURL = "http://localhost:8080"

func statusHandler(w http.ResponseWriter, r *http.Request) {
	response := map[string]interface{}{
		"service":   "Home Gig Go Service",
		"status":    "Online",
		"timestamp": time.Now().Format(time.RFC3339),
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}

func capabilitiesHandler(w http.ResponseWriter, r *http.Request) {
	checks := runSpreadsheetCapabilityChecks()

	spreadsheetGeneration := true
	for _, passed := range checks {
		if !passed {
			spreadsheetGeneration = false
			break
		}
	}

	generator := "Express"
	if spreadsheetGeneration {
		generator = "Go"
	}

	response := map[string]interface{}{
		"spreadsheetGeneration": spreadsheetGeneration,
		"generator":             generator,
		"checks":                checks,
		"timestamp":             time.Now().Format(time.RFC3339),
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}

func runSpreadsheetCapabilityChecks() map[string]bool {
	checks := map[string]bool{
		"hasReportEndpoint":         false,
		"canReceiveOrderData":       false,
		"canGenerateHomeGigCsvRows": false,
		"canReturnCsvResponse":      false,
	}

	testPayload := map[string]interface{}{
		"orders": []map[string]interface{}{
			{
				"orderNumber":   "TEST-1001",
				"customer":      "Test Customer",
				"orderDate":     time.Now().Format(time.RFC3339),
				"orderSummary":  "Eggs x1",
				"orderTotal":    10.00,
				"paymentStatus": "Paid",
				"paymentDate":   time.Now().Format(time.RFC3339),
			},
		},
	}

	payloadBytes, err := json.Marshal(testPayload)
	if err != nil {
		return checks
	}

	req, err := http.NewRequest(
		"POST",
		goBaseURL+"/reports/orders-payments",
		bytes.NewBuffer(payloadBytes),
	)
	if err != nil {
		return checks
	}

	req.Header.Set("Content-Type", "application/json")

	client := http.Client{
		Timeout: 2 * time.Second,
	}

	resp, err := client.Do(req)
	if err != nil {
		return checks
	}
	defer resp.Body.Close()

	if resp.StatusCode == http.StatusNotFound {
		return checks
	}

	checks["hasReportEndpoint"] = true

	if resp.StatusCode == http.StatusBadRequest || resp.StatusCode == http.StatusUnprocessableEntity {
		return checks
	}

	if resp.StatusCode >= 200 && resp.StatusCode < 300 {
		checks["canReceiveOrderData"] = true
	}

	contentType := resp.Header.Get("Content-Type")
	bodyBytes, err := io.ReadAll(resp.Body)
	if err != nil {
		return checks
	}

	body := string(bodyBytes)

	if strings.Contains(body, "Order #") &&
		strings.Contains(body, "Customer") &&
		strings.Contains(body, "Payment Status") {
		checks["canGenerateHomeGigCsvRows"] = true
	}

	if strings.Contains(contentType, "text/csv") && len(bodyBytes) > 0 {
		checks["canReturnCsvResponse"] = true
	}

	return checks
}

func main() {
	http.HandleFunc("/status", statusHandler)
	http.HandleFunc("/capabilities", capabilitiesHandler)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	log.Println("Home Gig Go Service running on port " + port)
	log.Fatal(http.ListenAndServe(":"+port, nil))
}