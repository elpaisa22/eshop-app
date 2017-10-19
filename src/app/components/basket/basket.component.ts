import {Component, OnInit} from '@angular/core';
import {Router } from '@angular/router';

import {CartItem} from '../../models/cartitem/cartitem.model';
import {CartService} from '../../services/cart/cart.service';

@Component({
	templateUrl : './basket.html'
})
export class BasketComponent implements OnInit {

		public subtotal : number;
		public totalPrice : number;
		public deliveryPrice : number;
		public interest : number;
		public items : CartItem[];
		public itemsCount : number;

		constructor(private cartService: CartService) {
		}

		ngOnInit() {
			//Asigna la data desde el servicio
			this.cartService.subtotalPrice.subscribe(data => this.subtotal = data);
			this.cartService.totalPrice.subscribe(data => this.totalPrice = data);
			this.cartService.deliveryPrice.subscribe(data => this.deliveryPrice = data);
			this.cartService.interest.subscribe(data => this.interest = data);
			this.cartService.items.subscribe(data => this.items = data);
			this.cartService.itemsCount.subscribe(data => this.itemsCount = data);
		}

		//Elimina un item del carrito
		public deleteItem(item : CartItem){
			this.cartService.deleteItem(item);
		}

		//Metodo que se ejecuta cuando se modifica la cantidad
		public itemsCountChanged(item : CartItem){
			if (item.count < 1) {
				item.count = 1;
			}
			this.cartService.clearPaymentData();
			this.cartService.updateItem(item);
			this.cartService.saveItems();
		}
}
