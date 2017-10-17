import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {Delivery, Address} from '../../models/checkout/checkout.model';
import {CartService} from '../../services/cart/cart.service';

@Component({
	templateUrl : './address.html'
})
export class AddressComponent implements OnInit {

	private _model : Delivery = new Delivery();
	private _documentTypes = [{id : 'DNI', name : 'DNI'}];

	private _states = [
		{id: 0, name: "Ciudad Autónoma de Buenos Aires"},
		{id: 1, name: "Buenos Aires"},
		{id: 2, name: "Catamara"},
		{id: 3, name: "Córdoba"},
		{id: 4, name: "Corrientes"},
		{id: 5, name: "Entre Ríos"},
		{id: 6, name: "Jujuy"},
		{id: 7, name: "Mendoza"},
		{id: 8, name: "La Rioja"},
		{id: 9, name: "Salta"},
		{id: 10, name: "San Juan"},
		{id: 11, name: "San Luis"},
		{id: 12, name: "Santa Fe"},
		{id: 13, name: "Santiago del Estero"},
		{id: 14, name: "Tucumán"},
		{id: 15, name: "Chaco"},
		{id: 16, name: "Chubut"},
		{id: 17, name: "Formosa"},
		{id: 18, name: "Misiones"},
		{id: 19, name: "Neuquén"},
		{id: 20, name: "La Pampa"},
		{id: 21, name: "Río Negro"},
		{id: 22, name: "Santa Cruz"},
		{id: 23, name: "Tierra del Fuego"},
	];

	private _countries = [
		   {id: 0, name: "Argentina"}
  ]

	constructor(public cartService: CartService, private router : Router) {
	}

	//Se ejecuta al inicio
	public ngOnInit() {
		//Si aun no eligio el metodo de pago, redirige al metodo de pago
		if (this.cartService.getPayment() == null) {
				this.router.navigate(['/payment']);
		//Si aun no eligio el metodo de envio
		} else if (this.cartService.getDelivery() == null) {
				this.router.navigate(['/delivery']);
		} else {
			//Toma el modelo del cartService
			this._model = this.cartService.getDelivery();

			//Si aun no eligio el metodo de envio, redirige al metodo de envio
			if (this._model == null) {
					this.router.navigate(['/delivery']);
			} else if (this._model != null && this._model.address == null) {
					this._model.address = new Address();
			}
		}
	}

	get model() {
		return this._model;
	}

	get documentTypes() {
		return this._documentTypes;
	}

	get states() {
		return this._states;
	}

	get countries() {
		return this._countries;
	}

	//Envia el formulario
	public sendForm() {
		//Guarda el modelo en el cartService
		this.cartService.setDelivery(this._model);
		//Redirige a la vista de Pago
		this.router.navigate(['/orderReview']);
	}
}
