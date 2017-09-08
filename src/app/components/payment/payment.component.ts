import {Component, ElementRef, OnInit} from '@angular/core';
import {Router } from '@angular/router';

import {Checkout} from '../../models/checkout/checkout.model';

declare var Mercadopago:any;

@Component({
	templateUrl : './payment.html'
})
export class PaymentComponent implements OnInit {

	private _documentTypes : any;
	private _model : Checkout = new Checkout();
	private _token : any = [];
	private _errorsWithCard : boolean = false;

	constructor(private el: ElementRef) {
	}

	public ngOnInit() {
		Mercadopago.setPublishableKey("TEST-846d251c-6188-4a08-babc-927124773c8c");

		this._documentTypes = Mercadopago.getIdentificationTypes();
		this._errorsWithCard = false;
	}

	public sendForm() {
			console.log('Datos de la Tarjeta ' + JSON.stringify(this._model,null,2));

			Mercadopago.createToken(this._model, (status, response) => {
				if (status != 200 && status != 201) {
					this._errorsWithCard = true;
				} else {
					console.log("OK!");
					this._token = response;
				}

				console.log('Respuesta ' + JSON.stringify(this._token, null,2));
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
