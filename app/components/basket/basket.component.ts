import {Component} from 'angular2/core';
import {Router, ROUTER_DIRECTIVES } from 'angular2/router';

import {CartItem} from '../../models/cartitem/cartitem.model';
import {CartService} from '../../services/cart/cart.service';

@Component({
	templateUrl : 'app/components/basket/basket.html',
  directives : [ROUTER_DIRECTIVES]
})
export class BasketComponent {

		constructor(private _cartService: CartService) {
		}

		eliminarItem(item : CartItem){
			this._cartService.eliminarItem(item);
		}
}
