---
title: UT02 Lenguajes de programación en entorno servidor
icon: computer
---

> **En este tema trabajaremos los siguientes RAs:**
> - RA2. Escribe sentencias ejecutables por un servidor Web reconociendo y aplicando procedimientos de integración del código en lenguajes de marcas.
> - RA3. Escribe bloques de sentencias embebidos en lenguajes de marcas, seleccionando y utilizando las estructuras de programación.

# UT02 Lenguajes de programación en entorno servidor

::: info ¿Qué vamos a aprender en esta unidad?
   //ToDo
:::

## 1. Introducción

En los primeros tiempos de Internet, no se ejecutaban programas en el servidor. Solo se pedían páginas estáticas (escritas en HTML) más o menos elaboradas que había sido guardadas en el servidor por un administrador de sistemas. A esto se le denominó **web 1.0.**

A alguien se le ocurrió la idea de que **los propios visitantes podrían también crear contenido**. Ese contenido se guardaría en el servidor (en archivos o en una base de datos) y posteriormente podría recuperarse para generar con él páginas dinámicas, generadas sobre la marcha. Es decir, documentos HTML que no existieran previamente y que nadie, en realidad, hubiera tecleado, sino que se creasen a partir del contenido almacenado en esos archivos o esa base de datos.

Esa web dinámica estaría generada por un programa ejecutado en el servidor, un programa cuya salida sería HTML válido, comprensible por el navegador que la reciba. A esto se le denominó **web 2.0** y supuso una revolución tan grande como el propio nacimiento de Internet.
### 1.1. Evolución hitórica
* **Principios — CGI (mediados-finales de 1990)**
Los primeros sitios dinámicos usaban CGI (Common Gateway Interface): scripts en Perl/C que el servidor ejecutaba por petición. CGI introdujo la idea de ejecutar código en servidor para generar contenido dinámico, pero era poco eficiente (cada petición iniciaba un proceso)
* **1994 - 1995 — Nacimiento de PHP**
Rasmus Lerdorf publica las primeras herramientas (Personal Home Page Tools) en 1995; PHP evoluciona hacia un lenguaje embebido en HTML muy popular por su facilidad y por ejecutarse en entorno LAMP.

* **1996 - 1997 — ASP (Active Server Pages)**
Microsoft lanza ASP integrado en IIS (1996–1997) ofreciendo una forma de incluir código (VBScript/JScript) embebido en páginas servidas por IIS, orientado a entornos Windows/enterprise. 

* **1996 - 1999 — Java Servlets y JSP**
Para superar limitaciones de CGI aparecieron los Servlets (API en Java, ~1996) y luego JSP (1999) como mecanismo para separar vista/plantilla de la lógica Java. Esto dio pie a stacks Java empresariales y servidores de aplicaciones (Tomcat, GlassFish, JBoss). 

* **2004/2005 — Ruby on Rails y Django** 
Frameworks como Ruby on Rails (2004) y Django (2005) introducen convenciones (convention over configuration), scaffolding, ORM integrado y aceleran el desarrollo de aplicaciones web completas. 

* **2009 — Node.js (JS en servidor)**
Node.js cambia el panorama ofreciendo JavaScript en servidor con un modelo asíncrono orientado a I/O no bloqueante. Rápidamente impulsó frameworks/server-side JS (Express) y permitió arquitecturas unificadas JS full-stack.

* **2010s — Consolidación de frameworks y microservicios**
Surgen frameworks modernos (Laravel para PHP, Spring Boot para Java en 2014) y patrones como microservicios, contenedores y despliegue cloud-native. Spring Boot (GA 2014) simplifica arrancar aplicaciones Java independientes. 


* **Década 2020 — estado actual**
Hoy coexisten: lenguajes interpretados (PHP, Python/Django), frameworks Java (Spring), plataformas server-side JS (Node/Express), y arquitecturas distribuidas. La elección depende del contexto: velocidad de desarrollo, integraciones, escalabilidad y equipo.

::: important
Aunque ya lo hemos comentado en temas anteriores, es importante recordar los siguientes conceptos y el significado de algunos términos básicos:

