import {Injectable} from '@angular/core';

import {Product} from '../../models/product/product.model';
import {ProductRepository} from '../../repositories/product/product.repository';

import {Tag} from '../../models/tag/tag.model';
import {TagGroup, TagValue} from '../../models/tag/taggroup.model';

import {Observable} from "rxjs/Rx";

@Injectable()
export class FilterService {

  page : number;
	pageSize : number;
	totalPages : number;

  productsCount : number;
  totalProducts : number;
  sortBy : string;

  _priceMin : number;
  _priceMax : number;

  _filterRangeMin : number;
  _filterRangeMax : number;

  _filters : Map<number, String[]> = new Map<number, String[]>();
  _allProducts : Product[] = [];
	_products : Product[] = [];
  _actualPage : Product[] = [];

  _tags: Map<number, TagGroup> = new Map<number, TagGroup>();

  initialized : boolean;

  constructor(private _productRepository : ProductRepository) {
    this.page = 1;
		this.pageSize = 12;
		this.totalPages = 1;

    this.sortBy = "name";

    this.productsCount = 0;
		this.totalProducts = 0;

    this.initialized = false;
  }

  private loadProducts(forceReload : boolean = false) : Observable<Product[]> {
    this._products.length = 0;
    return this._productRepository.getProducts(forceReload)
                                  .map(data => {
                                    this._products = this.sortProducts(data, this.sortBy);
                                    this._allProducts = this._products;
                                    this.commonInitialize();
                                    return this._actualPage;
                                  });
  }


  public loadProductsBySubcategory(subcategory : Number) {
    this._products.length = 0;
    this._productRepository.getProducts()
                                  .subscribe(data => {
                                    this._products = this.filterBySubcategory(data, subcategory);
                                    this._products = this.sortProducts(this._products, this.sortBy);
                                    this._allProducts = this._products;
                                    this.commonInitialize();
                                    return this._actualPage;
                                  });
  }

  public loadProductsByCategory(subcategory : Number) {
    this._products.length = 0;
    this._productRepository.getProducts()
                                  .subscribe(data => {
                                    this._products = this.filterByCategory(data, subcategory);
                                    this._products = this.sortProducts(this._products, this.sortBy);
                                    this._allProducts = this._products;
                                    this.commonInitialize();
                                    return this._actualPage;
                                  });
  }

  public loadProductsBySection(section : Number) {
    this._products.length = 0;
    this._productRepository.getProducts()
                                  .subscribe(data => {
                                    this._products = this.filterBySection(data, section);
                                    this._products = this.sortProducts(this._products, this.sortBy);
                                    this._allProducts = this._products;
                                    this.commonInitialize();
                                    return this._actualPage;
                                  });
  }

  private addFilterValue(tag: TagGroup, value : String, checked : Boolean) {
    var values : String[];
		if (this._filters.has(tag.id)) {
			values = this._filters.get(tag.id);
		} else {
			values = new Array<String>();
		}

		if (checked) {
				values.push(value);
		} else {
			let index = values.findIndex(d => d === value); //find index in your array
			values.splice(index, 1);//remove element from array
		}

		if (values.length == 0) {
				this._filters.delete(tag.id);
		} else {
				this._filters.set(tag.id, values);
		}
  }

  private applySavedFilters() {
    this._products = this._allProducts;

    //Aplica filtro por tags (incluido las marcas que tienen grupo 0)
    var entries = Array.from(this._filters.keys());
    for (let entry of entries) {
      var values : String[] = this._filters.get(entry);
      if (entry == 0) {
        this._products = this._products.filter(x => values.includes(x.brand));
      } else {
        this._products = this._products.filter(x => {
          var tag = x.tags.find(tag => tag.tag_group == entry);
          return tag && values.includes(tag.tag);
        });
      }
    }

    //Aplica filtro por precios
    this._products = this._products.filter(x => Number(x.price) >= this._filterRangeMin && Number(x.price) <= this._filterRangeMax);

    //Ordena los elementos
    this._products = this.sortProducts(this._products, this.sortBy);

    //Actualiza la pagina
    this.calculateActualPage();
  }

  public applyFilterByTags(tag: TagGroup, value : String, checked : Boolean) {
    this.addFilterValue(tag, value, checked);
    this.applySavedFilters();
  }

  public clearFilterForTag(tag: TagGroup) {
    this._filters.delete(tag.id);
    this.applySavedFilters();
  }

  public updatePriceRange(min, max : number) {
    this._filterRangeMin = min;
    this._filterRangeMax = max;
    this.applySavedFilters();
  }

  public clearPriceRange() {
    this._filterRangeMin = this._priceMin;
    this._filterRangeMax = this._priceMax;
    this.applySavedFilters();
  }

  private commonInitialize() {
    this.initialized = true;
    this.totalProducts = this._products.length;
    this.calculateActualPage();
    this.calculatePriceRange();
    this._filters = new Map<number, String[]>();

    this.loadTagsByBrand(this._products);
    this.loadTags(this._products);
  }

