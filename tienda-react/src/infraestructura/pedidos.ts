import type { Pedido } from "../dominio/tipos";
const CLAVE_PEDIDOS = 'tienda_pedidos';

// Aduana de un pedido leído del disco: solo pasa lo que tiene la forma que la página necesita.
function esPedido (crudo : unknown) : crudo is Pedido {
    if(typeof crudo !== 'object' || crudo === null) return false;
    const p = crudo as Partial<Pedido>;
    return typeof p.id === 'number' && typeof p.fecha === 'string' && typeof p.total === 'number'
        && Array.isArray(p.items)
        && p.items.every((i) => typeof i === 'object' && i !== null
            && typeof i.id === 'number' && typeof i.nombre === 'string' && typeof i.precio === 'number' && typeof i.cantidad === 'number');
}

export function leerPedidos () : Pedido[] {
    try {
        const crudo : unknown = JSON.parse(localStorage.getItem(CLAVE_PEDIDOS) ?? '[]');
        return Array.isArray(crudo) ? crudo.filter(esPedido) : [];
    } catch {
        return [];
    }
}

export function guardarPedido(pedido : Pedido) {
    try {
        localStorage.setItem(CLAVE_PEDIDOS, JSON.stringify([...leerPedidos(), pedido]));
    } catch (error) {
        console.warn('No se pudo guardar el pedido', error instanceof Error ? error.message : error)
    }
}
