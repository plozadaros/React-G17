import { lazy, Suspense, useState, useEffect } from "react"
import type {EstadoCarga, Producto} from "./dominio/tipos"
import { obtenerProductos } from "./infraestructura/api"
import { Route, Routes } from "react-router-dom"
import { Home } from "./ui/pages/Home"
import Layout from "./ui/layout/Layout"
import NoEncontrada from "./ui/pages/NoEncontrada"
import Practica from "./Practica"
import RutaProtegida from "./ui/components/RutaProtegida";
import SkeletonDetalle from "./ui/components/SkeletonDetalle";

// Páginas que no todos visitan (clase 7): cada una baja en su propio archivo la primera vez que
// se entra. Home NO se parte: es la que todos ven y partirla sería descargar de más.
const Detalle = lazy(() => import('./ui/pages/Detalle'));
const Checkout = lazy(() => import('./ui/pages/Checkout'));
const Pedidos = lazy(() => import('./ui/pages/Pedidos'));
const Login = lazy(() => import('./ui/pages/Login'));

/*
  AUDITORÍA DEL ANTI-EFECTO (clase 4, ejercicio 3)

  La regla: un efecto sirve para TOCAR EL MUNDO (red, disco, título, temporizadores). Si un
  efecto solo calcula algo a partir de estado o props (useEffect(() => setTotal(...), [carrito])),
  es un anti-efecto: ese valor es un DERIVADO y se calcula en el render, sin useState ni useEffect.

  Revisé todos los useEffect de la tienda, uno por uno:
    - App               [intento]       pide los productos           → red: legítimo
    - CarritoContext    [carrito]       localStorage.setItem         → disco: legítimo
    - FavoritosContext  [ids]           localStorage.setItem         → disco: legítimo
    - SesionContext     [usuario]       /auth/me + setTimeout        → red y temporizador: legítimo
    - Layout            [carritoAbierto] guarda el panel             → disco: legítimo
    - useTitulo         [titulo]        document.title               → la pestaña: legítimo
    - CuentaRegresiva   [activa]        setInterval                  → temporizador: legítimo
  Ninguno hace setAlgo(f(otro estado)). Y los valores que parecen candidatos a estado ya son
  derivados que se calculan en el render: unidades y total (CarritoContext), la cantidad de
  favoritos, categorias y visibles (Home), el título de la pestaña, los errores del checkout
  (validar(form)) y los pedidos ordenados. No encontré anti-efectos que quitar.

  MI HIPÓTESIS: ¿qué "limpia" la limpieza de un fetch?
  La limpieza (el return del efecto) corre cuando el componente se desmonta y también antes de
  que el efecto se vuelva a ejecutar. Con un intervalo o un listener la limpieza APAGA algo. Un
  fetch no se apaga solo, así que lo que limpia es el viaje en curso: la limpieza lo CANCELA
  con controlador.abort(). Si no cancelara, una respuesta lenta llegaría con la pantalla ya
  cambiada y haría setProductos sobre un componente que ya no existe (o pisaría una respuesta
  más nueva). La prueba está en Network: StrictMode monta, desmonta y monta, así que se ve
  GET /products (canceled) y después GET /products 200. El primero no es un error: es la
  orden cumplida, por eso el catch deja pasar el AbortError sin estado de error ni respaldo.
*/
export default function App() {

  const [productos, setProductos] = useState<Producto[]>([]);
  const [estado, setEstado] = useState<EstadoCarga>('cargando');
  const [esRespaldo, setEsRespaldo] = useState(false);
  const [intento, setIntento] = useState(0);
  useEffect(() => {
    const controlador = new AbortController();
    async function cargar () {
      try {
        // El signal del controlador viaja hasta el fetch: sin él, abort() no cancelaría nada.
        const resultado = await obtenerProductos(controlador.signal);
        setProductos(resultado.productos);
        setEsRespaldo(resultado.esRespaldo);
        setEstado('listo');
      } catch (error) {
        if(error instanceof DOMException && error.name === 'AbortError') return;
        console.warn('Fallo imprevisto al cargar');
        setEstado('error');
      }
    }
    cargar();
    return () => controlador.abort();
  },[intento])

  return (
    <Routes>
      <Route element = {
        <Layout/>
      }>
        <Route path="/" element = {
          <Home esRespaldo={esRespaldo} OnReintentar={() => {setIntento(intento + 1); setEstado('cargando')}}
          productos={productos} estado={estado}/>
        }
        />
        {/* ¿SE PUEDE ANIDAR SUSPENSE? Sí. Un componente lazy "suspende" y React busca el Suspense
            MÁS CERCANO hacia arriba. Aquí hay dos niveles: el exterior vive en Layout (envuelve
            el Outlet y cubre Checkout, Pedidos y Login con un mensaje genérico) y este, propio de
            Detalle, cuyo fallback es la silueta del detalle. Gana el interior: mientras baja
            Detalle se ve su silueta y el resto de la página (header, carrito) no se mueve. */}
        <Route  path="/producto/:id" element = {
          <Suspense fallback={<SkeletonDetalle/>}>
            <Detalle productos={productos} estado={estado}/>
          </Suspense>
        }
        />
        {/* Todo lo que está dentro de esta ruta padre (sin path) exige sesión. */}
        <Route element={<RutaProtegida/>}>
          <Route  path="/checkout" element = {
            <Checkout/>
          }
          />
          <Route path="/pedidos" element = {
            <Pedidos/>
          }
          />
        </Route>
        <Route path="/login" element = {
          <Login/>
        }/>
        <Route path="/practica" element = {
            <Practica/>
          }
        />
      </Route>
      <Route path="*" element ={
          <NoEncontrada/>
      }/>
    </Routes>
  )
}
