import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {Delivery} from '../../models/checkout/checkout.model';
import {CartService} from '../../services/cart/cart.service';

@Component({
	templateUrl : './delivery.html'
})
export class DeliveryComponent implements OnInit {

	private _model : Delivery;
	private _cashPayment : boolean;

	constructor(public cartService: CartService, private router : Router) {
	}

	//Se ejecuta al inicio
	public ngOnInit() {
		//Si aun no eligio el metodo de pago, redirige al metodo de pago
		if (this.cartService.getPayment() == null) {
				this.router.navigate(['/payment']);
		} else {
			this._cashPayment = this.cartService.getPayment().cashPayment;
			//Intenta cargar el model desde el cartService
			this._model = this.cartService.getDelivery();
			//Si es null, crea uno nuevo
			if (this._model == null) {
					this._model = new Delivery();
			}
		}

	}

	get model() {
		return this._model;
	}

	get cashPayment() {
		return this._cashPayment;
	}

	//Cuando se modifica el metodo de envio
	public onDeliveryMethodChange(event: any) {
		if (this._model.method == 'NONE') {
			this._model.address = null;
			this._model.price = 0;
		} else {
			//TODO : Obtener el precio a partir de la API de Andreani
			this._model.price = 200;
		}
		this.cartService.setDelivery(this.model);
	}

	//Envia el formulario
	public sendForm() {
		this.router.navigate(['/address']);
	}
}
