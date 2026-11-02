import type { Usuario } from "../dominio/tipos";

const CLAVE_SESION = 'tienda_sesion';
const CLAVE_CARRITO_ABIERTO = 'tienda_carrito_abierto';
const CLAVE_FAVORITOS = 'tienda_favoritos';

// Todo lo que sale del disco entra como `unknown` y pasa por una "aduana": se comprueba su forma
// antes de usarlo. El disco lo puede haber tocado otra versión de la tienda, o el propio usuario.

// ---------- Sesión ----------
function esUsuario (crudo : unknown) : crudo is Usuario {
    if(typeof crudo !== 'object' || crudo === null) return false;
    const u = crudo as Partial<Usuario>;
    return typeof u.id === 'number' && typeof u.nombre === 'string' && typeof u.email === 'string'
        && typeof u.token === 'string' && typeof u.expiraEn === 'number';
}

function leerSesionDe (almacen : Storage) : Usuario | null {
    try {
        const crudo : unknown = JSON.parse(almacen.getItem(CLAVE_SESION) ?? 'null');
        return esUsuario(crudo) ? crudo : null;
    } catch {
        return null;
    }
}

// "Recordarme": con la casilla encendida la sesión va a localStorage (sobrevive al cierre del
// navegador); apagada, a sessionStorage (muere con la pestaña). La decisión de DÓNDE se guarda
// vive solo en este archivo: SesionContext y la UI no saben cuál de los dos almacenes se usó.
export function leerSesion() : Usuario | null {
    try {
        return leerSesionDe(sessionStorage) ?? leerSesionDe(localStorage);
    } catch {
        return null;
    }
}

export function guardarSesion(usuario : Usuario, recordar = true) {
    try {
        const destino = recordar ? localStorage : sessionStorage;
        const otro = recordar ? sessionStorage : localStorage;
        otro.removeItem(CLAVE_SESION); // nunca la misma sesión en los dos almacenes a la vez
        destino.setItem(CLAVE_SESION, JSON.stringify(usuario));
    } catch {
        console.warn('No se pudo guardar la sesion');
    }
}

export function borrarSesion () {
    try {
        localStorage.removeItem(CLAVE_SESION);
        sessionStorage.removeItem(CLAVE_SESION);
    } catch {
        console.warn('No se pudo borrar la sesion');
    }
}

// ---------- Panel del carrito (abierto / cerrado) ----------
export function leerCarritoAbierto () : boolean {
    try {
        const crudo : unknown = JSON.parse(localStorage.getItem(CLAVE_CARRITO_ABIERTO) ?? 'false');
        return typeof crudo === 'boolean' ? crudo : false;
    } catch {
        return false;
    }
}

export function guardarCarritoAbierto (abierto : boolean) {
    try {
        localStorage.setItem(CLAVE_CARRITO_ABIERTO, JSON.stringify(abierto));
    } catch {
        console.warn('No se pudo guardar el estado del panel del carrito');
    }
}

// ---------- Favoritos (ids de producto) ----------
export function leerFavoritos () : number[] {
    try {
        const crudo : unknown = JSON.parse(localStorage.getItem(CLAVE_FAVORITOS) ?? '[]');
        return Array.isArray(crudo) ? crudo.filter((id) : id is number => typeof id === 'number') : [];
    } catch {
        return [];
    }
}

export function guardarFavoritos (ids : number[]) {
    try {
        localStorage.setItem(CLAVE_FAVORITOS, JSON.stringify(ids));
    } catch {
        console.warn('No se pudieron guardar los favoritos');
    }
}
