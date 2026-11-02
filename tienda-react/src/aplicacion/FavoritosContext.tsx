import { createContext, useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import { alternarFavorito } from "../dominio/favoritos";
import { guardarFavoritos, leerFavoritos } from "../infraestructura/almacen";

interface ValorFavoritos {
    ids : number[];
    cantidad : number;
    esFavorito : (id : number) => boolean;
    alternar : (id : number) => void;
}

// Calcado del carrito: createContext a nivel de módulo, un Provider que guarda el estado y
// persiste con [ids], y un hook propio (useFavoritos) que comprueba que el Provider exista.
export const FavoritosContext = createContext<ValorFavoritos | null>(null);

export function FavoritosProvider({children} : {children : ReactNode}) {
    const [ids, setIds] = useState<number[]>(leerFavoritos);
    useEffect(() => {
        guardarFavoritos(ids);
    }, [ids]);
    // Forma funcional: dos clics seguidos parten del resultado del anterior, no de la foto del render.
    // Sin dependencias: setIds es estable y la regla vive en dominio/favoritos.ts.
    const alternar = useCallback((id : number) => {
        setIds((previo) => alternarFavorito(previo, id));
    }, []);
    // `cantidad` es un derivado: se calcula del array, no es otro estado que sincronizar.
    const valor = useMemo<ValorFavoritos>(() => ({
        ids,
        cantidad : ids.length,
        esFavorito : (id) => ids.includes(id),
        alternar
    }), [ids, alternar]);
    return (
        <FavoritosContext.Provider value={valor}>
            {children}
        </FavoritosContext.Provider>
    )
}
