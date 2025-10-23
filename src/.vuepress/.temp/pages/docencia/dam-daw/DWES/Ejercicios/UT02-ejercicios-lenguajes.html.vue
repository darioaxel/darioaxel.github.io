<template><div><div class="hint-container info">
<p class="hint-container-title">Información</p>
<p>Este ejercicio se trabajará en las videotutorías, por lo cual el contenido final no estará disponible hasta la segunda semana.</p>
</div>
<h1 id="ejercicios-ut02-lenguajes-de-desarrollo-web-en-servidor" tabindex="-1"><a class="header-anchor" href="#ejercicios-ut02-lenguajes-de-desarrollo-web-en-servidor"><span>Ejercicios UT02. Lenguajes de desarrollo web en servidor.</span></a></h1>
<h2 id="ejercicio-ut02-1-1-el-lenguaje-php" tabindex="-1"><a class="header-anchor" href="#ejercicio-ut02-1-1-el-lenguaje-php"><span>Ejercicio UT02-1.1 El lenguaje PHP</span></a></h2>
<p>En este ejercicio vamos a aprender a publicar un fichero <code v-pre>.php</code> en nuestra web local que sirve Apache2.</p>
<figure><img src="/images/dwes/ejercicios/hello-php.png" alt="Ejercicio PHP básico" tabindex="0" loading="lazy"><figcaption>Ejercicio PHP básico</figcaption></figure>
<p>En la imagen anterior, se puede comprobar como el archivo <code v-pre>php</code> que queremos publicar en nuestro servidor, ha de encontrarse en la ruta:</p>
<div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-bash"><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">/var/www/html/</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>Así nuestro navegador podrá acceder y visualizar el contenido:</p>
<figure><img src="/images/dwes/ejercicios/hello-php-2.png" alt="Navegador PHP básico" tabindex="0" loading="lazy"><figcaption>Navegador PHP básico</figcaption></figure>
<h2 id="ejercicio-ut02-1-2-el-lenguaje-php" tabindex="-1"><a class="header-anchor" href="#ejercicio-ut02-1-2-el-lenguaje-php"><span>Ejercicio UT02-1.2 El lenguaje PHP</span></a></h2>
<p>En el segundo ejercicio, utilizando el archivo <code v-pre>usuario.php</code>, podemos ver como el lenguaje <code v-pre>php</code> permite crear de manera directa el código <code v-pre>html</code> que se &quot;imprime&quot; para que el navegador muestre el resultado final para el usuario.</p>
<figure><img src="/images/dwes/ejercicios/php-medio.png" alt="Ejercicio PHP medio" tabindex="0" loading="lazy"><figcaption>Ejercicio PHP medio</figcaption></figure>
<p>El lenguaje PHP identifica las variables mediante el uso del símbolo del <code v-pre>$</code> delante del nombre. Como se puede comprobar, el código, que se identifica por estar entre las etiquetas xml <code v-pre>&lt;?php</code>  y <code v-pre>?&gt;</code> es ocultado y no se visualiza en el navegador.</p>
<figure><img src="/images/dwes/ejercicios/php-medio-2.png" alt="Navegador PHP medio" tabindex="0" loading="lazy"><figcaption>Navegador PHP medio</figcaption></figure>
<div class="hint-container warning">
<p class="hint-container-title">Aviso</p>
<p>A la hora de trabajar con el terminal y los archivos en Linux, hemos de tener en cuenta que el propietario y los permisos que se le otorgan son esenciales para que el servidor pueda trabajar con ellos.</p>
</div>
<h2 id="ejercicio-ut02-2-jakarta-ee-estructura-de-directorios-y-generacion-de-archivo-para-servidor" tabindex="-1"><a class="header-anchor" href="#ejercicio-ut02-2-jakarta-ee-estructura-de-directorios-y-generacion-de-archivo-para-servidor"><span>Ejercicio UT02-2 Jakarta EE, estructura de directorios y generación de archivo para servidor</span></a></h2>
<h3 id="ejercicio-ut02-2-1-estructura-de-una-aplicacion-jakarta" tabindex="-1"><a class="header-anchor" href="#ejercicio-ut02-2-1-estructura-de-una-aplicacion-jakarta"><span>Ejercicio UT02-2.1 Estructura de una aplicación Jakarta</span></a></h3>
<p>Para la construcción de aplicaciones en <code v-pre>Jakarta EE</code> y/o la compilación de aplicaciones Java complejas, debemos utilizar los ficheros <code v-pre>.pom</code> que nos permiten establecer cuál será la estructura de nuestra aplicación, las versiones de las librerías y entornos de desarrollo, etc.</p>
<figure><img src="/images/dwes/ejercicios/jakartaEE-1.png" alt="Jakarta EE, pom" tabindex="0" loading="lazy"><figcaption>Jakarta EE, pom</figcaption></figure>
<p>Además, como se señala en la parte inferior izquierda de la imagen anterior, debemos utilizar un servidor de aplicaciones (en este caso Payara) para que el archivo <code v-pre>.war</code> que generamos, sea accesible desde el navegador.</p>
<p>En este framework/sistema Payara realiza las funciones que en php hacía Apache, además de muchas otras directamente relacionadas con el ciclo de vida de los servlets o beans que usamos en la aplicación.</p>
<p>La forma en la que se estructura la aplicación viene definida en el <code v-pre>pom</code> y permite identificar las distintas partes de la misma:</p>
<ul>
<li><em>Capa de Vista</em>: Ficheros de tipo <code v-pre>.xhmtl</code></li>
<li><em>Capa de Controladores</em> : Beans</li>
</ul>
<figure><img src="/images/dwes/ejercicios/jakartaEE-2.png" alt="árbol de directorios - Jakarta EE - pom" tabindex="0" loading="lazy"><figcaption>árbol de directorios - Jakarta EE - pom</figcaption></figure>
<h3 id="ejercicio-ut02-2-2-generacion-del-archivo-war-y-publicacion-con-payara-server" tabindex="-1"><a class="header-anchor" href="#ejercicio-ut02-2-2-generacion-del-archivo-war-y-publicacion-con-payara-server"><span>Ejercicio UT02-2.2 Generación del archivo <code v-pre>war</code> y publicación con Payara Server.</span></a></h3>
<p>Para poder generar el paquete <code v-pre>.war</code> de nuestra aplicación, hemos de realizar la llamada a <code v-pre>Maven</code> mediante el terminal.<br>
<img src="/images/dwes/ejercicios/jakartaEE-4.png" alt="Comando Maven" loading="lazy"></p>
<div class="hint-container warning">
<p class="hint-container-title">¡Cuidado! el comando debe ejecutarse desde el directorio donde se encuentra el <code v-pre>.pom</code> que vamos a utilizar</p>
</div>
<p>Una vez finalizada, y si no hubo errores en la compilación, se genera el paquete:</p>
<figure><img src="/images/dwes/ejercicios/jakartaEE-5.png" alt="Paquete war" tabindex="0" loading="lazy"><figcaption>Paquete war</figcaption></figure>
<p>A continuación, utilizaremos el menú contextual que aparece al pulsar el botón derecho sobre el paquete, para publicarlo en nuestro servidor Payara.</p>
<p>Una vez publicado, podemos acceder con nuestro navegador para ver el resultado:</p>
<figure><img src="/images/dwes/ejercicios/jakartaEE-6.png" alt="Publicación en Payara" tabindex="0" loading="lazy"><figcaption>Publicación en Payara</figcaption></figure>
<h3 id="ejercicio-ut02-2-3-mapeado-de-datos-en-el-xhtml-desde-el-beam-java" tabindex="-1"><a class="header-anchor" href="#ejercicio-ut02-2-3-mapeado-de-datos-en-el-xhtml-desde-el-beam-java"><span>Ejercicio UT02-2.3 Mapeado de datos en el xhtml desde el beam java.</span></a></h3>
<p>El proceso de compilación y el servidor de aplicaciones, permiten realizar un mapeo del contenido de nuestro bean en el xhtml que es leído y mostrado por el navegador.</p>
<figure><img src="/images/dwes/ejercicios/jakartaEE-7.png" alt="Código xhtml" tabindex="0" loading="lazy"><figcaption>Código xhtml</figcaption></figure>
<p>Dentro del <code v-pre>xhtml</code> utilizamos etiquetas propias que, junto con el identificador del bean y el uso de las funciones que ese objeto nos proporciona, permiten mostrar los datos al cliente.</p>
<figure><img src="/images/dwes/ejercicios/jakartaEE-8.png" alt="Mapeo entre Beam y XHtml" tabindex="0" loading="lazy"><figcaption>Mapeo entre Beam y XHtml</figcaption></figure>
<h2 id="ejercicio-ut02-3-python-y-django" tabindex="-1"><a class="header-anchor" href="#ejercicio-ut02-3-python-y-django"><span>Ejercicio UT02-3 Python y DJango</span></a></h2>
<h3 id="ejercicio-1-duracion-de-un-album" tabindex="-1"><a class="header-anchor" href="#ejercicio-1-duracion-de-un-album"><span>Ejercicio 1: Duración de un álbum</span></a></h3>
<ul>
<li>Dado un <code v-pre>json</code> como el siguiente, crea un programa python que calcule la duración completa del disco.</li>
</ul>
<div class="language-json line-numbers-mode" data-highlighter="shiki" data-ext="json" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-json"><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">{</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">  "album"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"Songs of a Lost World"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">  "artist"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"The Cure"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">  "year"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">2024</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">  "tracks"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: [</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    {</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">      "title"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"Alone"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">      "duration"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"6:48"</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    },</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    {</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">      "title"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"And Nothing Is Forever"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">      "duration"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"6:53"</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    },</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    {</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">      "title"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"A Fragile Thing"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">      "duration"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"4:43"</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    },</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    {</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">      "title"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"Warsong"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">      "duration"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"4:17"</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    },</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    {</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">      "title"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"Drone:Nodrone"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">      "duration"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"4:45"</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    },</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    {</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">      "title"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"I Can Never Say Goodbye"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">      "duration"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"6:03"</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    },</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    {</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">      "title"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"All I Ever Am"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">      "duration"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"5:21"</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    },</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    {</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">      "title"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"Endsong"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">      "duration"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"10:23"</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    }</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  ]</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">}</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="ejercicio-2" tabindex="-1"><a class="header-anchor" href="#ejercicio-2"><span>Ejercicio 2:</span></a></h3>
<hr>
<h3 id="ejercicio-0x-creacion-de-una-aplicacion-djando-desde-0" tabindex="-1"><a class="header-anchor" href="#ejercicio-0x-creacion-de-una-aplicacion-djando-desde-0"><span>Ejercicio 0X: Creación de una aplicación Djando desde 0</span></a></h3>
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


