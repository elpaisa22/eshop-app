import {Injectable} from 'angular2/core';

import {Product} from '../../models/product/product.model';
import {CartItem} from '../../models/cartitem/cartitem.model';

import {List} from 'immutable';

import {BehaviorSubject} from "rxjs/Rx";
import {Subject} from "rxjs/Subject";
import {Observable} from "rxjs/Observable";

@Injectable()
export class CartService {

    private _cart : BehaviorSubject<List<CartItem>> = new BehaviorSubject(List([]));

    agregarProducto(prod : Product){
        var item : CartItem = new CartItem();
        item.id = prod.id;
        item.descripcion = prod.descripcion;
        item.precio = prod.precio;
        item.cantidad = 1;
        item.imagen1 = prod.imagen1;

        this._cart.next(this._cart.getValue().push(item));
    }

    eliminarItem(item : CartItem){
        let all: List<CartItem> = this._cart.getValue();
        let index = all.findIndex((i) => i.id === item.id);
        this._cart.next(all.delete(index));
    }

    limpiarCarrito(){
        this._cart.getValue().clear();
    }

    get items() {
        return this.asObservable(this._cart);
    }

    getPrecioTotal(){
        let totalPrice = this._cart.getValue().reduce((sum, cartProd)=>{
            return sum += cartProd.precio, sum;
        },0);

        return totalPrice;
    }

    private asObservable(subject: Subject<List<CartItem>>) {
      return new Observable(fn => subject.subscribe(fn));
    }
}
