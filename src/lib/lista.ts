import { useSyncExternalStore } from 'react';

// «Mi lista»: se guarda en este navegador (localStorage).
export interface ItemLista {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
  Type: string;
  vista: boolean;
  nota?: number; // 1–5 estrellas propias
  agregada: number;
}

const CLAVE = 'cinehub-lista';
let cache: ItemLista[] = leer();
const oyentes = new Set<() => void>();

function leer(): ItemLista[] {
  try {
    return JSON.parse(localStorage.getItem(CLAVE) || '[]');
  } catch {
    return [];
  }
}
function guardar(nueva: ItemLista[]) {
  cache = nueva;
  try {
    localStorage.setItem(CLAVE, JSON.stringify(nueva));
  } catch {
    /* sin espacio o modo privado */
  }
  oyentes.forEach((f) => f());
}

export const lista = {
  tiene: (id: string) => cache.some((x) => x.imdbID === id),
  agregar: (m: Omit<ItemLista, 'vista' | 'agregada'>) => {
    if (!lista.tiene(m.imdbID)) guardar([{ ...m, vista: false, agregada: Date.now() }, ...cache]);
  },
  quitar: (id: string) => guardar(cache.filter((x) => x.imdbID !== id)),
  alternar: (m: Omit<ItemLista, 'vista' | 'agregada'>) => (lista.tiene(m.imdbID) ? lista.quitar(m.imdbID) : lista.agregar(m)),
  marcarVista: (id: string, vista: boolean) => guardar(cache.map((x) => (x.imdbID === id ? { ...x, vista } : x))),
  calificar: (id: string, nota: number) => guardar(cache.map((x) => (x.imdbID === id ? { ...x, nota, vista: true } : x))),
};

export function useLista() {
  return useSyncExternalStore(
    (f) => {
      oyentes.add(f);
      return () => oyentes.delete(f);
    },
    () => cache,
  );
}
