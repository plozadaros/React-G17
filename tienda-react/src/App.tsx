import Beneficio from "./components/Beneficio"
import Footer from "./components/Footer"
import Header from "./components/Header"
import ProductCard from "./components/ProductCard"
import { productos } from "./datos"
import Practica from "./Practica"
import type { EstadoCarga } from "./tipos"

// Hoy el estado se cambia a mano ('cargando' | 'listo' | 'error') y la pantalla obedece.
// Que cambie solo necesita useState (clase 4) y datos reales (clase 7).
const estado: EstadoCarga = 'listo'

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

  Ejemplo con esta tienda: hoy la lista es [Audífonos, Laptop, Reloj, ...] y con el índice las
  keys serían 0, 1, 2... Si en la clase 5 filtro por "Relojes", el primer elemento de la lista
  pasa a ser un Reloj, que recibe la key 0: la misma que tenían los Audífonos. React ve "el
  elemento 0 sigue existiendo", no lo recrea, reutiliza la tarjeta que ya estaba y solo le
  cambia las props. Y las keys 2, 3, 4... que ya no aparecen se destruyen, aunque ahí hubiera
  tarjetas de productos que SÍ siguen en la lista. Lo mismo pasa al reordenar (por precio, por
  ejemplo): todas las keys siguen ahí, solo cambian de dueño, así que React no mueve las
  tarjetas, les reescribe el contenido a todas.

  Mientras la tarjeta no tiene memoria casi no se nota (solo trabajo de más). El problema
  llega cuando tenga estado: un contador de cantidad, un checkbox, un input, el foco. Ese
  estado se queda pegado a la POSICIÓN y no al producto: pongo 3 unidades en los Audífonos,
  filtro, y las 3 unidades aparecen en el Reloj. Lo peor es que no hay error ni advertencia;
  la pantalla simplemente miente.

  Por eso la regla: la key es el id del dato (estable y único, nace con el dato, no se
  inventa al pintar ni con Math.random). El índice solo sería aceptable en una lista que
  nunca se filtra, se reordena, ni se le inserta o borra nada. Y si no pongo key, React
  avisa en la consola ("Each child in a list should have a unique key" prop) y usa el
  índice por defecto, o sea, el mismo problema pero sin darme cuenta.
*/
export default function App() {
  return (
    <main className="mx-auto max-w-5xl p-6">
      <Header nombre="TecCart" eslogan="Una Vida Tecnológica"/>

      <section id="beneficios" className="mb-8">
        <h2 className="mb-3 text-xl font-semibold">Beneficios de tu tienda</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <Beneficio titulo="Envío gratis" detalle="Delivery a todo Lima y provincias" />
          <Beneficio titulo="Cuotas sin interés" detalle="Hasta 12 cuotas con tu tarjeta" />
          <Beneficio titulo="Garantía" />
        </div>
      </section>

      <section id="catalogo">
        <h2 className="mb-3 text-xl font-semibold">Catálogo</h2>
        {estado === 'cargando' && <p>Cargando catálogo...</p>}
        {estado === 'error' && <p>No pudimos cargar los productos</p>}
        {estado === 'listo' && (
          <div className="flex flex-wrap gap-6">
            {productos.map((p) => <ProductCard producto={p} key={p.id}/>)}
          </div>
        )}
      </section>

      <section id="practica" className="mt-8">
        <h2 className="mb-3 text-xl font-semibold">Práctica: useState</h2>
        <Practica />
      </section>

      <Footer/>
    </main>
  )
}
