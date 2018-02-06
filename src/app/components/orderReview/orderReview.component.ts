import {Component, OnInit} from '@angular/core';
import {Router } from '@angular/router';

import {CartItem} from '../../models/cartitem/cartitem.model';
import {CartService} from '../../services/cart/cart.service';
import {CheckoutRepository} from '../../repositories/checkout/checkout.repository';

@Component({
	templateUrl : './orderReview.html'
})
export class OrderReviewComponent implements OnInit {

	public totalPrice : number;
	public  items : CartItem[];

	public hasErrors : boolean = false;
	public errors : String;

  constructor(private cartService: CartService,
					    private checkoutRepository : CheckoutRepository,
					    private router : Router) {
  }

	//Se ejecuta al inicio
	public ngOnInit() {
		//Si aun no eligio el metodo de envio,redirige al metodo de envio
		if (this.cartService.getDelivery() == null) {
				this.router.navigate(['/delivery']);
		} else if (this.cartService.getPayment() == null
			         || this.cartService.getPayment() == null) {
				this.router.navigate(['/payment']);
		}

		//Asigna la data desde el servicio
		this.cartService.totalPrice.subscribe(data => this.totalPrice = data);
		this.cartService.items.subscribe(data => this.items = data);
	}

	//Envia los datos al backend
	public sendData() {
		let result = this.checkoutRepository
		                 .sendCheckoutData(this.cartService.getDelivery(),
		                                   this.cartService.getPayment(),
										   this.cartService.getToken(),
										   this.items);

		// verifica el resultado
   	result.subscribe(
           (res) => {
           	   var response = res.json();
           	   if (response.success) {
           	   	this.router.navigate(['/comfirmation']);
							} else {
								this.showErrors(response.errors);
							}
           },
           err => {
               // Log errors if any
               //console.log(err);
               this.showErrors(err)
           }
		);
	}

	//Muestra un popup con error
	private showErrors(msg : String) {
		this.hasErrors = true;
		this.errors = msg;
	}

	//Cierra el popup de errores
	public closeErrors() {
		this.hasErrors = false;
	}
}
