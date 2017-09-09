export class Payment {
  email : string;
  cardNumber : string;
  securityCode : number;
  cardExpirationMonth : number;
  cardExpirationYear : number;
  cardholderName : string;
  docType : string = 'DNI';
  docNumber : string;
  paymentMethodId : string;
  paymentMethodName : string;
  issuerId : string;
  issuerName : string;
  installments : number;
  additionalInfoNeeded : string[];
}

export class Delivery {
  method : string;
  address : Address;

  constructor() {
    this.address = new Address();
	}
}

export class Address {
  firstname : string;
  lastname : string;
  company : string;
  street : string;
  zip : string;
  city: string;
  state : string;
  country : string;
  phone : string;
  email : string;
}
