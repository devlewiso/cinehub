import { Titulo } from '../components/ui';

export default function Privacidad() {
  return (
    <article className="max-w-3xl">
      <Titulo chico="Legal">Privacidad</Titulo>
      <div className="space-y-5 leading-relaxed text-texto">
        <p>CineHub es un buscador de películas y series. No pedimos cuentas, contraseñas ni datos personales.</p>
        <h2 className="pt-2 text-lg font-semibold text-white">Qué se guarda</h2>
        <p>«Mi lista» y tus calificaciones se guardan solo en tu navegador (almacenamiento local). No salen de tu dispositivo; si borrás los datos del sitio, se borran.</p>
        <h2 className="pt-2 text-lg font-semibold text-white">Datos de películas</h2>
        <p>
          La información de títulos, pósters y calificaciones viene de <a className="text-rojo-claro underline" href="https://www.omdbapi.com/" target="_blank" rel="noreferrer">OMDb API</a>. Tus búsquedas pasan por nuestro servidor para consultar OMDb; no las guardamos asociadas a vos.
        </p>
        <h2 className="pt-2 text-lg font-semibold text-white">Estadísticas</h2>
        <p>Usamos Google Analytics para saber cuántas personas visitan el sitio y qué páginas usan. Podés bloquearlo con la configuración de tu navegador o un bloqueador.</p>
        <h2 className="pt-2 text-lg font-semibold text-white">Contacto</h2>
        <p>
          Dudas o pedidos: <a className="text-rojo-claro underline" href="https://neuralcodelab.com/contacto">neuralcodelab.com/contacto</a>.
        </p>
      </div>
    </article>
  );
}
