---
title: Ejercicios UT02. Lenguajes DWES
icon: pen
---
::: info
Este ejercicio se trabajará en las videotutorías, por lo cual el contenido final no estará disponible hasta la segunda semana.
:::

![En construcción](/images/under-construction.jpg)

# Ejercicios UT02. Lenguajes de desarrollo web en servidor.

## Ejercicio UT02-1 El lenguaje PHP

En este ejercicio vamos a aprender a publicar un fichero `.php` en nuestra web local que sirve Apache2.

## Ejercicio UT02-2 Jakarta EE, estructura de directorios y generación de archivo para servidor

## Ejercicio UT02-3 Python y DJango

### Ejercicio 01: Creación de una aplicación Djando desde 0

A continuación vamos a crear la estructura básica de un proyecto en Djando para que podamos compartir en un servidor, el contenido de nuestros datos.

[Enlace al proyecto](https://github.com/darioaxel/DWES-Ejercicios-2025-2026/blob/main/dwes-UT02/03-django/ejercicio01)

Veamos como hemos llegado hasta este punto:

1. Desde un directorio de nuestro sistema ejecutamos:
```bash
mkdir ejercicio01
cd ejercicio01

# Aunque no es obligatorio, si muy recomendable, utilizar entornos virtuales
python3 -m venv venv
source venv/bin/activate

# Si ya hemos instalado antes django, podemos saltar el siguiente paso
pip install django
```

2. Creamos la estructura básica automáticamente:

```bash
django-admin startproject ejercicio01
cd ejercicio01
```
Esto crea la estructura básica que contendrá el script `manage.py`

3. Ahora vamos a crear una app llamada `usuarios` dentro del proyecto.

```bash
python3 manage.py startapp usuarios
```

4. Para que la aplicación se cargue, hemos de instanciarla dentro. Activamos la app en `ejercicio01/settings.py`, dentro del array `INSTALLED_APPS`:

```bash
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'usuarios',   # <-- añadida
]
```
5. A continuación, accedemos al fichero `views.py` dentro de nuestra app `usuarios/views.py` para codificar el html a mostrar.

6. Para que el servidor sepa donde "servir" nuestra vista, hemos de indicarlo dentro del vector que contiene las rutas (paths) del proyecto `ejercicio01/urls.py`:

```bash
from usuarios.views import usuario_view

urlpatterns = [
    path('admin/', admin.site.urls),
    path('usuario/', usuario_view),
]
```