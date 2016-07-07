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

    private convertProductos(elems : any) : Product[] {
      var productos = elems.json();

      for (var i = 0; i < productos.length; i++) {
          var prod = productos[i];

          if (prod.imagen1) {
              var url : String = "http://localhost:8080" + prod.imagen1.split("\\").join("/").replace(".bin",".jpg");
              prod.imagen1 = url;
          }
          if (prod.imagen2) {
              var url : String = "http://localhost:8080" + prod.imagen2.split("\\").join("/").replace(".bin",".jpg");
              prod.imagen2 = url;
          }
          if (prod.imagen3) {
              var url : String = "http://localhost:8080" + prod.imagen3.split("\\").join("/").replace(".bin",".jpg");
              prod.imagen3 = url;
          }

          console.log(prod)
      }

      return productos;
    }

    public getAllProducts () : Observable<Product[]> {
      return this._http.request(this.endpoint_url).map( x => this.convertProductos(x));
    }




}
