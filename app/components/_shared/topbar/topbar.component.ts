import {Component} from 'angular2/core';
import {Router, ROUTER_DIRECTIVES } from 'angular2/router';

@Component({
	templateUrl : 'app/components/_shared/topbar/topbar.html',
  selector : 'top-bar',
	directives : [ROUTER_DIRECTIVES]
})
export class TopBarComponent {

	constructor(private _router: Router) {
  }
}
