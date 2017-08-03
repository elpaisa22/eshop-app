export class Product {
    id : number;
    name : string;
    details : string;
    foot_desc : string;
    //category : Category;
    price : number;
    stock: number;
    sub_category : number;
    images : Image[];
    //brand : string;
    //averageRate : number;
    //comments : Comment[];
}

export interface Comment {
    name : string;
    comment : string;
    rate? : number;
}

export interface Category {
    id : string;
    description : string;
}

export interface Image {
    image : string;
}
