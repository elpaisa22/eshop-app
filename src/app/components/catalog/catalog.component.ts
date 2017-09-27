import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

import {Product} from '../../models/product/product.model';

import {CartService} from '../../services/cart/cart.service';
import {FilterService} from '../../services/filter/filter.service';

import {CategoryRepository} from '../../repositories/category/category.repository';
import {Section, Category, SubCategory} from '../../models/category/section.model';

import {TagGroup, TagValue} from '../../models/tag/taggroup.model';

@Component({
	templateUrl : './catalog.html'
})
export class CatalogComponent implements OnInit {

	private sectionID : Number;
	private categoryID : Number;
	private subcategoryID : Number;

	public section : Section;
	public category : Category;
	public subcategory : SubCategory;

  public  page : number;
  public  pageSize : number;
  public  totalPages : number;
	public  productsCount : number;
	public  totalProducts : number;
  public  sortBy : string;

	public  actualPage : Product[] = [];
	public  tags : Map<number, TagGroup>;

	constructor(private activatedRoute: ActivatedRoute,
		          public filterService : FilterService,
	            private cartService : CartService,
						  private categoryRepository: CategoryRepository) {
	}

	ngOnInit(){
		this.activatedRoute.params.subscribe((params: Params) => {
			this.sectionID = params['section'];
			this.categoryID = params['category'];
			this.subcategoryID = params['subcategory'];

			this.loadCategories();

			if (this.subcategoryID != null) {
					this.filterService.loadProductsBySubcategory(this.subcategoryID);
			} else if (this.categoryID != null) {
					this.filterService.loadProductsByCategory(this.categoryID);
			} else if (this.sectionID != null) {
					this.filterService.loadProductsBySection(this.sectionID);
			}
			//window.scrollTo(0, 0);
	 	});

		//Asigna la data desde el servicio
		this.filterService.page.subscribe(data => this.page = data);
		this.filterService.pageSize.subscribe(data => this.pageSize = data);
		this.filterService.totalPages.subscribe(data => this.totalPages = data);
		this.filterService.productsCount.subscribe(data => this.productsCount = data);
		this.filterService.totalProducts.subscribe(data => this.totalProducts = data);
		this.filterService.sortBy.subscribe(data => this.sortBy = data);
		this.filterService.actualPage.subscribe(data => this.actualPage = data);
		this.filterService.tags.subscribe(data => this.tags = data);
	}

	addToCart(prod : Product) {
		this.cartService.addProduct(prod);
	}

	onPageChange($event){
		this.filterService.changeActualPage($event.value);
	}

  onPageSizeChange($event){
		this.filterService.changePageSize($event.value);
	}

  onSortByChange($event){
		this.filterService.changeSortOrder($event.value);
	}

	loadCategories() {
		this.categoryRepository.getCategories().subscribe(
			data => {
				this.section = data.find(x => x.id == this.sectionID);
				this.category = this.section.categories.find(x => x.id == this.categoryID);
				if (this.category) {
						this.subcategory = this.category.subcategories.find(x => x.id == this.subcategoryID);
				}
			}
		);
	}

}
