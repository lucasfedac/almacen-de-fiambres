/*
  ============================================================
  PROMOS
  Para AGREGAR una promo: copiá una línea { ... } de items,
  pegala debajo (con su coma) y cambiá los datos. Cada promo tiene:

    id           identificador único, sin espacios ni tildes (ej: 'promo-28')
    titulo       como se muestra (ej: 'Promo 28')
    descripcion  qué trae la promo, en una línea
    precio       precio de la promo, en pesos, sin puntos ni símbolo (ej: 11200)
    unidad       a qué se refiere el precio:
                   'combo'  → el precio es por toda la promo
                   'kilo'   → el precio es por kilo
                   '100g'   → el precio es cada 100 g
    imagen       (opcional) foto de la promo, ej: 'img/promos/promo-28.jpg'
                 (cuadrada, ~800 px de ancho, .jpg o .webp)
    hasta        (opcional) último día en que vale, formato 'AAAA-MM-DD'
                 (ej: '2026-11-30'). Pasada esa fecha la promo se oculta sola.
                 Sin fecha, se muestra siempre.
    destacada    (opcional) true = aparece primero y con la etiqueta "Destacada"

  Para CAMBIAR UN PRECIO: modificá el número de "precio" y listo.
  Para SACAR una promo: borrá su línea (o ponele una fecha "hasta" que ya pasó).
  Si no queda ninguna promo vigente, la sección se oculta sola.
  Las promos se muestran en el orden de esta lista (las destacadas, primero).
  ============================================================
*/
Fiambreria.datos.promos = {
  items: [
    { id: 'promo-1', titulo: 'Promo 1', descripcion: '100 g de salchichón, paleta, mortadela, matambre y queso de cerdo.', precio: 6100, unidad: 'combo', imagen: 'img/promos/promo-01.jpg' },
    { id: 'promo-2', titulo: 'Promo 2', descripcion: '100 g de queso máquina, jamón cocido tradicional, mortadela cañón, salchichón y salame milán.', precio: 7900, unidad: 'combo', imagen: 'img/promos/promo-02.jpg' },
    { id: 'promo-3', titulo: 'Promo 3', descripcion: '200 g de queso máquina, mortadela cañón, matambre arrollado, salchichón y jamón cocido tradicional.', precio: 14300, unidad: 'combo', imagen: 'img/promos/promo-03.jpg' },
    { id: 'promo-4', titulo: 'Promo 4', descripcion: '2 prepizzas de tomate, 400 g de aceituna verde, 200 g de paleta cocida y 400 g de muzzarella de 1ra.', precio: 11200, unidad: 'combo', imagen: 'img/promos/promo-04.jpg' },
    { id: 'promo-5', titulo: 'Promo 5', descripcion: '100 g de queso de máquina y 150 g de jamón natural mediterráneo.', precio: 3500, unidad: 'combo', imagen: 'img/promos/promo-05.jpg' },
    { id: 'promo-6', titulo: 'Promo 6', descripcion: '300 g de jamón crudo.', precio: 8800, unidad: 'combo', imagen: 'img/promos/promo-06.jpg' },
    { id: 'promo-7', titulo: 'Promo 7', descripcion: '100 g de queso de máquina y 100 g de jamón crudo.', precio: 3900, unidad: 'combo', imagen: 'img/promos/promo-07.jpg' },
    { id: 'promo-8', titulo: 'Promo 8', descripcion: '200 g de jamón natural, salame milán y queso de máquina.', precio: 11200, unidad: 'combo', imagen: 'img/promos/promo-08.jpg' },
    { id: 'promo-9', titulo: 'Promo 9', descripcion: '100 g de paleta, jamón crudo, salame y queso de máquina.', precio: 6700, unidad: 'combo', imagen: 'img/promos/promo-09.jpg' },
    { id: 'promo-10', titulo: 'Promo 10', descripcion: '100 g de salchichón, mortadela bocha y matambre arrollado.', precio: 4900, unidad: 'combo', imagen: 'img/promos/promo-10.jpg' },
    { id: 'promo-11', titulo: 'Promo 11', descripcion: '100 g de panceta ahumada, lomito y bondiola.', precio: 9400, unidad: 'combo', imagen: 'img/promos/promo-11.jpg' },
    { id: 'promo-12', titulo: 'Promo 12', descripcion: '100 g de salame, queso de máquina, mortadela cañón y paleta cocida.', precio: 5700, unidad: 'combo', imagen: 'img/promos/promo-12.jpg' },
    { id: 'promo-13', titulo: 'Promo 13', descripcion: '100 g de salame milán, 100 g de jamón natural y 200 g de queso de máquina.', precio: 7200, unidad: 'combo', imagen: 'img/promos/promo-13.jpg' },
    { id: 'promo-14', titulo: 'Promo 14', descripcion: '250 g de salame milán.', precio: 5300, unidad: 'combo', imagen: 'img/promos/promo-14.jpg' },
    { id: 'promo-15', titulo: 'Promo 15', descripcion: '250 g de queso de máquina.', precio: 3700, unidad: 'combo', imagen: 'img/promos/promo-15.jpg' },
    { id: 'promo-16', titulo: 'Promo 16', descripcion: '250 g de jamón natural mediterráneo.', precio: 4400, unidad: 'combo', imagen: 'img/promos/promo-16.jpg' },
    { id: 'promo-17', titulo: 'Promo 17', descripcion: '200 g de paleta cocida, 200 g de queso cremoso de la casa y 1 tapa de pascualina Lozanol.', precio: 5900, unidad: 'combo', imagen: 'img/promos/promo-17.jpg' },
    { id: 'promo-18', titulo: 'Promo 18', descripcion: '250 g de mortadela bocha Calchaquí.', precio: 4100, unidad: 'combo', imagen: 'img/promos/promo-18.jpg' },
    { id: 'promo-19', titulo: 'Promo 19', descripcion: '100 g de salame milán, 100 g de mortadela bocha Calchaquí y 150 g de queso de máquina.', precio: 6400, unidad: 'combo', imagen: 'img/promos/promo-19.jpg' },
    { id: 'promo-20', titulo: 'Promo 20', descripcion: '250 g de paleta cocida Mediterráneo.', precio: 3500, unidad: 'combo', imagen: 'img/promos/promo-20.jpg' },
    { id: 'promo-21', titulo: 'Promo 21', descripcion: '250 g de jamón cocido Prima Selezione.', precio: 4300, unidad: 'combo', imagen: 'img/promos/promo-21.jpg' },
    { id: 'promo-22', titulo: 'Promo 22', descripcion: '500 g de paleta cocida Mediterráneo.', precio: 6200, unidad: 'combo', imagen: 'img/promos/promo-22.jpg' },
    { id: 'promo-23', titulo: 'Promo 23', descripcion: '500 g de jamón cocido Prima Selezione.', precio: 8500, unidad: 'combo', imagen: 'img/promos/promo-23.jpg' },
    { id: 'promo-24', titulo: 'Promo 24', descripcion: '500 g de panceta ahumada Cagnoli.', precio: 16000, unidad: 'combo', imagen: 'img/promos/promo-24.jpg' },
    { id: 'promo-25', titulo: 'Promo 25', descripcion: '250 g de queso de máquina y 250 g de salame milán Imperiale.', precio: 7600, unidad: 'combo', imagen: 'img/promos/promo-25.jpg' },
    { id: 'promo-26', titulo: 'Promo 26', descripcion: '100 g de salame milán Imperiale, queso de máquina y paleta cocida.', precio: 4700, unidad: 'combo', imagen: 'img/promos/promo-26.jpg' },
    { id: 'promo-27', titulo: 'Promo 27', descripcion: '100 g de salame milán Imperiale y 150 g de queso de máquina.', precio: 4700, unidad: 'combo', imagen: 'img/promos/promo-27.jpg' }
  ]
};
