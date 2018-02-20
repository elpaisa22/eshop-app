import {Injectable, Inject} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import {Observable}     from 'rxjs/Observable';

import {Contact} from '../../models/contact/contact.model';
import {AppConfig} from '../../app.config';

@Injectable()
export class ContactRepository {

    _contactCache : Contact = null;

    constructor(private _http: Http,
                @Inject('APP_CONFIG') private config: AppConfig){
    }

    public getContactInfo (forceReload : boolean = false) : Observable<Contact> {
      if (this._contactCache == null || forceReload) {
        var response = this._http.request(this.config.apiEndpoint + "/api/contact_info/")
                                 .map(x => x.json());
        return this.handleContactResponse(response);
      } else {
        return Observable.of(this._contactCache);
      }
    }

    private handleContactResponse(response : Observable<Contact>) : Observable<Contact> {
      return response.do(data => {
        this._contactCache = data;
      });
    }
}
