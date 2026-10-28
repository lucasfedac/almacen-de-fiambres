/*
  ARRANQUE DEL SITIO
  Lee data/sitio.js → "bloques" y arma la página en ese orden.
  Cada bloque vive en js/bloques/ y, si uno falla, el resto del sitio sigue funcionando.
*/
(function () {
  'use strict';
  const F = window.Fiambreria;
  const { h, esUrlSegura, numeroWhatsAppValido } = F.util;

  /* ---------- Revisión de los datos (avisos en la consola, para quien edita) ---------- */
  function validarDatos() {
    const avisos = [];
    const { sitio, productos, sucursales, mayoristas } = F.datos;

    if (!numeroWhatsAppValido(sitio.whatsapp)) avisos.push('data/sitio.js: "whatsapp" no es un número válido (solo dígitos con código de país, ej: 5491123456789).');

    const idsCategorias = new Set(productos.categorias.map((c) => c.id));
    const idsProductos = new Set();
    for (const p of productos.items) {
      const donde = 'data/productos.js, producto "' + (p.id || p.nombre) + '": ';
      if (!p.id) avisos.push('data/productos.js: hay un producto sin "id" (' + p.nombre + ').');
      if (idsProductos.has(p.id)) avisos.push(donde + 'el "id" está repetido.');
      idsProductos.add(p.id);
      if (!idsCategorias.has(p.categoria)) avisos.push(donde + 'la categoría "' + p.categoria + '" no existe en la lista de categorías.');
      if (p.porcion !== 50 && p.porcion !== 100) avisos.push(donde + '"porcion" tiene que ser 50 o 100.');
      if (!Number.isFinite(p.precio) || p.precio <= 0) avisos.push(donde + '"precio" tiene que ser un número mayor a 0.');
    }

    const idsPromos = new Set();
    for (const p of F.datos.promos.items) {
      const donde = 'data/promos.js, promo "' + (p.id || p.titulo) + '": ';
      if (!p.id) avisos.push('data/promos.js: hay una promo sin "id" (' + p.titulo + ').');
      if (idsPromos.has(p.id)) avisos.push(donde + 'el "id" está repetido.');
      idsPromos.add(p.id);
      if (!Number.isFinite(p.precio) || p.precio <= 0) avisos.push(donde + '"precio" tiene que ser un número mayor a 0.');
      if (!['combo', 'kilo', '100g'].includes(p.unidad)) avisos.push(donde + '"unidad" tiene que ser \'combo\', \'kilo\' o \'100g\'.');
      if (p.hasta && !/^\d{4}-\d{2}-\d{2}$/.test(p.hasta)) avisos.push(donde + '"hasta" tiene que tener el formato AAAA-MM-DD (ej: 2026-11-30).');
    }

    const idsSucursales = new Set();
    for (const s of sucursales) {
      if (idsSucursales.has(s.id)) avisos.push('data/sucursales.js: el id "' + s.id + '" está repetido.');
      idsSucursales.add(s.id);
      if (s.whatsapp && !numeroWhatsAppValido(s.whatsapp)) avisos.push('data/sucursales.js, "' + s.nombre + '": el WhatsApp no es válido.');
      if (!Array.isArray(s.horarios) || !s.horarios.length) avisos.push('data/sucursales.js, "' + s.nombre + '": faltan los horarios.');
    }

    if (mayoristas.mostrarPrecios) {
      for (const f of mayoristas.items) {
        if (!Number.isFinite(f.precioKilo) || f.precioKilo <= 0) avisos.push('data/mayoristas.js, "' + f.producto + '": "precioKilo" tiene que ser un número mayor a 0.');
      }
    }

    avisos.forEach((a) => console.warn('[Sitio] ' + a));
  }

  /* ---------- Datos para Google (SEO local) ---------- */
  function agregarDatosEstructurados() {
    const { sitio, sucursales } = F.datos;
    const dias = ['', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const grafo = sucursales.map((s) => {
      const nodo = {
        '@type': 'GroceryStore',
        name: sitio.nombre + ' - ' + s.nombre,
        description: sitio.descripcion,
        address: { '@type': 'PostalAddress', streetAddress: s.direccion, addressLocality: s.localidad, addressCountry: 'AR' },
        openingHoursSpecification: s.horarios.map((t) => ({
          '@type': 'OpeningHoursSpecification', dayOfWeek: t.dias.map((d) => dias[d]), opens: t.desde, closes: t.hasta
        }))
      };
      if (s.telefono) nodo.telephone = s.telefono;
      return nodo;
    });
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify({ '@context': 'https://schema.org', '@graph': grafo });
    document.head.append(script);
  }

  /* ---------- Cartel de datos de ejemplo ---------- */
  function mostrarAvisoEjemplo() {
    if (!F.datos.sitio.datosDeEjemplo) return;
    document.getElementById('aviso').append(
      h('p', { class: 'aviso-ejemplo', role: 'note' },
        h('strong', { texto: 'Vista previa con datos de ejemplo. ' }),
        'Los productos, precios, direcciones y teléfonos no son reales. Al cargar los datos definitivos, poné datosDeEjemplo: false en data/sitio.js.'
      )
    );
  }

  function montar(nombre, contenedor, ctx) {
    try {
      // un bloque puede devolver false para indicar que no tiene nada que mostrar (ej: promos vencidas)
      return F.bloques[nombre].montar(contenedor, ctx) !== false;
    } catch (error) {
      console.error('[Sitio] El bloque "' + nombre + '" falló y se omitió:', error);
      return false;
    }
  }

  function iniciar() {
    const sitio = F.datos.sitio;
    validarDatos();
    F.pedido.restaurar();

    const principal = document.getElementById('contenido');
    const menu = [];

    for (const nombre of sitio.bloques) {
      const bloque = F.bloques[nombre];
      if (!bloque) {
        console.warn('[Sitio] data/sitio.js pide el bloque "' + nombre + '" pero no existe en js/bloques/.');
        continue;
      }
      const seccion = h('section', { class: 'bloque bloque--' + nombre, id: bloque.id });
      principal.append(seccion);
      if (montar(nombre, seccion)) {
        const etiqueta = (sitio[nombre] && sitio[nombre].menu) || bloque.menu;
        if (etiqueta) menu.push({ id: bloque.id, texto: etiqueta });
      } else {
        seccion.remove();
      }
    }

    const ctx = { menu };
    montar('encabezado', document.getElementById('encabezado'), ctx);
    montar('pie', document.getElementById('pie'), ctx);
    montar('pedido', document.getElementById('pedido'), ctx);
    montar('boton-whatsapp', document.getElementById('whatsapp'), ctx);

    mostrarAvisoEjemplo();
    try { agregarDatosEstructurados(); } catch (e) { console.warn('[Sitio] No se pudieron armar los datos estructurados:', e); }
  }

  iniciar();
})();
