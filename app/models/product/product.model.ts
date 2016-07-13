export class Product {
    id : string;
    descripcion : string;
    categoria : Category;
    precio : number;
    nombre : string;
    imagen1 : string;
    imagen2 : string;
    imagen3 : string;
    fabricante : string;
    image_src : string;
    califacionPromedio : number;
    comentarios : Comment[];
}

export interface Comment {
    nombre : string;
    comentario : string;
    calificacion? : number;
}

export interface Category {
    id : string;
    descripcion : string;
}
