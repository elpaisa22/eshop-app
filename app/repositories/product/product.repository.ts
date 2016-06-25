import {Injectable} from 'angular2/core';
import {Http, Headers, Response} from 'angular2/http';
import {Observable}     from 'rxjs/Observable';

import 'rxjs/add/operator/map';

import {Product} from '../../models/product/product.model';

@Injectable()
export class ProductRepository {

    endpoint_url : string = "http://localhost:8080/data/productos";

    constructor(private _http: Http){
    }

    getAllProducts () : Observable<Product[]> {
      return this._http.request(this.endpoint_url).map(res => (res.json() as Product[]));
    }

}
