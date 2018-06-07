import {Injectable} from '@angular/core';

import {Product} from '../../models/product/product.model';
import {CartItem} from '../../models/cartitem/cartitem.model';
import {Delivery, Payment} from '../../models/checkout/checkout.model';

import { Observable, BehaviorSubject } from 'rxjs';

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

    //Mantiene el total de descuentos
    private totalDiscountSource = new BehaviorSubject<number>(0);
    public  totalDiscount : Observable<number> = this.totalDiscountSource.asObservable();

    //Datos del checkout
    private _delivery : Delivery;
    private _payment : Payment;

    //Token de MercadoPago
    private _token : any;

    constructor() {
      //Verifica si ya existen items anteriores
      //this.loadItems();
      this.updateSubtotal();
      this.updateTotalPrice();
      this.updateItemsCount();
      this.updateTotalDiscount();
    }

    //Verifica si el carrito de compras esta vacio
    public cartIsEmpty() : boolean {
      return this.itemsCountSource.getValue() == 0;
    }

    //Calcula la cantidad de items del carrito
    private updateItemsCount() {
        this.itemsCountSource.next(this.itemsSource.getValue().length);
    }

    //Resetea el valor del envio
    private resetDeliveryPrice() {
      this._delivery = null;
      this.deliveryPriceSource.next(0);
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
          return sum += (cartProd.price + cartProd.discount) * cartProd.count, sum;
      },0);
      this.subtotalSource.next(total);
    }

    //Resetea la informacion del pago
    private resetPayment() {
      this._payment = null;
      this.interestSource.next(0);
    }

    //Calcula el costo financiero (Interes)
    private updateInterest() {
      let total = this.itemsSource.getValue().reduce((sum, cartProd)=>{
          return sum += cartProd.price * cartProd.count, sum;
      },0);
      total = total + this.deliveryPriceSource.getValue();

      let  financialCost = 0;
      //Si el methodo de pago posee cuotas
      if (this._payment != null
          && this._payment.method != null
          && !this._payment.cashPayment
          && this._payment.method.totalAmount != null) {
        financialCost = this._payment.method.totalAmount;
      }

      let value = financialCost - total;
      if (financialCost > 0 && value > 0.1) {
        this.interestSource.next(value);
      } else {
        this.interestSource.next(0);
      }
    }

    //Actualiza el precio total de los items
    private updateTotalPrice() {
        this.totalPriceSource.next(this.calcTotalPrice());
    }

    //Actualiza el precio total de los items
    private updateTotalDiscount() {
        this.totalDiscountSource.next(this.calcTotalDiscount());
    }

    //ELimina la informacion del Pago
    public clearPaymentData() {
      if (this._payment != null) {
        this._payment.method = null;
      }
      this._payment = null;
      this._delivery = null;
    }

    //Actualiza la cantidad del item
    public updateItem(item : CartItem) {
      let index = this.itemsSource.getValue().findIndex((i) => i.id == item.id);
      if (index >= 0) {
        let elem  = this.itemsSource.getValue()[index];
        elem.count = item.count;
        if (elem.product.current_offer) {
          if (elem.count >= elem.product.current_offer.min_required) {
            elem.price = elem.product.discount_price;
            elem.discount = elem.product.price - elem.product.discount_price;
          } else {
            elem.price = elem.product.price;
            elem.discount = 0;
          }
        }
      }
      this.resetPayment();
      this.resetDeliveryPrice();
      this.updateSubtotal();
      this.updateTotalPrice();
      this.updateItemsCount();
      this.updateTotalDiscount();
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
          if (prod.current_offer && prod.current_offer.min_required <= 1) {
              item.price = prod.discount_price;
              item.discount = prod.price - prod.discount_price;
          } else {
              item.price = prod.price;
              item.discount = 0;
          }

          item.count = 1;
          item.image = prod.images[0].image;
          item.product = prod;

          this.itemsSource.getValue().push(item);
        }

        this.resetPayment();
        this.resetDeliveryPrice();
        //this.saveItems();
        this.updateSubtotal();
        this.updateTotalPrice();
        this.updateItemsCount();
        this.updateTotalDiscount();
    }

    //Elimina un item del carrito
    public deleteItem(item : CartItem){
        //let all: List<CartItem> = this._cart.getValue();
        var index : number = this.itemsSource.getValue().indexOf(item, 0);
        if (index > -1) {
           this.itemsSource.getValue().splice(index, 1);
        }

        this.resetPayment();
        this.resetDeliveryPrice();
        //this.saveItems();
        this.updateSubtotal();
        this.updateTotalPrice();
        this.updateItemsCount();
        this.updateTotalDiscount();
    }

    //Limpia el carrito eliminando todos los items
    public cleanCart(){
        this.itemsSource.getValue().splice(0);
        //this.saveItems();

        this.subtotalSource.next(0);
        this.totalPriceSource.next(0);
        this.deliveryPriceSource.next(0);
        this.itemsCountSource.next(0);
        this.totalDiscountSource.next(0);
        this.interestSource.next(0);
    }

    //Calcula el precio total de los items
    public calcTotalPrice() : number {
        let totalPrice = this.itemsSource.getValue().reduce((sum, cartProd)=>{
            return sum += cartProd.price * cartProd.count, sum;
        },0);

        return totalPrice + this.deliveryPriceSource.getValue() + this.interestSource.getValue();
    }

    //Calcula el precio total de los items pero sin sumar el interes
    public calcTotalPriceWithoutInteres() : number {
        let totalPrice = this.itemsSource.getValue().reduce((sum, cartProd)=>{
            return sum += cartProd.price * cartProd.count, sum;
        },0);

        return totalPrice + this.deliveryPriceSource.getValue();
    }

    //Calcula el precio total de los descuentos
    public calcTotalDiscount() : number {
        let totalDiscount = this.itemsSource.getValue().reduce((sum, cartProd)=>{
            return sum += cartProd.discount * cartProd.count, sum;
        },0);

        return totalDiscount;
    }

    //Verifica si todos los elementos del carrito pueden ser enviados
    public availableForShipping() : boolean {
      var elem = this.itemsSource.getValue().find(item => item.product.shipping_available == false);
      if (elem == null) {
        return true;
      } else {
        return false;
      }
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
