import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'products', component: ProductListComponent },
  { path: 'vendor', component: VendorDashboardComponent },
  { path: 'buyer', component: BuyerDashboardComponent }
];
