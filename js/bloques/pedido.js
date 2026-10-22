/*
  BLOQUE: PEDIDO
  Panel lateral con el pedido armado como un ticket de balanza, formulario
  para elegir sucursal y botón que abre WhatsApp con el pedido ya escrito.
  También dibuja la barra "Ver mi pedido" que aparece abajo en el celular.
*/
(function () {
  'use strict';
  const F = window.Fiambreria;
  const {
    h, icono, formatoPesos, formatoGramos, limpiarTexto, linkWhatsApp, whatsappDeSucursal,
    estadoHorario, leerLocal, guardarLocal
  } = F.util;
  const pedido = F.pedido;
  const CLAVE_SUCURSAL = 'fiambreria.sucursal.v1';

  function abrirEnlace(url) {
    const a = h('a', { href: url, target: '_blank', rel: 'noopener noreferrer' });
    document.body.append(a);
    a.click();
    a.remove();
  }

  F.bloques.pedido = {
    montar(contenedor) {
      const sitio = F.datos.sitio;
      const sucursales = F.datos.sucursales;

      /* ================= Ticket ================= */
      const listaTicket = h('ul', { class: 'ticket__lista' });
      const totalEl = h('span', { class: 'ticket__precio ticket__precio--total' });
      const filas = new Map(); // id de producto → elementos de su fila

      function enfocarPrimerControl() {
        const destino = dialogo.querySelector('.ticket .paso__boton:not(:disabled)') || botonVerProductos;
        destino.focus();
      }

      function crearFila(l) {
        const p = l.producto;
        const cant = h('span', { class: 'paso__valor' });
        const precio = h('span', { class: 'ticket__precio' });
        const menos = h('button', {
          type: 'button', class: 'paso__boton paso__boton--chico', 'aria-label': 'Sacar ' + formatoGramos(p.porcion) + ' de ' + p.nombre,
          onclick() {
            const seQuita = pedido.gramos(p.id) <= p.porcion;
            pedido.cambiar(p.id, -1);
            if (seQuita) enfocarPrimerControl();
          }
        }, icono('menos', { tam: 16 }));
        const mas = h('button', {
          type: 'button', class: 'paso__boton paso__boton--chico', 'aria-label': 'Sumar ' + formatoGramos(p.porcion) + ' de ' + p.nombre,
          onclick() { pedido.cambiar(p.id, +1); }
        }, icono('mas', { tam: 16 }));
        const quitar = h('button', {
          type: 'button', class: 'ticket__quitar', 'aria-label': 'Quitar ' + p.nombre + ' del pedido',
          onclick() { pedido.quitar(p.id); enfocarPrimerControl(); }
        }, icono('papelera', { tam: 16 }));

        const el = h('li', { class: 'ticket__linea' },
          h('span', { class: 'ticket__nombre', texto: p.nombre }),
          h('div', { class: 'ticket__detalle' },
            h('div', { class: 'paso paso--ticket', role: 'group', 'aria-label': 'Cantidad de ' + p.nombre }, menos, cant, mas),
            h('span', { class: 'ticket__puntos', 'aria-hidden': 'true' }),
            precio,
            quitar
          )
        );
        return { el, cant, precio, mas };
      }

      const ticket = h('div', { class: 'ticket ticket--pedido' },
        h('p', { class: 'ticket__titulo', texto: 'Detalle del pedido' }),
        listaTicket,
        h('div', { class: 'ticket__total' }, h('span', { class: 'ticket__nombre', texto: 'Total estimado' }), h('span', { class: 'ticket__puntos', 'aria-hidden': 'true' }), totalEl),
        h('p', { class: 'ticket__nota', texto: 'Se pesa al cortar: el importe final puede variar un poco.' })
      );

      /* ================= Formulario ================= */
      const campoNombre = h('input', {
        type: 'text', id: 'pedido-nombre', class: 'campo__control', name: 'nombre', maxlength: 40, autocomplete: 'given-name',
        'aria-describedby': 'pedido-nombre-error', required: true
      });
      const errorNombre = h('p', { class: 'campo__error', id: 'pedido-nombre-error', role: 'alert' });
      const campoNotas = h('textarea', {
        id: 'pedido-notas', class: 'campo__control campo__control--area', name: 'aclaraciones', maxlength: 200, rows: 2,
        placeholder: 'Ej: feteado fino, sin el borde, para las 18 hs'
      });
      const errorEnvio = h('p', { class: 'campo__error', role: 'alert' });

      const recordada = leerLocal(CLAVE_SUCURSAL);
      let sucursalId = sucursales.some((s) => s.id === recordada) ? recordada : sucursales[0].id;

      const estados = []; // para refrescar "abierto / cerrado"
      const opciones = sucursales.map((s) => {
        const radio = h('input', { type: 'radio', name: 'sucursal', value: s.id, class: 'opcion__radio' });
        radio.checked = s.id === sucursalId;
        radio.addEventListener('change', () => { sucursalId = s.id; guardarLocal(CLAVE_SUCURSAL, s.id); });
        const estado = h('span', { class: 'opcion__estado' });
        estados.push(() => {
          const e = estadoHorario(s.horarios);
          estado.textContent = e.texto;
          estado.classList.toggle('opcion__estado--abierto', e.abierto);
        });
        return h('label', { class: 'opcion' }, radio,
          h('span', { class: 'opcion__texto' },
            h('strong', { texto: s.nombre }),
            h('span', { class: 'opcion__direccion', texto: s.direccion }),
            estado
          )
        );
      });

      const grupoSucursal = sucursales.length > 1
        ? h('fieldset', { class: 'campo-grupo' }, h('legend', { class: 'campo__etiqueta', texto: '¿Dónde lo retirás?' }), opciones)
        : null;

      const botonEnviar = h('button', { type: 'submit', class: 'boton boton--whatsapp boton--ancho' }, icono('whatsapp', { tam: 20 }), 'Enviar pedido por WhatsApp');
      const botonVaciar = h('button', {
        type: 'button', class: 'enlace-boton',
        onclick() { pedido.vaciar(); }
      }, 'Vaciar pedido');

      const formulario = h('form', { class: 'pedido__formulario', novalidate: true },
        grupoSucursal,
        h('div', { class: 'campo' },
          h('label', { class: 'campo__etiqueta', for: 'pedido-nombre', texto: '¿A nombre de quién?' }),
          campoNombre, errorNombre
        ),
        h('div', { class: 'campo' },
          h('label', { class: 'campo__etiqueta', for: 'pedido-notas' }, 'Aclaraciones ', h('span', { class: 'campo__opcional', texto: '(opcional)' })),
          campoNotas
        ),
        errorEnvio,
        botonEnviar,
        h('div', { class: 'pedido__vaciar' }, botonVaciar)
      );

      campoNombre.addEventListener('input', () => {
        errorNombre.textContent = '';
        campoNombre.removeAttribute('aria-invalid');
      });

      function armarMensaje(nombre, sucursal, aclaraciones) {
        const detalle = pedido.items().map((l) =>
          '• ' + l.producto.nombre + ': ' + formatoGramos(l.gramos) + ' (aprox. ' + formatoPesos(l.subtotal) + ')'
        );
        return [
          'Hola! Soy ' + nombre + '. Quiero hacer este pedido para retirar en ' + sucursal.nombre + ':',
          '',
          ...detalle,
          '',
          'Total estimado: ' + formatoPesos(pedido.total()),
          aclaraciones ? 'Aclaraciones: ' + aclaraciones : null,
          '',
          'Gracias!'
        ].filter((x) => x !== null).join('\n');
      }

      formulario.addEventListener('submit', (e) => {
        e.preventDefault();
        errorEnvio.textContent = '';
        const nombre = limpiarTexto(campoNombre.value, 40);
        if (nombre.length < 2) {
          errorNombre.textContent = 'Escribí tu nombre para que sepamos a nombre de quién dejar el pedido.';
          campoNombre.setAttribute('aria-invalid', 'true');
          campoNombre.focus();
          return;
        }
        if (pedido.cantidad() === 0) return;
        const sucursal = sucursales.find((s) => s.id === sucursalId) || sucursales[0];
        const mensaje = armarMensaje(nombre, sucursal, limpiarTexto(campoNotas.value, 200));
        const url = linkWhatsApp(whatsappDeSucursal(sucursal), mensaje);
        if (!url) {
          errorEnvio.textContent = 'No pudimos armar el link de WhatsApp de esta sucursal. Probá con otra o escribinos directamente.';
          return;
        }
        abrirEnlace(url);
      });

      /* ================= Panel (dialog) ================= */
      const botonCerrar = h('button', { type: 'button', class: 'pedido__cerrar', 'aria-label': 'Cerrar pedido', onclick: cerrar }, icono('cerrar', { tam: 22 }));
      const botonVerProductos = h('a', { class: 'boton boton--primario', href: '#productos', onclick: cerrar }, 'Ver productos');
      const estadoVacio = h('div', { class: 'pedido__vacio' },
        h('p', { class: 'pedido__vacio-titulo', texto: 'Tu pedido está vacío.' }),
        h('p', { texto: 'Agregá productos y los vas a ver acá, con el total estimado.' }),
        botonVerProductos
      );
      const cuerpoPedido = h('div', { class: 'pedido__armado' }, ticket, formulario);

      const dialogo = h('dialog', { class: 'pedido', 'aria-labelledby': 'pedido-titulo' },
        h('div', { class: 'pedido__panel' },
          h('div', { class: 'pedido__cabecera' }, h('h2', { id: 'pedido-titulo', class: 'pedido__titulo', texto: 'Tu pedido' }), botonCerrar),
          h('div', { class: 'pedido__cuerpo' }, estadoVacio, cuerpoPedido)
        )
      );

      function abrir() {
        sincronizar();
        estados.forEach((f) => f());
        if (typeof dialogo.showModal === 'function') {
          if (!dialogo.open) dialogo.showModal();
        } else {
          dialogo.setAttribute('open', '');
        }
        document.body.classList.add('sin-scroll');
      }
      function cerrar() {
        if (typeof dialogo.close === 'function') dialogo.close();
        else dialogo.removeAttribute('open');
        document.body.classList.remove('sin-scroll');
      }
      dialogo.addEventListener('close', () => document.body.classList.remove('sin-scroll'));
      dialogo.addEventListener('click', (e) => { if (e.target === dialogo) cerrar(); }); // clic en el fondo
      F.ui.abrirPedido = abrir;

      /* ================= Barra inferior (celular) ================= */
      const barraCuenta = h('span', { class: 'barra-pedido__cuenta' });
      const barraTotal = h('span', { class: 'barra-pedido__total' });
      const barra = h('button', { type: 'button', class: 'barra-pedido', hidden: true, onclick: abrir },
        icono('bolsa', { tam: 20 }), h('span', { class: 'barra-pedido__texto', texto: 'Ver mi pedido' }), barraCuenta, barraTotal
      );

      /* ================= Sincronizar con el estado ================= */
      function sincronizar() {
        const actuales = pedido.items();
        const ids = new Set(actuales.map((l) => l.producto.id));
        for (const [id, fila] of filas) {
          if (!ids.has(id)) { fila.el.remove(); filas.delete(id); }
        }
        for (const l of actuales) {
          let fila = filas.get(l.producto.id);
          if (!fila) {
            fila = crearFila(l);
            filas.set(l.producto.id, fila);
            listaTicket.append(fila.el);
          }
          fila.cant.textContent = formatoGramos(l.gramos);
          fila.precio.textContent = formatoPesos(l.subtotal);
          fila.mas.disabled = l.gramos >= pedido.MAX_GRAMOS;
        }
        const n = pedido.cantidad();
        totalEl.textContent = formatoPesos(pedido.total());
        cuerpoPedido.hidden = n === 0;
        estadoVacio.hidden = n !== 0;
        barra.hidden = n === 0;
        barraCuenta.textContent = String(n);
        barraTotal.textContent = formatoPesos(pedido.total());
      }
      pedido.suscribir(sincronizar);
      sincronizar();

      contenedor.append(dialogo, barra);
    }
  };
})();
