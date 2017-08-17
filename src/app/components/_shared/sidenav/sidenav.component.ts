import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {Router } from '@angular/router';

import {Section} from '../../../models/category/section.model';
import {CategoryRepository} from '../../../repositories/category/category.repository';

@Component({
	templateUrl : './sidenav.html',
  selector : 'side-nav'
})
export class SideNavComponent implements OnChanges {

	@Input() section : number;
	@Input() category : number;
	@Input() subcategory : number;

	_section : Section = new Section();

	constructor(private _router: Router, private _categoryRepository: CategoryRepository) {
  }

	ngOnChanges(changes: SimpleChanges){
		this._categoryRepository.getCategories().subscribe(
			data => {this._section = data.find(x => x.id == this.section)}
		);
	}
}
