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

	pagina : number;
	limite : number;
	totalPaginas : number;

  cantidadProductos : number;
  totalProductos : number;
  ordenarPor : string;

	products : Product[] = [];

	constructor(private _productRepository : ProductRepository,
		          private _filterService : FilterService,
	            private _cartService : CartService) {
	}

	ngOnInit(){
		this.pagina = 1;

		this.limite = 12;
    this.ordenarPor = "nombre";

    this.totalPaginas = 0;
    this.cantidadProductos = 0;

		this.reloadProducts();

		window.scrollTo(0, 0);
	}

	addToCart(prod : Product) {
		this._cartService.agregarProducto(prod);
	}

	reloadProducts(){
		this.products.length = 0;
		this._productRepository.getProducts(this.pagina, this.limite)
													 .subscribe(
															data => {
																data.forEach((prod, i) => {
																		this.products.push(prod);
																});
																this.cantidadProductos = this.products.length;
															},
															error => console.log(error)
													 );

	}

	onPageChange($event){
		this.pagina = $event.value;
		this.reloadProducts();
	}

  onPageSizeChange($event){
		this.limite = $event.value;
		this.reloadProducts();
	}

  onSortByChange($event){
		this.ordenarPor = $event.value;
		this.reloadProducts();
	}
}
