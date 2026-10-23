/*
  BLOQUE: SUCURSALES
  Una tarjeta por sucursal con dirección, horarios, si está abierta ahora,
  cómo llegar y WhatsApp. Se cargan en data/sucursales.js
*/
(function () {
  'use strict';
  const F = window.Fiambreria;
  const { h, icono, linkWhatsApp, linkMapa, whatsappDeSucursal, estadoHorario, resumenHorarios } = F.util;

  F.bloques.sucursales = {
    id: 'sucursales',
    menu: 'Sucursales',
    montar(seccion) {
      const t = F.datos.sitio.sucursales;
      const actualizadores = [];

      function tarjeta(s) {
        const textoEstado = h('span', { class: 'estado__texto' });
        const estado = h('p', { class: 'estado' }, h('span', { class: 'estado__punto', 'aria-hidden': 'true' }), textoEstado);
        actualizadores.push(() => {
          const e = estadoHorario(s.horarios);
          estado.classList.toggle('estado--abierto', e.abierto);
          textoEstado.textContent = e.texto;
        });

        const tel = (s.telefono || '').replace(/[^\d+]/g, '');
        const urlWhats = linkWhatsApp(whatsappDeSucursal(s), 'Hola! Quería consultar en la ' + s.nombre + '.');

        return h('article', { class: 'sucursal' },
          h('h3', { class: 'sucursal__nombre', texto: s.nombre }),
          estado,
          h('p', { class: 'sucursal__dato' }, icono('ubicacion', { tam: 20 }),
            h('span', null,
              s.direccion, s.localidad ? ', ' + s.localidad : '',
              s.referencia ? h('small', { class: 'sucursal__ref', texto: s.referencia }) : null
            )
          ),
          s.telefono && tel ? h('p', { class: 'sucursal__dato' }, icono('telefono', { tam: 20 }), h('a', { href: 'tel:' + tel, texto: s.telefono })) : null,
          h('div', { class: 'sucursal__horarios' },
            h('p', { class: 'sucursal__dato sucursal__dato--titulo' }, icono('reloj', { tam: 20 }), h('span', { texto: 'Horarios' })),
            h('dl', { class: 'horarios' },
              resumenHorarios(s.horarios).map((r) => h('div', { class: 'horarios__fila' },
                h('dt', { texto: r.dias }),
                // Un turno por línea; "hs" solo al final del último
                h('dd', null, r.tramos.map((t, i) => h('span', { class: 'horarios__tramo', texto: t + (i === r.tramos.length - 1 ? ' hs' : '') })))
              ))
            )
          ),
          h('div', { class: 'sucursal__acciones' },
            h('a', { class: 'boton boton--contorno', href: linkMapa(s), target: '_blank', rel: 'noopener noreferrer' }, icono('ubicacion', { tam: 18 }), 'Cómo llegar'),
            urlWhats ? h('a', { class: 'boton boton--whatsapp', href: urlWhats, target: '_blank', rel: 'noopener noreferrer' }, icono('whatsapp', { tam: 18 }), 'WhatsApp') : null
          )
        );
      }

      seccion.setAttribute('aria-labelledby', 'sucursales-titulo');
      seccion.append(
        h('div', { class: 'contenedor' },
          h('div', { class: 'sucursales__cabecera' },
            h('h2', { id: 'sucursales-titulo', texto: t.titulo }),
            h('p', { class: 'sucursales__bajada', texto: t.bajada })
          ),
          h('div', { class: 'sucursales__rejilla' }, F.datos.sucursales.map(tarjeta))
        )
      );

      const refrescar = () => actualizadores.forEach((f) => f());
      refrescar();
      setInterval(refrescar, 60000);
    }
  };
})();
