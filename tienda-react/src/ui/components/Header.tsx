import { Link, NavLink } from "react-router-dom";
import formatearPrecio from "../formato";
import { useCart } from "../../aplicacion/useCart";
import { useSesion } from "../../aplicacion/useSesion";
import { useFavoritos } from "../../aplicacion/useFavoritos";
interface Props {
    nombre : string;
    eslogan?: string;
}

const claseEnlace = ({isActive} : {isActive : boolean}) => (isActive ? 'font-bold underline' : 'hover:underline');

export default function Header ( {nombre , eslogan = "Tecnología para todos"} : Props) {
    const {unidades, total} = useCart();
    const {cantidad : favoritos} = useFavoritos();
    const  {usuario, salir} = useSesion();
    return(
        <header className="mb-6 flex items-center justify-between">
            <div>
                <h1 className="text-3xl font-bold">{nombre}</h1>
                <p className="text-sm text-gray-500">{eslogan}</p>
                <nav className="mt-2 flex gap-4">
                    <NavLink to="/" className={claseEnlace}>Catalogo</NavLink>
                    <NavLink to="/checkout" className={claseEnlace}>Checkout</NavLink>
                    {/* "Mis pedidos" solo se ofrece con sesión: la ruta además está protegida en App */}
                    {usuario && <NavLink to="/pedidos" className={claseEnlace}>Mis pedidos</NavLink>}
                    <NavLink to="/practica" className={claseEnlace}>Práctica</NavLink>
                </nav>
            </div>
            <div className="text-right">
                <p>{unidades} productos - {formatearPrecio(total)}</p>
                <p className="text-sm" aria-label={`${favoritos} favoritos`}>♥ {favoritos}</p>
            </div>
            {
                usuario ? (
                    <p className="text-sm">Hola, {usuario.nombre}
                        <button className="ml-2 underline" onClick={salir}>Salir</button>
                    </p>
                ) : (
                    <Link to="/login" className="text-sm underline">Inicie Sesion</Link>
                )
            }
        </header>
    )
}
