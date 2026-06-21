import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
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
