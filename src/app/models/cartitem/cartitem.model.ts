import {Product} from '../product/product.model';

export class CartItem {
    id : number;
    sku : string;
    name : string;
    count : number;
    price: number;
    discount: number;
    image : string;
    product : Product;
}
