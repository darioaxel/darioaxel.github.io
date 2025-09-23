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

## 2. Lenguajes y Frameworks de Programación en Entorno Servidor

El desarrollo web en entorno servidor se apoya en distintos lenguajes y frameworks que permiten crear aplicaciones dinámicas, seguras y escalables. Cada tecnología aborda de forma distinta la ejecución del código, la integración con el servidor web y la gestión de datos.

### 2.1. Tipos de Ejecución de Lenguajes del Lado del Servidor

Los lenguajes de programación utilizados en el lado del servidor se ejecutan de diferentes maneras. Debemos distinguir tres grandes grupos:
*   **Lenguajes de Guiones (Scripting)**: Los programas se ejecutan directamente a partir de su código fuente. Un intérprete procesa el código línea por línea y genera la respuesta. Pertenecen a este grupo Perl, Python, PHP y ASP (el precursor de ASP.NET). Tienen la ventaja de que no es necesario traducir el código fuente para ser ejecutados, lo que aumenta su portabilidad, pero ofrecen un rendimiento inferior.
*   **Lenguajes Compilados a Código Nativo**: El código fuente se traduce completamente a código máquina antes de la ejecución. Los programas se almacenan en modo binario y se ejecutan directamente. Son los más rápidos, pero presentan problemas de integración con el servidor web, ya que no están pensados para ejecutarse en este entorno. No son portables entre distintas plataformas y no reutilizan procesos para atender a varias peticiones.
*   **Lenguajes Compilados a Código Intermedio**: El código fuente se compila a un formato intermedio que luego es ejecutado por una máquina virtual. Operan de esta forma Java EE (Servlets, JSP) y ASP.NET. Ofrecen un equilibrio entre buen rendimiento y portabilidad entre distintas plataformas en las que exista una implementación de la arquitectura (como un contenedor de *servlets* o un servidor de aplicaciones Java EE).


### 2.2. Plataformas Web Libres y Propietarias

Una plataforma web es el entorno de desarrollo de software empleado para diseñar y ejecutar un sitio web. Generalmente, se compone de cuatro elementos clave:
1.  El **sistema operativo**: Bajo el cual opera el equipo donde se hospedan las páginas web y que representa la base misma del funcionamiento del computador. En ocasiones limita la elección de otros componentes.
2.  El **servidor web**: Es el software que maneja las peticiones desde equipos remotos a través de Internet. En el caso de páginas estáticas, el servidor web simplemente provee el archivo solicitado, el cual se muestra en el navegador. En el caso de sitios dinámicos, el servidor web se encarga de pasar las solicitudes a otros programas que puedan gestionarlas adecuadamente.
3.  El **gestor de bases de datos**: Se encarga de almacenar sistemáticamente un conjunto de registros de datos relacionados para ser usados posteriormente.
4.  Un **lenguaje de programación interpretado**: Que controla las aplicaciones de software que corren en el sitio web.

Algunas plataformas populares incluyen:
*   **LAMP**: Combina **L**inux, **A**pache, **M**ySQL (o MariaDB) y **P**HP/Perl/Python. Es una plataforma de código abierto muy difundida.
*   **WISA**: Integra **W**indows, **I**IS (Internet Information Services), **S**QL Server y **A**SP/ASP.NET. Es una plataforma propietaria de Microsoft.
*   **WAMP**: Consiste en **W**indows, **A**pache, **M**ySQL y **P**HP. Es una configuración común para entornos de desarrollo local, a menudo facilitada por paquetes como XAMPP.
*   **WIMP**: Otra combinación para Windows, con **W**indows, **I**IS, **M**ySQL y **P**HP.


### 2.3. Tecnologías para el Desarrollo de Servicios

El desarrollo de servicios se centra en la creación de APIs para que las aplicaciones se comuniquen. Las tecnologías varían según el lenguaje y el paradigma de la API.

**Tabla Comparativa de Tecnologías para el Desarrollo de Servicios**

