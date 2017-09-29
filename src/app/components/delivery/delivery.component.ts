import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {Delivery} from '../../models/checkout/checkout.model';
import {CartService} from '../../services/cart/cart.service';

@Component({
	templateUrl : './delivery.html'
})
export class DeliveryComponent implements OnInit {

	private _model : Delivery;

	constructor(public _cartService: CartService, private router : Router) {
	}

	//Se ejecuta al inicio
	public ngOnInit() {
		//Intenta cargar el model desde el cartService
		this._model = this._cartService.getDelivery();
		//Si es null, crea uno nuevo
		if (this._model == null) {
				this._model = new Delivery();
		}
	}

	get model() {
		return this._model;
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
		this._cartService.setDelivery(this.model);
	}

	//Envia el formulario
	public sendForm() {
		this.router.navigate(['/address']);
	}
}
