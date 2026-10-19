import { useState } from 'react';

// Contador tomado del Quick Start de react.dev ("Updating the screen").
//
// ¿Qué hace useState? (mi hipótesis, la confirmamos en la clase 4)
// Un componente es una función y se vuelve a ejecutar cada vez que React lo repinta,
// así que una variable normal (let count = 0) se reiniciaría en cada ejecución.
// useState(0) le da al componente una memoria que sobrevive entre repintados:
//   - count    es el valor actual (la primera vez es 0, el valor inicial).
//   - setCount es la función para cambiarlo. No basta con hacer count = count + 1:
//              setCount guarda el valor nuevo Y le avisa a React que repinte el componente.
// Es la regla UI = f(datos) en acción: yo cambio el dato con setCount y React repinta solo.
export default function Practica() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return (
    <button
      onClick={handleClick}
      className="rounded-lg border px-4 py-2 hover:bg-gray-100"
    >
      Clicked {count} times
    </button>
  );
}
