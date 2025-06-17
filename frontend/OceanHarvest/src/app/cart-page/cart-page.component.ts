import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { DbService } from '../../services/db.service';
import { Cart } from '../../model/Cart_model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css'
})
export class CartPageComponent {
  cart: Cart | null = null;
  constructor(private db: DbService, private router: Router) {}


  ngOnInit() {
    this.getCartItems();
  }
  getCartItems() {
    this.db.getCartItems().subscribe((data: any) => {
      this.cart = data;
      console.log(this.cart);
    });
  }

  checkout(){
    this.router.navigate(["/order-summary-page"]);
  }
  cartTotalPrice(): number {
    let totalPrice = 0;
    if (this.cart?.items) {
      this.cart.items.forEach((item) => {
        totalPrice += item.product_id.productPrice * item.quantity;
      });
    }
    return totalPrice;
  }

  backToShop(){
    this.router.navigate(["/product-page"]);
  }



}
