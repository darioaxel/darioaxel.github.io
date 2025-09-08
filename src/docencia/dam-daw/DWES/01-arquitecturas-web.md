---
title: UT01 Arquitecturas Web
icon: circle-info
---

# UT01 Arquitecturas Web

::: info ¿Qué vamos a aprender en esta unidad?
En esta unidad vamos a aprender los conceptos básicos de las arquitecturas web. Para ello empezaremos analizando los principios SOLID, los patrones de diseño y las arquitecturas de software más comunes. 
También veremos cómo se relacionan con el desarrollo de aplicaciones web del lado del servidor (backend) y cómo se utilizan en la práctica.
:::

## Introducción

En el mundo de la informática establecemos que una ***página web estática*** es aquella cuyo contenido no cambia en función de la interacción del usuario o del contexto. Estas páginas están compuestas principalmente por archivos HTML y CSS, que se almacenan en un servidor y se envían tal cual al navegador del usuario cuando éste las solicita. El servidor simplemente "sirve" estos archivos, sin realizar ningún procesamiento adicional.

Este modelo es el más sencillo que se puede establecer para una página web. Sin embargo, las aplicaciones web modernas requieren una mayor interactividad y personalización, lo que nos lleva a la necesidad de páginas web dinámicas. 
Estas páginas pueden cambiar su contenido en función de la interacción del usuario, datos de bases de datos o servicios externos.


Las aplicaciones web modernas se basan en la arquitectura cliente-servidor. En este modelo, uno o varios clientes (normalmente navegadores web) realizan peticiones al servidor, que responde enviando los recursos solicitados, tal y como podemos ver en el siguiente esquema. 

![Arquitectura Cliente-Servidor](https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Client-server-model.svg/1920px-Client-server-model.svg.png)

El cliente (navegador) realiza peticiones al servidor, habitualmente usando el protocolo HTTP (puertos 80 o 443 para HTTPS). El servidor procesa la solicitud y responde con el contenido adecuado.

Existen dos formas principales de generar páginas dinámicas:

 * **Procesamiento en el servidor:** El servidor genera el contenido dinámico utilizando lenguajes como PHP, Python, Ruby, Java, .NET, etc., y puede acceder a bases de datos o servicios externos para construir la respuesta.
 * **Consumo de servicios externos desde el cliente:** El navegador ejecuta JavaScript para solicitar datos a servicios REST de terceros y actualizar la página dinámicamente, sin necesidad de recargarla por completo.


## Arquitecturas Web: Capas Físicas y Lógicas

Las arquitecturas web no son tan sencillas como un simple servidor y una serie de clientes. Mediante una estructura de capas o layers, se intenta minorar la complejidad que una aplicación real tiene de forma que sean mantenibles, comprensibles por los desarrolladores y testeables.
En realidad, las aplicaciones web modernas suelen estar organizadas en capas físicas y lógicas que facilitan su desarrollo, mantenimiento y escalabilidad. 

### Capas Físicas (Tiers)
Una capa física o tier corresponde a un componente hardware separado dentro de la arquitectura. Por ejemplo, en una arquitectura de tres capas físicas (3-tier) se distinguen:
Servidor web

Servidor de aplicaciones

Servidor de base de datos

En entornos modernos, es común utilizar clusters de servidores en una misma capa para lograr tolerancia a fallos y escalabilidad.

### Capas Lógicas (Layers)
Las capas lógicas organizan el código según su función:

Presentación: Interfaz de usuario.

Negocio/Aplicación: Lógica de negocio y procesamiento.

Datos/Persistencia: Gestión y almacenamiento de datos.

Cada capa puede implementarse con diferentes tecnologías y lenguajes, permitiendo flexibilidad y modularidad.

### Modelo MVC (Modelo-Vista-Controlador)
El patrón MVC (Model-View-Controller) es una arquitectura que separa la lógica de negocio, la gestión de datos y la presentación visual:

 - ***Modelo:*** Gestiona los datos y su acceso, normalmente conectado a una base de datos.

 - ***Controlador:*** Procesa las acciones del usuario y coordina la interacción entre el modelo y la vista.

 - ***Vista:*** Presenta la información al usuario y recoge sus interacciones.

