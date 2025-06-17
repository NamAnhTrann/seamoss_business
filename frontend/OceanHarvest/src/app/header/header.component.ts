  import { CommonModule } from '@angular/common';
  import { ChangeDetectorRef, Component, HostListener } from '@angular/core';
  import { FormsModule } from '@angular/forms';
  import { Router, RouterLink } from '@angular/router';
  import { Cart } from '../../model/Cart_model';
  import { DbService } from '../../services/db.service';

  @Component({
    selector: 'app-header',
    standalone: true,
    imports: [FormsModule, CommonModule, RouterLink],
    templateUrl: './header.component.html',
    styleUrl: './header.component.css'
  })
  export class HeaderComponent {
  mobileMenuOpen: boolean = false;
  isScroll: boolean = false;
  isHomePage: boolean = false;
  isErrorPage: boolean = false;
  isLoginPage: boolean = false;
  cartItemCount: number = 0;

  cart:Cart = new Cart();



  constructor(private router: Router, private db:DbService){
    this.router.events.subscribe(()=>{
      this.isHomePage = this.router.url === '/';
      this.isErrorPage = this.router.url === "/error-page"
      this.isLoginPage = this.router.url === "/login"
    });
  }

  ngOnInit(): void {
    this.db.cartItemCount$.subscribe((count) => {
      this.cartItemCount = count;
      console.log("Live cart count:", count);
    });

    // Ensure count is refreshed once on load
    this.db.refreshCartCount();
  }


    @HostListener("window:scroll", [])
    onWindowScroll(){
      this.isScroll = window.scrollY > 10;
    }

    toggleMenu() {
      this.mobileMenuOpen = !this.mobileMenuOpen;
    }


  }
