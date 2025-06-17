import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { DbService } from '../../services/db.service';
import { Cart } from '../../model/Cart_model';
import { User } from '../../model/User_mode';
import { UserLocation } from '../../model/UserLocation_model';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-order-summary-page',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './order-summary-page.component.html',
  styleUrl: './order-summary-page.component.css'
})
export class OrderSummaryPageComponent {
  User: User = new User();
  Location: UserLocation = new UserLocation();
  cart: Cart | null = null;

  constructor(private db: DbService, private router: Router) {}

  ngOnInit(){
    this.getCartItems();
  }

  getCartItems() {
    this.db.getCartItems().subscribe((data: any) => {
      this.cart = data;
    });
  }

  cartTotalPrice() {
    let totalPrice = 0;
    if(this.cart?.items){
      this.cart.items.forEach((item) => {
        totalPrice += item.product_id.productPrice * item.quantity;
      });
    }
    return totalPrice;
  }

  getVAT(){
    return this.cartTotalPrice() * 0.1;
  }

  getTotalPrice(){
    return this.cartTotalPrice() + this.getVAT();
  }

  proceedToPayment() {
  this.db.deliveryAdress(this.Location).pipe(
    switchMap((locationRes: any) => {
      const payload = {
        orderLocation: locationRes._id
      };
      return this.db.createOrder(payload);
    }),
    switchMap((orderRes: any) => {
      console.log("Order created successfully:", orderRes);
      alert("Press OK to be redirect to payment page!")
      return this.db.processPayment({});
    })
  ).subscribe({
    next: (paymentRes: any) => {
      if (paymentRes?.url) {
        window.location.href = paymentRes.url; // Redirect to Stripe Checkout
      } else {
        alert("Failed to initiate Stripe session.");
      }
    },
    error: (err) => {
      console.error("Payment process failed:", err);
      alert("Something went wrong. Please try again.");
    }
  });
}














}
