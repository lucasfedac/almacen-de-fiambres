# Web de Almacén de Fiambres

Sitio estático (HTML + CSS + JavaScript, sin instalar nada) pensado para que se pueda
modificar sin tocar el código: **casi todo lo que cambia (productos, precios, sucursales,
teléfonos, textos) está en la carpeta `data/`**.

---

## 1. Cómo verla en tu compu

Desde una terminal, dentro de esta carpeta:

```
python3 servidor-dev.py
```

Abrí `http://localhost:8000` en el navegador. Para frenarlo: `Ctrl + C`.
(Se usa un servidor local en vez de abrir `index.html` con doble clic porque así se
comporta igual que cuando esté publicada.)

`servidor-dev.py` es como `python3 -m http.server 8000`, pero le pide al navegador que **no guarde
copias** de los archivos. Con el servidor común, el navegador puede quedarse con un archivo viejo
y mezclarlo con uno nuevo: la web "se rompe" o una sección desaparece hasta que se fuerza la recarga.
Si usás el servidor común igual, recargá con `Ctrl + Shift + R`.

Opciones: otro puerto (`python3 servidor-dev.py 9000`) o verla desde el celular conectado al mismo wifi
(`python3 servidor-dev.py 8000 0.0.0.0` y abrir `http://IP-DE-LA-COMPU:8000` desde el celular).

---

## 2. Qué hay en cada carpeta

```
index.html            Estructura mínima. No hay que tocarlo salvo para sumar un bloque nuevo.
servidor-dev.py       Para ver la web en tu compu (sección 1). No hace falta subirlo al hosting.
data/                 ← LO QUE SE EDITA SEGUIDO
  sitio.js              Nombre, WhatsApp, logo, textos de cada sección, qué secciones se ven
  productos.js          Productos, categorías y precios (por 50 g o por 100 g)
  promos.js             Promos (combos) con su foto, precio y fecha de vencimiento
  sucursales.js         Las 3 sucursales: dirección, teléfono, WhatsApp, horarios
  mayoristas.js         Lista de precios para clientes proveedores
css/
  tokens.css            Colores, tipografías y medidas (para adaptar a la marca)
  base.css, componentes.css, fuentes.css
  bloques/              Un archivo de estilos por sección
js/
  core/                 Funciones compartidas (no tocar)
  bloques/              Un archivo por sección (hero, productos, pedido, mayoristas, ...)
  main.js               Arma la página según data/sitio.js
img/                    Logo y fotos
  productos/            Fotos chicas de productos (opcional)
  promos/               Fotos de las promos (cuadradas, ~800 px)
fonts/                  Tipografías (van incluidas, no se cargan de internet)
.htaccess / _headers    Reglas de seguridad del hosting (ver sección 6)
```

---

## 3. Tareas de todos los días

### Cambiar el precio de un producto
Abrí `data/productos.js`, buscá el producto y cambiá el número de `precio`. Listo.
Es el precio de **una porción** (`porcion: 100` → "cada 100 g", `porcion: 50` → "cada 50 g").

### Agregar un producto
Copiá una línea `{ ... }` de `items`, pegala debajo (con su coma) y cambiá los datos.
El `id` tiene que ser único, sin espacios ni tildes. Si algo está mal, el navegador avisa
en la consola (tecla F12 → pestaña Consola) con un mensaje que empieza con `[Sitio]`.

### Sacar un producto sin borrarlo
Agregá `disponible: false` y se muestra como "Sin stock".

### Agregar una categoría
Sumala a la lista `categorias` (arriba en `data/productos.js`) y usá su `id` en los productos.

### Poner foto a un producto
Guardá la foto chica (cuadrada, ~200 px, `.jpg` o `.webp`) en `img/productos/` y agregá
`imagen: 'img/productos/jamon-cocido.jpg'` al producto. Si la foto no carga, se muestra sin foto.

### Cambiar el precio de una promo, o agregar una
Abrí `data/promos.js`. Para cambiar el precio, modificá el número de `precio`. Para agregar una promo,
copiá una línea `{ ... }`, pegala debajo (con su coma) y cambiá los datos. Las promos son combos: el
cliente las agrega al mismo pedido que los productos y las cuenta **por unidad** (2 × Promo 4), no por gramos.

