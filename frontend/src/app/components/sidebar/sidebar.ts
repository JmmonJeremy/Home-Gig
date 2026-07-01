import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: false,
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar implements OnInit, OnDestroy {
  mobileTopMenuOpen = false;
  mobileBottomMenuOpen = false;
  isDashboardPage = false;

  private readonly subscriptions = new Subscription();

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.updateDashboardPageState();

    this.subscriptions.add(
      this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.updateDashboardPageState();
          this.closeMobileMenus();
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  toggleMobileTopMenu(event: MouseEvent): void {
    event.preventDefault();
    this.mobileBottomMenuOpen = false;
    this.mobileTopMenuOpen = !this.mobileTopMenuOpen;
  }

  toggleMobileBottomMenu(event: MouseEvent): void {
    event.preventDefault();
    this.mobileTopMenuOpen = false;
    this.mobileBottomMenuOpen = !this.mobileBottomMenuOpen;
  }

  closeMobileMenus(): void {
    this.mobileTopMenuOpen = false;
    this.mobileBottomMenuOpen = false;
  }

  get isProductFormPage(): boolean {
    const url = this.router.url.split('?')[0];
    return url === '/products/new' || /^\/products\/[^/]+\/edit$/.test(url);
  }

  get isCustomerFormPage(): boolean {
    const url = this.router.url.split('?')[0];
    return url === '/customers/new' || /^\/customers\/[^/]+\/edit$/.test(url);
  }

  get isOrderFormPage(): boolean {
    const url = this.router.url.split('?')[0];
    return url === '/orders/new' || /^\/orders\/[^/]+\/edit$/.test(url);
  }

  get isFormPage(): boolean {
    return this.isProductFormPage || this.isCustomerFormPage || this.isOrderFormPage;
  }

  get formBackLink(): string {
    if (this.isProductFormPage) {
      return '/products';
    }

    if (this.isCustomerFormPage) {
      return '/customers';
    }

    return '/orders';
  }

  get mobileFormBackLabel(): string {
    if (this.isProductFormPage) {
      return 'Products List';
    }

    if (this.isCustomerFormPage) {
      return 'Customers List';
    }

    return 'Orders List';
  }

  logout(event: MouseEvent): void {
    event.preventDefault();
    this.closeMobileMenus();
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement | null;

    if (target?.closest('.sidebar-top-nav-dropdown, .sidebar-bottom-nav-dropdown')) {
      return;
    }

    this.closeMobileMenus();
  }

  private updateDashboardPageState(): void {
    const url = this.router.url.split('?')[0];
    this.isDashboardPage = url.startsWith('/dashboard');
  }
}
