import {Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';

import {Product} from '../../models/product/product.model';

import {CartService} from '../../services/cart/cart.service';
import {FilterService} from '../../services/filter/filter.service';

@Component({
	templateUrl : './catalog.html'
})
export class CatalogComponent implements OnInit {

	private _section : Number;
	private _category : Number;
	private _subcategory : Number;

	constructor(private _activatedRoute: ActivatedRoute,
		          private _filterService : FilterService,
	            private _cartService : CartService) {
	}

	ngOnInit(){
		this._activatedRoute.params.subscribe((params: Params) => {
			this._section = params['section'];
			this._category = params['category'];
			this._subcategory = params['subcategory'];
			if (this._subcategory != null) {
					this._filterService.loadProductsBySubcategory(this._subcategory);
			}
			window.scrollTo(0, 0);
	 	});

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
