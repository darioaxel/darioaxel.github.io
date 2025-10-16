---
title: Anexo I. Django Básico
date: 2025-10-15    
icon: diagram-project 
order: -1
---
# 🐍 Anexo I: Entornos Virtuales en Python

## 1. Entornos Virtuales en Python

En las aplicaciones basadas en Python es frecuente utilizar paquetes y módulos que no forman parte de la librería estándar.
Muchas veces, determinadas aplicaciones necesitan de determinadas versiones de librerías específicas, y esto implica que la instalación local de Python puede no llegar a cumplir las especificaciones de todas las aplicaciones.

La solución a este problema son los **entornos virtuales**: se trata de un árbol “autónomo” de directorios que contiene una instalación de Python, para una determinada versión y con una serie de paquetes adicionales.

De esta forma, diferentes aplicaciones pueden utilizar diferentes entornos virtuales, dependiendo de la versión, tanto de Python, como de los paquetes adicionales para que la aplicación funcione correctamente.

La siguiente imagen ilustra un mismo equipo en el que existen diferentes entornos virtuales, con diferentes versiones de Python, para proyectos diferentes:
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