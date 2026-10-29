/*
  BLOQUE: HERO (portada)
  Banner con foto de fondo (efecto parallax al hacer scroll), título, botones y tres frases cortas.
  Textos: data/sitio.js → hero.   Foto: img/banner.webp
*/
(function () {
  'use strict';
  const F = window.Fiambreria;
  const { h } = F.util;

  /* La foto se desplaza más lento que la página, sin salirse de la sección */
  const FACTOR = 0.2; // 0 = quieta, 1 = acompaña el scroll (la foto mide 120% del alto para tener margen)

  function parallax(seccion, foto) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let pendiente = false;
    function mover() {
      pendiente = false;
      const alto = seccion.offsetHeight;
      const y = Math.min(Math.max(window.scrollY - seccion.offsetTop, 0), alto);
      foto.style.transform = 'translate3d(0,' + Math.round(y * FACTOR) + 'px,0)';
    }
    function pedir() {
      if (!pendiente) { pendiente = true; requestAnimationFrame(mover); }
    }
    window.addEventListener('scroll', pedir, { passive: true });
    window.addEventListener('resize', pedir);
    mover();
  }

  F.bloques.hero = {
    id: 'inicio',
    menu: null,
    montar(seccion) {
      const t = F.datos.sitio.hero;

      /* ----- Foto de fondo (si no hay foto o no carga, queda el fondo oscuro liso) ----- */
      const fondo = h('div', { class: 'hero__fondo', 'aria-hidden': 'true' });
      if (t.imagen) {
        const foto = h('img', {
          class: 'hero__foto', src: t.imagen, alt: '', width: 1600, height: 800, fetchpriority: 'high',
          onerror() { this.remove(); }
        });
        fondo.append(foto, h('div', { class: 'hero__velo' }));
        parallax(seccion, foto);
      }

      const boton = (cfg, clase) => (cfg && cfg.texto ? h('a', { class: 'boton ' + clase, href: cfg.destino || '#', texto: cfg.texto }) : null);

      seccion.setAttribute('aria-labelledby', 'hero-titulo');
      seccion.append(
        fondo,
        h('div', { class: 'contenedor hero__contenido' },
          h('div', { class: 'hero__texto' },
            h('h1', { id: 'hero-titulo', class: 'hero__titulo', texto: t.titulo }),
            h('p', { class: 'hero__bajada', texto: t.bajada }),
            h('div', { class: 'hero__acciones' }, boton(t.botonPrincipal, 'boton--primario'), boton(t.botonSecundario, 'boton--contorno')),
            h('ul', { class: 'hero__puntos' },
              (t.puntos || []).map((p) => h('li', null, h('strong', { texto: p.titulo }), h('span', { texto: p.texto })))
            )
          )
        )
      );
    }
  };
})();
