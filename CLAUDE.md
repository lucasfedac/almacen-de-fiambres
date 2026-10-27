# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Static site (HTML + CSS + vanilla JS, no dependencies) for a Spanish-speaking deli ("Almacén de Fiambres"). Users build an order in the browser and send it via WhatsApp. UI text, comments and data are in Spanish; keep new user-facing text in Spanish.

## Commands

- No build, lint, package manager or test suite. Nothing to install.
- Run locally: `python3 -m http.server 8000` from the repo root, then open `http://localhost:8000`. Opening `index.html` directly via `file://` is not how the site is meant to be tested (the README says it should behave like production).
- Verify changes in the browser console: the app logs data problems as `[Sitio] ...` warnings (see `validarDatos()` in `js/main.js`).

## Architecture

**Boot sequence.** `index.html` loads every script with `defer`, in this order: `js/core/namespace.js` → `data/*.js` → `js/core/*.js` → `js/bloques/*.js` → `js/main.js`. Order matters because each file attaches to the global `window.Fiambreria` namespace (`F`):
- `F.datos` — content from `data/` (`sitio`, `productos`, `sucursales`, `mayoristas`).
- `F.util` — helpers in `js/core/util.js` (`h()` DOM builder, formatting, WhatsApp links, URL checks, localStorage wrappers, opening hours).
- `F.pedido` — the order ("carrito") state in `js/core/estado-pedido.js`, persisted to localStorage and re-validated against the catalog on load.
- `F.bloques` — one registered object per section, `{ id, menu, montar(contenedor, ctx) }`.
- `F.ui` — small cross-block hooks (e.g. `F.ui.abrirPedido` set by the pedido block, called by the header button).

**Sections are blocks.** `js/main.js` reads `data/sitio.js → bloques` to decide which sections render and in what order; it creates a `<section class="bloque bloque--NAME">` per block and calls its `montar`. A block that throws is caught and removed, so the rest of the page still works. Fixed zones (`encabezado`, `pie`, `pedido`, `boton-whatsapp`) are mounted separately in `main.js` and receive the menu built from the other blocks via `ctx`. Adding a section requires its JS file, a `<script>` tag in `index.html`, its CSS (if any) in `index.html`, and its name in `data/sitio.js`.

**Styling.** `css/tokens.css` holds the brand variables (colors, fonts, sizes) and is the place to re-theme. `base.css` and `componentes.css` are shared; `css/bloques/*.css` mirrors `js/bloques/*.js` one-to-one.

**Security constraints (do not break these).**
- Build DOM with `h('tag', { texto: ... }, ...children)`. Never use `innerHTML`, `eval`, inline `<script>` or `style="..."` attributes — `index.html` ships a strict CSP (`script-src 'self'`, `style-src 'self'`, etc.) and the same policy is duplicated in `_headers` and `.htaccess`. If you add an external service (fonts, maps, analytics), the CSP in all three places must be updated deliberately.
- Links go through `esUrlSegura()`; external links use `noopener`.
- The order is assembled client-side and sent to WhatsApp; there is no backend. Free-text fields are cleaned with `limpiarTexto()` before building the message.

**Prices and ordering model.** Products are priced per `porcion` (50 or 100 g); the cart always adds/removes in steps of 50 g (`PASO`), capped at 5000 g per product. Subtotal = `precio × gramos / porcion`. Each branch (`data/sucursales.js`) can have its own WhatsApp number; `whatsappDeSucursal()` falls back to the global one in `data/sitio.js`.

**Wholesale list.** `data/mayoristas.js` is public source code. Hiding prices behind a client-side check is not real protection — the README explains the two supported modes (public prices, or empty `items` with `mostrarPrecios: false`).

## Editing guidance

- The `data/` folder is the editing surface for the owner; prefer changing data over code when the request is about content.
- Content comments and README are written for a non-developer owner in Spanish (voseo). Keep that tone when editing them.
- `README.md` section 7 is the pre-launch checklist; it is not a source of code behavior.
