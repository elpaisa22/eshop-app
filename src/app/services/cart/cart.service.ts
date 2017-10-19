import {Injectable} from '@angular/core';

import {Product} from '../../models/product/product.model';
import {CartItem} from '../../models/cartitem/cartitem.model';
import {Delivery, Payment} from '../../models/checkout/checkout.model';

import { Observable, BehaviorSubject } from 'rxjs/Rx';

@Injectable()
export class CartService {

    //Datos de los articulos
    private itemsSource = new BehaviorSubject<CartItem[]>(new Array<CartItem>());
    public  items : Observable<CartItem[]> = this.itemsSource.asObservable();

    //Mantiene la cantidad de articulos en el carrito
    private itemsCountSource = new BehaviorSubject<number>(0);
    public  itemsCount : Observable<number> = this.itemsCountSource.asObservable();

    //Mantiene el precio del envio
    private deliveryPriceSource = new BehaviorSubject<number>(0);
    public  deliveryPrice : Observable<number> = this.deliveryPriceSource.asObservable();

    //Mantiene el importe subtotal
    private subtotalSource = new BehaviorSubject<number>(0);
    public  subtotalPrice : Observable<number> = this.subtotalSource.asObservable();

    //Mantiene el importe de interes
    private interestSource = new BehaviorSubject<number>(0);
    public  interest : Observable<number> = this.interestSource.asObservable();

    //Mantiene el importe total
    private totalPriceSource = new BehaviorSubject<number>(0);
    public  totalPrice : Observable<number> = this.totalPriceSource.asObservable();

    //Datos del checkout
    private _delivery : Delivery;
    private _payment : Payment;

    //Token de MercadoPago
    private _token : any;

    constructor() {
      //Verifica si ya existen items anteriores
      this.loadItems();
      this.updateSubtotal();
      this.updateTotalPrice();
      this.updateItemsCount();
    }

    //Calcula la cantidad de items del carrito
    private updateItemsCount() {
        this.itemsCountSource.next(this.itemsSource.getValue().length);
    }

    //Calcula el precio de envio
    private updateDeliveryPrice() {
      let  deliveryPrice = 0;
      if (this._delivery != null && this._delivery.price != null) {
        deliveryPrice = this._delivery.price;
      }
      this.deliveryPriceSource.next(deliveryPrice);
    }

    //Calcula el precio subtotal de los items
    private updateSubtotal() {
      let total : number = this.itemsSource.getValue().reduce((sum, cartProd)=>{
          return sum += cartProd.price * cartProd.count, sum;
      },0);
      this.subtotalSource.next(total);
    }

    //Calcula el costo financiero (Interes)
    private updateInterest() {
      let total = this.itemsSource.getValue().reduce((sum, cartProd)=>{
          return sum += cartProd.price * cartProd.count, sum;
      },0);

      let  financialCost = 0;
      //Si el methodo de pago posee cuotas
      if (this._payment.method != null
          && !this._payment.cashPayment
          && this._payment.method.totalAmount != null) {
        financialCost = this._payment.method.totalAmount;
      }
      if (financialCost > 0) {
        this.interestSource.next(financialCost - total);
      } else {
        this.interestSource.next(0);
      }
    }

    //Actualiza el precio total de los items
    private updateTotalPrice() {
        this.totalPriceSource.next(this.calcTotalPrice());
    }

    //ELimina la informacion del Pago
    public clearPaymentData() {
      if (this._payment != null) {
        this._payment = null;
        this._payment.method = null;
      }
    }

    //Actualiza la cantidad del item
    public updateItem(item : CartItem) {
      let index = this.itemsSource.getValue().findIndex((i) => i.id == item.id);
      if (index > 0) {
        let elem  = this.itemsSource.getValue()[index];
        elem.count = item.count;
      }
      this.updateSubtotal();
      this.updateTotalPrice();
      this.updateItemsCount();
    }

    //Levanta lo items del localStorage
    private loadItems() {
      var cart = localStorage.getItem("cart");
      if (cart) {
        var items = JSON.parse(cart);
        for (var i = 0; i < items.length; i++) {
            var elem : CartItem = <CartItem> items[i];
            this.itemsSource.getValue().push(elem);
        }
      }
    }

    //Guarda los items en el localStorage
    public saveItems() {
      localStorage.setItem("cart", JSON.stringify(this.itemsSource.getValue()));
    }

    //Agrega un producto como item del carrito
    public addProduct(prod : Product){
        let index = this.itemsSource.getValue().findIndex((i) => i.id == prod.id);
        if (index < 0) {
          var item : CartItem = new CartItem();
          item.id = prod.id;
          item.sku = prod.sku;
          item.name = prod.name;
          item.price = prod.price;
          item.count = 1;
          item.image = prod.images[0].image;

          this.itemsSource.getValue().push(item);
        }

        this.saveItems();
        this.updateSubtotal();
        this.updateTotalPrice();
        this.updateItemsCount();
    }

    //Elimina un item del carrito
    public deleteItem(item : CartItem){
        //let all: List<CartItem> = this._cart.getValue();
        var index : number = this.itemsSource.getValue().indexOf(item, 0);
        if (index > -1) {
           this.itemsSource.getValue().splice(index, 1);
        }

        this.saveItems();
        this.updateSubtotal();
        this.updateTotalPrice();
        this.updateItemsCount();
    }

    //Limpia el carrito eliminando todos los items
    public cleanCart(){
        this.itemsSource.getValue().splice(0);
        this.saveItems();

        this.subtotalSource.next(0);
        this.totalPriceSource.next(0);
        this.deliveryPriceSource.next(0);
    }

    //Calcula el precio total de los items
    public calcTotalPrice() : number {
        let totalPrice = this.itemsSource.getValue().reduce((sum, cartProd)=>{
            return sum += cartProd.price * cartProd.count, sum;
        },0);

        return totalPrice + this.deliveryPriceSource.getValue() + this.interestSource.getValue();
    }

    public getDelivery() : Delivery {
      return this._delivery;
    }

    public setDelivery(delivery : Delivery) {
      this._delivery = delivery;
      this.updateDeliveryPrice();
      this.updateTotalPrice();
    }

    public getPayment() : Payment {
      return this._payment;
    }

    public setPayment(payment : Payment) {
      this._payment = payment;
      this.updateInterest();
      this.updateTotalPrice();
    }

    public getToken() {
      return this._token;
    }

    public setToken(token) {
      this._token = token;
    }

}
