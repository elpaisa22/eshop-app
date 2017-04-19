import {Component} from '@angular/core';
import {Router } from '@angular/router';

@Component({
	templateUrl : './topbar.html',
  selector : 'top-bar'
})
export class TopBarComponent {

	constructor(private _router: Router) {
  }
}
