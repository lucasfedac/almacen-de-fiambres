/*
  Íconos del sitio (SVG en línea, sin archivos externos).
  Uso: Fiambreria.util.icono('whatsapp', { tam: 20 })
  Para sumar uno: agregá una entrada en TRAZOS con el path (viewBox 24x24).
  - tipo 'linea': se dibuja con trazo (outline)
  - tipo 'relleno': se dibuja relleno
*/
(function () {
  'use strict';
  const F = window.Fiambreria;
  const NS = 'http://www.w3.org/2000/svg';

  const TRAZOS = {
    menu: { tipo: 'linea', d: 'M4 7h16M4 12h16M4 17h16' },
    cerrar: { tipo: 'linea', d: 'M6 6l12 12M18 6L6 18' },
    mas: { tipo: 'linea', d: 'M12 5v14M5 12h14' },
    menos: { tipo: 'linea', d: 'M5 12h14' },
    buscar: { tipo: 'linea', d: 'M11 4a7 7 0 100 14 7 7 0 000-14zM20 20l-4-4' },
    ubicacion: { tipo: 'linea', d: 'M12 21s7-6.2 7-11a7 7 0 10-14 0c0 4.8 7 11 7 11zM12 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z' },
    reloj: { tipo: 'linea', d: 'M12 4a8 8 0 100 16 8 8 0 000-16zM12 8v4l3 2' },
    telefono: { tipo: 'linea', d: 'M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z' },
    bolsa: { tipo: 'linea', d: 'M6 8h12l1 12H5L6 8zM9 8a3 3 0 016 0' },
    tilde: { tipo: 'linea', d: 'M5 12.5l4.5 4.5L19 7.5' },
    papelera: { tipo: 'linea', d: 'M5 7h14M10 7V4h4v3M7 7l1 13h8l1-13' },
    instagram: { tipo: 'linea', d: 'M7 3h10a4 4 0 014 4v10a4 4 0 01-4 4H7a4 4 0 01-4-4V7a4 4 0 014-4zM12 8a4 4 0 100 8 4 4 0 000-8zM17.5 6.5h.01' },
    facebook: { tipo: 'linea', d: 'M14 8h3V4h-3a4 4 0 00-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8z' },
    whatsapp: {
      tipo: 'relleno',
      d: 'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z'
    }
  };

  function icono(nombre, opciones) {
    const def = TRAZOS[nombre];
    const tam = (opciones && opciones.tam) || 20;
    const svg = document.createElementNS(NS, 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('width', String(tam));
    svg.setAttribute('height', String(tam));
    svg.setAttribute('aria-hidden', 'true');
    svg.setAttribute('focusable', 'false');
    svg.setAttribute('class', 'icono');
    if (!def) return svg;
    const path = document.createElementNS(NS, 'path');
    path.setAttribute('d', def.d);
    if (def.tipo === 'linea') {
      path.setAttribute('fill', 'none');
      path.setAttribute('stroke', 'currentColor');
      path.setAttribute('stroke-width', '2');
      path.setAttribute('stroke-linecap', 'round');
      path.setAttribute('stroke-linejoin', 'round');
    } else {
      path.setAttribute('fill', 'currentColor');
    }
    svg.append(path);
    return svg;
  }

  F.util.icono = icono;
})();
