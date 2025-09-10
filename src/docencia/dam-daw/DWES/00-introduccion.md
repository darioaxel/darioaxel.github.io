---
title: UT00 Introducción
date: 2024-09-01    
icon: rocket
---

# UT00 Introducción

El módulo Desarrollo Web en Entorno Servidor (DWES) es el de mayor cantidad de horas de trabajo dentro del segundo curso del ciclo DAW. 

Este módulo profesional tiene como objetivo principal capacitar a los estudiantes en el desarrollo de aplicaciones web dinámicas y funcionales utilizando tecnologías del lado del servidor. A lo largo del curso, los estudiantes aprenderán a diseñar, implementar y mantener aplicaciones web que interactúan con bases de datos, gestionan sesiones de usuario y proporcionan una experiencia de usuario enriquecida.

Para lograr estos objetivos, se abordarán multiples aspectos cruciales dentro del desarrollo de aplicaciones:
 * Se trabajará con herramientas de control de versiones e IDEs modernos.
 * Se profundizará en el conocimiento de arquitecturas y patrones de desarrollo.
 * Se estudiarán diversos protocolos de comunicaciones entre servidores y clientes.
 * Se implementaran soluciones para administrar la seguridad de sitios web.
 * Se abordarán las técnicas de testing de aplicaciones y el desarrollo de test en entornos web.
 * Y, sobretodo, se aprenderá a programar en múltiples lenguajes aplicando los conocimientos del módulo de primero.

Debido a la complejidad del contenido que se abordará en el módulo, es fundamental que los estudiantes tengan una base sólida de conocimientos. 

Aunque la mayoría de los siguientes temas se han tratado en módulos del primer curso, se recomienda refrescar los conocimientos utilizando los recursos que se proporcionan en esta unidad.

Para todo aquel alumnado que no haya visto alguno de los temas que se listan a continuación, será 
necesario que dedique tiempo a estudiar y comprender estos conceptos antes de avanzar en el módulo DWES.

## 1. Entornos de Desarrollo IDEs - Visual Studio Code

