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

	public ngOnInit() {
		this._model = this._cartService.delivery;
		if (this._model == null) {
				this._model = new Delivery();
		}
	}

	get model() {
		return this._model;
	}

	public onDeliveryMethodChange(event: any) {
		if (this._model.method == 'NONE') {
			this._model.address = null;
			this._model.price = 0;
		} else {
			this._model.price = 200;
		}
		this._cartService.delivery = this.model;
	}

	public sendForm() {
		this.router.navigate(['/address']);
	}
}
