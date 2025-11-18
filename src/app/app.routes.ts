import { Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list';
import { CartDetailsComponent } from './cart-details/cart-details';
import { CheckoutComponent } from './checkout/checkout';
import { SuccessPageComponent } from './success-page/success-page';

export const routes: Routes = [
  { path: 'products', component: ProductListComponent },
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  { path: 'cart', component: CartDetailsComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'success', component: SuccessPageComponent },
  { path: 'home', component: ProductListComponent }
];
