package reports

import (
    "os"
)

// Generate File - Generate a report file (e.g., CSV).
func GenerateCSVFile(data string) error {

    file, err := os.Create("orders.csv")

    if err != nil {
        return err
    }

    defer file.Close()

    _, err = 	file.
							WriteString(data)

    return err
}