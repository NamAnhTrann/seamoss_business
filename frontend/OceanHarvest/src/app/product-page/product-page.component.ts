import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Product } from '../../model/Product_model';
import { DbService } from '../../services/db.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.css'
})
export class ProductPageComponent  {
  productId: string = '';
  product: Product[] = [];

  sortTitleOption : string = "";
  stockFilter = {
    inStock: false,
    outOfStock: false,
  };

  priceRange = {
    from: 0,
    to: 100
  };

  filteredProduct: Product[] = [];

  constructor(private db:DbService, private router:Router){}

  ngOnInit() {
    this.getAllProducts();
  }

  getAllProducts(){
    this.db.getAllProducts().subscribe((data:any)=>{
      this.product = data;
      this.applyFilter();
    })
  }

  viewProduct(id:any){
    this.router.navigate(["/view-product", id])
}

addToCart(productId: string) {
  const qty = 1; // Or get dynamic value if needed
  this.db.addToCart(productId, qty).subscribe(
    (data: any) => {
      this.getAllProducts();
      console.log(data);
      alert("Item added to cart successfully!");
    },
    (err) => {
      if (err.status === 401) {
        this.router.navigate(["/login-page"]);
      } else {
        console.error("Error adding to cart:", err);
        alert("Error adding to cart. Please try again.");
      }
    }
  );
}


sortTitle() {
  if (!this.sortTitleOption) return; //gpt code is so fucking readable omg

  const [key, order] = this.sortTitleOption.split(",");

  if (key === "Title") {
    this.filteredProduct.sort((a, b) => {
      const titleA = a.productName.toLowerCase();
      const titleB = b.productName.toLowerCase();
      return order === 'ASC'
        ? titleA.localeCompare(titleB)
        : titleB.localeCompare(titleA); //iteriary, really ?
    });
  }
}

applyFilter(){
  this.filteredProduct = this.product.filter((p)=>{
    const matchesAvilability =
    (!this.stockFilter.inStock || p.productStock> 0) &&
    (!this.stockFilter.outOfStock || p.productStock === 0);
    const matchPrice =
    p.productPrice >= this.priceRange.from && p.productPrice <= this.priceRange.to

    return matchPrice && matchesAvilability
  });
  this.sortTitle();


}

resetFilters() {
  this.stockFilter = {
    inStock: false,
    outOfStock: false
  };

  this.priceRange = {
    from: 0,
    to: 9999
  };

  this.applyFilter(); // Re-apply to reset the view
}


}





