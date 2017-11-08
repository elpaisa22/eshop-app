import {Component, OnInit} from '@angular/core';
import {Router } from '@angular/router';

import {CartItem} from '../../models/cartitem/cartitem.model';
import {CartService} from '../../services/cart/cart.service';
import {CheckoutRepository} from '../../repositories/checkout/checkout.repository';

@Component({
	templateUrl : './orderReview.html'
})
export class OrderReviewComponent implements OnInit {

	public subtotal : number;
	public  items : CartItem[];

	public hasErrors : boolean = false;
	public errors : String;

  constructor(private cartService: CartService,
					    private _checkoutRepository : CheckoutRepository,
					    private router : Router) {
  }

	//Se ejecuta al inicio
	public ngOnInit() {
		//Si aun no eligio el metodo de envio,redirige al metodo de envio
		if (this.cartService.getDelivery() == null) {
				this.router.navigate(['/delivery']);
		//Si aun no eligio la direccion
		} else if (this.cartService.getDelivery().address == null) {
				this.router.navigate(['/address']);
		//Si aun no eligio el metodo de pago, redirige al pago
		} else if (this.cartService.getPayment() == null
			         || this.cartService.getPayment() == null) {
				this.router.navigate(['/payment']);
		}

		//Asigna la data desde el servicio
		this.cartService.subtotalPrice.subscribe(data => this.subtotal = data);
		this.cartService.items.subscribe(data => this.items = data);
	}

	//Envia los datos al backend
	public sendData() {
		let result = this._checkoutRepository
		                 .sendCheckoutData(this.cartService.getDelivery(),
		                                   this.cartService.getPayment(),
										   this.cartService.getToken(),
										   this.items);

		// verifica el resultado
   	result.subscribe(
           (res) => {
           	   var response = res.json();
           	   if (response.success) {
           	   	this.router.navigate(['/home']);
           	   }
           },
           err => {
               // Log errors if any
               //console.log(err);
               this.showErrors(err)
           }
		);
	}

	private showErrors(msg : String) {
		this.hasErrors = true;
		this.errors = msg;
	}

	public closeErrors() {
		this.hasErrors = false;
	}
}
