export class Checkout {
  email : string;
  cardNumber : string;
  securityCode : number;
  cardExpirationMonth : number;
  cardExpirationYear : number;
  cardholderName : string;
  docType : string = 'DNI';
  docNumber : string;
}
