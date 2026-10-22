/*
  ============================================================
  PRODUCTOS
  ⚠️ Los productos y precios de abajo son de EJEMPLO.

  Para AGREGAR un producto: copiá una línea { ... } de items,
  pegala debajo y cambiá los datos. Cada producto necesita:

    id           identificador único, sin espacios ni tildes (ej: 'jamon-cocido')
    categoria    el id de una categoría de la lista de arriba
    nombre       como se muestra
    descripcion  (opcional) una línea corta
    porcion      50 o 100  → el precio es "cada 50 g" o "cada 100 g"
                 y el cliente suma de a esa cantidad
    precio       precio de UNA porción, en pesos, sin puntos ni símbolo (ej: 3100)
    destacado    (opcional) true = aparece en el papelito de la portada
    disponible   (opcional) false = se muestra como "Sin stock" y no se puede pedir
    imagen       (opcional) foto chica, ej: 'img/productos/jamon-cocido.jpg'

  Para CAMBIAR UN PRECIO: modificá el número de "precio" y listo.
  Para SACAR un producto de la venta sin borrarlo: disponible: false.
  ============================================================
*/
Fiambreria.datos.productos = {

  // El orden de esta lista es el orden en que se muestran las categorías.
  categorias: [
    { id: 'fiambres', nombre: 'Fiambres' },
    { id: 'embutidos', nombre: 'Crudos y embutidos' },
    { id: 'quesos', nombre: 'Quesos' },
    { id: 'picar', nombre: 'Para picar' }
  ],

  items: [
    // ---- Fiambres ----
    { id: 'jamon-cocido', categoria: 'fiambres', nombre: 'Jamón cocido natural', descripcion: 'Feta fina, sin cubo de grasa.', porcion: 100, precio: 3100, destacado: true },
    { id: 'paleta-cocida', categoria: 'fiambres', nombre: 'Paleta cocida', descripcion: 'La clásica para el sándwich.', porcion: 100, precio: 2300 },
    { id: 'mortadela-pistacho', categoria: 'fiambres', nombre: 'Mortadela con pistacho', descripcion: '', porcion: 100, precio: 1900 },
    { id: 'pastron', categoria: 'fiambres', nombre: 'Pastrón', descripcion: 'Cortado fino.', porcion: 100, precio: 3400 },
    { id: 'salchichon', categoria: 'fiambres', nombre: 'Salchichón primavera', descripcion: '', porcion: 100, precio: 2100 },

    // ---- Crudos y embutidos ----
    { id: 'jamon-crudo', categoria: 'embutidos', nombre: 'Jamón crudo', descripcion: 'Madurado, corte al momento.', porcion: 50, precio: 2900, destacado: true },
    { id: 'bondiola', categoria: 'embutidos', nombre: 'Bondiola curada', descripcion: '', porcion: 50, precio: 1850 },
    { id: 'salame-milan', categoria: 'embutidos', nombre: 'Salame Milán', descripcion: '', porcion: 100, precio: 2600 },
    { id: 'longaniza', categoria: 'embutidos', nombre: 'Longaniza', descripcion: '', porcion: 100, precio: 2400 },
    { id: 'panceta-ahumada', categoria: 'embutidos', nombre: 'Panceta ahumada', descripcion: 'Feteada.', porcion: 100, precio: 1900 },

    // ---- Quesos ----
    { id: 'cremoso', categoria: 'quesos', nombre: 'Queso cremoso', descripcion: 'Para fundir.', porcion: 100, precio: 1700, destacado: true },
    { id: 'pategras', categoria: 'quesos', nombre: 'Pategrás', descripcion: '', porcion: 100, precio: 2200 },
    { id: 'sardo', categoria: 'quesos', nombre: 'Sardo', descripcion: 'Semiduro, sabor intenso.', porcion: 100, precio: 2700 },
    { id: 'provolone', categoria: 'quesos', nombre: 'Provolone', descripcion: 'Ideal para provoleta.', porcion: 100, precio: 2500, destacado: true },
    { id: 'port-salut', categoria: 'quesos', nombre: 'Port Salut', descripcion: '', porcion: 100, precio: 2000 },
    { id: 'reggianito', categoria: 'quesos', nombre: 'Reggianito', descripcion: 'Para rallar o picar.', porcion: 50, precio: 1700 },
    { id: 'azul', categoria: 'quesos', nombre: 'Queso azul', descripcion: '', porcion: 50, precio: 1500, disponible: false },

    // ---- Para picar ----
    { id: 'aceitunas-verdes', categoria: 'picar', nombre: 'Aceitunas verdes', descripcion: '', porcion: 100, precio: 1100 },
    { id: 'aceitunas-negras', categoria: 'picar', nombre: 'Aceitunas negras', descripcion: '', porcion: 100, precio: 1300 },
    { id: 'frutos-secos', categoria: 'picar', nombre: 'Mix de frutos secos', descripcion: '', porcion: 100, precio: 2400 }
  ]
};
