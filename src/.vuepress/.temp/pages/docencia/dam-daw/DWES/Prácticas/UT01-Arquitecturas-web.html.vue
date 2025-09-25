<template><div><h1 id="practica-ut01-arquitecturas-web" tabindex="-1"><a class="header-anchor" href="#practica-ut01-arquitecturas-web"><span>Práctica UT01. Arquitecturas web</span></a></h1>
<table>
<thead>
<tr>
<th>Módulo y curso</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>Desarrollo Web en Entorno Servidor</strong></td>
</tr>
<tr>
<td><strong>Curso 2025/2026</strong></td>
</tr>
</tbody>
</table>
<div class="hint-container info">
<p class="hint-container-title">Información</p>
<p><strong>Resultados de aprendizaje a trabajar</strong><br>
RA1</p>
</div>
<h2 id="objetivo" tabindex="-1"><a class="header-anchor" href="#objetivo"><span>Objetivo</span></a></h2>
<p>Con esta práctica se pretende que el alumnado se familiarice con:</p>
<ul>
<li>La creación y uso de una cuenta en GitHub.</li>
<li>La clonación de proyectos remotos en un entorno local.</li>
<li>La publicación de páginas web estáticas en su servidor Apache local.</li>
<li>La modificación de código HTML existente.</li>
<li>El flujo de trabajo básico con GitHub (clonación, modificación, pull request).</li>
<li>La verificación de peticiones HTTP entre cliente y servidor.</li>
</ul>
<h2 id="enunciado-de-la-practica" tabindex="-1"><a class="header-anchor" href="#enunciado-de-la-practica"><span>Enunciado de la práctica</span></a></h2>
<p>Se proporcionará al alumnado un repositorio de GitHub con un proyecto inicial. A partir de él deberán realizar las siguientes tareas:</p>
<ol>
<li>
<p><strong>Crear una cuenta en GitHub</strong></p>
<ul>
<li>Si no dispones de una, regístrate en <a href="https://github.com" target="_blank" rel="noopener noreferrer">https://github.com</a>.</li>
<li>Configura un nombre de usuario y correo válido.</li>
</ul>
</li>
<li>
<p><strong>Clonar el proyecto</strong></p>
<ul>
<li>
<p>Accede al repositorio:<br>
👉 <a href="https://github.com/darioaxel/DWES-UT01-Practica-2025-2026" target="_blank" rel="noopener noreferrer">https://github.com/darioaxel/DWES-UT01-Practica-2025-2026</a></p>
</li>
<li>
<p>Haz un fork del repositorio en tu cuenta de GitHub.</p>
</li>
<li>
<p>Clona tu fork en tu equipo local mediante:</p>
<div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-bash"><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">git</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> clone</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> https://github.com/</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">&#x3C;</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">TU_USUARI</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">O></span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">/DWES-UT01-Practica-2025-2026.git</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div></li>
</ul>
</li>
<li>
<p><strong>Publicar la web en Apache</strong></p>
<ul>
<li>Localiza el archivo HTML proporcionado en el repositorio.</li>
<li>Copia el proyecto dentro del directorio raíz de tu servidor Apache local (ejemplo: <code v-pre>/var/www/html/</code> en Linux, <code v-pre>htdocs/</code> en XAMPP para Windows).</li>
<li>Accede desde el navegador a <a href="http://localhost" target="_blank" rel="noopener noreferrer">http://localhost</a> y comprueba que la web inicial se muestra correctamente.</li>
</ul>
</li>
<li>
<p><strong>Ampliar el HTML</strong></p>
<ul>
<li>
<p>El archivo contiene una <em>card</em> con información de ejemplo.</p>
</li>
<li>
<p>Debes <strong>duplicar</strong> esa card y, en la nueva, <strong>rellenar tus datos personales</strong>:</p>
<ul>
<li>Imagen de perfil.</li>
<li>Nombre y apellidos.</li>
<li>Dirección de correo electrónico.</li>
</ul>
</li>
<li>
<p>Mantén el mismo estilo visual que el original.</p>
</li>
</ul>
</li>
<li>
<p><strong>Verificar comunicación HTTP</strong></p>
<ul>
<li>
<p>Accede de nuevo a la web en <a href="http://localhost" target="_blank" rel="noopener noreferrer">http://localhost</a>.</p>
</li>
<li>
<p>Abre las herramientas de desarrollo del navegador (F12 → pestaña <em>Network</em>).</p>
</li>
<li>
<p>Realiza una captura de pantalla en la que se observe:</p>
<ul>
<li>La petición GET al servidor.</li>
<li>La respuesta obtenida.</li>
<li>La visualización de la web en el navegador.</li>
</ul>
</li>
</ul>
</li>
<li>
<p><strong>Subir cambios a GitHub</strong></p>
<ul>
<li>
<p>Añade y confirma los cambios en tu repositorio local:</p>
<div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-bash"><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">git</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> add</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> .</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">git</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> commit</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -m</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> "Añadida nueva card con mis datos"</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">git</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> push</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> origin</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> main</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>Accede a tu repositorio en GitHub y crea un <strong>pull request</strong> hacia el repositorio original para proponer tus cambios.</p>
</li>
</ul>
</li>
</ol>
<h2 id="entrega" tabindex="-1"><a class="header-anchor" href="#entrega"><span>Entrega</span></a></h2>
<p>La entrega de la práctica consistirá en un documento PDF, debidamente formateado, que se subirá al Moodle del centro donde se incluirá:</p>
<ul>
<li>Capturas del <strong>proceso de modificación del html</strong>.</li>
<li>La <strong>captura de pantalla</strong> donde se muestre la petición GET y la respuesta del servidor en <code v-pre>localhost</code>.</li>
<li>La <strong>URL del pull request</strong> realizado sobre el repositorio original.</li>
</ul>
<hr>
<h2 id="criterios-de-evaluacion" tabindex="-1"><a class="header-anchor" href="#criterios-de-evaluacion"><span>Criterios de evaluación</span></a></h2>
<ul class="task-list-container">
<li class="task-list-item"><input type="checkbox" class="task-list-item-checkbox" id="task-item-0" disabled="disabled"><label class="task-list-item-label" for="task-item-0"> Se ha creado correctamente la cuenta de GitHub y clonado el repositorio.</label></li>
<li class="task-list-item"><input type="checkbox" class="task-list-item-checkbox" id="task-item-1" disabled="disabled"><label class="task-list-item-label" for="task-item-1"> Se ha publicado la web en Apache local.</label></li>
<li class="task-list-item"><input type="checkbox" class="task-list-item-checkbox" id="task-item-2" disabled="disabled"><label class="task-list-item-label" for="task-item-2"> Se ha duplicado la card y personalizado con los datos del alumno.</label></li>
<li class="task-list-item"><input type="checkbox" class="task-list-item-checkbox" id="task-item-3" disabled="disabled"><label class="task-list-item-label" for="task-item-3"> Se ha realizado la captura de la petición GET y respuesta del servidor.</label></li>
<li class="task-list-item"><input type="checkbox" class="task-list-item-checkbox" id="task-item-4" disabled="disabled"><label class="task-list-item-label" for="task-item-4"> Se ha generado correctamente el pull request en GitHub.</label></li>
</ul>
<hr>
</div></template>