* Un **servidor** es **un programa** que se ejecuta en una máquina conectada a una red y que permanece dormido hasta que una petición procedente de la red lo despierta. Entonces, el programa hace algo (consulta datos, elabora un cálculo, lo que sea) y devuelve su resultado por la red.

Por extensión, un servidor también es **cualquier ordenador donde se ejecute un programa servidor**. Es decir, usamos la misma palabra para referirnos a un programa y al ordenador donde se ejecuta ese programa. Mala idea, ya lo sé, pero es lo que hay.

* El **cliente** es un **programa** que envía peticiones al servidor para despertarlo. También es el programa que recoge el resultado devuelto por el servidor.

¿Y sabes qué? Que, por extensión, **la máquina** donde se ejecuta un programa cliente también se llama cliente.

Pues bien, en programación web, nuestro cliente es el **navegador web** (también llamado cliente web). Cualquier navegador del universo conocido entra en esta categoría. Excepto, tal vez, Internet Explorer (sí, esto es un chiste informático).

Y un servidor es cualquier máquina de la red donde se esté ejecutando un programa servidor web como Apache, Nginx, Tomcat, IIS y otros cuando viejos amigos que irás conociendo a lo largo de este curso.
:::

### 1.2 Flujos de peticiones web

#### 1.2.1. Una petición web en la época 1.0
Ahora que tienes claro qué es un servidor y un cliente web, puedes comprender el siguiente esquema.

En él, se ilustra lo que ocurre cuando un cliente web (recuerda: tu navegador) envía al servidor la petición de una **página estática**.

El servidor, en este caso, se limita a enviar al cliente el documento HTML tal cual está almacenado en su disco duro, sin cambiar una sola coma.

![Petición web 1.0](/images/dwes/02-servicio-www-1.jpg)

#### 1.2.2. Una petición web en la época 2.0
Con la web 2.0 la cosa cambia bastante porque aparecen las páginas dinámicas, aunque tendrás que fijarte bien en el esquema para apreciar la diferencia.

Quédate con lo importante: en este esquema, el cliente web no pide un documento HTML, sino un programa, que puede estar escrito en PHP o algún otro lenguaje. Eso es lo de menos.

Ese programa se ejecuta en el servidor, y el resultado de esa ejecución es lo que recibe el cliente, no el programa en sí.

![Petición web 2.0](/images/dwes/02-servicio-www-2.jpg)

Pues bien: si un sitio web funciona del primer modo, no es una aplicación web, sino una página web estática. Para que sea considerado una aplicación web, debe funcionar del segundo modo.


## 3. PHP

![Logo de PHP](https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/PHP-logo.svg/711px-PHP-logo.svg.png)

PHP es un acrónimo recursivo. Significa **"PHP Hypertext Preprocessor"**.

Sí, así es el sentido del humor de los informáticos. Qué le vamos a hacer.

### 3.1. Introducción

PHP es un lenguaje de programación de propósito general. De hecho, junto con librerías como PHP-Qt o PHP-GTK, puedes programar con él cualquier aplicación de escritorio con sus ventanitas, sus botoncitos y toda la pesca.

Pero, por circunstancias más debidas al azar que a otra cosa, se empezó a usar para desarrollo web al comienzo de la web 2.0, y hoy en día se utiliza casi exclusivamente para ese propósito. Que es el propósito que a nosotros nos interesa, claro.

Cuando se usa en desarrollo web, PHP aparece embebido dentro de documentos HTML. Enseguida veremos cómo se hace eso.

Igual que sucedía con Javascript, pocos proyectos nuevos se desarrollan con PHP clásico. Lo normal es usar un framework (o colección compleja de librerías) que ocultan en todo o en parte el funcionamiento de PHP, que sigue corriendo debajo. Por supuesto, cualquier desarrollador/a web debe conocer tanto PHP como el funcionamiento de los frameworks que corren sobre PHP.

Nosotros nos centraremos primero en PHP clásico, y más adelante veremos los frameworks para PHP, centrándonos en uno de los más populares y potentes que existen en la actualidad: **Laravel**.

