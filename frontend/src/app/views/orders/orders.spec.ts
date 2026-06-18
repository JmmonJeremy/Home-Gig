import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';

import { OrderService } from '../../services/order.service';
import { Orders } from './orders';

describe('Orders', () => {
  let component: Orders;
  let fixture: ComponentFixture<Orders>;
  let orderService: jasmine.SpyObj<OrderService>;

  beforeEach(async () => {
    orderService = jasmine.createSpyObj('OrderService', ['getOrders', 'deleteOrder']);
    orderService.getOrders.and.returnValue(of([]));

    await TestBed.configureTestingModule({
      declarations: [Orders],
      imports: [CommonModule],
      providers: [
        {
          provide: OrderService,
          useValue: orderService
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Orders);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
