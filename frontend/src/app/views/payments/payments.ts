import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../../services/payment.service';


@Component({
  selector: 'app-payments',
  standalone: false,
  templateUrl: './payments.html',
  styleUrl: './payments.css',
})
export class Payments implements OnInit {
  payments: any[] = [];
  selectedPayment: any = null;
  errorMessage = '';
  isLoading = false;

  constructor(private paymentService: PaymentService) {}

  ngOnInit(): void {
    this.loadPayments();
  }

  loadPayments(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.paymentService.getPayments().subscribe({
      next: (payments) => {
        this.payments = payments;
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Failed to load payments.';
        this.isLoading = false;
      }
    });
  }

  selectPayment(payment: any): void {
    this.selectedPayment = { ...payment };
  }

  clearSelectedPayment(): void {
    this.selectedPayment = null;
  }

  savePayment(): void {
    if (!this.selectedPayment?._id) {
      return;
    }

    this.paymentService.updatePayment(this.selectedPayment._id, this.selectedPayment).subscribe({
      next: () => {
        this.clearSelectedPayment();
        this.loadPayments();
      },
      error: () => this.errorMessage = 'Failed to update payment.'
    });
  }

  deletePayment(id: string): void {
    if (!confirm('Are you sure you want to delete this payment?')) {
      return;
    }

    this.paymentService.deletePayment(id).subscribe({
      next: () => {
        this.clearSelectedPayment();
        this.loadPayments();
      },
      error: () => this.errorMessage = 'Failed to delete payment.'
    });
  }
}
