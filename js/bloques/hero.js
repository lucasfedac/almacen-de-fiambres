/*
  BLOQUE: HERO (portada)
  Título, botones, tres frases cortas y el "papelito" con productos destacados.
  Textos: data/sitio.js → hero.   Destacados: data/productos.js → destacado: true
*/
(function () {
  'use strict';
  const F = window.Fiambreria;
  const { h, formatoPesos } = F.util;

  F.bloques.hero = {
    id: 'inicio',
    menu: null,
    montar(seccion) {
      const t = F.datos.sitio.hero;

      /* ----- Foto (o baldosas si no hay foto o no carga) ----- */
      const arco = h('div', { class: 'hero__arco' });
      if (t.imagen) {
        arco.append(h('img', {
          class: 'hero__foto', src: t.imagen, alt: t.imagenAlt || '', width: 640, height: 800,
          onerror() { this.remove(); arco.classList.add('hero__arco--baldosas'); }
        }));
      } else {
        arco.classList.add('hero__arco--baldosas');
      }

      /* ----- Papelito con destacados ----- */
      const destacados = F.datos.productos.items
        .filter((p) => p.destacado && p.disponible !== false)
        .slice(0, t.cantidadDestacados || 4);

      let papelito = null;
      if (destacados.length) {
        papelito = h('div', { class: 'ticket ticket--mini hero__papelito' },
          h('p', { class: 'ticket__titulo', texto: 'Destacados' }),
          h('ul', { class: 'ticket__lista' },
            destacados.map((p) =>
              h('li', { class: 'ticket__fila' },
                h('span', { class: 'ticket__nombre', texto: p.nombre }),
                h('span', { class: 'ticket__puntos', 'aria-hidden': 'true' }),
                h('span', { class: 'ticket__precio', texto: formatoPesos(p.precio) + ' / ' + p.porcion + ' g' })
              )
            )
          )
        );
      }

      const boton = (cfg, clase) => (cfg && cfg.texto ? h('a', { class: 'boton ' + clase, href: cfg.destino || '#', texto: cfg.texto }) : null);

      seccion.setAttribute('aria-labelledby', 'hero-titulo');
      seccion.append(
        h('div', { class: 'contenedor hero__rejilla' },
          h('div', { class: 'hero__texto' },
            h('h1', { id: 'hero-titulo', class: 'hero__titulo', texto: t.titulo }),
            h('p', { class: 'hero__bajada', texto: t.bajada }),
            h('div', { class: 'hero__acciones' }, boton(t.botonPrincipal, 'boton--primario'), boton(t.botonSecundario, 'boton--contorno')),
            h('ul', { class: 'hero__puntos' },
              (t.puntos || []).map((p) => h('li', null, h('strong', { texto: p.titulo }), h('span', { texto: p.texto })))
            )
          ),
          h('div', { class: 'hero__visual' }, arco, papelito)
        )
      );
    }
  };
})();
