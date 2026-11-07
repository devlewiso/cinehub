import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Inicio from './pages/Inicio';
import Buscar from './pages/Buscar';
import TituloDetalle from './pages/TituloDetalle';
import Azar from './pages/Azar';
import Comparar from './pages/Comparar';
import Saga from './pages/Saga';
import MiLista from './pages/MiLista';
import Privacidad from './pages/Privacidad';
import { Vacio } from './components/ui';
import { Clapperboard } from 'lucide-react';

function NoEncontrada() {
  return (
    <Vacio icono={<Clapperboard className="h-6 w-6" />} titulo="Esta escena no existe" texto="La página que buscás no está.">
      <Link to="/" className="inline-flex h-12 items-center rounded-full bg-rojo px-6 font-semibold text-white">Ir al inicio</Link>
    </Vacio>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Inicio />} />
          <Route path="/buscar" element={<Buscar />} />
          <Route path="/titulo/:id" element={<TituloDetalle />} />
          <Route path="/azar" element={<Azar />} />
          <Route path="/comparar" element={<Comparar />} />
          <Route path="/saga" element={<Saga />} />
          <Route path="/mi-lista" element={<MiLista />} />
          <Route path="/privacidad" element={<Privacidad />} />
          <Route path="*" element={<NoEncontrada />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
