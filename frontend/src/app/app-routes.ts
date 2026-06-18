import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

import { Login } from './views/login/login';
import { Dashboard } from './views/dashboard/dashboard';
import { Products } from './views/products/products';
import { ProductForm } from './views/product-form/product-form';
import { Customers } from './views/customers/customers';
import { CustomerForm } from './views/customer-form/customer-form';
import { Orders } from './views/orders/orders';
import { Reports } from './views/reports/reports';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'login', component: Login },
  { path: 'dashboard', component: Dashboard, canActivate: [AuthGuard] },
  { path: 'products', component: Products, canActivate: [AuthGuard] },
  { path: 'products/new', component: ProductForm, canActivate: [AuthGuard] },
  { path: 'products/:id/edit', component: ProductForm, canActivate: [AuthGuard] },
  { path: 'customers', component: Customers, canActivate: [AuthGuard] },
  { path: 'customers/new', component: CustomerForm, canActivate: [AuthGuard] },
  { path: 'customers/:id/edit', component: CustomerForm, canActivate: [AuthGuard] },
  { path: 'orders', component: Orders, canActivate: [AuthGuard] },
  { path: 'reports', component: Reports, canActivate: [AuthGuard] },

  { path: '**', redirectTo: 'login' }
];