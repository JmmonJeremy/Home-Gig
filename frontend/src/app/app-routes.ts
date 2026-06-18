import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

import { Login } from './views/login/login';
import { Dashboard } from './views/dashboard/dashboard';
import { Products } from './views/products/products';
import { Customers } from './views/customers/customers';
import { Orders } from './views/orders/orders';
import { Reports } from './views/reports/reports';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'login', component: Login },
  { path: 'dashboard', component: Dashboard, canActivate: [AuthGuard] },
  { path: 'products', component: Products, canActivate: [AuthGuard] },
  { path: 'customers', component: Customers, canActivate: [AuthGuard] },
  { path: 'orders', component: Orders, canActivate: [AuthGuard] },
  { path: 'reports', component: Reports, canActivate: [AuthGuard] },

  { path: '**', redirectTo: 'login' }
];