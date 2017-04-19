import {Component, OnInit} from '@angular/core';
import { ActivatedRoute, Params} from '@angular/router';

import {Product} from '../../models/product/product.model';
import {ProductRepository} from '../../repositories/product/product.repository';

import {SideNavComponent} from '../_shared/sidenav/sidenav.component';

import {CartService} from '../../services/cart/cart.service';

@Component({
	templateUrl : './detail.html',
	providers : [ProductRepository]
})
export class DetailComponent implements OnInit {

	private _selectedId : any;

	product : Product = new Product();

	constructor(private _activatedRoute: ActivatedRoute,
		          private _productRepository : ProductRepository,
						  private _cartService : CartService){
  }

	ngOnInit() {
		this._activatedRoute.params.subscribe((params: Params) => {
			this._selectedId = params['id'];
			this._productRepository.getProduct(this._selectedId).subscribe(
				data => this.product = data,
	      error => console.log(error)
			);
			window.scrollTo(0, 0);
	 	});


	}

	addToCart(prod : Product) {
		this._cartService.agregarProducto(prod);
	}

}
