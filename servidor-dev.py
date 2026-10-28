#!/usr/bin/env python3
"""
Servidor para ver la web en tu compu mientras la modificás.

Es igual a "python3 -m http.server", pero le pide al navegador que NO guarde
copias de los archivos. Así, cada vez que recargás ves los cambios que hiciste
y no queda mezclado un archivo nuevo con otro viejo.

Uso (desde cualquier carpeta):
    python3 servidor-dev.py            → http://localhost:8000
    python3 servidor-dev.py 9000       → otro puerto
    python3 servidor-dev.py 8000 0.0.0.0   → también visible desde el celular, en la misma red wifi

Para frenarlo: Ctrl + C.
Este archivo es solo para trabajar en la compu: no hace falta subirlo al hosting.
"""
import os
import sys
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer

CARPETA = os.path.dirname(os.path.abspath(__file__))


class SinCache(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-store, max-age=0')
        super().end_headers()


def main():
    puerto = int(sys.argv[1]) if len(sys.argv) > 1 else 8000
    direccion = sys.argv[2] if len(sys.argv) > 2 else '127.0.0.1'
    servidor = ThreadingHTTPServer((direccion, puerto), partial(SinCache, directory=CARPETA))
    print('Sirviendo ' + CARPETA)
    print('Abrí http://localhost:' + str(puerto) + '  (Ctrl + C para frenar)')
    try:
        servidor.serve_forever()
    except KeyboardInterrupt:
        print('\nListo, servidor detenido.')


if __name__ == '__main__':
    main()
