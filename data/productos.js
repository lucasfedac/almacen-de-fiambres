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
    { id: 'quesos', nombre: 'Quesos' }
  ],

  // Precios de EJEMPLO (se actualizan más adelante). Todos se piden de a 50 g.
  items: [
    // ---- Fiambres ----
    { id: 'jamon-cocido-bierzo', categoria: 'fiambres', nombre: 'Jamón cocido Bierzo', descripcion: '', porcion: 50, precio: 3100, imagen: 'img/productos/jamon-cocido-bierzo.jpg' },
    { id: 'jamon-cocido-calchaqui', categoria: 'fiambres', nombre: 'Jamón cocido Calchaquí', descripcion: '', porcion: 50, precio: 2300, imagen: 'img/productos/jamon-cocido-calchaqui.jpg' },
    { id: 'jamon-cocido-mediterraneo', categoria: 'fiambres', nombre: 'Jamón cocido Mediterráneo', descripcion: '', porcion: 50, precio: 3300, imagen: 'img/productos/jamon-cocido-mediterraneo.jpg' },
    { id: 'jamon-natural-cagnoli', categoria: 'fiambres', nombre: 'Jamón natural Cagnoli', descripcion: '', porcion: 50, precio: 2500, imagen: 'img/productos/jamon-natural-cagnoli.jpg' },
    { id: 'jamon-natural-campo-austral', categoria: 'fiambres', nombre: 'Jamón natural Campo Austral', descripcion: '', porcion: 50, precio: 2500, imagen: 'img/productos/jamon-natural-campo-austral.jpg' },
    { id: 'jamon-natural-mediterraneo', categoria: 'fiambres', nombre: 'Jamón natural Mediterráneo', descripcion: '', porcion: 50, precio: 2900, imagen: 'img/productos/jamon-natural-mediterraneo.jpg' },
    { id: 'leber-calchaqui', categoria: 'fiambres', nombre: 'Leber Calchaquí', descripcion: '', porcion: 50, precio: 2900, imagen: 'img/productos/leber-calchaqui.jpg' },
    { id: 'lomo-ahumado-el-bierzo', categoria: 'fiambres', nombre: 'Lomo ahumado El Bierzo', descripcion: '', porcion: 50, precio: 3200, imagen: 'img/productos/lomo-ahumado-el-bierzo.jpg' },
    { id: 'lomo-de-cerdo-mediterraneo', categoria: 'fiambres', nombre: 'Lomo de cerdo Mediterráneo', descripcion: '', porcion: 50, precio: 2200, imagen: 'img/productos/lomo-de-cerdo-mediterraneo.jpg' },
    { id: 'lomo-de-cerdo-con-finas-hierbas', categoria: 'fiambres', nombre: 'Lomo de cerdo con finas hierbas', descripcion: '', porcion: 50, precio: 2200, imagen: 'img/productos/lomo-de-cerdo-con-finas-hierbas.jpg' },
    { id: 'mortadela-bocatti-con-pistacho', categoria: 'fiambres', nombre: 'Mortadela Bocatti con pistacho', descripcion: '', porcion: 50, precio: 2900, imagen: 'img/productos/mortadela-bocatti-con-pistacho.jpg' },
    { id: 'mortadela-bocha-calchaqui', categoria: 'fiambres', nombre: 'Mortadela Bocha Calchaquí', descripcion: '', porcion: 50, precio: 2700, imagen: 'img/productos/mortadela-bocha-calchaqui.jpg' },
    { id: 'mortadela-canon-calchaqui', categoria: 'fiambres', nombre: 'Mortadela Cañón Calchaquí', descripcion: '', porcion: 50, precio: 3400, imagen: 'img/productos/mortadela-canon-calchaqui.jpg' },
    { id: 'mortadela-piccola-calchaqui', categoria: 'fiambres', nombre: 'Mortadela Piccola Calchaquí', descripcion: '', porcion: 50, precio: 2400, imagen: 'img/productos/mortadela-piccola-calchaqui.jpg' },
    { id: 'paleta-americana-bierzo', categoria: 'fiambres', nombre: 'Paleta americana Bierzo', descripcion: '', porcion: 50, precio: 2400, imagen: 'img/productos/paleta-americana-bierzo.jpg' },
    { id: 'paleta-cocida-calchaqui', categoria: 'fiambres', nombre: 'Paleta cocida Calchaquí', descripcion: '', porcion: 50, precio: 2600, imagen: 'img/productos/paleta-cocida-calchaqui.jpg' },
    { id: 'paleta-cocida-el-bierzo', categoria: 'fiambres', nombre: 'Paleta cocida El Bierzo', descripcion: '', porcion: 50, precio: 2200, imagen: 'img/productos/paleta-cocida-el-bierzo.jpg' },
    { id: 'paleta-cocida-mediterraneo', categoria: 'fiambres', nombre: 'Paleta cocida Mediterráneo', descripcion: '', porcion: 50, precio: 2400, imagen: 'img/productos/paleta-cocida-mediterraneo.jpg' },
    { id: 'paleta-sanguchera-goggi', categoria: 'fiambres', nombre: 'Paleta sanguchera Goggi', descripcion: '', porcion: 50, precio: 3400, imagen: 'img/productos/paleta-sanguchera-goggi.jpg' },
    { id: 'queso-de-cerdo-bierzo', categoria: 'fiambres', nombre: 'Queso de cerdo Bierzo', descripcion: '', porcion: 50, precio: 3000, imagen: 'img/productos/queso-de-cerdo-bierzo.jpg' },

    // ---- Crudos y embutidos ----
    { id: 'bondiola-calchaqui', categoria: 'embutidos', nombre: 'Bondiola Calchaquí', descripcion: '', porcion: 50, precio: 3000, imagen: 'img/productos/bondiola-calchaqui.jpg' },
    { id: 'bondiola-sello-de-oro', categoria: 'embutidos', nombre: 'Bondiola Sello de Oro', descripcion: '', porcion: 50, precio: 2900, imagen: 'img/productos/bondiola-sello-de-oro.jpg' },
    { id: 'burzot-sello-de-oro', categoria: 'embutidos', nombre: 'Burzot Sello de Oro', descripcion: '', porcion: 50, precio: 3400, imagen: 'img/productos/burzot-sello-de-oro.jpg' },
    { id: 'jamon-crudo-el-artesano', categoria: 'embutidos', nombre: 'Jamón crudo El Artesano', descripcion: '', porcion: 50, precio: 3000, imagen: 'img/productos/jamon-crudo-el-artesano.jpg' },
    { id: 'jamon-crudo-sello-de-oro', categoria: 'embutidos', nombre: 'Jamón crudo Sello de Oro', descripcion: '', porcion: 50, precio: 3400, imagen: 'img/productos/jamon-crudo-sello-de-oro.jpg' },
    { id: 'longaniza-campo-austral', categoria: 'embutidos', nombre: 'Longaniza Campo Austral', descripcion: '', porcion: 50, precio: 3500, imagen: 'img/productos/longaniza-campo-austral.jpg' },
    { id: 'panceta-ahumada-cagnoli', categoria: 'embutidos', nombre: 'Panceta ahumada Cagnoli', descripcion: '', porcion: 50, precio: 3800, imagen: 'img/productos/panceta-ahumada-cagnoli.jpg' },
    { id: 'panceta-ahumada-mediterraneo', categoria: 'embutidos', nombre: 'Panceta ahumada Mediterráneo', descripcion: '', porcion: 50, precio: 2800, imagen: 'img/productos/panceta-ahumada-mediterraneo.jpg' },
    { id: 'panceta-ahumada-tiernizada-mediterraneo', categoria: 'embutidos', nombre: 'Panceta ahumada tiernizada Mediterráneo', descripcion: '', porcion: 50, precio: 3200, imagen: 'img/productos/panceta-ahumada-tiernizada-mediterraneo.jpg' },
    { id: 'panceta-salada-calchaqui', categoria: 'embutidos', nombre: 'Panceta salada Calchaquí', descripcion: '', porcion: 50, precio: 3500, imagen: 'img/productos/panceta-salada-calchaqui.jpg' },
    { id: 'pepperoni-sello-de-oro', categoria: 'embutidos', nombre: 'Pepperoni Sello de Oro', descripcion: '', porcion: 50, precio: 3200, imagen: 'img/productos/pepperoni-sello-de-oro.jpg' },
    { id: 'salame-cantimpalo-el-bierzo', categoria: 'embutidos', nombre: 'Salame Cantimpalo El Bierzo', descripcion: '', porcion: 50, precio: 3700, imagen: 'img/productos/salame-cantimpalo-el-bierzo.jpg' },
    { id: 'salame-crespon-el-bierzo', categoria: 'embutidos', nombre: 'Salame Crespón El Bierzo', descripcion: '', porcion: 50, precio: 3600, imagen: 'img/productos/salame-crespon-el-bierzo.jpg' },
    { id: 'salame-milan-bierzo', categoria: 'embutidos', nombre: 'Salame Milán Bierzo', descripcion: '', porcion: 50, precio: 3500, imagen: 'img/productos/salame-milan-bierzo.jpg' },
    { id: 'salame-milan-cagnoli', categoria: 'embutidos', nombre: 'Salame Milán Cagnoli', descripcion: '', porcion: 50, precio: 3400, imagen: 'img/productos/salame-milan-cagnoli.jpg' },
    { id: 'salame-milan-calchaqui', categoria: 'embutidos', nombre: 'Salame Milán Calchaquí', descripcion: '', porcion: 50, precio: 2900, imagen: 'img/productos/salame-milan-calchaqui.jpg' },
    { id: 'salame-milan-campo-austral', categoria: 'embutidos', nombre: 'Salame Milán Campo Austral', descripcion: '', porcion: 50, precio: 3700, imagen: 'img/productos/salame-milan-campo-austral.jpg' },
    { id: 'salame-milan-imperiale', categoria: 'embutidos', nombre: 'Salame Milán Imperiale', descripcion: '', porcion: 50, precio: 2700, imagen: 'img/productos/salame-milan-imperiale.jpg' },
    { id: 'salamin-cagnoli', categoria: 'embutidos', nombre: 'Salamín Cagnoli', descripcion: '', porcion: 50, precio: 3600, imagen: 'img/productos/salamin-cagnoli.jpg' },
    { id: 'salamin-el-bierzo', categoria: 'embutidos', nombre: 'Salamín El Bierzo', descripcion: '', porcion: 50, precio: 3300, imagen: 'img/productos/salamin-el-bierzo.jpg' },

    // ---- Quesos ----
    { id: 'provolone-trelau', categoria: 'quesos', nombre: 'Provolone Trelau', descripcion: '', porcion: 50, precio: 2400, imagen: 'img/productos/provolone-trelau.jpg' },
    { id: 'queso-cremon-clasico', categoria: 'quesos', nombre: 'Queso Cremón clásico', descripcion: '', porcion: 50, precio: 2200, imagen: 'img/productos/queso-cremon-clasico.jpg' },
    { id: 'queso-cremon-light', categoria: 'quesos', nombre: 'Queso Cremón light', descripcion: '', porcion: 50, precio: 2300, imagen: 'img/productos/queso-cremon-light.jpg' },
    { id: 'queso-parmesano-vaquero', categoria: 'quesos', nombre: 'Queso Parmesano Vaquero', descripcion: '', porcion: 50, precio: 2000, imagen: 'img/productos/queso-parmesano-vaquero.jpg' },
    { id: 'queso-por-salut-punta-del-agua', categoria: 'quesos', nombre: 'Queso Por Salut Punta del Agua', descripcion: '', porcion: 50, precio: 2300, imagen: 'img/productos/queso-por-salut-punta-del-agua.jpg' },
    { id: 'queso-por-salut-sin-sal-barraza', categoria: 'quesos', nombre: 'Queso Por Salut sin sal Barraza', descripcion: '', porcion: 50, precio: 3000, imagen: 'img/productos/queso-por-salut-sin-sal-barraza.jpg' },
    { id: 'queso-romanito-castelar', categoria: 'quesos', nombre: 'Queso Romanito Castelar', descripcion: '', porcion: 50, precio: 1900, imagen: 'img/productos/queso-romanito-castelar.jpg' },
    { id: 'queso-sardo-castelar', categoria: 'quesos', nombre: 'Queso Sardo Castelar', descripcion: '', porcion: 50, precio: 1800, imagen: 'img/productos/queso-sardo-castelar.jpg' },
    { id: 'queso-sardo-duro-punta-del-agua', categoria: 'quesos', nombre: 'Queso Sardo duro Punta del Agua', descripcion: '', porcion: 50, precio: 2400, imagen: 'img/productos/queso-sardo-duro-punta-del-agua.jpg' },
    { id: 'queso-sardo-fresco-itati', categoria: 'quesos', nombre: 'Queso Sardo fresco Itatí', descripcion: '', porcion: 50, precio: 2300, imagen: 'img/productos/queso-sardo-fresco-itati.jpg' },
    { id: 'queso-cremoso-makis', categoria: 'quesos', nombre: 'Queso cremoso Makis', descripcion: '', porcion: 50, precio: 2900, imagen: 'img/productos/queso-cremoso-makis.jpg' },
    { id: 'queso-cremoso-noalsa', categoria: 'quesos', nombre: 'Queso cremoso Noalsa', descripcion: '', porcion: 50, precio: 1900, imagen: 'img/productos/queso-cremoso-noalsa.jpg' },
    { id: 'queso-cremoso-punta-del-agua', categoria: 'quesos', nombre: 'Queso cremoso Punta del Agua', descripcion: '', porcion: 50, precio: 2200, imagen: 'img/productos/queso-cremoso-punta-del-agua.jpg' },
    { id: 'queso-reggianito-melincue', categoria: 'quesos', nombre: 'Queso reggianito Melincué', descripcion: '', porcion: 50, precio: 2800, imagen: 'img/productos/queso-reggianito-melincue.jpg' }
  ]
};
