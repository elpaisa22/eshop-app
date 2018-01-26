export class Payment {
  cashPayment : boolean = false;
  card : Card;
  method : PaymentMethod;

  constructor() {
    this.card = new Card();
    this.method = new PaymentMethod();
	}
}

export class Card {
  email : string;
  phone : string;
  cardNumber : string;
  securityCode : number;
  cardExpirationMonth : number;
  cardExpirationYear : number;
  cardholderName : string;
  docType : string = 'DNI';
  docNumber : string;
}

export class PaymentMethod {
  paymentMethodId : string;
  paymentMethodName : string;
  issuerId : string;
  issuerName : string;
  installments : number;
  additionalInfoNeeded : string[];
  totalAmount : number;
}

export class Delivery {
  firstname : string;
  lastname : string;
  docType : string = 'DNI';
  docNumber : string;
  method : string;
  price : number;
  address : Address;
  quotedPrice : boolean = false;
  email : string;
  phone : string;

  constructor() {
    this.address = new Address();
	}
}

export class Address {
  street : string;
  number : string;
  apartment : string;
  zip : string;
  city: string;
  state : string;
  country : string;
}
