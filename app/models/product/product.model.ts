export interface Product {
    id : string;
    descripcion : string;
    categoria : Category;
    precio : number;
    nombre : string;
    fabricante : string;
    image_src? : string;
    califacionPromedio? : number;
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
