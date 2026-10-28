/*
  Funciones de ayuda compartidas por todos los bloques.

  SEGURIDAD: el sitio arma el HTML con h() y textContent, nunca con innerHTML.
  Así, aunque un texto de /data tenga caracteres raros (< > & "), se muestra
  como texto y jamás se ejecuta como código.
*/
(function () {
  'use strict';
  const F = window.Fiambreria;

  /* ---------- Links seguros ---------- */

  const PROTOCOLOS_OK = ['http:', 'https:', 'tel:', 'mailto:'];

  // Acepta rutas relativas (img/foto.jpg, #productos) y links http(s)/tel/mailto.
  // Rechaza javascript:, data:, vbscript:, etc. y las URLs "//dominio" sin protocolo.
  function esUrlSegura(url) {
    if (typeof url !== 'string') return false;
    const u = url.trim();
    if (u === '') return false;
    if (u.startsWith('//')) return false;
    if (/^[a-z][a-z0-9+.-]*:/i.test(u)) {
      try {
        return PROTOCOLOS_OK.includes(new URL(u).protocol);
      } catch (e) {
        return false;
      }
    }
    return true;
  }

  /* ---------- Crear elementos del DOM ---------- */

  // h('div', { class: 'caja', texto: 'Hola', onclick: fn }, hijo1, hijo2)
  function h(etiqueta, props, ...hijos) {
    const el = document.createElement(etiqueta);
    if (props) {
      for (const [clave, valor] of Object.entries(props)) {
        if (valor === null || valor === undefined || valor === false) continue;
        if (clave === 'class') {
          el.className = valor;
        } else if (clave === 'texto') {
          el.textContent = valor;
        } else if (clave.startsWith('on') && typeof valor === 'function') {
          el.addEventListener(clave.slice(2), valor);
        } else if (clave === 'href' || clave === 'src') {
          if (esUrlSegura(valor)) el.setAttribute(clave, valor);
        } else if (valor === true) {
          el.setAttribute(clave, '');
        } else {
          el.setAttribute(clave, String(valor));
        }
      }
    }
    agregarHijos(el, hijos);
    return el;
  }

  function agregarHijos(el, hijos) {
    for (const hijo of hijos.flat(Infinity)) {
      if (hijo === null || hijo === undefined || hijo === false) continue;
      el.append(hijo instanceof Node ? hijo : document.createTextNode(String(hijo)));
    }
  }

  function vaciar(el) {
    while (el.firstChild) el.removeChild(el.firstChild);
  }

  /* ---------- Formatos ---------- */

  function formatoPesos(n) {
    return '$' + Math.round(n).toLocaleString('es-AR', { maximumFractionDigits: 0 });
  }

  function formatoGramos(g) {
    if (g < 1000) return g + ' g';
    return (g / 1000).toLocaleString('es-AR', { maximumFractionDigits: 2 }) + ' kg';
  }

  // "2026-10-01" → "1 de octubre de 2026"
  function formatoFecha(iso) {
    const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso || '');
    if (!m) return '';
    const fecha = new Date(Date.UTC(+m[1], +m[2] - 1, +m[3], 12));
    return fecha.toLocaleDateString('es-AR', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
  }

  // Minúsculas y sin tildes, para comparar búsquedas
  function normalizar(texto) {
    return String(texto).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').trim();
  }

  // Limpia lo que escribe el usuario antes de meterlo en un mensaje
  function limpiarTexto(texto, max) {
    return String(texto || '')
      .replace(/[\u0000-\u001f\u007f]+/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, max);
  }

  function debounce(fn, ms) {
    let t;
    return function (...args) {
      clearTimeout(t);
      t = setTimeout(() => fn.apply(this, args), ms);
    };
  }

  /* ---------- WhatsApp ---------- */

  function numeroWhatsAppValido(numero) {
    return /^\d{8,15}$/.test(String(numero || '').replace(/[\s+()-]/g, ''));
  }

  // Arma https://wa.me/NUMERO?text=MENSAJE. Devuelve '' si el número no es válido.
  function linkWhatsApp(numero, mensaje) {
    const limpio = String(numero || '').replace(/[\s+()-]/g, '');
    if (!numeroWhatsAppValido(limpio)) return '';
    return 'https://wa.me/' + limpio + (mensaje ? '?text=' + encodeURIComponent(mensaje) : '');
  }

  function whatsappDeSucursal(sucursal) {
    return (sucursal && sucursal.whatsapp) || F.datos.sitio.whatsapp;
  }

  // Link a Google Maps. Usa el link propio de la sucursal o arma una búsqueda con la dirección.
  function linkMapa(sucursal) {
    if (sucursal.mapa && esUrlSegura(sucursal.mapa)) return sucursal.mapa;
    const consulta = [sucursal.direccion, sucursal.localidad].filter(Boolean).join(', ');
    return 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(consulta);
  }

  /* ---------- Horarios ---------- */

  const ZONA = 'America/Argentina/Buenos_Aires';
  const DIA_ISO = { Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6, Sun: 7 };
  const DIA_CORTO = ['', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
  const DIA_LARGO = ['', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado', 'domingo'];

  function ahoraEnArgentina(fecha) {
    const partes = new Intl.DateTimeFormat('en-US', {
      timeZone: ZONA, weekday: 'short', hour: '2-digit', minute: '2-digit', hourCycle: 'h23'
    }).formatToParts(fecha);
    const valor = (tipo) => partes.find((p) => p.type === tipo).value;
    return { dia: DIA_ISO[valor('weekday')], minutos: parseInt(valor('hour'), 10) * 60 + parseInt(valor('minute'), 10) };
  }

  function aMinutos(hhmm) {
    const [hh, mm] = hhmm.split(':').map(Number);
    return hh * 60 + mm;
  }

  // "08:30" → "8:30"
  function horaCorta(hhmm) {
    return hhmm.replace(/^0/, '');
  }

  // Devuelve { abierto: boolean, texto: 'Abierto hasta 20:30' }
  function estadoHorario(horarios, fecha) {
    const { dia, minutos } = ahoraEnArgentina(fecha || new Date());
    for (const t of horarios) {
      if (t.dias.includes(dia) && minutos >= aMinutos(t.desde) && minutos < aMinutos(t.hasta)) {
        return { abierto: true, texto: 'Abierto hasta las ' + horaCorta(t.hasta) };
      }
    }
    for (let i = 0; i <= 7; i++) {
      const d = ((dia - 1 + i) % 7) + 1;
      const turnos = horarios
        .filter((t) => t.dias.includes(d) && (i > 0 || aMinutos(t.desde) > minutos))
        .sort((a, b) => aMinutos(a.desde) - aMinutos(b.desde));
      if (turnos.length) {
        const cuando = i === 0 ? 'hoy' : i === 1 ? 'mañana' : 'el ' + DIA_LARGO[d];
        return { abierto: false, texto: 'Cerrado, abre ' + cuando + ' a las ' + horaCorta(turnos[0].desde) };
      }
    }
    return { abierto: false, texto: 'Cerrado' };
  }

  // [1,2,3,4,5] → "Lun a Vie" · [6] → "Sáb" · [1,3] → "Lun, Mié"
  function etiquetaDias(dias) {
    const orden = [...new Set(dias)].sort((a, b) => a - b);
    const grupos = [];
    for (const d of orden) {
      const ultimo = grupos[grupos.length - 1];
      if (ultimo && ultimo[ultimo.length - 1] === d - 1) ultimo.push(d);
      else grupos.push([d]);
    }
    return grupos
      .map((g) => {
        if (g.length >= 3) return DIA_CORTO[g[0]] + ' a ' + DIA_CORTO[g[g.length - 1]];
        return g.map((d) => DIA_CORTO[d]).join(' y ');
      })
      .join(', ');
  }

  // Agrupa los turnos por días para mostrarlos: [{ dias: 'Lun a Vie', horas: '8:30 a 20:30' }]
  function resumenHorarios(horarios) {
    const porClave = new Map();
    for (const t of horarios) {
      const clave = [...t.dias].sort().join(',');
      if (!porClave.has(clave)) porClave.set(clave, { dias: t.dias, tramos: [] });
      porClave.get(clave).tramos.push(horaCorta(t.desde) + ' a ' + horaCorta(t.hasta));
    }
    return [...porClave.values()].map((g) => ({
      dias: etiquetaDias(g.dias),
      horas: g.tramos.join(' y ') + ' hs',
      tramos: g.tramos // cada turno por separado, para mostrarlos uno debajo del otro
    }));
  }

  /* ---------- Vigencia de promos ---------- */

  // Fecha de hoy en Argentina, como "AAAA-MM-DD" (para comparar con "hasta")
  function hoyEnArgentina() {
    return new Intl.DateTimeFormat('en-CA', { timeZone: ZONA }).format(new Date());
  }

  // Una promo vale hasta el final del día "hasta"; sin fecha, siempre vale
  function promoVigente(promo) {
    return !!promo && (!promo.hasta || promo.hasta >= hoyEnArgentina());
  }

  /* ---------- Aviso para lectores de pantalla ---------- */

  let regionAviso = null;
  function avisar(texto) {
    if (!regionAviso) {
      regionAviso = h('div', { class: 'solo-lectores', role: 'status', 'aria-live': 'polite' });
      document.body.append(regionAviso);
    }
    regionAviso.textContent = '';
    setTimeout(() => { regionAviso.textContent = texto; }, 50);
  }

  /* ---------- Almacenamiento local (puede fallar: modo privado, etc.) ---------- */

  function guardarLocal(clave, valor) {
    try { localStorage.setItem(clave, JSON.stringify(valor)); } catch (e) { /* sin almacenamiento */ }
  }

  function leerLocal(clave) {
    try {
      const crudo = localStorage.getItem(clave);
      return crudo === null ? null : JSON.parse(crudo);
    } catch (e) {
      return null;
    }
  }

  Object.assign(F.util, {
    esUrlSegura, h, vaciar, formatoPesos, formatoGramos, formatoFecha, normalizar, limpiarTexto, debounce,
    numeroWhatsAppValido, linkWhatsApp, whatsappDeSucursal, linkMapa,
    estadoHorario, etiquetaDias, resumenHorarios, promoVigente, avisar, guardarLocal, leerLocal
  });
})();
