import {Component} from '@angular/core';
import {Router } from '@angular/router';

import {CartService} from '../../../services/cart/cart.service';

@Component({
	templateUrl : './summary.html',
  selector : 'summary'
})
export class SummaryComponent {

	constructor(private _router: Router,
              public _cartService : CartService) {
  }
}
