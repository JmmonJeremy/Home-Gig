import { Routes } from '@angular/router';

import { Login } from './views/login/login';
import { Dashboard } from './views/dashboard/dashboard';
import { Products } from './views/products/products';
import { Customers } from './views/customers/customers';
import { Orders } from './views/orders/orders';
import { Reports } from './views/reports/reports';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'login', component: Login },
  { path: 'dashboard', component: Dashboard },
  { path: 'products', component: Products },
  { path: 'customers', component: Customers },
  { path: 'orders', component: Orders },
  { path: 'reports', component: Reports },

  { path: '**', redirectTo: 'login' }
];