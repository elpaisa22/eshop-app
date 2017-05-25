import {Component, OnInit} from '@angular/core';
import {Router } from '@angular/router';

import {Product} from '../../models/product/product.model';

import {CartService} from '../../services/cart/cart.service';
import {FilterService} from '../../services/filter/filter.service';

import {SideBarComponent} from '../_shared/sidebar/sidebar.component';
import {SideNavComponent} from '../_shared/sidenav/sidenav.component';
import {PaginatorComponent} from '../_shared/paginator/paginator.component';
import {PagerComponent} from '../_shared/pager/pager.component';

@Component({
	templateUrl : './catalog.html'
})
export class CatalogComponent implements OnInit {

	products : Product[] = [];

	constructor(private _filterService : FilterService,
	            private _cartService : CartService) {
	}

	ngOnInit(){
		if (!this._filterService.isInitialized()) {
			this._filterService.loadProducts()
												 .subscribe(
													 data => this.products = this._filterService.getActualPage(),
													 error => console.log(error));
		} else {
			this.products = this._filterService.getActualPage();
		}

		window.scrollTo(0, 0);
	}

	addToCart(prod : Product) {
		this._cartService.agregarProducto(prod);
	}

	onPageChange($event){
		this.products = this._filterService.changeActualPage($event.value);
	}

  onPageSizeChange($event){
		this.products = this._filterService.changePageSize($event.value);
	}

  onSortByChange($event){
		this.products = this._filterService.changeSortOrder($event.value);
	}

}
