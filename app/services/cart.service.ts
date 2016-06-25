import {Injectable} from 'angular2/core';
import {Producto} from '../models/producto.model';

@Injectable()
export class CartService {

    private cart : Producto[] = [];

    agregarProducto(prod : Producto){
        this.cart.push(prod);
    }

    eliminarProducto(prod : Producto){
        this.cart = this.cart.filter(cartProd=>cartProd.id!==prod.id);
    }

    limpiarCarrito(){
        this.cart = [];
    }

    getCarrito():Producto[]{
        return this.cart;
    }

    getPrecioTotal(){
        let totalPrice = this.cart.reduce((sum, cartProd)=>{
            return sum += cartProd.precio, sum;
        },0);

        return totalPrice;
    }
}
