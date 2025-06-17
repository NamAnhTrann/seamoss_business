import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { DbService } from '../../services/db.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  userEmail = '';
  userPassword = '';

  constructor(private db:DbService, private router:Router){}

  LoginUser(){
    const user = {
      userEmail: this.userEmail,
      userPassword: this.userPassword
    };
    this.db.loginUser(user).subscribe((res:any)=>{
      this.db.refreshCartCount();
      this.router.navigate(["/"]);
      console.log(res);
    },
    (err:any)=>{
      console.log(err);
      alert("Invalid username or password")
    }
  )}

  loginWithGoogle() {
    this.db.googleLogin();
}
}
