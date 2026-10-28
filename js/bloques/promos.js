/*
  BLOQUE: PROMOS
  Tarjetas con la foto, el precio y un botón que abre WhatsApp con el pedido de esa promo.
  Textos: data/sitio.js → promos.   Promos y precios: data/promos.js
  Si no hay ninguna promo vigente, la sección no se muestra.
*/
(function () {
  'use strict';
  const F = window.Fiambreria;
  const { h, icono, formatoPesos, formatoFecha, linkWhatsApp } = F.util;

  const UNIDADES = { combo: 'combo', kilo: 'por kilo', '100g': 'cada 100 g' };

  // Fecha de hoy en Argentina, como "AAAA-MM-DD" (para comparar con "hasta")
  function hoyEnArgentina() {
    return new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Argentina/Buenos_Aires' }).format(new Date());
  }

  function vigentes(items) {
    const hoy = hoyEnArgentina();
    const activas = items.filter((p) => !p.hasta || p.hasta >= hoy);
    // las destacadas primero; entre iguales se respeta el orden del archivo
    return [...activas.filter((p) => p.destacada), ...activas.filter((p) => !p.destacada)];
  }

  F.bloques.promos = {
    id: 'promos',
    menu: 'Promos',
    montar(seccion) {
      const t = F.datos.sitio.promos;
      const promos = vigentes(F.datos.promos.items);
      if (!promos.length) return false; // main.js omite la sección (y su lugar en el menú)

      const numero = F.datos.sitio.whatsapp;
      const visibles = t.visiblesAlInicio > 0 ? t.visiblesAlInicio : promos.length;

      function mensajeDe(p) {
        return t.mensaje.replace('{promo}', () => p.titulo).replace('{precio}', () => formatoPesos(p.precio));
      }

      function tarjeta(p) {
        const url = linkWhatsApp(numero, mensajeDe(p));
        return h('li', { class: 'promo' + (p.destacada ? ' promo--destacada' : '') },
          p.imagen ? h('img', {
            class: 'promo__foto', src: p.imagen, alt: p.titulo + ': ' + p.descripcion, width: 800, height: 800, loading: 'lazy'
          }) : null,
          h('div', { class: 'promo__cuerpo' },
            p.destacada ? h('span', { class: 'promo__etiqueta', texto: 'Destacada' }) : null,
            h('h3', { class: 'promo__titulo', texto: p.titulo }),
            p.descripcion ? h('p', { class: 'promo__desc', texto: p.descripcion }) : null,
            h('p', { class: 'promo__precio' },
              h('strong', { class: 'promo__importe', texto: formatoPesos(p.precio) }),
              h('span', { class: 'promo__unidad', texto: UNIDADES[p.unidad] || '' })
            ),
            p.hasta ? h('p', { class: 'promo__vigencia', texto: 'Hasta el ' + formatoFecha(p.hasta) }) : null,
            url ? h('a', { class: 'boton boton--whatsapp boton--ancho', href: url, target: '_blank', rel: 'noopener noreferrer' },
              icono('whatsapp', { tam: 20 }), t.boton
            ) : null
          )
        );
      }

      const tarjetas = promos.map(tarjeta);
      tarjetas.slice(visibles).forEach((li) => { li.hidden = true; });

      const hijos = [
        h('div', { class: 'promos__cabecera' },
          h('h2', { id: 'promos-titulo', texto: t.titulo }),
          h('p', { class: 'promos__bajada', texto: t.bajada })
        ),
        h('ul', { class: 'promos__rejilla' }, tarjetas)
      ];

      if (promos.length > visibles) {
        const boton = h('button', {
          type: 'button', class: 'boton boton--contorno promos__mas',
          onclick() {
            tarjetas.forEach((li) => { li.hidden = false; });
            boton.remove();
            F.util.avisar('Se muestran las ' + promos.length + ' promos.');
          }
        }, t.botonVerMas + ' (' + (promos.length - visibles) + ')');
        hijos.push(h('div', { class: 'promos__pie' }, boton));
      }

      seccion.setAttribute('aria-labelledby', 'promos-titulo');
      seccion.append(h('div', { class: 'contenedor' }, hijos));
    }
  };
})();
