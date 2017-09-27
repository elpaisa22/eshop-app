import { Injectable } from "@angular/core";
import { Actions, Effect } from "@ngrx/effects";
import {Observable} from "rxjs/Rx";

import {Product} from '../../models/product/product.model';
import {ProductRepository} from '../../repositories/product/product.repository';

import * as CatalogActions from './catalog.actions';
export type Action = CatalogActions.All;

@Injectable()
export class CatalogEffects {
  constructor( private _actions : Actions,
               private _productRepository : ProductRepository ) {
  }

  @Effect() getProducts$ = this._actions
    .ofType(CatalogActions.GET_PRODUCTS)
    .switchMap(action =>  this._productRepository.getProducts()
                                                 .map(products => ({type: CatalogActions.GET_PRODUCTS_SUCCESS, payload: products as Product[]}))
                                                 .catch(() => Observable.of({type: CatalogActions.GET_PRODUCTS_ERROR})));
}
