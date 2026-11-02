import { useState } from "react";
import { Link } from "react-router-dom";
import { leerPedidos } from "../../infraestructura/pedidos";
import { NOMBRE_TIENDA } from "../../infraestructura/config";
import formatearPrecio, { formatearFecha } from "../formato";
import { useTitulo } from "../useTitulo";

// Mis pedidos (clase 5 y 6). La página vive en ui/pages y NO toca localStorage: pide los pedidos
// a leerPedidos() de infraestructura, que ya los entrega con la aduana pasada (solo entra lo que
// tiene la forma de un Pedido). La ruta está dentro de <RutaProtegida/> en App.tsx.
export default function Pedidos () {
    // Se lee una vez al montar (inicializador perezoso). Los pedidos nuevos nacen en /checkout,
    // otra página: al volver aquí el componente se monta de nuevo y vuelve a leer.
    const [pedidos] = useState(leerPedidos);
    useTitulo(`Mis pedidos - ${NOMBRE_TIENDA}`);
    // Derivado: una COPIA ordenada, el más reciente primero. sort() muta, así que nunca sobre el estado.
    const recientes = [...pedidos].sort((a, b) => b.id - a.id);

    return (
        <section className="max-w-2xl">
            <h1 className="mb-4 text-2xl font-bold">Mis pedidos</h1>
            {recientes.length === 0 ? (
                <div className="rounded-xl border p-6">
                    <p className="text-gray-500">Aun no tienes pedidos: cuando confirmes uno en el checkout aparecera aqui.</p>
                    <Link to="/" className="underline">Ir al catalogo</Link>
                </div>
            ) : (
                <ul className="flex flex-col gap-4">
                    {recientes.map((pedido) => (
                        <li key={pedido.id}>
                            <article className="rounded-xl border p-4">
                                <header className="flex flex-wrap items-baseline justify-between gap-2">
                                    <h2 className="font-semibold">Pedido Nro. {pedido.id}</h2>
                                    <time dateTime={pedido.fecha} className="text-sm text-gray-500">
                                        {formatearFecha(pedido.fecha)}
                                    </time>
                                </header>
                                <ul className="mt-2 text-sm">
                                    {pedido.items.map((item) => (
                                        <li key={item.id} className="flex justify-between gap-3 py-0.5">
                                            <span>{item.nombre} x {item.cantidad}</span>
                                            <span>{formatearPrecio(item.precio * item.cantidad)}</span>
                                        </li>
                                    ))}
                                </ul>
                                <p className="mt-2 text-right text-sm">Total: <b>{formatearPrecio(pedido.total)}</b></p>
                            </article>
                        </li>
                    ))}
                </ul>
            )}
        </section>
    )
}
