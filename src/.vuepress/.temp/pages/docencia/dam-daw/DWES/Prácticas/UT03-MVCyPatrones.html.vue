<template><div><h1 id="practica-ut03-mvc-y-otros-patrones" tabindex="-1"><a class="header-anchor" href="#practica-ut03-mvc-y-otros-patrones"><span>Práctica UT03 MVC y otros patrones</span></a></h1>
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
<li>RA5. Desarrolla aplicaciones Web identificando y aplicando mecanismos para separar el código de presentación de la lógica de negocio.</li>
</ul>
</div>
<h2 id="objetivos-de-la-practica" tabindex="-1"><a class="header-anchor" href="#objetivos-de-la-practica"><span>Objetivos de la práctica</span></a></h2>
<ul>
<li>Comprender la arquitectura <strong>Modelo–Vista–Controlador (MVC)</strong> aplicada a Django (Modelo–Vista–Template).</li>
<li>Aprender a <strong>crear, estructurar y ejecutar un proyecto Django desde cero</strong>.</li>
<li>Diseñar una <strong>aplicación web funcional</strong> que permita <strong>crear, listar, editar y eliminar tareas</strong>.</li>
<li>Utilizar <strong>patrones de diseño</strong> y buenas prácticas de organización del código.</li>
</ul>
<h2 id="parte-1-—-creacion-del-proyecto-django" tabindex="-1"><a class="header-anchor" href="#parte-1-—-creacion-del-proyecto-django"><span>Parte 1 — Creación del proyecto Django</span></a></h2>
<h3 id="_1-1-estructura-basica" tabindex="-1"><a class="header-anchor" href="#_1-1-estructura-basica"><span>1.1. Estructura básica</span></a></h3>
<ol>
<li>
<p>Crear un nuevo proyecto Django:</p>
<div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-bash"><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">django-admin</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> startproject</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> tareas_dwes</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div></li>
<li>
<p>Acceder al directorio del proyecto:</p>
<div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-bash"><span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">cd</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> tareas_project</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div></li>
<li>
<p>Crear la aplicación principal:</p>
<div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-bash"><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">python</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> manage.py</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> startapp</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> tareas</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div></li>
<li>
<p>Registrar la app <code v-pre>tareas</code> en <code v-pre>settings.py</code> dentro de <code v-pre>INSTALLED_APPS</code>.</p>
</li>
<li>
<p>Ejecutar las migraciones iniciales:</p>
<div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-bash"><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">python</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> manage.py</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> migrate</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div></li>
<li>
<p>Verificar el funcionamiento:</p>
<div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-bash"><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">python</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> manage.py</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> runserver</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div></li>
</ol>
<div class="hint-container important">
<p class="hint-container-title">💡 El servidor debe ejecutarse correctamente y mostrar la página por defecto de Django.</p>
</div>
<div class="hint-container important">
<p class="hint-container-title">Importante</p>
<p>Una vez llegados a este punto y con todo funcionado, debes crear un <strong>commit</strong> con el texto <code v-pre>Estructura básica funcionando</code></p>
</div>
<!--
## Parte 2 — Desarrollo de la aplicación “Tareas”

### 2.1. Modelo (M)

En `tareas/models.py`, crear un modelo `Tarea` con los siguientes campos:

| Campo                 | Tipo                               | Descripción                 |
| ----------------      | ---------------------------------- | --------------------------- |
| `id`                  | UUIDField (primary key)            | Identificador único         |
| `titulo`              | CharField                          | Nombre o título de la tarea |
| `descripcion`         | TextField                          | Descripción detallada       |
| `completada`          | BooleanField (por defecto `False`) | Estado de la tarea          |
| `fecha_creacion`      | DateTimeField (auto_now_add=True)  | Fecha de creación           |
| `fecha_recordatorio`  | DateTimeField                      | Fecha recordatorio          |

> 💡 Añade el método `__str__()` para mostrar el título de la tarea en el panel de administración.

::: important
Para realizar este apartado, utiliza como base el modelo que hemos creado en el ejercicio de videotutoría. 

Cuando tengas el modelo creado correctamente (la aplicación se puede correr sin problemas) debes crear un **commit** con el texto `Modelo funcionando`
:::

### 2.2. Vistas (V)

En `tareas/views.py`, implementar las siguientes vistas (funciones que realizan las tareas):

| Nombre           | Tipo         | Descripción                           |
| ---------------- | ------------ | ------------------------------------- |
| `lista_tareas`   | `ListView`   | Muestra todas las tareas              |
| `detalle_tarea`  | `DetailView` | Muestra el detalle de una tarea       |
| `crear_tarea`    | `CreateView` | Permite crear una nueva tarea         |
| `editar_tarea`   | `UpdateView` | Permite modificar una tarea existente o borrarla |
| `borrar_tarea`   | `DeleteView` | Permite borrar la tarea|

::: important
Cuando tengas las vistas creadas correctamente (la aplicación se puede correr sin problemas) debes crear un **commit** con el texto `Vistas funcionando`

No es necesario que todas tengan una implementación completa, puedes ir haciendo más commits una vez creado el primero con las vistas base, para ir ampliándolas.
:::
### 2.3. URLs (C)

En `tareas/urls.py`:

* Crear las rutas correspondientes a cada vista.
* Incluir el fichero `tareas/urls.py` en el `urls.py` principal del proyecto.

::: important
Cuando tengas las vistas creadas correctamente (la aplicación se puede correr sin problemas) debes crear un **commit** con el texto `Vistas funcionando`
:::

### 2.4. Templates (T)

Crear una carpeta `templates/tareas` con los siguientes archivos:

| Archivo                   | Descripción                                           |
| ------------------------- | ----------------------------------------------------- |
| `base.html`               | Plantilla base con encabezado y menú                  |
| `lista_tareas.html`       | Lista de tareas con enlaces a detalle/editar/eliminar |
| `detalle_tarea.html`      | Muestra información detallada de la tarea             |
| `form_tarea.html`         | Formulario común para crear y editar                  |
| `confirmar_eliminar.html` | Confirmación antes de eliminar                        |

> 💡 Utiliza herencia de plantillas (`{% extends "base.html" %}`) y bloques (`{% block content %}`).

-->
<h2 id="🚀-entrega" tabindex="-1"><a class="header-anchor" href="#🚀-entrega"><span>🚀 Entrega</span></a></h2>
<ol>
<li>
<p>Subir el proyecto completo a GitHub con el nombre:</p>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-"><span class="line"><span>DWES-UT03-Practica-2025-2026</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div></li>
<li>
<p>Asegurarse de incluir:</p>
<ul>
<li>Carpeta del proyecto Django (<code v-pre>tareas_dwes/</code>)</li>
<li>PDF con las capturas de la ejecución de los pasos más importantes y del proyecto final.</li>
<li>Archivo <code v-pre>.gitignore</code> (puedes generar uno para Django desde <a href="https://www.toptal.com/developers/gitignore" target="_blank" rel="noopener noreferrer">gitignore.io</a>)</li>
</ul>
</li>
</ol>
</div></template>


