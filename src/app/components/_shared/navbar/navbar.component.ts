import {Component, OnInit} from '@angular/core';

import {Section} from '../../../models/category/section.model';
import {CategoryRepository} from '../../../repositories/category/category.repository';

import {CartService} from '../../../services/cart/cart.service';

@Component({
	templateUrl : './navbar.html',
  selector : 'nav-bar'
})
export class NavBarComponent implements OnInit {

	public sections : Section[];
	public itemsCount : number;

  constructor(private cartService : CartService, private categoryRepository : CategoryRepository,) {
  }

	ngOnInit() {
		this.categoryRepository.getCategories()
													 .subscribe(
															data => this.sections = data,
															error => console.log(error)
													 );

		//Asigna la data desde el servicio
		this.cartService.itemsCount.subscribe(data => this.itemsCount = data);
	}
}
