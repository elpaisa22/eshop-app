import {Component, ElementRef, OnInit} from '@angular/core';
import {Router } from '@angular/router';

import {Payment} from '../../models/checkout/checkout.model';
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

	private _cardNumberFilled : boolean = false;
	private _errorsWithCard : boolean = false;
	private _issuerIdRequired : boolean = false;

	constructor(private el: ElementRef, public _cartService: CartService, private router : Router) {
	}

	public ngOnInit() {
		//Si aun no eligio el metodo de envio, redirige al metodo de envio
		if (this._cartService.delivery == null) {
				this.router.navigate(['/delivery']);
		} else {
			this._model = this._cartService.payment;
			if (this._model == null) {
				this._model = new Payment();
			} else {
				this._cardNumberFilled = true;
				if (this.methodRequireIssuerId(this._model.additionalInfoNeeded)) {
					  this._issuerIdRequired = true;
						this.loadIssuers(this._model.paymentMethodId);
				}
				var bin = this._model.cardNumber.replace(/[ .-]/g, '').slice(0, 6);
				var amount = this._cartService.totalPrice;
				this.loadInstallments(bin, amount);
			}

			Mercadopago.setPublishableKey("TEST-846d251c-6188-4a08-babc-927124773c8c");

			Mercadopago.getIdentificationTypes((data, result) => {
				this._documentTypes = result
			});
			this._errorsWithCard = false;
		}
	}

	public sendForm() {
		  this._cartService.payment = this._model;
			Mercadopago.createToken(this._model, (status, response) => {
				if (status != 200 && status != 201) {
					this._errorsWithCard = true;
				} else {
					this._cartService.token = response;
					this.router.navigate(['/orderReview']);
				}
			});

	}

	public onCardNumberChange(event: any) {
		if (this._model.cardNumber && this._model.cardNumber.replace(/[ .-]/g, '').length == 16) {
			    var bin = this._model.cardNumber.replace(/[ .-]/g, '').slice(0, 6);
          this.loadPaymentMethod(bin);
      } else {
				this.cardNumberNotCorrect();
			}
  }

	private loadPaymentMethod(bin : string) {
		Mercadopago.getPaymentMethod({
				"bin": bin
		}, (status, response) => {
			if (status != 200 && status != 201) {
				this.cardNumberNotCorrect();
			} else {
				var method = response[0];
				this._model.paymentMethodId = method.id;
				this._model.paymentMethodName = method.name;
				this._model.additionalInfoNeeded = method.additional_info_needed;
				this._model.issuerId = null;
				this._model.issuerName = null;
				this._model.installments = 1;

				if (this.methodRequireIssuerId(this._model.additionalInfoNeeded)) {
					  this._issuerIdRequired = true;
						this.loadIssuers(this._model.paymentMethodId);
				} else {
					  this._issuerIdRequired = false;
						this._issuers = null;
				}
				var amount = this._cartService.totalPrice;
        this.loadInstallments(bin, amount);

				this._cardNumberFilled = true;
			}
		});
	}

  private loadIssuers(paymentMethodId : string) {
			Mercadopago.getIssuers(paymentMethodId, (status, response) => {
				if (status != 200 && status != 201) {
					this._issuers = null;
				} else {
					this._issuers = response;
				}
			});
	}

  private loadInstallments(bin : string, amount : number) {
		  Mercadopago.getInstallments({"bin": bin,"amount": amount}, (status, response) => {
				if (status != 200 && status != 201) {
					this._installments = null;
				} else {
					var installment = response[0];
					if (this._model.issuerId == null) {
						this._model.issuerId = installment.issuer.id;
						this._model.issuerName = installment.issuer.name;
					}					
					this._installments = installment.payer_costs;
				}
			});
	}

  private methodRequireIssuerId(additionalInfoNedded : String[]) : boolean {
			return additionalInfoNedded.indexOf('issuer_id') > 0;
	}

	private cardNumberNotCorrect(){
		this._model.paymentMethodId = null;
		this._model.paymentMethodName = null;
		this._cardNumberFilled = false;
		this._model.issuerId = null;
		this._model.issuerName = null;
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

	get model() {
		return this._model;
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