  private calculatePriceRange() {
      this._priceMin = this._products.reduce((a, b) => (Number(a.price) < Number(b.price)) ? a : b).price;
      this._priceMax = this._products.reduce((a, b) => (Number(a.price) > Number(b.price)) ? a : b).price;

      this._filterRangeMin = this._priceMin;
      this._filterRangeMax = this._priceMax;
  }

  private calculateActualPage() {
    var result : Product[] = [];
    var size = this.pageSize;
    if (this.pageSize == null) {
      size = this._products.length;
    }
    var from : number = size * (this.page - 1);
    var to : number = from + size - 1;
    if (to > this._products.length) {
      to = this._products.length - 1;
    }
    if (from <= this._products.length) {
      for (var i = from; i <= to; i++) {
        result.push(this._products[i]);
      }
    }

    this.productsCount = result.length;

    if (this.pageSize == null) {
        this.totalPages = 1;
    } else {
        this.totalPages = Math.floor(this.totalProducts/size) + 1;
    }
    if (this.totalProducts > size && this.totalProducts % size > 0) {
      this.totalPages++;
    }

    this._actualPage = result;
  }

  private filterBySubcategory(data : Product[], subcategory : Number) : Product[] {
    var result : Product[] = [];
    result = data.filter(x => x.sub_category.id == subcategory);
    return result;
  }

  private filterByCategory(data : Product[], category : Number) : Product[] {
    var result : Product[] = [];
    result = data.filter(x => x.sub_category.category == category);
    return result;
  }

  private filterBySection(data : Product[], section : Number) : Product[] {
    var result : Product[] = [];
    result = data.filter(x => x.sub_category.root_category == section);
    return result;
  }

  private sortProducts(data : Product[], orderBy: string) : Product[] {
    if (orderBy == "name") {
        return data.sort((a, b) => (a.name < b.name) ? -1 : (a.name > b.name ? 1 : 0));
    } else {
      return data.sort((a, b) => (Number(a.price) < Number(b.price)) ? -1 : (Number(a.price) > Number(b.price) ? 1 : 0));
    }
  }

  private loadTags(data : Product[]) {
    for (let prod of data) {
      for (let tag of prod.tags) {
          if (!this._tags.has(tag.tag_group)) {
            this.createTagGroup(this._tags, tag);
          } else {
            var tagGroup = this._tags.get(tag.tag_group);
            var tagVal = tagGroup.tags.find(x => x.id == tag.id);
            if (tagVal != null) {
              tagVal.count = tagVal.count + 1;
            } else {
              tagVal = new TagValue();
              tagVal.count = 1;
              tagVal.id = tag.id;
              tagVal.value = tag.tag;
              tagGroup.tags.push(tagVal);
            }
          }
      }
    }
  }

  private loadTagsByBrand(data : Product[]) {
    this._tags = new Map<number, TagGroup>();

    var tg : TagGroup = new TagGroup();
    tg.id = 0;
    tg.name = "Marca";
    tg.tags = [];
    this._tags.set(tg.id, tg);

    for (let prod of data) {
        if (prod.brand) {
          var tag : Tag = new Tag();
          tag.tag_group = tg.id;
          tag.tag_group_name = tg.name;
          tag.tag = prod.brand;

          var tagGroup = this._tags.get(tag.tag_group);
          var tagVal = tagGroup.tags.find(x => x.value == tag.tag);
          if (tagVal != null) {
            tagVal.count = tagVal.count + 1;
          } else {
            var tagVal = new TagValue();
            tagVal.count = 1;
            tagVal.value = tag.tag;
            tagGroup.tags.push(tagVal);
          }
        }

      }
  }

  private createTagGroup(map : Map<number, TagGroup>, tag : Tag){
    var tagGroup = new TagGroup();
    tagGroup.id = tag.tag_group;
    tagGroup.name = tag.tag_group_name;
    tagGroup.tags = [];
    var tagVal = new TagValue();
    tagVal.count = 1;
    tagVal.id = tag.id;
    tagVal.value = tag.tag;
    tagGroup.tags.push(tagVal);
    map.set(tagGroup.id, tagGroup);
  }

  get isInitialized() : boolean {
      return this.initialized;
  }

  get actualPage() : Observable<Product[]> {
    return Observable.of(this._actualPage);
  }

  get tagsGroup(): Map<number, TagGroup> {
    return this._tags;
  }

  get priceMin() : number {
      return this._priceMin;
  }

  get priceMax() : number {
      return this._priceMax;
  }

  public changeSortOrder(orderBy : string) {
    this._products = this.sortProducts(this._products, orderBy);
    this.sortBy = orderBy;
    this.calculateActualPage();
  }

  public changeActualPage(page : number) {
    this.page = page;
    this.calculateActualPage();
  }

  public changePageSize(pageSize : number) {
    this.pageSize = pageSize;
    this.calculateActualPage();
  }

}