- **Foto:** guardala en `img/promos/` (cuadrada, ~800 px de ancho, `.jpg` o `.webp`) y poné su ruta en `imagen`.
  El nombre y el precio tienen que cargarse también en `titulo` y `precio` (no alcanza con que estén escritos en la foto).
- **Que venza sola:** `hasta: '2026-11-30'` (año-mes-día). Pasada esa fecha la promo se oculta sola, y si estaba en el
  pedido de alguien se saca. Si no queda ninguna promo vigente, la sección entera desaparece.
- **Destacarla:** `destacada: true` la muestra primero y con una etiqueta.
- **Sacarla:** borrá su línea.
- **Cuántas se ven al principio:** `data/sitio.js` → `promos.visiblesAlInicio` (el resto aparece con "Ver más promos"; `0` = todas, que es como está ahora).

### Cambiar el WhatsApp o el nombre
`data/sitio.js` → `whatsapp` (con código de país, sin `+` ni espacios: `5491123456789`) y `nombre`.
Cada sucursal puede tener su propio WhatsApp en `data/sucursales.js`; el pedido se envía al de la
sucursal elegida.

### Poner el logo y la foto de portada
1. Copiá el logo a `img/` (ej: `img/logo.png`) y en `data/sitio.js` poné `logo: 'img/logo.png'`.
2. Copiá la foto principal a `img/` (ej: `img/portada.jpg`, vertical, ~640×800) y poné
   `hero.imagen: 'img/portada.jpg'`. Sin foto se muestra un diseño de baldosas.
3. Si el logo tiene otros colores que el bordó actual, cambiá los colores en `css/tokens.css`.

### Agregar o cambiar una sucursal
`data/sucursales.js`: copiá un bloque `{ ... }` completo y cambiá los datos. Los horarios
usan `dias: [1..7]` (1 = lunes). Si abre cortado (mañana y tarde) cargá dos turnos para los
mismos días. El cartel "Abierto ahora / Cerrado" se calcula solo con hora argentina.

### Ocultar o reordenar secciones
`data/sitio.js` → `bloques: ['hero', 'promos', 'productos', 'mayoristas', 'sucursales']`.
Borrá un nombre para ocultar esa sección, o cambiá el orden. Ahora las Promos van primero y Productos en segundo lugar.
El botón principal de la portada ("Armar mi pedido") lleva a Promos: se cambia en `data/sitio.js` → `hero.botonPrincipal.destino`.

### Quitar el cartel amarillo de "datos de ejemplo"
Cuando estén cargados los datos reales: `data/sitio.js` → `datosDeEjemplo: false`.

---

## 4. Agregar una sección nueva (por ejemplo "Novedades" o "Sobre nosotros")

Cada sección es un **bloque** independiente: si uno falla, el resto del sitio sigue andando.
Ejemplo con un bloque llamado `novedades` (la sección de Promos que ya existe también se armó así: mirá `js/bloques/promos.js` como modelo):

1. **Crear `js/bloques/novedades.js`:**
   ```js
   (function () {
     'use strict';
     const F = window.Fiambreria;
     const { h } = F.util;

     F.bloques.novedades = {
       id: 'novedades',     // el # del link (tudominio.com/#novedades)
       menu: 'Novedades',   // texto en el menú; null = no aparece en el menú
       montar(seccion) {
         seccion.append(
           h('div', { class: 'contenedor' },
             h('h2', { texto: 'Novedades de la semana' }),
             h('p', { texto: 'Llegó el queso de cabra.' })
           )
         );
       }
     };
   })();
   ```
2. **Crear `css/bloques/novedades.css`** (opcional) con los estilos. Usá los colores de `tokens.css`
   (`var(--color-primario)`, etc.) para que combine.
3. **En `index.html`** agregá la línea del estilo junto a las otras
   (`<link rel="stylesheet" href="css/bloques/novedades.css">`) y la del script en la lista de
   bloques (`<script defer src="js/bloques/novedades.js"></script>`), antes de `main.js`.
4. **En `data/sitio.js`** sumá `'novedades'` a la lista `bloques`, en el lugar donde querés que aparezca.

Si el bloque no tiene nada para mostrar (por ejemplo, no hay datos cargados), `montar` puede devolver `false`:
la sección y su lugar en el menú se omiten sin errores.

Reglas para que siga siendo seguro:
- Crear el HTML con `h('etiqueta', { texto: '...' })`. **No usar `innerHTML`**: la política de
  seguridad del sitio está pensada para no necesitarlo, y evita que un texto raro se ejecute como código.
