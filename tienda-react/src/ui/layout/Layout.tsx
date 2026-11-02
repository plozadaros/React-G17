import { Suspense, useEffect, useState } from "react";
import Header from "../components/Header";
import PanelCarrito from "../components/PanelCarrito";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
import { NOMBRE_TIENDA } from "../../infraestructura/config";
import { guardarCarritoAbierto, leerCarritoAbierto } from "../../infraestructura/almacen";


export default function Layout () {
    // Clase 4, ejercicio 1: el panel recuerda si estaba abierto después del F5. Se lee UNA vez al
    // arrancar (inicializador perezoso, con su aduana typeof boolean dentro de almacen.ts) y se
    // guarda con [carritoAbierto]: cada cambio toca el disco. El layout no toca localStorage.
    const [carritoAbierto, setCarritoAbierto] = useState(leerCarritoAbierto);
    useEffect(() => {
        guardarCarritoAbierto(carritoAbierto);
    }, [carritoAbierto]);
    return (
        <main className="mx-auto max-w-5xl p-6">
            <Header nombre={NOMBRE_TIENDA} eslogan="Una Vida Tecnológica"/>
            <button className="mb-4 text-sm"
            onClick={() => setCarritoAbierto(!carritoAbierto)}>
                {carritoAbierto ? 'Ocultar carrito' : 'Ver carrito'}
            </button>
            {carritoAbierto && (<PanelCarrito/>)}
            {/* Suspense EXTERIOR: atrapa las páginas lazy (Checkout, Pedidos, Login) mientras baja su
                archivo. Detalle tiene el suyo propio, más cerca (ver App.tsx): gana el más cercano. */}
            <Suspense fallback={<p className="p-6 text-gray-500" role="status">Cargando la pagina...</p>}>
                <Outlet/>
            </Suspense>
            <Footer/>
        </main>
    )
}
