import { useEffect } from "react";

// Pone el título de la pestaña. Tocar document.title es un efecto colateral (toca el mundo, no
// calcula): por eso vive en un useEffect y no en el render. La dependencia es el propio texto:
// el título se arma en el componente (derivado de lo que ya sabe) y el efecto solo lo publica
// cuando CAMBIA. Si la dependencia fuera `visibles.length` y el título usara también la
// categoría, el efecto quedaría congelado con la categoría vieja: dependencias honestas.
export function useTitulo (titulo : string) {
    useEffect(() => {
        document.title = titulo;
    }, [titulo]);
}
