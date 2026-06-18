import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';

import { CustomerService } from '../../services/customer.service';
import { CustomerForm } from './customer-form';

describe('CustomerForm', () => {
  let component: CustomerForm;
  let fixture: ComponentFixture<CustomerForm>;
  let customerService: jasmine.SpyObj<CustomerService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    customerService = jasmine.createSpyObj('CustomerService', [
      'getCustomerById',
      'createCustomer',
      'updateCustomer'
    ]);
    router = jasmine.createSpyObj('Router', ['navigate']);

    customerService.getCustomerById.and.returnValue(of({}));

    await TestBed.configureTestingModule({
      declarations: [CustomerForm],
      imports: [FormsModule],
      providers: [
        {
          provide: CustomerService,
          useValue: customerService
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

    fixture = TestBed.createComponent(CustomerForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
