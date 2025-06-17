import { Product } from "./Product_model";

export class CartItem {
  _id: string;  // can be expanded later to hold more product info
  product_id: Product;  // can be expanded later to hold more product info
  quantity: number;

  constructor(){
    this._id = '';
    this.product_id = new Product();
    this.quantity = 0;
  }
}
