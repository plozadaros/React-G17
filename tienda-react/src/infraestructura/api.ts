import type { Producto } from "../dominio/tipos";
import { productos as respaldo } from "./datos";
const BASE = import.meta.env.VITE_API_URL;

interface ProductoAPI {
    id : number;
    title : string;
    brand?: string;
    price : number;
    thumbnail : string;
    category?: string;
    stock?: number;
    description?: string;
}

function mapearProducto (crudo : ProductoAPI) : Producto {
    return {
        id: crudo.id ,
        nombre : crudo.title,
        marca : crudo.brand ?? '',
        precio : crudo.price,
        imagen : crudo.thumbnail,
        categoria : crudo.category ?? 'otros',
        stock : crudo.stock ?? 0,
        descripcion : crudo.description
    }
}

// `signal` viene del AbortController del efecto que llama (App.tsx): si el componente se
// desmonta o el efecto se vuelve a ejecutar, abort() cancela el viaje de verdad.
export async function obtenerProductos(signal? : AbortSignal): Promise <{ productos : Producto[] ; esRespaldo: boolean}> {
    try {
        const r = await fetch(`${BASE}/products?limit=24`, {signal});
        if(!r.ok) throw new Error (`HTTP ${r.status}`);
        const data = (await r.json()) as { products : ProductoAPI[]};
        return {
            productos : data.products.map(mapearProducto),
            esRespaldo : false
        }
    } catch (error) {
        // AbortError no es un fallo: es la orden cumplida. Se relanza el error ORIGINAL para que
        // quien llama lo reconozca y lo deje pasar (ni estado de error ni catálogo de respaldo).
        if(error instanceof DOMException && error.name === 'AbortError') throw error;
        console.warn('Api no disponible, usando el catalogo semilla.', error instanceof Error ? error.message : error);
        return {
            productos : respaldo,
            esRespaldo : true
        };
    }
}