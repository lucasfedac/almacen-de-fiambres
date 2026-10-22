/*
  Espacio de nombres único del sitio.
  Todo cuelga de window.Fiambreria para no ensuciar el ámbito global:
    Fiambreria.datos    → contenido editable (archivos de /data)
    Fiambreria.util     → funciones de ayuda (js/core/util.js)
    Fiambreria.pedido   → estado del pedido (js/core/estado-pedido.js)
    Fiambreria.bloques  → cada sección del sitio (js/bloques/*.js)
*/
(function () {
  'use strict';
  window.Fiambreria = { datos: {}, util: {}, pedido: null, bloques: {}, ui: {} };
})();
