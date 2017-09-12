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

		get cartService() {
      return this._cartService;
    }

		//Elimina un item del carrito
		public deleteItem(item : CartItem){
			this._cartService.deleteItem(item);
		}

		//Metodo que se ejecuta cuando se modifica la cantidad
		public itemsCountChanged(){
			this._cartService.clearPaymentData();
			this._cartService.saveItems();
		}
}
