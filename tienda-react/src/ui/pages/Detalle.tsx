import { Link, useParams } from "react-router-dom";
import type { EstadoCarga, Producto } from "../../dominio/tipos";
import { conIGV } from "../../dominio/precios";
import { NOMBRE_TIENDA } from "../../infraestructura/config";
import EtiquetaStock from "../components/EtiquetaStock";
import SkeletonDetalle from "../components/SkeletonDetalle";
import formatearPrecio from "../formato";
import { useTitulo } from "../useTitulo";
import { useCart } from "../../aplicacion/useCart";

interface Props {
    productos : Producto [];
    estado : EstadoCarga;
}
export default function Detalle ( {productos, estado} : Props) {
    const {id} = useParams();
    const {agregar} = useCart();
    // useParams entrega TEXTO: '7' === 7 es falso, por eso Number(id) antes del find.
    const producto = productos.find( (p) => p.id === Number(id));
    const agotado = producto?.stock === 0;
    // El título de la pestaña lleva el nombre del producto (clase 5). Es un derivado: se arma en
    // el render y useTitulo lo publica solo cuando cambia. Los hooks van ANTES de los return.
    useTitulo(
        producto ? `${producto.nombre} - ${NOMBRE_TIENDA}`
        : estado === 'cargando' ? `Cargando... - ${NOMBRE_TIENDA}`
        : `Producto no encontrado - ${NOMBRE_TIENDA}`
    );
    // Con la API todavía en camino, "no encontrado" sería mentira: se muestra la silueta.
    if(estado === 'cargando') return <SkeletonDetalle/>;
    if(!producto) {
        return (
            <div className="p-6">
                <p className="text-gray-500">Producto no encontrado</p>
                <Link to="/">Volver al catalogo</Link>
            </div>
        )
    }
    return (
        <article className="flex flex-wrap gap-8 p-6">
            <img src={producto.imagen} alt={producto.nombre} className="w-72 rounded-xl object-contain" />
            <div className="max-w-md">
                <p className="text-xs uppercase tracking-wide text-gray-400">{producto.categoria}</p>
                <p className="text-sm text-gray-500">{producto.marca}</p>
                <h1 className="text-2xl font-bold">{producto.nombre}</h1>
                {/* el campo extra de la API (descripcion): contrato → adaptador → tarjeta → detalle */}
                {producto.descripcion && (
                    <p className="mt-2 text-sm text-gray-600">{producto.descripcion}</p>
                )}
                <p className="mt-2 text-sm">{agotado ? 'Agotado' : `${producto.stock} disponibles`}</p>
                <EtiquetaStock stock={producto.stock}></EtiquetaStock>
                <p className="mt-2 text-xl">{formatearPrecio(conIGV(producto.precio))} con IGV</p>
                <button className="mt-4 rounded-full border px-4 py-1" disabled={agotado}
                onClick={() => agregar(producto)}
                >
                    {
                        agotado ? 'Agotado' : 'Agregar al carrito'
                    }
                </button>
            </div>
        </article>
    )
}
