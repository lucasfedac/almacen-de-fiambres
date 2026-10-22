/*
  BLOQUE: CLIENTES PROVEEDORES (mayoristas)
  Beneficios, lista de precios por kilo y botones a WhatsApp.
  Textos: data/sitio.js → mayoristas.   Precios: data/mayoristas.js
*/
(function () {
  'use strict';
  const F = window.Fiambreria;
  const { h, icono, formatoPesos, formatoFecha, linkWhatsApp } = F.util;

  F.bloques.mayoristas = {
    id: 'proveedores',
    menu: 'Proveedores',
    montar(seccion) {
      const t = F.datos.sitio.mayoristas;
      const datos = F.datos.mayoristas;
      const numero = F.datos.sitio.whatsapp;

      const botonWhats = (texto, mensaje, clase) => {
        const url = linkWhatsApp(numero, mensaje);
        return url ? h('a', { class: 'boton ' + clase, href: url, target: '_blank', rel: 'noopener noreferrer' }, icono('whatsapp', { tam: 20 }), texto) : null;
      };

      /* ----- Tabla de precios ----- */
      function crearTabla() {
        const celda = (etiqueta, contenido, clase) => h('td', { 'data-etiqueta': etiqueta, class: clase }, contenido);
        const fecha = formatoFecha(datos.actualizado);
        return h('div', { class: 'precios' },
          h('table', { class: 'tabla' },
            h('caption', { class: 'tabla__titulo' },
              'Lista de precios para proveedores',
              fecha ? h('span', { class: 'tabla__fecha', texto: 'Actualizada el ' + fecha }) : null
            ),
            h('thead', null, h('tr', null,
              h('th', { scope: 'col', texto: 'Producto' }),
              h('th', { scope: 'col', texto: 'Presentación' }),
              h('th', { scope: 'col', texto: 'Mínimo' }),
              h('th', { scope: 'col', class: 'tabla__num', texto: 'Precio por kg' })
            )),
            h('tbody', null, datos.items.map((fila) => h('tr', null,
              h('th', { scope: 'row', 'data-etiqueta': 'Producto', class: 'tabla__producto', texto: fila.producto }),
              celda('Presentación', fila.presentacion),
              celda('Mínimo', fila.minimo),
              celda('Precio por kg', formatoPesos(fila.precioKilo), 'tabla__num tabla__precio')
            )))
          ),
          datos.notaPrecios ? h('p', { class: 'precios__nota', texto: datos.notaPrecios }) : null
        );
      }

      function crearReservado() {
        return h('div', { class: 'precios precios--reservado' },
          h('p', { class: 'precios__reservado-titulo', texto: 'La lista de precios se envía por WhatsApp.' }),
          h('p', { texto: 'Pedila y te la mandamos actualizada, con las presentaciones y mínimos de cada producto.' }),
          botonWhats(t.botonLista, t.mensajeLista, 'boton--whatsapp')
        );
      }

      seccion.setAttribute('aria-labelledby', 'mayoristas-titulo');
      seccion.append(
        h('div', { class: 'contenedor mayoristas__rejilla' },
          h('div', { class: 'mayoristas__texto' },
            h('h2', { id: 'mayoristas-titulo', texto: t.titulo }),
            h('p', { class: 'mayoristas__bajada', texto: t.bajada }),
            h('ul', { class: 'mayoristas__beneficios' },
              (t.beneficios || []).map((b) => h('li', null, icono('tilde', { tam: 20 }), h('span', { texto: b })))
            ),
            h('div', { class: 'mayoristas__acciones' },
              datos.mostrarPrecios ? botonWhats(t.botonLista, t.mensajeLista, 'boton--queso') : null,
              botonWhats(t.botonAlta, t.mensajeAlta, 'boton--contorno-claro')
            )
          ),
          datos.mostrarPrecios ? crearTabla() : crearReservado()
        )
      );
    }
  };
})();
