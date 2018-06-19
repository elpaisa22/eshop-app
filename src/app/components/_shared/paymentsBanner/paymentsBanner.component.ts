import {Component} from '@angular/core';
import {Router } from '@angular/router';

@Component({
	templateUrl : './paymentsBanner.html',
  styleUrls: ['./paymentsBanner.component.css'],
  selector : 'payments-banner'
})
export class PaymentsBannerComponent {

	constructor(private _router: Router) {
  }
}
