import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { App } from './app';
import { Login } from './views/login/login';
import { Dashboard } from './views/dashboard/dashboard';
import { Products } from './views/products/products';
import { ProductForm } from './views/product-form/product-form';
import { Customers } from './views/customers/customers';
import { CustomerForm } from './views/customer-form/customer-form';
import { Orders } from './views/orders/orders';
import { OrderForm } from './views/order-form/order-form';
import { Reports } from './views/reports/reports';
import { RouterModule } from '@angular/router';
import { routes } from './app-routes';

@NgModule({
  declarations: [
    App,
    Login,
    Dashboard,
    Products,
    ProductForm,
    Customers,
    CustomerForm,
    Orders,
    OrderForm,
    Reports
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    provideBrowserGlobalErrorListeners()
  ],
  bootstrap: [App]
})
export class AppModule { }
