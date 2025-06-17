import { CommonModule } from '@angular/common';
import { AfterViewInit, Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import 'flowbite';
import { initFlowbite } from 'flowbite';
import { DbService } from '../../services/db.service';
import { Product } from '../../model/Product_model';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent implements AfterViewInit {
  product: Product[] = [];
  constructor(private db:DbService, private router:Router){}
  ngAfterViewInit(): void {
  }
  ngOnInit(): void {
      initFlowbite();
      this.getProduct();
    }

  getProduct(){
    this.db.getAllProducts().subscribe((data:any)=>{
      this.product = data.slice(0,4);
    })
  }
  viewProduct(id:any){
    this.router.navigate(["/view-product", id])
}
}
