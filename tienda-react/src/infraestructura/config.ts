// Configuración que llega desde las variables de entorno: el archivo .env en local y el panel de
// Vercel en producción. Vite solo deja pasar al navegador las que empiezan con VITE_.
// Se leen AQUÍ, en infraestructura: el dominio no sabe que existe un .env y la UI importa el
// valor ya resuelto. Si la variable falta, la tienda sigue funcionando con su nombre de siempre.
const NOMBRE_POR_DEFECTO = 'TecCart';

export const NOMBRE_TIENDA : string = import.meta.env.VITE_NOMBRE_TIENDA?.trim() || NOMBRE_POR_DEFECTO;
