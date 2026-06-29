import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductService } from '../../services/product.service';
import { SearchService } from '../../services/search.service';
import { matchesSearchQuery } from '../../utils/search.util';

@Component({
  selector: 'app-products',
  standalone: false,
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products implements OnInit, OnDestroy {
  products: any[] = [];
  filteredProducts: any[] = [];
  selectedProduct: any = null;
  editOriginalInventory: number | null = null;
  errorMessage = '';
  formErrorMessage = '';
  isLoading = false;
  searchQuery = '';
  private readonly subscriptions = new Subscription();

  get showInlineFormAlert(): boolean {
    if (!this.selectedProduct) {
      return false;
    }

    // Add mode: always reflect the value being entered.
    if (!this.selectedProduct._id) {
      return true;
    }

    // Edit mode: only once the inventory number has actually been changed.
    return this.selectedProduct.inventoryQuantity !== this.editOriginalInventory;
  }

  constructor(
    private productService: ProductService,
    private router: Router,
    private searchService: SearchService
  ) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.searchService.query$.subscribe((query) => {
        this.searchQuery = query;
        this.applySearch();
      })
    );

    this.loadProducts();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  loadProducts(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.productService.getProducts().subscribe({
      next: (products) => {
        this.products = products;
        this.applySearch();
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Failed to load products.';
        this.isLoading = false;
      }
    });
  }

  addProductInline(): void {
    this.formErrorMessage = '';
    this.editOriginalInventory = null;
    this.selectedProduct = {
      name: '',
      description: '',
      price: null,
      inventoryQuantity: null,
      inventoryStatus: 'In Stock'
    };
  }

  selectProduct(product: any): void {
    this.formErrorMessage = '';
    this.editOriginalInventory = product.inventoryQuantity;
    this.selectedProduct = { ...product };
  }

  clearSelectedProduct(): void {
    this.selectedProduct = null;
    this.editOriginalInventory = null;
    this.formErrorMessage = '';
  }

  saveProduct(): void {
    this.errorMessage = '';
    this.formErrorMessage = '';

    if (!this.selectedProduct.name || !this.selectedProduct.name.trim()) {
      this.formErrorMessage = 'Please enter a product name.';
      return;
    }

    if (this.selectedProduct.inventoryQuantity == null || this.selectedProduct.price == null) {
      this.formErrorMessage = 'Please enter both an inventory quantity and a price.';
      return;
    }

    if (this.selectedProduct.inventoryQuantity < 0 || this.selectedProduct.price < 0) {
      this.formErrorMessage = 'Inventory and price cannot be negative.';
      return;
    }

    if (this.selectedProduct._id) {
      this.productService.updateProduct(this.selectedProduct._id, this.selectedProduct).subscribe({
        next: () => {
          this.clearSelectedProduct();
          this.loadProducts();
        },
        error: () => this.errorMessage = 'Failed to update product.'
      });
    } else {
      this.productService.createProduct(this.selectedProduct).subscribe({
        next: () => {
          this.clearSelectedProduct();
          this.loadProducts();
        },
        error: () => this.errorMessage = 'Failed to create product.'
      });
    }
  }

  deleteProduct(id: string): void {
    if (!confirm('Are you sure you want to delete this product?')) {
      return;
    }

    this.productService.deleteProduct(id).subscribe({
      next: () => {
        this.clearSelectedProduct();
        this.loadProducts();
      },
      error: () => this.errorMessage = 'Failed to delete product.'
    });
  }

  goToReports(): void {
    this.router.navigate(['/reports']);
  }

  private applySearch(): void {
    if (!this.searchQuery.trim()) {
      this.filteredProducts = [...this.products];
      return;
    }

    this.filteredProducts = this.products.filter((product) =>
      matchesSearchQuery(
        this.searchQuery,
        product.name,
        product.inventoryQuantity,
        product.price
      )
    );
  }
}