import {Component} from 'angular2/core';
import {Router, ROUTER_DIRECTIVES } from 'angular2/router';

import {Product} from '../../models/product/product.model';
import {CartService} from '../../services/cart/cart.service';

@Component({
	templateUrl : 'app/components/basket/basket.html',
  directives : [ROUTER_DIRECTIVES],
	providers : [CartService]
})
export class BasketComponent{

		items: Product[];

		constructor(private _cartService: CartService) {
		}

	  reloadItems() {
		    this.items = this._cartService.getItems();
	  }

	  ngOnInit() {
	    this.reloadItems();
	  }

}
