import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-customers',
  standalone: false,
  templateUrl: './customers.html',
  styleUrl: './customers.css',
})
export class Customers implements OnInit {
  customers: any[] = [];
  selectedCustomer: any = null;
  errorMessage = '';
  isLoading = false;

  constructor(private customerService: CustomerService, private router: Router) {}

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.customerService.getCustomers().subscribe({
      next: (customers) => {
        this.customers = customers;
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Failed to load customers.';
        this.isLoading = false;
      }
    });
  }

  addCustomerInline(): void {
    this.selectedCustomer = {
      name: '',
      phone: '',
      email: '',
      notes: ''
    };
  }

  selectCustomer(customer: any): void {
    this.selectedCustomer = { ...customer };
  }

  clearSelectedCustomer(): void {
    this.selectedCustomer = null;
  }

  saveCustomer(): void {
    this.errorMessage = '';

    if (!this.selectedCustomer.name.trim()) {
      this.errorMessage = 'Please enter a customer name.';
      return;
    }

    if (this.selectedCustomer._id) {
      this.customerService.updateCustomer(this.selectedCustomer._id, this.selectedCustomer).subscribe({
        next: () => {
          this.clearSelectedCustomer();
          this.loadCustomers();
        },
        error: () => this.errorMessage = 'Failed to update customer.'
      });
    } else {
      this.customerService.createCustomer(this.selectedCustomer).subscribe({
        next: () => {
          this.clearSelectedCustomer();
          this.loadCustomers();
        },
        error: () => this.errorMessage = 'Failed to create customer.'
      });
    }
  }

  deleteCustomer(id: string): void {
    if (!confirm('Are you sure you want to delete this customer?')) {
      return;
    }

    this.customerService.deleteCustomer(id).subscribe({
      next: () => {
        this.clearSelectedCustomer();
        this.loadCustomers();
      },
      error: () => this.errorMessage = 'Failed to delete customer.'
    });
  }

  goToReports(): void {
    this.router.navigate(['/reports']);
  }
}
