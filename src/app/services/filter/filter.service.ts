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

    //this.loadProducts().subscribe(
      //elem => console.log("Elements loaded: " + elem.length));
  }

  private loadProducts(forceReload : boolean = false) : Observable<Product[]> {
    this._products.length = 0;
    return this._productRepository.getProducts(forceReload)
                                  .map(data => {
                                    this._products = this.sortProducts(data, this.sortBy);
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
                                    this.commonInitialize();
                                    return this._actualPage;
                                  });
  }

  private commonInitialize() {
    this.initialized = true;
    this.totalProducts = this._products.length;
    this._actualPage = this.calculateActualPage();
    this._tags = this.loadTagsByBrand(this._products);
  }

  private calculateActualPage() : Product[] {
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

    return result;
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
      return data.sort((a, b) => (a.price < b.price) ? -1 : (a.price > b.price ? 1 : 0));
    }
  }

  private loadTags(data : Product[]) : Map<number, TagGroup> {
    var result: Map<number, TagGroup> = new Map<number, TagGroup>();
    for (let prod of data) {
      for (let tag of prod.tags) {
          if (!result.has(tag.tag_group)) {
            this.createTagGroup(result, tag);
          } else {
            /*
            var tagGroup = result.get(tag.tag_group);
            var tagVal = tagGroup.tags.find(x => x.id == tag.id);
            if (tagVal != null) {
              tagVal.count = tagVal.count + 1;
            } else {
              var tagVal = new TagValue();
              tagVal.count = 1;
              tagVal.id = tag.id;
              tagVal.value = tag.tag;
              tagGroup.tags.push(tagVal);
            }
            */
          }
      }
    }

    return result;
  }

  private loadTagsByBrand(data : Product[]) : Map<number, TagGroup> {
    var result: Map<number, TagGroup> = new Map<number, TagGroup>();

    var tg : TagGroup = new TagGroup();
    tg.id = 1;
    tg.name = "Marca";
    tg.tags = [];
    result.set(tg.id, tg);

    for (let prod of data) {
        if (prod.brand) {
          var tag : Tag = new Tag();
          tag.tag_group = tg.id;
          tag.tag_group_name = tg.name;
          tag.tag = prod.brand;

          var tagGroup = result.get(tag.tag_group);
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

    return result;
  }


  createTagGroup(map : Map<number, TagGroup>, tag : Tag){
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

  public changeSortOrder(orderBy : string) {
    this._products = this.sortProducts(this._products, orderBy);
    this.sortBy = orderBy;
    this._actualPage = this.calculateActualPage();
  }

  public changeActualPage(page : number) {
    this.page = page;
    this._actualPage = this.calculateActualPage();
  }

  public changePageSize(pageSize : number) {
    this.pageSize = pageSize;
    this._actualPage = this.calculateActualPage();
  }

}
