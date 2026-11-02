import formatearPrecio from "../formato";
import { conIGV } from "../../dominio/precios";

interface Props {
    precio : number;
}

export default function Precio ({ precio } : Props) {
    return (
        <div className="mt-2">
            <p className="font-semibold">{formatearPrecio(precio)}</p>
            <p className="text-xs text-gray-500">{formatearPrecio(conIGV(precio))} con IGV</p>
        </div>
    )
}
