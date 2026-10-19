interface Props {
    titulo : string;
    detalle? : string;
}

export default function Beneficio ({ titulo, detalle = "Consulta las condiciones en tienda" } : Props) {
    return (
        <article className="rounded-xl border p-4">
            <h3 className="font-semibold">{titulo}</h3>
            <p className="text-sm text-gray-500">{detalle}</p>
        </article>
    )
}
