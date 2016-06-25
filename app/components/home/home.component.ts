import {Component} from 'angular2/core';
import {Router, ROUTER_DIRECTIVES } from 'angular2/router';

import {GetInspiredDirective} from '../../directives/get-inspired/get-inspired.directive';
import {MainSliderDirective} from '../../directives/main-slider/main-slider.directive';
import {ProductSliderDirective} from '../../directives/product-slider/product-slider.directive';


@Component({
	templateUrl : 'app/components/home/home.html',
	directives : [GetInspiredDirective, MainSliderDirective, ProductSliderDirective, ROUTER_DIRECTIVES]
})
export class HomeComponent{
}
