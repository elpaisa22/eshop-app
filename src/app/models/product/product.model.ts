import {SubCategory} from '../category/section.model';
import {Tag} from '../tag/tag.model';
import {Offer} from '../offer/offer.model';

export class Product {
    id : number;
    name : string;
    details : string;
    foot_desc : string;
    price : number;
    discount : number;
    discount_price : number;
    stock: number;
    sub_category : SubCategory;
    tags: Tag[];
    images : Image[];
    brand : string;
    sku : string;
    current_offer : Offer;
    shipping_available : Boolean;
}

export interface Comment {
    name : string;
    comment : string;
    rate? : number;
}

export interface Image {
    image : string;
}
