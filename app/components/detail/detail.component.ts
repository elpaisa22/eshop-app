import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';

import {Product} from '../../models/product/product.model';
import {ProductRepository} from '../../repositories/product/product.repository';

import {ProductDetailDirective} from '../../directives/product-detail/product-detail.directive';

import {SideNavComponent} from '../_shared/sidenav/sidenav.component';

import {CartService} from '../../services/cart/cart.service';

@Component({
	templateUrl : 'app/components/detail/detail.html',
	providers : [ProductRepository, CartService]
})
export class DetailComponent implements OnInit {

	private selectedId : any;

	product : Product = new Product();

	constructor(private _routeParams: Router,
		          private _productRepository : ProductRepository,
						  private _cartService : CartService){
  }

	ngOnInit() {
		//this.selectedId = this._routeParams.get('id');

		this._productRepository.getProduct(this.selectedId).subscribe(
			data => this.product = data,
      error => console.log(error)
		);

		window.scrollTo(0, 0);
	}

	addToCart(prod : Product) {
		this._cartService.agregarProducto(prod);
	}

}
