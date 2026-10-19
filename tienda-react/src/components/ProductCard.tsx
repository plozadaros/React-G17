import type { Producto } from "../tipos";
import Precio from "./Precio";

interface Props {
  producto : Producto;
}

export default function ProductCard({ producto } : Props) {
  return (
    <article className="w-64 rounded-xl border p-4">
        <img src={producto.imagen} alt={producto.nombre} className="mb-3 aspect-square object-contain" />
        <p className="text-xs uppercase tracking-wide text-gray-400">{producto.categoria}</p>
        <p className="text-sm text-gray-500">{producto.marca}</p>
        <h2 className="font-semibold">{producto.nombre}</h2>
        {producto.descripcion && (
            <p className="mt-1 line-clamp-2 text-xs text-gray-500">{producto.descripcion}</p>
        )}
        <p className="mt-2 text-sm">{
            producto.stock === 0 ? 'Agotado' : `${producto.stock} disponibles`
        }</p>
        {/* con números, el && lleva una comparación explícita: con stock = 0 pintaría un 0 suelto */}
        {producto.stock > 0 && producto.stock <= 5 && (
            <p className="text-sm font-semibold text-red-600">¡Últimas unidades!</p>
        )}
        <Precio precio={producto.precio} />
    </article>
  )
}
