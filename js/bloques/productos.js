/*
  BLOQUE: PRODUCTOS
  Lista tipo "carta" agrupada por categoría, con buscador y filtros.
  Cada producto se suma al pedido de a 50 g.
  Los productos se cargan en data/productos.js
*/
(function () {
  'use strict';
  const F = window.Fiambreria;
  const { h, vaciar, icono, formatoPesos, formatoGramos, normalizar, limpiarTexto, debounce, linkWhatsApp, avisar } = F.util;
  const pedido = F.pedido;

  /* Botón "Agregar" que se convierte en [−  150 g  +] cuando el producto está en el pedido */
  function crearControl(p) {
    const btnAgregar = h('button', {
      type: 'button', class: 'boton boton--agregar', 'aria-label': 'Agregar ' + p.nombre + ' al pedido',
      onclick() { pedido.agregar(p.id); btnMas.focus(); }
    }, icono('mas', { tam: 18 }), 'Agregar');

    const valor = h('span', { class: 'paso__valor' });
    const btnMenos = h('button', {
      type: 'button', class: 'paso__boton', 'aria-label': 'Sacar ' + formatoGramos(pedido.PASO) + ' de ' + p.nombre,
      onclick() {
        const eraUltimaPorcion = pedido.gramos(p.id) <= pedido.PASO;
        pedido.cambiar(p.id, -1);
        if (eraUltimaPorcion) btnAgregar.focus();
      }
    }, icono('menos', { tam: 18 }));
    const btnMas = h('button', {
      type: 'button', class: 'paso__boton', 'aria-label': 'Sumar ' + formatoGramos(pedido.PASO) + ' de ' + p.nombre,
      onclick() { pedido.cambiar(p.id, +1); }
    }, icono('mas', { tam: 18 }));

    const paso = h('div', { class: 'paso', role: 'group', 'aria-label': 'Cantidad de ' + p.nombre }, btnMenos, valor, btnMas);
    const el = h('div', { class: 'producto__control' }, btnAgregar, paso);

    function actualizar() {
      const g = pedido.gramos(p.id);
      btnAgregar.hidden = g > 0;
      paso.hidden = g === 0;
      valor.textContent = formatoGramos(g);
      btnMas.disabled = g >= pedido.MAX_GRAMOS;
      el.closest('.producto')?.classList.toggle('producto--en-pedido', g > 0);
    }
    return { el, actualizar };
  }

  F.bloques.productos = {
    id: 'productos',
    menu: 'Productos',
    montar(seccion) {
      const textos = F.datos.sitio.productos;
      const categorias = F.datos.productos.categorias;
      const items = F.datos.productos.items;
      const estado = { categoria: 'todas', busqueda: '' };
      let controles = new Map();
      let primeraVez = true;

      const lista = h('div', { class: 'productos__lista' });

      /* ----- Filas ----- */
      function fila(p) {
        const agotado = p.disponible === false;
        const kilo = Math.round((p.precio * 1000) / p.porcion);
        const control = agotado ? null : crearControl(p);
        const li = h('li', { class: 'producto' + (p.imagen ? ' producto--foto' : '') + (agotado ? ' producto--agotado' : '') },
          p.imagen ? h('img', {
            class: 'producto__foto', src: p.imagen, alt: '', width: 72, height: 72, loading: 'lazy',
            onerror() { this.remove(); li.classList.remove('producto--foto'); }
          }) : null,
          h('div', { class: 'producto__info' },
            h('h4', { class: 'producto__nombre', texto: p.nombre }),
            p.descripcion ? h('p', { class: 'producto__desc', texto: p.descripcion }) : null,
            h('p', { class: 'producto__precio' },
              h('strong', { class: 'producto__importe', texto: formatoPesos(p.precio) }),
              h('span', { class: 'producto__unidad', texto: ' cada ' + p.porcion + ' g' }),
              h('span', { class: 'producto__kilo', texto: formatoPesos(kilo) + ' el kg' })
            )
          ),
          agotado ? h('p', { class: 'producto__agotado', texto: 'Sin stock' }) : control.el
        );
        if (control) controles.set(p.id, control);
        return li;
      }

      /* ----- Filtro ----- */
      function coincide(p) {
        if (estado.categoria !== 'todas' && p.categoria !== estado.categoria) return false;
        const q = normalizar(estado.busqueda);
        if (!q) return true;
        return normalizar(p.nombre + ' ' + (p.descripcion || '')).includes(q);
      }

      function vacio() {
        const buscado = limpiarTexto(estado.busqueda, 40);
        if (!buscado) {
          return h('p', { class: 'productos__vacio', texto: 'Todavía no hay productos cargados en esta categoría.' });
        }
        const enlace = linkWhatsApp(F.datos.sitio.whatsapp, 'Hola! Busco "' + buscado + '" y no lo encontré en la web. ¿Lo tienen?');
        return h('div', { class: 'productos__vacio' },
          h('p', { class: 'productos__vacio-titulo', texto: 'No encontramos “' + buscado + '”.' }),
          h('p', null, 'Probá con otra palabra o ',
            enlace ? h('a', { href: enlace, target: '_blank', rel: 'noopener noreferrer', texto: 'consultanos por WhatsApp' }) : 'consultanos en el local', '.')
        );
      }

      function dibujar() {
        controles = new Map();
        vaciar(lista);
        const idsConocidos = new Set(categorias.map((c) => c.id));
        const grupos = categorias.map((c) => ({ id: c.id, nombre: c.nombre, productos: items.filter((p) => p.categoria === c.id && coincide(p)) }));
        const sueltos = items.filter((p) => !idsConocidos.has(p.categoria) && coincide(p));
        if (sueltos.length && estado.categoria === 'todas') grupos.push({ id: 'otros', nombre: 'Otros', productos: sueltos });

        let total = 0;
        for (const g of grupos) {
          if (!g.productos.length) continue;
          total += g.productos.length;
          lista.append(
            h('div', { class: 'grupo' },
              h('h3', { class: 'grupo__titulo', texto: g.nombre }),
              h('ul', { class: 'grupo__lista' }, g.productos.map(fila))
            )
          );
        }
        if (!total) lista.append(vacio());
        controles.forEach((c) => c.actualizar());
        if (!primeraVez) avisar(total === 1 ? '1 producto' : total + ' productos');
        primeraVez = false;
      }

      F.pedido.suscribir(() => controles.forEach((c) => c.actualizar()));

      /* ----- Buscador y chips ----- */
      const campoBusqueda = h('input', {
        type: 'search', class: 'buscador__campo', id: 'buscador', placeholder: textos.buscador || 'Buscar producto',
        autocomplete: 'off', maxlength: 40, 'aria-label': textos.buscador || 'Buscar producto'
      });
      campoBusqueda.addEventListener('input', debounce(() => { estado.busqueda = campoBusqueda.value; dibujar(); }, 150));

      const botonesChip = [];
      function chip(id, nombre) {
        const b = h('button', {
          type: 'button', class: 'chip', 'aria-pressed': String(id === estado.categoria), texto: nombre,
          onclick() {
            estado.categoria = id;
            botonesChip.forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
            dibujar();
          }
        });
        botonesChip.push(b);
        return b;
      }
      const chips = h('div', { class: 'chips', role: 'group', 'aria-label': 'Categorías' },
        chip('todas', 'Todos'), categorias.map((c) => chip(c.id, c.nombre))
      );

      seccion.setAttribute('aria-labelledby', 'productos-titulo');
      seccion.append(
        h('div', { class: 'contenedor' },
          h('div', { class: 'productos__cabecera' },
            h('h2', { id: 'productos-titulo', texto: textos.titulo }),
            h('p', { class: 'productos__bajada', texto: textos.bajada })
          ),
          h('div', { class: 'productos__filtros' },
            h('div', { class: 'buscador' }, icono('buscar', { tam: 18 }), campoBusqueda),
            chips
          ),
          lista,
          textos.nota ? h('p', { class: 'productos__nota', texto: textos.nota }) : null
        )
      );
      dibujar();
    }
  };
})();
