import { useCart } from "../../aplicacion/useCart";

export default function PanelCarrito () {
    const {items, quitar, vaciar, cambiarCantidad} = useCart();
    return (
        <section className="mb-6 rounded-xl border p-4">
            <h2 className="font-semibold">Tu carrito</h2>
            {items.length === 0 && <p className="text-sm text-gray-500">Tu carrito esta vacio</p>}
            <ul>
                {
                items.map((item) => (
                    <li key={item.id} className="flex items-center justify-between gap-3 py-1 text-sm">
                        <span>{item.nombre}</span>
                        <span className="flex items-center gap-2">
                            {/* con cantidad 0, cambiarCantidadItem quita la fila */}
                            <button className="rounded border px-2" onClick={() => cambiarCantidad(item.id, item.cantidad - 1)}
                            aria-label={`Quitar una unidad de ${item.nombre}`}>-</button>
                            <span aria-label={`Cantidad de ${item.nombre}`}>{item.cantidad}</span>
                            <button className="rounded border px-2" onClick={() => cambiarCantidad(item.id, item.cantidad + 1)}
                            aria-label={`Agregar una unidad de ${item.nombre}`}>+</button>
                            {/* () => despachar({tipo: 'quitar', id}) */}
                            <button onClick={() => quitar(item.id)} aria-label={`Quitar ${item.nombre} del carrito`}>X</button>
                        </span>
                    </li>
                    ))
                  }
                </ul>
                {
                  items.length > 0 && (
                    // despachar({tipo: 'vaciar'})
                    <button className="mt-2 text-sm underline" onClick={vaciar}>Vaciar carrito</button>
                  )
                }
        </section>
    )
}
