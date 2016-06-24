import {Component} from 'angular2/core';
import {Router, ROUTER_DIRECTIVES } from 'angular2/router';

@Component({
	templateUrl : 'app/components/_shared/navbar/navbar.html',
  selector : 'nav-bar',
  directives : [ROUTER_DIRECTIVES]
})
export class NavBarComponent {

  constructor(private _router: Router) {
  }

}
