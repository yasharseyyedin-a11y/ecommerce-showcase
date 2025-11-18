import { Component, inject } from '@angular/core';
import { CartService } from '../service/cart';
import { CommonModule } from '@angular/common';
import { map, Observable } from 'rxjs';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cart-summary',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <a routerLink="/cart" class="cart-summary-link">
      🛒 Cart ({{ cartItemsCount$ | async }} -- {{cartItemsTotalPrice$  | async | currency}})
    </a>
  `,
  styles: [`
    .cart-summary-link {
      color: black;
      text-decoration: none;
      font-weight: bold;
      padding: 0 10px;
    }
  `]
})
export class CartSummaryComponent {
  private cartService = inject(CartService);

  cartItemsCount$: Observable<number> = this.cartService.cartItems$.pipe(
    map(items => items.reduce((acc, item) => acc + item.quantity, 0))
  );

  cartItemsTotalPrice$: Observable<number> = this.cartService.cartItems$.pipe(
  map(items => items.reduce((acc, item) => acc + (item.quantity * item.product.price), 0))
);
}
