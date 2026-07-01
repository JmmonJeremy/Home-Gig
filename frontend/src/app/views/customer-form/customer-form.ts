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

    if (!this.customer.name.trim()) {
      this.errorMessage = 'Please enter a customer name.';
      return;
    }

    if (!this.customer.phone.trim() && !this.customer.email.trim()) {
      this.errorMessage = 'Please enter a phone number or an email address.';
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
}
