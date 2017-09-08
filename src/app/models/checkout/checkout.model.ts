export class Payment {
  email : string;
  cardNumber : string;
  securityCode : number;
  cardExpirationMonth : number;
  cardExpirationYear : number;
  cardholderName : string;
  docType : string = 'DNI';
  docNumber : string;
}

export class Delivery {
  method : string;
}
