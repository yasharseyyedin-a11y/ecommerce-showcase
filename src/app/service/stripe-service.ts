import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { CartService } from './cart';
import { environment } from '../../environments';

@Injectable({
  providedIn: 'root',
})
export class StripeService {
  private http = inject(HttpClient);
  private cartService = inject(CartService);

  async checkout(customerDetails: Partial<{ email: string | null }>): Promise<void> {
    const cart = await firstValueFrom(this.cartService.cartItems$);

    const line_items = cart.map((item) => ({
      price_data: {
        currency: 'usd',
        product_data: { name: item.product.name },
        unit_amount: Math.round(item.product.price * 100),
      },
      quantity: item.quantity,
    }));

    const payload = {
      line_items,
      customerDetails,
    };

    // Call backend to create a Stripe checkout session which returns checkoutUrl
    const response: any = await this.http.post(environment.apiUrl + '/create-checkout-session/', payload).toPromise();

    if (response.sessionURL) {
      // Use standard browser navigation to redirect to Stripe checkout
      window.location.href = response.sessionURL;
    } else {
      console.error('No checkoutUrl returned from backend');
    }
  }
}
