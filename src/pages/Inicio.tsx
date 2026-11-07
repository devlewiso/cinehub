import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Bookmark, GitCompare, History, Search, Shuffle } from 'lucide-react';
import { POPULARES } from '../data/populares';
import { detalle, poster, type Detalle } from '../services/omdb';
import { Esqueletos, NotaImdb, Rejilla, Tarjeta } from '../components/ui';

const SUGERENCIAS = ['Interstellar', 'Breaking Bad', 'El Padrino', 'Spider-Man', 'Coco', 'Dune'];
const FUNCIONES = [
  { to: '/azar', icono: Shuffle, titulo: 'Al azar', texto: '¿No sabés qué ver? Te damos una película.' },
  { to: '/comparar', icono: GitCompare, titulo: 'Comparar', texto: 'Dos títulos frente a frente: notas, duración, taquilla.' },
  { to: '/saga', icono: History, titulo: 'Sagas', texto: 'Toda una saga ordenada por año en una línea de tiempo.' },
  { to: '/mi-lista', icono: Bookmark, titulo: 'Mi lista', texto: 'Guardá lo que querés ver y marcá lo que ya viste.' },
];

function mezclar<T>(a: T[]) {
  const b = [...a];
  for (let i = b.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [b[i], b[j]] = [b[j], b[i]];
  }
  return b;
}

export default function Inicio() {
  const navegar = useNavigate();
  const [q, setQ] = useState('');
  const ids = useMemo(() => mezclar(POPULARES).slice(0, 12), []);
  const [pelis, setPelis] = useState<Detalle[] | null>(null);

  useEffect(() => {
    Promise.all(ids.map((id) => detalle(id).catch(() => null))).then((r) => setPelis(r.filter((x): x is Detalle => !!x && x.Response === 'True')));
  }, [ids]);

  const destacada = pelis?.find((p) => poster(p.Poster));

  return (
    <>
      <section className="relative -mx-4 -mt-6 mb-12 overflow-hidden sm:-mx-6 lg:-mt-10">
        {destacada && (
          <img src={poster(destacada.Poster)!} alt="" aria-hidden className="absolute inset-0 h-full w-full scale-110 object-cover opacity-30 blur-2xl" />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-negro/40 via-negro/70 to-negro" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.3fr_1fr] md:py-20">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-rojo-claro">Películas y series</p>
            <h1 className="font-display text-6xl leading-[0.9] tracking-wide text-white sm:text-7xl lg:text-8xl">
              Cada cuadro
              <br />
              <span className="text-rojo">cuenta una historia</span>
            </h1>
            <p className="mt-5 max-w-lg text-lg text-suave">Buscá cualquier película o serie, mirá sus notas y armá tu lista de pendientes.</p>
            <form
              role="search"
              className="mt-7 flex max-w-xl items-center gap-2 rounded-full border border-white/10 bg-white/5 p-1.5 pl-5 backdrop-blur focus-within:border-rojo"
              onSubmit={(e) => {
                e.preventDefault();
                if (q.trim()) navegar(`/buscar?q=${encodeURIComponent(q.trim())}`);
              }}
            >
              <Search className="h-5 w-5 shrink-0 text-suave" aria-hidden />
              <label htmlFor="buscar-inicio" className="sr-only">Buscar películas o series</label>
              <input id="buscar-inicio" value={q} onChange={(e) => setQ(e.target.value)} placeholder="¿Qué querés ver hoy?" className="h-11 w-full min-w-0 bg-transparent text-base outline-none placeholder:text-suave" />
              <button className="h-11 shrink-0 rounded-full bg-rojo px-6 font-semibold text-white transition hover:bg-rojo-claro">Buscar</button>
            </form>
            <div className="mt-4 flex flex-wrap gap-2">
              {SUGERENCIAS.map((s) => (
                <Link key={s} to={`/buscar?q=${encodeURIComponent(s)}`} className="rounded-full border border-white/10 px-3 py-1.5 text-sm text-suave transition hover:border-white/30 hover:text-white">
                  {s}
                </Link>
              ))}
            </div>
          </div>
          {destacada && (
            <Link to={`/titulo/${destacada.imdbID}`} className="group relative mx-auto hidden w-64 md:block lg:w-72" aria-label={`Ver ${destacada.Title}`}>
              <img src={poster(destacada.Poster)!} alt="" className="aspect-[2/3] w-full rotate-2 rounded-3xl object-cover shadow-2xl ring-1 ring-white/10 transition group-hover:rotate-0" />
              <div className="absolute -bottom-5 -left-6 rounded-2xl border border-white/10 bg-panel/90 p-4 backdrop-blur">
                <p className="text-xs uppercase tracking-widest text-suave">Destacada</p>
                <p className="font-semibold text-white">{destacada.Title}</p>
                <div className="mt-1"><NotaImdb valor={destacada.imdbRating} /></div>
              </div>
            </Link>
          )}
        </div>
      </section>

      <section className="mb-14 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {FUNCIONES.map(({ to, icono: Icono, titulo, texto }) => (
          <Link key={to} to={to} className="group rounded-3xl border border-white/5 bg-panel p-5 transition hover:border-rojo/50 hover:bg-panel2">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-rojo/15 text-rojo-claro"><Icono className="h-5 w-5" aria-hidden /></span>
            <p className="mt-4 font-semibold text-white">{titulo}</p>
            <p className="mt-1 text-sm text-suave">{texto}</p>
          </Link>
        ))}
      </section>

      <section>
        <div className="mb-5 flex items-end justify-between">
          <h2 className="font-display text-3xl tracking-wide text-white sm:text-4xl">Populares</h2>
          <Link to="/azar" className="inline-flex items-center gap-1 text-sm font-semibold text-rojo-claro hover:underline">
            Sorprendeme <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
        {pelis ? (
          <Rejilla>
            {pelis.map((p) => (
              <Tarjeta key={p.imdbID} m={p} />
            ))}
          </Rejilla>
        ) : (
          <Esqueletos />
        )}
      </section>
    </>
  );
}
