<template><div><h1 id="ut00-introduccion" tabindex="-1"><a class="header-anchor" href="#ut00-introduccion"><span>UT00 Introducción</span></a></h1>
<p>El módulo Desarrollo Web en Entorno Servidor (DWES) es el de mayor cantidad de horas de trabajo dentro del segundo curso del ciclo DAW.</p>
<p>Este módulo profesional tiene como objetivo principal capacitar a los estudiantes en el desarrollo de aplicaciones web dinámicas y funcionales utilizando tecnologías del lado del servidor. A lo largo del curso, los estudiantes aprenderán a diseñar, implementar y mantener aplicaciones web que interactúan con bases de datos, gestionan sesiones de usuario y proporcionan una experiencia de usuario enriquecida.</p>
<p>Para lograr estos objetivos, se abordarán multiples aspectos cruciales dentro del desarrollo de aplicaciones:</p>
<ul>
<li>Se trabajará con herramientas de control de versiones e IDEs modernos.</li>
<li>Se profundizará en el conocimiento de arquitecturas y patrones de desarrollo.</li>
<li>Se estudiarán diversos protocolos de comunicaciones entre servidores y clientes.</li>
<li>Se implementaran soluciones para administrar la seguridad de sitios web.</li>
<li>Se abordarán las técnicas de testing de aplicaciones y el desarrollo de test en entornos web.</li>
<li>Y, sobretodo, se aprenderá a programar en múltiples lenguajes aplicando los conocimientos del módulo de primero.</li>
</ul>
<p>Debido a la complejidad del contenido que se abordará en el módulo, es fundamental que los estudiantes tengan una base sólida de conocimientos.</p>
<p>Aunque la mayoría de los siguientes temas se han tratado en módulos del primer curso, se recomienda refrescar los conocimientos utilizando los recursos que se proporcionan en esta unidad.</p>
<p>Para todo aquel alumnado que no haya visto alguno de los temas que se listan a continuación, será<br>
necesario que dedique tiempo a estudiar y comprender estos conceptos antes de avanzar en el módulo DWES.</p>
<h2 id="_1-entornos-de-desarrollo-ides-visual-studio-code" tabindex="-1"><a class="header-anchor" href="#_1-entornos-de-desarrollo-ides-visual-studio-code"><span>1. Entornos de Desarrollo IDEs - Visual Studio Code</span></a></h2>
<p>El ecosistema de herramientas en el entorno web es amplio, rico y en constante evolución. Es por ello que hacer una lista exhaustiva se hace difícil, y puede quedar obsoleta en unos pocos meses. En este <a href="https://kinsta.com/es/blog/herramientas-desarrollo-web/" target="_blank" rel="noopener noreferrer">enlace</a> se propone una muestra de estas herramientas.</p>
<p>Algunas de estas herramientas te resultarán familiares, otras las utilizarás en tu futura vida profesional o no (dependiendo del campo en que te especialices), y otras muchas serán sustituidas o dejarán de ser usadas.</p>
<p>Durante este curso podrás utilizar el IDE o editor de texto de tu elección. <a href="https://code.visualstudio.com/" target="_blank" rel="noopener noreferrer">Visual Studio Code</a> (para cualquier lenguaje de programación) o <a href="https://www.jetbrains.com/es-es/pycharm/" target="_blank" rel="noopener noreferrer">PyCharm</a> (para Python) son la opción recomendada.</p>
<p>Como fuentes de consulta de problemas específicos, <a href="https://www.jetbrains.com/es-es/pycharm/" target="_blank" rel="noopener noreferrer">StackOverflow</a> es una de las plataformas más utilizadas.</p>
<p>Finalmente, como base para lenguajes de programación y de marcado, o como repaso del primer curso del ciclo, te puedes apoyar en los manuales de <a href="www.w3schools.org">W3CSchools</a>.</p>
<h2 id="_2-control-de-versiones" tabindex="-1"><a class="header-anchor" href="#_2-control-de-versiones"><span>2. Control de Versiones</span></a></h2>
<ul>
<li><em><strong>¿Qué es un sistema de control de versiones?</strong></em></li>
</ul>
<p>Un Sistema de Control de Versiones (VCS) es una herramienta que registra los cambios realizados sobre un archivo o conjunto de archivos a lo largo del tiempo, de modo que puedas recuperar versiones específicas más adelante. Git es un sistema de control de versiones distribuido, diseñado para gestionar y rastrear cambios en archivos y proyectos de software. Fue creado por Linus Torvalds en 2005 como una alternativa al sistema de control de versiones centralizado llamado Subversion (SVN).</p>
<ul>
<li><em><strong>Git y GitHub</strong></em></li>
</ul>
<p>Linus Torvalds creó Git en 2005 como respuesta directa a una situación urgente: la comunidad del núcleo Linux perdió el acceso gratuito a BitKeeper, el sistema propietario de control de versiones que empleaban desde 2002. Torvalds sintió que ninguna alternativa existente, como CVS o Subversion, era suficientemente rápida ni adecuada para el gran volumen de archivos que manejaba el kernel de Linux.</p>
<p>Movido por la necesidad, diseñó Git en apenas diez días para lograr eficiencia, estabilidad y descentralización, permitiendo que cada copia de un repositorio fuera autónoma y completa, sin depender de servidores centrales<br>
Git permite a los desarrolladores trabajar en colaboración en un proyecto, manteniendo un historial completo de todos los cambios realizados en los archivos. Cada vez que se realiza una modificación en un archivo, Git registra esos cambios y permite a los desarrolladores rastrear quién hizo cada cambio, cuándo se realizó y qué se modificó específicamente.</p>
<p>Una de las características destacadas de Git es su capacidad para trabajar de forma distribuida. Esto significa que <strong>cada desarrollador tiene una copia completa del repositorio de Git en su máquina local</strong>, lo que les permite trabajar de manera independiente y luego <strong>fusionar</strong> sus cambios cuando sea necesario. Esto facilita la colaboración en equipos distribuidos y permite trabajar sin conexión a internet.</p>
<p>Git utiliza una <strong>estructura de árbol de commits</strong> para mantener un historial de versiones. Los commits representan instantáneas de los archivos en un momento dado y se organizan en ramas, que permiten el desarrollo paralelo de diferentes características o soluciones.</p>
<p>Además, Git ofrece herramientas para crear ramas, fusionar cambios, revertir modificaciones y resolver conflictos cuando dos o más personas modifican el mismo archivo simultáneamente.</p>
<ul>
<li><em><strong>Documentación para aprender a usar Git</strong></em></li>
</ul>
<p>En los dos enlaces que se proporcionan a continuación, puedes encontrar documentación oficial y tutoriales para aprender a usar Git y GitHub:</p>
<ul>
<li><a href="https://iescelia.org/docs/dwes/_site/scv-git/" target="_blank" rel="noopener noreferrer">Apuntes IES Celia Viñas (Almería)</a></li>
<li><a href="https://github.com/joseluisgs/git-tutorial" target="_blank" rel="noopener noreferrer">Apuntes de Jose Luis GS</a></li>
</ul>
<h2 id="_3-tecnologias" tabindex="-1"><a class="header-anchor" href="#_3-tecnologias"><span>3. Tecnologías</span></a></h2>
<p>Al igual que en las herramientas de programación, el ecosistema de tecnologías alrededor de las aplicaciones web también es muy variado, rico, y en constante evolución. Continuamente surgen nuevas versiones de las tecnologías existentes (que rompen con las anteriores), o tecnologías/frameworks/librerías novedosas a los que se adhieren multitud de profesionales. Todo ello hace que la curva de aprendizaje inicial en el ámbito de las aplicaciones web sea más acusada en un principio.</p>
<p>A continuación se presentan algunas de estas tecnologías, agrupadas por tipología.</p>
<ol>
<li>
<p>Virtualización</p>
<ul>
<li>Proxmox</li>
<li>Docker</li>
<li>Kubernetes</li>
</ul>
</li>
<li>
<p>Servidores web</p>
<ul>
<li>Nginx</li>
<li>Apache</li>
</ul>
</li>
<li>
<p>Sevidores de aplicaciones</p>
<ul>
<li>Payara</li>
<li>Tomcat</li>
<li>GlassFish</li>
<li>DenoJS</li>
<li>Flask</li>
</ul>
</li>
<li>
<p>Gestores de BBDD</p>
<ul>
<li>MySQL</li>
<li>PostgreSQL</li>
<li>Oracle</li>
<li>SQLServer</li>
<li>MongoDB</li>
<li>Redis</li>
</ul>
</li>
<li>
<p>Frameworks servidor</p>
</li>
<li>
<p>Frameworks backend más populares.</p>
<ul>
<li>Django</li>
<li>Jakarta EE</li>
<li>Spring Boot</li>
<li>ExpressJS</li>
<li>Laravel</li>
</ul>
</li>
<li>
<p>Frameworks frontend más populares.</p>
<ul>
<li>VueJS</li>
<li>ReactJS</li>
<li>AngularJS</li>
<li>Svelte</li>
</ul>
</li>
</ol>
<h3 id="_3-1-navegadores-tipos-y-caracteristicas" tabindex="-1"><a class="header-anchor" href="#_3-1-navegadores-tipos-y-caracteristicas"><span>3.1. Navegadores. Tipos y características</span></a></h3>
<p>Dado que el entorno de ejecución en el lado cliente es el navegador web, se ha dedicado un apartado exclusivamente para caracterizar este tipo de software.</p>
<p>Los navegadores representan un software complejo, en constante evolución, y en el que las diferentes opciones del mercado están respaldadas por motivaciones diversas (detrás de algunos existe una empresa multinacional, otros están respaldados por una comunidad de desarrolladores, etc.), así como diferentes principios de desarrollo.</p>
<p>En la siguiente tabla se resumen algunas de las características que diferencia a diferentes navegadores:</p>
<p>| Criterio | Comparativa| !<br>
Etiquetado HTML	| HTML Reference - Browser Support|<br>
Etiquetado CSS	CSS Browser Support Reference|<br>
Rendimiento	Browser performance|<br>
Velocidad	The Fastest Browser Options in 2022|<br>
Seguridad	Navegadores seguros: comparativa de Chrome, Firefox, Brave y otros|</p>
<h2 id="_4-estandares-web" tabindex="-1"><a class="header-anchor" href="#_4-estandares-web"><span>4. Estándares web</span></a></h2>
<p>Dada la gran cantidad de tecnologías y navegadores utilizados en el lado cliente, existe la voluntad de estandarizar determinados aspectos que gobiernan estas tecnologías, en forma de especificaciones emitidas por organismos reconocidos como oficiales. Se trata de que los diferentes desarrolladores tengan suficiente libertad para ser competitivos, pero sin que el panorama se disperse excesivamente.</p>
<p>A continuación se citan varios de estos estándares:</p>
<ul>
<li><strong>HTML5:</strong> del W3C (Consorcio de la World Wide Web)</li>
<li><strong>CSS:</strong> también del W3C</li>
<li><strong>ECMAScript:</strong> aplicado a JavaScript, y desarrollado por ECMA International (organización internacional basada en membresías de estándares para la comunicación y la información)<br>
En este artículo se discute la necesidad de los estándares web, como visión general.</li>
</ul>
<h2 id="_5-enlaces-de-interes" tabindex="-1"><a class="header-anchor" href="#_5-enlaces-de-interes"><span>5. Enlaces de interés</span></a></h2>
<ul>
<li>Entrevista especial a Linus Torvalds por el 20º aniversario, organizada por GitHub: <RouteLink to="/docencia/dam-daw/DWES/skatox.com/blog/2025/06/23/entrevista-a-linus-torvalds-por-los-20-anos-de-git/">Enlace</RouteLink></li>
</ul>
</div></template>


