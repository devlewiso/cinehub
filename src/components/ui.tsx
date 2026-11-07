import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bookmark, BookmarkCheck, Film, Star } from 'lucide-react';
import { poster, tipoTexto, type Resultado } from '../services/omdb';
import { lista, useLista } from '../lib/lista';

export function Poster({ src, alt, className = '' }: { src?: string; alt: string; className?: string }) {
  const [roto, setRoto] = useState(false);
  const url = roto ? null : poster(src);
  return url ? (
    <img src={url} alt={alt} loading="lazy" onError={() => setRoto(true)} className={`object-cover bg-panel ${className}`} />
  ) : (
    <div className={`grid place-items-center bg-gradient-to-br from-panel to-panel2 text-suave ${className}`} aria-label={alt}>
      <Film className="h-10 w-10 opacity-40" aria-hidden />
    </div>
  );
}

export function BotonLista({ m, grande = false }: { m: Resultado; grande?: boolean }) {
  useLista();
  const en = lista.tiene(m.imdbID);
  const Icono = en ? BookmarkCheck : Bookmark;
  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        lista.alternar({ imdbID: m.imdbID, Title: m.Title, Year: m.Year, Poster: m.Poster, Type: m.Type });
      }}
      aria-pressed={en}
      aria-label={en ? `Quitar ${m.Title} de mi lista` : `Agregar ${m.Title} a mi lista`}
      className={
        grande
          ? `inline-flex items-center gap-2 h-12 px-5 rounded-full font-semibold transition ${en ? 'bg-oro text-negro' : 'bg-white/10 hover:bg-white/15 text-white'}`
          : `grid place-items-center w-9 h-9 rounded-full backdrop-blur transition ${en ? 'bg-oro text-negro' : 'bg-black/60 text-white hover:bg-black/80'}`
      }
    >
      <Icono className={grande ? 'h-5 w-5' : 'h-4 w-4'} aria-hidden />
      {grande && (en ? 'En mi lista' : 'Agregar a mi lista')}
    </button>
  );
}

export function Tarjeta({ m }: { m: Resultado }) {
  return (
    <Link to={`/titulo/${m.imdbID}`} className="group block focus-visible:outline-none">
      <div className="relative aspect-[2/3] overflow-hidden rounded-2xl ring-1 ring-white/5 group-hover:ring-rojo/70 group-focus-visible:ring-2 group-focus-visible:ring-rojo transition">
        <Poster src={m.Poster} alt={m.Title} className="h-full w-full transition duration-500 group-hover:scale-105" />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition" />
        <div className="absolute top-2 right-2">
          <BotonLista m={m} />
        </div>
        <span className="absolute top-2 left-2 rounded-md bg-black/60 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white/80 backdrop-blur">
          {tipoTexto(m.Type)}
        </span>
      </div>
      <p className="mt-2 line-clamp-2 text-sm font-semibold leading-snug text-white group-hover:text-rojo-claro">{m.Title}</p>
      <p className="text-xs text-suave">{m.Year}</p>
    </Link>
  );
}

export function Rejilla({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">{children}</div>;
}

export function Esqueletos({ n = 12 }: { n?: number }) {
  return (
    <Rejilla>
      {Array.from({ length: n }, (_, i) => (
        <div key={i} aria-hidden>
          <div className="aspect-[2/3] animate-pulse rounded-2xl bg-panel" />
          <div className="mt-2 h-3 w-3/4 animate-pulse rounded bg-panel" />
          <div className="mt-1.5 h-3 w-1/3 animate-pulse rounded bg-panel" />
        </div>
      ))}
    </Rejilla>
  );
}

export function NotaImdb({ valor }: { valor: string }) {
  if (!valor || valor === 'N/A') return null;
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-oro/15 px-2.5 py-1 text-sm font-bold text-oro">
      <Star className="h-4 w-4 fill-oro" aria-hidden /> {valor}
      <span className="sr-only">de 10 en IMDb</span>
    </span>
  );
}

export function Titulo({ chico, children, accion }: { chico?: string; children: React.ReactNode; accion?: React.ReactNode }) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
      <div>
        {chico && <p className="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-rojo-claro">{chico}</p>}
        <h1 className="font-display text-4xl leading-none tracking-wide text-white sm:text-5xl">{children}</h1>
      </div>
      {accion}
    </div>
  );
}

export function Vacio({ icono, titulo, texto, children }: { icono: React.ReactNode; titulo: string; texto: string; children?: React.ReactNode }) {
  return (
    <div className="rounded-3xl border border-dashed border-linea px-6 py-14 text-center">
      <div className="mx-auto mb-3 grid h-14 w-14 place-items-center rounded-2xl bg-panel text-rojo-claro">{icono}</div>
      <p className="text-lg font-semibold text-white">{titulo}</p>
      <p className="mx-auto mt-1 max-w-md text-suave">{texto}</p>
      {children && <div className="mt-5">{children}</div>}
    </div>
  );
}
