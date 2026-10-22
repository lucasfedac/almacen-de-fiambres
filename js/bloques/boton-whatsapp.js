/*
  BLOQUE: BOTÓN FLOTANTE DE WHATSAPP
  Siempre visible abajo a la derecha. Usa el WhatsApp general de data/sitio.js
*/
(function () {
  'use strict';
  const F = window.Fiambreria;
  const { h, icono, linkWhatsApp } = F.util;

  F.bloques['boton-whatsapp'] = {
    montar(contenedor) {
      const sitio = F.datos.sitio;
      const url = linkWhatsApp(sitio.whatsapp, sitio.mensajeWhatsApp);
      if (!url) return;
      contenedor.append(
        h('a', { class: 'whatsapp-flotante', href: url, target: '_blank', rel: 'noopener noreferrer', 'aria-label': 'Escribinos por WhatsApp' },
          icono('whatsapp', { tam: 28 }),
          h('span', { class: 'whatsapp-flotante__texto', texto: 'WhatsApp' })
        )
      );
    }
  };
})();
