import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSesion } from "../../aplicacion/useSesion";

/*
  La pregunta de la clase 6: pego /checkout sin sesión, entra cualquiera. ¿Dónde pondría el
  control y qué haría con el que no entró?

  Dónde: en UNA ruta padre sin path (esta), que revisa la sesión y deja pasar con <Outlet/>.
  Toda ruta que se meta adentro en App.tsx (/checkout, /pedidos) queda protegida de una vez.
  Poner un `if (!usuario)` dentro de cada página sería repetir lo mismo N veces y el día que
  se agregue una página nueva alguien se olvidaría de uno.

  Qué hacer con el que no entró: no mostrarle una pantalla en blanco ni un error; mandarlo a
  /login con <Navigate>. `replace` reemplaza la entrada del historial (si no, el botón atrás
  rebotaría entre /login y /checkout) y `state.desde` lleva a dónde iba, sin ensuciar la URL,
  para que el login lo devuelva ahí cuando entre.

  Límite: esto es comodidad, no seguridad. El navegador es del usuario y puede saltarse
  cualquier if. Lo que protege de verdad es que el SERVIDOR valide el token en cada petición
  privada: por eso SesionContext llama a /auth/me al arrancar y no se fía solo de expiraEn.
*/
export default function RutaProtegida() {
    const { usuario } = useSesion();
    const ubicacion = useLocation();
    if(!usuario) {
        return <Navigate to="/login" replace state={{desde : ubicacion.pathname}}/>;
    }
    return <Outlet/>;
}