| Tecnología                  | Lenguaje   | Uso Principal                                                                       | Ejemplos de Frameworks/Librerías                         |
| :-------------------------- | :--------- | :---------------------------------------------------------------------------------- | :------------------------------------------------------- |
| **Java con Spring Boot**    | Java       | APIs RESTful, microservicios, aplicaciones web de alta escala, *enterprise*.        | Spring MVC, Spring WebFlux, Spring Data REST, Hibernate. |
| **C# con ASP.NET Core**     | C#         | APIs RESTful, microservicios, servicios en la nube, aplicaciones web empresariales. | ASP.NET Core Web API.                                    |
| **PHP con Laravel**         | PHP        | APIs RESTful, aplicaciones web con MVC, desarrollo rápido.                          | Laravel API Resources, Symfony.                          |
| **Node.js (JavaScript)**    | JavaScript | APIs RESTful, microservicios, aplicaciones en tiempo real, *Full-stack* JavaScript. | Express.js, NestJS, Hapi.js, Meteor.js.                  |
| **Python con Django/Flask** | Python     | APIs RESTful, aplicaciones web complejas, Machine Learning, backend de datos.       | Django REST Framework, Flask-RESTful.                    |
| **Ruby con Rails**          | Ruby       | APIs RESTful, aplicaciones web con MVC, desarrollo rápido.                          | Ruby on Rails.                                           |
| **gRPC**                    | Varios     | Comunicación de alto rendimiento entre microservicios, *backend-to-backend*.        | Soporte nativo en Java, C#, Python, Go, Node.js, etc.    |


### 2.4. Integración del Código con Lenguajes de Marcas

Una técnica fundamental para crear páginas web dinámicas es integrar código de programación directamente dentro de lenguajes de marcado como HTML. Esto permite generar dinámicamente secciones de contenido HTML basándose en la lógica del programa.

*   En el modelo **MVC (Modelo-Vista-Controlador)**, esta combinación se realiza en el **lado del servidor**. El lenguaje de programación (ej. PHP, Python) se incrusta en el HTML, y el documento web resultante se envía al cliente desde el servidor.
*   En aplicaciones web basadas en **servicios REST**, la combinación se lleva a cabo en el **lado del cliente**. El lenguaje de programación (JavaScript o TypeScript) consume datos JSON del servidor y modifica el HTML de forma dinámica en el navegador del usuario.

Por ejemplo, un bucle en PHP puede recorrer una lista de productos y crear un bloque HTML para cada uno. Los lenguajes de programación utilizan etiquetas especiales (como `<?php ... ?>` en PHP) para delimitar el código incrustado.


Cuando hablamos de *“código embebido”* nos referimos a mezclar fragmentos de código de programación dentro de un documento escrito en un lenguaje de marcas (normalmente HTML).
Esto permite que el servidor procese instrucciones dinámicas antes de enviar el resultado al cliente.

Ejemplo típico en PHP:
```php
<html>
  <body>
    <h1>Bienvenido</h1>
    <p>Hoy es <?php echo date("d/m/Y"); ?></p>
  </body>
</html>
```

El navegador solo recibe HTML ya procesado (con la fecha en texto plano) y el cliente no ve el código PHP porque se ejecuta en el servidor.

Otros lenguajes permiten algo parecido:

**JSP (Java Server Pages)**: `<% ... código Java ... %>` dentro de HTML.

**Plantillas Django (Python)**: usan llaves {{ variable }} o bloques `{% instrucciones %}`.

En general, los frameworks modernos intentan separar lo más posible la lógica del código de la estructura HTML, pero la idea inicial fue insertar código en las páginas, siendo este un mecanismo clave en la transición de páginas estáticas a dinámicas.



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

## 6. Funcionamiento y Configuración de Servidores Web y de Aplicaciones

### 6.1. Servidores Web: Apache y Nginx

Un **servidor web** es un programa que se ejecuta continuamente en un ordenador, esperando peticiones de un cliente (un navegador) y respondiendo con el recurso solicitado (páginas web, imágenes, etc.). Puede servir contenido estático o delegar la ejecución de aplicaciones para generar contenido dinámico.

