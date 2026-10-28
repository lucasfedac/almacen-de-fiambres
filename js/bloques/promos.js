/*
  BLOQUE: PROMOS
  Tarjetas con la foto y el precio. Cada promo se suma al pedido por unidades
  (el mismo pedido que usan los productos; se envía desde el panel "Mi pedido").
  Textos: data/sitio.js → promos.   Promos y precios: data/promos.js
  Si no hay ninguna promo vigente, la sección no se muestra.
*/
(function () {
  'use strict';
  const F = window.Fiambreria;
  const { h, icono, formatoPesos, formatoFecha, promoVigente } = F.util;
  const pedido = F.pedido;

  const UNIDADES = { combo: 'combo', kilo: 'por kilo', '100g': 'cada 100 g' };

  /* Botón "Agregar" que se convierte en [−  × 2  +] cuando la promo está en el pedido */
  function crearControl(p) {
    const btnAgregar = h('button', {
      type: 'button', class: 'boton boton--agregar', 'aria-label': 'Agregar ' + p.titulo + ' al pedido',
      onclick() { pedido.agregarPromo(p.id); btnMas.focus(); }
    }, icono('mas', { tam: 18 }), 'Agregar');

    const valor = h('span', { class: 'paso__valor' });
    const btnMenos = h('button', {
      type: 'button', class: 'paso__boton', 'aria-label': 'Sacar una unidad de ' + p.titulo,
      onclick() {
        const eraUltima = pedido.unidadesPromo(p.id) <= 1;
        pedido.cambiarPromo(p.id, -1);
        if (eraUltima) btnAgregar.focus();
      }
    }, icono('menos', { tam: 18 }));
    const btnMas = h('button', {
      type: 'button', class: 'paso__boton', 'aria-label': 'Sumar una unidad de ' + p.titulo,
      onclick() { pedido.cambiarPromo(p.id, +1); }
    }, icono('mas', { tam: 18 }));

    const paso = h('div', { class: 'paso', role: 'group', 'aria-label': 'Cantidad de ' + p.titulo }, btnMenos, valor, btnMas);
    const el = h('div', { class: 'promo__control' }, btnAgregar, paso);

    function actualizar() {
      const u = pedido.unidadesPromo(p.id);
      btnAgregar.hidden = u > 0;
      paso.hidden = u === 0;
      valor.textContent = '× ' + u;
      btnMas.disabled = u >= pedido.MAX_UNIDADES;
      el.closest('.promo')?.classList.toggle('promo--en-pedido', u > 0);
    }
    return { el, actualizar };
  }

  function vigentes(items) {
    const activas = items.filter(promoVigente);
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

      const controles = new Map();
      const visibles = t.visiblesAlInicio > 0 ? t.visiblesAlInicio : promos.length;

      function tarjeta(p) {
        const control = crearControl(p);
        controles.set(p.id, control);
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
            control.el
          )
        );
      }

      const tarjetas = promos.map(tarjeta);
      pedido.suscribir(() => controles.forEach((c) => c.actualizar()));
      controles.forEach((c) => c.actualizar());
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
