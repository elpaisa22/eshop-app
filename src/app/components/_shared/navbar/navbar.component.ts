import {Component, OnInit} from '@angular/core';

import {Section} from '../../../models/category/section.model';
import {CategoryRepository} from '../../../repositories/category/category.repository';

import {CartService} from '../../../services/cart/cart.service';

@Component({
	templateUrl : './navbar.html',
  selector : 'nav-bar'
})
export class NavBarComponent implements OnInit {

	_sections : Section[];

  constructor(private _cartService : CartService, private _categoryRepository : CategoryRepository,) {
  }

	ngOnInit() {
		this._categoryRepository.getCategories()
													  .subscribe(
															data => this._sections = data,
															error => console.log(error)
													  );
	}
}
