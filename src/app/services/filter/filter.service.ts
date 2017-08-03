import {Injectable} from '@angular/core';

import {Product} from '../../models/product/product.model';
import {ProductRepository} from '../../repositories/product/product.repository';

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
                                    this.initialized = true;
                                    this.totalProducts = this._products.length;
                                    this._actualPage = this.calculateActualPage();
                                    return this._actualPage;
                                  });
  }


  public loadProductsBySubcategory(subcategory : Number) {
    this._products.length = 0;
    this._productRepository.getProducts()
                                  .subscribe(data => {
                                    this._products = this.filterBySubcategory(data, subcategory);
                                    this._products = this.sortProducts(this._products, this.sortBy);
                                    this.initialized = true;
                                    this.totalProducts = this._products.length;
                                    this._actualPage = this.calculateActualPage();
                                    return this._actualPage;
                                  });
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
    for (let prod of data) {
      if (prod.sub_category == subcategory) {
          result.push(prod);
      }
    }
    return result;

  }

  private sortProducts(data : Product[], orderBy: string) : Product[] {
    if (orderBy == "name") {
        return data.sort((a, b) => (a.name < b.name) ? -1 : (a.name > b.name ? 1 : 0));
    } else {
      return data.sort((a, b) => (a.price < b.price) ? -1 : (a.price > b.price ? 1 : 0));
    }
  }

  get isInitialized() : boolean {
      return this.initialized;
  }

  get actualPage() : Observable<Product[]> {
    return Observable.of(this._actualPage);
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
