import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

import {Product} from '../../models/product/product.model';
import {ProductRepository} from '../../repositories/product/product.repository';

import {CartService} from '../../services/cart/cart.service';

import {CategoryRepository} from '../../repositories/category/category.repository';
import {Section, Category, SubCategory} from '../../models/category/section.model';

@Component({
	templateUrl : './detail.html'
})
export class DetailComponent implements OnInit {

	private _selectedId : any;

	private _product : Product;

	private _section : Section;
	private _category : Category;
	private _subcategory : SubCategory;

	constructor(private _activatedRoute: ActivatedRoute,
		          private _productRepository : ProductRepository,
						  private _cartService : CartService,
						  private _categoryRepository: CategoryRepository){
  }

	ngOnInit() {

		this._activatedRoute.params.subscribe((params: Params) => {
			this._selectedId = params['id'];
			this._productRepository.getProduct(this._selectedId)
			                       .subscribe(
																data => {
																	this._product = data;
																	this.loadCategories();
																},
													      error => console.log(error)
														 );
			window.scrollTo(0, 0);
	 	});


	}

	addToCart(prod : Product) {
		this._cartService.addProduct(prod);
	}

	loadCategories() {
		this._categoryRepository.getCategories().subscribe(
			data => {
				this._section = this._section = data.find(x => x.id == this.product.sub_category.root_category);
				this._category = this._section.categories.find(x => x.id == this._product.sub_category.category);
				this._subcategory = this._category.subcategories.find(x => x.id == this._product.sub_category.id);
			}
		);
	}

	public scroll(elem) {
		elem.scrollIntoView();
	}

	get product() {
		return this._product;
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
