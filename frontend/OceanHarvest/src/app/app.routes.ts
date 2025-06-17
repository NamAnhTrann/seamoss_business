import { Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { ContactUsPageComponent } from './contact-us-page/contact-us-page.component';
import { AboutUsPageComponent } from './about-us-page/about-us-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { OrderSummaryPageComponent } from './order-summary-page/order-summary-page.component';

export const routes: Routes = [
  {path: "", component:HomepageComponent},
  {path: "contact-us", component: ContactUsPageComponent},
  {path: "aboutUs-page", component: AboutUsPageComponent},
  {path: "product-page", component: ProductPageComponent},
  {path: "view-product/:id", component: ProductDetailComponent},
  //this will tie to the customer itself
  {path: "cart-page", component: CartPageComponent},
  {path: "order-summary-page", component: OrderSummaryPageComponent},

  {path: "login-page", component: LoginPageComponent},
  {path: "sign-up", component: SignUpComponent},
  {path: "reset-passord", component: ResetPasswordComponent},
  // {path: "**", component: ErrorPageComponent}


];
