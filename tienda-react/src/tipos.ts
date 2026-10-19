export interface Producto {
    id : number;
    nombre : string;
    marca: string;
    categoria : string;
    precio : number;
    imagen : string;
    stock : number;
    descripcion? : string;
}

export type EstadoCarga = 'cargando' | 'listo' | 'error';
