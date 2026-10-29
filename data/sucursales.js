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
    mapaEmbed  (opcional) mapa que se ve en "Dónde estamos". En Google Maps: buscá el local →
               Compartir → Insertar un mapa → copiá solo lo que está dentro de src="..."
               (empieza con https://www.google.com/maps/embed). Sin esto, no se muestra mapa.
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
    mapa: 'https://www.google.com/maps/search/?api=1&query=-34.49172470943497,-58.84100720286366',
    mapaEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d205.52750781507757!2d-58.84100720286366!3d-34.49172470943497!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bc9bc332923b59%3A0xcfbc42f59b014c39!2sAlmac%C3%A9n%20de%20Fiambres!5e0!3m2!1ses!2sar!4v1793241761564!5m2!1ses!2sar',
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
    mapa: 'https://www.google.com/maps/search/?api=1&query=-34.493183790356426,-58.84417050111352',
    mapaEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d205.52391169091055!2d-58.84417050111352!3d-34.493183790356426!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bc9b0016c07b7f%3A0x5362d94569f9e85f!2sSabores%20del%20campo!5e0!3m2!1ses!2sar!4v1793242146191!5m2!1ses!2sar',
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
    mapa: 'https://www.google.com/maps/search/?api=1&query=-34.48724464377637,-58.84248082846123',
    mapaEmbed: 'https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d205.53854877712143!2d-58.84248082846123!3d-34.48724464377637!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses!2sar!4v1793242253265!5m2!1ses!2sar',
    horarios: [
      { dias: [1, 2, 3, 4, 5, 6], desde: '08:00', hasta: '20:00' },
      { dias: [7], desde: '09:00', hasta: '13:00' }
    ]
  }
];