- No escribir `<script>` ni `style="..."` dentro de HTML: la política los bloquea. Usar archivos `.js` y `.css`.

---

## 5. Clientes proveedores y precios: leer esto

La sección "Clientes proveedores" muestra una lista de precios por kilo (`data/mayoristas.js`).

**En un sitio estático no existe una forma segura de esconder esa tabla con contraseña.**
Cualquier "clave" escrita en el código la puede leer cualquiera que abra el archivo, y el
archivo `data/mayoristas.js` es público. Hay dos caminos honestos:

- **Precios públicos** (`mostrarPrecios: true`): cualquiera los ve. Sirve si Matías no tiene
  problema con eso.
- **Precios reservados** (`mostrarPrecios: false` **y** `items: []`): la web invita a pedir la
  lista por WhatsApp y Matías se la envía solo a quien quiera. Es lo más seguro sin servidor.
  Ojo: hay que vaciar `items`; si quedan los precios reales en el archivo, siguen siendo públicos.

Si más adelante quieren un acceso real con usuario y contraseña por cliente, hace falta un
servidor (por ejemplo PHP con sesiones y la lista guardada fuera de la carpeta pública). Se
puede sumar como bloque nuevo sin rehacer el resto.

---

## 6. Seguridad: qué ya tiene el sitio

- **Política de contenido estricta (CSP):** solo se cargan scripts, estilos, fuentes e imágenes
  de este mismo sitio. Si alguien lograra meter un script ajeno, el navegador lo bloquea.
- **Sin `innerHTML` ni `eval`:** todo el contenido se arma como texto.
- **Links validados:** se rechazan `javascript:` y similares. Los links externos abren con `noopener`.
- **Pedido por WhatsApp:** no hay formulario que envíe datos a un servidor ni base de datos que
  atacar. El pedido se arma en el navegador y se abre en WhatsApp. El nombre y las aclaraciones
  se limpian y se recortan antes de armar el mensaje.
- **Cabeceras de seguridad** (`.htaccess` para hosting con Apache/cPanel, `_headers` para Cloudflare
  Pages y Netlify): evitan que otro sitio meta esta página dentro de un marco, fuerzan HTTPS, etc.
- **Sin servicios externos:** tipografías incluidas en `fonts/`, nada de Google Fonts ni
  librerías de terceros (menos riesgo y más privacidad).

- **Siempre al día:** la página, los scripts, los estilos y los datos le piden al navegador que revise en cada
  visita si hubo cambios (`.htaccess` y `_headers`). Así, después de actualizar la web, nadie ve archivos viejos
  mezclados con nuevos. Las fuentes sí se guardan un año (no cambian).

Cosas que hay que hacer al publicar:
1. Activar el certificado HTTPS (candadito) en el hosting y luego descomentar la redirección a
   HTTPS en `.htaccess` (si usan Apache).
2. No subir `README.md`, `CLAUDE.md` ni `servidor-dev.py` si no quieren que se vean (el `.htaccess` ya los bloquea en Apache).
3. Si algún día agregan Google Analytics, un mapa embebido u otro servicio externo, hay que
   permitirlo a propósito en la política de contenido (`index.html`, `.htaccess` y `_headers`).
   Si se agrega sin eso, el navegador lo bloquea (no es un error del sitio).

---

## 7. Lista antes de entregarle la web a Matías

- [ ] `data/sitio.js`: nombre, WhatsApp real, logo, foto de portada, redes
- [ ] `data/sucursales.js`: direcciones, teléfonos, WhatsApp y horarios reales de las 3 sucursales
- [ ] `data/productos.js`: productos y precios reales; marcar 4 como `destacado: true`
- [ ] `data/promos.js`: revisar una por una los precios y el contenido de las promos; poner `hasta` en las que tengan vencimiento
- [ ] `data/mayoristas.js`: decidir con Matías si los precios son públicos o reservados (sección 5)
- [ ] `datosDeEjemplo: false`
- [ ] `index.html`: revisar `<title>` y descripción (es lo que se ve en Google y al compartir el link)
- [ ] Opcional: imagen para compartir (`img/compartir.jpg`, 1200×630) y activar `og:image` en `index.html`
- [ ] Probar un pedido completo desde un celular y confirmar que llega al WhatsApp correcto
- [ ] HTTPS activo en el hosting
