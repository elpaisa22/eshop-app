import {Component} from 'angular2/core';
import {Router, ROUTER_DIRECTIVES } from 'angular2/router';

@Component({
	templateUrl : 'app/components/_shared/sidenav/sidenav.html',
  selector : 'side-nav',
	directives : [ROUTER_DIRECTIVES]
})
export class SideNavComponent {

	constructor(private _router: Router) {
  }
}
