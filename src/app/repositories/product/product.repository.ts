import {Injectable} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import {Observable}     from 'rxjs/Observable';

import 'rxjs/add/operator/map';

import {Product} from '../../models/product/product.model';
import {ProductResult} from '../../models/product/productresult.model';

@Injectable()
export class ProductRepository {

    endpoint_url : string = "http://localhost:8000";

    products : Product[] = [];

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

    public fillProducts() {
      this._http.request(this.endpoint_url + "/api/product")
                .map(x => this.convertResult(x.json()))
                .subscribe(data => {
                              data.forEach((prod, i) => {
                                  this.products.push(prod);
                              });
                           },
                  	       error => console.log(error)
        		   	);
    }

    public getProducts (page : number, size : number) : Observable<Product[]> {
      var params : string = "";
      if (page != null) {
        params = "?page=" + page;
      }

      var limitParam : string;
      if (size != null) {
        var divider = (params ? "&" : "?");
        params = params + divider + "limit=" + size;
      }
      return this._http.request(this.endpoint_url + "/api/product").map(x => this.convertResult(x.json()));
      //return Observable.of(this.products);
    }

    public getProduct(id: number) : Observable<Product> {
      return this._http.request(this.endpoint_url + "/api/product/" + id + "/").map(x => this.convertProducto(x.json()));
      //return Observable.of(this.products[0]);
    }

}
