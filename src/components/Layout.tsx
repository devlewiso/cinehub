import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Bookmark, Clapperboard, GitCompare, History, Home, Search, Shuffle } from 'lucide-react';
import { useLista } from '../lib/lista';

const NAV = [
  { to: '/', texto: 'Inicio', icono: Home, fin: true },
  { to: '/buscar', texto: 'Buscar', icono: Search },
  { to: '/azar', texto: 'Al azar', icono: Shuffle },
  { to: '/comparar', texto: 'Comparar', icono: GitCompare },
  { to: '/saga', texto: 'Sagas', icono: History },
  { to: '/mi-lista', texto: 'Mi lista', icono: Bookmark },
];

export default function Layout() {
  const { pathname } = useLocation();
  const navegar = useNavigate();
  const items = useLista();
  const [q, setQ] = useState('');
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [pathname]);

  return (
    <div className="min-h-screen bg-negro text-texto">
      <a href="#contenido" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-rojo focus:px-4 focus:py-2">
        Saltar al contenido
      </a>
      <header className="sticky top-0 z-40 border-b border-white/5 bg-negro/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6">
          <Link to="/" className="flex shrink-0 items-center gap-2" aria-label="CineHub, inicio">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-rojo shadow-[0_0_24px_rgba(229,9,20,.45)]">
              <Clapperboard className="h-5 w-5 text-white" aria-hidden />
            </span>
            <span className="font-display text-2xl tracking-wider text-white">CINEHUB</span>
          </Link>
          <nav className="ml-4 hidden items-center gap-1 lg:flex" aria-label="Principal">
            {NAV.map(({ to, texto, fin }) => (
              <NavLink
                key={to}
                to={to}
                end={fin}
                className={({ isActive }) => `relative rounded-full px-3.5 py-2 text-sm font-medium transition ${isActive ? 'bg-white/10 text-white' : 'text-suave hover:text-white'}`}
              >
                {texto}
                {to === '/mi-lista' && items.length > 0 && <span className="ml-1.5 rounded-full bg-rojo px-1.5 text-[10px] font-bold text-white">{items.length}</span>}
              </NavLink>
            ))}
          </nav>
          {pathname !== '/buscar' && pathname !== '/' && (
            <form
              className="ml-auto hidden w-full max-w-xs items-center gap-2 rounded-full border border-linea bg-panel px-4 focus-within:border-rojo md:flex"
              onSubmit={(e) => {
                e.preventDefault();
                if (q.trim()) navegar(`/buscar?q=${encodeURIComponent(q.trim())}`);
              }}
              role="search"
            >
              <Search className="h-4 w-4 text-suave" aria-hidden />
              <label htmlFor="buscar-cabecera" className="sr-only">Buscar películas o series</label>
              <input id="buscar-cabecera" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar…" className="h-10 w-full bg-transparent text-sm outline-none placeholder:text-suave" />
            </form>
          )}
        </div>
      </header>

      <main id="contenido" className="mx-auto max-w-7xl px-4 pb-28 pt-6 sm:px-6 lg:pb-16 lg:pt-10">
        <Outlet />
      </main>

      <footer className="hidden border-t border-white/5 lg:block">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-8 text-sm text-suave">
          <p>
            <span className="font-display text-lg tracking-wider text-white">CINEHUB</span> · Datos de{' '}
            <a className="underline decoration-white/20 underline-offset-4 hover:text-white" href="https://www.omdbapi.com/" target="_blank" rel="noreferrer">OMDb API</a>
          </p>
          <p>
            <Link to="/privacidad" className="hover:text-white">Privacidad</Link> · Hecho por{' '}
            <a href="https://neuralcodelab.com" className="text-rojo-claro hover:underline">neuralcodelab.com</a>
          </p>
        </div>
      </footer>

      {/* Navegación inferior en celular */}
      <nav className="fixed inset-x-3 bottom-3 z-40 grid grid-cols-6 rounded-2xl border border-white/10 bg-panel/90 p-1.5 backdrop-blur-xl lg:hidden" style={{ marginBottom: 'env(safe-area-inset-bottom)' }} aria-label="Principal">
        {NAV.map(({ to, texto, icono: Icono, fin }) => (
          <NavLink
            key={to}
            to={to}
            end={fin}
            className={({ isActive }) => `relative flex flex-col items-center gap-0.5 rounded-xl py-1.5 text-[10px] font-medium transition ${isActive ? 'bg-white/10 text-white' : 'text-suave'}`}
          >
            <Icono className="h-5 w-5" aria-hidden />
            {texto}
            {to === '/mi-lista' && items.length > 0 && <span className="absolute right-2 top-1 h-2 w-2 rounded-full bg-rojo" />}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
