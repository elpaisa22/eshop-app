import {Injectable, Inject} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import {Observable}     from 'rxjs/Observable';

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
                                 .map(x => x.json());
        return this.handleContentResponse(response)
                   .map( x => x.filter( elem => elem.section == "slider"));
      } else {
        return Observable.of(this._contentCache)
                         .map( x => x.filter( elem => elem.section == "slider"));
      }
    }

    public getFooterContent(forceReload : boolean = false) : Observable<Content[]> {
      if (this._contentCache == null || this._contentCache.length == 0 || forceReload) {
        var response = this._http.request(this.config.apiEndpoint + "/api/content/")
                                 .map(x => x.json());
        return this.handleContentResponse(response)
                   .map( x => x.filter( elem => elem.section == "footer"));
      } else {
        return Observable.of(this._contentCache)
                         .map( x => x.filter( elem => elem.section == "footer"));
      }
    }

    public getContent(id: number) : Observable<Content> {
      if (this._contentCache == null || this._contentCache.length == 0) {
        return this._http.request(this.config.apiEndpoint + '/api/content/' + id + '/')
                         .map(x => x.json());
      } else {
        for (var i = 0; i < this._contentCache.length; i++) {
            if (this._contentCache[i].id == id) {
              return Observable.of(this._contentCache[i]);
            }
        }
      }
    }

    private handleContentResponse(response : Observable<Content[]>) : Observable<Content[]> {
      return response.do(data => {
        this._contentCache = data;
      });
    }
}
