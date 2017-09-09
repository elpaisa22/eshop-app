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
	private _model : Payment;
	private _token : any = [];
	private _errorsWithCard : boolean = false;

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
					console.log("Token OK!");
					this._token = response;
					this.router.navigate(['/orderReview']);
				}
			});

	}

	get documentTypes() {
		return this._documentTypes;
	}

	get model() {
		return this._model;
	}

	get errorsWithCard() {
		return this._errorsWithCard;
	}
}
