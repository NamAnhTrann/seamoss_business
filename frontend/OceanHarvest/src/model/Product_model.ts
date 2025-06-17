export class Product{
  _id:string;
  productName: string;
  productDescription: string;
  productStock: number;
  productCreatedAt: Date;
  productPrice:number;
  productUpdatedAt:Date;
  productImage: String;


  constructor(){
    this._id = '';
    this.productName = '';
    this.productDescription = '';
    this.productStock = 0;
    this.productCreatedAt = new Date();
    this.productPrice = 0;
    this.productUpdatedAt = new Date();
    this.productImage = '';
  }
}
