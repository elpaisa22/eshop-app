export class Product {
    id : number;
    descripcion : string;
    detalles : Blob;
    pie : string;
    categoria : Category;
    precio : number;
    nombre : string;
    imagen1 : string;
    imagen2 : string;
    imagenDetalle1 : string;
    imagenDetalle2 : string;
    imagenDetalle3 : string;
    fabricante : string;
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
