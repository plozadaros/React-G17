import { NOMBRE_TIENDA } from "../../infraestructura/config";

const ANIO = new Date().getFullYear();

export default function Footer () {
    return (
        <footer className="mt-8 border-t pt-4 text-sm text-gray-500">
            © {ANIO} {NOMBRE_TIENDA}
        </footer>
    )
}
