---
title: Práctica UT03 MVC y ...
date: 2025-20-10
icon: pen
---

# Práctica UT03 MVC y otros patrones

| Módulo y curso |
| --- |
| **Desarrollo Web en Entorno Servidor** |
|**Curso 2025/2026**|

:::info
**Resultados de aprendizaje a trabajar**
- RA5. Desarrolla aplicaciones Web identificando y aplicando mecanismos para separar el código de presentación de la lógica de negocio.

:::

## Objetivos de la práctica

* Comprender la arquitectura **Modelo–Vista–Controlador (MVC)** aplicada a Django (Modelo–Vista–Template).
* Aprender a **crear, estructurar y ejecutar un proyecto Django desde cero**.
* Diseñar una **aplicación web funcional** que permita **crear, listar, editar y eliminar tareas**.
* Utilizar **patrones de diseño** y buenas prácticas de organización del código.


## Parte 1 — Creación del proyecto Django

### 1.1. Estructura básica

1. Crear un nuevo proyecto Django:

   ```bash
   django-admin startproject tareas_dwes
   ```

2. Acceder al directorio del proyecto:

   ```bash
   cd tareas_project
   ```

3. Crear la aplicación principal:

   ```bash
   python manage.py startapp tareas
   ```

4. Registrar la app `tareas` en `settings.py` dentro de `INSTALLED_APPS`.

5. Ejecutar las migraciones iniciales:

   ```bash
   python manage.py migrate
   ```

6. Verificar el funcionamiento:

   ```bash
   python manage.py runserver
   ```

::: important 💡 El servidor debe ejecutarse correctamente y mostrar la página por defecto de Django.
:::

::: important
Una vez llegados a este punto y con todo funcionado, debes crear un **commit** con el texto `Estructura básica funcionando`
:::

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

## 🚀 Entrega

1. Subir el proyecto completo a GitHub con el nombre:

   ```
   DWES-UT03-Practica-2025-2026
   ```
2. Asegurarse de incluir:

   * Carpeta del proyecto Django (`tareas_dwes/`)
   * PDF con las capturas de la ejecución de los pasos más importantes y del proyecto final. 
   * Archivo `.gitignore` (puedes generar uno para Django desde [gitignore.io](https://www.toptal.com/developers/gitignore))


