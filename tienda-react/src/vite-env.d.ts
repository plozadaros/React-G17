interface ImportMetaEnv {
    readonly VITE_API_URL : string;
    // Opcional: si falta, infraestructura/config.ts usa el nombre por defecto de la tienda.
    readonly VITE_NOMBRE_TIENDA? : string;
}
