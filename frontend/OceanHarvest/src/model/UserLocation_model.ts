export class UserLocation{
  _id?:string;
  userLocationStreet: string;
  userLocationState: string;
  userLocationCity: string;
  userLocationCountry:string;

  constructor(){
    this.userLocationStreet = '';
    this.userLocationState = '';
    this.userLocationCity = '';
    this.userLocationCountry = '';
  }
}
