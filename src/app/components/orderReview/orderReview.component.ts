import {Component, OnInit} from '@angular/core';
import {Router } from '@angular/router';

import {CartService} from '../../services/cart/cart.service';

@Component({
	templateUrl : './orderReview.html'
})
export class OrderReviewComponent implements OnInit {

    constructor(public _cartService: CartService, private router : Router) {
    }

		public ngOnInit() {
			//Si aun no eligio el metodo de envio,redirige al metodo de envio
			if (this._cartService.delivery == null) {
					this.router.navigate(['/delivery']);
			//Si aun no eligio la direccion
			} else if (this._cartService.delivery.address == null) {
						this.router.navigate(['/address']);
			//Si aun no eligio el metodo de pago, redirige al pago
			} else if (this._cartService.method == null
				         || this._cartService.payment == null) {
					this.router.navigate(['/payment']);
			}
		}
}
