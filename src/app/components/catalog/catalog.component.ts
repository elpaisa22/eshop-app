import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

import {Product} from '../../models/product/product.model';

import {CartService} from '../../services/cart/cart.service';
import {FilterService} from '../../services/filter/filter.service';

import {Section, Category, SubCategory} from '../../models/category/section.model';

import {TagGroup, TagValue} from '../../models/tag/taggroup.model';

@Component({
	templateUrl : './catalog.html'
})
export class CatalogComponent implements OnInit {

	private sectionID : number;
	private categoryID : number;
	private subcategoryID : number;

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
	public  priceMin : number;
	public  priceMax : number;

	public  loading : boolean = true;
	public  initialized : boolean = false;

	constructor(private activatedRoute: ActivatedRoute,
		          public filterService : FilterService,
	            private cartService : CartService) {
	}

	ngOnInit(){
		this.activatedRoute.params.subscribe((params: Params) => {
			this.sectionID = params['section'];
			this.categoryID = params['category'];
			this.subcategoryID = params['subcategory'];

			this.filterService.initFromSections(this.sectionID, this.categoryID, this.subcategoryID);

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
		this.filterService.section.subscribe(data => this.section = data);
		this.filterService.category.subscribe(data => this.category = data);
		this.filterService.subcategory.subscribe(data => this.subcategory = data);
		this.filterService.tags.subscribe(data => this.tags = data);
		this.filterService.priceMin.subscribe(data => this.priceMin = data);
		this.filterService.priceMax.subscribe(data => this.priceMax = data);
		this.filterService.loading.subscribe(data => {
																									this.loading = data;
		                                              if (this.loading) {
		                                              	this.initialized = true
		                                              }
		                                      });
	}

	public addToCart(prod : Product) {
		this.cartService.addProduct(prod);
	}

	public onPageChange(event){
		this.filterService.changeActualPage(event.value);
	}

  public onPageSizeChange(event){
		this.filterService.changePageSize(event.value);
	}

  public onSortByChange(event){
		this.filterService.changeSortOrder(event.value);
	}

	public onTagFilterChange(event){
		this.filterService.changeFilterByTags(event.tag, event.value, event.checked);
	}

	public onClearTagFilter(event){
		this.filterService.clearFilterForTag(event.tag);
	}

	public onPriceRangeChange(event){
		this.filterService.changePriceRange(event.priceMin, event.priceMax);
	}

	public onClearPriceRange(){
		this.filterService.clearPriceRange();
	}

}
