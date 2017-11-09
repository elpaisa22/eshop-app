import {Component, OnInit} from '@angular/core';
import {Router } from '@angular/router';

import {CartItem} from '../../models/cartitem/cartitem.model';
import {CartService} from '../../services/cart/cart.service';

@Component({
	templateUrl : './comfirmation.html'
})
export class ComfirmationComponent implements OnInit {

		public items : CartItem[];

		constructor(private cartService: CartService) {
		}

		ngOnInit() {
			//Asigna la data desde el servicio
			this.cartService.items.subscribe(data => this.items = data);
		}

}
