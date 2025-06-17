import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Contact } from '../../model/ContactUs_model';
import { DbService } from '../../services/db.service';

@Component({
  selector: 'app-contact-us-page',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './contact-us-page.component.html',
  styleUrl: './contact-us-page.component.css'
})
export class ContactUsPageComponent {
  contact: Contact[] = [];
  contactData: Contact = new Contact();

  constructor(private db:DbService, private router:Router){}

  addContact(){
    this.db.addContactMessage(this.contactData).subscribe((res)=>{
      this.contactData = new Contact();
      console.log(res);
      alert('Your message has been sent. Thank you!');

    })
  }


}