### 3.2. Características de PHP

- PHP permite conectarse con múltiples bases de datos: MySQL, MariaDB, Oracle, PostgreSQL, SQL Server, DB2, etc. También puede conectar por ODBC.
- Se parece mucho a otros lenguajes de tercera generación y orientados a objeto (en particular a C/C++ y, por tanto, a Java). Su curva de aprendizaje para los que ya saben programar es muy plana.
- Es un lenguaje con tipado dinámico y débil. Es decir, los tipos de datos se asignan en tiempo de ejecución y pueden mezclarse tipos de datos con bastante libertad. Esto tiene ventajas e inconvenientes que descubrirás en tus carnes cuando empieces a programar con PHP.
- Es un lenguaje orientado a objetos, pero conserva todas las características de los lenguajes estructurados, es decir: se puede programar sin recurrir a los objetos. Un punto a su favor para nostálgicos, aunque lo recomendable es programar con objetos siempre.
- Es un lenguaje tremendamente flexible. Casi todo se puede hacer de tres o cuatro formas diferentes. Eso le permite adaptarse a los gustos personales de cada programador/a.

#### 3.2.1. Lo nuevo en PHP8

PHP8 no tiene demasiadas novedades con respecto a PHP7, como este no las tenía con respecto a PHP5.

Debes tener en cuenta que el mayor salto evolutivo se produjo entre PHP 4 y PHP 5. A partir de ahí, y para principiantes como nosotros, la cosa no ha cambiado demasiado.

Algunas de las novedades más destacables de PHP8 son de este calibre:

- Mejoras importantes de rendimiento, con la aparición de JIT (Just in Time Compiler), un compilador de PHP que trabaja de forma transparente al programador para incrementar la velocidad de ejecución.
- Mejoras menores en el manejo de las clases y métodos abstractos.
- Simplificación en la declaración de atributos.
- Posibilidad de usar arrays con índices negativos.

Como ves, nada que vaya a revolucionar la forma de trabajar con PHP.

#### 3.2.2. Ventajas de PHP sobre otros lenguajes

PHP es el líder indiscutible en el desarrollo de aplicaciones web del lado del servidor. Hace años (¡muchos!) que algunos se empeñan en decir que está muerto o que está destinado a desaparecer, pero sigue ahí, obstinadamente en el número uno.

Por algo será.

Algunas de las ventajas que han hecho de PHP el líder de los lenguajes del lado del servidor durante tanto tiempo son:

- Es un lenguaje libre y abierto.
- Es muy eficiente (comparado con otros lenguajes del lado del servidor).
- Es ejecutable en (casi) cualquier servidor.
- Cuenta con una excelente documentación y miles de foros y sitios donde consultar dudas.
- La curva de aprendizaje es baja si ya sabes programar.
- Existen mogollón de entornos de desarrollo para PHP, para todos los gustos.
- Ofrece fácil interoperatibilidad con otros sistemas, en particular con bases de datos.
- Comunidad muuuy grande.
- Su sintaxis, estabilidad y seguridad han mejorado enormemente desde los tiempos algo caóticos de PHP4.

#### 3.2.3. Inconvenientes de PHP con respecto a otros lenguajes

PHP también presenta algunos inconvenientes, por supuesto. No hay nada perfecto. Entre ellos, podemos destacar:

- Fallos de diseño (corregidos en su mayoría a partir de PHP5), como:
  - Los métodos para acceso a bases de datos cambian según el SGBD usado.
  - Nombres de funciones inconsistentes.
  - No es completamente orientado a objetos.
  - Tipado confuso y, a veces, impredecible.
- Grandes (e incompatibles) cambios entre versiones.
- Pérdida lenta pero constante de cuota de mercado.
- Pésima relación señal/ruido en la web: ¡hay demasiados malos desarrolladores en PHP!

### 3.3. Gestión de dependencias con composer

Aunque PHP puede instalarse como un programa independiente, en el contexto del desarrollo de aplicaciones web siempre se utiliza como parte de un servidor web.

