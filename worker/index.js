// Proxy de OMDb: la API key vive como secreto del Worker (OMDB_API_KEY), nunca en el navegador.
// Las respuestas se guardan en la caché de Cloudflare un día para no gastar el límite diario.
const PERMITIDOS = ['s', 'i', 't', 'type', 'y', 'page', 'plot'];

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    if (url.pathname !== '/api/omdb') return env.ASSETS.fetch(request);
    if (request.method !== 'GET') return new Response('Método no permitido', { status: 405 });

    const destino = new URL('https://www.omdbapi.com/');
    for (const k of PERMITIDOS) {
      const v = url.searchParams.get(k);
      if (v) destino.searchParams.set(k, v.slice(0, 120));
    }
    if (!destino.searchParams.has('s') && !destino.searchParams.has('i') && !destino.searchParams.has('t')) {
      return Response.json({ Response: 'False', Error: 'Falta la búsqueda' }, { status: 400 });
    }

    const cache = caches.default;
    const llave = new Request(destino.toString());
    const guardada = await cache.match(llave);
    if (guardada) return guardada;

    destino.searchParams.set('apikey', env.OMDB_API_KEY);
    const r = await fetch(destino.toString(), { cf: { cacheTtl: 86400 } });
    const cuerpo = await r.text();
    const respuesta = new Response(cuerpo, {
      status: r.status,
      headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'public, max-age=86400' },
    });
    if (r.ok) ctx.waitUntil(cache.put(llave, respuesta.clone()));
    return respuesta;
  },
};
