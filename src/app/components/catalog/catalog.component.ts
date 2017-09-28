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
		this.filterService.tags.subscribe(data => this.tags = data);
		this.filterService.section.subscribe(data => this.section = data);
		this.filterService.category.subscribe(data => this.category = data);
		this.filterService.subcategory.subscribe(data => this.subcategory = data);
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

}
