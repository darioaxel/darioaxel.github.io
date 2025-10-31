<template><div><h1 id="🐍-anexo-vi-vistas-en-django-para-la-aplicacion-myong" tabindex="-1"><a class="header-anchor" href="#🐍-anexo-vi-vistas-en-django-para-la-aplicacion-myong"><span>🐍 Anexo VI: Vistas en Django para la aplicación <em>myOng</em></span></a></h1>
<figure><img src="/images/under-construction.jpg" alt="En construcción" tabindex="0" loading="lazy"><figcaption>En construcción</figcaption></figure>
<h2 id="_1-introduccion" tabindex="-1"><a class="header-anchor" href="#_1-introduccion"><span>1. Introducción</span></a></h2>
<p>En este tutorial completaremos la primera versión de nuestro sitio web <strong>myOng</strong>, añadiendo <strong>páginas de lista y detalle</strong> para nuestros modelos principales: <strong>Socios</strong> y <strong>Compras</strong>.</p>
<p>El proceso será similar al que usamos al crear la página de inicio. De nuevo, necesitaremos:</p>
<ul>
<li>Definir <strong>mapas de URL</strong> (<code v-pre>urls.py</code>),</li>
<li>Crear las <strong>vistas</strong> (<code v-pre>views.py</code>), y</li>
<li>Diseñar las <strong>plantillas</strong> (<code v-pre>templates/</code>).</li>
</ul>
<p>La diferencia principal será que, en las <strong>vistas de detalle</strong>, aprenderemos a extraer información desde los patrones en las URLs y pasarla a la vista. Además, veremos un nuevo tipo de vista: las <strong>vistas genéricas basadas en clases</strong> (<em>Class-Based Generic Views</em>).</p>
<p>Estas vistas reducen mucho el código necesario, haciendo nuestras aplicaciones más limpias y fáciles de mantener.</p>
<h2 id="_2-pagina-de-lista-de-socios" tabindex="-1"><a class="header-anchor" href="#_2-pagina-de-lista-de-socios"><span>2. Página de lista de socios</span></a></h2>
<p>La página de lista mostrará todos los socios registrados en la asociación, con un enlace a su ficha individual (vista de detalle).</p>
<p>📍 URL: <code v-pre>/socios/</code><br>
Cada línea mostrará el <strong>nombre completo del socio</strong>, enlazado a su página de detalle.</p>
<h3 id="_2-1-mapeo-url" tabindex="-1"><a class="header-anchor" href="#_2-1-mapeo-url"><span>2.1. Mapeo URL</span></a></h3>
<p>Abre <code v-pre>myong/urls.py</code> y añade:</p>
<div class="language-python line-numbers-mode" data-highlighter="shiki" data-ext="python" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-python"><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">urlpatterns </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> [</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF">    path</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">''</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, views.index, </span><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic">name</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'index'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">),</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF">    path</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'socios/'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, views.SocioListView.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF">as_view</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(), </span><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic">name</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'socios'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">),</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">]</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>📘 Más info sobre <a href="https://docs.djangoproject.com/en/stable/ref/urls/#django.urls.path" target="_blank" rel="noopener noreferrer"><code v-pre>path()</code></a><br>
Esta función asocia una <strong>ruta</strong> con una <strong>vista</strong> y le da un <strong>nombre</strong> que podremos usar en las plantillas con <code v-pre>{% url 'socios' %}</code>.</p>
<h3 id="_2-2-vista-basada-en-clases" tabindex="-1"><a class="header-anchor" href="#_2-2-vista-basada-en-clases"><span>2.2. Vista (basada en clases)</span></a></h3>
<p>Podríamos escribir una vista funcional con <code v-pre>render()</code>, pero usaremos una <strong>vista genérica</strong>: <a href="https://docs.djangoproject.com/en/stable/ref/class-based-views/generic-display/#listview" target="_blank" rel="noopener noreferrer"><code v-pre>ListView</code></a>.</p>
<p>Edita <code v-pre>myong/views.py</code> y añade:</p>
<div class="language-python line-numbers-mode" data-highlighter="shiki" data-ext="python" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-python"><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">from</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> django.views </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">import</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> generic</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">from</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> .models </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">import</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> Socio</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">class</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> SocioListView</span><span style="--shiki-light:#C18401;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">generic</span><span style="--shiki-light:#C18401;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">ListView</span><span style="--shiki-light:#C18401;--shiki-dark:#ABB2BF">)</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">:</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    model </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> Socio</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>¡Listo!<br>
Django buscará automáticamente una plantilla llamada<br>
<code v-pre>myong/templates/myong/socio_list.html</code>.</p>
<p>Dentro de ella, los datos estarán disponibles como <code v-pre>object_list</code> o <code v-pre>socio_list</code>.</p>
<p>📘 Más info: <a href="https://docs.djangoproject.com/en/stable/ref/class-based-views/generic-display/" target="_blank" rel="noopener noreferrer">Generic display views</a></p>
<h3 id="_2-3-opcional-personalizando-la-vista" tabindex="-1"><a class="header-anchor" href="#_2-3-opcional-personalizando-la-vista"><span>2.3. Opcional: Personalizando la vista</span></a></h3>
<p>Podemos añadir atributos para modificar el comportamiento por defecto:</p>
<div class="language-python line-numbers-mode" data-highlighter="shiki" data-ext="python" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-python"><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">class</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> SocioListView</span><span style="--shiki-light:#C18401;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">generic</span><span style="--shiki-light:#C18401;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">ListView</span><span style="--shiki-light:#C18401;--shiki-dark:#ABB2BF">)</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">:</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    model </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> Socio</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    context_object_name </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> 'lista_socios'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  </span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    queryset </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> Socio.objects.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF">filter</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic">pais</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'España'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)  </span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    template_name </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> 'socios/lista_socios.html'</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>O incluso sobreescribir métodos como <code v-pre>get_queryset()</code>:</p>
<div class="language-python line-numbers-mode" data-highlighter="shiki" data-ext="python" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-python"><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">def</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> get_queryset</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#E5C07B;--shiki-dark-font-style:italic">self</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">):</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    return</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> Socio.objects.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF">filter</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic">fecha_alta__year</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">2024</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><p>Y <code v-pre>get_context_data()</code> para añadir variables adicionales:</p>
<div class="language-python line-numbers-mode" data-highlighter="shiki" data-ext="python" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-python"><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">def</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> get_context_data</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#E5C07B;--shiki-dark-font-style:italic">self</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> **</span><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#D19A66;--shiki-dark-font-style:italic">kwargs</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">):</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    context </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2"> super</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">().</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF">get_context_data</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(**kwargs)</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    context[</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'titulo'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">] </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> 'Socios activos'</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    return</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> context</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>📘 Referencia: <a href="https://docs.djangoproject.com/en/stable/topics/class-based-views/generic-display/#adding-extra-context" target="_blank" rel="noopener noreferrer">Customizing class-based views</a></p>
<h3 id="_2-4-creando-la-plantilla" tabindex="-1"><a class="header-anchor" href="#_2-4-creando-la-plantilla"><span>2.4. Creando la plantilla</span></a></h3>
<p>Crea el archivo:</p>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-"><span class="line"><span>myong/templates/myong/socio_list.html</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>Con el siguiente contenido:</p>
<div class="language-django line-numbers-mode" data-highlighter="shiki" data-ext="django" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-django"><span class="line"><span>{% extends "base_generic.html" %}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>{% block content %}</span></span>
<span class="line"><span>  &#x3C;h1>Lista de socios&#x3C;/h1></span></span>
<span class="line"><span></span></span>
<span class="line"><span>  {% if socio_list %}</span></span>
<span class="line"><span>  &#x3C;ul></span></span>
<span class="line"><span>    {% for socio in socio_list %}</span></span>
<span class="line"><span>      &#x3C;li></span></span>
<span class="line"><span>        &#x3C;a href="{{ socio.get_absolute_url }}">{{ socio.nombre }} {{ socio.apellidos }}&#x3C;/a></span></span>
<span class="line"><span>      &#x3C;/li></span></span>
<span class="line"><span>    {% endfor %}</span></span>
<span class="line"><span>  &#x3C;/ul></span></span>
<span class="line"><span>  {% else %}</span></span>
<span class="line"><span>    &#x3C;p>No hay socios registrados.&#x3C;/p></span></span>
<span class="line"><span>  {% endif %}</span></span>
<span class="line"><span>{% endblock %}</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>En esta plantilla usamos las etiquetas <code v-pre>{% if %}</code> y <code v-pre>{% for %}</code></p>
</blockquote>
<p>📘 Ver: <a href="https://docs.djangoproject.com/en/stable/ref/templates/builtins/#for" target="_blank" rel="noopener noreferrer">Template language — for</a> y <a href="https://docs.djangoproject.com/en/stable/ref/templates/builtins/#if" target="_blank" rel="noopener noreferrer">if</a></p>
<h2 id="_3-pagina-de-detalle-de-un-socio" tabindex="-1"><a class="header-anchor" href="#_3-pagina-de-detalle-de-un-socio"><span>3. Página de detalle de un socio</span></a></h2>
<p>Esta vista mostrará la <strong>información completa</strong> de un socio:<br>
nombre, apellidos, dirección, país, fecha de alta, etc.</p>
<p>📍 URL: <code v-pre>/socio/&lt;uuid&gt;</code></p>
<h3 id="_3-1-mapeo-url" tabindex="-1"><a class="header-anchor" href="#_3-1-mapeo-url"><span>3.1. Mapeo URL</span></a></h3>
<p>Añade a <code v-pre>myong/urls.py</code>:</p>
<div class="language-python line-numbers-mode" data-highlighter="shiki" data-ext="python" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-python"><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF">path</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'socio/&#x3C;uuid:pk>'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, views.SocioDetailView.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF">as_view</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(), </span><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic">name</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'socio-detail'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">),</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>Aquí usamos <code v-pre>&lt;uuid:pk&gt;</code> porque todos los identificadores son UUIDs (según la configuración del proyecto).</p>
<p>📘 Más info: <a href="https://docs.djangoproject.com/en/stable/topics/http/urls/#path-converters" target="_blank" rel="noopener noreferrer">Path converters</a></p>
<hr>
<h3 id="_3-2-vista-basada-en-clases" tabindex="-1"><a class="header-anchor" href="#_3-2-vista-basada-en-clases"><span>3.2. Vista basada en clases</span></a></h3>
<p>Edita <code v-pre>myong/views.py</code> y añade:</p>
<div class="language-python line-numbers-mode" data-highlighter="shiki" data-ext="python" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-python"><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">class</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> SocioDetailView</span><span style="--shiki-light:#C18401;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">generic</span><span style="--shiki-light:#C18401;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">DetailView</span><span style="--shiki-light:#C18401;--shiki-dark:#ABB2BF">)</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">:</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    model </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> Socio</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><p>Django buscará automáticamente la plantilla:<br>
<code v-pre>myong/templates/myong/socio_detail.html</code></p>
<p>📘 Ver: <a href="https://docs.djangoproject.com/en/stable/ref/class-based-views/generic-display/#detailview" target="_blank" rel="noopener noreferrer"><code v-pre>DetailView</code></a></p>
<h3 id="_3-3-creando-la-plantilla" tabindex="-1"><a class="header-anchor" href="#_3-3-creando-la-plantilla"><span>3.3 Creando la plantilla</span></a></h3>
<p>Crea el archivo:</p>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-"><span class="line"><span>myong/templates/myong/socio_detail.html</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>Y copia:</p>
<div class="language-django line-numbers-mode" data-highlighter="shiki" data-ext="django" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-django"><span class="line"><span>{% extends "base_generic.html" %}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>{% block content %}</span></span>
<span class="line"><span>  &#x3C;h1>{{ socio.nombre }} {{ socio.apellidos }}&#x3C;/h1></span></span>
<span class="line"><span></span></span>
<span class="line"><span>  &#x3C;p>&#x3C;strong>DNI/NIE:&#x3C;/strong> {{ socio.dni }}&#x3C;/p></span></span>
<span class="line"><span>  &#x3C;p>&#x3C;strong>Fecha de nacimiento:&#x3C;/strong> {{ socio.fecha_nacimiento }}&#x3C;/p></span></span>
<span class="line"><span>  &#x3C;p>&#x3C;strong>Dirección:&#x3C;/strong> {{ socio.direccion }}&#x3C;/p></span></span>
<span class="line"><span>  &#x3C;p>&#x3C;strong>Ciudad:&#x3C;/strong> {{ socio.ciudad }}&#x3C;/p></span></span>
<span class="line"><span>  &#x3C;p>&#x3C;strong>Provincia:&#x3C;/strong> {{ socio.provincia }}&#x3C;/p></span></span>
<span class="line"><span>  &#x3C;p>&#x3C;strong>País:&#x3C;/strong> {{ socio.pais }}&#x3C;/p></span></span>
<span class="line"><span>  &#x3C;p>&#x3C;strong>Fecha de alta:&#x3C;/strong> {{ socio.fecha_alta }}&#x3C;/p></span></span>
<span class="line"><span></span></span>
<span class="line"><span>  {% if socio.iban %}</span></span>
<span class="line"><span>    &#x3C;p>&#x3C;strong>IBAN:&#x3C;/strong> {{ socio.iban }}&#x3C;/p></span></span>
<span class="line"><span>  {% else %}</span></span>
<span class="line"><span>    &#x3C;p>&#x3C;em>Pago mediante transferencia.&#x3C;/em>&#x3C;/p></span></span>
<span class="line"><span>  {% endif %}</span></span>
<span class="line"><span>{% endblock %}</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>📘 Ver: <a href="https://docs.djangoproject.com/en/stable/ref/templates/language/#variables" target="_blank" rel="noopener noreferrer">Variables en plantillas</a></p>
<h3 id="_3-4-¿y-si-el-socio-no-existe" tabindex="-1"><a class="header-anchor" href="#_3-4-¿y-si-el-socio-no-existe"><span>3.4. ¿Y si el socio no existe?</span></a></h3>
<p>La vista genérica lanza automáticamente un <code v-pre>Http404</code> si el socio no se encuentra.<br>
Si lo hiciéramos como una vista tradicional:</p>
<div class="language-python line-numbers-mode" data-highlighter="shiki" data-ext="python" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-python"><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">from</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> django.shortcuts </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">import</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> render, get_object_or_404</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">from</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> .models </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">import</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> Socio</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">def</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> socio_detail_view</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#D19A66;--shiki-dark-font-style:italic">request</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#D19A66;--shiki-dark-font-style:italic"> pk</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">):</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    socio </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF"> get_object_or_404</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(Socio, </span><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic">pk</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">pk)</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    return</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF"> render</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(request, </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'myong/socio_detail.html'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, {</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'socio'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: socio})</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>📘 Ver: <a href="https://docs.djangoproject.com/en/stable/topics/http/shortcuts/#get-object-or-404" target="_blank" rel="noopener noreferrer"><code v-pre>get_object_or_404</code></a></p>
<hr>
<h2 id="_4-actualizando-la-plantilla-base" tabindex="-1"><a class="header-anchor" href="#_4-actualizando-la-plantilla-base"><span>4. Actualizando la plantilla base</span></a></h2>
<p>Añade los enlaces en <code v-pre>base_generic.html</code>:</p>
<div class="language-django line-numbers-mode" data-highlighter="shiki" data-ext="django" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-django"><span class="line"><span>&#x3C;li>&#x3C;a href="{% url 'index' %}">Inicio&#x3C;/a>&#x3C;/li></span></span>
<span class="line"><span>&#x3C;li>&#x3C;a href="{% url 'socios' %}">Socios&#x3C;/a>&#x3C;/li></span></span>
<span class="line"><span>&#x3C;li>&#x3C;a href="#">Compras&#x3C;/a>&#x3C;/li></span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>--</p>
<h2 id="_5-tabla-de-recursos" tabindex="-1"><a class="header-anchor" href="#_5-tabla-de-recursos"><span>5. Tabla de recursos</span></a></h2>
<table>
<thead>
<tr>
<th>Elemento</th>
<th>Archivo</th>
<th>Descripción</th>
</tr>
</thead>
<tbody>
<tr>
<td>URL lista de socios</td>
<td><code v-pre>myong/urls.py</code></td>
<td><code v-pre>/socios/</code></td>
</tr>
<tr>
<td>Vista lista de socios</td>
<td><code v-pre>SocioListView</code></td>
<td>Lista todos los socios</td>
</tr>
<tr>
<td>Plantilla lista</td>
<td><code v-pre>socio_list.html</code></td>
<td>Muestra la lista</td>
</tr>
<tr>
<td>URL detalle socio</td>
<td><code v-pre>myong/urls.py</code></td>
<td><code v-pre>/socio/&lt;uuid&gt;</code></td>
</tr>
<tr>
<td>Vista detalle</td>
<td><code v-pre>SocioDetailView</code></td>
<td>Muestra los datos de un socio</td>
</tr>
<tr>
<td>Plantilla detalle</td>
<td><code v-pre>socio_detail.html</code></td>
<td>Ficha individual del socio</td>
</tr>
</tbody>
</table>
<h2 id="_6-bibliografia-y-enlaces-a-documentacion" tabindex="-1"><a class="header-anchor" href="#_6-bibliografia-y-enlaces-a-documentacion"><span>6. Bibliografía y enlaces a documentación</span></a></h2>
</div></template>


