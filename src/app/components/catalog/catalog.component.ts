import {Component, OnInit} from '@angular/core';
import {Router } from '@angular/router';

import {Product} from '../../models/product/product.model';

import {CartService} from '../../services/cart/cart.service';
import {FilterService} from '../../services/filter/filter.service';
import {ProductRepository} from '../../repositories/product/product.repository';

import {SideBarComponent} from '../_shared/sidebar/sidebar.component';
import {SideNavComponent} from '../_shared/sidenav/sidenav.component';
import {PaginatorComponent} from '../_shared/paginator/paginator.component';
import {PagerComponent} from '../_shared/pager/pager.component';

@Component({
	templateUrl : './catalog.html'
})
export class CatalogComponent implements OnInit {

	page : number;
	pageSize : number;
	totalPages : number;

  productsCount : number;
  totalProducts : number;
  sortBy : string;

	products : Product[] = [];

	constructor(private _productRepository : ProductRepository,
		          private _filterService : FilterService,
	            private _cartService : CartService) {
	}

	ngOnInit(){
		this.page = 1;
		this.pageSize = 12;
		this.totalPages = 1;

    this.sortBy = "nombre";

    this.productsCount = 0;
		this.totalProducts = 0;

		this.reloadProducts();

		window.scrollTo(0, 0);
	}

	addToCart(prod : Product) {
		this._cartService.agregarProducto(prod);
	}

	reloadProducts(){
		this.products.length = 0;
		this._productRepository.getProducts()
													 .subscribe(
															data => {
																data.forEach((prod, i) => {
																		this.products.push(prod);
																});
																this.totalProducts = this.products.length;
																this.products = this.filterProducts(this.products);
															},
															error => console.log(error)
													 );

	}

	onPageChange($event){
		this.page = $event.value;
		this.reloadProducts();
	}

  onPageSizeChange($event){
		this.pageSize = $event.value;
		this.reloadProducts();
	}

  onSortByChange($event){
		this.sortBy = $event.value;
		this.reloadProducts();
	}

	private filterProducts(data : Product[]) : Product[] {
		var result : Product[] = [];
		var size = this.pageSize;
		if (this.pageSize == null) {
			size = data.length;
		}
		var from : number = size * (this.page - 1);
		var to : number = from + size - 1;
		if (to > data.length) {
			to = data.length - 1;
		}
		if (from <= data.length) {
			for (var i = from; i <= to; i++) {
				result.push(data[i]);
			}
		}

		this.productsCount = data.length;

		if (this.pageSize == null) {
				this.totalPages = 1;
		} else {
				this.totalPages = Math.floor(this.totalProducts/size) + 1;
		}
		if (this.totalProducts > size && this.totalProducts % size > 0) {
			this.totalPages++;
		}
		return result;
	}
}
