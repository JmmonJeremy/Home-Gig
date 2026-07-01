import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-customer-form',
  standalone: false,
  templateUrl: './customer-form.html',
  styleUrl: './customer-form.css',
})
export class CustomerForm implements OnInit {
  customerId: string | null = null;
  isEditMode = false;
  errorMessage = '';

  customer = {
    name: '',
    phone: '',
    email: '',
    notes: ''
  };

  constructor(
    private customerService: CustomerService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.customerId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!this.customerId;

    if (this.isEditMode && this.customerId) {
      this.customerService.getCustomerById(this.customerId).subscribe({
        next: (customer) => {
          this.customer = {
            name: customer.name,
            phone: customer.phone,
            email: customer.email,
            notes: customer.notes || ''
          };
        },
        error: () => {
          this.errorMessage = 'Failed to load customer.';
        }
      });
    } else {
      const customerName = this.route.snapshot.queryParamMap.get('name');

      if (customerName) {
        this.customer.name = customerName;
      }
    }
  }

  onSubmit(): void {
    this.errorMessage = '';
    this.customer.phone = this.formatPhoneNumber(this.customer.phone);

    if (!this.customer.name.trim()) {
      this.errorMessage = 'Please enter a customer name.';
      return;
    }

    if (!this.customer.phone.trim() && !this.customer.email.trim()) {
      this.errorMessage = 'Please enter a phone number or an email address.';
      return;
    }

    if (this.customer.phone.trim() && !this.hasValidPhoneNumber(this.customer.phone)) {
      this.errorMessage = 'Phone numbers must contain only 10 numbers.';
      return;
    }

    if (this.isEditMode && this.customerId) {
      this.customerService.updateCustomer(this.customerId, this.customer).subscribe({
        next: () => this.router.navigate(['/customers']),
        error: () => this.errorMessage = 'Failed to update customer.'
      });
    } else {
      this.customerService.createCustomer(this.customer).subscribe({
        next: () => this.router.navigate(['/customers']),
        error: () => this.errorMessage = 'Failed to create customer.'
      });
    }
  }

  deleteCustomer(): void {
    if (!this.customerId) {
      return;
    }

    if (!confirm('Are you sure you want to delete this customer?')) {
      return;
    }

    this.customerService.deleteCustomer(this.customerId).subscribe({
      next: () => this.router.navigate(['/customers']),
      error: () => this.errorMessage = 'Failed to delete customer.'
    });
  }

  cancel(): void {
    this.router.navigate(['/customers']);
  }

  onPhoneInput(value: string): void {
    this.customer.phone = this.formatPhoneNumber(value);
  }

  private formatPhoneNumber(value: string): string {
    const digits = value.replace(/\D/g, '');

    if (digits.length <= 3) {
      return digits;
    }

    if (digits.length <= 6) {
      return `${digits.slice(0, 3)}-${digits.slice(3)}`;
    }

    return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
  }

  private hasValidPhoneNumber(value: string): boolean {
    return value.replace(/\D/g, '').length === 10;
  }
}
