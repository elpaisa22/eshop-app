import {Component, OnInit} from 'angular2/core';
import {Router, ROUTER_DIRECTIVES } from 'angular2/router';

import {Product} from '../../models/product/product.model';
import {CatalogService} from '../../services/catalog/catalog.service';

import {SideBarComponent} from '../_shared/sidebar/sidebar.component';
import {SideNavComponent} from '../_shared/sidenav/sidenav.component';

@Component({
	templateUrl : 'app/components/catalog/catalog.html',
  directives : [SideBarComponent, SideNavComponent, ROUTER_DIRECTIVES],
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
