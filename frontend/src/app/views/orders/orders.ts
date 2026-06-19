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
  selectedOrder: any = null;
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

  getOrderSummary(order: any): string {
    if (!order.items || order.items.length === 0) {
      return '';
    }

    return order.items
      .map((item: any) => `${item.productName} x${item.quantity}`)
      .join(', ');
  }

  addOrderInline(): void {
    this.selectedOrder = {
      orderNumber: '',
      customerId: '',
      orderDateInput: new Date().toISOString().split('T')[0],
      items: [],
      orderTotal: 0,
      paymentStatus: 'Unpaid'
    };
  }

  selectOrder(order: any): void {
    this.selectedOrder = {
      ...order,
      customerId: order.customerId?._id || order.customerId,
      orderDateInput: order.orderDate
        ? new Date(order.orderDate).toISOString().split('T')[0]
        : ''
    };
  }

  clearSelectedOrder(): void {
    this.selectedOrder = null;
  }

  saveOrder(): void {
    this.errorMessage = '';

    const orderToSave = {
      orderNumber: this.selectedOrder.orderNumber,
      customerId: this.selectedOrder.customerId,
      orderDate: this.selectedOrder.orderDateInput,
      items: this.selectedOrder.items,
      orderTotal: this.selectedOrder.orderTotal,
      paymentStatus: this.selectedOrder.paymentStatus
    };

    if (this.selectedOrder._id) {
      this.orderService.updateOrder(this.selectedOrder._id, orderToSave).subscribe({
        next: () => {
          this.clearSelectedOrder();
          this.loadOrders();
        },
        error: () => this.errorMessage = 'Failed to update order.'
      });
    } else {
      this.orderService.createOrder(orderToSave).subscribe({
        next: () => {
          this.clearSelectedOrder();
          this.loadOrders();
        },
        error: () => this.errorMessage = 'Failed to create order.'
      });
    }
  }

  deleteOrder(id: string): void {
    if (!confirm('Are you sure you want to delete this order?')) {
      return;
    }

    this.orderService.deleteOrder(id).subscribe({
      next: () => {
        this.clearSelectedOrder();
        this.loadOrders();
      },
      error: () => this.errorMessage = 'Failed to delete order.'
    });
  }
}