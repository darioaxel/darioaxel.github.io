<template><div><div class="hint-container info">
<p class="hint-container-title">Información</p>
<p>Este ejercicio se trabajará en las videotutorías, por lo cual el contenido final no estará disponible hasta la segunda semana.</p>
</div>
<figure><img src="/images/under-construction.jpg" alt="En construcción" tabindex="0" loading="lazy"><figcaption>En construcción</figcaption></figure>
<h1 id="ejercicios-ut02-lenguajes-de-desarrollo-web-en-servidor" tabindex="-1"><a class="header-anchor" href="#ejercicios-ut02-lenguajes-de-desarrollo-web-en-servidor"><span>Ejercicios UT02. Lenguajes de desarrollo web en servidor.</span></a></h1>
<h2 id="ejercicio-ut02-1-el-lenguaje-php" tabindex="-1"><a class="header-anchor" href="#ejercicio-ut02-1-el-lenguaje-php"><span>Ejercicio UT02-1 El lenguaje PHP</span></a></h2>
<p>En este ejercicio vamos a aprender a publicar un fichero <code v-pre>.php</code> en nuestra web local que sirve Apache2.</p>
<h2 id="ejercicio-ut02-2-jakarta-ee-estructura-de-directorios-y-generacion-de-archivo-para-servidor" tabindex="-1"><a class="header-anchor" href="#ejercicio-ut02-2-jakarta-ee-estructura-de-directorios-y-generacion-de-archivo-para-servidor"><span>Ejercicio UT02-2 Jakarta EE, estructura de directorios y generación de archivo para servidor</span></a></h2>
<h2 id="ejercicio-ut02-3-python-y-django" tabindex="-1"><a class="header-anchor" href="#ejercicio-ut02-3-python-y-django"><span>Ejercicio UT02-3 Python y DJango</span></a></h2>
<h3 id="ejercicio-01-creacion-de-una-aplicacion-djando-desde-0" tabindex="-1"><a class="header-anchor" href="#ejercicio-01-creacion-de-una-aplicacion-djando-desde-0"><span>Ejercicio 01: Creación de una aplicación Djando desde 0</span></a></h3>
<p>A continuación vamos a crear la estructura básica de un proyecto en Djando para que podamos compartir en un servidor, el contenido de nuestros datos.</p>
<p><a href="https://github.com/darioaxel/DWES-Ejercicios-2025-2026/blob/main/dwes-UT02/03-django/ejercicio01" target="_blank" rel="noopener noreferrer">Enlace al proyecto</a></p>
<p>Veamos como hemos llegado hasta este punto:</p>
<ol>
<li>Desde un directorio de nuestro sistema ejecutamos:</li>
</ol>
<div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-bash"><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">mkdir</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> ejercicio01</span></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">cd</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> ejercicio01</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># Aunque no es obligatorio, si muy recomendable, utilizar entornos virtuales</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">python3</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -m</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> venv</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> venv</span></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">source</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> venv/bin/activate</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># Si ya hemos instalado antes django, podemos saltar el siguiente paso</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">pip</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> install</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> django</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2">
<li>Creamos la estructura básica automáticamente:</li>
</ol>
<div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-bash"><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">django-admin</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> startproject</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> ejercicio01</span></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">cd</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> ejercicio01</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><p>Esto crea la estructura básica que contendrá el script <code v-pre>manage.py</code></p>
<ol start="3">
<li>Ahora vamos a crear una app llamada <code v-pre>usuarios</code> dentro del proyecto.</li>
</ol>
<div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-bash"><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">python3</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> manage.py</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> startapp</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> usuarios</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><ol start="4">
<li>Para que la aplicación se cargue, hemos de instanciarla dentro. Activamos la app en <code v-pre>ejercicio01/settings.py</code>, dentro del array <code v-pre>INSTALLED_APPS</code>:</li>
</ol>
<div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-bash"><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">INSTALLED_APPS</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> =</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> [</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">    'django.contrib.admin'</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">,</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">    'django.contrib.auth'</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">,</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">    'django.contrib.contenttypes'</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">,</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">    'django.contrib.sessions'</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">,</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">    'django.contrib.messages'</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">,</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">    'django.contrib.staticfiles'</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">,</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">    'usuarios'</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">,</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">   # &#x3C;-- añadida</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">]</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="5">
<li>
<p>A continuación, accedemos al fichero <code v-pre>views.py</code> dentro de nuestra app <code v-pre>usuarios/views.py</code> para codificar el html a mostrar.</p>
</li>
<li>
<p>Para que el servidor sepa donde &quot;servir&quot; nuestra vista, hemos de indicarlo dentro del vector que contiene las rutas (paths) del proyecto <code v-pre>ejercicio01/urls.py</code>:</p>
</li>
</ol>
<div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-bash"><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">from</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> usuarios.views</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> import</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> usuario_view</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">urlpatterns</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> =</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> [</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">    path(</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">'admin/'</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">,</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> admin.site.urls</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">),</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">    path(</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">'usuario/'</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">,</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> usuario_view</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">),</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">]</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


