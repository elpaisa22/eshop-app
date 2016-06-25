import {Injectable} from 'angular2/core';
import {Product} from '../../models/product/product.model';

@Injectable()
export class CartService {

    private cart : Product[] = [];

    agregarItem(prod : Product){
        this.cart.push(prod);
    }

    eliminarItem(prod : Product){
        this.cart = this.cart.filter(cartProd=>cartProd.id!==prod.id);
    }

    limpiarCarrito(){
        this.cart = [];
    }

    getItems():Product[]{
        return this.cart;
    }

    getPrecioTotal(){
        let totalPrice = this.cart.reduce((sum, cartProd)=>{
            return sum += cartProd.precio, sum;
        },0);

        return totalPrice;
    }
}