Casi todos los servidores web proporcionan soporte nativo para PHP. Por ejemplo, Apache lo incorpora "de serie", de modo que solo tenemos que tener un servidor con Apache instalado para poder desarrollar con PHP. Lo mismo puede decirse de otros servidores basados en sistemas Unix y Linux, como nginx o lighttpd.

Cuando las aplicaciones se empiezan a hacer complejas, suele ser habitual que necesitemos paquetes de PHP que no son estándar, es decir, que no vienen con el lenguaje. Podemos instalarlos manualmente, desde luego, pero PHP, como todos los lenguajes medianamente serios, tiene su propio gestor de dependencias llamado **composer**.

composer se usa desde la línea de comandos y trabaja utilizando un archivo de configuración llamado `composer.json` (porque está escrito en formato JSON) donde se especifican qué paquetes (o librerías) usa el proyecto en cuestión. Al ejecutar composer, ese archivo es leído y las dependencias instaladas o actualizadas en una carpeta del proyecto llamada `/vendor`. De ese modo, podemos tener todas las librerías correctamente instaladas y actualidadas con facilidad.

El aspecto del archivo de configuración `composer.json` es algo así:

```json
{
    "require": {
        "monolog/monolog": "2.0.*",
        "phpunit/phpunit": "^9.5",
        "phpunit/php-code-coverage": "^9.2"
    }
}
```

## 4. Java en el Desarrollo Web

