import {Injectable, Inject} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import {Observable, of, from} from 'rxjs';
import { map, tap, concatMap, filter, toArray } from 'rxjs/operators';

import {Product, ProductImage} from '../../models/product/product.model';
import {Offer, ProductInOffer} from '../../models/offer/offer.model';
import {AppConfig} from '../../app.config';

@Injectable()
export class ProductRepository {

    _productsCache : Product[] = [];


    constructor(private _http: Http,
                @Inject('APP_CONFIG') private config: AppConfig){
    }

    private convertProducto(prod : Product) : Product {
      //Si no hay imagenes cargadas para el producto, carga 2 imagenes por defecto
      if (prod.images.length == 0) {
        let defaultImg : ProductImage;
        defaultImg = new ProductImage();
        defaultImg.image = '/assets/images/not-available.png';
        prod.images.push(defaultImg);
        defaultImg = new ProductImage();
        defaultImg.image = '/assets/images/not-available.png';
        prod.images.push(defaultImg);
        //prod.images = images;
      } else {
        for (var i = 0; i < prod.images.length; i++) {
          var url : string = this.config.apiEndpoint + '/' + prod.images[i].image;
          prod.images[i].image = url;
        }
        //Si se cargo solo una imagen, entonces como segunda imagen se muestra la primera
        if (prod.images.length == 1) {
          let defaultImg : ProductImage;
          defaultImg = new ProductImage();
          defaultImg.image = this.config.apiEndpoint + '/' + prod.images[0].image;
          prod.images.push(defaultImg);
        }
      }
      //Obtiene el precio y calcula el descuento
      prod.discount_price = prod.price;
      if (prod.current_offer) {
        prod.discount = this.calcDiscount(prod.current_offer.offerproduct_set, prod.id, prod.price);
      } else {
        prod.discount = 0;
      }
      prod.discount_price = prod.price - prod.discount;
      return prod;
    }

    private calcDiscount(offers : ProductInOffer[], idProduct: number, price : number) : number {
      for (var i = 0; i < offers.length; i++) {
        var prod = offers[i];
        if (prod.product == idProduct) {
          return prod.discount * price / 100;
        }
      }
      return 0;
    }

    private convertResult(result : Product[]) : Product[] {
      for (var i = 0; i < result.length; i++) {
          var prod = result[i];
          prod = this.convertProducto(prod);
      }
      return result;
    }

    public getProducts (forceReload : boolean = false) : Observable<Product[]> {
      if (this._productsCache == null || this._productsCache.length == 0 || forceReload) {
        var response = this._http.request(this.config.apiEndpoint + '/api/product')
                                 .pipe(map(x => this.convertResult(x.json())));
        return this.handleProductResponse(response);
      } else {
        return of(this._productsCache);
      }
    }

    private handleProductResponse(response : Observable<Product[]>) : Observable<Product[]> {
      return response.pipe(tap(data => {
                              this._productsCache = data;
                            }));
    }

    public getProduct(id: number) : Observable<Product> {
      if (this._productsCache == null || this._productsCache.length == 0) {
        return this._http.request(this.config.apiEndpoint + '/api/product/' + id + '/')
                         .pipe(map(x => this.convertProducto(x.json())));
      } else {
        for (var i = 0; i < this._productsCache.length; i++) {
            if (this._productsCache[i].id == id) {
              return of(this._productsCache[i]);
            }
        }
      }
    }

    public getRelatedProducts(id: number) : Observable<Product[]> {
      return this._http.request(this.config.apiEndpoint + '/api/product/' + id + '/related_products/')
                       .pipe(map(x => this.convertResult(x.json())));
    }

    public searchByText(value : string) : Observable<Product[]> {
      return this.getProducts()
                 .pipe(
                   map(response => {
                      let medidata = response as Product[];
                      return medidata;
                    }),
                   concatMap(array => from(array)),
                   filter((prod, index) => {
                        return prod.name.toLowerCase().indexOf(value.toLowerCase()) > -1;
                    }),
                    toArray()
                 );
    }

    public getProductsForOffer(offer : Offer) : Observable<Product[]> {
      let result : Product[] = [];

      offer.offerproduct_set.forEach(elem => {
        this.getProduct(elem.product).subscribe(p => result.push(p));
      })
      return of(result);
    }

}
