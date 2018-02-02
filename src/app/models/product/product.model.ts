import {SubCategory} from '../category/section.model';
import {Tag} from '../tag/tag.model';

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
}

export interface Comment {
    name : string;
    comment : string;
    rate? : number;
}

export interface Image {
    image : string;
}

export interface Offer {
  id: number;
  name: string;
  image: string;
  initial_date: Date;
  end_date: Date;
  min_required: number;
  offerproduct_set: ProductInOffer[];
}

export interface ProductInOffer {
  product: number;
  discount: number;
}
