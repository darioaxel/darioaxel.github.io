<template><div><h1 id="🐍-anexo-i-entornos-virtuales-en-python" tabindex="-1"><a class="header-anchor" href="#🐍-anexo-i-entornos-virtuales-en-python"><span>🐍 Anexo I: Entornos Virtuales en Python</span></a></h1>
<h2 id="_1-entornos-virtuales-en-python" tabindex="-1"><a class="header-anchor" href="#_1-entornos-virtuales-en-python"><span>1. Entornos Virtuales en Python</span></a></h2>
<p>En las aplicaciones basadas en Python es frecuente utilizar paquetes y módulos que no forman parte de la librería estándar.<br>
Muchas veces, determinadas aplicaciones necesitan de determinadas versiones de librerías específicas, y esto implica que la instalación local de Python puede no llegar a cumplir las especificaciones de todas las aplicaciones.</p>
<p>La solución a este problema son los <strong>entornos virtuales</strong>: se trata de un árbol “autónomo” de directorios que contiene una instalación de Python, para una determinada versión y con una serie de paquetes adicionales.</p>
<p>De esta forma, diferentes aplicaciones pueden utilizar diferentes entornos virtuales, dependiendo de la versión, tanto de Python, como de los paquetes adicionales para que la aplicación funcione correctamente.</p>
<p>La siguiente imagen ilustra un mismo equipo en el que existen diferentes entornos virtuales, con diferentes versiones de Python, para proyectos diferentes:</p>
<figure><img src="@source/docencia/dam-daw/DWES/#" alt="ToDo - incluir imagen" tabindex="0" loading="lazy"><figcaption>ToDo - incluir imagen</figcaption></figure>
<h3 id="creacion-de-un-entorno-virtual" tabindex="-1"><a class="header-anchor" href="#creacion-de-un-entorno-virtual"><span>Creación de un entorno virtual</span></a></h3>
<p>El módulo utilizado para la creación de entornos virtuales es <strong>venv</strong>.<br>
Para instalarlo en Ubuntu, el comando es:</p>
<div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-bash"><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">sudo</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> apt</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> install</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> python3-venv</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>El comando para crear un entorno virtual en un directorio determinado es:</p>
<div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-bash"><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">python3</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -m</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> venv</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> app-env</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>Este comando creará el directorio <code v-pre>app-env</code> con un árbol de directorios que contienen el intérprete de Python y archivos de soporte.<br>
El parámetro <code v-pre>-m</code> indica al intérprete de Python que se va a ejecutar un módulo, en este caso <code v-pre>venv</code>, como un script.</p>
<blockquote>
<p>Si quieres saber más sobre los módulos en Python, aquí tienes más información.</p>
</blockquote>
<p>Para activar el entorno virtual de Python, se utilizará uno de los siguientes comandos, dependiendo del sistema operativo (desde la ruta en la que se encuentre la carpeta <code v-pre>app-env</code>):</p>
<p><strong>En Linux o MacOS:</strong></p>
<div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-bash"><span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">source</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> app-env/bin/activate</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>Tras ejecutar este comando, sabremos que estamos utilizando el entorno virtual porque la línea de comandos pasará a tener el nombre del entorno virtual entre paréntesis:</p>
<div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-bash"><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">app-env</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">) </span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">usuario:$</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h2 id="_2-gestion-de-paquetes-mediante-pip" tabindex="-1"><a class="header-anchor" href="#_2-gestion-de-paquetes-mediante-pip"><span>2. Gestión de paquetes mediante pip</span></a></h2>
<p>Se pueden instalar, actualizar o quitar paquetes utilizando el programa <strong>pip</strong>, que instala paquetes, por defecto, del índice de Paquetes de Python <a href="https://pypi.org" target="_blank" rel="noopener noreferrer">PyPI</a>, que puede ser explorado manualmente mediante un navegador web.</p>
<p><code v-pre>pip</code> tiene una serie de comandos (<code v-pre>install</code>, <code v-pre>freeze</code>, <code v-pre>uninstall</code>, etc.), que pueden ser consultados en la <a href="https://pip.pypa.io" target="_blank" rel="noopener noreferrer">documentación oficial</a>.</p>
<h3 id="instalacion-de-paquetes" tabindex="-1"><a class="header-anchor" href="#instalacion-de-paquetes"><span>Instalación de paquetes</span></a></h3>
<p>Instalar la última versión de un paquete:</p>
<div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-bash"><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">app-env</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">) </span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> pip</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> install</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> flask</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>Instalar una versión específica:</p>
<div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-bash"><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">app-env</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">) </span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> pip</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> install</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> requests==</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">2.6.0</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>Actualizar un paquete existente:</p>
<div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-bash"><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">app-env</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">) </span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> pip</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> install</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> --upgrade</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> requests</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>Eliminar un paquete:</p>
<div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-bash"><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">pip</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> uninstall</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> &#x3C;</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">nombre_paquet</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">e></span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>Mostrar información de un paquete:</p>
<div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-bash"><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">pip</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> show</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> &#x3C;</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">nombre_paquet</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">e></span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>Listar todos los paquetes instalados:</p>
<div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-bash"><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">pip</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> list</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>Generar lista de dependencias instaladas (en formato instalable):</p>
<div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-bash"><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">app-env</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">) </span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> pip</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> freeze</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> > </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">requirements.txt</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>Instalar dependencias desde <code v-pre>requirements.txt</code>:</p>
<div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-bash"><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">app-env</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">) </span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> pip</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> install</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -r</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> requirements.txt</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h2 id="_3-creacion-del-primer-proyecto-django" tabindex="-1"><a class="header-anchor" href="#_3-creacion-del-primer-proyecto-django"><span>3. Creación del primer proyecto Django</span></a></h2>
<p>Vamos a crear nuestro primer proyecto con Django.</p>
<p>Creamos un primer entorno virtual llamado <code v-pre>portfolio-venv</code> en una carpeta de nuestra elección, donde lanzamos el siguiente comando mediante consola:</p>
<div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-bash"><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">python3</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -m</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> venv</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> portfolio-env</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>A continuación, lo activamos:</p>
<div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-bash"><span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">source</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> portfolio-env/bin/activate</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>Sabemos que está activo porque al comienzo de la línea de comandos se muestra el nombre del entorno virtual entre paréntesis.</p>
<p>Antes de ejecutar la instalación de Django, vamos a averiguar cuál es la <strong>última versión LTS (Long-term Support)</strong>, que es la que nos va a proporcionar mayor duración en el soporte (con otras ventajas).</p>
<p>Consultamos el siguiente enlace y vemos que la más reciente es la <strong>5.2</strong> y además es <strong>LTS</strong>, con lo cual es la candidata ideal para nuestro nuevo proyecto.</p>
<p>Aun así, hay que valorar también que la <strong>4.2 (también LTS)</strong> va a tener soporte hasta marzo de 2026.</p>
<figure><img src="@source/docencia/dam-daw/DWES/#" alt="ToDo - incluir imagen de versiones Django" tabindex="0" loading="lazy"><figcaption>ToDo - incluir imagen de versiones Django</figcaption></figure>
<p>La ventaja de elegir la última versión va a ser que tendremos acceso a las últimas funcionalidades;<br>
las desventajas son que puede haber más errores (bugs) o incompatibilidades con otros paquetes.</p>
<p>Elegimos instalar la <strong>última LTS (5.2)</strong>:</p>
<div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-bash"><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">pip</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> install</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> Django==</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">5.2</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>Creamos el fichero de dependencias:</p>
<div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-bash"><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">pip</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> freeze</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> > </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">requirements.txt</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>Creamos el primer proyecto Django:</p>
<div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-bash"><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">django-admin</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> startproject</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> portfolioDjango</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>Al hacerlo, se crea una carpeta <code v-pre>portfolioDjango</code> con la estructura base del proyecto:</p>
<figure><img src="@source/docencia/dam-daw/DWES/#" alt="ToDo - incluir imagen estructura proyecto Django" tabindex="0" loading="lazy"><figcaption>ToDo - incluir imagen estructura proyecto Django</figcaption></figure>
<p>Lanzamos la aplicación:</p>
<div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-bash"><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">python</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> manage.py</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> runserver</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>El servidor se lanza por defecto en el <strong>puerto 8000</strong>, y al acceder desde el navegador veremos la página de bienvenida de Django.</p>
<!--

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


--></div></template>


