import {SubCategory} from '../category/section.model';

export class Product {
    id : number;
    name : string;
    details : string;
    foot_desc : string;
    price : number;
    stock: number;
    sub_category : SubCategory;
    images : Image[];
    brand : string;
    //averageRate : number;
    //comments : Comment[];
}

export interface Comment {
    name : string;
    comment : string;
    rate? : number;
}


export interface Image {
    image : string;
}
