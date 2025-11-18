export interface Product {
  PriceId: string;   // Stripe price ID to use during checkout
  name: string;
  description: string;
  price: number;    // amount in cents or normalized decimal for display only
  currency: string; // e.g., 'usd'
}
