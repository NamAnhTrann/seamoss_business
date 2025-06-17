import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { DbService } from '../../services/db.service';
import { User } from '../../model/User_mode';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  user: User = new User();

  constructor(private db: DbService, private router: Router) {}

  registerUser() {
    this.user.userCreatedAt = new Date();

    this.db.registerUser(this.user).subscribe({
      next: (res) => {
        console.log('Signup success:', res);
        this.router.navigate(['/login-page']);
        alert('Signup successful!');
      },
      error: (err) => {
        console.error('Signup error:', err);
        alert(err.error?.message || 'Signup failed.');
      }
    });
  }



}
