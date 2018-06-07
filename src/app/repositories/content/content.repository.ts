import {Injectable, Inject} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import {Observable, of} from 'rxjs';
import { map, tap } from 'rxjs/operators';

import {Content} from '../../models/content/content.model';
import {AppConfig} from '../../app.config';

@Injectable()
export class ContentRepository {

    _contentCache : Content[] = [];

    constructor(private _http: Http,
                @Inject('APP_CONFIG') private config: AppConfig){
    }

    public getSliderContent(forceReload : boolean = false) : Observable<Content[]> {
      if (this._contentCache == null || this._contentCache.length == 0 || forceReload) {
        var response = this._http.request(this.config.apiEndpoint + "/api/content/")
                                 .pipe(map(x => x.json()));
        return this.handleContentResponse(response)
                   .pipe(map( x => x.filter( elem => elem.section == "slider")));
      } else {
        return of(this._contentCache).pipe(map( x => x.filter( elem => elem.section == "slider")));
      }
    }

    public getFooterContent(forceReload : boolean = false) : Observable<Content[]> {
      if (this._contentCache == null || this._contentCache.length == 0 || forceReload) {
        var response = this._http.request(this.config.apiEndpoint + "/api/content/")
                                 .pipe(map(x => x.json()));
        return this.handleContentResponse(response)
                   .pipe(map( x => x.filter( elem => elem.section == "footer")));
      } else {
        return of(this._contentCache)
                  .pipe(
                        map( x => x.filter( elem => elem.section == "footer"))
                  );
      }
    }

    public getContent(id: number) : Observable<Content> {
      if (this._contentCache == null || this._contentCache.length == 0) {
        return this._http.request(this.config.apiEndpoint + '/api/content/' + id + '/')
                         .pipe(map(x => x.json()));
      } else {
        for (var i = 0; i < this._contentCache.length; i++) {
            if (this._contentCache[i].id == id) {
              return of(this._contentCache[i]);
            }
        }
      }
    }

    private handleContentResponse(response : Observable<Content[]>) : Observable<Content[]> {
      return response.pipe(tap(data => {
                                this._contentCache = data;
                               })
                          );
    }
}
