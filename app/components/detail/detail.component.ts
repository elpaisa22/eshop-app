import {Component} from 'angular2/core';
import {Router, ROUTER_DIRECTIVES } from 'angular2/router';

import {ProductDetailDirective} from '../../directives/product-detail/product-detail.directive';

@Component({
	templateUrl : 'app/components/detail/detail.html',
	directives : [ProductDetailDirective, ROUTER_DIRECTIVES]
})
export class DetailComponent{
}
