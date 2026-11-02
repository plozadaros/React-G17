import { memo, useState } from "react";
import type { Producto } from "../../dominio/tipos";
import EtiquetaStock from "./EtiquetaStock";
import Precio from "./Precio";

interface Props {
  producto : Producto;
  onAgregar : (producto : Producto) => void;
}

function ProductCard({ producto, onAgregar } : Props) {
  const agotado = producto.stock === 0;
  // El favorito vive DENTRO de la tarjeta: cada instancia de ProductCard tiene su propio estado
  // (experimento 3 de la clase 3), así que marcar una no marca las demás.
  const [favorito, setFavorito] = useState(false);
  return (
    <article className={`relative w-64 rounded-xl border p-4 ${agotado ? 'opacity-50' : ''}`}>
        <button
          className="absolute right-3 top-3 text-xl leading-none"
          onClick={() => setFavorito(!favorito)}
          aria-pressed={favorito}
          aria-label={favorito ? `Quitar ${producto.nombre} de favoritos` : `Marcar ${producto.nombre} como favorito`}
        >
          {favorito ? '♥' : '♡'}
        </button>
        <img src={producto.imagen} alt={producto.nombre} className="mb-3 aspect-square object-contain" />
        <p className="text-xs uppercase tracking-wide text-gray-400">{producto.categoria}</p>
        <p className="text-sm text-gray-500">{producto.marca}</p>
        <h2 className="font-semibold">{producto.nombre}</h2>
        {producto.descripcion && (
            <p className="mt-1 line-clamp-2 text-xs text-gray-500">{producto.descripcion}</p>
        )}
        <p className="mt-2 text-sm">{
            agotado ? 'Agotado' : `${producto.stock} disponibles`
        }</p>
        <EtiquetaStock stock={producto.stock}/>
        <Precio precio={producto.precio} />
        <button className="mt-3 rounded-full border px-4 text-sm" disabled={agotado}
        onClick={() => onAgregar(producto)}
        >
          {agotado ? 'Agotado' : 'Agregar al carrito'}
        </button>
    </article>
  )
}

export default memo(ProductCard);
