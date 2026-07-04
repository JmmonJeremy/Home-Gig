import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { CustomerService } from '../../services/customer.service';
import { OrderService } from '../../services/order.service';
import { SystemService } from '../../services/system.service';


@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit, OnDestroy {
  showSystemServices = false;
  errorMessage = '';
  isLoading = false;
  isUpdatingSystemStatus = false;

  private systemStatusRetryTimer: ReturnType<typeof setTimeout> | null = null;

  stats = [
    { label: 'Orders', value: 0 },
    { label: 'Customers', value: 0 },
    { label: 'Paid', value: 0 },
    { label: 'Unpaid', value: 0 }
  ];

  recentOrders: any[] = [];
  goServiceStatus = 'Checking...';
  spreadsheetGenerator = 'Waking Up...';

  constructor(
    private orderService: OrderService,
    private customerService: CustomerService,
    private systemService: SystemService,
    private router: Router    
  ) {}

  ngOnInit(): void {
    this.loadDashboardData();
    
    this.refreshSystemStatus({
      wakeGoFirst: true,
      showCheckingDelay: false
    });
  }

  ngOnDestroy(): void {
    this.clearSystemStatusRetry();
  }

  loadDashboardData(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.orderService.getOrders().subscribe({
      next: (orders) => {
        this.setOrderStats(orders);
        this.setRecentOrders(orders);
        this.loadCustomerCount();
      },
      error: () => {
        this.errorMessage = 'Failed to load dashboard orders.';
        this.isLoading = false;
      }
    });
  }

  loadSystemStatus(): void {
    this.refreshSystemStatus({
      wakeGoFirst: true,
      showCheckingDelay: false
    });
  }

  // One shared method for initial load, refresh, and manual update.
  private async refreshSystemStatus(options: {
    wakeGoFirst: boolean;
    showCheckingDelay: boolean;
  }): Promise<void> {
    this.clearSystemStatusRetry();

    if (options.showCheckingDelay) {
      this.isUpdatingSystemStatus = true;
      this.goServiceStatus = 'Checking...';
    }

    if (options.wakeGoFirst) {
      try {
        await firstValueFrom(this.systemService.wakeGoService());
      } catch {
        // Ignore this error. The Node backend status check below decides what to show.
      }
    }

    if (options.showCheckingDelay) {
      await this.delay(2000);
      this.isUpdatingSystemStatus = false;

      if (this.goServiceStatus === 'Checking...') {
        this.goServiceStatus = 'Waking Up...';
      }
    }

    this.systemService.getSystemStatus().subscribe({
      next: (status) => {
        this.goServiceStatus = status.goService;
        this.spreadsheetGenerator = status.spreadsheetGenerator;

        if (status.goService === 'Waking Up...') {
          this.scheduleSystemStatusRetry();
        } else {
          this.clearSystemStatusRetry();
        }
      },
      error: () => {
        this.goServiceStatus = 'Unavailable';
        this.spreadsheetGenerator = 'Express';
        this.clearSystemStatusRetry();
      }
    });
  }

  private scheduleSystemStatusRetry(): void {
    this.clearSystemStatusRetry();

    this.systemStatusRetryTimer = setTimeout(() => {
      this.refreshSystemStatus({
        wakeGoFirst: true,
        showCheckingDelay: false
      });
    }, 5000);
  }

  private clearSystemStatusRetry(): void {
    if (this.systemStatusRetryTimer) {
      clearTimeout(this.systemStatusRetryTimer);
      this.systemStatusRetryTimer = null;
    }
  }

  loadCustomerCount(): void {
    this.customerService.getCustomers().subscribe({
      next: (customers) => {
        this.stats[1].value = customers.length;
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Failed to load dashboard customers.';
        this.isLoading = false;
      }
    });
  }

  setOrderStats(orders: any[]): void {
    const paidCount = orders.filter(order => order.paymentStatus === 'Paid').length;
    const unpaidCount = orders.filter(order => order.paymentStatus === 'Unpaid').length;

    this.stats[0].value = orders.length;
    this.stats[2].value = paidCount;
    this.stats[3].value = unpaidCount;
  }

  setRecentOrders(orders: any[]): void {
    this.recentOrders = orders
      .sort(
        (a, b) =>
          new Date(b.orderDate).getTime() -
          new Date(a.orderDate).getTime()
      )
      .slice(0, 3)
      .map(order => ({
        customer: order.customerId?.name || 'Unknown Customer',
        total: order.orderTotal,
        status: order.paymentStatus
      }));
  }

  goToAddOrder(): void {
    this.router.navigate(['/orders/new']);
  }

  goToAddCustomer(): void {
    this.router.navigate(['/customers/new']);
  }

  goToReports(): void {
    this.router.navigate(['/reports']);
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  get isCheckingGoService(): boolean {
    return this.goServiceStatus === 'Checking...';
  }

  // Uses the same shared refresh method as Dashboard load/retry.
  updateSystemStatus(event: MouseEvent): void {
    event.preventDefault();

    this.refreshSystemStatus({
      wakeGoFirst: true,
      showCheckingDelay: true
    });
  }

  toggleSystemServices(): void {
    this.showSystemServices = !this.showSystemServices;
  }
}