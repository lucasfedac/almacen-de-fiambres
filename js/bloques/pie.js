/*
  BLOQUE: PIE DE PÁGINA
  Nombre, sucursales resumidas, contacto y redes.
  Textos: data/sitio.js → pie, redes
*/
(function () {
  'use strict';
  const F = window.Fiambreria;
  const { h, icono, linkWhatsApp, esUrlSegura } = F.util;

  F.bloques.pie = {
    montar(contenedor, ctx) {
      const sitio = F.datos.sitio;

      const redes = [
        { clave: 'instagram', nombre: 'Instagram', icono: 'instagram' },
        { clave: 'facebook', nombre: 'Facebook', icono: 'facebook' }
      ].filter((r) => sitio.redes && esUrlSegura(sitio.redes[r.clave]));

      const urlWhats = linkWhatsApp(sitio.whatsapp, sitio.mensajeWhatsApp);

      contenedor.classList.add('pie');
      contenedor.append(
        h('div', { class: 'contenedor pie__rejilla' },
          h('div', { class: 'pie__marca' },
            h('p', { class: 'pie__nombre', texto: sitio.nombre }),
            h('p', { class: 'pie__texto', texto: sitio.pie.texto })
          ),
          h('div', null,
            h('p', { class: 'pie__titulo', texto: 'Sucursales' }),
            h('ul', { class: 'pie__lista' },
              F.datos.sucursales.map((s) => h('li', null, h('strong', { texto: s.nombre }), h('span', { texto: s.direccion })))
            )
          ),
          h('div', null,
            h('p', { class: 'pie__titulo', texto: 'Contacto' }),
            h('ul', { class: 'pie__lista pie__lista--enlaces' },
              urlWhats ? h('li', null, h('a', { href: urlWhats, target: '_blank', rel: 'noopener noreferrer' }, icono('whatsapp', { tam: 18 }), 'WhatsApp')) : null,
              redes.map((r) => h('li', null, h('a', { href: sitio.redes[r.clave], target: '_blank', rel: 'noopener noreferrer' }, icono(r.icono, { tam: 18 }), r.nombre)))
            ),
            ctx.menu.length ? h('ul', { class: 'pie__lista pie__lista--enlaces pie__lista--secciones' },
              ctx.menu.map((m) => h('li', null, h('a', { href: '#' + m.id, texto: m.texto })))
            ) : null
          )
        ),
        h('div', { class: 'contenedor pie__base' },
          h('p', { texto: '© ' + new Date().getFullYear() + ' ' + sitio.nombre }),
          sitio.pie.aviso ? h('p', { texto: sitio.pie.aviso }) : null
        )
      );
    }
  };
})();
