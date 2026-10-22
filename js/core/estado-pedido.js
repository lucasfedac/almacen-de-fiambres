/*
  Estado del pedido (el "carrito").
  Guarda cuántos gramos de cada producto eligió el cliente.
  Se acuerda aunque recargue la página (localStorage), pero siempre
  se valida contra el catálogo real: si alguien toca los datos guardados,
  lo inválido se descarta.

  Cálculo del precio:  subtotal = precio de la porción × (gramos ÷ porción)
*/
(function () {
  'use strict';
  const F = window.Fiambreria;

  const CLAVE = 'fiambreria.pedido.v1';
  const MAX_GRAMOS = 5000; // tope por producto (5 kg)

  const lineas = new Map(); // id de producto → gramos
  const escuchas = new Set();
  let indice = null; // id → producto

  function catalogo() {
    if (!indice) {
      indice = new Map(F.datos.productos.items.map((p) => [p.id, p]));
    }
    return indice;
  }

  function producto(id) {
    return catalogo().get(id);
  }

  function pedible(p) {
    return !!p && p.disponible !== false;
  }

  function notificar() {
    F.util.guardarLocal(CLAVE, Object.fromEntries(lineas));
    escuchas.forEach((fn) => fn());
  }

  function gramos(id) {
    return lineas.get(id) || 0;
  }

  // Primera vez que se agrega: 100 g (o la porción si es mayor)
  function agregar(id) {
    const p = producto(id);
    if (!pedible(p) || lineas.has(id)) return;
    lineas.set(id, Math.max(p.porcion, 100));
    notificar();
  }

  // direccion: +1 suma una porción, -1 resta una porción (al llegar a 0 se quita)
  function cambiar(id, direccion) {
    const p = producto(id);
    if (!pedible(p) || !lineas.has(id)) return;
    const nuevo = lineas.get(id) + direccion * p.porcion;
    if (nuevo < p.porcion) lineas.delete(id);
    else lineas.set(id, Math.min(nuevo, MAX_GRAMOS));
    notificar();
  }

  function quitar(id) {
    if (lineas.delete(id)) notificar();
  }

  function vaciar() {
    if (lineas.size === 0) return;
    lineas.clear();
    notificar();
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

  function total() {
    return items().reduce((suma, l) => suma + l.subtotal, 0);
  }

  function cantidad() {
    return lineas.size;
  }

  function suscribir(fn) {
    escuchas.add(fn);
    return () => escuchas.delete(fn);
  }

  // Recupera el pedido guardado, validándolo
  function restaurar() {
    const guardado = F.util.leerLocal(CLAVE);
    if (!guardado || typeof guardado !== 'object' || Array.isArray(guardado)) return;
    for (const [id, g] of Object.entries(guardado)) {
      const p = producto(id);
      if (pedible(p) && Number.isInteger(g) && g >= p.porcion && g <= MAX_GRAMOS && g % p.porcion === 0) {
        lineas.set(id, g);
      }
    }
  }

  F.pedido = {
    MAX_GRAMOS, producto, gramos, agregar, cambiar, quitar, vaciar, items, total, cantidad, suscribir, restaurar
  };
})();
