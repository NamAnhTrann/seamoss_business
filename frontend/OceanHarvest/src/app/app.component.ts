import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from "./footer/footer.component";
import { HeaderComponent } from "./header/header.component";
import { initFlowbite } from 'flowbite';
import { DbService } from '../services/db.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FooterComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'OceanHarvest';

  constructor(private db:DbService){}


  ngOnInit(): void {
    initFlowbite();
    this.db.checkLoginStatus().subscribe(
    (user: any) => {
      console.log("Logged in user:", user.fullName);
      this.db.refreshCartCount();
    },
    (err) => {
      console.log("Not logged in — browsing as guest");
    }
  );
  }
}
