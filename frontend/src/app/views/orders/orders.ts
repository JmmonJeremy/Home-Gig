import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { OrderService } from '../../services/order.service';
import { ProductService } from '../../services/product.service';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-orders',
  standalone: false,
  templateUrl: './orders.html',
  styleUrl: './orders.css',
})
export class Orders implements OnInit, OnDestroy {
  orders: any[] = [];
  filteredOrders: any[] = [];
  products: any[] = [];
  selectedOrder: any = null;
  errorMessage = '';
  isLoading = false;
  searchQuery = '';
  private readonly subscriptions = new Subscription();

  constructor(
    private orderService: OrderService,
    private productService: ProductService,
    private router: Router,
    private searchService: SearchService
  ) {}  

  ngOnInit(): void {
    this.subscriptions.add(
      this.searchService.query$.subscribe((query) => {
        this.searchQuery = query;
        this.applySearch();
      })
    );

    this.loadOrders();
    this.loadProducts();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  loadOrders(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.orderService.getOrders().subscribe({
      next: (orders) => {
        this.orders = orders;
        this.applySearch();
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Failed to load orders.';
        this.isLoading = false;
      }
    });
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: (products) => {
        this.products = products;
      },
      error: () => {
        this.errorMessage = 'Failed to load products.';
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
      items: [
        {
          productId: '',
          productName: '',
          quantity: 1,
          unitPrice: 0,
          lineTotal: 0,
          selected: false
        }
      ],
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
        : '',
      items: order.items.map((item: any) => ({
        ...item,
        selected: false
      }))
    };
  }

  clearSelectedOrder(): void {
    this.selectedOrder = null;
  }

  addItemToSelectedOrder(): void {
    this.selectedOrder.items.push({
      productId: '',
      productName: '',
      quantity: 1,
      unitPrice: 0,
      lineTotal: 0,
      selected: false
    });
  }

  removeSelectedItemsFromSelectedOrder(): void {
    const remainingItems = this.selectedOrder.items.filter((item: any) => !item.selected);

    if (remainingItems.length === 0) {
      this.errorMessage = 'An order must contain at least one item.';
      return;
    }

    this.selectedOrder.items = remainingItems;
    this.errorMessage = '';
  }

  onSelectedOrderProductChange(index: number): void {
    const item = this.selectedOrder.items[index];
    const product = this.products.find((product) => product._id === item.productId);

    if (!product) {
      item.productName = '';
      item.unitPrice = 0;
      item.lineTotal = 0;
      this.updateSelectedOrderTotal();
      return;
    }

    item.productName = product.name;
    item.unitPrice = product.price;
    item.lineTotal = item.quantity * item.unitPrice;
    this.updateSelectedOrderTotal();
  }

  onSelectedOrderQuantityChange(item: any): void {
    item.lineTotal = item.quantity * item.unitPrice;
    this.updateSelectedOrderTotal();
  }

  updateSelectedOrderTotal(): void {
    this.selectedOrder.orderTotal = this.selectedOrder.items.reduce(
      (total: number, item: any) => total + item.lineTotal,
      0
    );
  }

  saveOrder(): void {
    this.errorMessage = '';

    if (!this.selectedOrder.orderNumber.trim()) {
      this.errorMessage = 'Please enter an order number.';
      return;
    }

    if (!this.selectedOrder.customerId) {
      this.errorMessage = 'Please enter a customer ID.';
      return;
    }

    if (
      !this.selectedOrder.items ||
      this.selectedOrder.items.length === 0 ||
      this.selectedOrder.items.some((item: any) => !item.productId || item.quantity < 1)
    ) {
      this.errorMessage = 'Please select a product and quantity for each item.';
      return;
    }

    const orderToSave = {
      orderNumber: this.selectedOrder.orderNumber,
      customerId: this.selectedOrder.customerId,
      orderDate: this.selectedOrder.orderDateInput,
      items: this.selectedOrder.items.map((item: any) => ({
        productId: item.productId,
        productName: item.productName,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        lineTotal: item.quantity * item.unitPrice
      })),
      orderTotal: this.selectedOrder.items.reduce(
        (total: number, item: any) => total + item.quantity * item.unitPrice,
        0
      ),
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

  goToReports(): void {
    this.router.navigate(['/reports']);
  }

  private applySearch(): void {
    const query = this.normalize(this.searchQuery);

    if (!query) {
      this.filteredOrders = [...this.orders];
      return;
    }

    this.filteredOrders = this.orders.filter((order) => {
      const searchFields = [
        order.orderNumber,
        order.customerId?.name,
        this.getOrderSummary(order),
        order.paymentStatus,
        order.orderDate,
        order.paymentDate
      ];

      return this.matchesAnyField(searchFields, query);
    });
  }

  private matchesAnyField(fields: unknown[], query: string): boolean {
    return fields.some((field) => this.normalize(field).includes(query));
  }

  private normalize(value: unknown): string {
    if (value === null || value === undefined) {
      return '';
    }

    return String(value).toLowerCase().trim();
  }
}