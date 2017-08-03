import {Component} from '@angular/core';
import {Router } from '@angular/router';

import {CartItem} from '../../models/cartitem/cartitem.model';
import {CartService} from '../../services/cart/cart.service';

@Component({
	templateUrl : './basket.html'
})
export class BasketComponent {

		constructor(public _cartService: CartService) {
		}

		deleteItem(item : CartItem){
			this._cartService.deleteItem(item);
		}
}
