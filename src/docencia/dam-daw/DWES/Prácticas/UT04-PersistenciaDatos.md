---
title: Práctica UT04 Persistencia de datos
date: 2025-21-10
icon: pen
---

# Práctica UT04 Persistencia de datos

| Módulo y curso |
| --- |
| **Desarrollo Web en Entorno Servidor** |
|**Curso 2025/2026**|

:::info
**Resultados de aprendizaje a trabajar**

* RA6. Desarrolla aplicaciones de acceso a almacenes de datos, aplicando medidas para mantener la seguridad y la integridad de la información.
:::

## Objetivo
* **Objetivo principal:** 
  * **Creación de una aplicación para la gestión de tareas de una clase.**
* **Objetivos secundarios**
  * Modelar datos complejos con relaciones avanzadas en Django ORM
  * Manejar formularios avanzados con validaciones customizadas
  * Configurar y optimizar PostgreSQL en Django
  *  Aplicar migraciones con datos iniciales
  
## Enunciado de la práctica

En esta práctica deberas desarrollar una aplicación web para la gestión de tareas en un entorno educativo que permita a profesores crear y administrar diferentes tipos de tareas, y a alumnos visualizarlas y completarlas. 
* El sistema distinguirá entre tres tipos de tareas: individuales, grupales y evaluables,
* Las tareas tendrán con diferentes fórmulas para completarse según el rol de usuario: alumno o profesor.

* Como alumno podré crear tareas de los distintos tipos existentes. 
* Como alumno podré validar la finalización de una tarea, que no requiera evaluación del profesor.
* Como profesor podré validar la finalización de tareas que lo requieran.

### Listado de elementos a implementar
* **Vistas**
  * Vista en la que un alumno/profesor pueda ver sus datos.
  * Vista con el listado de todo el alumnado/profesorado.
  * Vista en la que un alumno puede ver todas las tareas que ha creado o colabora.
  * Vista en la que un profesor puede ver todas las tareas que requieren su validación.

* **Formularios**
  * Formulario para el alta del alumnado/profesorado.
  * Formulario de creación de una tarea individual (puede necesitar o no evaluación de un profesor)
  * Formulario de creación de una tarea grupal (puede necesitar o no evaluación de un profesor)
  
## Entrega

Documento pdf con los siguientes elementos: 
* Explicación de las decisiones tomadas (puede ser un copy/paste del README.md). 
* Diagrama de tablas con sus relaciones (puede desarrollarse automáticamente usando los módelos y mermaidjs u otras herramientas). 
* Enlace al proyecto Github en el que se ha desarrollado la tarea. (Debe de tener los commits necesarios para validar que el proyecto se ha realizado siguiendo buenas prácticas de dearrollo)

## Aclaraciones
::: important 
La entrega de esta prácticas es **OBLIGATORIA** para poder acceder al examen parcial de Febrero.
:::

* La valoración de la práctica será APTO/NO APTO en función de que se alcancen los mínimos: creación de usuarios, creación de tareas, etc. 
* Cada alumn@ deberá valorar el nivel de complejidad que crea necesario para la práctica. 
* No es obligatorio crear un frontend más allá de los formulario y vistas. 
* Es MUY IMPORTANTE que se vayan realizando commits y mantengan las buenas prácticas. Una práctica con un solo commit o varios, que no demuestren un trabajo continuo (todo hecho en 4 min con un copy/paste) se valorarán como NO APTAS.
* No es obligatorio montar sistema de validación de roles. Esa parte se trabajará más adelante.
* Los datos deben almacenarse en un esquema de Posgres.
* La valoración de la práctica también tendrá en cuenta aquellas tareas/elementos que sin ser plenamente funcionales (por errores) siempre que se incluya una explicación de posibles causas del error o pruebas para su subsanación intentadas.

## Rúbrica de evaluación

1. Errores críticos (provocan NO APTO):
* No compila/se levanta el servidor.
* No funciona la creación de usuarios o tareas.
* Base de datos no configurada o migraciones fallidas.

| #     | Criterio                       | Mínimo para ALCANZA                                                                                                                                                                                                 | Evaluación           |
| ----- | ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- |
| **1** | **Modelado de Datos**          | User extendido (`AbstractUser` o `OneToOneField`). Modelos para **3 tipos de tareas** (individual, grupal, evaluable) con relaciones correctas (FK, M2M). Mínimo 3 modelos principales con migraciones funcionales. | ALCANZA / NO ALCANZA |
| **2** | **Formularios y Validaciones** | Formularios funcionales para: **creación de usuario** y **creación de tarea** (al menos 1 tipo completo). Validaciones básicas implementadas (ej: fecha entrega > creación). Sin errores 500 al guardar.            | ALCANZA / NO ALCANZA |
| **3** | **Vistas y Lógica**            | **2 vistas mínimas** funcionales: (1) "Mis tareas" (alumno/profesor) y (2) Listado de usuarios. Sin errores al acceder o enviar datos.                                             | ALCANZA / NO ALCANZA |
| **4** | **Configuración PostgreSQL**   | `settings.py` con `ENGINE='django.db.backends.postgresql'`, NAME, USER, PASSWORD definidos. `psycopg2` en requirements. Conexión funcional verificable.                                                             | ALCANZA / NO ALCANZA |
| **5** | **Migraciones y Datos**        | Comando `migrate` ejecuta sin errores. Fixtures o datos iniciales creados (superuser + datos de prueba documentados). No se permite base de datos vacía sin instrucciones.                                          | ALCANZA / NO ALCANZA |
| **6** | **Buenas Prácticas Git**       | Commits distribuidos en **diferentes días** (evidencia de trabajo continuo). Mensajes descriptivos. `.gitignore` presente. **Commits masivos último día → NO APTO** automático si no hay trabajo previo.            | ALCANZA / NO ALCANZA |
| **7** | **Documentación y Entrega**    | PDF con: explicación de decisiones, **diagrama ER** (mermaid o screenshot), enlace GitHub funcional. Documenta errores conocidos si existen.                                                                        | ALCANZA / NO ALCANZA |
