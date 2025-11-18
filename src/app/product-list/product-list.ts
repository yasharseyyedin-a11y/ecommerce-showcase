import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from './product';
import { CartService } from '../service/cart';
import { CartSummaryComponent } from "../cart-summary/cart-summary";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-list',
  standalone: true,
  styleUrl: 'product-list.css',
  imports: [CommonModule, CartSummaryComponent, RouterLink],
  templateUrl: 'product-list.html'
})

export class ProductListComponent implements OnInit {
  products = signal<Product[]>([]);
  ngOnInit() {
    this.products.set([
      { PriceId: "prod_TRFFFoCxjOV7Sq", name: "T-Shirt", description: "no description", price: 10, currency:'usd' },
      { PriceId: "prod_TRFGN1kqYHhnrX", name: "Glasses", description: "no description", price: 30, currency:'usd' },
    ]);
  }

  cartService = inject(CartService);

  addToCart(product: any) {
    this.cartService.addToCart(product);
  }
}
