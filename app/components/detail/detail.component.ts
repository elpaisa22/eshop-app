import {Component, OnInit} from 'angular2/core';
import {Router, RouteParams, ROUTER_DIRECTIVES } from 'angular2/router';

import {ProductDetailDirective} from '../../directives/product-detail/product-detail.directive';

import {SideBarComponent} from '../_shared/sidebar/sidebar.component';

@Component({
	templateUrl : 'app/components/detail/detail.html',
	directives : [ProductDetailDirective, SideBarComponent, ROUTER_DIRECTIVES]
})
export class DetailComponent implements OnInit {

	private selectedId : any;

	constructor(private _routeParams: RouteParams){
  }

	ngOnInit() {
		console.log(this._routeParams.get('id'))
	}
}
