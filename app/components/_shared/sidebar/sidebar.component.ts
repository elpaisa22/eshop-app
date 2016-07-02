import {Component} from 'angular2/core';
import {Router, ROUTER_DIRECTIVES } from 'angular2/router';

@Component({
	templateUrl : 'app/components/_shared/sidebar/sidebar.html',
  selector : 'side-bar',
	directives : [ROUTER_DIRECTIVES]
})
export class SideBarComponent {

	constructor(private _router: Router) {
  }
}
