import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../../services/customer.service';
import { OrderService } from '../../services/order.service';
import { ProductService } from '../../services/product.service';

interface OrderItemForm {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
}

@Component({
  selector: 'app-order-form',
  standalone: false,
  templateUrl: './order-form.html',
  styleUrl: './order-form.css',
})
export class OrderForm implements OnInit {
  orderId: string | null = null;
  isEditMode = false;
  errorMessage = '';
  isLoading = false;
  isSubmitting = false;
  customers: any[] = [];
  products: any[] = [];
  paymentStatuses = ['Unpaid', 'Paid'];
  calculatedTotalSuggestion: number | null = null;

  order = {
    customerId: '',
    customerNameInput: '',
    showCustomerDropdown: false,
    orderDate: '',
    items: [] as OrderItemForm[],
    orderTotal: 0,
    paymentDate: '',
    paymentStatus: 'Unpaid'
  };

  constructor(
    private orderService: OrderService,
    private customerService: CustomerService,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.orderId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!this.orderId;
    this.order.orderDate = this.getTodayInputValue();
    this.addItem();
    this.loadFormOptions();

    if (this.isEditMode && this.orderId) {
      this.loadOrder(this.orderId);
    }
  }

  loadFormOptions(): void {
    this.customerService.getCustomers().subscribe({
      next: (customers) => this.customers = customers,
      error: () => this.errorMessage = 'Failed to load customers.'
    });

    this.productService.getProducts().subscribe({
      next: (products) => this.products = products,
      error: () => this.errorMessage = 'Failed to load products.'
    });
  }