**Apache HTTP Server** es uno de los servidores web más populares y utilizados, conocido por ser de código abierto y gratuito, disponible para Windows y GNU/Linux.
*   **Características**: Apache se caracteriza por su **modularidad**, lo que permite activar o desactivar módulos específicos (ej., para PHP, SSL, control de acceso) para extender su funcionalidad. El archivo principal de configuración suele ser `apache2.conf` o `httpd.conf`.


#### 6.1.1. Instalación y Configuración Básica de Apache (Linux)

En sistemas Linux basados en Debian/Ubuntu, Apache se instala fácilmente. Una vez instalado, se verifica su funcionamiento accediendo a `http://localhost` o a la dirección IP del servidor.

Apache sirve las páginas web desde el directorio especificado por la directiva `DocumentRoot`, que por defecto suele ser `/var/www/html/`.
Las **directivas** son reglas que controlan el comportamiento de Apache. Algunas directivas básicas incluyen:
*   `ServerRoot`: Define el directorio base de la configuración de Apache.
*   `ServerName`: Establece el nombre del servidor web (ej., `www.ejemplo.local`). Puede estar a nivel global o dentro de un VirtualHost.
*   `Listen`: Especifica el puerto (y opcionalmente la dirección IP) por el que Apache escuchará las peticiones (por defecto el puerto 80 para HTTP).
*   `ErrorLog`: Ubicación del archivo donde se registran los errores.
*   `KeepAlive`: Permite mantener conexiones persistentes para múltiples peticiones.
*   `Timeout`: Tiempo máximo que el servidor esperará antes de cerrar una conexión inactiva.
Apache solo aplica los cambios después de ser iniciado o reiniciado.


#### 6.1.2. Arranque y Detención del Servicio Apache

En sistemas Linux, Apache se puede controlar (iniciar, detener, reiniciar) utilizando comandos como `sudo service apache2 start|stop|restart`. Es una buena práctica verificar la sintaxis de la configuración con `apache2ctl configtest` antes de reiniciar para evitar errores.


#### 6.1.3. Configuración de Hosts Virtuales

Los **Virtual Hosts** son una funcionalidad clave que permite a un único servidor físico alojar múltiples sitios web o dominios independientes.
*   **Virtual Hosts basados en nombre**: Varios nombres de dominio (ej., `www.miejemplo.local`, `www.misitio.local`) apuntan a la misma dirección IP del servidor. `ServerName` define el nombre principal y `ServerAlias` permite nombres alternativos.
*   **Virtual Hosts basados en IP**: Cada Virtual Host se asocia a una dirección IP distinta del servidor.
*   **Configuraciones mixtas**: Es posible combinar Virtual Hosts basados en nombre y en IP.
En sistemas Debian/Ubuntu, los Virtual Hosts se configuran en archivos específicos (ej., `/etc/apache2/sites-available/*.conf`) y se habilitan o deshabilitan mediante enlaces simbólicos y comandos como `a2ensite` y `a2dissite`. Las directivas no especificadas explícitamente en un Virtual Host se heredan de la configuración principal de Apache.


### 6.2. Servidores de Aplicaciones para Jakarta EE

