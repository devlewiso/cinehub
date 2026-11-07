import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { GitCompare, Trophy, X } from 'lucide-react';
import { detalle, na, puntajes, type Detalle } from '../services/omdb';
import { Selector } from '../components/Selector';
import { Poster, Titulo } from '../components/ui';

const minutos = (r: string) => parseInt(r) || 0;
const dinero = (b?: string) => (b && b !== 'N/A' ? Number(b.replace(/[^\d]/g, '')) : 0);
const votos = (v: string) => Number(v.replace(/[^\d]/g, '')) || 0;
const premios = (a: string) => {
  const m = a.match(/(\d+) wins?/i);
  return m ? Number(m[1]) : 0;
};

type Fila = { k: string; a: string; b: string; ga?: number; gb?: number; mayorGana?: boolean };

export default function Comparar() {
  const [params, setParams] = useSearchParams();
  const ida = params.get('a') ?? '';
  const idb = params.get('b') ?? '';
  const [a, setA] = useState<Detalle | null>(null);
  const [b, setB] = useState<Detalle | null>(null);

  useEffect(() => {
    setA(null);
    if (ida) detalle(ida).then((r) => r.Response === 'True' && setA(r));
  }, [ida]);
  useEffect(() => {
    setB(null);
    if (idb) detalle(idb).then((r) => r.Response === 'True' && setB(r));
  }, [idb]);

  const poner = (lado: 'a' | 'b', id: string) => {
    const p = new URLSearchParams(params);
    if (id) p.set(lado, id);
    else p.delete(lado);
    setParams(p, { replace: true });
  };

  const nota = (d: Detalle, fuente: string) => puntajes(d).find((x) => x.corto === fuente);
  const filas: Fila[] =
    a && b
      ? [
          { k: 'IMDb', a: na(a.imdbRating) || '—', b: na(b.imdbRating) || '—', ga: parseFloat(a.imdbRating) || 0, gb: parseFloat(b.imdbRating) || 0, mayorGana: true },
          { k: 'Rotten Tomatoes', a: nota(a, 'Rotten')?.valor ?? '—', b: nota(b, 'Rotten')?.valor ?? '—', ga: nota(a, 'Rotten')?.cien ?? 0, gb: nota(b, 'Rotten')?.cien ?? 0, mayorGana: true },
          { k: 'Metacritic', a: na(a.Metascore) || '—', b: na(b.Metascore) || '—', ga: Number(a.Metascore) || 0, gb: Number(b.Metascore) || 0, mayorGana: true },
          { k: 'Votos en IMDb', a: na(a.imdbVotes) || '—', b: na(b.imdbVotes) || '—', ga: votos(a.imdbVotes), gb: votos(b.imdbVotes), mayorGana: true },
          { k: 'Taquilla', a: na(a.BoxOffice) || '—', b: na(b.BoxOffice) || '—', ga: dinero(a.BoxOffice), gb: dinero(b.BoxOffice), mayorGana: true },
          { k: 'Premios ganados', a: String(premios(a.Awards) || '—'), b: String(premios(b.Awards) || '—'), ga: premios(a.Awards), gb: premios(b.Awards), mayorGana: true },
          { k: 'Duración', a: na(a.Runtime) || '—', b: na(b.Runtime) || '—', ga: minutos(a.Runtime), gb: minutos(b.Runtime) },
          { k: 'Año', a: a.Year, b: b.Year },
          { k: 'Género', a: na(a.Genre), b: na(b.Genre) },
          { k: 'Dirección', a: na(a.Director), b: na(b.Director) },
        ]
      : [];

  let puntosA = 0;
  let puntosB = 0;
  for (const f of filas)
    if (f.mayorGana && f.ga && f.gb && f.ga !== f.gb) {
      if (f.ga > f.gb) puntosA++;
      else puntosB++;
    }

  const Lado = ({ d, lado }: { d: Detalle | null; lado: 'a' | 'b' }) =>
    d ? (
      <div className="relative rounded-3xl border border-white/10 bg-panel p-4">
        <button onClick={() => poner(lado, '')} aria-label={`Quitar ${d.Title}`} className="absolute right-3 top-3 z-10 grid h-8 w-8 place-items-center rounded-full bg-black/60 text-white hover:bg-black">
          <X className="h-4 w-4" aria-hidden />
        </button>
        <Link to={`/titulo/${d.imdbID}`} className="flex items-center gap-4 sm:flex-col sm:text-center">
          <Poster src={d.Poster} alt={`Póster de ${d.Title}`} className="aspect-[2/3] w-24 shrink-0 rounded-2xl sm:w-40" />
          <div>
            <p className="font-display text-2xl leading-none tracking-wide text-white sm:text-3xl">{d.Title}</p>
            <p className="mt-1 text-sm text-suave">{d.Year}</p>
          </div>
        </Link>
      </div>
    ) : (
      <div className="rounded-3xl border border-dashed border-linea p-4">
        <p className="mb-3 text-sm font-semibold text-suave">{lado === 'a' ? 'Primer título' : 'Segundo título'}</p>
        <Selector etiqueta="Buscá una película o serie" alElegir={(m) => poner(lado, m.imdbID)} />
      </div>
    );

  return (
    <>
      <Titulo chico="Frente a frente">Comparar</Titulo>
      <div className="grid items-start gap-4 md:grid-cols-[1fr_auto_1fr]">
        <Lado d={a} lado="a" />
        <div className="hidden h-full items-center justify-center md:flex">
          <span className="grid h-14 w-14 place-items-center rounded-full bg-rojo font-display text-2xl text-white">VS</span>
        </div>
        <Lado d={b} lado="b" />
      </div>

      {a && b ? (
        <>
          <div className="mt-8 rounded-3xl border border-white/10 bg-panel">
            <div className="flex items-center justify-center gap-3 border-b border-white/5 p-5 text-center">
              <Trophy className="h-6 w-6 text-oro" aria-hidden />
              <p className="text-lg text-white">
                {puntosA === puntosB ? (
                  <>Empate: <b>{puntosA}</b> a <b>{puntosB}</b></>
                ) : (
                  <>
                    Gana <b className="text-oro">{puntosA > puntosB ? a.Title : b.Title}</b> · {Math.max(puntosA, puntosB)} a {Math.min(puntosA, puntosB)}
                  </>
                )}
              </p>
            </div>
            <table className="w-full text-sm">
              <caption className="sr-only">Comparación de {a.Title} y {b.Title}</caption>
              <thead className="sr-only">
                <tr><th>Dato</th><th>{a.Title}</th><th>{b.Title}</th></tr>
              </thead>
              <tbody>
                {filas.map((f) => {
                  const ganaA = f.mayorGana && f.ga! > f.gb!;
                  const ganaB = f.mayorGana && f.gb! > f.ga!;
                  return (
                    <tr key={f.k} className="border-b border-white/5 last:border-0">
                      <td className={`w-[38%] p-3 text-right sm:p-4 ${ganaA ? 'font-bold text-verde' : 'text-white'}`}>{f.a}</td>
                      <th scope="row" className="w-[24%] p-3 text-center text-xs font-semibold uppercase tracking-wider text-suave sm:p-4">{f.k}</th>
                      <td className={`w-[38%] p-3 sm:p-4 ${ganaB ? 'font-bold text-verde' : 'text-white'}`}>{f.b}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-center text-xs text-suave">Gana el que tiene mejor nota, más votos, más taquilla y más premios. Duración, año y género son informativos.</p>
        </>
      ) : (
        <div className="mt-10 text-center text-suave">
          <GitCompare className="mx-auto mb-2 h-8 w-8 opacity-50" aria-hidden />
          Elegí dos títulos para ver quién gana.
        </div>
      )}
    </>
  );
}
