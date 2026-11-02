// Silueta FIEL de ProductCard: un bloque gris por cada bloque de la tarjeta real, en el mismo
// orden y con tamaños parecidos (corazón, imagen, categoría, marca, nombre, descripción de dos
// líneas, stock, precio con su línea de IGV y el botón). Así, cuando llegan los datos la página
// no "salta". motion-reduce:animate-none respeta a quien pidió menos movimiento en su sistema.
export default function SkeletonCard() {
    return (
        <div className="relative w-64 animate-pulse rounded-xl border p-4 motion-reduce:animate-none" aria-hidden="true">
            <div className="absolute right-3 top-3 h-5 w-5 rounded-full bg-gray-200"/>
            <div className="mb-3 aspect-square rounded bg-gray-200"/>
            <div className="mb-1 h-3 w-1/4 rounded bg-gray-200"/>
            <div className="mb-1 h-4 w-1/3 rounded bg-gray-200"/>
            <div className="mb-2 h-5 w-3/4 rounded bg-gray-200"/>
            <div className="mb-1 h-3 w-full rounded bg-gray-200"/>
            <div className="mb-2 h-3 w-2/3 rounded bg-gray-200"/>
            <div className="mt-2 h-4 w-1/3 rounded bg-gray-200"/>
            <div className="mt-2 h-5 w-1/2 rounded bg-gray-200"/>
            <div className="mt-1 h-3 w-2/5 rounded bg-gray-200"/>
            <div className="mt-3 h-8 w-36 rounded-full bg-gray-200"/>
        </div>
    )
}