![Logo de Java](https://www.oracle.com/a/ocom/img/cb71-java-logo.png)

Java es un lenguaje de programación **de propósito general**, **orientado a objetos** y con un fuerte tipado. Desde sus inicios en los años 90, ha sido uno de los lenguajes más usados tanto en **aplicaciones de escritorio** como en **sistemas distribuidos** y, sobre todo, en **desarrollo web corporativo**.

Su lema, **“Write once, run anywhere”**, reflejaba la gran ventaja que trajo: el código podía ejecutarse en cualquier plataforma con una **Máquina Virtual de Java (JVM)**, lo que permitió desarrollar aplicaciones multiplataforma con facilidad.

Cuando hablamos de **Java en el desarrollo web en entorno servidor**, lo que realmente usamos son **tecnologías y frameworks que corren sobre Java**, como:

* **JSP (JavaServer Pages)**
* **Servlets**
* **JSF (Jakarta Server Faces)**
* **Spring / Spring Boot**
* Otros frameworks modernos: Micronaut, Quarkus, etc.

Al igual que sucede con PHP y Laravel, en Java el código “puro” (servlets, JSP) suele reservarse para aprendizaje y proyectos pequeños. En entornos profesionales casi todo se hace con **frameworks** que abstraen la complejidad, siendo **Spring Boot** y **Jakarta EE** los más importantes.


### 4.1. Características de Java para desarrollo web

* **Orientado a objetos desde su concepción.** Todo en Java se basa en clases, objetos e interfaces.
* **Tipado fuerte y estático.** El compilador detecta la mayoría de errores antes de ejecutar.
* **Portabilidad.** Gracias a la JVM, el mismo código puede correr en Windows, Linux o macOS.
* **Gran ecosistema de librerías y frameworks.** Desde Jakarta EE hasta Spring y Hibernate.
* **Seguro y robusto.** Incluye manejo de memoria automático (garbage collector) y un sistema de excepciones sólido.
* **Multi-hilo.** Preparado para aplicaciones concurrentes, algo crítico en servidores web.


#### 4.1.1. Breve historia de Java en la web

* **1997 – Servlet API:** Se introducen los **servlets**, clases Java que generan contenido dinámico en servidores web.
* **1999 – JSP (JavaServer Pages):** Nace como alternativa a los servlets puros, permitiendo incrustar código Java en páginas HTML (muy parecido a PHP).
* **2004 – JSF (JavaServer Faces):** Framework oficial de Java EE (ahora Jakarta EE) que introduce el paradigma MVC, componentes reutilizables y separación entre lógica y vista.
* **2006 – Spring Framework:** Empieza a popularizarse como una alternativa ligera y flexible a Java EE.
* **2014 – Spring Boot:** Revoluciona el desarrollo en Java con configuración mínima, enfoque “convention over configuration” y servidores embebidos.
* **2019 – Eclipse Foundation asume Java EE, renombrado como Jakarta EE.**
* **Actualidad:**

  * **Spring Boot** domina el desarrollo web moderno en Java.
  * **Jakarta EE** sigue siendo clave en entornos corporativos y servidores de aplicaciones.
  * Nuevas alternativas como **Quarkus** o **Micronaut** buscan optimización en la nube y microservicios.

::: note
Aunque lo hemos nombrado también al comienzo del tema, no ha sido explicado y hemos de abordarlo.
El concepto de **"convention over configuration"** (convención sobre configuración) es un paradigma de diseño de software que busca simplificar y agilizar el desarrollo reduciendo la cantidad de decisiones y configuraciones explícitas que debe realizar un programador. 

La idea principal es que el entorno, framework o sistema asume ciertas reglas y comportamientos predeterminados (convenciones) que el desarrollador solo debe seguir, de modo que no tenga que definir cada aspecto manualmente (configuración) salvo cuando quiera desviarse de esas convenciones.
:::

#### 4.1.2. Ventajas de Java en la web

* **Gran comunidad** y documentación abundante.
* **Estandarización:** Jakarta EE asegura compatibilidad entre servidores (Tomcat, WildFly, Payara, Glassfish...).
* **Frameworks potentes:** Spring Boot simplifica drásticamente la configuración.
* **Escalabilidad:** usado en banca, telecomunicaciones y grandes empresas.
* **Integración con bases de datos:** vía JDBC, JPA/Hibernate.


#### 4.1.3. Inconvenientes de Java en la web

* **Curva de aprendizaje más pronunciada** que PHP o Python.
* **Mayor consumo de memoria y recursos.**
* **Complejidad en proyectos grandes** si no se usan frameworks modernos.
* **Configuración histórica engorrosa** en Jakarta EE (aunque hoy se simplifica bastante).


### 4.2. JSP y JSF: las dos caras del desarrollo web clásico en Java

* **JSP (JavaServer Pages):**
  Similar a PHP: HTML con código Java embebido entre `<% %>`.
  Ejemplo:

  ```jsp
  <html>
  <body>
      <h1>Hola, <%= request.getParameter("nombre") %></h1>
  </body>
  </html>
  ```

  Hoy en día se utiliza más como recurso didáctico, o en aplicaciones legacy.

* **JSF (Jakarta Server Faces):**
  Framework basado en **componentes reutilizables**, con fuerte separación entre vista (XHTML), controladores (Java Beans) y lógica de negocio.
  Ejemplo:

  ```xhtml
  <h:form>
      <h:inputText value="#{usuarioBean.nombre}" />
      <h:commandButton value="Enviar" action="#{usuarioBean.enviar}" />
  </h:form>
  ```


### 4.3. Gestión de dependencias en Java: Maven y Gradle

Igual que **composer** en PHP, en Java usamos **Maven** o **Gradle** para gestionar librerías y dependencias.

Un archivo `pom.xml` de Maven puede tener esta forma:

```xml
<dependencies>
    <dependency>
        <groupId>jakarta.platform</groupId>
        <artifactId>jakarta.jakartaee-web-api</artifactId>
        <version>10.0.0</version>
        <scope>provided</scope>
    </dependency>
</dependencies>
```

Con Maven podemos instalar y actualizar dependencias fácilmente:

```bash
mvn install
mvn clean package
```

## 5. Python en el Desarrollo Web

![Logo de Python](https://www.python.org/static/community_logos/python-logo.png)

Python es un lenguaje de programación **de propósito general**, **interpretado**, **dinámico** y con una sintaxis muy clara.
Su filosofía de diseño (“**There should be one– and preferably only one –obvious way to do it**”) ha hecho de Python uno de los lenguajes más fáciles de aprender y usar, tanto en **entornos educativos** como en **industria**.

Aunque nació en los años 90, Python se popularizó más tarde, primero en **ciencia de datos y automatización**, y después en **desarrollo web**, donde hoy en día es uno de los protagonistas indiscutibles.

### 5.1. Características de Python para desarrollo web

* **Sintaxis clara y legible.** Muy cercano al pseudocódigo, ideal para aprender.
* **Lenguaje interpretado y dinámico.** No requiere compilación previa.
* **Tipado dinámico pero cada vez más soporte de anotaciones (type hints).**
* **Orientado a objetos, pero soporta también programación estructurada y funcional.**
* **Amplia comunidad y ecosistema de librerías.**
* **Gran cantidad de frameworks web**: Django, Flask, FastAPI, Pyramid…

#### 5.1.1. Breve historia de Python

* **1991 – Nace Python** gracias a Guido van Rossum.
* **2000 – Primeras librerías web básicas.**
* **2003 – Django Framework:** aparece en un periódico local de EE.UU. como herramienta interna y se libera en 2005. Se convierte en uno de los frameworks más usados del mundo.
* **2010 – Flask Framework:** alternativa minimalista y flexible a Django.
* **2018 – FastAPI:** nuevo framework enfocado en APIs y microservicios, con soporte de tipado moderno.
* **Actualidad:** Django y Flask dominan el desarrollo web en Python; FastAPI crece rápidamente en entornos de microservicios y APIs.


#### 5.1.2. Ventajas de Python y Django en la web

* **Sintaxis simple y rápida de aprender.**
* **Desarrollo ágil**: muchas funcionalidades vienen listas “de serie”.
* **Seguridad:** incluye protección contra ataques típicos (CSRF, SQL Injection, XSS).
* **Gran comunidad y documentación oficial excelente.**
* **Escalabilidad:** usado por Instagram, Spotify, Pinterest, entre otros.
* **Versatilidad:** un mismo lenguaje para web, ciencia de datos, IA, automatización…

#### 5.1.3. Inconvenientes de Django (y Python en la web)

* **Menor rendimiento crudo** frente a lenguajes compilados como Java.
* **Django es “opinionado”:** obliga a trabajar siguiendo sus patrones (lo cual es ventaja para principiantes, pero puede limitar a expertos).
* **Consumo de memoria mayor** que frameworks minimalistas como Flask.
* **Migraciones de versiones** a veces requieren ajustes manuales.


### 5.2. Django: el framework “baterías incluidas”

Django es el framework de referencia en Python para **desarrollo web rápido y seguro**. Su lema es **“The web framework for perfectionists with deadlines”**.

Características clave de Django:

* **Arquitectura MTV (Model-Template-View):** similar a MVC.
* **ORM integrado** para trabajar con bases de datos sin escribir SQL directamente.
* **Sistema de plantillas** para separar lógica y presentación.
* **Admin automático:** genera una interfaz de administración completa en segundos.
* **Gestión de usuarios y autenticación integrada.**
* **Gran comunidad y documentación.**

Ejemplo de vista simple en Django:

```python
# views.py
from django.http import HttpResponse

def hola_mundo(request):
    return HttpResponse("¡Hola, mundo desde Django!")
```

Y su mapeo en `urls.py`:

```python
from django.urls import path
from . import views

urlpatterns = [
    path('hola/', views.hola_mundo),
]
```

### 5.4. Gestión de dependencias: pip y pipenv/poetry

Al igual que **composer** en PHP o **Maven** en Java, en Python usamos **pip** y cada vez más **pipenv** o **poetry** para manejar dependencias.

Un archivo `pyproject.toml` con Poetry puede verse así:

```toml
[tool.poetry]
name = "mi-proyecto-django"
version = "0.1.0"
description = "Ejemplo con Django"
authors = ["Alumno FP <alumno@example.com>"]

[tool.poetry.dependencies]
python = "^3.11"
django = "^4.2"

[build-system]
requires = ["poetry-core"]
build-backend = "poetry.core.masonry.api"
```

Con esto, podemos instalar dependencias así:

```bash
poetry install
poetry add django
```

