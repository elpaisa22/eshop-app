export interface Producto {
    id : string;
    descripcion : string;
    categoria : Categoria;
    precio : number;
    nombre : string;
    fabricante : string;
    image_src? : string;
    califacionPromedio? : number;
    comentarios : Comentario[];
}

export interface Comentario {
    nombre : string;
    comentario : string;
    calificacion? : number;
}

export interface Categoria {
    id : string;
    descripcion : string;
}
