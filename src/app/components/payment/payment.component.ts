import {Component, ElementRef, OnInit} from '@angular/core';
import {Router } from '@angular/router';

import {Payment, PaymentMethod} from '../../models/checkout/checkout.model';
import {CartService} from '../../services/cart/cart.service';

declare var Mercadopago:any;

@Component({
	templateUrl : './payment.html'
})
export class PaymentComponent implements OnInit {

	private _documentTypes : any;
	private _issuers : any;
	private _installments : any;

	private _model : Payment;
	private _method : PaymentMethod;

	private _cardNumberFilled : boolean = false;
	private _errorsWithCard : boolean = false;
	private _issuerIdRequired : boolean = false;

	constructor(private el: ElementRef, private cartService: CartService, private router : Router) {
	}

	//Se ejecuta al inicio
	public ngOnInit() {
		//Si aun no eligio el metodo de envio, redirige al metodo de envio
		if (this.cartService.getDelivery() == null) {
				this.router.navigate(['/delivery']);
		//Si aun no eligio la direccion
	} else if (this.cartService.getDelivery().address == null) {
				this.router.navigate(['/address']);
		} else {
			//Toma el pago y el metodo del cartService
			this._model = this.cartService.getPayment();
			this._method = this.cartService.getMethod();

			//Si el modelo no está inicializado, se crea
			if (this._model == null) {
				this._model = new Payment();
				this._method = new PaymentMethod();
			} else {
				//Indica que la tarjeta está OK
				this._cardNumberFilled = true;
				//Verifica si la tarjeta solicita el emisor
				if (this.methodRequireIssuerId(this._method.additionalInfoNeeded)) {
					  this._issuerIdRequired = true;
						this.loadIssuers(this._method.paymentMethodId);
				}
				//Carga las cuotas
				var bin = this._model.cardNumber.replace(/[ .-]/g, '').slice(0, 6);
				this.loadInstallments(bin, this.cartService.calcTotalPrice());
			}

			//Inicializa la API de MercadoPago
			Mercadopago.setPublishableKey("TEST-846d251c-6188-4a08-babc-927124773c8c");
			//Obtiene los tipos de Documento
			Mercadopago.getIdentificationTypes((data, result) => {
				this._documentTypes = result
			});

			//Marca que no existen errores con el numero de la tarjeta de credito
			this._errorsWithCard = false;
		}
	}

	//Envia el formulario
	public sendForm() {
			//Guarda el Pago y el Metodo de Pago
		  this.cartService.setPayment(this._model);
			this.cartService.setMethod(this._method);

			//Invoca la API de MercadoPago para crear el Token
			Mercadopago.createToken(this._model, (status, response) => {
				if (status != 200 && status != 201) {
					this._errorsWithCard = true;
				} else {
					//Si no ocurrieron errores, guarda el token en el cartService
					this.cartService.setToken(response);
					this.router.navigate(['/orderReview']);
				}
			});
	}

	//Cuando cambia la Tarjeta de Credito
	public onCardNumberChange(event: any) {
		//Si el numero ingresado es valido
		if (this._model.cardNumber && this._model.cardNumber.replace(/[ .-]/g, '').length == 16) {
					//Obtiene el bin y vuelve a cargar los pagos
			    var bin = this._model.cardNumber.replace(/[ .-]/g, '').slice(0, 6);
          this.loadPaymentMethod(bin);
      } else {
				//Indica que la tarjeta no es correcta
				this.cardNumberNotCorrect();
			}
  }

	//Cuando cambia la cantidad de cuotas
	public onInstallmentChange(event: any) {
		//Obtiene el plan de cuotas seleccionado
		let installment = this._installments.filter(x => x.installments == this._method.installments);
		//Carga el monto total
		this._method.totalAmount = installment[0].total_amount;
		//Guarda el metodo de pago en el cartService
		this.cartService.setMethod(this._method);
	}

	//Carga las opciones de Pago de acuerdo al bin de la tarjeta
	private loadPaymentMethod(bin : string) {
		Mercadopago.getPaymentMethod({
				"bin": bin
		}, (status, response) => {
			if (status != 200 && status != 201) {
				this.cardNumberNotCorrect();
			} else {
				//Si no ocurrieron errores, asigna el modo de pago
				//Ej: VISA, MASTERCARD, etc
				var method = response[0];
				this._method.paymentMethodId = method.id;
				this._method.paymentMethodName = method.name;
				this._method.additionalInfoNeeded = method.additional_info_needed;
				this._method.issuerId = null;
				this._method.issuerName = null;
				this._method.installments = 1;

				//Verifica si debe mostrar datos del emisor de la tarjeta
				if (this.methodRequireIssuerId(this._method.additionalInfoNeeded)) {
					  this._issuerIdRequired = true;
						this.loadIssuers(this._method.paymentMethodId);
				} else {
					  this._issuerIdRequired = false;
						this._issuers = null;
				}

				//Obtiene las cuotas para el metodo de pago
				this.loadInstallments(bin, this.cartService.calcTotalPrice());

				//Indica que el numero de la tarjeta de credito está cargada
				this._cardNumberFilled = true;
			}
		});
	}

	//Carga los emisores de la tarjeta (Bancos)
  private loadIssuers(paymentMethodId : string) {
			Mercadopago.getIssuers(paymentMethodId, (status, response) => {
				if (status != 200 && status != 201) {
					this._issuers = null;
				} else {
					this._issuers = response;
				}
			});
	}

	//Carga las cuotas disponibles para el metodo de pago de la tarjeta
  private loadInstallments(bin : string, amount : number) {
		  Mercadopago.getInstallments({"bin": bin,"amount": amount}, (status, response) => {
				if (status != 200 && status != 201) {
					this._installments = null;
				} else {
					var installment = response[0];
					if (this._method.issuerId == null) {
						this._method.issuerId = installment.issuer.id;
						this._method.issuerName = installment.issuer.name;
					}
					this._installments = installment.payer_costs;
				}
			});
	}

	//Verifica si es obligatorio ingresar datos del emisor
  private methodRequireIssuerId(additionalInfoNedded : String[]) : boolean {
			return additionalInfoNedded.indexOf('issuer_id') > 0;
	}

	//Indica que el numero de tarjeta ingresado no es correcto
	private cardNumberNotCorrect(){
		this._method.paymentMethodId = null;
		this._method.paymentMethodName = null;
		this._cardNumberFilled = false;
		this._method.issuerId = null;
		this._method.issuerName = null;
		this._issuers = null;
		this._installments = null;
	}

	get documentTypes() {
		return this._documentTypes;
	}

	get issuers() {
		return this._issuers;
	}

	get installments() {
		return this._installments;
	}

	get model() : Payment {
		return this._model;
	}

	get method() : PaymentMethod {
		return this._method;
	}

	get cardNumberFilled() : boolean {
		return this._cardNumberFilled;
	}

	get errorsWithCard() : boolean {
		return this._errorsWithCard;
	}

	get issuerIdRequired() : boolean {
		return this._issuerIdRequired;
	}
}
