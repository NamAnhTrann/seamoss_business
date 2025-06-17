
export class User{
  _id?:string;
  userFirstName: string;
  userLastName: string;
  userEmail: string;
  userPhoneNumber: number;
  userCreatedAt: Date;
  userPassword:string;

  constructor(){
    this.userEmail = '';
    this.userFirstName = '';
    this.userLastName = '';
    this.userCreatedAt = new Date();
    this.userPassword = '';
    this.userPhoneNumber = 0;

  }
}
