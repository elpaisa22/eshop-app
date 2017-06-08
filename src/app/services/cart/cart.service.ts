import {Injectable} from '@angular/core';

import {Product} from '../../models/product/product.model';
import {CartItem} from '../../models/cartitem/cartitem.model';

import {Observable} from "rxjs/Rx";

@Injectable()
export class CartService {

    private _cart : CartItem[] = new Array<CartItem>();

    constructor() {
      //Verifica si ya existen items anteriores
      this.loadItems();
    }

    //Levanta lo items del localStorage
    private loadItems() {
      var cart = localStorage.getItem("cart");
      if (cart) {
        var items = JSON.parse(cart);
        for (var i = 0; i < items.length; i++) {
            var elem : CartItem = <CartItem> items[i];
            this._cart.push(elem);
        }
      }
    }

    //Guarda los items en el localStorage
    public saveItems() {
      localStorage.setItem("cart", JSON.stringify(this._cart));
    }

    //Agrega un producto como item del carrito
    addProduct(prod : Product){
        let index = this._cart.findIndex((i) => i.id == prod.id);
        if (index < 0) {
          var item : CartItem = new CartItem();
          item.id = prod.id;
          item.name = prod.name;
          item.price = prod.price;
          item.count = 1;
          item.image = prod.images[0].image;

          this._cart.push(item);
        }

        this.saveItems();
    }

    //Elimina un item del carrito
    deleteItem(item : CartItem){
        //let all: List<CartItem> = this._cart.getValue();
        var index : number = this._cart.indexOf(item, 0);
        if (index > -1) {
           this._cart.splice(index, 1);
        }

        this.saveItems();
    }

    //Limpia el carrito eliminando todos los items
    cleanCart(){
        this._cart.splice(0);

        this.saveItems();
    }

    //Retorna todos lo items del carrito
    get items() : Observable<CartItem[]> {
        return this.asObservable(this._cart);
    }

    //Retorna la cantidad de items del carrito
    get itemsCount() : number {
        return this._cart.length;
    }

    //Obtiene el precio total de los items
    get totalPrice() : number {
        let totalPrice = this._cart.reduce((sum, cartProd)=>{
            return sum += cartProd.price * cartProd.count, sum;
        },0);

        return totalPrice;
    }

    private asObservable(subject: CartItem[]) {
      return Observable.of(subject);
    }
}
