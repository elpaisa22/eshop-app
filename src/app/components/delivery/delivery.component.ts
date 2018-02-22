import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {Delivery, Address} from '../../models/checkout/checkout.model';
import {CartItem} from '../../models/cartitem/cartitem.model';
import {CartService} from '../../services/cart/cart.service';
import {CheckoutRepository} from '../../repositories/checkout/checkout.repository';

@Component({
	templateUrl : './delivery.html'
})
export class DeliveryComponent implements OnInit {

	private _model : Delivery;
	private _shippingEnabled : boolean;
	private _finished : boolean;

	public errors : string;
	public items : CartItem[];
	public loading : boolean;

	constructor(public cartService: CartService,
		          private checkoutRepository : CheckoutRepository,
		          private router : Router) {
	}

	//Se ejecuta al inicio
	public ngOnInit() {

    this._shippingEnabled = this.cartService.availableForShipping();

    //Intenta cargar el model desde el cartService
    this._model = this.cartService.getDelivery();
    //Si es null, crea uno nuevo
    if (this._model == null) {
        this._model = new Delivery();
    } else if (this._model.quotedPrice || this._model.method == 'NONE' || this._model.method == 'LOCAL') {
        this._finished = true;
    } else {
        this._finished = false;
    }

		//Asigna la data desde el servicio
		this.cartService.items.subscribe(data => this.items = data);
	}

	get model() : Delivery {
		return this._model;
	}

	get shippingEnabled() : boolean {
		return this._shippingEnabled;
	}

	get finished() : boolean {
		return this._finished;
	}

	//Cuando se modifica el metodo de envio
	public onDeliveryMethodChange(event: any) {
		if (this._model.method == 'NONE') {
			this._model.price = 0;
			this._finished = true;
			this._model.quotedPrice = false;
		} else if (this._model.method == 'home_shipping') { //Si eligio envio a domicilio
        //Si no posee una direccion, la crea
        if (this._model.address == null) {
          this._model.address = new Address();
        }
  			//Si ya calculo, no vuelve a calcular todo
  			if (this._model.quotedPrice) {
  				this._finished = true;
  			} else {
  				this._model.price = 0;
  				this._finished = false;
  			}
		} else if (this._model.method == 'LOCAL') { //Es una persona de Olavarria
      //Si no posee una direccion, la crea
      if (this._model.address == null) {
        this._model.address = new Address();
      }
      this._model.address.zip = '7400';
      this._model.price = 0;
      this._finished = true;
      this._model.quotedPrice = false;
    }
		this.cartService.setDelivery(this.model);
	}

	//Cuando cambia el codigo postal
	public onPostalCodeChange(){
		this._finished = false;
		this._model.quotedPrice = false;
		this.errors = null;
	}

	//calcula el costo de Envio
	public calculateShippingCost() {
		if (!this._model.address.zip){
			this._model.price = 0
			this.errors = "Debe ingresar un valor";
			this.cartService.setDelivery(this.model);
			return;
		}
		else
			this.errors = null;

		var zip_number = parseInt(this._model.address.zip)
		if (zip_number < 1000 || zip_number > 9999){
			this._model.price = 0
			this.errors = "Debe ingresar un C.P. válido.";
			this.cartService.setDelivery(this.model);
			return;
		}
		else
			this.errors = null;

		//Si el envio es local, no tiene costo
		if (this._model.address.zip == '7400') {
			this._model.price = 0;
			this._model.quotedPrice = true;
			this._finished = true;
			this.cartService.setDelivery(this.model);
		} else {
			//Obtiene el precio a partir de la API
			this.loading = true;
			let result = this.checkoutRepository.quoteShipping(this.cartService.getDelivery(),
			                                                   this.items)
			// verifica el resultado
			result.subscribe(
			     (res) => {
						 	 	this.loading = false;
			     	   	var response = res.json();
			     	   	if (response.success) {
								 this._model.price = Number(response.value);
 								 this._finished = true;
								 this._model.quotedPrice = true;
								} else {
									this._model.price = 0;
									this.errors = response.errors;
								}
								this.cartService.setDelivery(this.model);
			     },
			     err => {
			         // Log errors if any
			         //console.log(err);
							 this.loading = false;
			         this.errors = err;
			     }
			);
		}
	}

	//Envia el formulario
	public sendForm() {
		if (this._model.method == 'NONE') {
			this._model.address = null;
		}
		this.router.navigate(['/address']);
	}
}
