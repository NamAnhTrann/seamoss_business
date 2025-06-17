import { CartItem } from "./CartItem_model";

export class Cart{
  _id: string;
  user_id: string;
  items: CartItem[] = [];
  createdAt: Date;
  updatedAt: Date;

  constructor(){
    this._id = '';
    this.user_id = '';
    this.createdAt = new Date();
    this.updatedAt = new Date();

  }
}
