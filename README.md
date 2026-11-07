# CineHub

Buscador de películas y series en español: **https://cine.neuralcodelab.com**

- **Buscar** cualquier título (filtros por tipo y año) con datos de IMDb vía [OMDb API](https://www.omdbapi.com/).
- **Detalle** con notas de IMDb, Rotten Tomatoes y Metacritic, reparto, taquilla y premios; enlace propio para compartir.
- **Al azar**: una película popular para cuando no sabés qué ver.
- **Comparar** dos títulos frente a frente y ver quién gana.
- **Sagas**: todas las películas de una saga en una línea de tiempo por década.
- **Mi lista**: pendientes y vistas con tu propia calificación (se guarda en el navegador).

React 18 + Vite + Tailwind, en Cloudflare Workers. La API key de OMDb **no está en el código**: la usa un Worker
(`worker/index.js`) como secreto y cachea las respuestas un día.

## Local

```bash
npm install
echo "OMDB_API_KEY=tu_key" > .dev.vars   # key gratis en omdbapi.com/apikey.aspx
npm run dev
```

## Publicar

```bash
npm run build && npx wrangler deploy
npx wrangler secret put OMDB_API_KEY      # solo la primera vez o para cambiarla
```
