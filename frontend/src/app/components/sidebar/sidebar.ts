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
  mobileDrawerOpen = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  toggleMobileDrawer(): void {
    this.mobileDrawerOpen = !this.mobileDrawerOpen;
  }

  closeMobileDrawer(): void {
    this.mobileDrawerOpen = false;
  }

  logout(event: MouseEvent): void {
    event.preventDefault();
    this.closeMobileDrawer();
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
