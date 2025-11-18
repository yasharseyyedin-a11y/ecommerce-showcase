import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CartService } from '../service/cart';
import { StripeService } from '../service/stripe-service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-checkout',
  standalone: true,
  styleUrl: 'checkout.css',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './checkout.html',
})
export class CheckoutComponent {
  private fb = inject(FormBuilder);
  private cartService = inject(CartService);
  private stripeService = inject(StripeService);

  checkoutForm = this.fb.group({
    email: ['']
  });

  cartItems = this.cartService.cartItems$;

  // To show error messages from StripeService if needed
  errorMessage: string | null = null;

  async onSubmit() {
    if (this.checkoutForm.invalid) {
      this.errorMessage = 'Please fill in all required fields correctly.';
      return;
    }

    // Extract form values to pass to StripeService
    const customerDetails = this.checkoutForm.value;

    try {
      this.errorMessage = null;
      // Pass customer details along with cart items to StripeService
      await this.stripeService.checkout(customerDetails);
    } catch (error: any) {
      this.errorMessage = error?.message || 'An error occurred during checkout.';
      console.error('Stripe checkout error:', error);
    }
  }
}
