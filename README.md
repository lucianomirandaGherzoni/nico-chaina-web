# nico-chaina-web

Landing de Nicolás Chaina · Terapias holísticas (Córdoba y online).

Sitio estático: HTML, CSS y JavaScript sin dependencias ni build. Para verlo, abrir `index.html` o servir la carpeta con cualquier servidor estático.

## Estructura

- `index.html`: página única.
- `css/estilos.css`: estilos, mobile-first (desktop desde 900px).
- `js/principal.js`: menú, rueda medicinal, testimonios, formulario de reserva por WhatsApp, animaciones al hacer scroll y reproducción de videos.
- `imagenes/`, `video/`: recursos optimizados para web.
- `robots.txt`, `sitemap.xml`.

Los originales de alta resolución van en `img/`, que no se versiona.

## Pendiente antes de publicar

- Número de WhatsApp real en `js/principal.js` (`TELEFONO_WHATSAPP`).
- Si se usa un dominio propio, reemplazar `https://nico-chaina-web.vercel.app` en `index.html`, `robots.txt` y `sitemap.xml`.
- Usuario de TikTok en el pie (`index.html`).
- Textos de la Rueda Medicinal (`js/principal.js`).
