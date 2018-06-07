import {Injectable, Inject} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import {Observable, of} from 'rxjs';
import { map, tap } from 'rxjs/operators';

import {Offer, ProductInOffer} from '../../models/offer/offer.model';
import {AppConfig} from '../../app.config';

@Injectable()
export class OfferRepository {

    _offersCache : Offer[] = [];

    constructor(private _http: Http,
                @Inject('APP_CONFIG') private config: AppConfig){
    }

    public getCurrentOffers (forceReload : boolean = false) : Observable<Offer[]> {
      if (this._offersCache == null || this._offersCache.length == 0 || forceReload) {
        var response = this._http.request(this.config.apiEndpoint + "/api/current_offers/")
                                 .pipe(map(x => x.json()));
        return this.handleOfferResponse(response);
      } else {
        return of(this._offersCache);
      }
    }

    public getOffer(id: number) : Observable<Offer> {
      if (this._offersCache == null || this._offersCache.length == 0) {
        return this._http.request(this.config.apiEndpoint + '/api/current_offers/' + id + '/')
                         .pipe(map(x => x.json()));
      } else {
        for (var i = 0; i < this._offersCache.length; i++) {
            if (this._offersCache[i].id == id) {
              return of(this._offersCache[i]);
            }
        }
      }
    }

    private handleOfferResponse(response : Observable<Offer[]>) : Observable<Offer[]> {
      return response.pipe(tap(data => {
                              this._offersCache = data;
                            })
                          );
    }
}
