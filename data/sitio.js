/*
  ============================================================
  DATOS GENERALES DEL SITIO
  Acá está casi todo lo que se edita seguido: nombre, WhatsApp,
  textos de cada sección y qué secciones se muestran.
  Los productos, sucursales y precios mayoristas están en
  los otros archivos de esta carpeta (data/).
  ============================================================
*/
Fiambreria.datos.sitio = {

  // ⚠️ Mientras esto sea true, el sitio muestra un cartel de "datos de ejemplo".
  // Cuando cargues los datos reales de la fiambrería, ponelo en false.
  datosDeEjemplo: true,

  nombre: 'Almacén de Fiambres',

  // Logo: poné el archivo en la carpeta /img y escribí acá su ruta (ej: 'img/logo.png').
  // Si lo dejás vacío, se muestra el nombre en texto.
  logo: 'img/logo.png',
  logoAlto: 48, // alto en píxeles del logo en el encabezado

  // WhatsApp general, con código de país y sin +, espacios ni guiones.
  // Argentina celular: 54 9 + código de área + número  →  5491123456789
  whatsapp: '5491128336557',
  mensajeWhatsApp: 'Hola! Quería hacer una consulta.',

  // Redes (dejá vacío lo que no tengan). Tienen que ser links completos con https://
  redes: {
    instagram: '',
    facebook: ''
  },

  // Secciones que se muestran, en este orden.
  // Para ocultar una, borrá su línea. Para sumar una nueva, mirá el README.
  bloques: ['hero', 'productos', 'mayoristas', 'sucursales'],

  // ---------- Textos de cada sección ----------

  hero: {
    titulo: 'Fiambres y quesos, por la cantidad que necesites.',
    bajada: 'Elegí tus productos, armá el pedido y mandalo por WhatsApp a la sucursal que te quede más cerca.',
    // Foto principal (ej: 'img/hero.jpg'). Vacío = se muestra un diseño de baldosas.
    imagen: 'img/hero.jpg',
    imagenAlt: 'Logo de Almacén de Fiambres',
    botonPrincipal: { texto: 'Armar mi pedido', destino: '#productos' },
    botonSecundario: { texto: 'Ver sucursales', destino: '#sucursales' },
    // Cuántos productos "destacados" se muestran en el papelito del hero (los marcás en productos.js)
    cantidadDestacados: 4,
    // Tres frases cortas debajo de los botones
    puntos: [
      { titulo: 'Desde 50 g', texto: 'Pedís la cantidad justa, ni más ni menos.' },
      { titulo: 'Retiro en sucursal', texto: 'Te confirmamos por WhatsApp cuando está listo.' },
      { titulo: 'Venta mayorista', texto: 'Lista de precios para comercios y proveedores.' }
    ]
  },

  productos: {
    menu: 'Productos', // cómo se llama en el menú de arriba
    titulo: 'Productos',
    bajada: 'Elegí la cantidad de cada producto y armá tu pedido. Se pesa al cortar, así que el total final puede variar un poco.',
    buscador: 'Buscar producto',
    nota: 'Precios por la porción indicada (cada 50 g o cada 100 g). El importe final se confirma al pesar.'
  },

  mayoristas: {
    menu: 'Proveedores',
    titulo: 'Clientes proveedores',
    bajada: 'Precios especiales para comercios, restaurantes y revendedores.',
    // Beneficios (3 o 4 líneas cortas)
    beneficios: [
      'Piezas enteras y hormas, con precio por kilo.',
      'Pedido mínimo según el producto.',
      'Atención directa para coordinar entregas y retiros.'
    ],
    botonLista: 'Pedir la lista completa',
    mensajeLista: 'Hola! Soy un comercio y quiero recibir la lista de precios para proveedores.',
    botonAlta: 'Quiero ser cliente proveedor',
    mensajeAlta: 'Hola! Quiero ser cliente proveedor. ¿Qué datos necesitan para darme de alta?'
  },

  sucursales: {
    menu: 'Sucursales',
    titulo: 'Sucursales',
    bajada: 'Pasá por la que te quede más cerca o escribinos por WhatsApp.'
  },

  pie: {
    texto: 'Fiambres, quesos y más, cortados al momento.',
    aviso: 'Los precios son orientativos y se confirman al pesar. Imágenes ilustrativas.'
  },

  // ---------- Texto para buscadores y redes (SEO) ----------
  // Ojo: el <title> y la descripción también están en index.html (para que se vean al compartir el link).
  descripcion: 'Fiambres, quesos y embutidos desde 50 g. Armá tu pedido online y retiralo en la sucursal que prefieras.'
};
