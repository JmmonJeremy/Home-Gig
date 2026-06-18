import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-orders',
  standalone: false,
  templateUrl: './orders.html',
  styleUrl: './orders.css',
})
export class Orders implements OnInit {
  orders: any[] = [];
  errorMessage = '';
  isLoading = false;

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.orderService.getOrders().subscribe({
      next: (orders) => {
        this.orders = orders;
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Failed to load orders.';
        this.isLoading = false;
      }
    });
  }

  deleteOrder(id: string): void {
    if (!confirm('Are you sure you want to delete this order?')) {
      return;
    }

    this.orderService.deleteOrder(id).subscribe({
      next: () => this.loadOrders(),
      error: () => this.errorMessage = 'Failed to delete order.'
    });
  }
}
