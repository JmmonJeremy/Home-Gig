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
  orderSources = ['Phone', 'Text', 'In Person', 'Online', 'Other'];

  order = {
    customerId: '',
    orderDate: '',
    items: [] as OrderItemForm[],
    paymentStatus: 'Unpaid',
    orderSource: 'Other',
    notes: ''
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

  get orderTotal(): number {
    return this.order.items.reduce((total, item) => total + item.lineTotal, 0);
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
          orderDate: this.toDateInputValue(order.orderDate),
          items: order.items.map((item: any) => ({
            productId: this.getEntityId(item.productId),
            productName: item.productName,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
            lineTotal: item.lineTotal
          })),
          paymentStatus: order.paymentStatus,
          orderSource: order.orderSource,
          notes: order.notes || ''
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
  }

  onProductChange(index: number): void {
    const item = this.order.items[index];
    const product = this.products.find((product) => product._id === item.productId);

    if (!product) {
      item.productName = '';
      item.unitPrice = 0;
      this.updateLineTotal(item);
      return;
    }

    item.productName = product.name;
    item.unitPrice = product.price;
    this.updateLineTotal(item);
  }

  onQuantityChange(item: OrderItemForm): void {
    this.updateLineTotal(item);
  }

  onSubmit(): void {
    this.errorMessage = '';

    if (!this.order.customerId) {
      this.errorMessage = 'Please select a customer.';
      return;
    }

    if (this.order.items.some((item) => !item.productId || item.quantity < 1)) {
      this.errorMessage = 'Please select a product and quantity for each item.';
      return;
    }

    const orderPayload = {
      customerId: this.order.customerId,
      orderDate: this.order.orderDate,
      items: this.order.items,
      orderTotal: this.orderTotal,
      paymentStatus: this.order.paymentStatus,
      orderSource: this.order.orderSource,
      notes: this.order.notes
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

  cancel(): void {
    this.router.navigate(['/orders']);
  }

  private updateLineTotal(item: OrderItemForm): void {
    item.lineTotal = item.quantity * item.unitPrice;
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
}
