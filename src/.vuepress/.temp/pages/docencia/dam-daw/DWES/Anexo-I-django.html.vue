<template><div><h1 id="🐍-anexo-i-entornos-virtuales-en-python" tabindex="-1"><a class="header-anchor" href="#🐍-anexo-i-entornos-virtuales-en-python"><span>🐍 Anexo I: Entornos Virtuales en Python</span></a></h1>
<h2 id="_1-entornos-virtuales-en-python" tabindex="-1"><a class="header-anchor" href="#_1-entornos-virtuales-en-python"><span>1. Entornos Virtuales en Python</span></a></h2>
<p>En las aplicaciones basadas en Python es frecuente utilizar paquetes y módulos que no forman parte de la librería estándar.<br>
Muchas veces, determinadas aplicaciones necesitan de determinadas versiones de librerías específicas, y esto implica que la instalación local de Python puede no llegar a cumplir las especificaciones de todas las aplicaciones.</p>
<p>La solución a este problema son los <strong>entornos virtuales</strong>: se trata de un árbol “autónomo” de directorios que contiene una instalación de Python, para una determinada versión y con una serie de paquetes adicionales.</p>
<p>De esta forma, diferentes aplicaciones pueden utilizar diferentes entornos virtuales, dependiendo de la versión, tanto de Python, como de los paquetes adicionales para que la aplicación funcione correctamente.</p>
<p>La siguiente imagen ilustra un mismo equipo en el que existen diferentes entornos virtuales, con diferentes versiones de Python, para proyectos diferentes:</p>
<!--
![ToDo - incluir imagen](#)

### Creación de un entorno virtual

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


## 2. Gestión de paquetes mediante pip

Se pueden instalar, actualizar o quitar paquetes utilizando el programa **pip**, que instala paquetes, por defecto, del índice de Paquetes de Python [PyPI](https://pypi.org), que puede ser explorado manualmente mediante un navegador web.

`pip` tiene una serie de comandos (`install`, `freeze`, `uninstall`, etc.), que pueden ser consultados en la [documentación oficial](https://pip.pypa.io).

### Instalación de paquetes

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


## 3. Creación del primer proyecto Django

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

![ToDo - incluir imagen de versiones Django](#)

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

![ToDo - incluir imagen estructura proyecto Django](#)

Lanzamos la aplicación:

```bash
python manage.py runserver
```

El servidor se lanza por defecto en el **puerto 8000**, y al acceder desde el navegador veremos la página de bienvenida de Django.



## Portfolio con Django

Continuamos donde lo dejamos en el apartado anterior, y vamos a construir un portfolio.

### Configuración

El fichero más importante al iniciar un proyecto es `settings.py`, que contiene la configuración principal.
Algunas variables destacadas son:

* **SECRET_KEY**
* **DEBUG**
* **ALLOWED_HOSTS**
* **INSTALLED_APPS**
* **TEMPLATES**
* **DATABASES**
* **LANGUAGE_CODE**
* **TIME_ZONE**
* **STATIC_URL / STATIC_ROOT**

Configuración recomendada:

```python
LANGUAGE_CODE = 'es'
TIME_ZONE = 'Europe/Madrid'
STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'static')
```

Además, modificamos la variable `TEMPLATES` para especificar la carpeta donde estarán nuestras plantillas:

```python
'DIRS': [os.path.join(BASE_DIR, 'templates')],
```

Y añadimos al principio del fichero:

```python
import os
```

---

## Aplicaciones en Django

* **Proyecto**: conjunto completo de la aplicación web (directorio raíz donde está `manage.py`).
* **Aplicaciones (apps)**: módulos Python independientes que proporcionan una funcionalidad concreta.

Ejemplo de las apps incluidas por defecto:

```python
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
]
```

Creamos nuestra app `portfolioapp`:

```bash
python manage.py startapp portfolioapp
```

Y la añadimos a `INSTALLED_APPS`:

```python
'portfolioapp',
```

---

## Modelos

Los modelos se definen en `models.py` dentro de cada aplicación.
Cada modelo representa una tabla en la base de datos.

Ejemplo de creación de migraciones:

```bash
python manage.py makemigrations portfolioapp
python manage.py migrate portfolioapp
```

Para aplicar todas las migraciones pendientes:

```bash
python manage.py migrate
```

---

## ImageField

Configuramos `settings.py` para almacenar imágenes:

```python
MEDIA_ROOT = os.path.join(BASE_DIR, 'media/')
MEDIA_URL = '/media/'
```

Y modificamos `urls.py`:

```python
from django.conf import settings
from django.conf.urls.static import static

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
```

Instalamos Pillow:

```bash
pip install Pillow
```

Congelamos dependencias:

```bash
pip freeze > requirements.txt
```

---

## Administrador de Django

Configuramos `admin.py` para registrar nuestros modelos.

Creamos el superusuario:

```bash
python manage.py createsuperuser
```

Y accedemos al panel en:

```
http://localhost:8000/admin
```

---

## Plantillas en Django

Django usa **DTL (Django Template Language)** para generar HTML dinámico.
La jerarquía de plantillas permite heredar estructuras comunes.

Estructura de ejemplo:

```
templates/
└── portfolio/
    ├── base.html
    ├── home.html
    ├── proyecto.html
    ├── contacto.html
```

---

## Ficheros estáticos

Para recolectar los archivos estáticos:

```bash
python manage.py collectstatic
```

Cargar y usar estáticos en plantillas:

```django
{% load static %}
<img src="{% static 'my_app/example.jpg' %}" alt="My image">
```

![ToDo - incluir imagen ficheros estáticos](#)

---

## Plantillas de error

Crear plantillas con nombres como:

```
templates/
├── 404.html
├── 500.html
```

> ⚠️ Estas páginas se mostrarán solo cuando `DEBUG = False`.

---

## Vistas

Las **vistas** implementan la lógica de negocio.
Pueden ser:

* **FBV (Function Based Views)**
* **CBV (Class Based Views)**

Ambas devuelven una respuesta HTTP a partir de una petición.

---

## URLs

Las URLs son el punto de entrada a la lógica del proyecto.
Se definen en `urls.py` con una estructura como:

```python
from django.urls import path
from portfolioapp import views

urlpatterns = [
    path('', views.home_view, name='home'),
]
```

---

## Páginas de la aplicación

Desarrollaremos las siguientes vistas:

* **Home** – listado de proyectos
* **Proyecto** – detalle de un proyecto
* **Contacto** – página informativa
* **Filtrado por categoría**
* **Desplegable de categorías (inclusion tags)**

Cada una tendrá su **vista**, **template** y **URL**.

![ToDo - incluir capturas de cada página](#)

---

## Home

Ejemplo de vista FBV:

```python
def home_view(request):
    proyectos = Proyecto.objects.all()
    context = {'proyectos': proyectos}
    return render(request, 'portfolio/home.html', context)
```

Vista CBV equivalente:

```python
class HomeView(TemplateView):
    template_name = 'portfolio/home.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['proyectos'] = Proyecto.objects.all()
        return context
```

---

## Proyecto

Vista FBV:

```python
def proyecto_view(request, pk):
    proyecto = Proyecto.objects.get(pk=pk)
    context = {'proyecto': proyecto}
    return render(request, 'portfolio/proyecto.html', context)
```

Vista CBV:

```python
class ProyectoView(TemplateView):
    template_name = 'portfolio/proyecto.html'

    def get_context_data(self, *args, **kwargs):
        context = super().get_context_data(**kwargs)
        context['proyecto'] = Proyecto.objects.get(id=kwargs['pk'])
        return context
```

URL:

```python
path('proyecto_cbv/<int:pk>/', views.ProyectoView.as_view(), name='proyecto'),
```

Enlace desde la plantilla:

```django
<a href="{% url 'proyecto' pk=proyecto.id %}" class="p-5">
```

---

## Contacto

Vista FBV:

```python
def contacto_view(request):
    context = {}
    return render(request, 'portfolio/contacto.html', context)
```

Vista CBV:

```python
class ContactoView(TemplateView):
    template_name = 'portfolio/contacto.html'
```

URL:

```python
path('contacto/', views.ContactoView.as_view(), name='contacto'),
```

> 💡 Actividad: pasa tu nombre y apellidos como contexto y muéstralos en la plantilla.

---

## Filtrado por categoría

Modificar `home` para recibir el parámetro `cat_id` y filtrar los proyectos por categoría.
Enlace desde plantilla:

```django
href="{% url 'home' categoria.id %}"
```

URL:

```python
path('<int:cat_id>/', views.HomeView.as_view(), name='home'),
```

---

## Desplegable de categorías (Inclusion Tags)

Estructura:

```
portfolioapp/
└── templatetags/
    ├── __init__.py
    └── categorias_dropdown.py
```

Contenido de `categorias_dropdown.py`:

```python
from django import template
from ..models import Categoria

register = template.Library()

@register.inclusion_tag('portfolio/categorias_dropdown.html')
def categorias_dropdown():
    categorias = Categoria.objects.all()
    return {'categorias': categorias}
```


## Navegación

Completamos los `href` del menú de navegación en `header.html`:

```django
<a href="{% url 'home' %}">Inicio</a>
<a href="{% url 'proyecto' pk=1 %}">Proyecto</a>
<a href="{% url 'contacto' %}">Contacto</a>
```


-->
<h2 id="_2-django-hello-world" tabindex="-1"><a class="header-anchor" href="#_2-django-hello-world"><span>2. Django &quot;Hello World!&quot;</span></a></h2>
<h3 id="_2-1-introduccion" tabindex="-1"><a class="header-anchor" href="#_2-1-introduccion"><span>2.1. Introducción</span></a></h3>
<p>Esta introducción a Django muestra cómo puedes crear un sitio web “esqueleto”, que luego podrás completar con configuraciones específicas del sitio, rutas, modelos, vistas y plantillas (hablaremos de esto en artículos posteriores).</p>
<p>Para comenzar:</p>
<ol>
<li>
<p>Usa la herramienta <strong>django-admin</strong> para generar una carpeta de proyecto, las plantillas de archivos básicas y <strong><a href="http://manage.py" target="_blank" rel="noopener noreferrer">manage.py</a></strong>, que sirve como tu script de gestión del proyecto.</p>
</li>
<li>
<p>Usa <strong><a href="http://manage.py" target="_blank" rel="noopener noreferrer">manage.py</a></strong> para crear una o más aplicaciones.</p>
</li>
</ol>
<div class="hint-container note">
<p class="hint-container-title">Un sitio web puede consistir en una o más secciones. Por ejemplo, sitio principal, blog, wiki, área de descargas, etc. Django te anima a desarrollar estos componentes como aplicaciones separadas, que luego podrían reutilizarse en diferentes proyectos si lo deseas.</p>
</div>
<ol start="3">
<li>
<p>Registra las nuevas aplicaciones para incluirlas en el proyecto.</p>
</li>
<li>
<p>Conecta el mapeador de url/ruta para cada aplicación.</p>
</li>
</ol>
<p>Para el sitio web de <strong>Biblioteca Local</strong>, las carpetas del sitio y del proyecto se llaman <strong>locallibrary</strong>, e incluyen una aplicación llamada <strong>catalog</strong>. Por lo tanto, la estructura de carpetas de nivel superior será la siguiente:</p>
<div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-bash"><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">locallibrary/</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">         # Carpeta del sitio web</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">    manage.py</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">         # Script para ejecutar herramientas de Django para este proyecto (creado usando django-admin)</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">    locallibrary/</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">     # Carpeta del sitio/proyecto (creada usando django-admin)</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">    catalog/</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">          # Carpeta de la aplicación (creada usando manage.py)</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Las siguientes secciones discuten los pasos del proceso en detalle y muestran cómo puedes probar tus cambios. Al final de este artículo, hablaremos de otras configuraciones globales del sitio que también podrías realizar en esta etapa.</p>
<h3 id="_2-2-creacion-del-proyecto" tabindex="-1"><a class="header-anchor" href="#_2-2-creacion-del-proyecto"><span>2.2. Creación del proyecto</span></a></h3>
<p>Para crear el proyecto:</p>
<ol>
<li>
<p>Abre una consola de comandos (o una ventana de terminal) y asegúrate de que estás en tu entorno virtual.</p>
</li>
<li>
<p>Navega a la carpeta donde deseas crear tu aplicación de biblioteca local (más adelante la moveremos al repositorio local de GitHub “django_local_library” que creaste al configurar el entorno de desarrollo).</p>
</li>
<li>
<p>Crea el nuevo proyecto usando el comando <strong>django-admin startproject</strong> como se muestra, y luego navega dentro de la carpeta del proyecto:</p>
</li>
</ol>
<div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-bash"><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">django-admin</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> startproject</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> locallibrary</span></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">cd</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> locallibrary</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><p>La herramienta <strong>django-admin</strong> crea una estructura de carpetas/archivos como la siguiente:</p>
<div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-bash"><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">locallibrary/</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">    manage.py</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">    locallibrary/</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">        __init__.py</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">        settings.py</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">        urls.py</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">        wsgi.py</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">        asgi.py</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>La subcarpeta <strong>locallibrary</strong> es el punto de entrada del sitio web:</p>
<ul>
<li><strong><strong>init</strong>.py</strong> es un archivo vacío que le indica a Python que trate este directorio como un paquete de Python.</li>
<li><strong><a href="http://settings.py" target="_blank" rel="noopener noreferrer">settings.py</a></strong> contiene todas las configuraciones del sitio web, incluyendo el registro de cualquier aplicación que creemos, la ubicación de nuestros archivos estáticos, detalles de configuración de la base de datos, etc.</li>
<li><strong><a href="http://urls.py" target="_blank" rel="noopener noreferrer">urls.py</a></strong> define los mapeos URL-a-vista del sitio. Aunque podría contener todo el código de mapeo de URL, es más común delegar parte de los mapeos a aplicaciones particulares, como verás más adelante.</li>
<li><strong><a href="http://wsgi.py" target="_blank" rel="noopener noreferrer">wsgi.py</a></strong> se usa para ayudar a tu aplicación Django a comunicarse con el servidor web. Puedes tratarlo como código estándar.</li>
<li><strong><a href="http://asgi.py" target="_blank" rel="noopener noreferrer">asgi.py</a></strong> es un estándar para que las aplicaciones y servidores web asincrónicos de Python se comuniquen entre sí. ASGI es el sucesor asincrónico de WSGI. ASGI proporciona un estándar tanto para aplicaciones asincrónicas como sincrónicas de Python, mientras que WSGI solo lo hacía para las sincrónicas. ASGI es compatible hacia atrás con WSGI y soporta múltiples servidores y frameworks de aplicaciones.</li>
</ul>
<p>El script <strong><a href="http://manage.py" target="_blank" rel="noopener noreferrer">manage.py</a></strong> se usa para crear aplicaciones, trabajar con bases de datos y arrancar el servidor web de desarrollo.</p>
<h3 id="_2-3-creacion-de-la-aplicacion-catalog" tabindex="-1"><a class="header-anchor" href="#_2-3-creacion-de-la-aplicacion-catalog"><span>2.3. Creación de la aplicación <em>catalog</em></span></a></h3>
<p>A continuación, ejecuta el siguiente comando para crear la aplicación <strong>catalog</strong> que vivirá dentro de nuestro proyecto <strong>locallibrary</strong>. Asegúrate de ejecutar este comando desde la misma carpeta que contiene el archivo <strong><a href="http://manage.py" target="_blank" rel="noopener noreferrer">manage.py</a></strong>:</p>
<div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-bash"><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># Linux/macOS</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">python3</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> manage.py</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> startapp</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> catalog</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># Windows</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">py</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> manage.py</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> startapp</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> catalog</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="hint-container note">
<p class="hint-container-title">Nota</p>
<p>El resto del tutorial usa la sintaxis de Linux/macOS. Si trabajas en Windows, donde veas un comando que empiece con <strong>python3</strong>, usa <strong>py</strong> (o <strong>py -3</strong>).</p>
</div>
<p>La herramienta crea una nueva carpeta y la llena con archivos para las diferentes partes de la aplicación (como se muestra en el siguiente ejemplo). La mayoría de los archivos están nombrados según su propósito (por ejemplo, las vistas deben almacenarse en <strong><a href="http://views.py" target="_blank" rel="noopener noreferrer">views.py</a></strong>, los modelos en <strong><a href="http://models.py" target="_blank" rel="noopener noreferrer">models.py</a></strong>, las pruebas en <strong><a href="http://tests.py" target="_blank" rel="noopener noreferrer">tests.py</a></strong>, la configuración del sitio de administración en <strong><a href="http://admin.py" target="_blank" rel="noopener noreferrer">admin.py</a></strong>, el registro de la aplicación en <strong><a href="http://apps.py" target="_blank" rel="noopener noreferrer">apps.py</a></strong>) y contienen un código mínimo estándar para trabajar con los objetos asociados.</p>
<p>El directorio del proyecto actualizado debería verse así:</p>
<div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-bash"><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">locallibrary/</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">    manage.py</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">    locallibrary/</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">    catalog/</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">        admin.py</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">        apps.py</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">        models.py</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">        tests.py</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">        views.py</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">        __init__.py</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">        migrations/</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Además, ahora tenemos:</p>
<ul>
<li>Una carpeta <strong>migrations</strong>, usada para almacenar “migraciones”, archivos que permiten actualizar automáticamente tu base de datos a medida que modificas tus modelos.</li>
<li><strong><strong>init</strong>.py</strong>, un archivo vacío creado para que Django/Python reconozca la carpeta como un paquete de Python y permita usar sus objetos en otras partes del proyecto.</li>
</ul>
<div class="hint-container note">
<p class="hint-container-title">Nota</p>
<p>¿Has notado lo que falta en la lista de archivos anterior? Aunque hay un lugar para tus vistas y modelos, no hay ninguno para tus mapeos de URL, plantillas o archivos estáticos. Te mostraremos cómo crearlos más adelante (no se necesitan en todos los sitios web, pero sí en este ejemplo).</p>
</div>
<h3 id="_2-4-registro-de-la-aplicacion-catalog" tabindex="-1"><a class="header-anchor" href="#_2-4-registro-de-la-aplicacion-catalog"><span>2.4. Registro de la aplicación <em>catalog</em></span></a></h3>
<p>Ahora que la aplicación ha sido creada, debemos registrarla en el proyecto para que se incluya cuando se ejecuten las herramientas (como agregar modelos a la base de datos, por ejemplo). Las aplicaciones se registran agregándolas a la lista <strong>INSTALLED_APPS</strong> en la configuración del proyecto.</p>
<p>Abre el archivo de configuración del proyecto, <code v-pre>django-locallibrary-tutorial/locallibrary/settings.py</code>, y encuentra la definición de la lista <strong>INSTALLED_APPS</strong>. Luego añade una nueva línea al final de la lista, como se muestra a continuación:</p>
<div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-bash"><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">INSTALLED_APPS</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> =</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> [</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">    'django.contrib.admin'</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">,</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">    'django.contrib.auth'</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">,</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">    'django.contrib.contenttypes'</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">,</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">    'django.contrib.sessions'</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">,</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">    'django.contrib.messages'</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">,</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">    'django.contrib.staticfiles'</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">,</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">    # Añade nuestra nueva aplicación</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">    'catalog.apps.CatalogConfig'</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">,</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"> # Este objeto fue creado en /catalog/apps.py</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">]</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>La nueva línea especifica el objeto de configuración de la aplicación (<strong>CatalogConfig</strong>) que se generó automáticamente en <code v-pre>/django-locallibrary-tutorial/catalog/apps.py</code> cuando creaste la aplicación.</p>
<div class="hint-container note">
<p class="hint-container-title">Nota</p>
<p>Verás que ya hay muchas otras <strong>INSTALLED_APPS</strong> (y <strong>MIDDLEWARE</strong>, más abajo en el archivo de configuración). Estas habilitan soporte para el sitio de administración de Django y su funcionalidad (incluyendo sesiones, autenticación, etc.).</p>
</div>
<h3 id="_2-5-especificar-la-base-de-datos" tabindex="-1"><a class="header-anchor" href="#_2-5-especificar-la-base-de-datos"><span>2.5. Especificar la base de datos</span></a></h3>
<p>Aquí también es donde normalmente especificarías la base de datos que se usará para el proyecto. Tiene sentido usar la misma base de datos para desarrollo y producción siempre que sea posible, para evitar pequeñas diferencias de comportamiento. Puedes consultar las distintas opciones en <strong>Databases (Django docs)</strong>.</p>
<p>Usaremos la base de datos SQLite predeterminada para la mayoría de este ejemplo, ya que no esperamos un acceso concurrente alto en una base de datos de demostración, ¡y no requiere configuración adicional! Puedes ver cómo está configurada esta base de datos en <strong><a href="http://settings.py" target="_blank" rel="noopener noreferrer">settings.py</a></strong>:</p>
<div class="language-python line-numbers-mode" data-highlighter="shiki" data-ext="python" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-python"><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#D19A66">DATABASES</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2"> =</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> {</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">    'default'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: {</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">        'ENGINE'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'django.db.backends.sqlite3'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">        'NAME'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#383A42;--shiki-dark:#D19A66">BASE_DIR</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2"> /</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> 'db.sqlite3'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    }</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">}</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Más adelante, en el despliegue de Django a producción, también te mostraremos cómo configurar una base de datos <strong>Postgres</strong>, que podría ser más adecuada para sitios más grandes.</p>
<h3 id="_2-6-otras-configuraciones-del-proyecto" tabindex="-1"><a class="header-anchor" href="#_2-6-otras-configuraciones-del-proyecto"><span>2.6. Otras configuraciones del proyecto</span></a></h3>
<p>El archivo <strong><a href="http://settings.py" target="_blank" rel="noopener noreferrer">settings.py</a></strong> también se usa para configurar otros ajustes, pero en este punto probablemente solo quieras cambiar <strong>TIME_ZONE</strong>, que debe igualarse a una cadena de la lista estándar de zonas horarias (la columna TZ de la tabla contiene los valores que necesitas). Cambia tu valor de <strong>TIME_ZONE</strong> por uno apropiado para tu zona, por ejemplo:</p>
<div class="language-python line-numbers-mode" data-highlighter="shiki" data-ext="python" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-python"><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#D19A66">TIME_ZONE</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2"> =</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> 'Europe/London'</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>Hay otros dos ajustes que no cambiarás ahora, pero que deberías conocer:</p>
<ul>
<li><strong>SECRET_KEY</strong>: es una clave secreta usada como parte de la estrategia de seguridad de Django. Si no proteges este código en desarrollo, deberás usar otro (quizás leído desde una variable de entorno o archivo) cuando lo pongas en producción.</li>
<li><strong>DEBUG</strong>: activa los registros de depuración en caso de error, en lugar de respuestas con código de estado HTTP. Debe establecerse en <strong>False</strong> en producción, ya que la información de depuración puede ser útil para atacantes, pero por ahora podemos dejarlo en <strong>True</strong>.</li>
</ul>
<h3 id="_2-7-conectando-el-mapeador-de-url" tabindex="-1"><a class="header-anchor" href="#_2-7-conectando-el-mapeador-de-url"><span>2.7. Conectando el mapeador de URL</span></a></h3>
<p>El sitio web se crea con un archivo mapeador de URL (<strong><a href="http://urls.py" target="_blank" rel="noopener noreferrer">urls.py</a></strong>) en la carpeta del proyecto. Aunque puedes usar este archivo para gestionar todos tus mapeos de URL, es más habitual delegar los mapeos a la aplicación asociada.</p>
<p>Abre <code v-pre>django-locallibrary-tutorial/locallibrary/urls.py</code> y observa el texto instructivo que explica algunas de las formas de usar el mapeador de URL.</p>
<div class="language-python line-numbers-mode" data-highlighter="shiki" data-ext="python" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-python"><span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"""</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">Configuración de URL para el proyecto locallibrary.</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">La lista `urlpatterns` enruta las URLs a las vistas. Para más información, consulta:</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">    https://docs.djangoproject.com/en/5.0/topics/http/urls/</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">Ejemplos:</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">Vistas basadas en funciones</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">    1. Añade una importación: from my_app import views</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">    2. Añade una URL a urlpatterns: path('', views.home, name='home')</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">Vistas basadas en clases</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">    1. Añade una importación: from other_app.views import Home</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">    2. Añade una URL a urlpatterns: path('', Home.as_view(), name='home')</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">Incluyendo otra URLConf</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">    1. Importa la función include(): from django.urls import include, path</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">    2. Añade una URL a urlpatterns: path('blog/', include('blog.urls'))</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"""</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">from</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> django.contrib </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">import</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> admin</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">from</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> django.urls </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">import</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> path</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">urlpatterns </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> [</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF">    path</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'admin/'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, admin.site.urls),</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">]</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Los mapeos de URL se gestionan mediante la variable <strong>urlpatterns</strong>, que es una lista de Python de funciones <strong>path()</strong>.<br>
Cada función <strong>path()</strong> asocia un patrón de URL a una vista específica (que se mostrará cuando el patrón coincida) o a otra lista de código de prueba de patrones de URL (en este segundo caso, el patrón se convierte en la “URL base” para los patrones definidos en el módulo de destino).</p>
<p>La lista <strong>urlpatterns</strong> define inicialmente una única función que mapea todas las URLs con el patrón <code v-pre>admin/</code> al módulo <code v-pre>admin.site.urls</code>, el cual contiene las propias definiciones de mapeo de URL de la aplicación de Administración.</p>
<div class="hint-container note">
<p class="hint-container-title">Nota</p>
<p>El parámetro <em>route</em> en <strong>path()</strong> es una cadena que define un patrón de URL que debe coincidir. Esta cadena puede incluir una variable con nombre (entre corchetes angulares), por ejemplo <code v-pre>'catalog/&lt;id&gt;/'</code>.<br>
Este patrón coincidirá con una URL como <code v-pre>catalog/any_chars/</code> y pasará <code v-pre>any_chars</code> a la vista como una cadena con el nombre de parámetro <code v-pre>id</code>.<br>
Discutiremos los métodos <em>path</em> y los patrones de ruta más adelante.</p>
</div>
<p>Para añadir un nuevo elemento a la lista <strong>urlpatterns</strong>, agrega las siguientes líneas al final del archivo.<br>
Este nuevo elemento incluye una <strong>path()</strong> que reenvía las solicitudes con el patrón <code v-pre>catalog/</code> al módulo <code v-pre>catalog.urls</code> (el archivo con la URL relativa <code v-pre>catalog/urls.py</code>):</p>
<div class="language-python line-numbers-mode" data-highlighter="shiki" data-ext="python" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-python"><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># Usa include() para añadir rutas desde la aplicación catalog</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">from</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> django.urls </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">import</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> include</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">urlpatterns </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">+=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> [</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF">    path</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'catalog/'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF">include</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'catalog.urls'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)),</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">]</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="hint-container note">
<p class="hint-container-title">Nota</p>
<p>Observa que incluimos la línea de importación (<code v-pre>from django.urls import include</code>) junto con el código que la utiliza (para que sea fácil ver lo que hemos añadido), pero es común incluir todas las líneas de importación al inicio de un archivo Python.</p>
</div>
<p>Ahora redirigiremos la URL raíz de nuestro sitio (es decir, <code v-pre>127.0.0.1:8000</code>) a la URL <code v-pre>127.0.0.1:8000/catalog/</code>.<br>
Esta es la única aplicación que usaremos en este proyecto.<br>
Para hacerlo, utilizaremos una función de vista especial, <strong>RedirectView</strong>, que toma la nueva URL relativa a redirigir (<code v-pre>/catalog/</code>) como su primer argumento cuando el patrón de URL especificado en la función <strong>path()</strong> coincide (la URL raíz, en este caso).</p>
<p>Añade las siguientes líneas al final del archivo:</p>
<div class="language-python line-numbers-mode" data-highlighter="shiki" data-ext="python" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-python"><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># Añadir mapeos de URL para redirigir la URL base a nuestra aplicación</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">from</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> django.views.generic </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">import</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> RedirectView</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">urlpatterns </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">+=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> [</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF">    path</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">''</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, RedirectView.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF">as_view</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic">url</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'catalog/'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic">permanent</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">True</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)),</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">]</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Deja el primer parámetro de la función <strong>path</strong> vacío para implicar <code v-pre>'/'</code>.<br>
Si escribes el primer parámetro como <code v-pre>'/'</code>, Django te mostrará la siguiente advertencia al iniciar el servidor de desarrollo:</p>
<div class="language-python line-numbers-mode" data-highlighter="shiki" data-ext="python" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-python"><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">System check identified some issues:</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#D19A66">WARNINGS</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">:</span></span>
<span class="line"><span style="--shiki-light:white;--shiki-dark:#FFFFFF">?</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: (urls.W002) Your </span><span style="--shiki-light:#383A42;--shiki-dark:#D19A66">URL</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> pattern </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'/'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> has a route beginning </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">with</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> a </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'/'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">Remove this slash </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">as</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> it </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">is</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> unnecessary.</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">If this pattern </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">is</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> targeted </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">in</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> an </span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF">include</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(), ensure the </span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF">include</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">() pattern has a trailing </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'/'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Django no sirve archivos estáticos como CSS, JavaScript o imágenes por defecto,<br>
pero puede ser útil que el servidor de desarrollo lo haga mientras creas tu sitio.<br>
Como adición final a este mapeador de URL, puedes habilitar el servicio de archivos estáticos durante el desarrollo añadiendo las siguientes líneas.</p>
<p>Agrega este bloque final al final del archivo ahora:</p>
<div class="language-python line-numbers-mode" data-highlighter="shiki" data-ext="python" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-python"><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># Usa static() para añadir mapeo de URL que sirva archivos estáticos durante el desarrollo (solo)</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">from</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> django.conf </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">import</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> settings</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">from</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> django.conf.urls.static </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">import</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> static</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">urlpatterns </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">+=</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF"> static</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(settings.</span><span style="--shiki-light:#383A42;--shiki-dark:#D19A66">STATIC_URL</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic">document_root</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">settings.</span><span style="--shiki-light:#383A42;--shiki-dark:#D19A66">STATIC_ROOT</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="hint-container note">
<p class="hint-container-title">Nota</p>
<p>Hay varias formas de extender la lista <strong>urlpatterns</strong> (anteriormente solo añadimos un nuevo elemento usando el operador <code v-pre>+=</code> para separar claramente el código antiguo y el nuevo).<br>
Podríamos haber incluido este nuevo mapeo directamente en la definición original:</p>
<div class="language-python line-numbers-mode" data-highlighter="shiki" data-ext="python" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-python"><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">urlpatterns </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> [</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF">    path</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'admin/'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, admin.site.urls),</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF">    path</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'catalog/'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF">include</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'catalog.urls'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)),</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF">    path</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">''</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, RedirectView.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF">as_view</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic">url</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'catalog/'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)),</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">] </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">+</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF"> static</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(settings.</span><span style="--shiki-light:#383A42;--shiki-dark:#D19A66">STATIC_URL</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic">document_root</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">settings.</span><span style="--shiki-light:#383A42;--shiki-dark:#D19A66">STATIC_ROOT</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div>
<p>Como paso final, crea un archivo dentro de tu carpeta <strong>catalog</strong> llamado <strong><a href="http://urls.py" target="_blank" rel="noopener noreferrer">urls.py</a></strong>, y añade el siguiente texto para definir el (vacío) <strong>urlpatterns</strong> importado.<br>
Aquí es donde añadiremos nuestros patrones conforme construyamos la aplicación.</p>
<div class="language-python line-numbers-mode" data-highlighter="shiki" data-ext="python" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-python"><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">from</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> django.urls </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">import</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> path</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">from</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> . </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">import</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> views</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">urlpatterns </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> [</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">]</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-8-probando-el-marco-del-sitio-web" tabindex="-1"><a class="header-anchor" href="#_2-8-probando-el-marco-del-sitio-web"><span>2.8. Probando el marco del sitio web</span></a></h3>
<p>En este punto, tenemos un proyecto esqueleto completo.<br>
El sitio web aún no hace nada, pero vale la pena ejecutarlo para asegurarnos de que ninguno de nuestros cambios ha roto nada.</p>
<p>Antes de hacerlo, primero debemos ejecutar una <strong>migración de base de datos</strong>.<br>
Esto actualiza nuestra base de datos (para incluir cualquier modelo en nuestras aplicaciones instaladas) y elimina algunas advertencias de compilación.</p>
<h3 id="_2-9-ejecutando-migraciones-de-base-de-datos" tabindex="-1"><a class="header-anchor" href="#_2-9-ejecutando-migraciones-de-base-de-datos"><span>2.9. Ejecutando migraciones de base de datos</span></a></h3>
<p>Django usa un <strong>Object-Relational-Mapper (ORM)</strong> para mapear las definiciones de los modelos en el código Django a la estructura de datos utilizada por la base de datos subyacente.<br>
A medida que cambiamos las definiciones de nuestros modelos, Django rastrea los cambios y puede crear scripts de migración de base de datos (en <code v-pre>/django-locallibrary-tutorial/catalog/migrations/</code>) para migrar automáticamente la estructura de datos subyacente en la base de datos y hacerla coincidir con el modelo.</p>
<p>Cuando creamos el sitio web, Django añadió automáticamente varios modelos para uso de la sección de administración del sitio (que veremos más adelante).<br>
Ejecuta los siguientes comandos para definir tablas para esos modelos en la base de datos (asegúrate de estar en el directorio que contiene <strong><a href="http://manage.py" target="_blank" rel="noopener noreferrer">manage.py</a></strong>):</p>
<div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-bash"><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">python3</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> manage.py</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> makemigrations</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">python3</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> manage.py</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> migrate</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><div class="hint-container warning">
<p class="hint-container-title">Aviso</p>
<p>Deberás ejecutar estos comandos cada vez que tus modelos cambien de una forma que afecte la estructura de los datos que deben almacenarse (incluyendo tanto la adición como la eliminación de modelos o campos individuales).</p>
</div>
<p>El comando <strong>makemigrations</strong> crea (pero no aplica) las migraciones para todas las aplicaciones instaladas en tu proyecto.<br>
Puedes especificar el nombre de la aplicación para ejecutar la migración solo para una app.<br>
Esto te da la oportunidad de revisar el código de las migraciones antes de aplicarlas.<br>
Si eres un experto en Django, ¡puedes incluso ajustarlas ligeramente!</p>
<p>El comando <strong>migrate</strong> aplica las migraciones a tu base de datos.<br>
Django lleva un seguimiento de cuáles han sido añadidas a la base de datos actual.</p>
<div class="hint-container note">
<p class="hint-container-title">Nota</p>
<p>Debes volver a ejecutar las migraciones y probar el sitio cada vez que hagas cambios significativos. ¡No lleva mucho tiempo!</p>
</div>
<p>Consulta <strong>Migrations (Django docs)</strong> para más información sobre comandos de migración menos comunes.</p>
<h3 id="_2-10-ejecutando-el-sitio-web" tabindex="-1"><a class="header-anchor" href="#_2-10-ejecutando-el-sitio-web"><span>2.10. Ejecutando el sitio web</span></a></h3>
<p>Durante el desarrollo, puedes servir el sitio web primero usando el servidor web de desarrollo y luego verlo en tu navegador local.</p>
<div class="hint-container note">
<p class="hint-container-title">Nota</p>
<p>El servidor web de desarrollo no es lo suficientemente robusto ni eficiente para su uso en producción, pero es una manera muy sencilla de poner en marcha tu sitio Django durante el desarrollo y realizar pruebas rápidas.<br>
Por defecto, servirá el sitio a tu ordenador local (<code v-pre>http://127.0.0.1:8000/</code>), pero también puedes especificar otros ordenadores de tu red para servirlo.<br>
Para más información, consulta <strong>django-admin and <a href="http://manage.py" target="_blank" rel="noopener noreferrer">manage.py</a>: runserver (Django docs)</strong>.</p>
</div>
<p>Ejecuta el servidor web de desarrollo llamando al comando <strong>runserver</strong> (en el mismo directorio que <strong><a href="http://manage.py" target="_blank" rel="noopener noreferrer">manage.py</a></strong>):</p>
<div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-bash"><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">python3</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> manage.py</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> runserver</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>Una vez que el servidor esté ejecutándose, puedes ver el sitio navegando a:</p>
<p>👉 <a href="http://127.0.0.1:8000/" target="_blank" rel="noopener noreferrer">http://127.0.0.1:8000/</a><br>
en tu navegador web local.</p>
</div></template>


