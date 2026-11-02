// Silueta de la página de detalle: la imagen grande a la izquierda y, a la derecha, categoría,
// marca, nombre, descripción, stock, precio y botón. Se usa en dos sitios: como fallback del
// Suspense propio de la ruta /producto/:id (mientras baja el archivo del Detalle) y dentro de
// Detalle mientras la API todavía no devolvió los productos.
export default function SkeletonDetalle() {
    return (
        <div className="flex animate-pulse flex-wrap gap-8 p-6 motion-reduce:animate-none" role="status">
            <span className="sr-only">Cargando el producto...</span>
            <div className="aspect-square w-72 rounded-xl bg-gray-200" aria-hidden="true"/>
            <div className="w-72 max-w-full" aria-hidden="true">
                <div className="mb-2 h-3 w-1/4 rounded bg-gray-200"/>
                <div className="mb-2 h-4 w-1/3 rounded bg-gray-200"/>
                <div className="mb-3 h-8 w-3/4 rounded bg-gray-200"/>
                <div className="mb-1 h-3 w-full rounded bg-gray-200"/>
                <div className="mb-1 h-3 w-full rounded bg-gray-200"/>
                <div className="mb-3 h-3 w-2/3 rounded bg-gray-200"/>
                <div className="mt-2 h-4 w-1/3 rounded bg-gray-200"/>
                <div className="mt-3 h-7 w-1/2 rounded bg-gray-200"/>
                <div className="mt-4 h-8 w-40 rounded-full bg-gray-200"/>
            </div>
        </div>
    )
}
