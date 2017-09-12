import {Component, OnInit} from '@angular/core';
import {Router } from '@angular/router';

import {CartService} from '../../services/cart/cart.service';
import {CheckoutRepository} from '../../repositories/checkout/checkout.repository';

@Component({
	templateUrl : './orderReview.html'
})
export class OrderReviewComponent implements OnInit {

    constructor(public _cartService: CartService,
			          private _checkoutRepository : CheckoutRepository,
			          private router : Router) {
    }

		get cartService() {
      return this._cartService;
    }

		//Se ejecuta al inicio
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

		//Envia los datos al backend
		public sendData() {
			let result = this._checkoutRepository
			                 .sendCheckoutData(this._cartService.delivery,
			                                   this._cartService.method,
												                 this._cartService.token,
																				 this._cartService.cart);
			 // verifica el resultado
       result.subscribe(
               () => {
                   this.router.navigate(['/home']);
               },
               err => {
                   // Log errors if any
                   console.log(err);
               }
			 );
		}
}
