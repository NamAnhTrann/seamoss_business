import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, tap } from 'rxjs';
const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
  withCredentials: true
};
@Injectable({
  providedIn: 'root'
})
export class DbService {
  cartItemCount$ = new BehaviorSubject<number>(0);
  private localUrl = "http://localhost:3030";
  // private onlineUrl = "http://3.107.97.50:3030";

  constructor(private http:HttpClient, private router: Router){}

  //--CONTACT--//
  addContactMessage(contactMessage: any){
    return this.http.post(`${this.localUrl}/add/contact/api`, contactMessage, httpOptions)
  }

  //--USER--//
  loginUser(user: any){
    return this.http.post(`${this.localUrl}/login/user/api`, user, httpOptions)
  }

  registerUser(user: any){
    return this.http.post(`${this.localUrl}/signup/user/api`, user, httpOptions)
  }

  updateUser(userData: any) {
    return this.http.put(`${this.localUrl}/update/user/info/api`, userData, httpOptions);
  }
  googleLogin() {
  window.location.href = `${this.localUrl}/auth/google`;
}

checkLoginStatus() {
  return this.http.get(`${this.localUrl}/auth/status`, {
    withCredentials: true
  });
}





  //--PRODUCTS--//
  getAllProducts(){
    return this.http.get(`${this.localUrl}/list/product/api`, httpOptions)
  }

  getProductById(id: any){
    return this.http.get(`${this.localUrl}/list/product/api/${id}`, httpOptions)
  }

  //--CART--//
  addToCart(productId: string, cartQuantity: number) {
    const body = { productId, cartQuantity };
    return this.http.post(`${this.localUrl}/add/item/to/cart/api`, body, httpOptions).pipe(
      tap(()=>{
        this.refreshCartCount();
      })
    );
  }
  //ChatPT code: this method is used to refresh the cart count in the header component
  refreshCartCount() {
    this.getCartItems().subscribe((data: any) => {
      const count = Array.isArray(data.items) ? data.items.length : 0;
      this.cartItemCount$.next(count);
    });
  }


  getCartItems(){
    return this.http.get(`${this.localUrl}/list/cart/api`, httpOptions);
  }
  //this delete the entire cart
  deleteCart() {
    return this.http.delete(`${this.localUrl}/delete/item/from/cart/api`, httpOptions);
  }


  //---ORDER--//
  deliveryAdress(userLocation: any) {
    return this.http.post(`${this.localUrl}/add/delivery/address/api`, userLocation, httpOptions)
  }

  createOrder(payload: any) {
    return this.http.post(`${this.localUrl}/create/order/api`, payload, httpOptions);
  }


  //--PAYMENT--//
  processPayment(paymentData: any) {
    return this.http.post(`${this.localUrl}/payment/api`, paymentData, httpOptions);
  }










}
