import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { readFileSync } from 'node:fs';

// En local, /api/omdb va directo a OMDb con la key de .dev.vars (en producción lo hace el Worker).
function keyLocal() {
  try {
    return readFileSync('.dev.vars', 'utf8').match(/OMDB_API_KEY=(.+)/)?.[1].trim() ?? '';
  } catch {
    return '';
  }
}

export default defineConfig({
  plugins: [react()],
  optimizeDeps: { exclude: ['lucide-react'] },
  server: {
    proxy: {
      '/api/omdb': {
        target: 'https://www.omdbapi.com',
        changeOrigin: true,
        rewrite: (p) => p.replace(/^\/api\/omdb\??/, `/?apikey=${keyLocal()}&`),
      },
    },
  },
});
