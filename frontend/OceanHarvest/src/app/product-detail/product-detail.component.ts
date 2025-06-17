import { Component } from '@angular/core';
import { DbService } from '../../services/db.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent {
  productId: string = '';
  product: any = {};
  selectedAmount: number = 0;

  constructor(private db: DbService, private router: Router, private route:ActivatedRoute){}

  ngOnInit(){
    this.route.paramMap.subscribe(params => {
      const productId = params.get('id')!;
      this.productId = productId;
      this.getProductById(productId);
  });
  }

  getProductById(id: string){
    this.db.getProductById(id).subscribe((data:any)=>{
      console.log(data);
      this.product = data;
    })
  }

  decreaseQuantity(){
    if(this.selectedAmount > 0){
      this.selectedAmount --;
    }
  }

  increaseQuantity() {
    if (this.selectedAmount < this.product.productStock) {
      this.selectedAmount++;
    }
  }



  addToCart(){
    this.db.addToCart(this.productId, this.selectedAmount).subscribe((data:any)=>{
      this.getProductById(this.productId);
      console.log(data);
       alert("Item added to cart successfully!");
    },
    (err) => {
      if (err.status === 401) {
        this.router.navigate(["/login-page"]);
      } else {
        console.error("Error adding to cart:", err);
      }
    })
  }





}
