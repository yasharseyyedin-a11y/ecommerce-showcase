import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../service/cart';
import { Observable } from 'rxjs';
import { RouterLink, RouterModule } from '@angular/router';
import { Product } from '../product-list/product';

@Component({
  selector: 'app-cart',
  standalone: true,
  styleUrl: 'cart-details.css',
  imports: [CommonModule, RouterModule, RouterLink],
  templateUrl: './cart-details.html',
})
export class CartDetailsComponent {
  cartItems$: Observable<{ product: Product; quantity: number }[]>;
  cartService = inject(CartService);

  constructor() {
    this.cartItems$ = this.cartService.cartItems$;
  }

  incrementQuantity(productId: string) {
    this.cartService.addToCartById(productId, 1);
  }

  decrementQuantity(productId: string) {
    this.cartService.addToCartById(productId, -1);
  }

  removeItem(productId: string) {
    this.cartService.removeFromCart(productId);
  }

  clearCart() {
    this.cartService.clearCart();
  }

  getTotal(items: { product: any; quantity: number }[]) {
    return items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  }
}
