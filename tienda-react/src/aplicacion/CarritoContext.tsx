import { createContext, useEffect, useState, type ReactNode } from "react";
import type { ItemCarrito, Producto } from "../dominio/tipos";
import { agregarItem, cambiarCantidad, quitarItem } from "../dominio/carrito";

interface ValorCarrito {
    items : ItemCarrito[];
    unidades : number;
    total : number ;
    agregar: (producto : Producto) => void;
    quitar: (id : number) => void;
    cambiar: (id : number, cantidad : number) => void;
    vaciar: () => void;
}
const CLAVE_CARRITO = 'tienda_carrito';
export const CarritoContext = createContext<ValorCarrito | null>(null);

function leerCarrito() : ItemCarrito[] {
    try {
      const crudo : unknown = JSON.parse(localStorage.getItem(CLAVE_CARRITO) ?? '[]');
      return Array.isArray(crudo) ? (crudo as ItemCarrito[]) : [];
    } catch (error) {
      return [];
    }
}

export function CarritoProvider({children} : {children : ReactNode}) {
    const [carrito, setCarrito] = useState<ItemCarrito[]>(leerCarrito);
    useEffect( () => {
        try {
          localStorage.setItem(CLAVE_CARRITO, JSON.stringify(carrito));
        } catch (error) {
          console.warn('No se pudo guardar el carrito', error instanceof Error ? error.message : error);
        }
    }, [carrito]);
    const unidades = carrito.reduce((suma, i) => suma + i.cantidad, 0);
    const total = carrito.reduce((suma, i) => suma + i.precio * i.cantidad, 0);
    // Forma funcional (experimento 2 de la clase 3): sí la necesita agregar, y por coherencia
    // también quitar y cambiar. setCarrito(agregarItem(producto, carrito)) calcula sobre `carrito`,
    // la foto del render donde nació el manejador. Si en ese mismo manejador se llama dos veces
    // (agregar(p); agregar(p)), las dos leen la misma foto y el carrito sube UNO, no dos.
    // setCarrito((previo) => ...) en cambio recibe el valor más reciente que React tiene en cola,
    // así que cada llamada parte del resultado de la anterior. Cuesta lo mismo y no falla nunca.
    // vaciar() no la necesita: setCarrito([]) no depende del valor anterior.
    function agregar(producto : Producto) {
        setCarrito((previo) => agregarItem(producto, previo));
    }
    function quitar(id : number) {
        setCarrito((previo) => quitarItem(previo, id));
    }
    function cambiar(id : number, cantidad : number) {
        setCarrito((previo) => cambiarCantidad(previo, id, cantidad));
    }
    function vaciar() {
        setCarrito([]);
    }

    return(
        <CarritoContext.Provider value={{items : carrito, unidades, total, agregar, quitar, cambiar, vaciar}}>
            {children}
        </CarritoContext.Provider>
    )
}


