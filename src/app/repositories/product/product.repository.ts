import {Injectable, Inject} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import {Observable}     from 'rxjs/Observable';

import {Product, Offer, ProductInOffer} from '../../models/product/product.model';
import {AppConfig} from '../../app.config';

@Injectable()
export class ProductRepository {

    _productsCache : Product[] = [];
    _offersCache : Offer[] = [];

    constructor(private _http: Http,
                @Inject('APP_CONFIG') private config: AppConfig){
    }

    private convertProducto(prod : Product) : Product {
      for (var i = 0; i < prod.images.length; i++) {
        var url : string = this.config.apiEndpoint + '/' + prod.images[i].image;
        prod.images[i].image = url;
      }
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
                                 .map(x => this.convertResult(x.json()));
        return this.handleProductResponse(response);
      } else {
        return Observable.of(this._productsCache);
      }
    }

    private handleProductResponse(response : Observable<Product[]>) : Observable<Product[]> {
      return response.do(data => {
        this._productsCache = data;
      });
    }

    public getProduct(id: number) : Observable<Product> {
      if (this._productsCache == null || this._productsCache.length == 0) {
        return this._http.request(this.config.apiEndpoint + '/api/product/' + id + '/')
                         .map(x => this.convertProducto(x.json()));
      } else {
        for (var i = 0; i < this._productsCache.length; i++) {
            if (this._productsCache[i].id == id) {
              return Observable.of(this._productsCache[i]);
            }
        }
      }
    }

    public searchByText(value : string) : Observable<Product[]> {
      return this.getProducts()
                 .map(response => {
                    let medidata = response as Product[];
                    return medidata;
                  })
                 .concatMap(array => Observable.from(array))
                 .filter((prod, index) => {
                      return prod.name.toLowerCase().indexOf(value.toLowerCase()) > -1;
                  })
                 .toArray();
    }

    public getCurrentOffers (forceReload : boolean = false) : Observable<Offer[]> {
      if (this._offersCache == null || this._offersCache.length == 0 || forceReload) {
        var response = this._http.request(this.config.apiEndpoint + "/api/current_offers/")
                                 .map(x => x.json());
        return this.handleOfferResponse(response);
      } else {
        return Observable.of(this._offersCache);
      }
    }

    public getOffer(id: number) : Observable<Offer> {
      if (this._offersCache == null || this._offersCache.length == 0) {
        return this._http.request(this.config.apiEndpoint + '/api/current_offers/' + id + '/')
                         .map(x => x.json());
      } else {
        for (var i = 0; i < this._offersCache.length; i++) {
            if (this._offersCache[i].id == id) {
              return Observable.of(this._offersCache[i]);
            }
        }
      }
    }

    public getProductsForOffer(offer : Offer) : Observable<Product[]> {
      let result : Product[] = [];

      offer.offerproduct_set.forEach(elem => {
        this.getProduct(elem.product).subscribe(p => result.push(p));
      })
      return Observable.of(result);
    }

    private handleOfferResponse(response : Observable<Offer[]>) : Observable<Offer[]> {
      return response.do(data => {
        this._offersCache = data;
      });
    }
}
