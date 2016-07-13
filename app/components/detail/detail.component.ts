import {Component, OnInit} from 'angular2/core';
import {Router, RouteParams, ROUTER_DIRECTIVES } from 'angular2/router';

import {Product} from '../../models/product/product.model';
import {ProductRepository} from '../../repositories/product/product.repository';

import {ProductDetailDirective} from '../../directives/product-detail/product-detail.directive';

import {SideBarComponent} from '../_shared/sidebar/sidebar.component';

@Component({
	templateUrl : 'app/components/detail/detail.html',
	directives : [ProductDetailDirective, SideBarComponent, ROUTER_DIRECTIVES],
	providers : [ProductRepository]
})
export class DetailComponent implements OnInit {

	private selectedId : any;

	product : Product = new Product();

	constructor(private _routeParams: RouteParams,
		          private _productRepository : ProductRepository){
  }

	ngOnInit() {
		this.selectedId = this._routeParams.get('id');
		console.log(this.selectedId);

		this._productRepository.getProduct(this.selectedId).subscribe(
			data => this.product = data,
      error => console.log(error)
		);

		console.log(this.product);
	}
}
