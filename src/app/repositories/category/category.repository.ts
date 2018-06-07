import {Injectable, Inject} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import {Observable, of} from 'rxjs';
import { map, tap } from 'rxjs/operators';

import {Section} from '../../models/category/section.model';
import {AppConfig} from '../../app.config';

@Injectable()
export class CategoryRepository {

  _categoryCache : Section[] = [];

  constructor(private _http: Http,
              @Inject('APP_CONFIG') private config: AppConfig){
  }

  public getCategories (forceReload : boolean = false) : Observable<Section[]> {
    if (this._categoryCache == null || this._categoryCache.length == 0 || forceReload) {
      var response = this._http.request(this.config.apiEndpoint + "/api/categories/")
                               .pipe(map(x => x.json()));
      return this.handleResponse(response);
    } else {
      return of(this._categoryCache);
    }
  }

  private handleResponse(response : Observable<Section[]>) : Observable<Section[]> {
    return response.pipe(tap(data => {
      this._categoryCache = data;
    }));
  }
}
