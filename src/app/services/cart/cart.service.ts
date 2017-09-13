import {Injectable} from '@angular/core';

import {Product} from '../../models/product/product.model';
import {CartItem} from '../../models/cartitem/cartitem.model';
import {Delivery, Payment, PaymentMethod} from '../../models/checkout/checkout.model';

import {Observable} from "rxjs/Rx";

@Injectable()
export class CartService {

    //Datos de los articulos
    private _cart : CartItem[] = new Array<CartItem>();

    //Datos del checkout
    private _delivery : Delivery;
    private _payment : Payment;
    private _method : PaymentMethod;

    //Token de MercadoPago
    private _token : any;

    constructor() {
      //Verifica si ya existen items anteriores
      this.loadItems();
    }

    get delivery() : Delivery {
      return this._delivery;
    }

    set delivery(delivery : Delivery) {
      this._delivery = delivery;
    }

    get payment() : Payment {
      return this._payment;
    }

    set payment(payment : Payment) {
      this._payment = payment;
    }

    get method() : PaymentMethod {
      return this._method;
    }

    set method(paymentMethod : PaymentMethod) {
      this._method = paymentMethod;
    }

    get token() {
      return this._token;
    }

    set token(token) {
      this._token = token;
    }

    get cart() {
      return this._cart;
    }

    //ELimina la informacion del Pago
    public clearPaymentData() {
      this._payment = null;
      this._method = null;
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
          item.sku = prod.sku;
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

    //Retorna el precio de envio
    get deliveryPrice() : number {
      let  deliveryPrice = 0;
      if (this._delivery != null && this.delivery.price != null) {
        deliveryPrice = this.delivery.price;
      }
      return deliveryPrice;
    }

    //Obtiene el precio subtotal de los items
    get subtotal() : number {
      let total = this._cart.reduce((sum, cartProd)=>{
          return sum += cartProd.price * cartProd.count, sum;
      },0);
      return total;
    }

    //Retorna el costo financiero (Interes)
    get interest() : number {
      let total = this._cart.reduce((sum, cartProd)=>{
          return sum += cartProd.price * cartProd.count, sum;
      },0);

      let  financialCost = 0;
      if (this._method != null && this._method.totalAmount != null) {
        financialCost = this._method.totalAmount;
      }
      if (financialCost > 0) {
          return financialCost - total;
      } else {
        return 0;
      }

    }

    //Obtiene el precio total de los items
    get totalPrice() : number {
        let  financialCost = 0;
        if (this._method != null && this._method.totalAmount != null) {
          financialCost = this._method.totalAmount;
        }
        if (financialCost > 0) {
            return financialCost + this.deliveryPrice;
        } else {
          let totalPrice = this._cart.reduce((sum, cartProd)=>{
              return sum += cartProd.price * cartProd.count, sum;
          },0);
          return totalPrice + this.deliveryPrice;
        }
    }

    private asObservable(subject: CartItem[]) {
      return Observable.of(subject);
    }

}
