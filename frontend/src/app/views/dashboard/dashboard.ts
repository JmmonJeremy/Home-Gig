import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from '../../services/customer.service';
import { OrderService } from '../../services/order.service';
import { SystemService } from '../../services/system.service';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  showSystemServices = false;
  errorMessage = '';
  isLoading = false;

  stats = [
    { label: 'Orders', value: 0 },
    { label: 'Customers', value: 0 },
    { label: 'Paid', value: 0 },
    { label: 'Unpaid', value: 0 }
  ];

  recentOrders: any[] = [];
  goServiceStatus = 'Checking...';
  spreadsheetGenerator = 'Checking...';

  constructor(
    private orderService: OrderService,
    private customerService: CustomerService,
    private systemService: SystemService,
    private router: Router    
  ) {}

  ngOnInit(): void {
    this.loadDashboardData();
    this.loadSystemStatus();
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
  this.systemService.getSystemStatus().subscribe({
    next: (status) => {
      this.goServiceStatus = status.goService;
      this.spreadsheetGenerator = status.spreadsheetGenerator;
    },
    error: () => {
      this.goServiceStatus = 'Offline';
      this.spreadsheetGenerator = 'Express';
    }
  });
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

  toggleSystemServices(): void {
    this.showSystemServices = !this.showSystemServices;
  }
}