  loadOrder(id: string): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.orderService.getOrderById(id).subscribe({
      next: (order) => {
        this.order = {
          customerId: this.getEntityId(order.customerId),
          customerNameInput: order.customerId?.name || '',
          showCustomerDropdown: false,
          orderDate: this.toDateInputValue(order.orderDate),
          items: order.items.map((item: any) => ({
            productId: this.getEntityId(item.productId),
            productName: item.productName,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
            lineTotal: item.lineTotal
          })),
          orderTotal: order.orderTotal,
          paymentDate: this.toDateInputValue(order.paymentDate),
          paymentStatus: order.paymentStatus
        };

        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Failed to load order.';
        this.isLoading = false;
      }
    });
  }

  addItem(): void {
    this.order.items.push({
      productId: '',
      productName: '',
      quantity: 1,
      unitPrice: 0,
      lineTotal: 0
    });
  }

  removeItem(index: number): void {
    if (this.order.items.length === 1) {
      return;
    }

    this.order.items.splice(index, 1);
    this.updateOrderTotal();
  }

  onProductChange(index: number): void {
    const item = this.order.items[index];
    const product = this.products.find((product) => product._id === item.productId);

    if (!product) {
      item.productName = '';
      item.unitPrice = 0;
      this.updateLineTotal(item);
      this.updateOrderTotal();
      return;
    }

    item.productName = product.name;
    item.unitPrice = product.price;
    this.updateLineTotal(item);
    this.updateOrderTotal();
  }

  onQuantityChange(item: OrderItemForm): void {
    this.updateLineTotal(item);
    this.updateOrderTotal();
  }

  onCustomerNameChange(value: string): void {
    this.order.customerNameInput = value;
    this.order.showCustomerDropdown = true;
    const matchingCustomer = this.findCustomerByName(value);
    this.order.customerId = matchingCustomer?._id || '';
  }

  selectCustomer(customer: any): void {
    this.order.customerNameInput = customer.name;
    this.order.customerId = customer._id;
    this.order.showCustomerDropdown = false;
    this.errorMessage = '';
  }

  showCustomerDropdown(): void {
    this.order.showCustomerDropdown = true;
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

  onPaymentStatusChange(): void {
    if (this.order.paymentStatus === 'Paid' && !this.order.paymentDate) {
      this.order.paymentDate = this.getTodayInputValue();

      if (this.order.orderDate && this.order.paymentDate < this.order.orderDate) {
        this.order.paymentDate = this.order.orderDate;
      }
    }

    if (this.order.paymentStatus === 'Unpaid') {
      this.order.paymentDate = '';
    }
  }

  applyCalculatedTotal(): void {
    this.order.orderTotal = this.calculateOrderTotal();
    this.calculatedTotalSuggestion = null;
    this.errorMessage = '';
  }

  onSubmit(): void {
    this.errorMessage = '';
    this.calculatedTotalSuggestion = null;

    if (!this.order.customerNameInput.trim()) {
      this.errorMessage = 'A customer name is required.';
      return;
    }

    if (this.hasInvalidCustomerNameCharacters(this.order.customerNameInput)) {
      this.errorMessage = 'Customer names may only contain letters, spaces, apostrophes, hyphens, and periods.';
      return;
    }

    const matchingCustomer = this.findCustomerByName(this.order.customerNameInput);

    if (!matchingCustomer) {
      this.errorMessage = 'Customer name must match an existing customer.';
      return;
    }

    this.order.customerId = matchingCustomer._id;

    if (!this.order.orderDate) {
      this.errorMessage = 'An order date is required.';
      return;
    }

    if (!this.isValidDateInput(this.order.orderDate)) {
      this.errorMessage = 'Order date must be a valid date.';
      return;
    }

    if (!this.order.items || this.order.items.length === 0) {
      this.errorMessage = 'Selecting a product is required for an order.';
      return;
    }

    if (this.order.items.some((item) => !item.productId)) {
      this.errorMessage = 'Selecting a product is required for an order.';
      return;
    }

    if (this.order.items.some((item) => Number(item.quantity) < 1)) {
      this.errorMessage = 'Quantity must be 1 or greater.';
      return;
    }

    if (this.order.items.some((item) => !Number.isInteger(Number(item.quantity)))) {
      this.errorMessage = 'Quantity must be a whole number.';
      return;
    }

    const calculatedOrderTotal = this.calculateOrderTotal();

    if (this.roundCurrency(Number(this.order.orderTotal)) !== calculatedOrderTotal) {
      this.errorMessage = 'Total must come from the sum of the order items.';
      this.calculatedTotalSuggestion = calculatedOrderTotal;
      return;
    }

    if (this.order.paymentDate) {
      if (!this.isValidDateInput(this.order.paymentDate)) {
        this.errorMessage = 'Payment date must be a valid date.';
        return;
      }

      if (this.order.paymentDate < this.order.orderDate) {
        this.errorMessage = 'Payment date must be on or after the order date.';
        return;
      }
    }

    if (this.order.paymentStatus === 'Paid' && !this.order.paymentDate) {
      this.order.paymentDate = this.getTodayInputValue();

      if (this.order.paymentDate < this.order.orderDate) {
        this.order.paymentDate = this.order.orderDate;
      }
    }

    if (this.order.paymentStatus === 'Unpaid') {
      this.order.paymentDate = '';
    }

    if (this.order.paymentDate && this.order.paymentDate < this.order.orderDate) {
      this.errorMessage = 'Payment date must be on or after the order date.';
      return;
    }

    const orderPayload = {
      customerId: this.order.customerId,
      orderDate: this.order.orderDate,
      items: this.order.items.map((item) => ({
        productId: item.productId,
        productName: item.productName,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        lineTotal: item.quantity * item.unitPrice
      })),
      orderTotal: calculatedOrderTotal,
      paymentStatus: this.order.paymentStatus,
      paymentDate: this.order.paymentDate || null
    };

    this.isSubmitting = true;

    if (this.isEditMode && this.orderId) {
      this.orderService.updateOrder(this.orderId, orderPayload).subscribe({
        next: () => this.router.navigate(['/orders']),
        error: () => {
          this.errorMessage = 'Failed to update order.';
          this.isSubmitting = false;
        }
      });
    } else {
      this.orderService.createOrder(orderPayload).subscribe({
        next: () => this.router.navigate(['/orders']),
        error: () => {
          this.errorMessage = 'Failed to create order.';
          this.isSubmitting = false;
        }
      });
    }
  }

  removeLastItem(): void {
    if (this.order.items.length === 1) {
      return;
    }

    this.order.items.pop();
    this.updateOrderTotal();
  }

  deleteOrder(): void {
    if (!this.orderId) {
      return;
    }

    if (!confirm('Are you sure you want to delete this order?')) {
      return;
    }

    this.orderService.deleteOrder(this.orderId).subscribe({
      next: () => this.router.navigate(['/orders']),
      error: () => this.errorMessage = 'Failed to delete order.'
    });
  }

  cancel(): void {
    this.router.navigate(['/orders']);
  }

  private updateLineTotal(item: OrderItemForm): void {
    item.lineTotal = item.quantity * item.unitPrice;
  }

  private updateOrderTotal(): void {
    this.order.orderTotal = this.calculateOrderTotal();
  }

  private getEntityId(entity: any): string {
    return entity?._id || entity || '';
  }

  private getTodayInputValue(): string {
    return this.toDateInputValue(new Date().toISOString());
  }

  private toDateInputValue(dateValue: string): string {
    return dateValue ? dateValue.slice(0, 10) : '';
  }

  private calculateOrderTotal(): number {
    return this.roundCurrency(this.order.items.reduce(
      (total, item) => total + Number(item.quantity) * Number(item.unitPrice),
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

  private hasInvalidCustomerNameCharacters(value: string): boolean {
    return !/^[\p{L} .'-]+$/u.test(value.trim());
  }
}
