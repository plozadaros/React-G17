// Pura e inmutable, igual que carrito.ts: devuelve un array nuevo y no toca el que recibe.
// Ni React, ni red, ni disco: eso vive en aplicacion/ e infraestructura/.
export function alternarFavorito (ids : number[], id : number) : number[] {
    return ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id];
}
