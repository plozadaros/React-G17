import { Link } from "react-router-dom";
import { NOMBRE_TIENDA } from "../../infraestructura/config";
import { useTitulo } from "../useTitulo";

export default function NoEncontrada () {
    useTitulo(`404 - ${NOMBRE_TIENDA}`);
    return(
        <div className="p-6 text-center">
            <h1 className="text-3xl font-bold">404</h1>
            <p className="mt-2 text-gray-500">Esta pagina no existe en la tienda.</p>
            <Link to="/" className="underline">Volver al catalogo</Link>
        </div>
    )
}
