import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-form',
  standalone: false,
  templateUrl: './product-form.html',
  styleUrl: './product-form.css',
})
export class ProductForm implements OnInit {
  productId: string | null = null;
  isEditMode = false;
  errorMessage = '';

  product = {
    name: '',
    inventoryQuantity: 0,
    price: 0
  };

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!this.productId;

    if (this.isEditMode && this.productId) {
      this.productService.getProductById(this.productId).subscribe({
        next: (product) => {
          this.product = {
            name: product.name,
            inventoryQuantity: product.inventoryQuantity,
            price: product.price
          };
        },
        error: () => {
          this.errorMessage = 'Failed to load product.';
        }
      });
    }
  }

  onSubmit(): void {
    this.errorMessage = '';

    const productPayload = {
      name: this.product.name,
      description: '',
      inventoryQuantity: this.product.inventoryQuantity,
      price: this.product.price,
      inventoryStatus: this.getInventoryStatus(this.product.inventoryQuantity)
    };

    if (this.isEditMode && this.productId) {
      this.productService.updateProduct(this.productId, productPayload).subscribe({
        next: () => this.router.navigate(['/products']),
        error: () => this.errorMessage = 'Failed to update product.'
      });
    } else {
      this.productService.createProduct(productPayload).subscribe({
        next: () => this.router.navigate(['/products']),
        error: () => this.errorMessage = 'Failed to create product.'
      });
    }
  }

  deleteProduct(): void {
    if (!this.productId) {
      return;
    }

    if (!confirm('Are you sure you want to delete this product?')) {
      return;
    }

    this.productService.deleteProduct(this.productId).subscribe({
      next: () => this.router.navigate(['/products']),
      error: () => this.errorMessage = 'Failed to delete product.'
    });
  }

  cancel(): void {
    this.router.navigate(['/products']);
  }

  private getInventoryStatus(quantity: number): string {
    if (quantity <= 0) {
      return 'Out of Stock';
    }

    if (quantity <= 3) {
      return 'Critical Level';
    }

    if (quantity <= 10) {
      return 'Low Stock';
    }

    return 'In Stock';
  }
}