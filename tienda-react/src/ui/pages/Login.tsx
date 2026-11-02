import { useState, type FormEvent } from "react"
import { useSesion } from "../../aplicacion/useSesion";
import { useLocation, useNavigate } from "react-router-dom";
import { NOMBRE_TIENDA } from "../../infraestructura/config";
import { useTitulo } from "../useTitulo";

export default function Login() {
    const [usuario, setUsuario] = useState('');
    const [password, setPassword] = useState('');
    // "Recordarme": encendida, la sesión sobrevive al cierre del navegador (localStorage);
    // apagada, muere con la pestaña (sessionStorage). Quién decide eso es almacen.ts, no esta página.
    const [recordar, setRecordar] = useState(true);
    const [error, setError] = useState('');
    const [enviando, setEnviando] = useState(false);
    const {entrar} = useSesion();
    const navegar = useNavigate();
    const ubicacion = useLocation();
    const desde = (ubicacion.state as {desde? : string} | null)?.desde ?? '/';
    useTitulo(`Iniciar sesion - ${NOMBRE_TIENDA}`);

    async function manejarEnvio(e : FormEvent) {
        e.preventDefault();
        setError('');
        setEnviando(true);
        try {
            await entrar(usuario, password, recordar);
            navegar(desde, {replace: true});
        } catch (error) {
            setError(error instanceof Error ? error.message : 'No se pudo iniciar sesion.');
        } finally {
            setEnviando(false);
        }
    }
    return(
        <form onSubmit={manejarEnvio} className="mx-auto flex max-w-sm flex-col gap-3">
            <h1 className="text-2xl font-bold">Inicia Sesion</h1>
            <label className="flex flex-col text-sm">
                Usuario
                <input type="text" className="rounded border px-3 py-2" value={usuario}
                onChange={(e) => setUsuario(e.target.value)}/>
            </label>
            <label className="flex flex-col text-sm">
                Contrasenia
                <input type="password" className="rounded border px-3 py-2"
                value={password} onChange={(e) => setPassword(e.target.value)} />
            </label>
            <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={recordar} onChange={(e) => setRecordar(e.target.checked)} />
                Recordarme en este equipo
            </label>
            {error && <p className="text-sm text-red-600">{error}</p>}
            <button type="submit" className="rounded-full border px-4 py-2"
            disabled={enviando}>
                {enviando ? 'Entrando...' : 'Entrar'}
            </button>
        </form>
    )
}
