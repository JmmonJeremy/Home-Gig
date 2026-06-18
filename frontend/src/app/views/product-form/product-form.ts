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
    description: '',
    price: 0,
    inventoryQuantity: 0,
    inventoryStatus: 'In Stock'
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
            description: product.description,
            price: product.price,
            inventoryQuantity: product.inventoryQuantity,
            inventoryStatus: product.inventoryStatus
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

    if (this.isEditMode && this.productId) {
      this.productService.updateProduct(this.productId, this.product).subscribe({
        next: () => this.router.navigate(['/products']),
        error: () => this.errorMessage = 'Failed to update product.'
      });
    } else {
      this.productService.createProduct(this.product).subscribe({
        next: () => this.router.navigate(['/products']),
        error: () => this.errorMessage = 'Failed to create product.'
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/products']);
  }
}
