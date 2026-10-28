/*
  Estado del pedido (el "carrito").
  Guarda dos cosas por separado, así sus ids nunca se pisan:
    · productos → cuántos gramos de cada uno eligió el cliente
    · promos    → cuántas unidades (combos) de cada una
  Se acuerda aunque recargue la página (localStorage), pero siempre
  se valida contra el catálogo real: si alguien toca los datos guardados,
  lo inválido se descarta. Los precios salen siempre de data/, nunca de lo guardado.

  Cálculo del precio:
    producto → subtotal = precio de la porción × (gramos ÷ porción)
    promo    → subtotal = precio de la promo × unidades
*/
(function () {
  'use strict';
  const F = window.Fiambreria;

  const CLAVE = 'fiambreria.pedido.v2';
  const CLAVE_V1 = 'fiambreria.pedido.v1'; // formato anterior: solo productos { id: gramos }
  const MAX_GRAMOS = 5000; // tope por producto (5 kg)
  const PASO = 50; // todos los productos se piden de a 50 g, sin importar la porción del precio
  const MAX_UNIDADES = 20; // tope por promo

  const lineas = new Map(); // id de producto → gramos
  const lineasPromos = new Map(); // id de promo → unidades
  const escuchas = new Set();
  let indice = null; // id → producto
  let indicePromos = null; // id → promo

  function catalogo() {
    if (!indice) {
      indice = new Map(F.datos.productos.items.map((p) => [p.id, p]));
    }
    return indice;
  }

  function catalogoPromos() {
    if (!indicePromos) {
      indicePromos = new Map(F.datos.promos.items.map((p) => [p.id, p]));
    }
    return indicePromos;
  }

  function producto(id) {
    return catalogo().get(id);
  }

  function promo(id) {
    return catalogoPromos().get(id);
  }

  function pedible(p) {
    return !!p && p.disponible !== false;
  }

  function promoPedible(p) {
    return !!p && F.util.promoVigente(p);
  }

  function notificar() {
    F.util.guardarLocal(CLAVE, { productos: Object.fromEntries(lineas), promos: Object.fromEntries(lineasPromos) });
    escuchas.forEach((fn) => fn());
  }

  /* ---------- Productos (por peso) ---------- */

  function gramos(id) {
    return lineas.get(id) || 0;
  }

  // Primera vez que se agrega: un paso (50 g)
  function agregar(id) {
    const p = producto(id);
    if (!pedible(p) || lineas.has(id)) return;
    lineas.set(id, PASO);
    notificar();
  }

  // direccion: +1 suma 50 g, -1 resta 50 g (al llegar a 0 se quita)
  function cambiar(id, direccion) {
    const p = producto(id);
    if (!pedible(p) || !lineas.has(id)) return;
    const nuevo = lineas.get(id) + direccion * PASO;
    if (nuevo < PASO) lineas.delete(id);
    else lineas.set(id, Math.min(nuevo, MAX_GRAMOS));
    notificar();
  }

  function quitar(id) {
    if (lineas.delete(id)) notificar();
  }

  function subtotal(p, g) {
    return Math.round((p.precio * g) / p.porcion);
  }

  function items() {
    return [...lineas.entries()].map(([id, g]) => {
      const p = producto(id);
      return { producto: p, gramos: g, subtotal: subtotal(p, g) };
    });
  }

  /* ---------- Promos (por unidad) ---------- */

  function unidadesPromo(id) {
    return lineasPromos.get(id) || 0;
  }

  // Primera vez que se agrega: una unidad
  function agregarPromo(id) {
    const p = promo(id);
    if (!promoPedible(p) || lineasPromos.has(id)) return;
    lineasPromos.set(id, 1);
    notificar();
  }

  // direccion: +1 suma una unidad, -1 resta una (al llegar a 0 se quita)
  function cambiarPromo(id, direccion) {
    const p = promo(id);
    if (!promoPedible(p) || !lineasPromos.has(id)) return;
    const nuevo = lineasPromos.get(id) + direccion;
    if (nuevo < 1) lineasPromos.delete(id);
    else lineasPromos.set(id, Math.min(nuevo, MAX_UNIDADES));
    notificar();
  }

  function quitarPromo(id) {
    if (lineasPromos.delete(id)) notificar();
  }

  function itemsPromos() {
    return [...lineasPromos.entries()].map(([id, u]) => {
      const p = promo(id);
      return { promo: p, unidades: u, subtotal: p.precio * u };
    });
  }

  // Saca del pedido las promos que vencieron mientras estaba armado. Devuelve true si sacó alguna.
  function depurar() {
    let cambio = false;
    for (const id of [...lineasPromos.keys()]) {
      if (!promoPedible(promo(id))) {
        lineasPromos.delete(id);
        cambio = true;
      }
    }
    if (cambio) notificar();
    return cambio;
  }

  /* ---------- Todo junto ---------- */

  function vaciar() {
    if (lineas.size === 0 && lineasPromos.size === 0) return;
    lineas.clear();
    lineasPromos.clear();
    notificar();
  }

  function total() {
    return items().reduce((suma, l) => suma + l.subtotal, 0)
      + itemsPromos().reduce((suma, l) => suma + l.subtotal, 0);
  }

  // Cantidad de líneas del pedido (productos + promos)
  function cantidad() {
    return lineas.size + lineasPromos.size;
  }

  function suscribir(fn) {
    escuchas.add(fn);
    return () => escuchas.delete(fn);
  }

  function esObjeto(x) {
    return !!x && typeof x === 'object' && !Array.isArray(x);
  }

  // Recupera el pedido guardado, validándolo
  function restaurar() {
    let guardado = F.util.leerLocal(CLAVE);
    if (!esObjeto(guardado)) {
      const viejo = F.util.leerLocal(CLAVE_V1);
      guardado = esObjeto(viejo) ? { productos: viejo, promos: {} } : null;
    }
    if (!guardado) return;

    if (esObjeto(guardado.productos)) {
      for (const [id, g] of Object.entries(guardado.productos)) {
        const p = producto(id);
        if (pedible(p) && Number.isInteger(g) && g >= PASO && g <= MAX_GRAMOS && g % PASO === 0) {
          lineas.set(id, g);
        }
      }
    }
    if (esObjeto(guardado.promos)) {
      for (const [id, u] of Object.entries(guardado.promos)) {
        if (promoPedible(promo(id)) && Number.isInteger(u) && u >= 1 && u <= MAX_UNIDADES) {
          lineasPromos.set(id, u);
        }
      }
    }
  }

  F.pedido = {
    MAX_GRAMOS, PASO, MAX_UNIDADES,
    producto, gramos, agregar, cambiar, quitar, items,
    promo, unidadesPromo, agregarPromo, cambiarPromo, quitarPromo, itemsPromos, depurar,
    vaciar, total, cantidad, suscribir, restaurar
  };
})();
