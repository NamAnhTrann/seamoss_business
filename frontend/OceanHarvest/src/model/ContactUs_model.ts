export class Contact{
  _id?:string;
  contactFirstName: string;
  contactLastName: string;
  contactPhoneNumber: number | null;
  contactContactEmail: string;
  contactMessage: string;
  contactCreatedAt: Date;

  constructor(){
    this.contactContactEmail = '';
    this.contactFirstName = '';
    this.contactLastName = '';
    this.contactPhoneNumber = null ;
    this.contactMessage = '';
    this.contactCreatedAt = new Date();
  }
}
