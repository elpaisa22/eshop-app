import {Component, OnInit} from '@angular/core';
import {Router } from '@angular/router';

import {Delivery} from '../../models/checkout/checkout.model';

@Component({
	templateUrl : './delivery.html'
})
export class DeliveryComponent implements OnInit {

	private _model : Delivery;

	public ngOnInit() {
		this._model = new Delivery();
	}

	get model() {
		return this._model;
	}

	public sendForm() {
		
	}
}
