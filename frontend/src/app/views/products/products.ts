import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-products',
  standalone: false,
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products implements OnInit {
  products: any[] = [];
  selectedProduct: any = null;
  errorMessage = '';
  isLoading = false;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.productService.getProducts().subscribe({
      next: (products) => {
        this.products = products;
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Failed to load products.';
        this.isLoading = false;
      }
    });
  }

  addProductInline(): void {
    this.selectedProduct = {
      name: '',
      description: '',
      price: 0,
      inventoryQuantity: 0,
      inventoryStatus: 'In Stock'
    };
  }

  selectProduct(product: any): void {
    this.selectedProduct = { ...product };
  }

  clearSelectedProduct(): void {
    this.selectedProduct = null;
  }

  saveProduct(): void {
    this.errorMessage = '';

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
}