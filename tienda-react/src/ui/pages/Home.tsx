import { useEffect, useState } from "react";
import { NOMBRE_TIENDA, type EstadoCarga, type Producto } from "../../dominio/tipos";
import Beneficio from "../components/Beneficio";
import SkeletonCard from "../components/SkeletonCard";
import ProductCard from "../components/ProductCard";
import { useCart } from "../../aplicacion/useCart";

interface Props {
    esRespaldo : boolean ;
    OnReintentar : () => void;
    productos : Producto[];
    estado : EstadoCarga;
}

/*
  ¿POR QUÉ EL ÍNDICE MIENTE COMO key? (lectura de "Renderizar listas", es.react.dev)

  React usa la key para saber "quién es quién" entre un repintado y el siguiente. Si en la
  lista nueva aparece una key que ya estaba en la anterior, React entiende que es el MISMO
  elemento: conserva su nodo del DOM y su estado, y solo actualiza lo que cambió. Si la key
  es nueva, crea un elemento; si una key desapareció, lo destruye.

  Con key={p.id} la identidad viaja con el dato: la Laptop es siempre la key 2, esté en la
  primera posición o en la quinta. Con key={indice} la key es la POSICIÓN, y la posición no
  dice quién es el producto sino dónde está parado, y ese lugar cambia en cuanto la lista
  cambia.

  Ejemplo con ESTA tienda, que ya filtra por categoría y por búsqueda: la lista completa empieza
  con [Audífonos, Laptop, Reloj, ...] y con el índice las keys serían 0, 1, 2... Si filtro por
  "relojes", el primer elemento de la lista pasa a ser un Reloj, que recibe la key 0: la misma que
  tenían los Audífonos. React ve "el elemento 0 sigue existiendo", no lo recrea, reutiliza la
  tarjeta que ya estaba y solo le cambia las props. Y las keys 2, 3, 4... que ya no aparecen se
  destruyen, aunque ahí hubiera tarjetas de productos que SÍ siguen en la lista. Lo mismo pasa al
  reordenar (por precio, por ejemplo): todas las keys siguen ahí, solo cambian de dueño, así que
  React no mueve las tarjetas, les reescribe el contenido a todas.

  Mientras la tarjeta no tiene memoria casi no se nota (solo trabajo de más). El problema llega
  cuando tiene estado, y ProductCard ya lo tiene: el corazón de favorito (useState dentro de la
  tarjeta). Ese estado se queda pegado a la POSICIÓN y no al producto: marco el corazón de los
  Audífonos, filtro por "relojes", y el corazón aparece marcado en el Reloj. Lo mismo con un input
  o el foco. Lo peor es que no hay error ni advertencia; la pantalla simplemente miente.

  Por eso la regla: la key es el id del dato (estable y único, nace con el dato, no se inventa al
  pintar ni con Math.random). El índice solo sería aceptable en una lista que nunca se filtra, se
  reordena, ni se le inserta o borra nada. Y si no pongo key, React avisa en la consola ("Each
  child in a list should have a unique key" prop) y usa el índice por defecto, o sea, el mismo
  problema pero sin darme cuenta.

  (Los Skeleton de más abajo SÍ usan el índice como key, y está bien: son 8 piezas iguales, sin
  datos ni estado, que nunca se filtran ni se reordenan.)
*/
export function Home ( {esRespaldo, OnReintentar, productos, estado} : Props) {
    const {agregar} = useCart();

    const categorias = ['todas', ...new Set(productos.map(p => p.categoria))];
    const [categoriaActiva, setCategoriaActiva] = useState<string>('todas');
    const [termino, setTermino] = useState('');
    const busqueda = termino.trim().toLowerCase();  
    const visibles = productos.filter( (p) => (
        (categoriaActiva === 'todas' || p.categoria === categoriaActiva) && 
        (busqueda === '' || p.nombre.toLowerCase().includes(busqueda) || 
        p.marca.toLowerCase().includes(busqueda))
    ));
    useEffect(() => {
        document.title = `${NOMBRE_TIENDA} - ${visibles.length} resultados`;
    },[visibles.length]);

    return (
        <>
            <section className="mb-6" aria-label="Beneficios">
                <h2 className="mb-3 text-xl font-semibold">Beneficios de tu tienda</h2>
                <div className="grid gap-4 sm:grid-cols-3">
                    <Beneficio titulo="Envío gratis" detalle="Delivery a todo Lima y provincias" />
                    <Beneficio titulo="Cuotas sin interés" detalle="Hasta 12 cuotas con tu tarjeta" />
                    <Beneficio titulo="Garantía" />
                </div>
            </section>
            {
                esRespaldo && (
                    <p className="mb-4 rounded-lg border border-orange-300 bg-orange-500 p-2 text-sm">
                        Mostrando el catalogo Local, no pudimos conectar con la tienda.
                        {/* () => {setIntento(intento + 1); setEstado('cargando')} OnReintentar*/} 
                    <button className="ml-2 underline" onClick={OnReintentar}>Reintentar</button>
                    </p>
                )
            }
            <nav className="mb-4 flex gap-2" aria-label="Filtrar por categoria">
                {
                categorias.map((c) => (
                    <button key={c} onClick={() => setCategoriaActiva(c)} 
                    className={`rounded-full border px-3 py-1 text-sm ${ c === categoriaActiva ? 'bg-black text-white' : ''}`}>{c}
                    </button>
                ))
                }
            </nav>
            <input type="search" placeholder="Buscar por nombre o marca..." 
                className="mb-4 w-64 rounded-lg border px-3 py-2 text-sm"
                value={termino} aria-label="Buscar productos"
                onChange={(e) => setTermino(e.target.value)}
            />
            {estado === 'cargando' && (
                <section className="flex flex-wrap gap-4">
                    {Array.from({length : 8}).map((_, indice) => (
                        <SkeletonCard key={indice}/>
                    ))}
                </section>
            )}
            {estado === 'error' && <p className="text-red-600">No pudimos cargar los productos</p>}
            <p className="mb-4 text-sm text-gray-500">{visibles.length} productos</p>
            {estado === 'listo' && visibles.length === 0 && (
                <p className="text-gray-500">{
                    busqueda !== '' ? `No encontramos productos para "${termino.trim()}"` : 'No hay productos en esta categoria'
                }</p>
            )}
            {estado === 'listo' && (
                <section className="flex flex-wrap gap-6">
                {
                    visibles.map((p) => <ProductCard producto={p} key={p.id} onAgregar={agregar}/>)
                }
                </section>
                )
            }
        </>
    )
}