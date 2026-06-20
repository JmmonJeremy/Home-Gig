package reports

import (
    "os"
)

// Current functionality: Generate a CSV file with provided data, it: #1 Creates a file named orders.csv 
// #2 Writes a string into it Closes the file #3 Returns any error. 

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