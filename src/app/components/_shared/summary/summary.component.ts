import {Component, OnInit} from '@angular/core';

import {CartService} from '../../../services/cart/cart.service';

@Component({
	templateUrl : './summary.html',
  selector : 'summary'
})
export class SummaryComponent implements OnInit {

	public subtotal : number;
	public totalPrice : number;
	public deliveryPrice : number;
	public interest : number;

	constructor(private cartService : CartService) {
  }

	ngOnInit() {
		//Asigna la data desde el servicio
		this.cartService.subtotalPrice.subscribe(data => this.subtotal = data);
		this.cartService.totalPrice.subscribe(data => this.totalPrice = data);
		this.cartService.deliveryPrice.subscribe(data => this.deliveryPrice = data);
		this.cartService.interest.subscribe(data => this.interest = data);
	}
}
