import formatearPrecio from "../formato";

interface Props {
    precio : number;
}

const IGV = 0.18;

export default function Precio ({ precio } : Props) {
    return (
        <div className="mt-2">
            <p className="font-semibold">{formatearPrecio(precio)}</p>
            <p className="text-xs text-gray-500">{formatearPrecio(precio * (1 + IGV))} con IGV</p>
        </div>
    )
}
