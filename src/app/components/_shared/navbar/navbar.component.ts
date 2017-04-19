import {Component} from '@angular/core';

import {CartService} from '../../../services/cart/cart.service';

@Component({
	templateUrl : './navbar.html',
  selector : 'nav-bar',
	providers: [CartService]
})
export class NavBarComponent {

  constructor(private _cartService : CartService) {
  }

}
