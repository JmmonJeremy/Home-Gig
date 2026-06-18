import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';

import { CustomerService } from '../../services/customer.service';
import { OrderService } from '../../services/order.service';
import { ProductService } from '../../services/product.service';
import { OrderForm } from './order-form';

describe('OrderForm', () => {
  let component: OrderForm;
  let fixture: ComponentFixture<OrderForm>;
  let customerService: jasmine.SpyObj<CustomerService>;
  let orderService: jasmine.SpyObj<OrderService>;
  let productService: jasmine.SpyObj<ProductService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    customerService = jasmine.createSpyObj('CustomerService', ['getCustomers']);
    orderService = jasmine.createSpyObj('OrderService', [
      'getOrderById',
      'createOrder',
      'updateOrder'
    ]);
    productService = jasmine.createSpyObj('ProductService', ['getProducts']);
    router = jasmine.createSpyObj('Router', ['navigate']);

    customerService.getCustomers.and.returnValue(of([]));
    productService.getProducts.and.returnValue(of([]));

    await TestBed.configureTestingModule({
      declarations: [OrderForm],
      imports: [CommonModule, FormsModule],
      providers: [
        {
          provide: CustomerService,
          useValue: customerService
        },
        {
          provide: OrderService,
          useValue: orderService
        },
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

    fixture = TestBed.createComponent(OrderForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
