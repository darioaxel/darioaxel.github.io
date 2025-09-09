<template><div><h1 id="ut01-arquitecturas-web" tabindex="-1"><a class="header-anchor" href="#ut01-arquitecturas-web"><span>UT01 Arquitecturas Web</span></a></h1>
<div class="hint-container info">
<p class="hint-container-title">¿Qué vamos a aprender en esta unidad?</p>
<p>En esta unidad vamos a aprender los conceptos básicos de las arquitecturas web. Para ello empezaremos analizando los principios SOLID, los patrones de diseño y las arquitecturas de software más comunes.<br>
También veremos cómo se relacionan con el desarrollo de aplicaciones web del lado del servidor (backend) y cómo se utilizan en la práctica.</p>
</div>
<h2 id="introduccion" tabindex="-1"><a class="header-anchor" href="#introduccion"><span>Introducción</span></a></h2>
<p>En el mundo de la informática establecemos que una <em><strong>página web estática</strong></em> es aquella cuyo contenido no cambia en función de la interacción del usuario o del contexto. Estas páginas están compuestas principalmente por archivos HTML y CSS, que se almacenan en un servidor y se envían tal cual al navegador del usuario cuando éste las solicita. El servidor simplemente &quot;sirve&quot; estos archivos, sin realizar ningún procesamiento adicional.</p>
<p>Este modelo es el más sencillo que se puede establecer para una página web. Sin embargo, las aplicaciones web modernas requieren una mayor interactividad y personalización, lo que nos lleva a la necesidad de páginas web dinámicas.<br>
Estas páginas pueden cambiar su contenido en función de la interacción del usuario, datos de bases de datos o servicios externos.</p>
<p>Las aplicaciones web modernas se basan en la arquitectura cliente-servidor. En este modelo, uno o varios clientes (normalmente navegadores web) realizan peticiones al servidor, que responde enviando los recursos solicitados, tal y como podemos ver en el siguiente esquema.</p>
<figure><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Client-server-model.svg/1920px-Client-server-model.svg.png" alt="Arquitectura Cliente-Servidor" tabindex="0" loading="lazy"><figcaption>Arquitectura Cliente-Servidor</figcaption></figure>
<p>El cliente (navegador) realiza peticiones al servidor, habitualmente usando el protocolo HTTP (puertos 80 o 443 para HTTPS). El servidor procesa la solicitud y responde con el contenido adecuado.</p>
<p>Existen dos formas principales de generar páginas dinámicas:</p>
<ul>
<li><strong>Procesamiento en el servidor:</strong> El servidor genera el contenido dinámico utilizando lenguajes como PHP, Python, Ruby, Java, .NET, etc., y puede acceder a bases de datos o servicios externos para construir la respuesta.</li>
<li><strong>Consumo de servicios externos desde el cliente:</strong> El navegador ejecuta JavaScript para solicitar datos a servicios REST de terceros y actualizar la página dinámicamente, sin necesidad de recargarla por completo.</li>
</ul>
<h2 id="arquitecturas-web-capas-fisicas-y-logicas" tabindex="-1"><a class="header-anchor" href="#arquitecturas-web-capas-fisicas-y-logicas"><span>Arquitecturas Web: Capas Físicas y Lógicas</span></a></h2>
<p>Las arquitecturas web no son tan sencillas como un simple servidor y una serie de clientes. Mediante una estructura de capas o layers, se intenta minorar la complejidad que una aplicación real tiene de forma que sean mantenibles, comprensibles por los desarrolladores y testeables.<br>
En realidad, las aplicaciones web modernas suelen estar organizadas en capas físicas y lógicas que facilitan su desarrollo, mantenimiento y escalabilidad.</p>
<h3 id="capas-fisicas-tiers" tabindex="-1"><a class="header-anchor" href="#capas-fisicas-tiers"><span>Capas Físicas (Tiers)</span></a></h3>
<p>Una capa física o tier corresponde a un componente hardware separado dentro de la arquitectura. Por ejemplo, en una arquitectura de tres capas físicas (3-tier) se distinguen:<br>
Servidor web</p>
<p>Servidor de aplicaciones</p>
<p>Servidor de base de datos</p>
<p>En entornos modernos, es común utilizar clusters de servidores en una misma capa para lograr tolerancia a fallos y escalabilidad.</p>
<h3 id="capas-logicas-layers" tabindex="-1"><a class="header-anchor" href="#capas-logicas-layers"><span>Capas Lógicas (Layers)</span></a></h3>
<p>Las capas lógicas organizan el código según su función:</p>
<p>Presentación: Interfaz de usuario.</p>
<p>Negocio/Aplicación: Lógica de negocio y procesamiento.</p>
<p>Datos/Persistencia: Gestión y almacenamiento de datos.</p>
<p>Cada capa puede implementarse con diferentes tecnologías y lenguajes, permitiendo flexibilidad y modularidad.</p>
<h3 id="modelo-mvc-modelo-vista-controlador" tabindex="-1"><a class="header-anchor" href="#modelo-mvc-modelo-vista-controlador"><span>Modelo MVC (Modelo-Vista-Controlador)</span></a></h3>
<p>El patrón MVC (Model-View-Controller) es una arquitectura que separa la lógica de negocio, la gestión de datos y la presentación visual:</p>
<ul>
<li>
<p><em><strong>Modelo:</strong></em> Gestiona los datos y su acceso, normalmente conectado a una base de datos.</p>
</li>
<li>
<p><em><strong>Controlador:</strong></em> Procesa las acciones del usuario y coordina la interacción entre el modelo y la vista.</p>
</li>
<li>
<p><em><strong>Vista:</strong></em> Presenta la información al usuario y recoge sus interacciones.</p>
</li>
</ul>
<p>Esta separación facilita la organización, el mantenimiento y la reutilización del código.</p>
<h2 id="patrones-y-tipos-de-arquitecturas-en-servidor" tabindex="-1"><a class="header-anchor" href="#patrones-y-tipos-de-arquitecturas-en-servidor"><span>Patrones y tipos de arquitecturas en Servidor.</span></a></h2>
<h3 id="principios-solid" tabindex="-1"><a class="header-anchor" href="#principios-solid"><span>Principios SOLID</span></a></h3>
<p>Los cinco principios SOLID son un conjunto de reglas y mejores prácticas para el diseño de software orientado a objetos.</p>
<p><a href="https://www.youtube.com/watch?v=E_mSr-VFd3g" target="_blank" rel="noopener noreferrer">Video SOLID</a></p>
<figure><img src="/images/dwes/solid-principles.jpg" alt="Solid" tabindex="0" loading="lazy"><figcaption>Solid</figcaption></figure>
<figure><img src="/images/dwes/solid.gif" alt="Solid2" tabindex="0" loading="lazy"><figcaption>Solid2</figcaption></figure>
<p>Los principios son:</p>
<ol>
<li>
<p><strong>Principio de responsabilidad única (Single Responsibility Principle, SRP)</strong>: Una clase debe tener una, y solo una, razón para cambiar. Esto significa que una clase debe tener solo una tarea o responsabilidad.</p>
<div class="language-java line-numbers-mode" data-highlighter="shiki" data-ext="java" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-java"><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">public</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> class</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> Informe</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> {</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    public</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> void</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> generarInforme</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">()</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> {</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">        // lógica para generar el informe</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    }</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">public</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> class</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> ImprimirInforme</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> {</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    public</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> void</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> imprimir</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">Informe</span><span style="--shiki-light:#383A42;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic"> informe</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> {</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">        // lógica para imprimir el informe</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    }</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">}</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>En este ejemplo, la clase <code v-pre>Informe</code> solo tiene la responsabilidad de generar el informe, mientras que la clase <code v-pre>ImprimirInforme</code> tiene la responsabilidad de imprimir el informe.</p>
</li>
<li>
<p><strong>Principio abierto/cerrado (Open/Closed Principle, OCP)</strong>: Las entidades de software (clases, módulos, funciones, etc.) deben estar abiertas para la extensión, pero cerradas para la modificación.</p>
<div class="language-java line-numbers-mode" data-highlighter="shiki" data-ext="java" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-java"><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">public</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> abstract</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> class</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> Forma</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> {</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    abstract</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> void</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> dibujar</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">();</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">public</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> class</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> Circulo</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> extends</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> Forma</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> {</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    void</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> dibujar</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">()</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> {</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">        // lógica para dibujar un círculo</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    }</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">public</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> class</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> Cuadrado</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> extends</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> Forma</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> {</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    void</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> dibujar</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">()</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> {</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">        // lógica para dibujar un cuadrado</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    }</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">}</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>En este ejemplo, la clase <code v-pre>Forma</code> está abierta para la extensión (se puede crear una nueva forma como <code v-pre>Circulo</code> o <code v-pre>Cuadrado</code>), pero cerrada para la modificación (no necesitamos cambiar la clase <code v-pre>Forma</code> para añadir una nueva forma).</p>
</li>
<li>
<p><strong>Principio de sustitución de Liskov (Liskov Substitution Principle, LSP)</strong>: Los objetos de una superclase deben poder ser reemplazados por objetos de una subclase sin afectar la corrección del programa.</p>
<div class="language-java line-numbers-mode" data-highlighter="shiki" data-ext="java" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-java"><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">public</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> class</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> Pajaro</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> {</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    public</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> void</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> volar</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">()</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> {</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">        // lógica para volar</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    }</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">public</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> class</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> Pinguino</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> extends</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> Pajaro</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> {</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    @</span><span style="--shiki-light:#A626A4;--shiki-dark:#E5C07B">Override</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    public</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> void</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> volar</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">()</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> {</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">        throw</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> new</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> UnsupportedOperationException</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">();</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    }</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">}</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Este es un ejemplo de violación del principio de sustitución de Liskov, ya que <code v-pre>Pinguino</code> es una subclase de <code v-pre>Pajaro</code>, pero no puede volar. Una solución sería tener una clase separada para pájaros que pueden volar.</p>
</li>
<li>
<p><strong>Principio de segregación de interfaces (Interface Segregation Principle, ISP)</strong>: Los clientes no deben ser forzados a depender de interfaces que no usan.</p>
<div class="language-java line-numbers-mode" data-highlighter="shiki" data-ext="java" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-java"><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">public</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> interface</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> Pajaro</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> {</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    void</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> comer</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">();</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">public</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> interface</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> PajaroVolador</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> {</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    void</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> volar</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">();</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">public</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> class</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> Pinguino</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> implements</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> Pajaro</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> {</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    public</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> void</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> comer</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">()</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> {</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">        // lógica para comer</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    }</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">public</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> class</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> Paloma</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> implements</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> Pajaro</span><span style="--shiki-light:#C18401;--shiki-dark:#ABB2BF">,</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> PajaroVolador</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> {</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    public</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> void</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> comer</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">()</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> {</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">        // lógica para comer</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    public</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> void</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> volar</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">()</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> {</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">        // lógica para volar</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    }</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">}</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>En este ejemplo, <code v-pre>Pinguino</code> no está forzado a implementar un método <code v-pre>volar()</code> que no necesita, ya que hemos segregado las responsabilidades en dos interfaces diferentes.</p>
</li>
<li>
<p><strong>Principio de inversión de dependencias (Dependency Inversion Principle, DIP)</strong>: Los módulos de alto nivel no deben depender de los módulos de bajo nivel. Ambos deben depender de abstracciones.</p>
<div class="language-java line-numbers-mode" data-highlighter="shiki" data-ext="java" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-java"><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">public</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> interface</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> BaseDeDatos</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> {</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    void</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> guardar</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">String</span><span style="--shiki-light:#383A42;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic"> datos</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">);</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">public</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> class</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> MySqlDB</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> implements</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> BaseDeDatos</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> {</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    public</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> void</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> guardar</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">String</span><span style="--shiki-light:#383A42;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic"> datos</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> {</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">        // lógica para guardar datos en MySQL</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    }</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">public</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> class</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> Aplicacion</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> {</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    private</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> BaseDeDatos</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> db</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    public</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> Aplicacion</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">BaseDeDatos</span><span style="--shiki-light:#383A42;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic"> db</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> {</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">        this</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">db</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2"> =</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> db;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    public</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> void</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> guardarDatos</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">String</span><span style="--shiki-light:#383A42;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic"> datos</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> {</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">        db</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">guardar</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(datos);</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    }</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">}</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>En este ejemplo, la clase <code v-pre>Aplicacion</code> no depende directamente de la clase <code v-pre>MySqlDB</code>. En lugar de eso, ambos dependen de la abstracción <code v-pre>BaseDeDatos</code>. De esta manera, si queremos cambiar la base de datos en el futuro, solo necesitamos crear una nueva implementación de <code v-pre>BaseDeDatos</code>, sin tener que cambiar la clase <code v-pre>Aplicacion</code>.</p>
</li>
</ol>
<div class="hint-container tip">
<p class="hint-container-title"><strong>Para saber más..</strong></p>
<p>Los principios <em><strong>SOLID</strong></em> fueron introducidos por el famoso científico informático Robert J. Martin (también conocido como Uncle Bob) en su artículo de 2000. Sin embargo, el acrónimo SOLID fue introducido posteriormente por Michael Feathers.</p>
<p><a href="http://cleancoder.com/" target="_blank" rel="noopener noreferrer">Robert C. Martin</a> publicó en el año 2000 un ensayo titulado “Principios de diseño y patrones de diseño”, en el que sentó las bases de lo que más tarde se conocería como los principios SOLID. <a href="https://web.archive.org/web/20160304000000/http://www.objectmentor.com/resources/articles/PrinciplesAndDesign.pdf" target="_blank" rel="noopener noreferrer">Documento</a>.</p>
<p>En ese artículo no se mencionaba el acrónimo SOLID. Fue <em><strong>Michael Feathers</strong></em>, en 2004, quien acuñó el término &quot;SOLID&quot; para referirse a estos cinco principios fundamentales de la programación orientada a objetos, basándose en el trabajo de Martin.<br>
Robert C. Martin también publicó uno de los libros de cabecera que casi todo programador debería leer una vez en la vida:<a href="https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0136083239" target="_blank" rel="noopener noreferrer"> Clean Code</a>.</p>
</div>
<h3 id="patrones-de-diseno" tabindex="-1"><a class="header-anchor" href="#patrones-de-diseno"><span>Patrones de Diseño</span></a></h3>
<p>Un patrón de diseño de software es una solución generalmente aplicable a un problema común en el diseño de software. Los patrones de diseño proporcionan un enfoque probado y estructurado para resolver problemas recurrentes y mejorar la calidad y flexibilidad del código.</p>
<p>Existen varios tipos de patrones de diseño de software, entre ellos:</p>
<ol>
<li>
<p><strong>Patrones de creación:</strong> Estos patrones se centran en la creación de objetos de manera flexible y eficiente. Algunos ejemplos son: Singleton, Factory Method, Abstract Factory y Builder.</p>
</li>
<li>
<p><strong>Patrones estructurales:</strong> Estos patrones se ocupan de la composición y estructura de las clases y objetos. Algunos ejemplos son: Adapter, Decorator, Composite y Proxy.</p>
</li>
<li>
<p><strong>Patrones de comportamiento:</strong> Estos patrones se centran en la interacción y comunicación entre objetos. Algunos ejemplos son: Observer, Strategy, Template Method y Command.</p>
</li>
<li>
<p><strong>Patrones arquitectónicos:</strong> Estos patrones abordan la estructura y organización de sistemas de software a gran escala. Algunos ejemplos son: Modelo-Vista-Controlador (MVC), Capas y Microservicios.</p>
</li>
<li>
<p><strong>Patrones de concurrencia:</strong> Estos patrones se utilizan para gestionar la concurrencia y la comunicación entre hilos. Algunos ejemplos son: Mutex, Semaphore, Productor-Consumidor y Monitor.</p>
</li>
</ol>
<p>Estos son solo algunos ejemplos de patrones de diseño de software. Cada patrón tiene un propósito específico y puede aplicarse en diferentes contextos para resolver problemas particulares en el diseño y la implementación de software.</p>
<p>Puedes aprenderlos en <a href="https://refactoring.guru/es/design-patterns" target="_blank" rel="noopener noreferrer">Refactoring Guru</a> y <a href="https://github.com/joseluisgs/EntornosDesarrollo-08-2022-2023" target="_blank" rel="noopener noreferrer">Entornos de Desarrollo 8</a>.</p>
<div class="hint-container tip">
<p class="hint-container-title"><strong>Para saber más..</strong></p>
<p>Los patrones de diseño fueron popularizados por el libro &quot;Design Patterns: Elements of Reusable Object-Oriented Software&quot; publicado en 1994 por Erich Gamma, Richard Helm, Ralph Johnson y John Vlissides, conocidos como la &quot;Gang of Four&quot; (GoF).</p>
</div>
<h3 id="arquitecturas-software" tabindex="-1"><a class="header-anchor" href="#arquitecturas-software"><span>Arquitecturas Software</span></a></h3>
<p>Una arquitectura de software se refiere a la estructura organizativa fundamental de un sistema de software. Define cómo se dividen, combinan y coordinan los componentes del software para lograr los objetivos del sistema. En el desarrollo de aplicaciones web del lado del servidor (backend), existen varias arquitecturas de software principales:</p>
<figure><img src="/images/dwes/arquitecturas.jpeg" alt="Arquitect" tabindex="0" loading="lazy"><figcaption>Arquitect</figcaption></figure>
<ol>
<li>
<p><strong>Arquitectura monolítica</strong>: Es un enfoque tradicional en el que todos los componentes de una aplicación web se agrupan en un solo bloque. La lógica de negocio, la interfaz de usuario y la capa de acceso a datos se encuentran dentro de la misma aplicación. Es fácil de desarrollar y desplegar, pero puede volverse complejo y difícil de mantener a medida que la aplicación crece. Características:</p>
<ul>
<li>Todos los componentes se ejecutan en el mismo proceso y comparten recursos.</li>
<li>La escalabilidad puede ser un desafío, ya que la aplicación se ejecuta en una sola instancia.</li>
<li>Los cambios en una parte de la aplicación pueden afectar a otras partes.</li>
</ul>
</li>
<li>
<p><strong>Arquitectura de capas</strong>: Esta arquitectura divide la aplicación en diferentes capas lógicas, donde cada capa tiene una responsabilidad específica. Las capas típicas incluyen la capa de presentación, la capa de lógica de negocio y la capa de acceso a datos. Cada capa se comunica con la capa adyacente a través de interfaces bien definidas. Características:</p>
<ul>
<li>Mejora la modularidad y la reutilización del código.</li>
<li>Permite cambios en una capa sin afectar a las demás.</li>
<li>Facilita la escalabilidad y el mantenimiento del sistema.</li>
</ul>
</li>
<li>
<p><strong>Arquitectura de servicios web</strong>: Esta arquitectura se basa en la comunicación entre diferentes servicios a través de protocolos web estándar, como HTTP. Cada servicio es una unidad independiente que se puede desarrollar, desplegar y escalar de forma independiente. Los servicios se comunican entre sí para cumplir con los requisitos de la aplicación. Características:</p>
<ul>
<li>Favorece la modularidad y la independencia de los servicios.</li>
<li>Permite la integración de diferentes tecnologías y lenguajes de programación.</li>
<li>Facilita la escalabilidad horizontal, ya que los servicios se pueden replicar y distribuir en múltiples servidores.</li>
</ul>
</li>
<li>
<p><strong>Arquitectura basada en microservicios</strong>: Es una evolución de la arquitectura de servicios web, donde los servicios se dividen en componentes aún más pequeños y autónomos llamados microservicios. Cada microservicio se enfoca en una tarea específica y se comunica con otros microservicios a través de protocolos ligeros. Características:</p>
<ul>
<li>Cada microservicio se puede desarrollar, desplegar y escalar de forma independiente.</li>
<li>Mejora la flexibilidad y la agilidad del desarrollo.</li>
<li>Permite la adopción de diferentes tecnologías y enfoques dentro de cada microservicio.</li>
</ul>
</li>
</ol>
<p>Estas son solo algunas de las arquitecturas de software más comunes en el desarrollo de aplicaciones web backend. Cada una tiene sus ventajas y desafíos, y la elección de la arquitectura adecuada depende de los requisitos y objetivos del proyecto.</p>
<h3 id="ejemplo-de-arquitectura-netflix" tabindex="-1"><a class="header-anchor" href="#ejemplo-de-arquitectura-netflix"><span>Ejemplo de arquitectura: Netflix</span></a></h3>
<p>La arquitectura de backend de Netflix es conocida por ser altamente escalable y resiliente, diseñada para manejar grandes volúmenes de tráfico y garantizar la disponibilidad y el rendimiento de sus servicios. Netflix adopta una arquitectura basada en microservicios, donde las diferentes funcionalidades se dividen en servicios independientes. Cada microservicio se enfoca en una tarea específica y se comunica con otros servicios a través de interfaces bien definidas. Esto permite una mayor flexibilidad, escalabilidad y mantenimiento de los servicios individuales.</p>
<figure><img src="/images/dwes/netflix.gif" alt="netflix" tabindex="0" loading="lazy"><figcaption>netflix</figcaption></figure>
<h3 id="api-web" tabindex="-1"><a class="header-anchor" href="#api-web"><span>API Web</span></a></h3>
<p>Una API web (<em>Application Programming Interface</em>) es un conjunto de reglas y protocolos que permite a diferentes aplicaciones o sistemas comunicarse y compartir datos entre sí a través de la web. Proporciona un conjunto de funciones y métodos que permiten a los desarrolladores acceder y manipular los datos de una aplicación o servicio específico.</p>
<p>En el contexto de las aplicaciones web, una API web permite que el backend de una aplicación exponga ciertas funcionalidades y datos a otras aplicaciones o servicios, como aplicaciones móviles, sitios web o sistemas externos. Esto permite la integración y la creación de aplicaciones más complejas y robustas.</p>
<p>Las API web se basan en protocolos estándar de la web, como HTTP (Hypertext Transfer Protocol), y utilizan formatos de intercambio de datos como JSON (JavaScript Object Notation) o XML (eXtensible Markup Language) para enviar y recibir información.</p>
<p>Algunos ejemplos comunes de API web incluyen:</p>
<ol>
<li>
<p><strong>API RESTful:</strong> Es un estilo arquitectónico que utiliza los métodos HTTP (GET, POST, PUT, DELETE, etc.) para acceder y manipular recursos en un sistema. Se basa en la representación de recursos a través de URLs (Uniform Resource Locators) y utiliza formatos como JSON para el intercambio de datos.</p>
</li>
<li>
<p><strong>API GraphQL:</strong> Es un lenguaje de consulta y una especificación para las APIs web. Permite a los clientes solicitar y recibir solo los datos necesarios, lo que mejora la eficiencia y reduce la cantidad de datos transferidos.</p>
</li>
<li>
<p><strong>API Websocket:</strong> Utiliza el protocolo de comunicación de WebSockets para permitir una comunicación bidireccional y en tiempo real entre un cliente y un servidor a través de una conexión persistente. A diferencia de las API tradicionales basadas en HTTP, que siguen un modelo de solicitud-respuesta, las API con WebSockets establecen una conexión continua entre el cliente y el servidor, lo que permite una comunicación más eficiente y en tiempo real.</p>
</li>
</ol>
<div class="hint-container important">
<p class="hint-container-title">Importante</p>
<p>Las API web son fundamentales en el desarrollo de aplicaciones modernas, ya que permiten la integración de diferentes servicios y la creación de aplicaciones más flexibles y escalables.</p>
</div>
<figure><img src="/images/dwes/apis.gif" alt="apis" tabindex="0" loading="lazy"><figcaption>apis</figcaption></figure>
<!-->
<p>Arquitecturas Web¶<br>
Duración y criterios de evaluación</p>
<p>Decisiones de diseño¶<br>
¿Qué tamaño tiene el proyecto?<br>
¿Qué lenguajes de programación conozco? ¿Vale la pena el esfuerzo de aprender uno nuevo?<br>
¿Voy a usar herramientas de código abierto o herramientas propietarias? ¿Cuál es el coste de utilizar soluciones comerciales?<br>
¿Voy a programar la aplicación yo solo o formaré parte de un grupo de programadores?<br>
¿Cuento con algún servidor web o gestor de base de datos disponible o puedo decidir libremente utilizar el que crea necesario?<br>
¿Qué tipo de licencia voy a aplicar a la aplicación que desarrolle?<br>
Herramientas¶<br>
Servidor Web¶<br>
Software que recibe peticiones HTTP (GET, POST, DELETE, ...). Devuelve el recurso solicitado (HTML, CSS, JS, JSON, imágenes, etc...)</p>
<p>El producto más implantando es Apache Web Server (<a href="https://httpd.apache.org/" target="_blank" rel="noopener noreferrer">https://httpd.apache.org/</a>), creado en 1995.</p>
<p>Software libre y multiplataforma<br>
Sistema de módulos dinámicos → PHP, Python, Perl<br>
Utiliza el archivo .htaccess para su configuración<br>
En la actualidad, Apache está perdiendo mercado respecto a Nginx (<a href="https://www.nginx.com" target="_blank" rel="noopener noreferrer">https://www.nginx.com</a>). Se trata de un producto más moderno (2004) y que en determinados escenarios tiene mejor rendimiento que Apache.</p>
<p>Comparativa servidores web: <a href="https://w3techs.com/technologies/history_overview/web_server/ms/q" target="_blank" rel="noopener noreferrer">https://w3techs.com/technologies/history_overview/web_server/ms/q</a><br>
Servidor de Aplicaciones¶<br>
Software que ofrece servicios adicionales a los de un servidor web:<br>
Clustering<br>
Balanceo de carga<br>
Tolerancia a fallos<br>
Tomcat (<a href="http://tomcat.apache.org/" target="_blank" rel="noopener noreferrer">http://tomcat.apache.org/</a>) es el servidor de aplicaciones open source y multiplataforma de referencia para una arquitectura Java.<br>
Contiende un contenedor Web Java que interpreta Servlets y JSP.<br>
Info</p>
<p>Tanto los servidores web como los servidores de aplicaciones los estudiaremos en profundidad en el módulo de &quot;Despliegue de Aplicaciones Web&quot;.</p>
<p>Lenguajes en el servidor¶<br>
Las aplicaciones que generan las páginas web se programan en alguno de los siguientes lenguajes:</p>
<p>PHP<br>
JavaEE: Servlets / JSP<br>
Python<br>
<a href="http://ASP.NET" target="_blank" rel="noopener noreferrer">ASP.NET</a> → Visual Basic .NET / C#<br>
Ruby<br>
...<br>
JavaEE¶<br>
Java Enterprise Edition es la solución Java para el desarrollo de aplicaciones enterprise. Ofrece una arquitectura muy completa y compleja, escalable y tolerante a fallos. Planteada para aplicaciones para grandes sistemas.</p>
<p>JavaEE</p>
<p>PHP¶<br>
Lenguaje de propósito general diseñado para el desarrollo de páginas web dinámicas<br>
En un principio, lenguaje no tipado.<br>
Actualmente en la versión 8. Se recomienda al menos utilizar una versión superior a la 7.0.<br>
Código embebido en el HTML<br>
Instrucciones entre etiquetas</p>
<div class="language-php line-numbers-mode" data-highlighter="shiki" data-ext="php" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-php"><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">&#x3C;</span><span style="--shiki-light:#383A42;--shiki-dark:#C678DD">?</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>php y</p>
<div class="language-php line-numbers-mode" data-highlighter="shiki" data-ext="php" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-php"><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#C678DD">?</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">></span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>Para generar codigo dentro de PHP, podemos usar la instrucción echo<br>
Multitud de librerías y frameworks:<br>
Laravel, Symfony, Codeigniter, Zend<br>
Su documentación es bastante completa: <a href="https://www.php.net/manual/es/index.php" target="_blank" rel="noopener noreferrer">https://www.php.net/manual/es/index.php</a></p>
<p>El siguiente mapa mental muestra un resumen de sus elementos:</p>
<p>Elementos del lenguaje PHP<br>
Durante las siguientes unidades vamos a estudiar PHP en profundidad.</p>
<p>Puesta en marcha¶<br>
Para poder trabajar con un entorno de desarrollo local, hemos de preparar nuestro entorno de desarrollo con las herramientas comentadas. A lo largo del curso vamos a utilizar la versión 8 de PHP.</p>
<p>XAMPP¶<br>
XAMPP (<a href="https://www.apachefriends.org/es/index.html" target="_blank" rel="noopener noreferrer">https://www.apachefriends.org/es/index.html</a>) es una distribución compuesta con el software necesario para desarrollar en entorno servidor. Se compone de las siguientes herramientas en base a sus siglas:</p>
<p>X para el sistema operativo (de ahí que se conozca tamnbién como LAMP o WAMP).<br>
A para Apache.<br>
M para MySQL / MariaDB. También incluye phpMyAdmin para la administración de la base de datos desde un interfaz web.<br>
P para PHP.<br>
la última P para Perl.<br>
Desde la propia página se puede descargar el archivo ejecutable para el sistema operativo de nuestro ordenador. Se recomienda leer la FAQ de cada sistema operativo con instrucciones para su puesta en marcha.</p>
<p>XAMPP en Windows</p>
<p>Si vas a trabajar con tu propio ordenador, XAMPP es una solución más sencilla que Docker, sobre todo si trabajar con Windows como sistema operativo.</p>
<p>Docker¶<br>
Docker (<a href="https://www.docker.com" target="_blank" rel="noopener noreferrer">https://www.docker.com</a>) es un gestor de contenedores, considerando un contenedor como un método de virtualización del sistema operativo.</p>
<p>El uso de contenedores requiere menos recursos que una máquina virtual, por lo tanto, su lanzamiento y detención son más rápidos que las máquinas virtuales.</p>
<p>Así pues, Docker permite crear, probar e implementar aplicaciones rápidamente, a partir de una serie de plantillas que se conocen como imágenes de Docker.</p>
<p>Para ello es necesario tener instalado Docker Desktop (<a href="https://www.docker.com/products/docker-desktop" target="_blank" rel="noopener noreferrer">https://www.docker.com/products/docker-desktop</a>) en nuestros entornos de desarrollo (el cual ya incluye en nucleo de Docker y la herramienta docker compose). En los ordenadores del aula ya está instalado. Para instalarlo en casa, en el caso de Windows, es necesario instalar previamente WSL 2, el cual es un subsistema de Linux dentro de Windows.</p>
<p>A lo largo del curso iremos creando diferentes contenedores con los servicios necesarios, de manera que cada vez sólo trabajemos con el software mínimo.</p>
<p>Versiones</p>
<p>A lo largo del curso vamos a usar PHP 8.0. Respecto a Docker, para escribir los apuntes hemos utilizado la version 20.10 y la version 2.19 de docker compose. Finalmente, la versión de Docker Desktop que hemos utilizado es la 4.0.</p>
<p>Plantilla Servidor Web + PHP¶<br>
Docker se basa en el uso de imágenes para crear contenedores. Docker Compose simplifica el trabajo con múltiples contenedores, y por ello, para facilitar el arraque, nos centraremos en Docker Compose utilizando una plantilla que únicamente va a contener como servicios Apache/Nginx y PHP.</p>
<p>Para ello, vamos a rellenar el archivo docker-compose.yaml con:</p>
<p>Apache y PHP<br>
Nginx y PHP</p>
<h1 id="services" tabindex="-1"><a class="header-anchor" href="#services"><span>Services</span></a></h1>
<p>services:</p>
<h1 id="apache-php" tabindex="-1"><a class="header-anchor" href="#apache-php"><span>Apache + PHP</span></a></h1>
<p>apache_php:<br>
image: php:8-apache<br>
# Preparamos un volumen para almacenar nuestro código<br>
volumes:<br>
- ./src/:/var/www/html<br>
expose:<br>
- 80<br>
ports:<br>
- 80:80</p>
<p>Dentro de la carpeta que contenga dicho archivo, hemos de crear una carpeta src donde colocaremos nuestro código fuente. Para facilitar la puesta en marcha, tenéis la plantilla de Apache/PHP (versión 2 con a2enmod rewrite) o Nginx/PHP disponible para su descarga.</p>
<p>Cuando estemos listos, lanzaremos el servicio mediante:</p>
<p>docker-compose up -d<br>
Si queremos ver el contenido de los archivos de log del servicio utilizaremos:</p>
<p>docker-compose logs -f<br>
Para copiar un archivo desde nuestro sistema al interior del contenedor:</p>
<p>docker cp ./miFichero idContenedor:/tmp<br>
Y al revés, si queremos consultar un archivo contenido dentro de un contenedor, lo copiaremos a nuestro sistema:</p>
<p>docker cp idContenedor:/tmp/archivoAConsultar.txt ./<br>
Finalmente, si queremos acceder a un terminal interactivo dentro del contenedor:</p>
<p>docker exec -it nombreContenedor bash<br>
Otros comandos que podemos llegar a utilizar son:</p>
<p>docker ps: Ver los contenedores que se estan ejecutando<br>
docker ps -a: Ver todos los contenedores<br>
docker start nombreContenedor: Arrancar un contenedor<br>
docker images: Ver las imágenes que tenemos descargadas<br>
Otra forma más sencilla para lanzar de nuevo los contenedores y gestionarlos una vez creados es utilizar el interfaz gráfico que ofrece Docker Desktop:</p>
<p>Arranque de contenedor mediante Docker Desktop<br>
Docker stack</p>
<p>Existen diversas opciones mediante Docker que ofrecen soluciones completas y empaquetas para todo el stack de desarrollo. En posteriores sesiones utilizaremos tanto Devilbox (<a href="http://devilbox.org" target="_blank" rel="noopener noreferrer">http://devilbox.org</a>) como Laradock (<a href="https://laradock.io" target="_blank" rel="noopener noreferrer">https://laradock.io</a>)</p>
<p>Pero quiero saber cómo funciona...</p>
<p>En el módulo de Despliegue de aplicaciones estudiaréis en profundidad, además de Docker, Apache y otros servicios que nos servirán de ayuda para el desarrollo en entorno servidor.</p>
<p>Entorno de desarrollo¶<br>
En este curso vamos a emplear Visual Studio Code (<a href="https://code.visualstudio.com" target="_blank" rel="noopener noreferrer">https://code.visualstudio.com</a>) como entorno de desarrollo (IDE). Existen otras alternativas, siendo PhpStorm la más conocida pero siendo de pago. Otra posibilidad es utilizar Eclipse, aunque es un entorno bastante pesado.</p>
<p>VSCode es un editor de código fuente que se complementa mediante extensiones. Para facilitar el trabajo a lo largo del curso vamos a utilizar las siguientes extensiones:</p>
<p>PHP Intelephense<br>
Docker<br>
En la siguiente sesión comenzaremos a utilizar Intelephense pero en esta sesión nos vamos a centrar en Docker (más adelante instalaremos nuevas extensiones).</p>
<p>Por ejemplo, si abrimos la extensión de Docker, podréis visualizar tanto los contenedores como las imágenes de vuestro sistema. Desde cada contenedor, mediante clic derecho, podemos iniciar/detener/reiniciar cada contenedor, así como ver su contenido o abrir un terminal dentro del mismo.</p>
<p>Opciones mediante extensión Docker en VSCode<br>
Hola Mundo¶<br>
Y como no, nuestro primer ejemplo será un Hola Mundo en PHP.</p>
<p>Si nombramos el archivo como index.php, al acceder a <a href="http://localhost" target="_blank" rel="noopener noreferrer">http://localhost</a> automáticamente cargará el resultado:</p>
<div class="language-php line-numbers-mode" data-highlighter="shiki" data-ext="php" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-php"><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">&#x3C;!</span><span style="--shiki-light:#986801;--shiki-dark:#ABB2BF">DOCTYPE</span><span style="--shiki-light:#986801;--shiki-dark:#ABB2BF"> html</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">></span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">&#x3C;</span><span style="--shiki-light:#986801;--shiki-dark:#ABB2BF">html</span><span style="--shiki-light:#986801;--shiki-dark:#ABB2BF"> lang</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"es"</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">></span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">&#x3C;</span><span style="--shiki-light:#986801;--shiki-dark:#ABB2BF">head</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">></span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">    &#x3C;</span><span style="--shiki-light:#986801;--shiki-dark:#ABB2BF">meta</span><span style="--shiki-light:#986801;--shiki-dark:#ABB2BF"> charset</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"UTF-8"</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">></span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">    &#x3C;</span><span style="--shiki-light:#986801;--shiki-dark:#ABB2BF">meta</span><span style="--shiki-light:#986801;--shiki-dark:#ABB2BF"> name</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"viewport"</span><span style="--shiki-light:#986801;--shiki-dark:#ABB2BF"> content</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"width=device-width, initial-scale=1.0"</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">></span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">    &#x3C;</span><span style="--shiki-light:#986801;--shiki-dark:#ABB2BF">title</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">></span><span style="--shiki-light:#986801;--shiki-dark:#ABB2BF">Hola</span><span style="--shiki-light:#986801;--shiki-dark:#ABB2BF"> Mundo</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">&#x3C;/</span><span style="--shiki-light:#986801;--shiki-dark:#ABB2BF">title</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">></span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">&#x3C;/</span><span style="--shiki-light:#986801;--shiki-dark:#ABB2BF">head</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">></span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">&#x3C;</span><span style="--shiki-light:#986801;--shiki-dark:#ABB2BF">body</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">></span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">    &#x3C;</span><span style="--shiki-light:#383A42;--shiki-dark:#C678DD">?</span><span style="--shiki-light:#986801;--shiki-dark:#ABB2BF">php</span></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">        echo</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> "Hola Mundo"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#C678DD">    ?</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">></span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">&#x3C;/</span><span style="--shiki-light:#986801;--shiki-dark:#ABB2BF">body</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">></span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Referencias¶<br>
Curso de introducción a Docker, por Sergi García Barea : <a href="https://sergarb1.github.io/CursoIntroduccionADocker/" target="_blank" rel="noopener noreferrer">https://sergarb1.github.io/CursoIntroduccionADocker/</a><br>
Artículo Arquitecturas Web y su evolución<br>
Actividades¶<br>
Busca en internet cuales son los tres frameworks PHP más utilizados, y indica:</p>
<p>Nombre y URL<br>
Año de creación<br>
Última versión<br>
Busca tres ofertas de trabajo de desarrollo de software en Infojobs en la provincia de Alicante que citen PHP y anota:</p>
<p>Empresa + puesto + frameworks PHP + requísitos + sueldo + enlace a la oferta.<br>
Una vez arrancado el servicio PHP (mediante XAMPP o Docker), crea el archivo info.php y añade el siguiente fragmento de código:</p>
<div class="language-php line-numbers-mode" data-highlighter="shiki" data-ext="php" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-php"><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">&#x3C;</span><span style="--shiki-light:#383A42;--shiki-dark:#C678DD">?</span><span style="--shiki-light:#986801;--shiki-dark:#ABB2BF">php</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2"> phpinfo</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">() </span><span style="--shiki-light:#383A42;--shiki-dark:#C678DD">?</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">></span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>Anota los valores de:<br>
Versión de PHP<br>
Loaded Configuration File<br>
memory_limit<br>
DOCUMENT_ROOT<br>
Abre el archivo php.ini-production que está dentro del contenedor (puedes averiguar la ruta a partir de la propiedad Configuration File (php.ini) Path) e indica para qué sirven las siguientes propiedades y qué valores contienen:</p>
<p>file_uploads<br>
max_execution_time<br>
short_open_tag<br>
php.ini</p>
<p>Es el archivo de configuración de PHP, y en toda instalación vienen dos plantillas (php.ini-development y php.ini-production) para que elijamos los valores más acordes a nuestro proyecto y creemos nuestro archivo propio de php.ini.<br>
--&gt;</p>
</div></template>