Un **servidor de aplicaciones** es un software que proporciona servicios adicionales a los de un servidor web. Se especializa en contenido dinámico, ofrece servicios adicionales como balanceo de carga o *clustering*, y se integra frecuentemente con bases de datos. Simplifican el desarrollo al permitir ensamblar aplicaciones a partir de componentes predefinidos.

 * **Apache Tomcat** es un servidor de aplicaciones de código abierto desarrollado por la Apache Software Foundation. Es uno de los servidores de aplicaciones Java más utilizados y es compatible con una variedad de protocolos, incluido el protocolo HTTP y el protocolo de red privada virtual (VPN). Es un servidor ligero y simple, ideal para aplicaciones pequeñas o de desarrollo. Además Tomcat es fácil de configurar y escalar según las necesidades de la aplicación. El uso de Tomcat suele ser habitual en el desarrollo de sitios web y aplicaciones web personales o pequeñas empresas.

 * **GlassFish** es un servidor de aplicaciones Java de código abierto desarrollado por Oracle Corporation. Es una de las opciones más utilizadas para desarrollar y desplegar aplicaciones web basadas en JavaEE (Java Enterprise Edition) y cuenta con una serie de características avanzadas, como la escalabilidad y el soporte para clustering. Es utilizado para desarrollar y desplegar aplicaciones empresariales complejas como por ejemplo sistemas de gestión de recursos humanos y sistemas de gestión de inventario.

 * **Payara** es un servidor de aplicaciones Java de código abierto desarrollado por Payara Services Limited. Es una versión de código abierto de GlassFish y se basa en la misma arquitectura y código base, pero incluye un conjunto de mejoras y características adicionales en cuanto a la seguridad y la monitorización, y ofrece soporte comercial. Incluyen su uso en la industria financiera y en sistemas de gestión de recursos humanos.

 * **WildFly** es un servidor de aplicaciones Java de código abierto desarrollado por Red Hat. Es una de las opciones más utilizadas para desarrollar y desplegar aplicaciones web basadas en JavaEE. Se enfoca en la simplicidad y ofrece características avanzadas como escalabilidad, soporte para clustering y mecanismos de seguridad. Al igual que Glassfish y Payara, se usa principalmente para desarrollar y desplegar aplicaciones empresariales complejas.

Si tuviésemos que hacerte una recomendación entre uno u otro, te indicaríamos que dependerá de las necesidades de tu aplicación y del entorno en el que se desplegará.


#### 6.2.1. Instalación y Configuración Básica de Tomcat (requisito JDK)

La instalación de cualquier versión de Tomcat requiere que el **Kit de Desarrollo de Java (JDK)** esté previamente instalado, ya que las peticiones a Apache a menudo se redirigen a Tomcat usando un conector Java. La gestión del servicio Tomcat se realiza mediante el *script* `catalina`, utilizando comandos como `start` y `stop`. Se puede verificar su funcionamiento accediendo a `http://127.0.0.1:8080` en un navegador.


### 6.3. Gestores de Bases de Datos

Los **gestores de bases de datos** son componentes fundamentales en cualquier plataforma web moderna. Son software encargados de almacenar, estructurar y recuperar grandes volúmenes de datos de manera eficiente.
 *   **MySQL / MariaDB**: Son gestores de bases de datos relacionales de código abierto, muy populares por su eficiencia y velocidad, a menudo utilizados en combinación con PHP. MariaDB es un *fork* de MySQL completamente libre.
 *   **PostgreSQL**: Otro potente gestor de bases de datos relacionales de código abierto, conocido por su robustez y cumplimiento de estándares.
 *   **SQL Server**: Es el sistema gestor de bases de datos de Microsoft, típicamente empleado en plataformas WISA.
 *   **MongoDB**: Es un gestor de bases de datos NoSQL orientado a documentos, ideal para aplicaciones que requieren alta escalabilidad y flexibilidad en el esquema de datos.


## 7. Despliegue de Aplicaciones Web

### 7.1. Concepto de Despliegue

Para desplegar una aplicación web, se necesitan varios elementos:
 *   **Software**: Los componentes básicos de una plataforma web: un sistema operativo, un servidor web (Apache, Nginx), un servidor de aplicaciones (Tomcat para Java), el *runtime* del lenguaje de programación (JDK para Java, entorno PHP, .NET runtime) y un gestor de bases de datos. Además, para entornos de desarrollo local, herramientas como Docker Desktop o XAMPP son esenciales.
 *   **Hardware**: Un servidor con la capacidad adecuada de CPU, memoria RAM y almacenamiento para la aplicación y la carga de usuarios prevista. La **escalabilidad** del hardware es un factor crítico.
 *   **Dependencias**: Incluye librerías específicas del *framework* o del proyecto (como archivos JAR para Java, paquetes NuGet para C# o paquetes Composer para PHP).

## [Créditos y reconocimientos](/docencia/dam-daw/DWES/98-creditos-reconocimientos.md)