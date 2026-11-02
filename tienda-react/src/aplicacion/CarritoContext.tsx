import { createContext, useCallback, useEffect, useReducer, type ReactNode } from "react";
import type { ItemCarrito, Producto } from "../dominio/tipos";
import { reducirCarrito } from "../dominio/carrito";

interface ValorCarrito {
    items : ItemCarrito[];
    unidades : number;
    total : number ;
    agregar: (producto : Producto) => void;
    quitar: (id : number) => void;
    vaciar: () => void;
    cambiarCantidad : (id: number, cantidad : number) => void;
}
const CLAVE_CARRITO = 'tienda_carrito';
export const CarritoContext = createContext<ValorCarrito | null>(null);

function leerCarrito() : ItemCarrito[] {
    try {
      const crudo : unknown = JSON.parse(localStorage.getItem(CLAVE_CARRITO) ?? '[]');
      return Array.isArray(crudo) ? (crudo as ItemCarrito[]) : [];
    } catch {
      return [];
    }
}

export function CarritoProvider({children} : {children : ReactNode}) {
    const [carrito, despachar] = useReducer(reducirCarrito, [], leerCarrito);
    useEffect( () => {
        try {
          localStorage.setItem(CLAVE_CARRITO, JSON.stringify(carrito));
        } catch (error) {
          console.warn('No se pudo guardar el carrito', error instanceof Error ? error.message : error);
        }
    }, [carrito]);
    const unidades = carrito.reduce((suma, i) => suma + i.cantidad, 0);
    const total = carrito.reduce((suma, i) => suma + i.precio * i.cantidad, 0);
    // Con useReducer ya no hace falta la forma funcional del experimento 2 de la clase 3:
    // el reductor recibe SIEMPRE el estado más reciente de la cola, no la foto del render. Si en
    // un mismo manejador se llama agregar(p); agregar(p), cada despacho parte del resultado del
    // anterior y el carrito sube DOS (con setCarrito(agregarItem(p, carrito)) subiría UNO).
    //
    // useCallback con []: `despachar` es estable, así que estas funciones también pueden serlo.
    // Es lo que hace que memo(ProductCard) sirva de algo: si `agregar` fuera una función nueva
    // en cada render, la prop onAgregar cambiaría siempre y memo nunca saltaría el re-render.
    const agregar = useCallback((producto : Producto) => {
        despachar({tipo: 'agregar', producto})
    }, []);
    const quitar = useCallback((id : number) => {
        despachar({tipo: 'quitar', id});
    }, []);
    const vaciar = useCallback(() => {
        despachar({tipo: 'vaciar'});
    }, []);
    const cambiarCantidad = useCallback((id : number, cantidad: number) => {
        despachar({tipo:'cambiarCantidad', id, cantidad})
    }, []);
    return(
        <CarritoContext.Provider value={{items : carrito, unidades, total, agregar, quitar,vaciar, cambiarCantidad}}>
            {children}
        </CarritoContext.Provider>
    )
}
