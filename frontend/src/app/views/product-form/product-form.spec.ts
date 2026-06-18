import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';

import { ProductService } from '../../services/product.service';
import { ProductForm } from './product-form';

describe('ProductForm', () => {
  let component: ProductForm;
  let fixture: ComponentFixture<ProductForm>;
  let productService: jasmine.SpyObj<ProductService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    productService = jasmine.createSpyObj('ProductService', [
      'getProductById',
      'createProduct',
      'updateProduct'
    ]);
    router = jasmine.createSpyObj('Router', ['navigate']);

    productService.getProductById.and.returnValue(of({}));

    await TestBed.configureTestingModule({
      declarations: [ProductForm],
      imports: [FormsModule],
      providers: [
        {
          provide: ProductService,
          useValue: productService
        },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({})
            }
          }
        },
        {
          provide: Router,
          useValue: router
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
