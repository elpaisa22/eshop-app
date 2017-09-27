import {Injectable} from '@angular/core';

import {Product} from '../../models/product/product.model';
import {ProductRepository} from '../../repositories/product/product.repository';

import {Tag} from '../../models/tag/tag.model';
import {TagGroup, TagValue} from '../../models/tag/taggroup.model';

import { Observable, BehaviorSubject } from 'rxjs/Rx';

@Injectable()
export class FilterService {

  private pageSource = new BehaviorSubject<number>(1);
  public  page : Observable<number> = this.pageSource.asObservable();

  private pageSizeSource = new BehaviorSubject<number>(12);
  public  pageSize : Observable<number> = this.pageSizeSource.asObservable();

  private totalPagesSource = new BehaviorSubject<number>(1);
  public  totalPages : Observable<number> = this.totalPagesSource.asObservable();

  private productsCountSource = new BehaviorSubject<number>(0);
  public  productsCount : Observable<number> = this.productsCountSource.asObservable();

  private totalProductsSource = new BehaviorSubject<number>(0);
  public  totalProducts : Observable<number> = this.totalProductsSource.asObservable();

  private sortBySource = new BehaviorSubject<string>("name");
  public  sortBy : Observable<string> = this.sortBySource.asObservable();

  private actualPageSource = new BehaviorSubject<Product[]>([]);
  public  actualPage : Observable<Product[]> = this.actualPageSource.asObservable();

  private tagsSource = new BehaviorSubject<Map<number, TagGroup>>(new Map<number, TagGroup>());
  public  tags : Observable<Map<number, TagGroup>> = this.tagsSource.asObservable();

  private priceMinSource = new BehaviorSubject<number>(0);
  public  priceMin : Observable<number> = this.priceMinSource.asObservable();

  private priceMaxSource = new BehaviorSubject<number>(0);
  public  priceMax : Observable<number> = this.priceMaxSource.asObservable();

  _filterRangeMin : number;
  _filterRangeMax : number;

  _filters : Map<number, String[]> = new Map<number, String[]>();
  _allProducts : Product[] = [];
	_products : Product[] = [];

  initialized : boolean;

  constructor(private _productRepository : ProductRepository) {
    this.initialized = false;
  }

  private loadProducts(forceReload : boolean = false) : Observable<Product[]> {
    this._products.length = 0;
    return this._productRepository.getProducts(forceReload)
                                  .map(data => {
                                    this._products = this.sortProducts(data, this.sortBySource.getValue());
                                    this._allProducts = this._products;
                                    this.commonInitialize();
                                    return this.actualPageSource.getValue();
                                  });
  }


  public loadProductsBySubcategory(subcategory : Number) {
    this._products.length = 0;
    this._productRepository.getProducts()
                                  .subscribe(data => {
                                    this._products = this.filterBySubcategory(data, subcategory);
                                    this._products = this.sortProducts(this._products, this.sortBySource.getValue());
                                    this._allProducts = this._products;
                                    this.commonInitialize();
                                    return this.actualPageSource.getValue();
                                  });
  }

  public loadProductsByCategory(subcategory : Number) {
    this._products.length = 0;
    this._productRepository.getProducts()
                                  .subscribe(data => {
                                    this._products = this.filterByCategory(data, subcategory);
                                    this._products = this.sortProducts(this._products, this.sortBySource.getValue());
                                    this._allProducts = this._products;
                                    this.commonInitialize();
                                    return this.actualPageSource.getValue();
                                  });
  }

  public loadProductsBySection(section : Number) {
    this._products.length = 0;
    this._productRepository.getProducts()
                                  .subscribe(data => {
                                    this._products = this.filterBySection(data, section);
                                    this._products = this.sortProducts(this._products, this.sortBySource.getValue());
                                    this._allProducts = this._products;
                                    this.commonInitialize();
                                    return this.actualPageSource.getValue();
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
    this._products = this.sortProducts(this._products, this.sortBySource.getValue());

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
    this._filterRangeMin = this.priceMinSource.getValue();
    this._filterRangeMax = this.priceMaxSource.getValue();
    this.applySavedFilters();
  }

  private commonInitialize() {
    this.initialized = true;
    this.totalProductsSource.next(this._products.length);
    this.calculateActualPage();
    this.calculatePriceRange();
    this._filters = new Map<number, String[]>();

    this.loadTagsByBrand(this._products);
    this.loadTags(this._products);
  }

  private calculatePriceRange() {
      this.priceMinSource.next(this._products.reduce((a, b) => (Number(a.price) < Number(b.price)) ? a : b).price);
      this.priceMaxSource.next(this._products.reduce((a, b) => (Number(a.price) > Number(b.price)) ? a : b).price);

      this._filterRangeMin = this.priceMinSource.getValue();
      this._filterRangeMax = this.priceMaxSource.getValue();
  }

  private calculateActualPage() {
    var result : Product[] = [];
    var size = this.pageSizeSource.getValue();
    if (this.pageSize == null) {
      size = this._products.length;
    }
    var from : number = size * (this.pageSource.getValue() - 1);
    var to : number = from + size - 1;
    if (to > this._products.length) {
      to = this._products.length - 1;
    }
    if (from <= this._products.length) {
      for (var i = from; i <= to; i++) {
        result.push(this._products[i]);
      }
    }

    this.productsCountSource.next(result.length);

    if (this.pageSize == null) {
        this.totalPagesSource.next(1);
    } else {
        this.totalPagesSource.next(Math.floor(this.totalProductsSource.getValue()/size) + 1);
    }
    if (this.totalProductsSource.getValue() > size && this.totalProductsSource.getValue() % size > 0) {
      this.totalPagesSource.next(this.totalPagesSource.getValue() + 1);
    }

    this.actualPageSource.next(result);
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
          if (!this.tagsSource.getValue().has(tag.tag_group)) {
            this.createTagGroup(this.tagsSource.getValue(), tag);
          } else {
            var tagGroup = this.tagsSource.getValue().get(tag.tag_group);
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
    this.tagsSource.next(new Map<number, TagGroup>());

    var tg : TagGroup = new TagGroup();
    tg.id = 0;
    tg.name = "Marca";
    tg.tags = [];
    this.tagsSource.getValue().set(tg.id, tg);

    for (let prod of data) {
        if (prod.brand) {
          var tag : Tag = new Tag();
          tag.tag_group = tg.id;
          tag.tag_group_name = tg.name;
          tag.tag = prod.brand;

          var tagGroup = this.tagsSource.getValue().get(tag.tag_group);
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

  public changeSortOrder(orderBy : string) {
    this._products = this.sortProducts(this._products, orderBy);
    this.sortBySource.next(orderBy);
    this.calculateActualPage();
  }

  public changeActualPage(page : number) {
    this.pageSource.next(page);
    this.calculateActualPage();
  }

  public changePageSize(pageSize : number) {
    this.pageSizeSource.next(pageSize);
    this.calculateActualPage();
  }

}