Esta separación facilita la organización, el mantenimiento y la reutilización del código. 

## Patrones y tipos de arquitecturas en Servidor.

### Principios SOLID
Los cinco principios SOLID son un conjunto de reglas y mejores prácticas para el diseño de software orientado a objetos. 

[Video SOLID](https://www.youtube.com/watch?v=E_mSr-VFd3g)

![Solid](/images/dwes/solid-principles.jpg)

![Solid2](/images/dwes/solid.gif)

Los principios son:

1. **Principio de responsabilidad única (Single Responsibility Principle, SRP)**: Una clase debe tener una, y solo una, razón para cambiar. Esto significa que una clase debe tener solo una tarea o responsabilidad.

    ```java
    public class Informe {
        public void generarInforme() {
            // lógica para generar el informe
        }
    }

    public class ImprimirInforme {
        public void imprimir(Informe informe) {
            // lógica para imprimir el informe
        }
    }
    ```

    En este ejemplo, la clase `Informe` solo tiene la responsabilidad de generar el informe, mientras que la clase `ImprimirInforme` tiene la responsabilidad de imprimir el informe.

2. **Principio abierto/cerrado (Open/Closed Principle, OCP)**: Las entidades de software (clases, módulos, funciones, etc.) deben estar abiertas para la extensión, pero cerradas para la modificación.

    ```java
    public abstract class Forma {
        abstract void dibujar();
    }

    public class Circulo extends Forma {
        void dibujar() {
            // lógica para dibujar un círculo
        }
    }

    public class Cuadrado extends Forma {
        void dibujar() {
            // lógica para dibujar un cuadrado
        }
    }
    ```

    En este ejemplo, la clase `Forma` está abierta para la extensión (se puede crear una nueva forma como `Circulo` o `Cuadrado`), pero cerrada para la modificación (no necesitamos cambiar la clase `Forma` para añadir una nueva forma).

3. **Principio de sustitución de Liskov (Liskov Substitution Principle, LSP)**: Los objetos de una superclase deben poder ser reemplazados por objetos de una subclase sin afectar la corrección del programa.

    ```java
    public class Pajaro {
        public void volar() {
            // lógica para volar
        }
    }

    public class Pinguino extends Pajaro {
        @Override
        public void volar() {
            throw new UnsupportedOperationException();
        }
    }
    ```

    Este es un ejemplo de violación del principio de sustitución de Liskov, ya que `Pinguino` es una subclase de `Pajaro`, pero no puede volar. Una solución sería tener una clase separada para pájaros que pueden volar.

4. **Principio de segregación de interfaces (Interface Segregation Principle, ISP)**: Los clientes no deben ser forzados a depender de interfaces que no usan.

    ```java
    public interface Pajaro {
        void comer();
    }

    public interface PajaroVolador {
        void volar();
    }

    public class Pinguino implements Pajaro {
        public void comer() {
            // lógica para comer
        }
    }

    public class Paloma implements Pajaro, PajaroVolador {
        public void comer() {
            // lógica para comer
        }

        public void volar() {
            // lógica para volar
        }
    }
    ```

    En este ejemplo, `Pinguino` no está forzado a implementar un método `volar()` que no necesita, ya que hemos segregado las responsabilidades en dos interfaces diferentes.

5. **Principio de inversión de dependencias (Dependency Inversion Principle, DIP)**: Los módulos de alto nivel no deben depender de los módulos de bajo nivel. Ambos deben depender de abstracciones.

    ```java
    public interface BaseDeDatos {
        void guardar(String datos);
    }

    public class MySqlDB implements BaseDeDatos {
        public void guardar(String datos) {
            // lógica para guardar datos en MySQL
        }
    }

    public class Aplicacion {
        private BaseDeDatos db;

        public Aplicacion(BaseDeDatos db) {
            this.db = db;
        }

        public void guardarDatos(String datos) {
            db.guardar(datos);
        }
    }
    ```

    En este ejemplo, la clase `Aplicacion` no depende directamente de la clase `MySqlDB`. En lugar de eso, ambos dependen de la abstracción `BaseDeDatos`. De esta manera, si queremos cambiar la base de datos en el futuro, solo necesitamos crear una nueva implementación de `BaseDeDatos`, sin tener que cambiar la clase `Aplicacion`.

::: tip  **Para saber más..**
Los principios ***SOLID*** fueron introducidos por el famoso científico informático Robert J. Martin (también conocido como Uncle Bob) en su artículo de 2000. Sin embargo, el acrónimo SOLID fue introducido posteriormente por Michael Feathers.

[Robert C. Martin](http://cleancoder.com/) publicó en el año 2000 un ensayo titulado “Principios de diseño y patrones de diseño”, en el que sentó las bases de lo que más tarde se conocería como los principios SOLID. [Documento](https://web.archive.org/web/20160304000000/http://www.objectmentor.com/resources/articles/PrinciplesAndDesign.pdf).

En ese artículo no se mencionaba el acrónimo SOLID. Fue ***Michael Feathers***, en 2004, quien acuñó el término "SOLID" para referirse a estos cinco principios fundamentales de la programación orientada a objetos, basándose en el trabajo de Martin.
Robert C. Martin también publicó uno de los libros de cabecera que casi todo programador debería leer una vez en la vida:[ Clean Code](https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0136083239).
:::

### Patrones de Diseño
Un patrón de diseño de software es una solución generalmente aplicable a un problema común en el diseño de software. Los patrones de diseño proporcionan un enfoque probado y estructurado para resolver problemas recurrentes y mejorar la calidad y flexibilidad del código.

Existen varios tipos de patrones de diseño de software, entre ellos:

1. **Patrones de creación:** Estos patrones se centran en la creación de objetos de manera flexible y eficiente. Algunos ejemplos son: Singleton, Factory Method, Abstract Factory y Builder.

2. **Patrones estructurales:** Estos patrones se ocupan de la composición y estructura de las clases y objetos. Algunos ejemplos son: Adapter, Decorator, Composite y Proxy.

3. **Patrones de comportamiento:** Estos patrones se centran en la interacción y comunicación entre objetos. Algunos ejemplos son: Observer, Strategy, Template Method y Command.

4. **Patrones arquitectónicos:** Estos patrones abordan la estructura y organización de sistemas de software a gran escala. Algunos ejemplos son: Modelo-Vista-Controlador (MVC), Capas y Microservicios.

5. **Patrones de concurrencia:** Estos patrones se utilizan para gestionar la concurrencia y la comunicación entre hilos. Algunos ejemplos son: Mutex, Semaphore, Productor-Consumidor y Monitor.

Estos son solo algunos ejemplos de patrones de diseño de software. Cada patrón tiene un propósito específico y puede aplicarse en diferentes contextos para resolver problemas particulares en el diseño y la implementación de software.

Puedes aprenderlos en [Refactoring Guru](https://refactoring.guru/es/design-patterns) y [Entornos de Desarrollo 8](https://github.com/joseluisgs/EntornosDesarrollo-08-2022-2023).

::: tip **Para saber más..**
Los patrones de diseño fueron popularizados por el libro "Design Patterns: Elements of Reusable Object-Oriented Software" publicado en 1994 por Erich Gamma, Richard Helm, Ralph Johnson y John Vlissides, conocidos como la "Gang of Four" (GoF). 
:::

### Arquitecturas Software
Una arquitectura de software se refiere a la estructura organizativa fundamental de un sistema de software. Define cómo se dividen, combinan y coordinan los componentes del software para lograr los objetivos del sistema. En el desarrollo de aplicaciones web del lado del servidor (backend), existen varias arquitecturas de software principales:

![Arquitect](/images/dwes/arquitecturas.jpeg)

1. **Arquitectura monolítica**: Es un enfoque tradicional en el que todos los componentes de una aplicación web se agrupan en un solo bloque. La lógica de negocio, la interfaz de usuario y la capa de acceso a datos se encuentran dentro de la misma aplicación. Es fácil de desarrollar y desplegar, pero puede volverse complejo y difícil de mantener a medida que la aplicación crece. Características:
    - Todos los componentes se ejecutan en el mismo proceso y comparten recursos.
    - La escalabilidad puede ser un desafío, ya que la aplicación se ejecuta en una sola instancia.
    - Los cambios en una parte de la aplicación pueden afectar a otras partes.

2. **Arquitectura de capas**: Esta arquitectura divide la aplicación en diferentes capas lógicas, donde cada capa tiene una responsabilidad específica. Las capas típicas incluyen la capa de presentación, la capa de lógica de negocio y la capa de acceso a datos. Cada capa se comunica con la capa adyacente a través de interfaces bien definidas. Características:
    - Mejora la modularidad y la reutilización del código.
    - Permite cambios en una capa sin afectar a las demás.
    - Facilita la escalabilidad y el mantenimiento del sistema.

3. **Arquitectura de servicios web**: Esta arquitectura se basa en la comunicación entre diferentes servicios a través de protocolos web estándar, como HTTP. Cada servicio es una unidad independiente que se puede desarrollar, desplegar y escalar de forma independiente. Los servicios se comunican entre sí para cumplir con los requisitos de la aplicación. Características:
    - Favorece la modularidad y la independencia de los servicios.
    - Permite la integración de diferentes tecnologías y lenguajes de programación.
    - Facilita la escalabilidad horizontal, ya que los servicios se pueden replicar y distribuir en múltiples servidores.

4. **Arquitectura basada en microservicios**: Es una evolución de la arquitectura de servicios web, donde los servicios se dividen en componentes aún más pequeños y autónomos llamados microservicios. Cada microservicio se enfoca en una tarea específica y se comunica con otros microservicios a través de protocolos ligeros. Características:
    - Cada microservicio se puede desarrollar, desplegar y escalar de forma independiente.
    - Mejora la flexibilidad y la agilidad del desarrollo.
    - Permite la adopción de diferentes tecnologías y enfoques dentro de cada microservicio.

Estas son solo algunas de las arquitecturas de software más comunes en el desarrollo de aplicaciones web backend. Cada una tiene sus ventajas y desafíos, y la elección de la arquitectura adecuada depende de los requisitos y objetivos del proyecto.

### Ejemplo de arquitectura: Netflix
La arquitectura de backend de Netflix es conocida por ser altamente escalable y resiliente, diseñada para manejar grandes volúmenes de tráfico y garantizar la disponibilidad y el rendimiento de sus servicios. Netflix adopta una arquitectura basada en microservicios, donde las diferentes funcionalidades se dividen en servicios independientes. Cada microservicio se enfoca en una tarea específica y se comunica con otros servicios a través de interfaces bien definidas. Esto permite una mayor flexibilidad, escalabilidad y mantenimiento de los servicios individuales.

![netflix](/images/dwes/netflix.gif)

### API Web
Una API web (*Application Programming Interface*) es un conjunto de reglas y protocolos que permite a diferentes aplicaciones o sistemas comunicarse y compartir datos entre sí a través de la web. Proporciona un conjunto de funciones y métodos que permiten a los desarrolladores acceder y manipular los datos de una aplicación o servicio específico.

En el contexto de las aplicaciones web, una API web permite que el backend de una aplicación exponga ciertas funcionalidades y datos a otras aplicaciones o servicios, como aplicaciones móviles, sitios web o sistemas externos. Esto permite la integración y la creación de aplicaciones más complejas y robustas.

Las API web se basan en protocolos estándar de la web, como HTTP (Hypertext Transfer Protocol), y utilizan formatos de intercambio de datos como JSON (JavaScript Object Notation) o XML (eXtensible Markup Language) para enviar y recibir información.

Algunos ejemplos comunes de API web incluyen:

1. **API RESTful:** Es un estilo arquitectónico que utiliza los métodos HTTP (GET, POST, PUT, DELETE, etc.) para acceder y manipular recursos en un sistema. Se basa en la representación de recursos a través de URLs (Uniform Resource Locators) y utiliza formatos como JSON para el intercambio de datos.

2. **API GraphQL:** Es un lenguaje de consulta y una especificación para las APIs web. Permite a los clientes solicitar y recibir solo los datos necesarios, lo que mejora la eficiencia y reduce la cantidad de datos transferidos.
   
3. **API Websocket:** Utiliza el protocolo de comunicación de WebSockets para permitir una comunicación bidireccional y en tiempo real entre un cliente y un servidor a través de una conexión persistente. A diferencia de las API tradicionales basadas en HTTP, que siguen un modelo de solicitud-respuesta, las API con WebSockets establecen una conexión continua entre el cliente y el servidor, lo que permite una comunicación más eficiente y en tiempo real.

::: important
Las API web son fundamentales en el desarrollo de aplicaciones modernas, ya que permiten la integración de diferentes servicios y la creación de aplicaciones más flexibles y escalables.
:::
![apis](/images/dwes/apis.gif)

<!-->
Arquitecturas Web¶
Duración y criterios de evaluación


Decisiones de diseño¶
¿Qué tamaño tiene el proyecto?
¿Qué lenguajes de programación conozco? ¿Vale la pena el esfuerzo de aprender uno nuevo?
¿Voy a usar herramientas de código abierto o herramientas propietarias? ¿Cuál es el coste de utilizar soluciones comerciales?
¿Voy a programar la aplicación yo solo o formaré parte de un grupo de programadores?
¿Cuento con algún servidor web o gestor de base de datos disponible o puedo decidir libremente utilizar el que crea necesario?
¿Qué tipo de licencia voy a aplicar a la aplicación que desarrolle?
Herramientas¶
Servidor Web¶
Software que recibe peticiones HTTP (GET, POST, DELETE, ...). Devuelve el recurso solicitado (HTML, CSS, JS, JSON, imágenes, etc...)

El producto más implantando es Apache Web Server (https://httpd.apache.org/), creado en 1995.

Software libre y multiplataforma
Sistema de módulos dinámicos → PHP, Python, Perl
Utiliza el archivo .htaccess para su configuración
En la actualidad, Apache está perdiendo mercado respecto a Nginx (https://www.nginx.com). Se trata de un producto más moderno (2004) y que en determinados escenarios tiene mejor rendimiento que Apache.

Comparativa servidores web: https://w3techs.com/technologies/history_overview/web_server/ms/q
Servidor de Aplicaciones¶
Software que ofrece servicios adicionales a los de un servidor web:
Clustering
Balanceo de carga
Tolerancia a fallos
Tomcat (http://tomcat.apache.org/) es el servidor de aplicaciones open source y multiplataforma de referencia para una arquitectura Java.
Contiende un contenedor Web Java que interpreta Servlets y JSP.
Info

Tanto los servidores web como los servidores de aplicaciones los estudiaremos en profundidad en el módulo de "Despliegue de Aplicaciones Web".

Lenguajes en el servidor¶
Las aplicaciones que generan las páginas web se programan en alguno de los siguientes lenguajes:

PHP
JavaEE: Servlets / JSP
Python
ASP.NET → Visual Basic .NET / C#
Ruby
...
JavaEE¶
Java Enterprise Edition es la solución Java para el desarrollo de aplicaciones enterprise. Ofrece una arquitectura muy completa y compleja, escalable y tolerante a fallos. Planteada para aplicaciones para grandes sistemas.

JavaEE

PHP¶
Lenguaje de propósito general diseñado para el desarrollo de páginas web dinámicas
En un principio, lenguaje no tipado.
Actualmente en la versión 8. Se recomienda al menos utilizar una versión superior a la 7.0.
Código embebido en el HTML
Instrucciones entre etiquetas 
```php
<?
``` 
php y 

```php
?>
```
Para generar codigo dentro de PHP, podemos usar la instrucción echo
Multitud de librerías y frameworks:
Laravel, Symfony, Codeigniter, Zend
Su documentación es bastante completa: https://www.php.net/manual/es/index.php

El siguiente mapa mental muestra un resumen de sus elementos:


Elementos del lenguaje PHP
Durante las siguientes unidades vamos a estudiar PHP en profundidad.

Puesta en marcha¶
Para poder trabajar con un entorno de desarrollo local, hemos de preparar nuestro entorno de desarrollo con las herramientas comentadas. A lo largo del curso vamos a utilizar la versión 8 de PHP.

XAMPP¶
XAMPP (https://www.apachefriends.org/es/index.html) es una distribución compuesta con el software necesario para desarrollar en entorno servidor. Se compone de las siguientes herramientas en base a sus siglas:

X para el sistema operativo (de ahí que se conozca tamnbién como LAMP o WAMP).
A para Apache.
M para MySQL / MariaDB. También incluye phpMyAdmin para la administración de la base de datos desde un interfaz web.
P para PHP.
la última P para Perl.
Desde la propia página se puede descargar el archivo ejecutable para el sistema operativo de nuestro ordenador. Se recomienda leer la FAQ de cada sistema operativo con instrucciones para su puesta en marcha.

XAMPP en Windows

Si vas a trabajar con tu propio ordenador, XAMPP es una solución más sencilla que Docker, sobre todo si trabajar con Windows como sistema operativo.

Docker¶
Docker (https://www.docker.com) es un gestor de contenedores, considerando un contenedor como un método de virtualización del sistema operativo.

El uso de contenedores requiere menos recursos que una máquina virtual, por lo tanto, su lanzamiento y detención son más rápidos que las máquinas virtuales.

Así pues, Docker permite crear, probar e implementar aplicaciones rápidamente, a partir de una serie de plantillas que se conocen como imágenes de Docker.

Para ello es necesario tener instalado Docker Desktop (https://www.docker.com/products/docker-desktop) en nuestros entornos de desarrollo (el cual ya incluye en nucleo de Docker y la herramienta docker compose). En los ordenadores del aula ya está instalado. Para instalarlo en casa, en el caso de Windows, es necesario instalar previamente WSL 2, el cual es un subsistema de Linux dentro de Windows.

A lo largo del curso iremos creando diferentes contenedores con los servicios necesarios, de manera que cada vez sólo trabajemos con el software mínimo.

Versiones

A lo largo del curso vamos a usar PHP 8.0. Respecto a Docker, para escribir los apuntes hemos utilizado la version 20.10 y la version 2.19 de docker compose. Finalmente, la versión de Docker Desktop que hemos utilizado es la 4.0.

Plantilla Servidor Web + PHP¶
Docker se basa en el uso de imágenes para crear contenedores. Docker Compose simplifica el trabajo con múltiples contenedores, y por ello, para facilitar el arraque, nos centraremos en Docker Compose utilizando una plantilla que únicamente va a contener como servicios Apache/Nginx y PHP.

Para ello, vamos a rellenar el archivo docker-compose.yaml con:


Apache y PHP
Nginx y PHP
# Services
services:
  # Apache + PHP
  apache_php:
    image: php:8-apache
    # Preparamos un volumen para almacenar nuestro código
    volumes:
      - ./src/:/var/www/html
    expose:
      - 80
    ports:
      - 80:80

Dentro de la carpeta que contenga dicho archivo, hemos de crear una carpeta src donde colocaremos nuestro código fuente. Para facilitar la puesta en marcha, tenéis la plantilla de Apache/PHP (versión 2 con a2enmod rewrite) o Nginx/PHP disponible para su descarga.

Cuando estemos listos, lanzaremos el servicio mediante:

docker-compose up -d
Si queremos ver el contenido de los archivos de log del servicio utilizaremos:

docker-compose logs -f
Para copiar un archivo desde nuestro sistema al interior del contenedor:

docker cp ./miFichero idContenedor:/tmp
Y al revés, si queremos consultar un archivo contenido dentro de un contenedor, lo copiaremos a nuestro sistema:

docker cp idContenedor:/tmp/archivoAConsultar.txt ./
Finalmente, si queremos acceder a un terminal interactivo dentro del contenedor:

docker exec -it nombreContenedor bash
Otros comandos que podemos llegar a utilizar son:

docker ps: Ver los contenedores que se estan ejecutando
docker ps -a: Ver todos los contenedores
docker start nombreContenedor: Arrancar un contenedor
docker images: Ver las imágenes que tenemos descargadas
Otra forma más sencilla para lanzar de nuevo los contenedores y gestionarlos una vez creados es utilizar el interfaz gráfico que ofrece Docker Desktop:


Arranque de contenedor mediante Docker Desktop
Docker stack

Existen diversas opciones mediante Docker que ofrecen soluciones completas y empaquetas para todo el stack de desarrollo. En posteriores sesiones utilizaremos tanto Devilbox (http://devilbox.org) como Laradock (https://laradock.io)

Pero quiero saber cómo funciona...

En el módulo de Despliegue de aplicaciones estudiaréis en profundidad, además de Docker, Apache y otros servicios que nos servirán de ayuda para el desarrollo en entorno servidor.

Entorno de desarrollo¶
En este curso vamos a emplear Visual Studio Code (https://code.visualstudio.com) como entorno de desarrollo (IDE). Existen otras alternativas, siendo PhpStorm la más conocida pero siendo de pago. Otra posibilidad es utilizar Eclipse, aunque es un entorno bastante pesado.

VSCode es un editor de código fuente que se complementa mediante extensiones. Para facilitar el trabajo a lo largo del curso vamos a utilizar las siguientes extensiones:

PHP Intelephense
Docker
En la siguiente sesión comenzaremos a utilizar Intelephense pero en esta sesión nos vamos a centrar en Docker (más adelante instalaremos nuevas extensiones).

Por ejemplo, si abrimos la extensión de Docker, podréis visualizar tanto los contenedores como las imágenes de vuestro sistema. Desde cada contenedor, mediante clic derecho, podemos iniciar/detener/reiniciar cada contenedor, así como ver su contenido o abrir un terminal dentro del mismo.


Opciones mediante extensión Docker en VSCode
Hola Mundo¶
Y como no, nuestro primer ejemplo será un Hola Mundo en PHP.

Si nombramos el archivo como index.php, al acceder a http://localhost automáticamente cargará el resultado:
```php
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hola Mundo</title>
</head>
<body>
    <?php
        echo "Hola Mundo";
    ?>
</body>
```
Referencias¶
Curso de introducción a Docker, por Sergi García Barea : https://sergarb1.github.io/CursoIntroduccionADocker/
Artículo Arquitecturas Web y su evolución
Actividades¶
Busca en internet cuales son los tres frameworks PHP más utilizados, y indica:

Nombre y URL
Año de creación
Última versión
Busca tres ofertas de trabajo de desarrollo de software en Infojobs en la provincia de Alicante que citen PHP y anota:

Empresa + puesto + frameworks PHP + requísitos + sueldo + enlace a la oferta.
Una vez arrancado el servicio PHP (mediante XAMPP o Docker), crea el archivo info.php y añade el siguiente fragmento de código:
```php
<?php phpinfo() ?>
```

Anota los valores de:
Versión de PHP
Loaded Configuration File
memory_limit
DOCUMENT_ROOT
Abre el archivo php.ini-production que está dentro del contenedor (puedes averiguar la ruta a partir de la propiedad Configuration File (php.ini) Path) e indica para qué sirven las siguientes propiedades y qué valores contienen:

file_uploads
max_execution_time
short_open_tag
php.ini

Es el archivo de configuración de PHP, y en toda instalación vienen dos plantillas (php.ini-development y php.ini-production) para que elijamos los valores más acordes a nuestro proyecto y creemos nuestro archivo propio de php.ini.
-->