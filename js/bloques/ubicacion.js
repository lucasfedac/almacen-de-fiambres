/*
  BLOQUE: UBICACIÓN
  Un mapa de Google Maps por sucursal, con el nombre arriba, al final de la página.
  El mapa de cada una se carga en data/sucursales.js → mapaEmbed
*/
(function () {
  'use strict';
  const F = window.Fiambreria;
  const { h, icono, linkMapa } = F.util;

  const PREFIJO_EMBED = 'https://www.google.com/maps/embed';

  F.bloques.ubicacion = {
    id: 'ubicacion',
    menu: 'Cómo llegar',
    montar(seccion) {
      const t = F.datos.sitio.ubicacion;
      // Solo se aceptan embeds oficiales de Google Maps; si ninguna sucursal tiene, se omite el bloque
      const conMapa = F.datos.sucursales.filter((s) => typeof s.mapaEmbed === 'string' && s.mapaEmbed.startsWith(PREFIJO_EMBED));
      if (!conMapa.length) return false;

      function ficha(s) {
        return h('article', { class: 'ubicacion__ficha' },
          h('h3', { class: 'ubicacion__nombre', texto: s.nombre }),
          h('p', { class: 'ubicacion__direccion', texto: [s.direccion, s.localidad].filter(Boolean).join(', ') }),
          h('div', { class: 'ubicacion__mapa' },
            h('iframe', {
              src: s.mapaEmbed,
              title: 'Mapa de ' + s.nombre,
              loading: 'lazy',
              allowfullscreen: true,
              referrerpolicy: 'strict-origin-when-cross-origin'
            })
          ),
          h('a', { class: 'boton boton--contorno ubicacion__enlace', href: linkMapa(s), target: '_blank', rel: 'noopener noreferrer' },
            icono('ubicacion', { tam: 18 }), 'Abrir en Google Maps')
        );
      }

      seccion.setAttribute('aria-labelledby', 'ubicacion-titulo');
      seccion.append(
        h('div', { class: 'contenedor' },
          h('div', { class: 'ubicacion__cabecera' },
            h('h2', { id: 'ubicacion-titulo', texto: t.titulo }),
            h('p', { class: 'ubicacion__bajada', texto: t.bajada })
          ),
          h('div', { class: 'ubicacion__rejilla' }, conMapa.map(ficha))
        )
      );
    }
  };
})();
