import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Award, Calendar, Clock, ExternalLink, GitCompare, Globe, Share2 } from 'lucide-react';
import { detalle, na, poster, puntajes, tipoTexto, type Detalle } from '../services/omdb';
import { BotonLista, Poster, Vacio } from '../components/ui';

export default function TituloDetalle() {
  const { id = '' } = useParams();
  const navegar = useNavigate();
  const [d, setD] = useState<Detalle | null>(null);
  const [error, setError] = useState(false);
  const [copiado, setCopiado] = useState(false);

  useEffect(() => {
    setD(null);
    setError(false);
    detalle(id)
      .then((r) => (r.Response === 'True' ? setD(r) : setError(true)))
      .catch(() => setError(true));
  }, [id]);

  useEffect(() => {
    if (d) document.title = `${d.Title} (${d.Year}) — CineHub`;
    return () => {
      document.title = 'CineHub — Películas y series';
    };
  }, [d]);

  if (error) return <Vacio icono={<Globe className="h-6 w-6" />} titulo="No encontramos este título" texto="Puede que el enlace esté mal escrito." />;
  if (!d)
    return (
      <div className="grid gap-8 md:grid-cols-[300px_1fr]" aria-busy="true">
        <div className="aspect-[2/3] animate-pulse rounded-3xl bg-panel" />
        <div className="space-y-4">
          <div className="h-12 w-2/3 animate-pulse rounded-xl bg-panel" />
          <div className="h-5 w-1/3 animate-pulse rounded bg-panel" />
          <div className="h-28 animate-pulse rounded-xl bg-panel" />
        </div>
      </div>
    );

  const notas = puntajes(d);
  const compartir = async () => {
    const url = location.href;
    try {
      if (navigator.share) await navigator.share({ title: d.Title, url });
      else {
        await navigator.clipboard.writeText(url);
        setCopiado(true);
        setTimeout(() => setCopiado(false), 1800);
      }
    } catch {
      /* cancelado */
    }
  };
  const datos = [
    { icono: Calendar, k: 'Estreno', v: na(d.Released) || d.Year },
    { icono: Clock, k: 'Duración', v: na(d.Runtime) },
    { icono: Globe, k: 'País', v: na(d.Country) },
    { icono: Globe, k: 'Idioma', v: na(d.Language) },
  ].filter((x) => x.v);

  return (
    <article>
      {poster(d.Poster) && (
        <div className="pointer-events-none absolute inset-x-0 top-16 -z-0 h-[520px] overflow-hidden" aria-hidden>
          <img src={poster(d.Poster)!} alt="" className="h-full w-full scale-110 object-cover opacity-25 blur-3xl" />
          <div className="absolute inset-0 bg-gradient-to-b from-negro/30 to-negro" />
        </div>
      )}
      <div className="relative">
        <button onClick={() => (history.length > 1 ? navegar(-1) : navegar('/'))} className="mb-6 inline-flex items-center gap-2 text-sm text-suave hover:text-white">
          <ArrowLeft className="h-4 w-4" aria-hidden /> Volver
        </button>
        <div className="grid gap-8 md:grid-cols-[300px_1fr] lg:gap-12">
          <Poster src={d.Poster} alt={`Póster de ${d.Title}`} className="mx-auto aspect-[2/3] w-56 rounded-3xl shadow-2xl ring-1 ring-white/10 md:w-full" />
          <div>
            <div className="flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-wider">
              <span className="rounded-md bg-rojo px-2 py-1 text-white">{tipoTexto(d.Type)}</span>
              {na(d.Rated) && <span className="rounded-md border border-white/20 px-2 py-1 text-suave">{d.Rated}</span>}
              {d.totalSeasons && na(d.totalSeasons) && <span className="rounded-md border border-white/20 px-2 py-1 text-suave">{d.totalSeasons} temporadas</span>}
            </div>
            <h1 className="mt-3 font-display text-5xl leading-none tracking-wide text-white sm:text-6xl">{d.Title}</h1>
            <p className="mt-2 text-suave">
              {d.Year} · {na(d.Genre)}
            </p>

            {notas.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-3">
                {notas.map((n) => (
                  <div key={n.fuente} className="min-w-[120px] rounded-2xl border border-white/10 bg-panel/80 p-3 backdrop-blur">
                    <p className="text-xs text-suave">{n.corto}</p>
                    <p className="text-2xl font-bold text-white">{n.valor}</p>
                    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
                      <div className={`h-full rounded-full ${n.cien >= 70 ? 'bg-verde' : n.cien >= 50 ? 'bg-oro' : 'bg-rojo'}`} style={{ width: `${n.cien}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-6 flex flex-wrap gap-2">
              <BotonLista m={d} grande />
              <Link to={`/comparar?a=${d.imdbID}`} className="inline-flex h-12 items-center gap-2 rounded-full border border-white/15 px-5 font-semibold text-white hover:bg-white/5">
                <GitCompare className="h-5 w-5" aria-hidden /> Comparar
              </Link>
              <button onClick={compartir} className="inline-flex h-12 items-center gap-2 rounded-full border border-white/15 px-5 font-semibold text-white hover:bg-white/5">
                <Share2 className="h-5 w-5" aria-hidden /> {copiado ? '¡Enlace copiado!' : 'Compartir'}
              </button>
            </div>

            {na(d.Plot) && (
              <section className="mt-8">
                <h2 className="mb-2 text-sm font-semibold uppercase tracking-widest text-suave">Sinopsis</h2>
                <p className="max-w-3xl text-lg leading-relaxed text-texto">{d.Plot}</p>
                <p className="mt-1 text-xs text-suave">La sinopsis viene de IMDb, en inglés.</p>
              </section>
            )}

            <dl className="mt-8 grid gap-x-8 gap-y-5 sm:grid-cols-2">
              {[
                ['Dirección', na(d.Director)],
                ['Guion', na(d.Writer)],
                ['Reparto', na(d.Actors)],
                ['Taquilla', na(d.BoxOffice)],
              ]
                .filter(([, v]) => v)
                .map(([k, v]) => (
                  <div key={k}>
                    <dt className="text-xs font-semibold uppercase tracking-widest text-suave">{k}</dt>
                    <dd className="mt-1 text-white">{v}</dd>
                  </div>
                ))}
            </dl>

            <div className="mt-8 flex flex-wrap gap-2">
              {datos.map(({ icono: Icono, k, v }) => (
                <span key={k} className="inline-flex items-center gap-2 rounded-full bg-panel px-3 py-1.5 text-sm text-suave">
                  <Icono className="h-4 w-4" aria-hidden /> <span className="sr-only">{k}:</span> {v}
                </span>
              ))}
            </div>

            {na(d.Awards) && (
              <p className="mt-6 inline-flex items-start gap-2 rounded-2xl border border-oro/30 bg-oro/10 px-4 py-3 text-sm text-oro">
                <Award className="mt-0.5 h-4 w-4 shrink-0" aria-hidden /> {d.Awards}
              </p>
            )}

            <p className="mt-8">
              <a href={`https://www.imdb.com/title/${d.imdbID}/`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-sm text-suave hover:text-white">
                Ver en IMDb <ExternalLink className="h-4 w-4" aria-hidden />
              </a>
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}
