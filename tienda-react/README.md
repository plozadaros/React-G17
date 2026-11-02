# TecCart - tienda en React

**URL publica (Vercel):** https://react-g17-psi.vercel.app/

Proyecto del bloque React del Bootcamp Frontend & React (Tecsup): React 19 + TypeScript + Vite + Tailwind 4,
con `react-router-dom`, Context, hooks propios, sesion con JWT y arquitectura en capas.

## Como correrlo

```bash
cp .env.example .env     # y ajusta los valores (el .env no se sube a GitHub)
npm install
npm run dev              # servidor de desarrollo
npm run build            # tsc -b && vite build: debe terminar sin errores
npm run lint             # oxlint
```

## Variables de entorno

Vite solo deja pasar al navegador las que empiezan con `VITE_` (se leen con `import.meta.env`, siempre desde
`src/infraestructura/`). En produccion se configuran en Vercel (Settings > Environment Variables) y se redespliega,
porque se leen al construir, no en vivo.

| Variable             | Para que sirve                                            | Si falta                          |
| -------------------- | --------------------------------------------------------- | --------------------------------- |
| `VITE_API_URL`       | Direccion base de la API (DummyJSON: productos y login)   | La tienda usa el catalogo de respaldo |
| `VITE_NOMBRE_TIENDA` | Nombre en el Header, el Footer y el titulo de la pestana  | Se usa `TecCart`                  |

## Rutas

| Ruta            | Pagina                                   | Acceso           |
| --------------- | ---------------------------------------- | ---------------- |
| `/`             | Catalogo con filtros, buscador y favoritos | Publica          |
| `/producto/:id` | Detalle (carga perezosa, con su silueta) | Publica          |
| `/login`        | Inicio de sesion con "Recordarme"        | Publica          |
| `/checkout`     | Formulario de envio controlado           | Requiere sesion  |
| `/pedidos`      | Mis pedidos (lo guardado por el checkout) | Requiere sesion  |
| `/practica`     | Contador y cuenta regresiva del laboratorio | Publica          |
| `*`             | 404 propia                               | Publica          |

## Arquitectura (las flechas apuntan hacia adentro)

```
src/
  dominio/          reglas puras: funciones que reciben datos y devuelven datos. Ni React, ni red, ni disco.
                    ej.: carrito.ts (reducirCarrito), favoritos.ts (alternarFavorito), precios.ts (conIGV)
  infraestructura/  conecta con la red y el disco; los nombres en ingles de la API solo existen aqui.
                    ej.: api.ts (adaptador de DummyJSON), auth.ts, almacen.ts (sesion, favoritos, panel), pedidos.ts, config.ts
  aplicacion/       casos de uso con React: conectan dominio e infraestructura con la UI.
                    ej.: CarritoContext + useCart, SesionContext + useSesion, FavoritosContext + useFavoritos
  ui/               lo que se ve; consume la aplicacion y nunca toca el disco directo.
                    components/ (piezas), pages/ (una por direccion), layout/, formato.ts, useTitulo.ts
```

Regla de dependencia: las capas de afuera importan del dominio, nunca al reves.

## Sesion

El token se guarda comprobando su forma (`almacen.ts`), se valida contra el servidor con `GET /auth/me`
(`Authorization: Bearer`) y expira solo con un temporizador. "Recordarme" decide si vive en `localStorage`
(sobrevive al cierre del navegador) o en `sessionStorage` (muere con la pestana).
