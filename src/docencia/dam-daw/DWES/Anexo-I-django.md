---
title: Anexo I. Django Básico
date: 2025-10-15    
icon: diagram-project 
order: -1
---
# 🐍 Anexo I: Entornos Virtuales en Python

## 1. Entornos Virtuales en Python

En las aplicaciones basadas en Python es frecuente utilizar paquetes y módulos que no forman parte de la librería estándar. Muchas veces, determinadas aplicaciones necesitan de d0 versiones concretas de librerías específicas, y esto implica que la instalación local de Python puede no llegar a cumplir las especificaciones de todas las aplicaciones. 



La solución a este problema son los **entornos virtuales**: se trata de un árbol “autónomo” de directorios que contiene una instalación de Python, para una determinada versión y con una serie de paquetes adicionales.

De esta forma, diferentes aplicaciones pueden utilizar diferentes entornos virtuales, dependiendo de la versión, tanto de Python, como de los paquetes adicionales para que la aplicación funcione correctamente.

La siguiente imagen ilustra un mismo equipo en el que existen diferentes entornos virtuales, con diferentes versiones de Python, para proyectos diferentes:
<!--
![ToDo - incluir imagen](#)
-->
### 1.1. Creación de un entorno virtual

El módulo utilizado para la creación de entornos virtuales es **venv**.
Para instalarlo en Ubuntu, el comando es:

```bash
sudo apt install python3-venv 
```

El comando para crear un entorno virtual en un directorio determinado es:

```bash
python3 -m venv app-env
```

Este comando creará el directorio `app-env` con un árbol de directorios que contienen el intérprete de Python y archivos de soporte.
El parámetro `-m` indica al intérprete de Python que se va a ejecutar un módulo, en este caso `venv`, como un script.

> Si quieres saber más sobre los módulos en Python, aquí tienes más información.



Para activar el entorno virtual de Python, se utilizará uno de los siguientes comandos, dependiendo del sistema operativo (desde la ruta en la que se encuentre la carpeta `app-env`):

**En Linux o MacOS:**

```bash
source app-env/bin/activate
```

Tras ejecutar este comando, sabremos que estamos utilizando el entorno virtual porque la línea de comandos pasará a tener el nombre del entorno virtual entre paréntesis:

```bash
(app-env) usuario:$
```


### 1.2. Gestión de paquetes mediante pip

Se pueden instalar, actualizar o quitar paquetes utilizando el programa **pip**, que instala paquetes, por defecto, del índice de Paquetes de Python [PyPI](https://pypi.org), que puede ser explorado manualmente mediante un navegador web.

`pip` tiene una serie de comandos (`install`, `freeze`, `uninstall`, etc.), que pueden ser consultados en la [documentación oficial](https://pip.pypa.io).

### 1.3. Instalación de paquetes

Instalar la última versión de un paquete:

```bash
(app-env) $ pip install flask
```

Instalar una versión específica:

```bash
(app-env) $ pip install requests==2.6.0
```

Actualizar un paquete existente:

```bash
(app-env) $ pip install --upgrade requests
```

Eliminar un paquete:

```bash
pip uninstall <nombre_paquete>
```

Mostrar información de un paquete:

```bash
pip show <nombre_paquete>
```

Listar todos los paquetes instalados:

```bash
pip list
```

Generar lista de dependencias instaladas (en formato instalable):

```bash
(app-env) $ pip freeze > requirements.txt
```

Instalar dependencias desde `requirements.txt`:

```bash
(app-env) $ pip install -r requirements.txt
```


### 1.4. Creación del primer proyecto Django

Vamos a crear nuestro primer proyecto con Django.

Creamos un primer entorno virtual llamado `portfolio-venv` en una carpeta de nuestra elección, donde lanzamos el siguiente comando mediante consola:

```bash
python3 -m venv portfolio-env
```

A continuación, lo activamos:

```bash
source portfolio-env/bin/activate
```

Sabemos que está activo porque al comienzo de la línea de comandos se muestra el nombre del entorno virtual entre paréntesis.

Antes de ejecutar la instalación de Django, vamos a averiguar cuál es la **última versión LTS (Long-term Support)**, que es la que nos va a proporcionar mayor duración en el soporte (con otras ventajas).

Consultamos el siguiente enlace y vemos que la más reciente es la **5.2** y además es **LTS**, con lo cual es la candidata ideal para nuestro nuevo proyecto.

Aun así, hay que valorar también que la **4.2 (también LTS)** va a tener soporte hasta marzo de 2026.
<!--
![ToDo - incluir imagen de versiones Django](#)
-->
La ventaja de elegir la última versión va a ser que tendremos acceso a las últimas funcionalidades;
las desventajas son que puede haber más errores (bugs) o incompatibilidades con otros paquetes.

Elegimos instalar la **última LTS (5.2)**:

```bash
pip install Django==5.2
```

Creamos el fichero de dependencias:

```bash
pip freeze > requirements.txt
```

Creamos el primer proyecto Django:

```bash
django-admin startproject portfolioDjango
```

Al hacerlo, se crea una carpeta `portfolioDjango` con la estructura base del proyecto:

<!--
![ToDo - incluir imagen estructura proyecto Django](#)
-->
Lanzamos la aplicación:

```bash
python manage.py runserver
```

El servidor se lanza por defecto en el **puerto 8000**, y al acceder desde el navegador veremos la página de bienvenida de Django.

## 2. Django "Hello World!"

### 2.1. Introducción

Esta introducción a Django muestra cómo puedes crear un sitio web “esqueleto”, que luego podrás completar con configuraciones específicas del sitio, rutas, modelos, vistas y plantillas (hablaremos de esto en artículos posteriores).

Para comenzar:

1. Usa la herramienta **django-admin** para generar una carpeta de proyecto, las plantillas de archivos básicas y **manage.py**, que sirve como tu script de gestión del proyecto.

2. Usa **manage.py** para crear una o más aplicaciones.

::: note Un sitio web puede consistir en una o más secciones. Por ejemplo, sitio principal, blog, wiki, área de descargas, etc. Django te anima a desarrollar estos componentes como aplicaciones separadas, que luego podrían reutilizarse en diferentes proyectos si lo deseas.
:::

3. Registra las nuevas aplicaciones para incluirlas en el proyecto.

4. Conecta el mapeador de url/ruta para cada aplicación.

Para el sitio web de **Biblioteca Local**, las carpetas del sitio y del proyecto se llaman **locallibrary**, e incluyen una aplicación llamada **catalog**. Por lo tanto, la estructura de carpetas de nivel superior será la siguiente:

```bash
locallibrary/         # Carpeta del sitio web
    manage.py         # Script para ejecutar herramientas de Django para este proyecto (creado usando django-admin)
    locallibrary/     # Carpeta del sitio/proyecto (creada usando django-admin)
    catalog/          # Carpeta de la aplicación (creada usando manage.py)
```

Las siguientes secciones discuten los pasos del proceso en detalle y muestran cómo puedes probar tus cambios. Al final de este artículo, hablaremos de otras configuraciones globales del sitio que también podrías realizar en esta etapa.

### 2.2. Creación del proyecto

Para crear el proyecto:

1. Abre una consola de comandos (o una ventana de terminal) y asegúrate de que estás en tu entorno virtual.

2. Navega a la carpeta donde deseas crear tu aplicación de biblioteca local (más adelante la moveremos al repositorio local de GitHub “django_local_library” que creaste al configurar el entorno de desarrollo).

3. Crea el nuevo proyecto usando el comando **django-admin startproject** como se muestra, y luego navega dentro de la carpeta del proyecto:

```bash
django-admin startproject locallibrary
cd locallibrary
```

La herramienta **django-admin** crea una estructura de carpetas/archivos como la siguiente:

```bash
locallibrary/
    manage.py
    locallibrary/
        __init__.py
        settings.py
        urls.py
        wsgi.py
        asgi.py
```

La subcarpeta **locallibrary** es el punto de entrada del sitio web:

* ****init**.py** es un archivo vacío que le indica a Python que trate este directorio como un paquete de Python.
* **settings.py** contiene todas las configuraciones del sitio web, incluyendo el registro de cualquier aplicación que creemos, la ubicación de nuestros archivos estáticos, detalles de configuración de la base de datos, etc.
* **urls.py** define los mapeos URL-a-vista del sitio. Aunque podría contener todo el código de mapeo de URL, es más común delegar parte de los mapeos a aplicaciones particulares, como verás más adelante.
* **wsgi.py** se usa para ayudar a tu aplicación Django a comunicarse con el servidor web. Puedes tratarlo como código estándar.
* **asgi.py** es un estándar para que las aplicaciones y servidores web asincrónicos de Python se comuniquen entre sí. ASGI es el sucesor asincrónico de WSGI. ASGI proporciona un estándar tanto para aplicaciones asincrónicas como sincrónicas de Python, mientras que WSGI solo lo hacía para las sincrónicas. ASGI es compatible hacia atrás con WSGI y soporta múltiples servidores y frameworks de aplicaciones.

El script **manage.py** se usa para crear aplicaciones, trabajar con bases de datos y arrancar el servidor web de desarrollo.

### 2.3. Creación de la aplicación *catalog*

A continuación, ejecuta el siguiente comando para crear la aplicación **catalog** que vivirá dentro de nuestro proyecto **locallibrary**. Asegúrate de ejecutar este comando desde la misma carpeta que contiene el archivo **manage.py**:

```bash
# Linux/macOS
python3 manage.py startapp catalog

# Windows
py manage.py startapp catalog
```

::: note
El resto del tutorial usa la sintaxis de Linux/macOS. Si trabajas en Windows, donde veas un comando que empiece con **python3**, usa **py** (o **py -3**).
:::
La herramienta crea una nueva carpeta y la llena con archivos para las diferentes partes de la aplicación (como se muestra en el siguiente ejemplo). La mayoría de los archivos están nombrados según su propósito (por ejemplo, las vistas deben almacenarse en **views.py**, los modelos en **models.py**, las pruebas en **tests.py**, la configuración del sitio de administración en **admin.py**, el registro de la aplicación en **apps.py**) y contienen un código mínimo estándar para trabajar con los objetos asociados.

El directorio del proyecto actualizado debería verse así:

```bash
locallibrary/
    manage.py
    locallibrary/
    catalog/
        admin.py
        apps.py
        models.py
        tests.py
        views.py
        __init__.py
        migrations/
```

Además, ahora tenemos:

* Una carpeta **migrations**, usada para almacenar “migraciones”, archivos que permiten actualizar automáticamente tu base de datos a medida que modificas tus modelos.
* ****init**.py**, un archivo vacío creado para que Django/Python reconozca la carpeta como un paquete de Python y permita usar sus objetos en otras partes del proyecto.

::: note
¿Has notado lo que falta en la lista de archivos anterior? Aunque hay un lugar para tus vistas y modelos, no hay ninguno para tus mapeos de URL, plantillas o archivos estáticos. Te mostraremos cómo crearlos más adelante (no se necesitan en todos los sitios web, pero sí en este ejemplo).
:::


### 2.4. Registro de la aplicación *catalog*

Ahora que la aplicación ha sido creada, debemos registrarla en el proyecto para que se incluya cuando se ejecuten las herramientas (como agregar modelos a la base de datos, por ejemplo). Las aplicaciones se registran agregándolas a la lista **INSTALLED_APPS** en la configuración del proyecto.

Abre el archivo de configuración del proyecto, `django-locallibrary-tutorial/locallibrary/settings.py`, y encuentra la definición de la lista **INSTALLED_APPS**. Luego añade una nueva línea al final de la lista, como se muestra a continuación:

```bash
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    # Añade nuestra nueva aplicación
    'catalog.apps.CatalogConfig', # Este objeto fue creado en /catalog/apps.py
]
```

La nueva línea especifica el objeto de configuración de la aplicación (**CatalogConfig**) que se generó automáticamente en `/django-locallibrary-tutorial/catalog/apps.py` cuando creaste la aplicación.

::: note
Verás que ya hay muchas otras **INSTALLED_APPS** (y **MIDDLEWARE**, más abajo en el archivo de configuración). Estas habilitan soporte para el sitio de administración de Django y su funcionalidad (incluyendo sesiones, autenticación, etc.).
:::

### 2.5. Especificar la base de datos

Aquí también es donde normalmente especificarías la base de datos que se usará para el proyecto. Tiene sentido usar la misma base de datos para desarrollo y producción siempre que sea posible, para evitar pequeñas diferencias de comportamiento. Puedes consultar las distintas opciones en **Databases (Django docs)**.

Usaremos la base de datos SQLite predeterminada para la mayoría de este ejemplo, ya que no esperamos un acceso concurrente alto en una base de datos de demostración, ¡y no requiere configuración adicional! Puedes ver cómo está configurada esta base de datos en **settings.py**:

```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}
```

Más adelante, en el despliegue de Django a producción, también te mostraremos cómo configurar una base de datos **Postgres**, que podría ser más adecuada para sitios más grandes.

### 2.6. Otras configuraciones del proyecto

El archivo **settings.py** también se usa para configurar otros ajustes, pero en este punto probablemente solo quieras cambiar **TIME_ZONE**, que debe igualarse a una cadena de la lista estándar de zonas horarias (la columna TZ de la tabla contiene los valores que necesitas). Cambia tu valor de **TIME_ZONE** por uno apropiado para tu zona, por ejemplo:

```python
TIME_ZONE = 'Europe/London'
```

Hay otros dos ajustes que no cambiarás ahora, pero que deberías conocer:

* **SECRET_KEY**: es una clave secreta usada como parte de la estrategia de seguridad de Django. Si no proteges este código en desarrollo, deberás usar otro (quizás leído desde una variable de entorno o archivo) cuando lo pongas en producción.
* **DEBUG**: activa los registros de depuración en caso de error, en lugar de respuestas con código de estado HTTP. Debe establecerse en **False** en producción, ya que la información de depuración puede ser útil para atacantes, pero por ahora podemos dejarlo en **True**.

### 2.7. Conectando el mapeador de URL

El sitio web se crea con un archivo mapeador de URL (**urls.py**) en la carpeta del proyecto. Aunque puedes usar este archivo para gestionar todos tus mapeos de URL, es más habitual delegar los mapeos a la aplicación asociada.

Abre `django-locallibrary-tutorial/locallibrary/urls.py` y observa el texto instructivo que explica algunas de las formas de usar el mapeador de URL.

```python
"""
Configuración de URL para el proyecto locallibrary.

La lista `urlpatterns` enruta las URLs a las vistas. Para más información, consulta:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Ejemplos:
Vistas basadas en funciones
    1. Añade una importación: from my_app import views
    2. Añade una URL a urlpatterns: path('', views.home, name='home')
Vistas basadas en clases
    1. Añade una importación: from other_app.views import Home
    2. Añade una URL a urlpatterns: path('', Home.as_view(), name='home')
Incluyendo otra URLConf
    1. Importa la función include(): from django.urls import include, path
    2. Añade una URL a urlpatterns: path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path

urlpatterns = [
    path('admin/', admin.site.urls),
]
```

Los mapeos de URL se gestionan mediante la variable **urlpatterns**, que es una lista de Python de funciones **path()**.
Cada función **path()** asocia un patrón de URL a una vista específica (que se mostrará cuando el patrón coincida) o a otra lista de código de prueba de patrones de URL (en este segundo caso, el patrón se convierte en la “URL base” para los patrones definidos en el módulo de destino).

La lista **urlpatterns** define inicialmente una única función que mapea todas las URLs con el patrón `admin/` al módulo `admin.site.urls`, el cual contiene las propias definiciones de mapeo de URL de la aplicación de Administración.

::: note
El parámetro *route* en **path()** es una cadena que define un patrón de URL que debe coincidir. Esta cadena puede incluir una variable con nombre (entre corchetes angulares), por ejemplo `'catalog/<id>/'`.
Este patrón coincidirá con una URL como `catalog/any_chars/` y pasará `any_chars` a la vista como una cadena con el nombre de parámetro `id`.
Discutiremos los métodos *path* y los patrones de ruta más adelante.
:::

Para añadir un nuevo elemento a la lista **urlpatterns**, agrega las siguientes líneas al final del archivo.
Este nuevo elemento incluye una **path()** que reenvía las solicitudes con el patrón `catalog/` al módulo `catalog.urls` (el archivo con la URL relativa `catalog/urls.py`):

```python
# Usa include() para añadir rutas desde la aplicación catalog
from django.urls import include

urlpatterns += [
    path('catalog/', include('catalog.urls')),
]
```

::: note
Observa que incluimos la línea de importación (`from django.urls import include`) junto con el código que la utiliza (para que sea fácil ver lo que hemos añadido), pero es común incluir todas las líneas de importación al inicio de un archivo Python.
:::


Ahora redirigiremos la URL raíz de nuestro sitio (es decir, `127.0.0.1:8000`) a la URL `127.0.0.1:8000/catalog/`.
Esta es la única aplicación que usaremos en este proyecto.
Para hacerlo, utilizaremos una función de vista especial, **RedirectView**, que toma la nueva URL relativa a redirigir (`/catalog/`) como su primer argumento cuando el patrón de URL especificado en la función **path()** coincide (la URL raíz, en este caso).

Añade las siguientes líneas al final del archivo:

```python
# Añadir mapeos de URL para redirigir la URL base a nuestra aplicación
from django.views.generic import RedirectView
urlpatterns += [
    path('', RedirectView.as_view(url='catalog/', permanent=True)),
]
```

Deja el primer parámetro de la función **path** vacío para implicar `'/'`.
Si escribes el primer parámetro como `'/'`, Django te mostrará la siguiente advertencia al iniciar el servidor de desarrollo:

```python
System check identified some issues:

WARNINGS:
?: (urls.W002) Your URL pattern '/' has a route beginning with a '/'.
Remove this slash as it is unnecessary.
If this pattern is targeted in an include(), ensure the include() pattern has a trailing '/'.
```

Django no sirve archivos estáticos como CSS, JavaScript o imágenes por defecto,
pero puede ser útil que el servidor de desarrollo lo haga mientras creas tu sitio.
Como adición final a este mapeador de URL, puedes habilitar el servicio de archivos estáticos durante el desarrollo añadiendo las siguientes líneas.

Agrega este bloque final al final del archivo ahora:

```python
# Usa static() para añadir mapeo de URL que sirva archivos estáticos durante el desarrollo (solo)
from django.conf import settings
from django.conf.urls.static import static

urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
```

::: note
Hay varias formas de extender la lista **urlpatterns** (anteriormente solo añadimos un nuevo elemento usando el operador `+=` para separar claramente el código antiguo y el nuevo).
Podríamos haber incluido este nuevo mapeo directamente en la definición original:

```python
urlpatterns = [
    path('admin/', admin.site.urls),
    path('catalog/', include('catalog.urls')),
    path('', RedirectView.as_view(url='catalog/')),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
```
:::
Como paso final, crea un archivo dentro de tu carpeta **catalog** llamado **urls.py**, y añade el siguiente texto para definir el (vacío) **urlpatterns** importado.
Aquí es donde añadiremos nuestros patrones conforme construyamos la aplicación.

```python
from django.urls import path
from . import views

urlpatterns = [

]
```



### 2.8. Probando el marco del sitio web

En este punto, tenemos un proyecto esqueleto completo.
El sitio web aún no hace nada, pero vale la pena ejecutarlo para asegurarnos de que ninguno de nuestros cambios ha roto nada.

Antes de hacerlo, primero debemos ejecutar una **migración de base de datos**.
Esto actualiza nuestra base de datos (para incluir cualquier modelo en nuestras aplicaciones instaladas) y elimina algunas advertencias de compilación.


### 2.9. Ejecutando migraciones de base de datos

Django usa un **Object-Relational-Mapper (ORM)** para mapear las definiciones de los modelos en el código Django a la estructura de datos utilizada por la base de datos subyacente.
A medida que cambiamos las definiciones de nuestros modelos, Django rastrea los cambios y puede crear scripts de migración de base de datos (en `/django-locallibrary-tutorial/catalog/migrations/`) para migrar automáticamente la estructura de datos subyacente en la base de datos y hacerla coincidir con el modelo.

Cuando creamos el sitio web, Django añadió automáticamente varios modelos para uso de la sección de administración del sitio (que veremos más adelante).
Ejecuta los siguientes comandos para definir tablas para esos modelos en la base de datos (asegúrate de estar en el directorio que contiene **manage.py**):

```bash
python3 manage.py makemigrations
python3 manage.py migrate
```

::: warning
Deberás ejecutar estos comandos cada vez que tus modelos cambien de una forma que afecte la estructura de los datos que deben almacenarse (incluyendo tanto la adición como la eliminación de modelos o campos individuales).
:::
El comando **makemigrations** crea (pero no aplica) las migraciones para todas las aplicaciones instaladas en tu proyecto.
Puedes especificar el nombre de la aplicación para ejecutar la migración solo para una app.
Esto te da la oportunidad de revisar el código de las migraciones antes de aplicarlas.
Si eres un experto en Django, ¡puedes incluso ajustarlas ligeramente!

El comando **migrate** aplica las migraciones a tu base de datos.
Django lleva un seguimiento de cuáles han sido añadidas a la base de datos actual.

::: note
Debes volver a ejecutar las migraciones y probar el sitio cada vez que hagas cambios significativos. ¡No lleva mucho tiempo!
:::

Consulta **Migrations (Django docs)** para más información sobre comandos de migración menos comunes.

### 2.10. Ejecutando el sitio web

Durante el desarrollo, puedes servir el sitio web primero usando el servidor web de desarrollo y luego verlo en tu navegador local.

::: note
El servidor web de desarrollo no es lo suficientemente robusto ni eficiente para su uso en producción, pero es una manera muy sencilla de poner en marcha tu sitio Django durante el desarrollo y realizar pruebas rápidas.
Por defecto, servirá el sitio a tu ordenador local (`http://127.0.0.1:8000/`), pero también puedes especificar otros ordenadores de tu red para servirlo.
Para más información, consulta **django-admin and manage.py: runserver (Django docs)**.
:::
Ejecuta el servidor web de desarrollo llamando al comando **runserver** (en el mismo directorio que **manage.py**):

```bash
python3 manage.py runserver
```

Una vez que el servidor esté ejecutándose, puedes ver el sitio navegando a:

👉 [http://127.0.0.1:8000/](http://127.0.0.1:8000/)
en tu navegador web local.


