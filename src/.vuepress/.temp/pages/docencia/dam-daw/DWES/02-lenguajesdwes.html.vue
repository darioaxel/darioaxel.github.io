<template><div><blockquote>
<p><strong>En este tema trabajaremos los siguientes RAs:</strong></p>
<ul>
<li>RA2. Escribe sentencias ejecutables por un servidor Web reconociendo y aplicando procedimientos de integración del código en lenguajes de marcas.</li>
<li>RA3. Escribe bloques de sentencias embebidos en lenguajes de marcas, seleccionando y utilizando las estructuras de programación.</li>
</ul>
</blockquote>
<h1 id="ut02-lenguajes-de-programacion-en-entorno-servidor" tabindex="-1"><a class="header-anchor" href="#ut02-lenguajes-de-programacion-en-entorno-servidor"><span>UT02 Lenguajes de programación en entorno servidor</span></a></h1>
<div class="hint-container info">
<p class="hint-container-title">¿Qué vamos a aprender en esta unidad?</p>
<p>//ToDo</p>
</div>
<h2 id="_1-introduccion" tabindex="-1"><a class="header-anchor" href="#_1-introduccion"><span>1. Introducción</span></a></h2>
<p>En los primeros tiempos de Internet, no se ejecutaban programas en el servidor. Solo se pedían páginas estáticas (escritas en HTML) más o menos elaboradas que había sido guardadas en el servidor por un administrador de sistemas. A esto se le denominó <strong>web 1.0.</strong></p>
<p>A alguien se le ocurrió la idea de que <strong>los propios visitantes podrían también crear contenido</strong>. Ese contenido se guardaría en el servidor (en archivos o en una base de datos) y posteriormente podría recuperarse para generar con él páginas dinámicas, generadas sobre la marcha. Es decir, documentos HTML que no existieran previamente y que nadie, en realidad, hubiera tecleado, sino que se creasen a partir del contenido almacenado en esos archivos o esa base de datos.</p>
<p>Esa web dinámica estaría generada por un programa ejecutado en el servidor, un programa cuya salida sería HTML válido, comprensible por el navegador que la reciba. A esto se le denominó <strong>web 2.0</strong> y supuso una revolución tan grande como el propio nacimiento de Internet.</p>
<h3 id="_1-1-evolucion-hitorica" tabindex="-1"><a class="header-anchor" href="#_1-1-evolucion-hitorica"><span>1.1. Evolución hitórica</span></a></h3>
<ul>
<li>
<p><strong>Principios — CGI (mediados-finales de 1990)</strong><br>
Los primeros sitios dinámicos usaban CGI (Common Gateway Interface): scripts en Perl/C que el servidor ejecutaba por petición. CGI introdujo la idea de ejecutar código en servidor para generar contenido dinámico, pero era poco eficiente (cada petición iniciaba un proceso)</p>
</li>
<li>
<p><strong>1994 - 1995 — Nacimiento de PHP</strong><br>
Rasmus Lerdorf publica las primeras herramientas (Personal Home Page Tools) en 1995; PHP evoluciona hacia un lenguaje embebido en HTML muy popular por su facilidad y por ejecutarse en entorno LAMP.</p>
</li>
<li>
<p><strong>1996 - 1997 — ASP (Active Server Pages)</strong><br>
Microsoft lanza ASP integrado en IIS (1996–1997) ofreciendo una forma de incluir código (VBScript/JScript) embebido en páginas servidas por IIS, orientado a entornos Windows/enterprise.</p>
</li>
<li>
<p><strong>1996 - 1999 — Java Servlets y JSP</strong><br>
Para superar limitaciones de CGI aparecieron los Servlets (API en Java, ~1996) y luego JSP (1999) como mecanismo para separar vista/plantilla de la lógica Java. Esto dio pie a stacks Java empresariales y servidores de aplicaciones (Tomcat, GlassFish, JBoss).</p>
</li>
<li>
<p><strong>2004/2005 — Ruby on Rails y Django</strong><br>
Frameworks como Ruby on Rails (2004) y Django (2005) introducen convenciones (convention over configuration), scaffolding, ORM integrado y aceleran el desarrollo de aplicaciones web completas.</p>
</li>
<li>
<p><strong>2009 — Node.js (JS en servidor)</strong><br>
Node.js cambia el panorama ofreciendo JavaScript en servidor con un modelo asíncrono orientado a I/O no bloqueante. Rápidamente impulsó frameworks/server-side JS (Express) y permitió arquitecturas unificadas JS full-stack.</p>
</li>
<li>
<p><strong>2010s — Consolidación de frameworks y microservicios</strong><br>
Surgen frameworks modernos (Laravel para PHP, Spring Boot para Java en 2014) y patrones como microservicios, contenedores y despliegue cloud-native. Spring Boot (GA 2014) simplifica arrancar aplicaciones Java independientes.</p>
</li>
<li>
<p><strong>Década 2020 — estado actual</strong><br>
Hoy coexisten: lenguajes interpretados (PHP, Python/Django), frameworks Java (Spring), plataformas server-side JS (Node/Express), y arquitecturas distribuidas. La elección depende del contexto: velocidad de desarrollo, integraciones, escalabilidad y equipo.</p>
</li>
</ul>
<div class="hint-container important">
<p class="hint-container-title">Importante</p>
<p>Aunque ya lo hemos comentado en temas anteriores, es importante recordar los siguientes conceptos y el significado de algunos términos básicos:</p>
<ul>
<li>Un <strong>servidor</strong> es <strong>un programa</strong> que se ejecuta en una máquina conectada a una red y que permanece dormido hasta que una petición procedente de la red lo despierta. Entonces, el programa hace algo (consulta datos, elabora un cálculo, lo que sea) y devuelve su resultado por la red.</li>
</ul>
<p>Por extensión, un servidor también es <strong>cualquier ordenador donde se ejecute un programa servidor</strong>. Es decir, usamos la misma palabra para referirnos a un programa y al ordenador donde se ejecuta ese programa. Mala idea, ya lo sé, pero es lo que hay.</p>
<ul>
<li>El <strong>cliente</strong> es un <strong>programa</strong> que envía peticiones al servidor para despertarlo. También es el programa que recoge el resultado devuelto por el servidor.</li>
</ul>
<p>¿Y sabes qué? Que, por extensión, <strong>la máquina</strong> donde se ejecuta un programa cliente también se llama cliente.</p>
<p>Pues bien, en programación web, nuestro cliente es el <strong>navegador web</strong> (también llamado cliente web). Cualquier navegador del universo conocido entra en esta categoría. Excepto, tal vez, Internet Explorer (sí, esto es un chiste informático).</p>
<p>Y un servidor es cualquier máquina de la red donde se esté ejecutando un programa servidor web como Apache, Nginx, Tomcat, IIS y otros cuando viejos amigos que irás conociendo a lo largo de este curso.</p>
</div>
<h3 id="_1-2-flujos-de-peticiones-web" tabindex="-1"><a class="header-anchor" href="#_1-2-flujos-de-peticiones-web"><span>1.2 Flujos de peticiones web</span></a></h3>
<h4 id="_1-2-1-una-peticion-web-en-la-epoca-1-0" tabindex="-1"><a class="header-anchor" href="#_1-2-1-una-peticion-web-en-la-epoca-1-0"><span>1.2.1. Una petición web en la época 1.0</span></a></h4>
<p>Ahora que tienes claro qué es un servidor y un cliente web, puedes comprender el siguiente esquema.</p>
<p>En él, se ilustra lo que ocurre cuando un cliente web (recuerda: tu navegador) envía al servidor la petición de una <strong>página estática</strong>.</p>
<p>El servidor, en este caso, se limita a enviar al cliente el documento HTML tal cual está almacenado en su disco duro, sin cambiar una sola coma.</p>
<figure><img src="/images/dwes/02-servicio-www-1.jpg" alt="Petición web 1.0" tabindex="0" loading="lazy"><figcaption>Petición web 1.0</figcaption></figure>
<h4 id="_1-2-2-una-peticion-web-en-la-epoca-2-0" tabindex="-1"><a class="header-anchor" href="#_1-2-2-una-peticion-web-en-la-epoca-2-0"><span>1.2.2. Una petición web en la época 2.0</span></a></h4>
<p>Con la web 2.0 la cosa cambia bastante porque aparecen las páginas dinámicas, aunque tendrás que fijarte bien en el esquema para apreciar la diferencia.</p>
<p>Quédate con lo importante: en este esquema, el cliente web no pide un documento HTML, sino un programa, que puede estar escrito en PHP o algún otro lenguaje. Eso es lo de menos.</p>
<p>Ese programa se ejecuta en el servidor, y el resultado de esa ejecución es lo que recibe el cliente, no el programa en sí.</p>
<figure><img src="/images/dwes/02-servicio-www-2.jpg" alt="Petición web 2.0" tabindex="0" loading="lazy"><figcaption>Petición web 2.0</figcaption></figure>
<p>Pues bien: si un sitio web funciona del primer modo, no es una aplicación web, sino una página web estática. Para que sea considerado una aplicación web, debe funcionar del segundo modo.</p>
<h2 id="_3-php" tabindex="-1"><a class="header-anchor" href="#_3-php"><span>3. PHP</span></a></h2>
<figure><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/PHP-logo.svg/711px-PHP-logo.svg.png" alt="Logo de PHP" tabindex="0" loading="lazy"><figcaption>Logo de PHP</figcaption></figure>
<p>PHP es un acrónimo recursivo. Significa <strong>&quot;PHP Hypertext Preprocessor&quot;</strong>.</p>
<p>Sí, así es el sentido del humor de los informáticos. Qué le vamos a hacer.</p>
<h3 id="_3-1-introduccion" tabindex="-1"><a class="header-anchor" href="#_3-1-introduccion"><span>3.1. Introducción</span></a></h3>
<p>PHP es un lenguaje de programación de propósito general. De hecho, junto con librerías como PHP-Qt o PHP-GTK, puedes programar con él cualquier aplicación de escritorio con sus ventanitas, sus botoncitos y toda la pesca.</p>
<p>Pero, por circunstancias más debidas al azar que a otra cosa, se empezó a usar para desarrollo web al comienzo de la web 2.0, y hoy en día se utiliza casi exclusivamente para ese propósito. Que es el propósito que a nosotros nos interesa, claro.</p>
<p>Cuando se usa en desarrollo web, PHP aparece embebido dentro de documentos HTML. Enseguida veremos cómo se hace eso.</p>
<p>Igual que sucedía con Javascript, pocos proyectos nuevos se desarrollan con PHP clásico. Lo normal es usar un framework (o colección compleja de librerías) que ocultan en todo o en parte el funcionamiento de PHP, que sigue corriendo debajo. Por supuesto, cualquier desarrollador/a web debe conocer tanto PHP como el funcionamiento de los frameworks que corren sobre PHP.</p>
<p>Nosotros nos centraremos primero en PHP clásico, y más adelante veremos los frameworks para PHP, centrándonos en uno de los más populares y potentes que existen en la actualidad: <strong>Laravel</strong>.</p>
<h3 id="_3-2-caracteristicas-de-php" tabindex="-1"><a class="header-anchor" href="#_3-2-caracteristicas-de-php"><span>3.2. Características de PHP</span></a></h3>
<ul>
<li>PHP permite conectarse con múltiples bases de datos: MySQL, MariaDB, Oracle, PostgreSQL, SQL Server, DB2, etc. También puede conectar por ODBC.</li>
<li>Se parece mucho a otros lenguajes de tercera generación y orientados a objeto (en particular a C/C++ y, por tanto, a Java). Su curva de aprendizaje para los que ya saben programar es muy plana.</li>
<li>Es un lenguaje con tipado dinámico y débil. Es decir, los tipos de datos se asignan en tiempo de ejecución y pueden mezclarse tipos de datos con bastante libertad. Esto tiene ventajas e inconvenientes que descubrirás en tus carnes cuando empieces a programar con PHP.</li>
<li>Es un lenguaje orientado a objetos, pero conserva todas las características de los lenguajes estructurados, es decir: se puede programar sin recurrir a los objetos. Un punto a su favor para nostálgicos, aunque lo recomendable es programar con objetos siempre.</li>
<li>Es un lenguaje tremendamente flexible. Casi todo se puede hacer de tres o cuatro formas diferentes. Eso le permite adaptarse a los gustos personales de cada programador/a.</li>
</ul>
<h4 id="_3-2-1-lo-nuevo-en-php8" tabindex="-1"><a class="header-anchor" href="#_3-2-1-lo-nuevo-en-php8"><span>3.2.1. Lo nuevo en PHP8</span></a></h4>
<p>PHP8 no tiene demasiadas novedades con respecto a PHP7, como este no las tenía con respecto a PHP5.</p>
<p>Debes tener en cuenta que el mayor salto evolutivo se produjo entre PHP 4 y PHP 5. A partir de ahí, y para principiantes como nosotros, la cosa no ha cambiado demasiado.</p>
<p>Algunas de las novedades más destacables de PHP8 son de este calibre:</p>
<ul>
<li>Mejoras importantes de rendimiento, con la aparición de JIT (Just in Time Compiler), un compilador de PHP que trabaja de forma transparente al programador para incrementar la velocidad de ejecución.</li>
<li>Mejoras menores en el manejo de las clases y métodos abstractos.</li>
<li>Simplificación en la declaración de atributos.</li>
<li>Posibilidad de usar arrays con índices negativos.</li>
</ul>
<p>Como ves, nada que vaya a revolucionar la forma de trabajar con PHP.</p>
<h4 id="_3-2-2-ventajas-de-php-sobre-otros-lenguajes" tabindex="-1"><a class="header-anchor" href="#_3-2-2-ventajas-de-php-sobre-otros-lenguajes"><span>3.2.2. Ventajas de PHP sobre otros lenguajes</span></a></h4>
<p>PHP es el líder indiscutible en el desarrollo de aplicaciones web del lado del servidor. Hace años (¡muchos!) que algunos se empeñan en decir que está muerto o que está destinado a desaparecer, pero sigue ahí, obstinadamente en el número uno.</p>
<p>Por algo será.</p>
<p>Algunas de las ventajas que han hecho de PHP el líder de los lenguajes del lado del servidor durante tanto tiempo son:</p>
<ul>
<li>Es un lenguaje libre y abierto.</li>
<li>Es muy eficiente (comparado con otros lenguajes del lado del servidor).</li>
<li>Es ejecutable en (casi) cualquier servidor.</li>
<li>Cuenta con una excelente documentación y miles de foros y sitios donde consultar dudas.</li>
<li>La curva de aprendizaje es baja si ya sabes programar.</li>
<li>Existen mogollón de entornos de desarrollo para PHP, para todos los gustos.</li>
<li>Ofrece fácil interoperatibilidad con otros sistemas, en particular con bases de datos.</li>
<li>Comunidad muuuy grande.</li>
<li>Su sintaxis, estabilidad y seguridad han mejorado enormemente desde los tiempos algo caóticos de PHP4.</li>
</ul>
<h4 id="_3-2-3-inconvenientes-de-php-con-respecto-a-otros-lenguajes" tabindex="-1"><a class="header-anchor" href="#_3-2-3-inconvenientes-de-php-con-respecto-a-otros-lenguajes"><span>3.2.3. Inconvenientes de PHP con respecto a otros lenguajes</span></a></h4>
<p>PHP también presenta algunos inconvenientes, por supuesto. No hay nada perfecto. Entre ellos, podemos destacar:</p>
<ul>
<li>Fallos de diseño (corregidos en su mayoría a partir de PHP5), como:
<ul>
<li>Los métodos para acceso a bases de datos cambian según el SGBD usado.</li>
<li>Nombres de funciones inconsistentes.</li>
<li>No es completamente orientado a objetos.</li>
<li>Tipado confuso y, a veces, impredecible.</li>
</ul>
</li>
<li>Grandes (e incompatibles) cambios entre versiones.</li>
<li>Pérdida lenta pero constante de cuota de mercado.</li>
<li>Pésima relación señal/ruido en la web: ¡hay demasiados malos desarrolladores en PHP!</li>
</ul>
<h3 id="_3-3-gestion-de-dependencias-con-composer" tabindex="-1"><a class="header-anchor" href="#_3-3-gestion-de-dependencias-con-composer"><span>3.3. Gestión de dependencias con composer</span></a></h3>
<p>Aunque PHP puede instalarse como un programa independiente, en el contexto del desarrollo de aplicaciones web siempre se utiliza como parte de un servidor web.</p>
<p>Casi todos los servidores web proporcionan soporte nativo para PHP. Por ejemplo, Apache lo incorpora &quot;de serie&quot;, de modo que solo tenemos que tener un servidor con Apache instalado para poder desarrollar con PHP. Lo mismo puede decirse de otros servidores basados en sistemas Unix y Linux, como nginx o lighttpd.</p>
<p>Cuando las aplicaciones se empiezan a hacer complejas, suele ser habitual que necesitemos paquetes de PHP que no son estándar, es decir, que no vienen con el lenguaje. Podemos instalarlos manualmente, desde luego, pero PHP, como todos los lenguajes medianamente serios, tiene su propio gestor de dependencias llamado <strong>composer</strong>.</p>
<p>composer se usa desde la línea de comandos y trabaja utilizando un archivo de configuración llamado <code v-pre>composer.json</code> (porque está escrito en formato JSON) donde se especifican qué paquetes (o librerías) usa el proyecto en cuestión. Al ejecutar composer, ese archivo es leído y las dependencias instaladas o actualizadas en una carpeta del proyecto llamada <code v-pre>/vendor</code>. De ese modo, podemos tener todas las librerías correctamente instaladas y actualidadas con facilidad.</p>
<p>El aspecto del archivo de configuración <code v-pre>composer.json</code> es algo así:</p>
<div class="language-json line-numbers-mode" data-highlighter="shiki" data-ext="json" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-json"><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">{</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">    "require"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: {</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">        "monolog/monolog"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"2.0.*"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">        "phpunit/phpunit"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"^9.5"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">        "phpunit/php-code-coverage"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"^9.2"</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    }</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">}</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-java-en-el-desarrollo-web" tabindex="-1"><a class="header-anchor" href="#_4-java-en-el-desarrollo-web"><span>4. Java en el Desarrollo Web</span></a></h2>
<figure><img src="https://www.oracle.com/a/ocom/img/cb71-java-logo.png" alt="Logo de Java" tabindex="0" loading="lazy"><figcaption>Logo de Java</figcaption></figure>
<p>Java es un lenguaje de programación <strong>de propósito general</strong>, <strong>orientado a objetos</strong> y con un fuerte tipado. Desde sus inicios en los años 90, ha sido uno de los lenguajes más usados tanto en <strong>aplicaciones de escritorio</strong> como en <strong>sistemas distribuidos</strong> y, sobre todo, en <strong>desarrollo web corporativo</strong>.</p>
<p>Su lema, <strong>“Write once, run anywhere”</strong>, reflejaba la gran ventaja que trajo: el código podía ejecutarse en cualquier plataforma con una <strong>Máquina Virtual de Java (JVM)</strong>, lo que permitió desarrollar aplicaciones multiplataforma con facilidad.</p>
<p>Cuando hablamos de <strong>Java en el desarrollo web en entorno servidor</strong>, lo que realmente usamos son <strong>tecnologías y frameworks que corren sobre Java</strong>, como:</p>
<ul>
<li><strong>JSP (JavaServer Pages)</strong></li>
<li><strong>Servlets</strong></li>
<li><strong>JSF (Jakarta Server Faces)</strong></li>
<li><strong>Spring / Spring Boot</strong></li>
<li>Otros frameworks modernos: Micronaut, Quarkus, etc.</li>
</ul>
<p>Al igual que sucede con PHP y Laravel, en Java el código “puro” (servlets, JSP) suele reservarse para aprendizaje y proyectos pequeños. En entornos profesionales casi todo se hace con <strong>frameworks</strong> que abstraen la complejidad, siendo <strong>Spring Boot</strong> y <strong>Jakarta EE</strong> los más importantes.</p>
<h3 id="_4-1-caracteristicas-de-java-para-desarrollo-web" tabindex="-1"><a class="header-anchor" href="#_4-1-caracteristicas-de-java-para-desarrollo-web"><span>4.1. Características de Java para desarrollo web</span></a></h3>
<ul>
<li><strong>Orientado a objetos desde su concepción.</strong> Todo en Java se basa en clases, objetos e interfaces.</li>
<li><strong>Tipado fuerte y estático.</strong> El compilador detecta la mayoría de errores antes de ejecutar.</li>
<li><strong>Portabilidad.</strong> Gracias a la JVM, el mismo código puede correr en Windows, Linux o macOS.</li>
<li><strong>Gran ecosistema de librerías y frameworks.</strong> Desde Jakarta EE hasta Spring y Hibernate.</li>
<li><strong>Seguro y robusto.</strong> Incluye manejo de memoria automático (garbage collector) y un sistema de excepciones sólido.</li>
<li><strong>Multi-hilo.</strong> Preparado para aplicaciones concurrentes, algo crítico en servidores web.</li>
</ul>
<h4 id="_4-1-1-breve-historia-de-java-en-la-web" tabindex="-1"><a class="header-anchor" href="#_4-1-1-breve-historia-de-java-en-la-web"><span>4.1.1. Breve historia de Java en la web</span></a></h4>
<ul>
<li>
<p><strong>1997 – Servlet API:</strong> Se introducen los <strong>servlets</strong>, clases Java que generan contenido dinámico en servidores web.</p>
</li>
<li>
<p><strong>1999 – JSP (JavaServer Pages):</strong> Nace como alternativa a los servlets puros, permitiendo incrustar código Java en páginas HTML (muy parecido a PHP).</p>
</li>
<li>
<p><strong>2004 – JSF (JavaServer Faces):</strong> Framework oficial de Java EE (ahora Jakarta EE) que introduce el paradigma MVC, componentes reutilizables y separación entre lógica y vista.</p>
</li>
<li>
<p><strong>2006 – Spring Framework:</strong> Empieza a popularizarse como una alternativa ligera y flexible a Java EE.</p>
</li>
<li>
<p><strong>2014 – Spring Boot:</strong> Revoluciona el desarrollo en Java con configuración mínima, enfoque “convention over configuration” y servidores embebidos.</p>
</li>
<li>
<p><strong>2019 – Eclipse Foundation asume Java EE, renombrado como Jakarta EE.</strong></p>
</li>
<li>
<p><strong>Actualidad:</strong></p>
<ul>
<li><strong>Spring Boot</strong> domina el desarrollo web moderno en Java.</li>
<li><strong>Jakarta EE</strong> sigue siendo clave en entornos corporativos y servidores de aplicaciones.</li>
<li>Nuevas alternativas como <strong>Quarkus</strong> o <strong>Micronaut</strong> buscan optimización en la nube y microservicios.</li>
</ul>
</li>
</ul>
<div class="hint-container note">
<p class="hint-container-title">Nota</p>
<p>Aunque lo hemos nombrado también al comienzo del tema, no ha sido explicado y hemos de abordarlo.<br>
El concepto de <strong>&quot;convention over configuration&quot;</strong> (convención sobre configuración) es un paradigma de diseño de software que busca simplificar y agilizar el desarrollo reduciendo la cantidad de decisiones y configuraciones explícitas que debe realizar un programador.</p>
<p>La idea principal es que el entorno, framework o sistema asume ciertas reglas y comportamientos predeterminados (convenciones) que el desarrollador solo debe seguir, de modo que no tenga que definir cada aspecto manualmente (configuración) salvo cuando quiera desviarse de esas convenciones.</p>
</div>
<h4 id="_4-1-2-ventajas-de-java-en-la-web" tabindex="-1"><a class="header-anchor" href="#_4-1-2-ventajas-de-java-en-la-web"><span>4.1.2. Ventajas de Java en la web</span></a></h4>
<ul>
<li><strong>Gran comunidad</strong> y documentación abundante.</li>
<li><strong>Estandarización:</strong> Jakarta EE asegura compatibilidad entre servidores (Tomcat, WildFly, Payara, Glassfish...).</li>
<li><strong>Frameworks potentes:</strong> Spring Boot simplifica drásticamente la configuración.</li>
<li><strong>Escalabilidad:</strong> usado en banca, telecomunicaciones y grandes empresas.</li>
<li><strong>Integración con bases de datos:</strong> vía JDBC, JPA/Hibernate.</li>
</ul>
<h4 id="_4-1-3-inconvenientes-de-java-en-la-web" tabindex="-1"><a class="header-anchor" href="#_4-1-3-inconvenientes-de-java-en-la-web"><span>4.1.3. Inconvenientes de Java en la web</span></a></h4>
<ul>
<li><strong>Curva de aprendizaje más pronunciada</strong> que PHP o Python.</li>
<li><strong>Mayor consumo de memoria y recursos.</strong></li>
<li><strong>Complejidad en proyectos grandes</strong> si no se usan frameworks modernos.</li>
<li><strong>Configuración histórica engorrosa</strong> en Jakarta EE (aunque hoy se simplifica bastante).</li>
</ul>
<h3 id="_4-2-jsp-y-jsf-las-dos-caras-del-desarrollo-web-clasico-en-java" tabindex="-1"><a class="header-anchor" href="#_4-2-jsp-y-jsf-las-dos-caras-del-desarrollo-web-clasico-en-java"><span>4.2. JSP y JSF: las dos caras del desarrollo web clásico en Java</span></a></h3>
<ul>
<li>
<p><strong>JSP (JavaServer Pages):</strong><br>
Similar a PHP: HTML con código Java embebido entre <code v-pre>&lt;% %&gt;</code>.<br>
Ejemplo:</p>
<div class="language-jsp line-numbers-mode" data-highlighter="shiki" data-ext="jsp" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-jsp"><span class="line"><span>&#x3C;html></span></span>
<span class="line"><span>&#x3C;body></span></span>
<span class="line"><span>    &#x3C;h1>Hola, &#x3C;%= request.getParameter("nombre") %>&#x3C;/h1></span></span>
<span class="line"><span>&#x3C;/body></span></span>
<span class="line"><span>&#x3C;/html></span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Hoy en día se utiliza más como recurso didáctico, o en aplicaciones legacy.</p>
</li>
<li>
<p><strong>JSF (Jakarta Server Faces):</strong><br>
Framework basado en <strong>componentes reutilizables</strong>, con fuerte separación entre vista (XHTML), controladores (Java Beans) y lógica de negocio.<br>
Ejemplo:</p>
<div class="language-xhtml line-numbers-mode" data-highlighter="shiki" data-ext="xhtml" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-xhtml"><span class="line"><span>&#x3C;h:form></span></span>
<span class="line"><span>    &#x3C;h:inputText value="#{usuarioBean.nombre}" /></span></span>
<span class="line"><span>    &#x3C;h:commandButton value="Enviar" action="#{usuarioBean.enviar}" /></span></span>
<span class="line"><span>&#x3C;/h:form></span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
<h3 id="_4-3-gestion-de-dependencias-en-java-maven-y-gradle" tabindex="-1"><a class="header-anchor" href="#_4-3-gestion-de-dependencias-en-java-maven-y-gradle"><span>4.3. Gestión de dependencias en Java: Maven y Gradle</span></a></h3>
<p>Igual que <strong>composer</strong> en PHP, en Java usamos <strong>Maven</strong> o <strong>Gradle</strong> para gestionar librerías y dependencias.</p>
<p>Un archivo <code v-pre>pom.xml</code> de Maven puede tener esta forma:</p>
<div class="language-xml line-numbers-mode" data-highlighter="shiki" data-ext="xml" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-xml"><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">&#x3C;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">dependencies</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">></span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    &#x3C;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">dependency</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">></span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">        &#x3C;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">groupId</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">>jakarta.platform&#x3C;/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">groupId</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">></span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">        &#x3C;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">artifactId</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">>jakarta.jakartaee-web-api&#x3C;/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">artifactId</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">></span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">        &#x3C;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">version</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">>10.0.0&#x3C;/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">version</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">></span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">        &#x3C;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">scope</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">>provided&#x3C;/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">scope</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">></span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    &#x3C;/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">dependency</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">></span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">&#x3C;/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">dependencies</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">></span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Con Maven podemos instalar y actualizar dependencias fácilmente:</p>
<div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-bash"><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">mvn</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> install</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">mvn</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> clean</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> package</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-python-en-el-desarrollo-web" tabindex="-1"><a class="header-anchor" href="#_5-python-en-el-desarrollo-web"><span>5. Python en el Desarrollo Web</span></a></h2>
<figure><img src="https://www.python.org/static/community_logos/python-logo.png" alt="Logo de Python" tabindex="0" loading="lazy"><figcaption>Logo de Python</figcaption></figure>
<p>Python es un lenguaje de programación <strong>de propósito general</strong>, <strong>interpretado</strong>, <strong>dinámico</strong> y con una sintaxis muy clara.<br>
Su filosofía de diseño (“<strong>There should be one– and preferably only one –obvious way to do it</strong>”) ha hecho de Python uno de los lenguajes más fáciles de aprender y usar, tanto en <strong>entornos educativos</strong> como en <strong>industria</strong>.</p>
<p>Aunque nació en los años 90, Python se popularizó más tarde, primero en <strong>ciencia de datos y automatización</strong>, y después en <strong>desarrollo web</strong>, donde hoy en día es uno de los protagonistas indiscutibles.</p>
<h3 id="_5-1-caracteristicas-de-python-para-desarrollo-web" tabindex="-1"><a class="header-anchor" href="#_5-1-caracteristicas-de-python-para-desarrollo-web"><span>5.1. Características de Python para desarrollo web</span></a></h3>
<ul>
<li><strong>Sintaxis clara y legible.</strong> Muy cercano al pseudocódigo, ideal para aprender.</li>
<li><strong>Lenguaje interpretado y dinámico.</strong> No requiere compilación previa.</li>
<li><strong>Tipado dinámico pero cada vez más soporte de anotaciones (type hints).</strong></li>
<li><strong>Orientado a objetos, pero soporta también programación estructurada y funcional.</strong></li>
<li><strong>Amplia comunidad y ecosistema de librerías.</strong></li>
<li><strong>Gran cantidad de frameworks web</strong>: Django, Flask, FastAPI, Pyramid…</li>
</ul>
<h4 id="_5-1-1-breve-historia-de-python" tabindex="-1"><a class="header-anchor" href="#_5-1-1-breve-historia-de-python"><span>5.1.1. Breve historia de Python</span></a></h4>
<ul>
<li><strong>1991 – Nace Python</strong> gracias a Guido van Rossum.</li>
<li><strong>2000 – Primeras librerías web básicas.</strong></li>
<li><strong>2003 – Django Framework:</strong> aparece en un periódico local de EE.UU. como herramienta interna y se libera en 2005. Se convierte en uno de los frameworks más usados del mundo.</li>
<li><strong>2010 – Flask Framework:</strong> alternativa minimalista y flexible a Django.</li>
<li><strong>2018 – FastAPI:</strong> nuevo framework enfocado en APIs y microservicios, con soporte de tipado moderno.</li>
<li><strong>Actualidad:</strong> Django y Flask dominan el desarrollo web en Python; FastAPI crece rápidamente en entornos de microservicios y APIs.</li>
</ul>
<h4 id="_5-1-2-ventajas-de-python-y-django-en-la-web" tabindex="-1"><a class="header-anchor" href="#_5-1-2-ventajas-de-python-y-django-en-la-web"><span>5.1.2. Ventajas de Python y Django en la web</span></a></h4>
<ul>
<li><strong>Sintaxis simple y rápida de aprender.</strong></li>
<li><strong>Desarrollo ágil</strong>: muchas funcionalidades vienen listas “de serie”.</li>
<li><strong>Seguridad:</strong> incluye protección contra ataques típicos (CSRF, SQL Injection, XSS).</li>
<li><strong>Gran comunidad y documentación oficial excelente.</strong></li>
<li><strong>Escalabilidad:</strong> usado por Instagram, Spotify, Pinterest, entre otros.</li>
<li><strong>Versatilidad:</strong> un mismo lenguaje para web, ciencia de datos, IA, automatización…</li>
</ul>
<h4 id="_5-1-3-inconvenientes-de-django-y-python-en-la-web" tabindex="-1"><a class="header-anchor" href="#_5-1-3-inconvenientes-de-django-y-python-en-la-web"><span>5.1.3. Inconvenientes de Django (y Python en la web)</span></a></h4>
<ul>
<li><strong>Menor rendimiento crudo</strong> frente a lenguajes compilados como Java.</li>
<li><strong>Django es “opinionado”:</strong> obliga a trabajar siguiendo sus patrones (lo cual es ventaja para principiantes, pero puede limitar a expertos).</li>
<li><strong>Consumo de memoria mayor</strong> que frameworks minimalistas como Flask.</li>
<li><strong>Migraciones de versiones</strong> a veces requieren ajustes manuales.</li>
</ul>
<h3 id="_5-2-django-el-framework-baterias-incluidas" tabindex="-1"><a class="header-anchor" href="#_5-2-django-el-framework-baterias-incluidas"><span>5.2. Django: el framework “baterías incluidas”</span></a></h3>
<p>Django es el framework de referencia en Python para <strong>desarrollo web rápido y seguro</strong>. Su lema es <strong>“The web framework for perfectionists with deadlines”</strong>.</p>
<p>Características clave de Django:</p>
<ul>
<li><strong>Arquitectura MTV (Model-Template-View):</strong> similar a MVC.</li>
<li><strong>ORM integrado</strong> para trabajar con bases de datos sin escribir SQL directamente.</li>
<li><strong>Sistema de plantillas</strong> para separar lógica y presentación.</li>
<li><strong>Admin automático:</strong> genera una interfaz de administración completa en segundos.</li>
<li><strong>Gestión de usuarios y autenticación integrada.</strong></li>
<li><strong>Gran comunidad y documentación.</strong></li>
</ul>
<p>Ejemplo de vista simple en Django:</p>
<div class="language-python line-numbers-mode" data-highlighter="shiki" data-ext="python" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-python"><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># views.py</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">from</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> django.http </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">import</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> HttpResponse</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">def</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> hola_mundo</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#D19A66;--shiki-dark-font-style:italic">request</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">):</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    return</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF"> HttpResponse</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"¡Hola, mundo desde Django!"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Y su mapeo en <code v-pre>urls.py</code>:</p>
<div class="language-python line-numbers-mode" data-highlighter="shiki" data-ext="python" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-python"><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">from</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> django.urls </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">import</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> path</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">from</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> . </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">import</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> views</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">urlpatterns </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> [</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF">    path</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'hola/'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, views.hola_mundo),</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">]</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-4-gestion-de-dependencias-pip-y-pipenv-poetry" tabindex="-1"><a class="header-anchor" href="#_5-4-gestion-de-dependencias-pip-y-pipenv-poetry"><span>5.4. Gestión de dependencias: pip y pipenv/poetry</span></a></h3>
<p>Al igual que <strong>composer</strong> en PHP o <strong>Maven</strong> en Java, en Python usamos <strong>pip</strong> y cada vez más <strong>pipenv</strong> o <strong>poetry</strong> para manejar dependencias.</p>
<p>Un archivo <code v-pre>pyproject.toml</code> con Poetry puede verse así:</p>
<div class="language-toml line-numbers-mode" data-highlighter="shiki" data-ext="toml" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-toml"><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">[</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">tool</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">poetry</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">]</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">name</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> = </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"mi-proyecto-django"</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">version</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> = </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"0.1.0"</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">description</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> = </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"Ejemplo con Django"</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">authors</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> = [</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"Alumno FP &#x3C;alumno@example.com>"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">]</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">[</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">tool</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">poetry</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">dependencies</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">]</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">python</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> = </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"^3.11"</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">django</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> = </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"^4.2"</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">[</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">build-system</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">]</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">requires</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> = [</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"poetry-core"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">]</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">build-backend</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> = </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"poetry.core.masonry.api"</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Con esto, podemos instalar dependencias así:</p>
<div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-bash"><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">poetry</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> install</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">poetry</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> add</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> django</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_6-guias-de-desarrollo-para-los-distintos-lenguajes" tabindex="-1"><a class="header-anchor" href="#_6-guias-de-desarrollo-para-los-distintos-lenguajes"><span>6. Guías de desarrollo para los distintos lenguajes</span></a></h2>
<h3 id="_6-1-guia-de-desarrollo-para-php" tabindex="-1"><a class="header-anchor" href="#_6-1-guia-de-desarrollo-para-php"><span>6.1. Guía de desarrollo para PHP</span></a></h3>
<h3 id="_6-2-guia-de-desarrollo-para-java" tabindex="-1"><a class="header-anchor" href="#_6-2-guia-de-desarrollo-para-java"><span>6.2. Guía de desarrollo para Java</span></a></h3>
<h3 id="_6-3-guia-de-desarrollo-para-python" tabindex="-1"><a class="header-anchor" href="#_6-3-guia-de-desarrollo-para-python"><span>6.3. Guía de desarrollo para Python</span></a></h3>
</div></template>


