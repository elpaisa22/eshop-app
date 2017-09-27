import {Product} from '../../models/product/product.model';

import * as CatalogActions from './catalog.actions';
export type Action = CatalogActions.All;

//Catalog State
export interface CatalogState {
  page : number,
  pageSize : number,
  totalPages : number,
  sortBy : string,

  allProducts : Product[],
  pageProducts : Product[],

  allProductsCount : number,
  productsCount : number,

  pending: false,
  error: null
}

//Default state
const initialState : CatalogState = {
  page : 1,
  pageSize : 12,
  totalPages : 1,
  sortBy : 'name',

  allProducts : [],
  pageProducts : [],

  allProductsCount : 0,
  productsCount : 0,

  pending: false,
  error: null
}

//Helper function to create new state object
const newState = (state, newData) => {
  return Object.assign({}, state, newData);
}

export function catalogReducer(state : CatalogState = initialState, action: Action): CatalogState {
  console.log(action.type, state);

  switch (action.type) {
      case CatalogActions.GET_PRODUCTS:
          return newState(state, {pending : true, error : null });

      case CatalogActions.GET_PRODUCTS_SUCCESS: {
          var gpsAction : CatalogActions.GetProductsSuccess = <CatalogActions.GetProductsSuccess> action;
          return newState(state, {allProducts : gpsAction.payload,
                                  totalProducts : gpsAction.payload.length,
                                  pageProducts : gpsAction.payload,
                                  productsCount : gpsAction.payload.length,
                                  pending : false });
      }

      case CatalogActions.GET_PRODUCTS_ERROR:
          return newState(state, {pending : false, error : "Error al obtener los productos" });

      case CatalogActions.NEXT_PAGE:
          return newState(state, {page : state.page + 1});

      case CatalogActions.PREVIOUS_PAGE:
          return newState(state, {page : state.page - 1});

      case CatalogActions.CHANGE_PAGE: {
          var cpAction : CatalogActions.ChangePage = <CatalogActions.ChangePage> action;
          return newState(state, {page : cpAction.pageNum });
      }

      case CatalogActions.CHANGE_PAGE_SIZE: {
          var cpzAction : CatalogActions.ChangePageSize = <CatalogActions.ChangePageSize> action;
          return newState(state, {pageSize : cpzAction.pageSize });
      }

      default: return state;
  }
}
