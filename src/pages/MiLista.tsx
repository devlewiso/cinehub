import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bookmark, Check, Eye, Star, Trash2 } from 'lucide-react';
import { lista, useLista } from '../lib/lista';
import { Poster, Titulo, Vacio } from '../components/ui';
import { tipoTexto } from '../services/omdb';

const FILTROS = [
  { id: 'pendientes', texto: 'Por ver' },
  { id: 'vistas', texto: 'Vistas' },
  { id: 'todas', texto: 'Todas' },
] as const;

export default function MiLista() {
  const items = useLista();
  const [filtro, setFiltro] = useState<(typeof FILTROS)[number]['id']>('pendientes');
  const vistas = items.filter((x) => x.vista).length;
  const mostrados = items.filter((x) => (filtro === 'pendientes' ? !x.vista : filtro === 'vistas' ? x.vista : true));

  return (
    <>
      <Titulo
        chico="Guardada en este navegador"
        accion={
          items.length > 0 && (
            <p className="text-sm text-suave">
              <b className="text-white">{items.length - vistas}</b> por ver · <b className="text-white">{vistas}</b> vistas
            </p>
          )
        }
      >
        Mi lista
      </Titulo>

      {items.length === 0 ? (
        <Vacio icono={<Bookmark className="h-6 w-6" />} titulo="Tu lista está vacía" texto="Tocá el marcador en cualquier película o serie para guardarla aquí.">
          <Link to="/buscar" className="inline-flex h-12 items-center rounded-full bg-rojo px-6 font-semibold text-white hover:bg-rojo-claro">Buscar algo que ver</Link>
        </Vacio>
      ) : (
        <>
          <div className="mb-6 inline-flex rounded-2xl border border-linea bg-panel p-1" role="group" aria-label="Filtro">
            {FILTROS.map((f) => (
              <button key={f.id} onClick={() => setFiltro(f.id)} aria-pressed={filtro === f.id} className={`rounded-xl px-4 py-2 text-sm font-medium ${filtro === f.id ? 'bg-white/10 text-white' : 'text-suave hover:text-white'}`}>
                {f.texto}
              </button>
            ))}
          </div>
          {mostrados.length === 0 ? (
            <p className="text-suave">{filtro === 'vistas' ? 'Todavía no marcaste nada como visto.' : '¡Ya viste todo lo de tu lista!'}</p>
          ) : (
            <ul className="grid gap-3 md:grid-cols-2">
              {mostrados.map((m) => (
                <li key={m.imdbID} className={`flex gap-4 rounded-3xl border border-white/5 bg-panel p-3 ${m.vista ? 'opacity-80' : ''}`}>
                  <Link to={`/titulo/${m.imdbID}`} className="shrink-0">
                    <Poster src={m.Poster} alt={`Póster de ${m.Title}`} className="aspect-[2/3] w-20 rounded-xl sm:w-24" />
                  </Link>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <Link to={`/titulo/${m.imdbID}`} className="font-semibold text-white hover:text-rojo-claro">{m.Title}</Link>
                    <p className="text-sm text-suave">{m.Year} · {tipoTexto(m.Type)}</p>
                    {m.vista && (
                      <div className="mt-2 flex gap-0.5" role="group" aria-label="Tu calificación">
                        {[1, 2, 3, 4, 5].map((n) => (
                          <button key={n} onClick={() => lista.calificar(m.imdbID, n)} aria-label={`${n} estrellas`} aria-pressed={(m.nota ?? 0) >= n} className="p-0.5">
                            <Star className={`h-5 w-5 ${(m.nota ?? 0) >= n ? 'fill-oro text-oro' : 'text-white/25'}`} aria-hidden />
                          </button>
                        ))}
                      </div>
                    )}
                    <div className="mt-auto flex flex-wrap gap-2 pt-3">
                      <button
                        onClick={() => lista.marcarVista(m.imdbID, !m.vista)}
                        className={`inline-flex h-9 items-center gap-1.5 rounded-full px-3.5 text-sm font-semibold ${m.vista ? 'bg-verde/15 text-verde' : 'bg-white/10 text-white hover:bg-white/15'}`}
                      >
                        {m.vista ? <Check className="h-4 w-4" aria-hidden /> : <Eye className="h-4 w-4" aria-hidden />}
                        {m.vista ? 'Vista' : 'Marcar como vista'}
                      </button>
                      <button onClick={() => lista.quitar(m.imdbID)} aria-label={`Quitar ${m.Title}`} className="inline-flex h-9 items-center gap-1.5 rounded-full px-3 text-sm text-suave hover:bg-rojo/10 hover:text-rojo-claro">
                        <Trash2 className="h-4 w-4" aria-hidden /> Quitar
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </>
  );
}