El ecosistema de herramientas en el entorno web es amplio, rico y en constante evolución. Es por ello que hacer una lista exhaustiva se hace difícil, y puede quedar obsoleta en unos pocos meses. En este [enlace](https://kinsta.com/es/blog/herramientas-desarrollo-web/) se propone una muestra de estas herramientas.

Algunas de estas herramientas te resultarán familiares, otras las utilizarás en tu futura vida profesional o no (dependiendo del campo en que te especialices), y otras muchas serán sustituidas o dejarán de ser usadas.

Durante este curso podrás utilizar el IDE o editor de texto de tu elección. [Visual Studio Code](https://code.visualstudio.com/) (para cualquier lenguaje de programación) o [PyCharm](https://www.jetbrains.com/es-es/pycharm/) (para Python) son la opción recomendada.

Como fuentes de consulta de problemas específicos, [StackOverflow](https://www.jetbrains.com/es-es/pycharm/) es una de las plataformas más utilizadas.

Finalmente, como base para lenguajes de programación y de marcado, o como repaso del primer curso del ciclo, te puedes apoyar en los manuales de [W3CSchools](www.w3schools.org).

## 2. Control de Versiones
* ***¿Qué es un sistema de control de versiones?***

Un Sistema de Control de Versiones (VCS) es una herramienta que registra los cambios realizados sobre un archivo o conjunto de archivos a lo largo del tiempo, de modo que puedas recuperar versiones específicas más adelante. Git es un sistema de control de versiones distribuido, diseñado para gestionar y rastrear cambios en archivos y proyectos de software. Fue creado por Linus Torvalds en 2005 como una alternativa al sistema de control de versiones centralizado llamado Subversion (SVN).
* ***Git y GitHub*** 

Linus Torvalds creó Git en 2005 como respuesta directa a una situación urgente: la comunidad del núcleo Linux perdió el acceso gratuito a BitKeeper, el sistema propietario de control de versiones que empleaban desde 2002. Torvalds sintió que ninguna alternativa existente, como CVS o Subversion, era suficientemente rápida ni adecuada para el gran volumen de archivos que manejaba el kernel de Linux. 

Movido por la necesidad, diseñó Git en apenas diez días para lograr eficiencia, estabilidad y descentralización, permitiendo que cada copia de un repositorio fuera autónoma y completa, sin depender de servidores centrales
Git permite a los desarrolladores trabajar en colaboración en un proyecto, manteniendo un historial completo de todos los cambios realizados en los archivos. Cada vez que se realiza una modificación en un archivo, Git registra esos cambios y permite a los desarrolladores rastrear quién hizo cada cambio, cuándo se realizó y qué se modificó específicamente. 

Una de las características destacadas de Git es su capacidad para trabajar de forma distribuida. Esto significa que **cada desarrollador tiene una copia completa del repositorio de Git en su máquina local**, lo que les permite trabajar de manera independiente y luego **fusionar** sus cambios cuando sea necesario. Esto facilita la colaboración en equipos distribuidos y permite trabajar sin conexión a internet. 

Git utiliza una **estructura de árbol de commits** para mantener un historial de versiones. Los commits representan instantáneas de los archivos en un momento dado y se organizan en ramas, que permiten el desarrollo paralelo de diferentes características o soluciones. 

Además, Git ofrece herramientas para crear ramas, fusionar cambios, revertir modificaciones y resolver conflictos cuando dos o más personas modifican el mismo archivo simultáneamente.

* ***Documentación para aprender a usar Git***

En los dos enlaces que se proporcionan a continuación, puedes encontrar documentación oficial y tutoriales para aprender a usar Git y GitHub:
 - [Apuntes IES Celia Viñas (Almería)](https://iescelia.org/docs/dwes/_site/scv-git/) 
 - [Apuntes de Jose Luis GS](https://github.com/joseluisgs/git-tutorial)


## 3. Tecnologías
Al igual que en las herramientas de programación, el ecosistema de tecnologías alrededor de las aplicaciones web también es muy variado, rico, y en constante evolución. Continuamente surgen nuevas versiones de las tecnologías existentes (que rompen con las anteriores), o tecnologías/frameworks/librerías novedosas a los que se adhieren multitud de profesionales. Todo ello hace que la curva de aprendizaje inicial en el ámbito de las aplicaciones web sea más acusada en un principio.

A continuación se presentan algunas de estas tecnologías, agrupadas por tipología.

 1. Virtualización
    * Proxmox
    * Docker
    * Kubernetes
 
 2. Servidores web
    * Nginx
    * Apache

 3. Sevidores de aplicaciones
    * Payara
    * Tomcat
    * GlassFish
    * DenoJS
    * Flask
 
 5. Gestores de BBDD
    * MySQL
    * PostgreSQL
    * Oracle
    * SQLServer
    * MongoDB
    * Redis
 6. Frameworks servidor
 7. Frameworks backend más populares.
    * Django
    * Jakarta EE
    * Spring Boot
    * ExpressJS
    * Laravel
 8. Frameworks frontend más populares.
    * VueJS
    * ReactJS
    * AngularJS
    * Svelte

 

### 3.1. Navegadores. Tipos y características
Dado que el entorno de ejecución en el lado cliente es el navegador web, se ha dedicado un apartado exclusivamente para caracterizar este tipo de software.

Los navegadores representan un software complejo, en constante evolución, y en el que las diferentes opciones del mercado están respaldadas por motivaciones diversas (detrás de algunos existe una empresa multinacional, otros están respaldados por una comunidad de desarrolladores, etc.), así como diferentes principios de desarrollo.

En la siguiente tabla se resumen algunas de las características que diferencia a diferentes navegadores:

| Criterio | Comparativa| !
Etiquetado HTML	| HTML Reference - Browser Support|
Etiquetado CSS	CSS Browser Support Reference|
Rendimiento	Browser performance|
Velocidad	The Fastest Browser Options in 2022|
Seguridad	Navegadores seguros: comparativa de Chrome, Firefox, Brave y otros|

## 4. Estándares web
Dada la gran cantidad de tecnologías y navegadores utilizados en el lado cliente, existe la voluntad de estandarizar determinados aspectos que gobiernan estas tecnologías, en forma de especificaciones emitidas por organismos reconocidos como oficiales. Se trata de que los diferentes desarrolladores tengan suficiente libertad para ser competitivos, pero sin que el panorama se disperse excesivamente.

A continuación se citan varios de estos estándares:

 * **HTML5:** del W3C (Consorcio de la World Wide Web)
 * **CSS:** también del W3C
 * **ECMAScript:** aplicado a JavaScript, y desarrollado por ECMA International (organización internacional basada en membresías de estándares para la comunicación y la información)
En este artículo se discute la necesidad de los estándares web, como visión general.

## 5. Enlaces de interés

* Entrevista especial a Linus Torvalds por el 20º aniversario, organizada por GitHub: [Enlace](skatox.com/blog/2025/06/23/entrevista-a-linus-torvalds-por-los-20-anos-de-git/)