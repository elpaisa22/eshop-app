import {Component, Input} from '@angular/core';
import {Router } from '@angular/router';

import {Section} from '../../../models/category/section.model';
import {CategoryRepository} from '../../../repositories/category/category.repository';

@Component({
	templateUrl : './sidenav.html',
  selector : 'side-nav'
})
export class SideNavComponent {

	@Input() section : Section;

	@Input() category : Number;
	@Input() subcategory : Number;

	constructor(private _router: Router) {
  }

}
