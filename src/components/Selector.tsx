import { useEffect, useId, useState } from 'react';
import { Loader2, Search } from 'lucide-react';
import { buscar, type Resultado } from '../services/omdb';
import { Poster } from './ui';

// Buscador con lista desplegable para elegir un título (Comparar).
export function Selector({ etiqueta, alElegir }: { etiqueta: string; alElegir: (m: Resultado) => void }) {
  const id = useId();
  const [q, setQ] = useState('');
  const [res, setRes] = useState<Resultado[]>([]);
  const [cargando, setCargando] = useState(false);
  const [abierto, setAbierto] = useState(false);

  useEffect(() => {
    if (q.trim().length < 2) {
      setRes([]);
      return;
    }
    setCargando(true);
    const t = setTimeout(() => {
      buscar(q)
        .then((r) => setRes(r.Search?.slice(0, 6) ?? []))
        .catch(() => setRes([]))
        .finally(() => setCargando(false));
    }, 400);
    return () => clearTimeout(t);
  }, [q]);

  return (
    <div className="relative">
      <label htmlFor={id} className="sr-only">{etiqueta}</label>
      <div className="flex items-center gap-2 rounded-2xl border border-linea bg-panel px-4 focus-within:border-rojo">
        <Search className="h-4 w-4 text-suave" aria-hidden />
        <input
          id={id}
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setAbierto(true);
          }}
          onFocus={() => setAbierto(true)}
          onBlur={() => setTimeout(() => setAbierto(false), 150)}
          placeholder={etiqueta}
          autoComplete="off"
          className="h-12 w-full bg-transparent outline-none placeholder:text-suave"
        />
        {cargando && <Loader2 className="h-4 w-4 animate-spin text-suave" aria-hidden />}
      </div>
      {abierto && res.length > 0 && (
        <ul className="absolute z-30 mt-2 w-full overflow-hidden rounded-2xl border border-white/10 bg-panel2 shadow-2xl" role="listbox">
          {res.map((m) => (
            <li key={m.imdbID}>
              <button
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => {
                  alElegir(m);
                  setQ('');
                  setAbierto(false);
                }}
                className="flex w-full items-center gap-3 px-3 py-2 text-left hover:bg-white/5"
              >
                <Poster src={m.Poster} alt="" className="h-14 w-10 shrink-0 rounded-md" />
                <span className="min-w-0">
                  <span className="block truncate font-medium text-white">{m.Title}</span>
                  <span className="text-xs text-suave">{m.Year}</span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
