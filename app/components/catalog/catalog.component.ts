import {Component, OnInit} from 'angular2/core';
import {Router, ROUTER_DIRECTIVES } from 'angular2/router';

import {Product} from '../../models/product/product.model';
import {CatalogService} from '../../services/catalog/catalog.service';

import {SideBarComponent} from '../_shared/sidebar/sidebar.component';

@Component({
	templateUrl : 'app/components/catalog/catalog.html',
  directives : [SideBarComponent, ROUTER_DIRECTIVES],
	providers : [CatalogService]
})
export class CatalogComponent implements OnInit {


	products : Product[] = [];

	constructor(private _catalogService : CatalogService) {
	}

	ngOnInit(){
		this.products = this._catalogService.loadProducts();
	}

}
