import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { History, Loader2, Search } from 'lucide-react';
import { buscar, type Resultado } from '../services/omdb';
import { BotonLista, Poster, Titulo, Vacio } from '../components/ui';

const EJEMPLOS = ['Harry Potter', 'Star Wars', 'Toy Story', 'Rocky', 'Mission: Impossible', 'Shrek'];

// Línea de tiempo: junta hasta 3 páginas de resultados de una saga y las ordena por año.
export default function Saga() {
  const [params, setParams] = useSearchParams();
  const q = params.get('q') ?? '';
  const [texto, setTexto] = useState(q);
  const [items, setItems] = useState<Resultado[]>([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setTexto(q);
    if (!q) {
      setItems([]);
      return;
    }
    let vivo = true;
    setCargando(true);
    setError('');
    (async () => {
      const todos: Resultado[] = [];
      for (let p = 1; p <= 3; p++) {
        const r = await buscar(q, { type: 'movie', page: p }).catch(() => null);
        if (!r?.Search) break;
        todos.push(...r.Search);
        if (todos.length >= Number(r.totalResults ?? 0)) break;
      }
      if (!vivo) return;
      const unicos = [...new Map(todos.map((x) => [x.imdbID, x])).values()];
      unicos.sort((x, y) => parseInt(x.Year) - parseInt(y.Year));
      setItems(unicos);
      if (!unicos.length) setError('No encontramos películas con ese nombre.');
      setCargando(false);
    })();
    return () => {
      vivo = false;
    };
  }, [q]);

  const decadas = new Map<string, Resultado[]>();
  for (const m of items) {
    const d = `${Math.floor(parseInt(m.Year) / 10) * 10}s`;
    decadas.set(d, [...(decadas.get(d) ?? []), m]);
  }

  return (
    <>
      <Titulo chico="Línea de tiempo">Sagas</Titulo>
      <form
        role="search"
        onSubmit={(e) => {
          e.preventDefault();
          if (texto.trim()) setParams({ q: texto.trim() });
        }}
        className="mb-4 flex max-w-2xl items-center gap-2 rounded-2xl border border-linea bg-panel p-1.5 pl-4 focus-within:border-rojo"
      >
        <Search className="h-5 w-5 text-suave" aria-hidden />
        <label htmlFor="saga" className="sr-only">Nombre de la saga</label>
        <input id="saga" value={texto} onChange={(e) => setTexto(e.target.value)} placeholder="Nombre de la saga (en inglés funciona mejor)" className="h-11 w-full min-w-0 bg-transparent outline-none placeholder:text-suave" />
        <button className="h-11 shrink-0 rounded-xl bg-rojo px-5 font-semibold text-white hover:bg-rojo-claro">Ver</button>
      </form>
      <div className="mb-10 flex flex-wrap gap-2">
        {EJEMPLOS.map((s) => (
          <button key={s} onClick={() => setParams({ q: s })} className="rounded-full border border-white/10 px-3 py-1.5 text-sm text-suave hover:border-white/30 hover:text-white">
            {s}
          </button>
        ))}
      </div>

      {!q ? (
        <Vacio icono={<History className="h-6 w-6" />} titulo="Elegí una saga" texto="Te mostramos todas sus películas en orden, de la primera a la última." />
      ) : cargando ? (
        <div className="flex items-center gap-2 text-suave"><Loader2 className="h-5 w-5 animate-spin" aria-hidden /> Armando la línea de tiempo…</div>
      ) : error ? (
        <Vacio icono={<History className="h-6 w-6" />} titulo="Sin resultados" texto={error} />
      ) : (
        <ol className="relative ml-3 border-l-2 border-white/10 sm:ml-6">
          {[...decadas.entries()].map(([dec, pelis]) => (
            <li key={dec} className="mb-10">
              <span className="absolute -left-[13px] mt-1 grid h-6 w-6 place-items-center rounded-full bg-rojo ring-4 ring-negro" aria-hidden />
              <h2 className="mb-4 pl-6 font-display text-3xl tracking-wide text-white">{dec}</h2>
              <ul className="grid gap-3 pl-6 sm:grid-cols-2 lg:grid-cols-3">
                {pelis.map((m) => (
                  <li key={m.imdbID}>
                    <Link to={`/titulo/${m.imdbID}`} className="group flex items-center gap-3 rounded-2xl border border-white/5 bg-panel p-2.5 transition hover:border-rojo/50">
                      <Poster src={m.Poster} alt="" className="h-20 w-14 shrink-0 rounded-lg" />
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-bold text-rojo-claro">{m.Year}</p>
                        <p className="line-clamp-2 font-medium text-white group-hover:text-rojo-claro">{m.Title}</p>
                      </div>
                      <BotonLista m={m} />
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      )}
    </>
  );
}
