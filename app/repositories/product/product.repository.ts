import {Injectable} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import {Observable}     from 'rxjs/Observable';

import 'rxjs/add/operator/map';

import {Product} from '../../models/product/product.model';
import {ProductResult} from '../../models/product/productresult.model';

@Injectable()
export class ProductRepository {

    endpoint_url : string = "http://localhost:8080";

    constructor(private _http: Http){
    }

    private convertProducto(prod : any) : any {
      if (prod.imagen1) {
          var url : String = this.endpoint_url + prod.imagen1.split("\\").join("/").replace(".bin",".jpg");
          prod.imagen1 = url;
      }
      if (prod.imagen2) {
          var url : String = this.endpoint_url + prod.imagen2.split("\\").join("/").replace(".bin",".jpg");
          prod.imagen2 = url;
      }
      if (prod.imagenDetalle1) {
          var url : String = this.endpoint_url + prod.imagenDetalle1.split("\\").join("/").replace(".bin",".jpg");
          prod.imagenDetalle1 = url;
      }
      if (prod.imagenDetalle2) {
          var url : String = this.endpoint_url + prod.imagenDetalle2.split("\\").join("/").replace(".bin",".jpg");
          prod.imagenDetalle2 = url;
      }
      if (prod.imagenDetalle3) {
          var url : String = this.endpoint_url + prod.imagenDetalle3.split("\\").join("/").replace(".bin",".jpg");
          prod.imagenDetalle3 = url;
      }

      return prod;
    }

    private convertResult(result : ProductResult) : ProductResult {
      for (var i = 0; i < result.content.length; i++) {
          var prod = result.content[i];

          prod = this.convertProducto(prod);
      }

      return result;
    }

    public getProducts (page : number, size : number) : Observable<ProductResult> {
      var params : string = "";
      if (page != null) {
        params = "?page=" + page;
      }

      var limitParam : string;
      if (size != null) {
        var divider = (params ? "&" : "?");
        params = params + divider + "limit=" + size;
      }
      return this._http.request(this.endpoint_url + "/data/productos" + params).map(x => this.convertResult(x.json()));
    }

    public getProduct(id: number) : Observable<Product> {
      return this._http.request(this.endpoint_url + "/data/producto/" + id).map( x => this.convertProducto(x.json()));
    }




}
