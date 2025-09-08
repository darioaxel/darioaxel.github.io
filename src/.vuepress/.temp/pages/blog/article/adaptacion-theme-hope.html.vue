<template><div><h1 id="adaptacion-de-theme-hope-para-mi-blog" tabindex="-1"><a class="header-anchor" href="#adaptacion-de-theme-hope-para-mi-blog"><span>Adaptación de Theme Hope para mi Blog</span></a></h1>
<h2 id="descripcion-del-proyecto" tabindex="-1"><a class="header-anchor" href="#descripcion-del-proyecto"><span>Descripción del Proyecto</span></a></h2>
<p>Este proyecto es una API RESTful desarrollada con Django y PostgreSQL para el testeo de futuros<br>
usos en los módulos.</p>
<h2 id="software-a-utilizar" tabindex="-1"><a class="header-anchor" href="#software-a-utilizar"><span>Software a utilizar</span></a></h2>
<ul>
<li>Python: 3.11 (última estable)</li>
<li>Django: 5.2.3 (última estable, requiere Python ≥3.10)</li>
<li>PostgreSQL: 17 (última estable, disponible como imagen oficial en Docker)</li>
<li>Poetry: para gestión de dependencias y entorno virtual</li>
<li>Docker y Docker Compose: para contenerización</li>
</ul>
<h2 id="inicializacion-del-proyecto" tabindex="-1"><a class="header-anchor" href="#inicializacion-del-proyecto"><span>Inicialización del Proyecto</span></a></h2>
<h3 id="estructura-para-la-gestion-de-imagenese-dentro-de-la-documentacion" tabindex="-1"><a class="header-anchor" href="#estructura-para-la-gestion-de-imagenese-dentro-de-la-documentacion"><span>Estructura para la gestión de imágenese dentro de la documentación</span></a></h3>
<p>Las imágenes se almacenan en el árbol de carpetas dentro de <code v-pre>src/.vuepress/public/images</code> y se referencian en la documentación con la ruta relativa.<br>
Por ejemplo, para una imagen llamada <code v-pre>01_image_1.png</code> dentro del módulo <em><strong>Bases de Datos</strong></em>, se utilizaría:</p>
<div class="language-markdown line-numbers-mode" data-highlighter="shiki" data-ext="markdown" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-markdown"><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">![</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">Descripción de la imagen</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">]</span><span style="--shiki-light:#A626A4;--shiki-dark:#E06C75">(</span><span style="--shiki-light:#A626A4;--shiki-light-text-decoration:inherit;--shiki-dark:#C678DD;--shiki-dark-text-decoration:underline">/images/bbdd/01_image_1.png</span><span style="--shiki-light:#A626A4;--shiki-dark:#E06C75">)</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div></div></template>


