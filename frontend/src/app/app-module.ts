import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient, HTTP_INTERCEPTORS, withInterceptorsFromDi } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthInterceptor } from './interceptors/auth.interceptor';

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
import { Header } from './components/header/header';
import { Sidebar } from './components/sidebar/sidebar';
import { Payments } from './views/payments/payments';

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
    Reports,
    Header,
    Sidebar,
    Payments
  ],
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule.forRoot(routes),
    FormsModule   
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(withInterceptorsFromDi()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [App]
})
export class AppModule { }
