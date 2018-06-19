import {Component, OnInit} from '@angular/core';
import {Router } from '@angular/router';

import {CartItem} from '../../models/cartitem/cartitem.model';
import {CartService} from '../../services/cart/cart.service';

@Component({
	templateUrl : './comfirmation.html'
})
export class ComfirmationComponent implements OnInit {

		public items : CartItem[];

		constructor(private cartService: CartService, private router : Router) {
		}

		ngOnInit() {
			//Asigna la data desde el servicio
			this.cartService.items.subscribe(data =>
																				{
																					this.items = JSON.parse(JSON.stringify(data))
																				});
		}

		//Se ejecuta cuando presiona el boton de continuar
		public continueBuying() {
			//Vacia el carrito
			this.cartService.cleanCart();
			this.router.navigate(['/home']);
		}
}
