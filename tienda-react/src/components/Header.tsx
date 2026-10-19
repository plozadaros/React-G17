
interface Props {
    nombre : string;
    eslogan?: string;
}
export default function Header ( {nombre , eslogan = "Tecnología para todos"} : Props) {
    return(
        <header className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div>
                <h1 className="text-3xl font-bold">{nombre}</h1>
                <p className="text-sm text-gray-500">{eslogan}</p>
            </div>
            <nav className="flex gap-4 text-sm">
                <a href="#beneficios" className="hover:underline">Beneficios</a>
                <a href="#catalogo" className="hover:underline">Catálogo</a>
                <a href="#practica" className="hover:underline">Práctica</a>
            </nav>
            <p>🛒 0 productos</p>
        </header>
    )
}
