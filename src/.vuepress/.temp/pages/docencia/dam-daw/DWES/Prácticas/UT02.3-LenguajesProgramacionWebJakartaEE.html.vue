<template><div><h1 id="practica-ut002-3-lenguajes-de-programacion-web-jakarta-ee" tabindex="-1"><a class="header-anchor" href="#practica-ut002-3-lenguajes-de-programacion-web-jakarta-ee"><span>Práctica UT002.3 Lenguajes de Programacion Web. Jakarta EE</span></a></h1>
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
<p><strong>Resultados de aprendizaje a trabajar</strong></p>
<ul>
<li>RA2: Escribe sentencias ejecutables por un servidor Web reconociendo y aplicando procedimientos de integración del código en lenguajes de marcas.</li>
<li>RA3. Escribe bloques de sentencias embebidos en lenguajes de marcas, seleccionando y utilizando las estructuras de programación.</li>
</ul>
</div>
<h2 id="🎯-objetivos" tabindex="-1"><a class="header-anchor" href="#🎯-objetivos"><span>🎯 Objetivos</span></a></h2>
<ul>
<li>Ampliar el uso de <strong>beans en JSF</strong> para manejar listas de objetos complejos.</li>
<li>Utilizar <strong>bucles (<code v-pre>ui:repeat</code> / <code v-pre>h:dataTable</code>)</strong> para recorrer colecciones de usuarios.</li>
<li>Introducir un <strong>mapa de pagos mensuales</strong> asociado a cada usuario.</li>
<li>Mostrar información dinámica en una <strong>tabla HTML</strong> generada desde la vista JSF.</li>
<li>Emplear <strong>condicionales</strong> para resaltar meses no pagados.</li>
</ul>
<h2 id="📝-enunciado-de-la-practica" tabindex="-1"><a class="header-anchor" href="#📝-enunciado-de-la-practica"><span>📝 Enunciado de la práctica</span></a></h2>
<p>Se parte del bean <strong>HelloBean</strong> y la página <strong>index.xhtml</strong> del ejercicio02.</p>
<ol>
<li>
<p><strong>Modificar el bean</strong> para que, en lugar de contener un único usuario, gestione un <strong>array/lista de varios usuarios</strong>.</p>
<ul>
<li>
<p>Cada usuario tendrá los atributos:</p>
<ul>
<li><code v-pre>nombre</code></li>
<li><code v-pre>apellidos</code></li>
<li><code v-pre>dni</code></li>
<li><code v-pre>email</code></li>
<li><code v-pre>edad</code></li>
<li><code v-pre>Map&lt;String, Double&gt; pagos</code> → donde la clave es el nombre del mes y el valor es la cantidad abonada (o <code v-pre>null</code> si no ha pagado).</li>
</ul>
</li>
</ul>
</li>
<li>
<p><strong>Ampliar el <code v-pre>index.xhtml</code></strong> para que:</p>
<ul>
<li>
<p>Recorra con un <strong>bucle</strong> (<code v-pre>ui:repeat</code> o <code v-pre>h:dataTable</code>) la lista de usuarios.</p>
</li>
<li>
<p>Muestre en una tabla los <strong>datos personales</strong> de cada usuario.</p>
</li>
<li>
<p>Liste los <strong>pagos mensuales</strong>:</p>
<ul>
<li>Si el mes está pagado, se mostrará el importe.</li>
<li>Si el mes no está pagado, se resaltará con un estilo en rojo el texto <strong>&quot;NO PAGADO&quot;</strong>.</li>
</ul>
</li>
<li>
<p>Al final de cada tabla, debe aparecer el <strong>total anual de pagos</strong> del usuario.</p>
</li>
</ul>
</li>
<li>
<p>Añadir un <strong>condicional</strong> para mostrar un mensaje:</p>
<ul>
<li>Si el total de pagos es inferior a 100 €, mostrar en rojo <strong>&quot;El usuario no está al día con la cuota&quot;</strong>.</li>
<li>En caso contrario, mostrar en verde <strong>&quot;El usuario está al corriente de pagos&quot;</strong>.</li>
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
</div></template>


