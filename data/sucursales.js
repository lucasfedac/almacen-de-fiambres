/*
  ============================================================
  SUCURSALES
  Para agregar una sucursal, copiá un bloque { ... } completo,
  pegalo al final (con una coma antes) y cambiá los datos.

  ⚠️ Los datos de abajo son de EJEMPLO.

  Campos:
    id         identificador corto, sin espacios ni tildes (no se repite)
    nombre     cómo se llama la sucursal
    direccion  calle y número
    localidad  ciudad o barrio
    referencia (opcional) "Frente a la plaza", etc.
    telefono   (opcional) para mostrar y llamar
    whatsapp   (opcional) si no lo ponés, se usa el WhatsApp general de sitio.js
    mapa       (opcional) link de Google Maps. Si no lo ponés, se arma solo con la dirección
    horarios   lista de turnos. dias: 1=lunes ... 7=domingo
               Si abre cortado (mañana y tarde), poné dos turnos para los mismos días.
  ============================================================
*/
Fiambreria.datos.sucursales = [
  {
    id: 'centro',
    nombre: 'Sucursal Medrano',
    direccion: 'San Martín 1200',
    localidad: 'Tu ciudad',
    referencia: 'A media cuadra de la plaza',
    telefono: '0000 00-0000',
    whatsapp: '5491128336557',
    mapa: '',
    horarios: [
      { dias: [1, 2, 3, 4, 5], desde: '08:30', hasta: '20:30' },
      { dias: [6], desde: '08:30', hasta: '14:00' }
    ]
  },
  {
    id: 'norte',
    nombre: 'Sucursal Av. de Mayo',
    direccion: 'Belgrano 450',
    localidad: 'Tu ciudad',
    referencia: '',
    telefono: '0000 00-0001',
    whatsapp: '5491128336557',
    mapa: '',
    horarios: [
      { dias: [1, 2, 3, 4, 5], desde: '09:00', hasta: '13:00' },
      { dias: [1, 2, 3, 4, 5], desde: '17:00', hasta: '21:00' },
      { dias: [6], desde: '09:00', hasta: '14:00' }
    ]
  },
  {
    id: 'sur',
    nombre: 'Sucursal GULF',
    direccion: 'Mitre 2380',
    localidad: 'Tu ciudad',
    referencia: 'Esquina Alsina',
    telefono: '',
    whatsapp: '5491128336557',
    mapa: '',
    horarios: [
      { dias: [1, 2, 3, 4, 5, 6], desde: '08:00', hasta: '20:00' },
      { dias: [7], desde: '09:00', hasta: '13:00' }
    ]
  }
];
