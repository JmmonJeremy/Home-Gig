import { Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit, OnDestroy {
  infoMessage = '';
  searchText = '';
  showSearchCategories = false;
  readonly searchCategories = [
    { label: 'Products', path: '/products' },
    { label: 'Inventory', path: '/products' },
    { label: 'Customers', path: '/customers' },
    { label: 'Orders', path: '/orders' },
    { label: 'Payments', path: '/orders' }
  ];
  private readonly subscriptions = new Subscription();

  @ViewChild('appSearchInput') searchInput?: ElementRef<HTMLInputElement>;

  constructor(
    private authService: AuthService,
    private router: Router,
    private searchService: SearchService
  ) {}

  ngOnInit(): void {
    this.searchText = this.searchService.query;

    this.subscriptions.add(
      this.searchService.query$.subscribe((query) => {
        this.searchText = query;
      })
    );

    this.subscriptions.add(
      this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          // Wait until Angular has finished rendering
          setTimeout(() => {
            const searchInputIsFocused =
              document.activeElement === this.searchInput?.nativeElement;

            if (searchInputIsFocused) {
              this.onSearchFocus();
            } else {
              this.showSearchCategories = false;
            }
          }, 0);
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  onSearchInput(value: string): void {
    this.searchText = value;
    this.searchService.setQuery(value);
  }

  clearSearch(event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.searchText = '';
    this.searchService.clearQuery();
    this.searchInput?.nativeElement.focus();
  }

  onSearchFocus(): void {
    this.showSearchCategories = this.showsSearchCategoryDropdown();
  }

  selectSearchCategory(path: string): void {
    this.showSearchCategories = false;
    const hasSearchText = this.searchText.trim().length > 0;

    this.router.navigate([path]).then(() => {
      setTimeout(() => {
        if (!this.searchInput) {
          return;
        }

        this.searchInput.nativeElement.focus();

        if (hasSearchText) {
          this.searchInput.nativeElement.setSelectionRange(
            this.searchInput.nativeElement.value.length,
            this.searchInput.nativeElement.value.length
          );
        }
      }, 0);
    });
  }

  showsSearchCategoryDropdown(): boolean {
    const url = this.router.url.split('?')[0];
    return url.startsWith('/dashboard') || url.startsWith('/reports');
  }

  onProfileOption(event: MouseEvent, optionName: string): void {
    event.preventDefault();
    event.stopPropagation();
    this.infoMessage = `${optionName} is not yet available.`;
  }

  logout(event: MouseEvent): void {
    event.preventDefault();
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  // This will clear the message when user clicks anywhere else on the page
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement | null;

    if (!target?.closest('.profile-menu')) {
      this.infoMessage = '';
    }

    if (target && !target.closest('.search-box')) {
      this.showSearchCategories = false;
    }
  }
}
