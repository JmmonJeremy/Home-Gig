import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CustomerService } from '../../services/customer.service';
import { SearchService } from '../../services/search.service';
import { matchesSearchQuery } from '../../utils/search.util';

@Component({
  selector: 'app-customers',
  standalone: false,
  templateUrl: './customers.html',
  styleUrl: './customers.css',
})
export class Customers implements OnInit, OnDestroy {
  customers: any[] = [];
  filteredCustomers: any[] = [];
  selectedCustomer: any = null;
  errorMessage = '';
  formErrorMessage = '';
  isLoading = false;
  searchQuery = '';
  private readonly subscriptions = new Subscription();

  constructor(
    private customerService: CustomerService,
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

    this.loadCustomers();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  loadCustomers(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.customerService.getCustomers().subscribe({
      next: (customers) => {
        this.customers = customers;
        this.applySearch();
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Failed to load customers.';
        this.isLoading = false;
      }
    });
  }

  addCustomerInline(): void {
    this.formErrorMessage = '';
    this.selectedCustomer = {
      name: '',
      phone: '',
      email: '',
      notes: ''
    };
  }

  selectCustomer(customer: any): void {
    this.formErrorMessage = '';
    this.selectedCustomer = { ...customer };
  }

  clearSelectedCustomer(): void {
    this.selectedCustomer = null;
    this.formErrorMessage = '';
  }

  saveCustomer(): void {
    this.errorMessage = '';
    this.formErrorMessage = '';
    this.selectedCustomer.phone = this.formatPhoneNumber(this.selectedCustomer.phone || '');

    if (!this.selectedCustomer.name.trim()) {
      this.formErrorMessage = 'Please enter a customer name.';
      return;
    }

    if (this.hasInvalidCustomerNameCharacters(this.selectedCustomer.name)) {
      this.formErrorMessage = 'Customer names may only contain letters, spaces, apostrophes, hyphens, and periods.';
      return;
    }

    if (!this.selectedCustomer.phone.trim() && !this.selectedCustomer.email.trim()) {
      this.formErrorMessage = 'Please enter a phone number or an email address.';
      return;
    }

    if (this.selectedCustomer.email.trim() && !this.hasValidEmail(this.selectedCustomer.email)) {
      this.formErrorMessage = 'Please enter a valid email address.';
      return;
    }

    if (this.selectedCustomer.phone.trim() && this.hasInvalidPhoneCharacters(this.selectedCustomer.phone)) {
      this.formErrorMessage = 'Phone numbers may only contain numbers and dashes.';
      return;
    }

    if (this.selectedCustomer.phone.trim() && !this.hasValidPhoneNumber(this.selectedCustomer.phone)) {
      this.formErrorMessage = 'Phone numbers must contain only 10 numbers.';
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

  onSelectedCustomerPhoneInput(value: string): void {
    this.selectedCustomer.phone = this.formatPhoneNumber(value);
  }

  private applySearch(): void {
    if (!this.searchQuery.trim()) {
      this.filteredCustomers = [...this.customers];
      return;
    }

    this.filteredCustomers = this.customers.filter((customer) =>
      matchesSearchQuery(
        this.searchQuery,
        customer.name,
        customer.phone,
        customer.email,
        customer.notes
      )
    );
  }

  private formatPhoneNumber(value: string): string {
    if (/[^0-9-]/.test(value)) {
      return value;
    }

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

  private hasInvalidPhoneCharacters(value: string): boolean {
    return /[^0-9-]/.test(value);
  }

  private hasInvalidCustomerNameCharacters(value: string): boolean {
    return !/^[\p{L} .'-]+$/u.test(value.trim());
  }

  private hasValidEmail(value: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
  }
}
