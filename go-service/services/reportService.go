package services

import (
    "fmt"
    "sort"
)

type Order struct {
    Customer string
    Total    float64
    Paid     bool
}

// Filter Data - Filterout unpaid orders.
func filterPaidOrders(orders []Order) []Order {
    var paidOrders []Order

    for _, order := range orders {
        if order.Paid {
            paidOrders = append(paidOrders, order)
        }
    }

    return paidOrders
}

// Organize Records - Put records in alphabetical order by customer name.
func OrganizeOrdersByCustomer(orders []Order) {
  sort.Slice(
		orders,
		func(i, j int) bool {
			return orders[i].
				Customer <
				orders[j].Customer
		},
	)
}

// Calculate Totals - Calculate the total amount of all paid orders.
var total float64

func CalculateTotal(orders []Order) float64 {
  var total float64

  for _, order :=
		range orders {

		total +=
			order.Total}

  return total
}

// Format Report - Format the report as a string.
func FormatReportRow(order Order) string {

	line := fmt.Sprintf(
		"%s, $%.2f, %t",

		order.Customer,
		order.Total,
		order.Paid,)

	return line
}
