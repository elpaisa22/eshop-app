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

  public loadProducts() : Observable<Product[]> {
    this._products.length = 0;
    var result = this._productRepository.getProducts();
    result.subscribe(
        data => {
          data.forEach((prod, i) => {
              this._products.push(prod);
          });
          this.totalProducts = this._products.length;
          this._products = this.sortProducts(this._products, this.sortBy);
        },
        error => console.log(error)
     );
     return result;
  }

  public getActualPage() : Product[] {
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

    this.productsCount = this._products.length;

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

  private sortProducts(data : Product[], orderBy: string) : Product[] {
    if (orderBy == "name") {
        return data.sort((a, b) => (a.name < b.name) ? -1 : (a.name > b.name ? 1 : 0));
    } else {
      return data.sort((a, b) => (a.price < b.price) ? -1 : (a.price > b.price ? 1 : 0));
    }
  }

  public isInitialized() : boolean {
      return this.initialized;
  }

  public changeSortOrder(orderBy : string) : Product[] {
    this._products = this.sortProducts(this._products, orderBy);
    this.sortBy = orderBy;
    return this.getActualPage();
  }

  public changeActualPage(page : number) : Product[] {
    this.page = page;
    return this.getActualPage();
  }

  public changePageSize(pageSize : number) : Product[] {
    this.pageSize = pageSize;
    return this.getActualPage();
  }

}
