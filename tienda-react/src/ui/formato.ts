// ¿formato.ts es PRESENTACIÓN o DOMINIO? (clase 6) Es PRESENTACIÓN, y por eso vive en ui/.
//
// Argumento: Intl.NumberFormat('es-PE', ...) decide cómo se DIBUJA un número para un lector
// peruano: el símbolo "S/", la coma de los miles, los dos decimales. El dominio, en cambio,
// guarda y calcula números puros (precio, total, conIGV) y no sabe cómo se escriben. Prueba
// del cambio: si mañana la tienda se muestra en inglés o en dólares, se toca ESTE archivo y
// ninguna regla de negocio se entera. Y la regla de dependencia lo confirma: carrito.ts no
// debería importar Intl ni una configuración regional; ui/ puede importar de todos.
//
// Lo que SÍ es dominio es el 18 % de IGV (una regla de negocio): vive en dominio/precios.ts.
const formato = new Intl.NumberFormat('es-PE', {style: 'currency', currency : 'PEN'});
const formatoFecha = new Intl.DateTimeFormat('es-PE', {dateStyle : 'medium', timeStyle : 'short'});

export default function formatearPrecio (monto : number) : string {
    return formato.format(monto);
}

// El pedido guarda la fecha como texto ISO; aquí se convierte a lo que lee una persona.
// Si el texto no es una fecha válida se devuelve tal cual, para no mostrar "Invalid Date".
export function formatearFecha (iso : string) : string {
    const fecha = new Date(iso);
    return Number.isNaN(fecha.getTime()) ? iso : formatoFecha.format(fecha);
}
