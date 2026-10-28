/*
  BLOQUE: ENCABEZADO
  Logo, menú de secciones (se arma solo con los bloques activos),
  botón "Mi pedido" y menú desplegable en celular.
*/
(function () {
  'use strict';
  const F = window.Fiambreria;
  const { h, icono, formatoPesos } = F.util;

  F.bloques.encabezado = {
    montar(contenedor, ctx) {
      const sitio = F.datos.sitio;

      /* ----- Logo (o nombre en texto si no hay logo o no carga) ----- */
      const marcaTexto = () => h('span', { class: 'logo__texto', texto: sitio.nombre });
      let marca;
      if (sitio.logo) {
        marca = h('img', {
          class: 'logo__img', src: sitio.logo, alt: sitio.nombre, height: sitio.logoAlto || 44,
          onerror() { this.replaceWith(marcaTexto()); }
        });
      } else {
        marca = marcaTexto();
      }
      const logo = h('a', { class: 'logo', href: '#', 'aria-label': sitio.nombre + ', ir al inicio' }, marca);

      /* ----- Menú ----- */
      const enlaces = ctx.menu.map((m) =>
        h('li', null, h('a', { class: 'menu__enlace', href: '#' + m.id, 'data-seccion': m.id, texto: m.texto }))
      );
      const menu = h('nav', { class: 'menu', id: 'menu-principal', 'aria-label': 'Principal' }, h('ul', { class: 'menu__lista' }, enlaces));

      /* ----- Botón "Mi pedido" ----- */
      const cuenta = h('span', { class: 'boton-pedido__cuenta', 'aria-hidden': 'true' });
      const monto = h('span', { class: 'boton-pedido__monto', 'aria-hidden': 'true' });
      const botonPedido = h('button', { type: 'button', class: 'boton-pedido', 'aria-haspopup': 'dialog' },
        icono('bolsa', { tam: 20 }), h('span', { class: 'boton-pedido__texto', texto: 'Mi pedido' }), cuenta, monto,
        h('span', { class: 'solo-lectores', id: 'boton-pedido-lector' })
      );
      botonPedido.addEventListener('click', () => { if (F.ui.abrirPedido) F.ui.abrirPedido(); });

      let cantidadPrevia = F.pedido.cantidad();
      function actualizarPedido() {
        const n = F.pedido.cantidad();
        cuenta.textContent = String(n);
        cuenta.classList.toggle('boton-pedido__cuenta--vacia', n === 0);
        monto.textContent = n ? formatoPesos(F.pedido.total()) : '';
        botonPedido.querySelector('#boton-pedido-lector').textContent =
          n ? ', ' + n + (n === 1 ? ' artículo, ' : ' artículos, ') + formatoPesos(F.pedido.total()) : ', vacío';
        if (n !== cantidadPrevia) {
          botonPedido.classList.remove('boton-pedido--salta');
          void botonPedido.offsetWidth; // reinicia la animación
          botonPedido.classList.add('boton-pedido--salta');
        }
        cantidadPrevia = n;
      }
      F.pedido.suscribir(actualizarPedido);
      actualizarPedido();

      /* ----- Botón de menú (celular) ----- */
      const botonMenu = h('button', {
        type: 'button', class: 'boton-menu', 'aria-expanded': 'false', 'aria-controls': 'menu-principal', 'aria-label': 'Abrir menú'
      }, icono('menu', { tam: 24 }));

      function alternarMenu(abrir) {
        const abierto = typeof abrir === 'boolean' ? abrir : botonMenu.getAttribute('aria-expanded') !== 'true';
        botonMenu.setAttribute('aria-expanded', String(abierto));
        botonMenu.setAttribute('aria-label', abierto ? 'Cerrar menú' : 'Abrir menú');
        contenedor.classList.toggle('encabezado--menu-abierto', abierto);
      }
      botonMenu.addEventListener('click', () => alternarMenu());
      menu.addEventListener('click', (e) => { if (e.target.closest('a')) alternarMenu(false); });
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && contenedor.classList.contains('encabezado--menu-abierto')) {
          alternarMenu(false);
          botonMenu.focus();
        }
      });

      contenedor.classList.add('encabezado');
      contenedor.append(
        h('div', { class: 'contenedor encabezado__interior' }, logo, menu, h('div', { class: 'encabezado__acciones' }, botonPedido, botonMenu))
      );

      /* ----- Resalta la sección que se está viendo ----- */
      if ('IntersectionObserver' in window) {
        const porId = new Map();
        contenedor.querySelectorAll('[data-seccion]').forEach((a) => porId.set(a.getAttribute('data-seccion'), a));
        const observador = new IntersectionObserver((entradas) => {
          for (const entrada of entradas) {
            if (!entrada.isIntersecting) continue;
            porId.forEach((a, id) => {
              if (id === entrada.target.id) a.setAttribute('aria-current', 'true');
              else a.removeAttribute('aria-current');
            });
          }
        }, { rootMargin: '-35% 0px -60% 0px' });
        porId.forEach((a, id) => {
          const seccion = document.getElementById(id);
          if (seccion) observador.observe(seccion);
        });
      }
    }
  };
})();
