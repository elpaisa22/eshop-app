import {Injectable} from '@angular/core';

import {Product} from '../../models/product/product.model';
import {CartItem} from '../../models/cartitem/cartitem.model';

import {List} from 'immutable';

import {BehaviorSubject} from "rxjs/Rx";
import {Subject} from "rxjs/Subject";
import {Observable} from "rxjs/Observable";

@Injectable()
export class CartService {

    private _cart : BehaviorSubject<List<CartItem>> = new BehaviorSubject(List([]));

    constructor() {
      //Verifica si ya existen items anteriores
      this.levantarItems();
    }

    //Levanta lo items del localStorage
    private levantarItems() {
      var cart = localStorage.getItem("cart");
      if (cart) {
        var items = JSON.parse(cart);
        for (var i = 0; i < items.length; i++) {
            var elem : CartItem = <CartItem> items[i];
            this._cart.next(this._cart.getValue().push(elem));
        }
      }
    }

    //Guarda los items en el localStorage
    private guardarItems() {
      localStorage.setItem("cart", JSON.stringify(this._cart.getValue()));
    }

    //Agrega un producto como item del carrito
    agregarProducto(prod : Product){
        let index = this._cart.getValue().findIndex((i) => i.id == prod.id);
        if (index < 0) {
          var item : CartItem = new CartItem();
          item.id = prod.id;
          item.descripcion = prod.descripcion;
          item.precio = prod.precio;
          item.cantidad = 1;
          item.imagen1 = prod.imagen1;

          this._cart.next(this._cart.getValue().push(item));
        }

        this.guardarItems();
    }

    //Elimina un item del carrito
    eliminarItem(item : CartItem){
        //let all: List<CartItem> = this._cart.getValue();
        let index = this._cart.getValue().findIndex((i) => i.id === item.id);
        this._cart.next(this._cart.getValue().delete(index));

        this.guardarItems();
    }

    //Limpia el carrito eliminando todos los items
    limpiarCarrito(){
        this._cart.getValue().clear();

        this.guardarItems();
    }

    //Retorna todos lo items del carrito
    get items() {
        return this.asObservable(this._cart);
    }

    //Retorna la cantidad de items del carrito
    get itemsCount() {
        return this._cart.getValue().size;
    }

    //Obtiene el precio total de los items
    get precioTotal(){
        let totalPrice = this._cart.getValue().reduce((sum, cartProd)=>{
            return sum += cartProd.precio * cartProd.cantidad, sum;
        },0);

        return totalPrice;
    }

    private asObservable(subject: Subject<List<CartItem>>) {
      return new Observable(fn => subject.subscribe(fn));
    }
}
