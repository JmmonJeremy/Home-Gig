import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: false,
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  isTopMobileMenuOpen = false;
  isFooterMobileMenuOpen = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  toggleTopMobileMenu(): void {
    this.isTopMobileMenuOpen = !this.isTopMobileMenuOpen;
    this.isFooterMobileMenuOpen = false;
  }

  toggleFooterMobileMenu(): void {
    this.isFooterMobileMenuOpen = !this.isFooterMobileMenuOpen;
    this.isTopMobileMenuOpen = false;
  }

  closeMobileMenus(): void {
    this.isTopMobileMenuOpen = false;
    this.isFooterMobileMenuOpen = false;
  }

  logout(event: MouseEvent): void {
    event.preventDefault();
    this.closeMobileMenus();

    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
