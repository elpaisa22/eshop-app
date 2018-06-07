import {Injectable, Inject} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import {Observable} from 'rxjs';
import { catchError } from 'rxjs/operators';

import {CartItem} from '../../models/cartitem/cartitem.model';
import {Delivery, Payment} from '../../models/checkout/checkout.model';
import {AppConfig} from '../../app.config';

@Injectable()
export class CheckoutRepository {

  constructor(private _http: Http,
              @Inject('APP_CONFIG') private config: AppConfig) {
  }

  //Invoca al servicio para calcular el precio del envio
  public quoteShipping(delivery: Delivery, items: CartItem[]) : Observable<Response> {
    const data = {
        'delivery': delivery,
        'items': items
    };
    const body = JSON.stringify(data);
    const head = new Headers({
        'Content-Type': 'application/json',
        'X-CSRFToken': this.xsrfToken
    });
    return this._http.post(this.config.apiEndpoint + '/api/quote_shipping/', body , {headers : head})
                     .pipe(catchError(this.handleErrorObservable));
  }

  //Invoca al servicio de checkout
  public sendCheckoutData(delivery: Delivery, payment: Payment, token: any, items: CartItem[]): Observable<Response>  {
    const data = {
        'delivery': delivery,
        'payment': payment,
        'token': token,
        'items': items
    };
    const body = JSON.stringify(data);
    const head = new Headers({
        'Content-Type': 'application/json',
        'X-CSRFToken': this.xsrfToken
    });

    return this._http.post(this.config.apiEndpoint + '/api/process_payment/', body , {headers : head})
                     .pipe(catchError(this.handleErrorObservable));
  }

  private handleErrorObservable (error: Response | any) {
    console.error(error.message || error);
    return Observable.throw(error.message || error);
  }

  private get xsrfToken() {
    const name = 'csrftoken';
    const value = '; ' + document.cookie;
    const parts = value.split('; ' + name + '=');
    if (parts.length === 2) {
      return parts.pop().split(';').shift();
    }

    return '';
  }
}
