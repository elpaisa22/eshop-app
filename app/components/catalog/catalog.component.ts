import {Component, OnInit} from 'angular2/core';
import {Router, ROUTER_DIRECTIVES } from 'angular2/router';

import {Product} from '../../models/product/product.model';

import {CartService} from '../../services/cart/cart.service';

import {ProductRepository} from '../../repositories/product/product.repository';

import {SideBarComponent} from '../_shared/sidebar/sidebar.component';
import {SideNavComponent} from '../_shared/sidenav/sidenav.component';

@Component({
	templateUrl : 'app/components/catalog/catalog.html',
  directives : [SideBarComponent, SideNavComponent, ROUTER_DIRECTIVES]
})
export class CatalogComponent implements OnInit {


	products : Product[] = [];

	constructor(private _productRepository : ProductRepository,
	            private _cartService : CartService) {
	}

	ngOnInit(){
		this.products.length = 0;
		this._productRepository.getAllProducts()
													 .subscribe(
															data => {
																data.forEach((prod, i) => {
																		this.products.push(prod);
																})
															},
															error => console.log(error)
													 );

		window.scrollTo(0, 0);
	}

	addToCart(prod : Product) {
		this._cartService.agregarProducto(prod);
	}
}
