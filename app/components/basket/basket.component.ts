import {Component} from '@angular/core';
import {Router } from '@angular/router';

import {CartItem} from '../../models/cartitem/cartitem.model';
import {CartService} from '../../services/cart/cart.service';

@Component({
	templateUrl : 'app/components/basket/basket.html',
	providers: [CartService]
})
export class BasketComponent {

		constructor(private _cartService: CartService) {
		}

		eliminarItem(item : CartItem){
			this._cartService.eliminarItem(item);
		}
}
