import { Action } from '@ngrx/store';
import {Product} from '../../models/product/product.model';

export const GET_PRODUCTS         = "[PRODUCTS] Get Products";
export const GET_PRODUCTS_SUCCESS = "[PRODUCTS] Get Products Success";
export const GET_PRODUCTS_ERROR   = "[PRODUCTS] Get Products Error";

export const NEXT_PAGE            = '[PAGE] Next';
export const PREVIOUS_PAGE        = '[PAGE] Previous';
export const CHANGE_PAGE          = '[PAGE] Change';
export const CHANGE_PAGE_SIZE     = '[PAGE] Change Size';

export const CHANGE_SORT_ORDER    = '[PAGE] Sort By';

export class GetProducts implements Action {
  readonly type = GET_PRODUCTS;
}

export class GetProductsSuccess implements Action {
  readonly type = GET_PRODUCTS_SUCCESS;

  constructor (public payload : Product[]) {}
}

export class GetProductsError implements Action {
  readonly type = GET_PRODUCTS_ERROR;
}

export class NextPage implements Action {
  readonly type = NEXT_PAGE;
}

export class PrevoiusPage implements Action {
  readonly type = PREVIOUS_PAGE;
}

export class ChangePage implements Action {
  readonly type = CHANGE_PAGE;

  constructor (public pageNum : number) {}
}

export class ChangePageSize implements Action {
  readonly type = CHANGE_PAGE_SIZE;

  constructor (public pageSize : number) {}
}

export class ChangeSortOrder implements Action {
  readonly type = CHANGE_SORT_ORDER;

  constructor (public sortBy : string) {}
}

export type All = GetProducts
 | GetProductsSuccess
 | GetProductsError
 | NextPage
 | PrevoiusPage
 | ChangePage
 | ChangePageSize
 | ChangeSortOrder;
