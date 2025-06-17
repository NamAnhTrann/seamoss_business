export class OrderItem{
  _id?:string;
  productId?: string;
  productName?: string;
  productPrice?: number;
  quantity?: number;
  imagePath?: string;

  constructor(){
    this.productId = '';
    this.productName = '';
    this.productPrice = 0;
    this.quantity = 0;
    this.imagePath = '';
  }
}
