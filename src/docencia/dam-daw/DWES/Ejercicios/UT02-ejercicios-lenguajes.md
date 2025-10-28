---
title: Ejercicios UT02. Lenguajes DWES
icon: pen
---
::: info
Este ejercicio se trabajará en las videotutorías, por lo cual el contenido final no estará disponible hasta la segunda semana.
:::

# Ejercicios UT02. Lenguajes de desarrollo web en servidor.

## Ejercicio UT02-1.1 El lenguaje PHP

En este ejercicio vamos a aprender a publicar un fichero `.php` en nuestra web local que sirve Apache2.

![Ejercicio PHP básico](/images/dwes/ejercicios/hello-php.png)

En la imagen anterior, se puede comprobar como el archivo `php` que queremos publicar en nuestro servidor, ha de encontrarse en la ruta: 
```bash
/var/www/html/
```

Así nuestro navegador podrá acceder y visualizar el contenido:

![Navegador PHP básico](/images/dwes/ejercicios/hello-php-2.png)

## Ejercicio UT02-1.2 El lenguaje PHP

En el segundo ejercicio, utilizando el archivo `usuario.php`, podemos ver como el lenguaje `php` permite crear de manera directa el código `html` que se "imprime" para que el navegador muestre el resultado final para el usuario.

![Ejercicio PHP medio](/images/dwes/ejercicios/php-medio.png)

El lenguaje PHP identifica las variables mediante el uso del símbolo del `$` delante del nombre. Como se puede comprobar, el código, que se identifica por estar entre las etiquetas xml `<?php`  y `?>` es ocultado y no se visualiza en el navegador.

![Navegador PHP medio](/images/dwes/ejercicios/php-medio-2.png)

::: warning
A la hora de trabajar con el terminal y los archivos en Linux, hemos de tener en cuenta que el propietario y los permisos que se le otorgan son esenciales para que el servidor pueda trabajar con ellos. 
:::

## Ejercicio UT02-2 Jakarta EE, estructura de directorios y generación de archivo para servidor
### Ejercicio UT02-2.1 Estructura de una aplicación Jakarta
Para la construcción de aplicaciones en `Jakarta EE` y/o la compilación de aplicaciones Java complejas, debemos utilizar los ficheros `.pom` que nos permiten establecer cuál será la estructura de nuestra aplicación, las versiones de las librerías y entornos de desarrollo, etc. 

![Jakarta EE, pom](/images/dwes/ejercicios/jakartaEE-1.png)


Además, como se señala en la parte inferior izquierda de la imagen anterior, debemos utilizar un servidor de aplicaciones (en este caso Payara) para que el archivo `.war` que generamos, sea accesible desde el navegador.

En este framework/sistema Payara realiza las funciones que en php hacía Apache, además de muchas otras directamente relacionadas con el ciclo de vida de los servlets o beans que usamos en la aplicación.

La forma en la que se estructura la aplicación viene definida en el `pom` y permite identificar las distintas partes de la misma:
 * *Capa de Vista*: Ficheros de tipo `.xhmtl`
 * *Capa de Controladores* : Beans 
  
![árbol de directorios - Jakarta EE - pom](/images/dwes/ejercicios/jakartaEE-2.png)

### Ejercicio UT02-2.2 Generación del archivo `war` y publicación con Payara Server.

Para poder generar el paquete `.war` de nuestra aplicación, hemos de realizar la llamada a `Maven` mediante el terminal.
![Comando Maven](/images/dwes/ejercicios/jakartaEE-4.png)
::: warning ¡Cuidado! el comando debe ejecutarse desde el directorio donde se encuentra el `.pom` que vamos a utilizar
:::

Una vez finalizada, y si no hubo errores en la compilación, se genera el paquete:

![Paquete war](/images/dwes/ejercicios/jakartaEE-5.png)

A continuación, utilizaremos el menú contextual que aparece al pulsar el botón derecho sobre el paquete, para publicarlo en nuestro servidor Payara.

Una vez publicado, podemos acceder con nuestro navegador para ver el resultado:

![Publicación en Payara](/images/dwes/ejercicios/jakartaEE-6.png)

### Ejercicio UT02-2.3 Mapeado de datos en el xhtml desde el beam java.

El proceso de compilación y el servidor de aplicaciones, permiten realizar un mapeo del contenido de nuestro bean en el xhtml que es leído y mostrado por el navegador.

![Código xhtml](/images/dwes/ejercicios/jakartaEE-7.png)

Dentro del `xhtml` utilizamos etiquetas propias que, junto con el identificador del bean y el uso de las funciones que ese objeto nos proporciona, permiten mostrar los datos al cliente.

![Mapeo entre Bean y XHtml](/images/dwes/ejercicios/jakartaEE-8.png)


## Ejercicio UT02-3 Python y Django

### Ejercicio UT02-3.1: Estructura de directorios de una aplicación Django

![Estructura](/images/dwes/ejercicios/django1.png)

![Ejecución del servidor django](/images/dwes/ejercicios/django2.png)

![Url del servidor](/images/dwes/ejercicios/django3.png)

![Mapeo del contenido del controlador en el html](/images/dwes/ejercicios/django4.png)

### Ejercicio UT02-3.2: Duración de un álbum

 * Dado un `json` como el siguiente, crea un programa python que calcule la duración completa del disco.
  
```json
{
  "album": "Songs of a Lost World",
  "artist": "The Cure",
  "year": 2024,
  "tracks": [
    {
      "title": "Alone",
      "duration": "6:48"
    },
    {
      "title": "And Nothing Is Forever",
      "duration": "6:53"
    },
    {
      "title": "A Fragile Thing",
      "duration": "4:43"
    },
    {
      "title": "Warsong",
      "duration": "4:17"
    },
    {
      "title": "Drone:Nodrone",
      "duration": "4:45"
    },
    {
      "title": "I Can Never Say Goodbye",
      "duration": "6:03"
    },
    {
      "title": "All I Ever Am",
      "duration": "5:21"
    },
    {
      "title": "Endsong",
      "duration": "10:23"
    }
  ]
}
```




<!--
### Ejercicio 0X: Creación de una aplicación Djando desde 0

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
-->