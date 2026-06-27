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
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  logout(event: MouseEvent): void {
    event.preventDefault();
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
