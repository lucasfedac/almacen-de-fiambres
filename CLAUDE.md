# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Static site (HTML + CSS + vanilla JS, no dependencies) for a Spanish-speaking deli ("Almacén de Fiambres"). Users build an order in the browser and send it via WhatsApp. UI text, comments and data are in Spanish; keep new user-facing text in Spanish.

## Commands

- No build, lint, package manager or test suite. Nothing to install.
- Run locally: `python3 servidor-dev.py` (serves the repo at `http://localhost:8000` with `Cache-Control: no-store`; optional args: port, host). Prefer it over plain `python3 -m http.server`, whose browser caching can mix old and new `.js` files and make a block fail with errors like `X is not a function`. Opening `index.html` directly via `file://` is not how the site is meant to be tested (the README says it should behave like production).
- Production caching: `.htaccess` and `_headers` make html/js/css/data revalidate on every visit (fonts cache for a year); keep any new asset folder consistent with that.
- Verify changes in the browser console: the app logs data problems as `[Sitio] ...` warnings (see `validarDatos()` in `js/main.js`).

## Architecture

**Boot sequence.** `index.html` loads every script with `defer`, in this order: `js/core/namespace.js` → `data/*.js` → `js/core/*.js` → `js/bloques/*.js` → `js/main.js`. Order matters because each file attaches to the global `window.Fiambreria` namespace (`F`):
- `F.datos` — content from `data/` (`sitio`, `productos`, `sucursales`, `mayoristas`).
- `F.util` — helpers in `js/core/util.js` (`h()` DOM builder, formatting, WhatsApp links, URL checks, localStorage wrappers, opening hours).
- `F.pedido` — the order ("carrito") state in `js/core/estado-pedido.js`, persisted to localStorage (`fiambreria.pedido.v2`, with the old `v1` read once for migration) and re-validated against the catalog on load. It holds two separate maps: products (grams) and promos (units, `MAX_UNIDADES` = 20), so ids never collide; promo prices always come from `data/promos.js`, and expired promos (`hasta`) are dropped on restore and by `depurar()`.
- `F.bloques` — one registered object per section, `{ id, menu, montar(contenedor, ctx) }`.
- `F.ui` — small cross-block hooks (e.g. `F.ui.abrirPedido` set by the pedido block, called by the header button).

**Sections are blocks.** `js/main.js` reads `data/sitio.js → bloques` to decide which sections render and in what order; it creates a `<section class="bloque bloque--NAME">` per block and calls its `montar`. A block that throws is caught and removed, so the rest of the page still works. Fixed zones (`encabezado`, `pie`, `pedido`, `boton-whatsapp`) are mounted separately in `main.js` and receive the menu built from the other blocks via `ctx`. Adding a section requires its JS file, a `<script>` tag in `index.html`, its CSS (if any) in `index.html`, and its name in `data/sitio.js`.

**Styling.** `css/tokens.css` holds the brand variables (colors, fonts, sizes) and is the place to re-theme. `base.css` and `componentes.css` are shared; `css/bloques/*.css` mirrors `js/bloques/*.js` one-to-one.

**Security constraints (do not break these).**
- Build DOM with `h('tag', { texto: ... }, ...children)`. Never use `innerHTML`, `eval`, inline `<script>` or `style="..."` attributes — `index.html` ships a strict CSP (`script-src 'self'`, `style-src 'self'`, etc.) and the same policy is duplicated in `_headers` and `.htaccess`. If you add an external service (fonts, maps, analytics), the CSP in all three places must be updated deliberately.
- Links go through `esUrlSegura()`; external links use `noopener`.
- The order is assembled client-side and sent to WhatsApp; there is no backend. Free-text fields are cleaned with `limpiarTexto()` before building the message.

**Promos.** `data/promos.js` + `js/bloques/promos.js`: promos are combos added to the same order as products (counted in units, shown as "2 × Promo 4" in the ticket and WhatsApp message, never "aprox."). A block's `montar` may return `false` to be omitted from the page and the menu (used when no promo is current).

**Prices and ordering model.** Products are priced per `porcion` (50 or 100 g); the cart always adds/removes in steps of 50 g (`PASO`), capped at 5000 g per product. Subtotal = `precio × gramos / porcion`. Each branch (`data/sucursales.js`) can have its own WhatsApp number; `whatsappDeSucursal()` falls back to the global one in `data/sitio.js`.

**Wholesale list.** `data/mayoristas.js` is public source code. Hiding prices behind a client-side check is not real protection — the README explains the two supported modes (public prices, or empty `items` with `mostrarPrecios: false`).

## Editing guidance

- The `data/` folder is the editing surface for the owner; prefer changing data over code when the request is about content.
- Content comments and README are written for a non-developer owner in Spanish (voseo). Keep that tone when editing them.
- `README.md` section 7 is the pre-launch checklist; it is not a source of code behavior.
