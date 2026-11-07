// Cliente de OMDb a través de /api/omdb (Worker en producción, proxy de Vite en local).
export interface Resultado {
  Title: string;
  Year: string;
  imdbID: string;
  Type: 'movie' | 'series' | 'episode' | 'game' | string;
  Poster: string;
}

export interface Busqueda {
  Search?: Resultado[];
  totalResults?: string;
  Response: 'True' | 'False';
  Error?: string;
}

export interface Detalle {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: Array<{ Source: string; Value: string }>;
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  BoxOffice?: string;
  totalSeasons?: string;
  Response: 'True' | 'False';
  Error?: string;
}

const memoria = new Map<string, Promise<unknown>>();

function pedir<T>(params: Record<string, string | number | undefined>): Promise<T> {
  const q = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) if (v !== undefined && v !== '') q.set(k, String(v));
  const clave = q.toString();
  if (!memoria.has(clave)) {
    const p = fetch(`/api/omdb?${clave}`)
      .then((r) => r.json() as Promise<T>)
      .catch((e) => {
        memoria.delete(clave);
        throw e;
      });
    memoria.set(clave, p);
  }
  return memoria.get(clave) as Promise<T>;
}

export const buscar = (texto: string, opciones: { page?: number; type?: string; y?: string } = {}) =>
  pedir<Busqueda>({ s: texto.trim(), page: opciones.page ?? 1, type: opciones.type, y: opciones.y });

export const detalle = (id: string) => pedir<Detalle>({ i: id, plot: 'full' });

/** Póster de OMDb o null si no hay. */
export const poster = (p?: string) => (p && p !== 'N/A' ? p : null);

/** Calificación en escala 0–100 por fuente (IMDb, Rotten Tomatoes, Metacritic). */
export function puntajes(d: Detalle) {
  const out: { fuente: string; corto: string; valor: string; cien: number }[] = [];
  for (const r of d.Ratings ?? []) {
    let cien = NaN;
    if (r.Value.includes('/10')) cien = parseFloat(r.Value) * 10;
    else if (r.Value.endsWith('%')) cien = parseFloat(r.Value);
    else if (r.Value.includes('/100')) cien = parseFloat(r.Value);
    const corto = r.Source.includes('Internet') ? 'IMDb' : r.Source.includes('Rotten') ? 'Rotten' : r.Source.includes('Meta') ? 'Metacritic' : r.Source;
    if (!isNaN(cien)) out.push({ fuente: r.Source, corto, valor: r.Value, cien });
  }
  return out;
}

export const tipoTexto = (t: string) => ({ movie: 'Película', series: 'Serie', episode: 'Episodio', game: 'Juego' } as Record<string, string>)[t] ?? t;
export const na = (v?: string) => (v && v !== 'N/A' ? v : '');
