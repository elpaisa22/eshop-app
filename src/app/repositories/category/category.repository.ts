import {Injectable} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import {Observable}     from 'rxjs/Observable';

import {Section} from '../../models/category/section.model';

@Injectable()
export class CategoryRepository {

  endpoint_url : string = "http://shophaus.iarmenda.webfactional.com/";

  _categoryCache : Section[] = [];

  constructor(private _http: Http){
  }

  public getCategories (forceReload : boolean = false) : Observable<Section[]> {
    if (this._categoryCache == null || this._categoryCache.length == 0 || forceReload) {
      var response = this._http.request(this.endpoint_url + "/api/categories")
                               .map(x => x.json());
      return this.handleResponse(response);
    } else {
      return Observable.of(this._categoryCache);
    }
  }

  private handleResponse(response : Observable<Section[]>) : Observable<Section[]> {
    return response.do(data => {
      this._categoryCache = data;
    });
  }
}
