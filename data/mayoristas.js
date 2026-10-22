/*
  ============================================================
  CLIENTES PROVEEDORES (lista de precios mayorista)
  ⚠️ Los precios de abajo son de EJEMPLO.

  mostrarPrecios
     true  → la tabla de precios se ve en la web (es pública: la puede ver cualquiera).
     false → la tabla se oculta y el sitio invita a pedir la lista por WhatsApp.

  ⚠️ IMPORTANTE (seguridad):
  En un sitio estático NO se puede esconder una tabla "con contraseña" de forma segura.
  Y este archivo también es público: cualquiera puede abrirlo escribiendo
  tudominio.com/data/mayoristas.js en el navegador.
  Si los precios NO deben ser públicos:
     1) poné mostrarPrecios: false
     2) vaciá la lista:  items: []   (no dejes los precios reales acá, aunque no se vean en la página)
     3) enviá la lista por WhatsApp a quien corresponda.
  Si necesitan un acceso real con usuario y contraseña, hace falta un servidor (ver README).

  Cada fila:
    producto      nombre
    presentacion  cómo se vende (pieza entera, horma, caja, etc.)
    minimo        compra mínima
    precioKilo    precio por kilo, en pesos, sin puntos ni símbolo
  ============================================================
*/
Fiambreria.datos.mayoristas = {
  mostrarPrecios: true,

  // Fecha de la última actualización, formato AAAA-MM-DD (se muestra en la tabla)
  actualizado: '2026-10-01',

  notaPrecios: 'Precios por kilo, sin IVA. Sujetos a cambios sin previo aviso.',

  items: [
    { producto: 'Jamón cocido natural', presentacion: 'Pieza entera (aprox. 4 kg)', minimo: '1 pieza', precioKilo: 24500 },
    { producto: 'Paleta cocida', presentacion: 'Pieza entera (aprox. 5 kg)', minimo: '1 pieza', precioKilo: 17800 },
    { producto: 'Mortadela con pistacho', presentacion: 'Pieza entera (aprox. 3 kg)', minimo: '1 pieza', precioKilo: 14500 },
    { producto: 'Salame Milán', presentacion: 'Pieza (aprox. 1 kg)', minimo: '5 piezas', precioKilo: 20500 },
    { producto: 'Queso cremoso', presentacion: 'Horma (aprox. 4 kg)', minimo: '1 horma', precioKilo: 13200 },
    { producto: 'Pategrás', presentacion: 'Horma (aprox. 4 kg)', minimo: '1 horma', precioKilo: 17200 },
    { producto: 'Provolone', presentacion: 'Pieza (aprox. 1 kg)', minimo: '5 piezas', precioKilo: 19500 },
    { producto: 'Mozzarella', presentacion: 'Barra (aprox. 4 kg)', minimo: '1 barra', precioKilo: 12800 }
  ]
};
