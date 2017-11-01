import {Injectable} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';

import {CartItem} from '../../models/cartitem/cartitem.model';
import {Delivery, Payment} from '../../models/checkout/checkout.model';

@Injectable()
export class CheckoutRepository {

  endpoint_url = 'http://shophaus.iarmenda.webfactional.com/';

  constructor(private _http: Http) {
  }

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
        'X-XSRF-TOKEN': this.xsrfToken
    });

    return this._http.post(this.endpoint_url + 'api/process_payment/', body , {headers : head})
                     .catch(this.handleErrorObservable);
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
