import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Dices, Loader2 } from 'lucide-react';
import { POPULARES } from '../data/populares';
import { detalle, na, poster, type Detalle } from '../services/omdb';
import { BotonLista, NotaImdb, Poster, Titulo } from '../components/ui';

export default function Azar() {
  const [d, setD] = useState<Detalle | null>(null);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState('');
  const [ultimos, setUltimos] = useState<string[]>([]);

  const tirar = async () => {
    setCargando(true);
    setError('');
    const opciones = POPULARES.filter((id) => !ultimos.includes(id));
    const id = opciones[Math.floor(Math.random() * opciones.length)];
    try {
      const r = await detalle(id);
      if (r.Response !== 'True') throw new Error();
      setD(r);
      setUltimos((u) => [id, ...u].slice(0, 15));
    } catch {
      setError('No pudimos traer una película. Probá otra vez.');
    } finally {
      setCargando(false);
    }
  };

  return (
    <>
      <Titulo chico="¿Qué vemos hoy?">Al azar</Titulo>
      <div className="grid items-center gap-8 lg:grid-cols-[1fr_1.2fr]">
        <div className="rounded-3xl border border-white/5 bg-gradient-to-br from-panel to-panel2 p-8 text-center">
          <Dices className="mx-auto h-14 w-14 text-rojo" aria-hidden />
          <p className="mt-4 text-lg text-suave">Te elegimos una película entre las más populares. Si no te convence, tirá otra vez.</p>
          <button onClick={tirar} disabled={cargando} className="mt-6 inline-flex h-14 items-center gap-2 rounded-full bg-rojo px-8 text-lg font-semibold text-white shadow-[0_10px_40px_rgba(229,9,20,.35)] transition hover:bg-rojo-claro disabled:opacity-60">
            {cargando ? <Loader2 className="h-5 w-5 animate-spin" aria-hidden /> : <Dices className="h-5 w-5" aria-hidden />}
            {d ? 'Otra película' : 'Dame una película'}
          </button>
          {error && <p role="alert" className="mt-4 text-rojo-claro">{error}</p>}
        </div>

        <div aria-live="polite">
          {d ? (
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-panel">
              {poster(d.Poster) && <img src={poster(d.Poster)!} alt="" aria-hidden className="absolute inset-0 h-full w-full scale-110 object-cover opacity-20 blur-2xl" />}
              <div className="relative grid gap-5 p-5 sm:grid-cols-[180px_1fr]">
                <Poster src={d.Poster} alt={`Póster de ${d.Title}`} className="mx-auto aspect-[2/3] w-44 rounded-2xl sm:w-full" />
                <div>
                  <h2 className="font-display text-4xl leading-none tracking-wide text-white">{d.Title}</h2>
                  <p className="mt-1 text-sm text-suave">
                    {d.Year} · {na(d.Runtime)} · {na(d.Genre)}
                  </p>
                  <div className="mt-3"><NotaImdb valor={d.imdbRating} /></div>
                  <p className="mt-3 line-clamp-4 text-texto">{na(d.Plot)}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    <Link to={`/titulo/${d.imdbID}`} className="inline-flex h-12 items-center gap-2 rounded-full bg-white px-5 font-semibold text-negro hover:bg-white/90">
                      Ver detalle <ArrowRight className="h-4 w-4" aria-hidden />
                    </Link>
                    <BotonLista m={d} grande />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid aspect-[16/10] place-items-center rounded-3xl border border-dashed border-linea text-suave">Tu película va a aparecer aquí</div>
          )}
        </div>
      </div>
    </>
  );
}
