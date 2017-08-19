import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

import {Product} from '../../models/product/product.model';

import {CartService} from '../../services/cart/cart.service';
import {FilterService} from '../../services/filter/filter.service';

import {CategoryRepository} from '../../repositories/category/category.repository';
import {Section, Category, SubCategory} from '../../models/category/section.model';

@Component({
	templateUrl : './catalog.html'
})
export class CatalogComponent implements OnInit {

	private _sectionID : Number;
	private _categoryID : Number;
	private _subcategoryID : Number;

	private _section : Section;
	private _category : Category;
	private _subcategory : SubCategory;

	constructor(private _activatedRoute: ActivatedRoute,
		          public _filterService : FilterService,
	            private _cartService : CartService,
						  private _categoryRepository: CategoryRepository) {
	}

	ngOnInit(){
		this._activatedRoute.params.subscribe((params: Params) => {
			this._sectionID = params['section'];
			this._categoryID = params['category'];
			this._subcategoryID = params['subcategory'];

			this.loadCategories();

			if (this._subcategoryID != null) {
					this._filterService.loadProductsBySubcategory(this._subcategoryID);
			} else if (this._categoryID != null) {
					this._filterService.loadProductsByCategory(this._categoryID);
				} else if (this._sectionID != null) {
						this._filterService.loadProductsBySection(this._sectionID);
				}
			//window.scrollTo(0, 0);
	 	});

	}

	addToCart(prod : Product) {
		this._cartService.addProduct(prod);
	}

	onPageChange($event){
		this._filterService.changeActualPage($event.value);
	}

  onPageSizeChange($event){
		this._filterService.changePageSize($event.value);
	}

  onSortByChange($event){
		this._filterService.changeSortOrder($event.value);
	}

	loadCategories() {
		this._categoryRepository.getCategories().subscribe(
			data => {
				this._section = data.find(x => x.id == this._sectionID);
				this._category = this._section.categories.find(x => x.id == this._categoryID);
				if (this._category) {
						this._subcategory = this._category.subcategories.find(x => x.id == this._subcategoryID);
				}
			}
		);
	}

	get section() : Section {
		return this._section;
	}

	get category() : Category {
		return this._category;
	}

	get subcategory() : SubCategory {
		return this._subcategory;
	}

}
