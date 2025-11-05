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
<h2 id="_2-tipos-de-vistas-en-django" tabindex="-1"><a class="header-anchor" href="#_2-tipos-de-vistas-en-django"><span>2. Tipos de vistas en Django</span></a></h2>
<p>Django ofrece dos grandes formas de definir vistas:</p>
<ul>
<li><strong>Function-Based Views (FBV)</strong> → funciones de Python que reciben una <code v-pre>HttpRequest</code> y devuelven una <code v-pre>HttpResponse</code>.</li>
<li><strong>Class-Based Views (CBV)</strong> → clases que heredan de vistas genéricas de Django y proporcionan un modo más estructurado y reutilizable de construir vistas.</li>
</ul>
<p><a href="https://docs.djangoproject.com/en/stable/topics/class-based-views/" target="_blank" rel="noopener noreferrer">Documentación oficial - Class-based views</a></p>
<h3 id="_2-2-vistas-genericas-y-el-atributo-model" tabindex="-1"><a class="header-anchor" href="#_2-2-vistas-genericas-y-el-atributo-model"><span>2.2. Vistas genéricas y el atributo <code v-pre>.model</code></span></a></h3>
<p>Cuando usamos vistas genéricas (por ejemplo, <code v-pre>ListView</code>, <code v-pre>DetailView</code>, <code v-pre>CreateView</code>, etc.), Django necesita saber <strong>qué modelo</strong> debe manejar.<br>
Esto se puede indicar de <strong>dos formas</strong> principales:</p>
<h4 id="forma-1-declarar-explicitamente-el-modelo-con-model" tabindex="-1"><a class="header-anchor" href="#forma-1-declarar-explicitamente-el-modelo-con-model"><span>Forma 1: Declarar explícitamente el modelo con <code v-pre>.model</code></span></a></h4>
<h5 id="ejemplo" tabindex="-1"><a class="header-anchor" href="#ejemplo"><span>Ejemplo:</span></a></h5>
<div class="language-python line-numbers-mode" data-highlighter="shiki" data-ext="python" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-python"><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">from</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> django.views.generic </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">import</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> ListView</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">from</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> .models </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">import</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> Socio</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">class</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> SocioListView</span><span style="--shiki-light:#C18401;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">ListView</span><span style="--shiki-light:#C18401;--shiki-dark:#ABB2BF">)</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">:</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    model </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> Socio</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    template_name </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> 'socios/socio_list.html'</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="que-hace-django-automaticamente" tabindex="-1"><a class="header-anchor" href="#que-hace-django-automaticamente"><span>Qué hace Django automáticamente:</span></a></h5>
<ul>
<li>Crea el <strong>queryset base</strong>: <code v-pre>Socio.objects.all()</code>.</li>
<li>Define el <strong>nombre del contexto</strong>: <code v-pre>socio_list</code> (o <code v-pre>object_list</code> si no se especifica otro).</li>
<li>Usa por defecto la plantilla: <code v-pre>socios/socio_list.html</code> (siguiendo la convención <code v-pre>&lt;app&gt;/&lt;model&gt;_list.html</code>).</li>
</ul>
<h5 id="cuando-usarlo" tabindex="-1"><a class="header-anchor" href="#cuando-usarlo"><span>Cuándo usarlo:</span></a></h5>
<ul>
<li>Cuando la vista trabaja directamente con un solo modelo.</li>
<li>Cuando no necesitas modificar el conjunto de datos devuelto.</li>
</ul>
<h5 id="referencias" tabindex="-1"><a class="header-anchor" href="#referencias"><span>Referencias:</span></a></h5>
<ul>
<li><a href="https://docs.djangoproject.com/en/stable/ref/class-based-views/generic-display/#listview" target="_blank" rel="noopener noreferrer">ListView - Django docs</a></li>
<li><a href="https://docs.djangoproject.com/en/stable/topics/class-based-views/generic-display/" target="_blank" rel="noopener noreferrer">Using generic class-based views</a></li>
</ul>
<h4 id="forma-2-no-declarar-model-y-definir-get-queryset" tabindex="-1"><a class="header-anchor" href="#forma-2-no-declarar-model-y-definir-get-queryset"><span>Forma 2: No declarar <code v-pre>.model</code> y definir <code v-pre>get_queryset()</code></span></a></h4>
<p>Si <strong>no defines</strong> el atributo <code v-pre>.model</code>, debes indicar manualmente <strong>qué datos</strong> va a mostrar la vista.<br>
Esto se hace sobreescribiendo el método <code v-pre>get_queryset()</code>.</p>
<h5 id="ejemplo-1" tabindex="-1"><a class="header-anchor" href="#ejemplo-1"><span>Ejemplo:</span></a></h5>
<div class="language-python line-numbers-mode" data-highlighter="shiki" data-ext="python" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-python"><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">from</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> django.views.generic </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">import</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> ListView</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">from</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> .models </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">import</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> Socio</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">class</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> SocioListView</span><span style="--shiki-light:#C18401;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">ListView</span><span style="--shiki-light:#C18401;--shiki-dark:#ABB2BF">)</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">:</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    template_name </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> 'socios/socio_list.html'</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    def</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> get_queryset</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#E5C07B;--shiki-dark-font-style:italic">self</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">):</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">        return</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> Socio.objects.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF">filter</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic">ciudad__nombre</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'Valdepeñas'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="que-ocurre-aqui" tabindex="-1"><a class="header-anchor" href="#que-ocurre-aqui"><span>Qué ocurre aquí:</span></a></h5>
<ul>
<li>Django no sabe qué modelo usar hasta que tú lo indicas.</li>
<li>Tú tienes control total sobre qué datos se muestran.</li>
<li>El nombre del contexto por defecto será <code v-pre>object_list</code>, a menos que definas <code v-pre>context_object_name</code>.</li>
</ul>
<h5 id="cuando-usarlo-1" tabindex="-1"><a class="header-anchor" href="#cuando-usarlo-1"><span>Cuándo usarlo:</span></a></h5>
<ul>
<li>Cuando necesitas filtrar, ordenar o combinar datos de varios modelos.</li>
<li>Cuando la vista no está asociada directamente a un único modelo.</li>
</ul>
<h5 id="referencias-1" tabindex="-1"><a class="header-anchor" href="#referencias-1"><span>Referencias:</span></a></h5>
<ul>
<li><a href="https://docs.djangoproject.com/en/stable/topics/class-based-views/generic-display/#overriding-the-default-queryset" target="_blank" rel="noopener noreferrer">Customizing the queryset</a></li>
<li><a href="https://docs.djangoproject.com/en/stable/topics/class-based-views/generic-display/#context-object-names" target="_blank" rel="noopener noreferrer">Context and object lists</a></li>
</ul>
<h3 id="_2-3-comparativa" tabindex="-1"><a class="header-anchor" href="#_2-3-comparativa"><span>2.3. Comparativa</span></a></h3>
<table>
<thead>
<tr>
<th>Característica</th>
<th>Con <code v-pre>.model</code></th>
<th>Sin <code v-pre>.model</code></th>
</tr>
</thead>
<tbody>
<tr>
<td>Definición del modelo</td>
<td>Se especifica con el atributo <code v-pre>model = Socio</code></td>
<td>No se especifica</td>
</tr>
<tr>
<td>Queryset</td>
<td>Automático (<code v-pre>Socio.objects.all()</code>)</td>
<td>Manual (definido en <code v-pre>get_queryset()</code>)</td>
</tr>
<tr>
<td>Contexto por defecto</td>
<td><code v-pre>&lt;model&gt;_list</code> o <code v-pre>object_list</code></td>
<td><code v-pre>object_list</code></td>
</tr>
<tr>
<td>Uso recomendado</td>
<td>Listados o detalles simples</td>
<td>Datos filtrados o combinados</td>
</tr>
<tr>
<td>Código necesario</td>
<td>Más simple</td>
<td>Más flexible pero más extenso</td>
</tr>
</tbody>
</table>
<h3 id="_2-4-ejemplo-en-el-proyecto-myong" tabindex="-1"><a class="header-anchor" href="#_2-4-ejemplo-en-el-proyecto-myong"><span>2.4. Ejemplo en el proyecto <em>myOng</em></span></a></h3>
<p>Supongamos que tienes tu modelo <code v-pre>Socio</code>:</p>
<div class="language-python line-numbers-mode" data-highlighter="shiki" data-ext="python" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-python"><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">class</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> Socio</span><span style="--shiki-light:#C18401;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">models</span><span style="--shiki-light:#C18401;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">Model</span><span style="--shiki-light:#C18401;--shiki-dark:#ABB2BF">)</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">:</span></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">    id</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2"> =</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> models.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF">UUIDField</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic">primary_key</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">True</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic">editable</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">False</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    nombre </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> models.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF">CharField</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic">max_length</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">100</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    apellidos </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> models.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF">CharField</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic">max_length</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">150</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    ciudad </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> models.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF">CharField</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic">max_length</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">100</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="a-vista-sencilla-con-model" tabindex="-1"><a class="header-anchor" href="#a-vista-sencilla-con-model"><span>a) Vista sencilla con <code v-pre>.model</code>:</span></a></h4>
<div class="language-python line-numbers-mode" data-highlighter="shiki" data-ext="python" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-python"><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">class</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> SocioListView</span><span style="--shiki-light:#C18401;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">ListView</span><span style="--shiki-light:#C18401;--shiki-dark:#ABB2BF">)</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">:</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    model </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> Socio</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    template_name </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> 'socios/socio_list.html'</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>Resultado: Muestra todos los socios.</p>
</blockquote>
<h4 id="b-vista-personalizada-sin-model" tabindex="-1"><a class="header-anchor" href="#b-vista-personalizada-sin-model"><span>b) Vista personalizada sin <code v-pre>.model</code>:</span></a></h4>
<div class="language-python line-numbers-mode" data-highlighter="shiki" data-ext="python" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-python"><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">class</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> SocioListView</span><span style="--shiki-light:#C18401;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">ListView</span><span style="--shiki-light:#C18401;--shiki-dark:#ABB2BF">)</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">:</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    template_name </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> 'socios/socio_list.html'</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    context_object_name </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> 'socios'</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    def</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> get_queryset</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#E5C07B;--shiki-dark-font-style:italic">self</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">):</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">        return</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> Socio.objects.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF">filter</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic">ciudad</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'Valdepeñas'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">).</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF">order_by</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'apellidos'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>Resultado: Muestra sólo los socios de Valdepeñas, ordenados por apellidos.</p>
</blockquote>
<h2 id="_3-pagina-de-lista-de-socios" tabindex="-1"><a class="header-anchor" href="#_3-pagina-de-lista-de-socios"><span>3. Página de lista de socios</span></a></h2>
<p>La página de lista mostrará todos los socios registrados en la asociación, con un enlace a su ficha individual (vista de detalle).</p>
<p>📍 URL: <code v-pre>/socios/</code><br>
Cada línea mostrará el <strong>nombre completo del socio</strong>, enlazado a su página de detalle.</p>
<h3 id="_3-1-mapeo-url" tabindex="-1"><a class="header-anchor" href="#_3-1-mapeo-url"><span>3.1. Mapeo URL</span></a></h3>
<p>Abre <code v-pre>myong/urls.py</code> y añade:</p>
<div class="language-python line-numbers-mode" data-highlighter="shiki" data-ext="python" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-python"><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">urlpatterns </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> [</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF">    path</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">''</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, views.index, </span><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic">name</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'index'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">),</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF">    path</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'socios/'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, views.SocioListView.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF">as_view</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(), </span><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic">name</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'socios'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">),</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">]</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Más info sobre <a href="https://docs.djangoproject.com/en/stable/ref/urls/#django.urls.path" target="_blank" rel="noopener noreferrer"><code v-pre>path()</code></a><br>
Esta función asocia una <strong>ruta</strong> con una <strong>vista</strong> y le da un <strong>nombre</strong> que podremos usar en las plantillas con <code v-pre>{% url 'socios' %}</code>.</p>
<h3 id="_3-2-vista-basada-en-clases" tabindex="-1"><a class="header-anchor" href="#_3-2-vista-basada-en-clases"><span>3.2. Vista (basada en clases)</span></a></h3>
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
<h3 id="_3-3-opcional-personalizando-la-vista" tabindex="-1"><a class="header-anchor" href="#_3-3-opcional-personalizando-la-vista"><span>3.3. Opcional: Personalizando la vista</span></a></h3>
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
<h3 id="_3-4-creando-la-plantilla" tabindex="-1"><a class="header-anchor" href="#_3-4-creando-la-plantilla"><span>3.4. Creando la plantilla</span></a></h3>
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
<h2 id="_4-pagina-de-detalle-de-un-socio" tabindex="-1"><a class="header-anchor" href="#_4-pagina-de-detalle-de-un-socio"><span>4. Página de detalle de un socio</span></a></h2>
<p>Esta vista mostrará la <strong>información completa</strong> de un socio:<br>
nombre, apellidos, dirección, país, fecha de alta, etc.</p>
<p>📍 URL: <code v-pre>/socio/&lt;uuid&gt;</code></p>
<h3 id="_4-1-mapeo-url" tabindex="-1"><a class="header-anchor" href="#_4-1-mapeo-url"><span>4.1. Mapeo URL</span></a></h3>
<p>Añade a <code v-pre>myong/urls.py</code>:</p>
<div class="language-python line-numbers-mode" data-highlighter="shiki" data-ext="python" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-python"><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF">path</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'socio/&#x3C;uuid:pk>'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, views.SocioDetailView.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF">as_view</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(), </span><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic">name</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'socio-detail'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">),</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>Aquí usamos <code v-pre>&lt;uuid:pk&gt;</code> porque todos los identificadores son UUIDs (según la configuración del proyecto).</p>
<p>📘 Más info: <a href="https://docs.djangoproject.com/en/stable/topics/http/urls/#path-converters" target="_blank" rel="noopener noreferrer">Path converters</a></p>
<h3 id="_4-2-vista-basada-en-clases" tabindex="-1"><a class="header-anchor" href="#_4-2-vista-basada-en-clases"><span>4.2. Vista basada en clases</span></a></h3>
<p>Edita <code v-pre>myong/views.py</code> y añade:</p>
<div class="language-python line-numbers-mode" data-highlighter="shiki" data-ext="python" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-python"><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">class</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> SocioDetailView</span><span style="--shiki-light:#C18401;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">generic</span><span style="--shiki-light:#C18401;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">DetailView</span><span style="--shiki-light:#C18401;--shiki-dark:#ABB2BF">)</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">:</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    model </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> Socio</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><p>Django buscará automáticamente la plantilla:<br>
<code v-pre>myong/templates/myong/socio_detail.html</code></p>
<p>📘 Ver: <a href="https://docs.djangoproject.com/en/stable/ref/class-based-views/generic-display/#detailview" target="_blank" rel="noopener noreferrer"><code v-pre>DetailView</code></a></p>
<h3 id="_4-3-creando-la-plantilla" tabindex="-1"><a class="header-anchor" href="#_4-3-creando-la-plantilla"><span>4.3 Creando la plantilla</span></a></h3>
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
<h3 id="_4-4-¿y-si-el-socio-no-existe" tabindex="-1"><a class="header-anchor" href="#_4-4-¿y-si-el-socio-no-existe"><span>4.4. ¿Y si el socio no existe?</span></a></h3>
<p>La vista genérica lanza automáticamente un <code v-pre>Http404</code> si el socio no se encuentra.<br>
Si lo hiciéramos como una vista tradicional:</p>
<div class="language-python line-numbers-mode" data-highlighter="shiki" data-ext="python" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-python"><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">from</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> django.shortcuts </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">import</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> render, get_object_or_404</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">from</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> .models </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">import</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> Socio</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">def</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> socio_detail_view</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#D19A66;--shiki-dark-font-style:italic">request</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#D19A66;--shiki-dark-font-style:italic"> pk</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">):</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    socio </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF"> get_object_or_404</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(Socio, </span><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic">pk</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">pk)</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    return</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF"> render</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(request, </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'myong/socio_detail.html'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, {</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'socio'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: socio})</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>📘 Ver: <a href="https://docs.djangoproject.com/en/stable/topics/http/shortcuts/#get-object-or-404" target="_blank" rel="noopener noreferrer"><code v-pre>get_object_or_404</code></a></p>
<h2 id="_5-actualizando-la-plantilla-base" tabindex="-1"><a class="header-anchor" href="#_5-actualizando-la-plantilla-base"><span>5. Actualizando la plantilla base</span></a></h2>
<p>Añade los enlaces en <code v-pre>base_generic.html</code>:</p>
<div class="language-django line-numbers-mode" data-highlighter="shiki" data-ext="django" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-django"><span class="line"><span>&#x3C;li>&#x3C;a href="{% url 'index' %}">Inicio&#x3C;/a>&#x3C;/li></span></span>
<span class="line"><span>&#x3C;li>&#x3C;a href="{% url 'socios' %}">Socios&#x3C;/a>&#x3C;/li></span></span>
<span class="line"><span>&#x3C;li>&#x3C;a href="#">Compras&#x3C;/a>&#x3C;/li></span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_6-tabla-de-recursos" tabindex="-1"><a class="header-anchor" href="#_6-tabla-de-recursos"><span>6. Tabla de recursos</span></a></h2>
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
<h2 id="_7-bibliografia-y-enlaces-a-documentacion" tabindex="-1"><a class="header-anchor" href="#_7-bibliografia-y-enlaces-a-documentacion"><span>7. Bibliografía y enlaces a documentación</span></a></h2>
</div></template>


