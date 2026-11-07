import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Loader2, Search, SearchX } from 'lucide-react';
import { buscar, type Resultado } from '../services/omdb';
import { Esqueletos, Rejilla, Tarjeta, Titulo, Vacio } from '../components/ui';

const TIPOS = [
  { id: '', texto: 'Todo' },
  { id: 'movie', texto: 'Películas' },
  { id: 'series', texto: 'Series' },
];

export default function Buscar() {
  const [params, setParams] = useSearchParams();
  const q = params.get('q') ?? '';
  const tipo = params.get('tipo') ?? '';
  const anio = params.get('anio') ?? '';
  const [texto, setTexto] = useState(q);
  const [res, setRes] = useState<Resultado[]>([]);
  const [total, setTotal] = useState(0);
  const [pagina, setPagina] = useState(1);
  const [estado, setEstado] = useState<'' | 'cargando' | 'mas' | 'error'>('');
  const [error, setError] = useState('');

  useEffect(() => {
    setTexto(q);
  }, [q]);

  // Búsqueda mientras escribe (con pausa) para no gastar la API en cada tecla
  useEffect(() => {
    const t = setTimeout(() => {
      if (texto.trim() !== q) {
        const p = new URLSearchParams(params);
        if (texto.trim()) p.set('q', texto.trim());
        else p.delete('q');
        setParams(p, { replace: true });
      }
    }, 450);
    return () => clearTimeout(t);
  }, [texto]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (q.trim().length < 2) {
      setRes([]);
      setTotal(0);
      setError('');
      return;
    }
    let vivo = true;
    setEstado('cargando');
    setPagina(1);
    buscar(q, { type: tipo, y: anio })
      .then((r) => {
        if (!vivo) return;
        if (r.Response === 'True') {
          setRes(r.Search ?? []);
          setTotal(Number(r.totalResults ?? 0));
          setError('');
        } else {
          setRes([]);
          setTotal(0);
          setError(r.Error === 'Too many results.' ? 'Hay demasiados resultados: escribí un poco más.' : 'No encontramos nada con esa búsqueda.');
        }
        setEstado('');
      })
      .catch(() => vivo && (setEstado('error'), setError('No pudimos conectar. Probá de nuevo.')));
    return () => {
      vivo = false;
    };
  }, [q, tipo, anio]);

  const masResultados = async () => {
    setEstado('mas');
    const r = await buscar(q, { type: tipo, y: anio, page: pagina + 1 }).catch(() => null);
    if (r?.Search) {
      const vistos = new Set(res.map((x) => x.imdbID));
      setRes([...res, ...r.Search.filter((x) => !vistos.has(x.imdbID))]);
      setPagina(pagina + 1);
    }
    setEstado('');
  };

  const filtro = (clave: string, valor: string) => {
    const p = new URLSearchParams(params);
    if (valor) p.set(clave, valor);
    else p.delete(clave);
    setParams(p, { replace: true });
  };

  return (
    <>
      <Titulo chico="Explorar">Buscar</Titulo>
      <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-center">
        <div className="flex flex-1 items-center gap-3 rounded-2xl border border-linea bg-panel px-4 focus-within:border-rojo">
          <Search className="h-5 w-5 text-suave" aria-hidden />
          <label htmlFor="q" className="sr-only">Título de la película o serie</label>
          <input
            id="q"
            autoFocus
            type="search"
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            placeholder="Escribí un título en inglés o español…"
            className="h-14 w-full bg-transparent text-lg outline-none placeholder:text-suave"
          />
          {estado === 'cargando' && <Loader2 className="h-5 w-5 animate-spin text-suave" aria-label="Buscando" />}
        </div>
        <div className="flex gap-2">
          <div className="flex rounded-2xl border border-linea bg-panel p-1" role="group" aria-label="Tipo">
            {TIPOS.map((t) => (
              <button
                key={t.id}
                onClick={() => filtro('tipo', t.id)}
                aria-pressed={tipo === t.id}
                className={`rounded-xl px-3.5 py-2.5 text-sm font-medium transition ${tipo === t.id ? 'bg-white/10 text-white' : 'text-suave hover:text-white'}`}
              >
                {t.texto}
              </button>
            ))}
          </div>
          <label className="sr-only" htmlFor="anio">Año</label>
          <input
            id="anio"
            inputMode="numeric"
            maxLength={4}
            value={anio}
            onChange={(e) => filtro('anio', e.target.value.replace(/\D/g, '').slice(0, 4))}
            placeholder="Año"
            className="w-24 rounded-2xl border border-linea bg-panel px-4 text-sm outline-none focus:border-rojo"
          />
        </div>
      </div>

      {q.trim().length < 2 ? (
        <Vacio icono={<Search className="h-6 w-6" />} titulo="Empezá a escribir" texto="Buscamos en millones de películas y series de IMDb." />
      ) : estado === 'cargando' && res.length === 0 ? (
        <Esqueletos />
      ) : error ? (
        <Vacio icono={<SearchX className="h-6 w-6" />} titulo="Sin resultados" texto={error} />
      ) : (
        <>
          <p className="mb-5 text-sm text-suave" aria-live="polite">
            {total.toLocaleString('es')} resultados para <b className="text-white">«{q}»</b>
          </p>
          <Rejilla>
            {res.map((m) => (
              <Tarjeta key={m.imdbID} m={m} />
            ))}
          </Rejilla>
          {res.length < total && (
            <div className="mt-10 text-center">
              <button onClick={masResultados} disabled={estado === 'mas'} className="inline-flex h-12 items-center gap-2 rounded-full border border-white/15 px-6 font-semibold text-white transition hover:bg-white/5 disabled:opacity-60">
                {estado === 'mas' && <Loader2 className="h-4 w-4 animate-spin" aria-hidden />}
                Ver más resultados
              </button>
            </div>
          )}
        </>
      )}
    </>
  );
}
