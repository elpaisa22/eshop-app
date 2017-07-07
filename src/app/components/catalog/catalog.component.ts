import {Component, OnInit} from '@angular/core';
import {Router } from '@angular/router';

import {Product} from '../../models/product/product.model';

import {CartService} from '../../services/cart/cart.service';
import {FilterService} from '../../services/filter/filter.service';

@Component({
	templateUrl : './catalog.html'
})
export class CatalogComponent implements OnInit {

	constructor(private _filterService : FilterService,
	            private _cartService : CartService) {
	}

	ngOnInit(){
		window.scrollTo(0, 0);
	}

	addToCart(prod : Product) {
		this._cartService.addProduct(prod);
	}

	onPageChange($event){
		this._filterService.changeActualPage($event.value);
	}

  onPageSizeChange($event){
		this._filterService.changePageSize($event.value);
	}

  onSortByChange($event){
		this._filterService.changeSortOrder($event.value);
	}

}
