import {Component} from '@angular/core';
import {Router } from '@angular/router';

@Component({
	templateUrl : 'app/components/_shared/sidenav/sidenav.html',
  selector : 'side-nav'
})
export class SideNavComponent {

	constructor(private _router: Router) {
  }
}
