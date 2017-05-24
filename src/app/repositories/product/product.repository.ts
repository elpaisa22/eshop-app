import {Injectable} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import {Observable}     from 'rxjs/Observable';

import {Product} from '../../models/product/product.model';
import {ProductResult} from '../../models/product/productresult.model';

@Injectable()
export class ProductRepository {

    endpoint_url : string = "http://localhost:8000";

    _products : Product[] = [];

    constructor(private _http: Http){
    }

    private convertProducto(prod : Product) : Product {
      for (var i = 0; i < prod.images.length; i++) {
        var url : string = this.endpoint_url + prod.images[i].image;
        prod.images[i].image = url;
      }
      return prod;
    }

    private convertResult(result : Product[]) : Product[] {
      for (var i = 0; i < result.length; i++) {
          var prod = result[i];
          prod = this.convertProducto(prod);
      }
      return result;
    }

    public getProducts () : Observable<Product[]> {
      if (this._products == null || this._products.length == 0) {
        var response = this._http.request(this.endpoint_url + "/api/product")
                                 .map(x => this.convertResult(x.json()));
        return this.handleResponse(response);
      } else {
        return Observable.of(this._products);
      }
    }

    private handleResponse(response : Observable<Product[]>) : Observable<Product[]> {
      return response.do(data => {
        this._products = data;
      });
    }

    public getProduct(id: number) : Observable<Product> {
      if (this._products == null || this._products.length == 0) {
        return this._http.request(this.endpoint_url + "/api/product/" + id + "/")
                         .map(x => this.convertProducto(x.json()));
      } else {
        for (var i = 0; i < this._products.length; i++) {
            if (this._products[i].id == id) {
              return Observable.of(this._products[i]);
            }
        }
      }
    }

}
