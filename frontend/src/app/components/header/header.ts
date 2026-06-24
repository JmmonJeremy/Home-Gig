import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  infoMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onProfileOption(event: MouseEvent, optionName: string): void {
    event.preventDefault();
    event.stopImmediatePropagation(); // ← Prevents the message from disappearing immediately
    this.infoMessage = `${optionName} is not yet available.`;
  }

  logout(event: MouseEvent): void {
    event.preventDefault();
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  // This will clear the message when user clicks anywhere else on the page
  @HostListener('document:click')
  onDocumentClick(): void {
    if (this.infoMessage) {
      this.infoMessage = '';
    }
  }
}
