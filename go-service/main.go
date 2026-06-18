package main

import (
	"encoding/json"
	"log"
	"net/http"
	"time"
)

func statusHandler(w http.ResponseWriter, r *http.Request) {
	response := map[string]string{
		"service":   "Home Gig Go Service",
		"status":    "Online",
		"timestamp": time.Now().Format(time.RFC3339),
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}

func main() {
	http.HandleFunc("/status", statusHandler)

	log.Println("Home Gig Go Service running on port 8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}