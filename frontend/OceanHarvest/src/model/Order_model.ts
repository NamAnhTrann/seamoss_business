import { OrderItem } from "./OrderItem_model";

export class Order{
  _id?: string;
  userPhone?: string;
  orderStatus?: 'Pending' | 'Paid' | 'Delivered' | 'Cancelled';
  orderSubTotal?: number;
  orderItems?: OrderItem[] | string[]; // if populated = OrderItem[], if not = ObjectId[]
  orderUser?: string; // MongoDB ObjectId
  orderLocation?: string; // or populate as a Location object if needed
  orderCreatedAt?: Date;
  orderTotalAmount?: number;
  orderUpdatedAt?: Date;

  constructor(){
    this.userPhone = '';
    this.orderStatus = 'Pending';
    this.orderSubTotal = 0;
    this.orderItems = [];
    this.orderUser = '';
    this.orderLocation = '';
    this.orderCreatedAt = new Date();
    this.orderTotalAmount = 0;
    this.orderUpdatedAt = new Date();
  }
}
