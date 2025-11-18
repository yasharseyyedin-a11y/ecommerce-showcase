import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../product-list/product';

@Injectable({ providedIn: 'root' })
export class CartService {
  private cartItems = new BehaviorSubject<{ product: Product; quantity: number }[]>([]);
  cartItems$ = this.cartItems.asObservable();

  addToCart(product: Product) {
    const items = [...this.cartItems.getValue()]; // clone array
    const index = items.findIndex(item => item.product.PriceId === product.PriceId);
    if (index > -1) {
      items[index] = {
        product: items[index].product,
        quantity: items[index].quantity + 1
      }; // create new object for item to break reference
    } else {
      items.push({ product, quantity: 1 });
    }
    this.cartItems.next(items); // emit new array instance
    console.log(this.cartItems);
  }


  // New method to increment or decrement quantity by product ID
  addToCartById(productId: string, quantityChange: number) {
    const items = this.cartItems.getValue();
    const index = items.findIndex(item => item.product.PriceId === productId);
    if (index > -1) {
      items[index].quantity += quantityChange;
      if (items[index].quantity <= 0) {
        items.splice(index, 1);
      }
    }
    this.cartItems.next([...items]);
  }

  removeFromCart(productId: string) {
    const items = this.cartItems.getValue().filter(item => item.product.PriceId !== productId);
    this.cartItems.next(items);
  }

  clearCart() {
    this.cartItems.next([]);
  }
}
