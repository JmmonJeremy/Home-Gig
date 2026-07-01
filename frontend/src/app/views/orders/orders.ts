import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CustomerService } from '../../services/customer.service';
import { OrderService } from '../../services/order.service';
import { ProductService } from '../../services/product.service';
import { SearchService } from '../../services/search.service';
import { matchesSearchQuery } from '../../utils/search.util';

@Component({
  selector: 'app-orders',
  standalone: false,
  templateUrl: './orders.html',
  styleUrl: './orders.css',
})
export class Orders implements OnInit, OnDestroy {
  orders: any[] = [];
  filteredOrders: any[] = [];
  customers: any[] = [];
  products: any[] = [];
  selectedOrder: any = null;
  errorMessage = '';
  formErrorMessage = '';
  isLoading = false;
  searchQuery = '';
  private readonly subscriptions = new Subscription();

  constructor(
    private customerService: CustomerService,
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
    this.loadCustomers();
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

  loadCustomers(): void {
    this.customerService.getCustomers().subscribe({
      next: (customers) => {
        this.customers = customers;
      },
      error: () => {
        this.errorMessage = 'Failed to load customers.';
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
    this.formErrorMessage = '';
    this.selectedOrder = {
      orderNumber: '',
      customerId: '',
      customerNameInput: '',
      showCustomerDropdown: false,
      orderDateInput: new Date().toISOString().split('T')[0],
      paymentDateInput: '',
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
    this.formErrorMessage = '';
    this.selectedOrder = {
      ...order,
      customerId: order.customerId?._id || order.customerId,
      customerNameInput: order.customerId?.name || '',
      showCustomerDropdown: false,
      orderDateInput: order.orderDate
        ? new Date(order.orderDate).toISOString().split('T')[0]
        : '',
      paymentDateInput: order.paymentDate
        ? new Date(order.paymentDate).toISOString().split('T')[0]
        : '',
      items: order.items.map((item: any) => ({
        ...item,
        selected: false
      }))
    };
  }

  clearSelectedOrder(): void {
    this.selectedOrder = null;
    this.formErrorMessage = '';
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
      this.formErrorMessage = 'An order must contain at least one item.';
      return;
    }

    this.selectedOrder.items = remainingItems;
    this.formErrorMessage = '';
  }

  onSelectedOrderCustomerNameChange(value: string): void {
    this.selectedOrder.customerNameInput = value;
    this.selectedOrder.showCustomerDropdown = true;
    const matchingCustomer = this.findCustomerByName(value);
    this.selectedOrder.customerId = matchingCustomer?._id || '';
  }

  selectCustomerForSelectedOrder(customer: any): void {
    this.selectedOrder.customerNameInput = customer.name;
    this.selectedOrder.customerId = customer._id;
    this.selectedOrder.showCustomerDropdown = false;
    this.formErrorMessage = '';
  }

  showSelectedOrderCustomerDropdown(): void {
    this.selectedOrder.showCustomerDropdown = true;
  }

  onSelectedOrderPaymentStatusChange(): void {
    if (this.selectedOrder.paymentStatus === 'Paid' && !this.selectedOrder.paymentDateInput) {
      this.selectedOrder.paymentDateInput = new Date().toISOString().split('T')[0];

      if (
        this.selectedOrder.orderDateInput &&
        this.selectedOrder.paymentDateInput < this.selectedOrder.orderDateInput
      ) {
        this.selectedOrder.paymentDateInput = this.selectedOrder.orderDateInput;
      }
    }

    if (this.selectedOrder.paymentStatus === 'Unpaid') {
      this.selectedOrder.paymentDateInput = '';
    }
  }

  getCustomerMatches(query: string): any[] {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return [];
    }

    return this.customers
      .filter((customer) => customer.name.toLowerCase().includes(normalizedQuery))
      .slice(0, 5);
  }

  hasExactCustomerMatch(query: string): boolean {
    return !!this.findCustomerByName(query);
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
    this.formErrorMessage = '';

    if (!this.selectedOrder.customerNameInput.trim()) {
      this.formErrorMessage = 'A customer name is required.';
      return;
    }

    const matchingCustomer = this.findCustomerByName(this.selectedOrder.customerNameInput);

    if (!matchingCustomer) {
      this.formErrorMessage = 'Customer name must match an existing customer.';
      return;
    }

    this.selectedOrder.customerId = matchingCustomer._id;

    if (!this.selectedOrder.orderDateInput) {
      this.formErrorMessage = 'An order date is required.';
      return;
    }

    if (!this.isValidDateInput(this.selectedOrder.orderDateInput)) {
      this.formErrorMessage = 'Order date must be a valid date.';
      return;
    }

    if (!this.selectedOrder.items || this.selectedOrder.items.length === 0) {
      this.formErrorMessage = 'Selecting a product is required for an order.';
      return;
    }

    if (this.selectedOrder.items.some((item: any) => !item.productId)) {
      this.formErrorMessage = 'Selecting a product is required for an order.';
      return;
    }

    if (this.selectedOrder.items.some((item: any) => Number(item.quantity) < 1)) {
      this.formErrorMessage = 'Quantity must be 1 or greater.';
      return;
    }

    if (this.selectedOrder.items.some((item: any) => !Number.isInteger(Number(item.quantity)))) {
      this.formErrorMessage = 'Quantity must be a whole number.';
      return;
    }

    const calculatedOrderTotal = this.calculateSelectedOrderTotal();

    if (this.roundCurrency(Number(this.selectedOrder.orderTotal)) !== calculatedOrderTotal) {
      this.formErrorMessage = 'Total must come from the sum of the order items.';
      return;
    }

    if (this.selectedOrder.paymentDateInput) {
      if (!this.isValidDateInput(this.selectedOrder.paymentDateInput)) {
        this.formErrorMessage = 'Payment date must be a valid date.';
        return;
      }

      if (this.selectedOrder.paymentDateInput < this.selectedOrder.orderDateInput) {
        this.formErrorMessage = 'Payment date must be on or after the order date.';
        return;
      }
    }

    if (this.selectedOrder.paymentStatus === 'Paid' && !this.selectedOrder.paymentDateInput) {
      this.selectedOrder.paymentDateInput = new Date().toISOString().split('T')[0];

      if (this.selectedOrder.paymentDateInput < this.selectedOrder.orderDateInput) {
        this.selectedOrder.paymentDateInput = this.selectedOrder.orderDateInput;
      }
    }

    if (this.selectedOrder.paymentStatus === 'Unpaid') {
      this.selectedOrder.paymentDateInput = '';
    }

    if (this.selectedOrder.paymentDateInput && this.selectedOrder.paymentDateInput < this.selectedOrder.orderDateInput) {
      this.formErrorMessage = 'Payment date must be on or after the order date.';
      return;
    }

    const orderToSave = {
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
      paymentStatus: this.selectedOrder.paymentStatus,
      paymentDate: this.selectedOrder.paymentDateInput || null
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
    if (!this.searchQuery.trim()) {
      this.filteredOrders = [...this.orders];
      return;
    }

    this.filteredOrders = this.orders.filter((order) =>
      matchesSearchQuery(
        this.searchQuery,
        order.orderNumber,
        order.customerId?.name,
        order.orderDate,
        this.getOrderSummary(order),
        order.paymentStatus,
        order.paymentDate
      )
    );
  }

  private calculateSelectedOrderTotal(): number {
    return this.roundCurrency(this.selectedOrder.items.reduce(
      (total: number, item: any) => total + Number(item.quantity) * Number(item.unitPrice),
      0
    ));
  }

  private findCustomerByName(name: string): any | undefined {
    const normalizedName = name.trim().toLowerCase();

    if (!normalizedName) {
      return undefined;
    }

    return this.customers.find((customer) => customer.name.toLowerCase() === normalizedName);
  }

  private isValidDateInput(value: string): boolean {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
      return false;
    }

    const date = new Date(`${value}T00:00:00`);

    return !Number.isNaN(date.getTime());
  }

  private roundCurrency(value: number): number {
    return Math.round(value * 100) / 100;
  }
}
