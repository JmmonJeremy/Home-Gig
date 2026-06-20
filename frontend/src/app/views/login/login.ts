import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit {
  email = '';
  password = '';
  rememberMe = true;
  errorMessage = '';
  infoMessage = '';

  private readonly rememberedEmailKey = 'homeGigRememberedEmail';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const savedEmail = localStorage.getItem(this.rememberedEmailKey);

    if (savedEmail) {
      this.email = savedEmail;
      this.rememberMe = true;
    }
  }

  onSubmit(): void {
    this.errorMessage = '';
    this.infoMessage = '';

    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        if (this.rememberMe) {
          localStorage.setItem(this.rememberedEmailKey, this.email);
        } else {
          localStorage.removeItem(this.rememberedEmailKey);
        }

        this.authService.saveToken(response.token);
        this.router.navigate(['/dashboard']);
      },
      error: () => {
        this.errorMessage = 'Invalid email or password';
      }
    });
  }

  onForgotPassword(event: Event): void {
    event.preventDefault();
    this.errorMessage = '';
    this.infoMessage = 'Password reset is not yet available. Please contact your administrator.';
  }

  onCreateAccount(event?: Event): void {
    event?.preventDefault();
    this.errorMessage = '';
    this.infoMessage = 'Account registration is not yet available.';
  }
}
