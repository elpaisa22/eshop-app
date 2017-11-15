import {Component} from '@angular/core';
import {Router } from '@angular/router';

@Component({
	templateUrl : './relatedProducts.html',
  selector : 'related-products'
})
export class RelatedProductsComponent {

	constructor(private _router: Router) {
  }
}
