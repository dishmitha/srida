import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { VendorDashboardComponent } from './components/vendor-dashboard/vendor-dashboard.component';
import { BuyerDashboardComponent } from './components/buyer-dashboard/buyer-dashboard.component';

export const routes: Routes = [
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'products', component: ProductListComponent },
  { path: 'vendor', component: VendorDashboardComponent },
  { path: 'buyer', component: BuyerDashboardComponent }
];
