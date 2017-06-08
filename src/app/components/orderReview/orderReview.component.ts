import {Component} from '@angular/core';
import {Router } from '@angular/router';

import {CartService} from '../../services/cart/cart.service';

@Component({
	templateUrl : './orderReview.html'
})
export class OrderReviewComponent {

    constructor(private _cartService: CartService) {
    }

}
