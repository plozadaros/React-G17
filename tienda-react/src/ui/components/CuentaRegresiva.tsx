import { useEffect, useState } from "react";

const SEGUNDOS_INICIALES = 60;

// Extra del laboratorio de la clase 4: la cuenta regresiva. Arranca en 60, se detiene sola en 0
// y tiene Pausar / Reanudar y Reiniciar. Es el cronómetro de los "4 actos", al revés:
//   1 · se congela en 59   → la forma funcional `(s) => s - 1` es obligatoria: el intervalo vive
//                            en la primera foto del render y `segundos - 1` siempre vería 60.
//   2 · baja de 2 en 2     → StrictMode monta dos veces: sin clearInterval en la limpieza habría
//                            dos intervalos vivos.
//   3 · ocultar = desmontar → la limpieza corre y, al volver, empieza otra vez en 60.
//   4 · pausar y reanudar  → la limpieza corre también antes de cada re-ejecución del efecto.
export default function CuentaRegresiva() {
    const [segundos, setSegundos] = useState(SEGUNDOS_INICIALES);
    const [corriendo, setCorriendo] = useState(true);
    // Derivado, no estado: aunque `corriendo` siga en true, con 0 segundos la cuenta ya no corre.
    // Así el intervalo se apaga solo (la limpieza lo cancela) sin un efecto extra que haga setCorriendo.
    const activa = corriendo && segundos > 0;

    useEffect(() => {
        if(!activa) return;
        const id = setInterval(() => setSegundos((s) => s - 1), 1000);
        return () => clearInterval(id);
    }, [activa]);

    function reiniciar() {
        setSegundos(SEGUNDOS_INICIALES);
        setCorriendo(true);
    }

    return (
        <section className="mt-6 rounded-xl border p-4" aria-label="Cuenta regresiva">
            <h2 className="font-semibold">Cuenta regresiva</h2>
            <p className="my-2 text-4xl font-bold tabular-nums" aria-live="off">
                {segundos === 0 ? 'Tiempo!' : segundos}
            </p>
            <div className="flex gap-2">
                <button className="rounded-full border px-4 py-1 text-sm" disabled={segundos === 0}
                    onClick={() => setCorriendo(!corriendo)}>
                    {corriendo ? 'Pausar' : 'Reanudar'}
                </button>
                <button className="rounded-full border px-4 py-1 text-sm" onClick={reiniciar}>
                    Reiniciar
                </button>
            </div>
        </section>
    )
}
