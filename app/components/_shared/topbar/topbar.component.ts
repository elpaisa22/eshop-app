import {Component} from '@angular/core';
import {Router } from '@angular/router';

@Component({
	templateUrl : 'app/components/_shared/topbar/topbar.html',
  selector : 'top-bar'
})
export class TopBarComponent {

	constructor(private _router: Router) {
  }
}
