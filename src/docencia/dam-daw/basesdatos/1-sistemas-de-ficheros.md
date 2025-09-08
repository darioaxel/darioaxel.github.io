---
title: UT01 Sistemas de Ficheros
icon: material-symbols:book-5-outline
---
# Tema 1: Sistemas de almacenamiento de información
![Prueba imagen en /images/bbdd](/images/bbdd/01_image_1.png)

**RESULTADOS DE APRENDIZAJE**
> *R.A.1.* Reconoce los elementos de las bases de datos analizando sus funciones y valorando la utilidad de sistemas gestores.

> [!info] 
> **Caso Práctico**
>
> A la empresa **BK Sistemas Informáticos** le ha surgido un nuevo proyecto a desarrollar para un pequeño taller mecánico.
>
>El analista del que dispone la empresa ha estado hablando con ellos y ha concluido que su actividad consiste en la reparación de vehículos de todas las marcas tanto de mecánica, como de chapa y pintura y electricidad.
>
>Desde el taller le han comentado que necesitarán guardar y extraer información como:
>
> 1. Los datos de los clientes del taller.
> 2. Las reparaciones más habituales que se realizan en cada modelo y marca.
> 3. Controlar la entradas y salidas de piezas para las reparaciones y su coste.
> 4. El beneficio que se obtiene con cada tipo de reparación, etc.
>
> Por tanto, desde **BK Sistemas Informáticos** se ponen manos a la obra, sabiendo que la información obtenida sea adecuada, oportuna y útil depende de que las decisiones que se tomen sean acertadas o no.

## 1. Introducción

Desde tiempos remotos, los datos han sido registrados por el hombre en algún tipo de soporte (piedra, papel, madera, barro, etc) a fin de que quedara constancia de un fenómeno o idea.

![tablilla](https://upload.wikimedia.org/wikipedia/commons/a/ad/Tablilla_de_barro_contable.jpg)

Esta necesidad no ha variado y, en la actualidad, para tomar decisiones acertadas en cualquier actividad económica  se requiere manejar una buena **información** que se obtendrá a partir de  los **datos.** Entendemos los datos como hechos aislados. Cuando los datos se organizan y se tratan de obtiene **información**.

En nuestro día a día, para manejar los datos con eficacia utilizaremos una **base de datos**, que nos ayudará a almacenar y procesar esos datos, extraer la información necesaria y tomar decisiones.

![](https://upload.wikimedia.org/wikipedia/commons/f/fd/Inside_a_Post_Office_Savings_Bank_deposit_book.jpg)

Las bases de datos han evolucionado a partir de los **sistemas de archivos** que presentaban una serie de problemas y limitaciones que actualmente han sido superados, hasta llegar a los actuales sistemas de minería de datos y bibliotecas de análisis. 

Dentro de las bases de datos existen distintos modelos con sus ventajas e inconvenientes. Actualmente el modelo más extendido es el **modelo relacional**.

Aunque los sistemas de bases de datos proporcionan una visión de alto nivel de los datos, al final los datos se tienen que almacenar como bits en uno o varios dispositivos de almacenamiento. Una amplia mayoría de las bases de datos de hoy en día almacenan los datos en discos magnéticos y los extraen a la memoria del espacio principal para su procesamiento. La estructura lógica y los métodos de acceso a los datos pueden variar en función del tipo de dato a guardar, de las necesidades de velocidad de recuperación de esos datos y de su importancia. 

## 2. Información y datos

Antes de nada, debemos comprender en qué se diferencia el **conocimiento** de los **datos** y de la **información**. En una conversación informal, los tres términos suelen utilizarse indistintamente y esto puede llevar a una interpretación libre del concepto de conocimiento. 

Quizás la forma más sencilla de diferenciar los términos sea pensar que los datos están localizados en el mundo y el conocimiento está localizado en agentes de cualquier tipo, mientras que la información adopta un papel mediador entre ambos. Un agente no equivale a un ser humano. Podría tratarse de un animal, una máquina o una organización constituida por otros agentes a su vez.

#### **Dato**


> *Datos son hechos conocidos que pueden registrarse y que tienen un significado implícito.*
> 
> **Ramez Elmasri y Shamkant B. Navathe**
 

Un dato es un conjunto discreto, de factores objetivos sobre un hecho real. Dentro de un contexto
empresarial, el concepto de dato es definido como un registro de transacciones. Un dato no dice nada sobre el porqué de las cosas, y por sí mismo tiene poca o ninguna relevancia o propósito.

Los datos describen únicamente una parte de lo que pasa en la realidad y no proporcionan juicios de valor o interpretaciones, y por lo tanto no son orientativos para la acción. La toma de decisiones se basará en datos, pero estos nunca dirán lo que hacer. Los datos no dicen nada acerca de lo que es importante o no. A pesar de todo, los datos son importantes para las organizaciones, ya que son la base para la creación de información.

“los datos del censo; el análisis aportó datos de gran interés respecto a la génesis de esta fobia; cada ficha contiene los datos comerciales, fiscales y estadísticos de cada proveedor; estos datos configuran una densidad de población débil, aunque ello no descarta que haya núcleos muy poblados y muchas regiones vacías”

El significado de un dato cambia dependiendo dentro del contexto en que se encuentre.

- Considere el número **25…**
- Ahora… **25 “Kilos”**
- Y ahora… **25 “kilos” de “patatas”**
- Finalmente… **25 “kilos” de “patatas” en “mercado” de “Concepción”**

  
#### **Información**

Como han hecho muchos investigadores que han estudiado el concepto de información, lo
describiremos como un mensaje, normalmente bajo la forma de un documento o algún tipo de
comunicación audible o visible. Como cualquier mensaje, tiene un emisor y un receptor. La información es capaz de cambiar la forma en que el receptor percibe algo, es capaz de impactar sobre sus juicios de valor y comportamientos. Tiene que informar; son datos que marcan la diferencia.

La palabra *“informar”* significa originalmente *“dar forma a “* y la información es capaz de formar a la persona que la consigue, proporcionando ciertas diferencias en su interior o exterior. Por lo tanto,
estrictamente hablando, es el receptor, y no el emisor, el que decide si el mensaje que ha recibido es realmente información, es decir, si realmente le informa. 

Un informe lleno de tablas inconexas, puede ser considerado información por el que lo escribe, pero a su vez puede ser juzgado como “ruido” por el que lo recibe.

A diferencia de los datos, la información tiene significado (relevancia y propósito). No sólo puede formar potencialmente al que la recibe, sino que esta organizada para algún propósito. Los datos se convierten en información cuando su creador les añade significado. 

Transformamos datos en información añadiéndoles valor en varios sentidos. Hay varios métodos:

• **Contextualizando**: sabemos para qué propósito se generaron los datos.
• **Categorizando**: conocemos las unidades de análisis de los componentes principales de los datos.
• **Calculando**: los datos pueden haber sido analizados matemática o estadísticamente.
• **Corrigiendo**: los errores se han eliminado de los datos.
• **Condensando**: los datos se han podido resumir de forma más concisa.

#### **Conocimiento**

La mayoría de la gente tiene la sensación intuitiva de que el conocimiento es algo más amplio, más profundo y más rico que los datos y la información.

Vamos a intentar realizar una primera definición de conocimiento que nos permita comunicar que queremos decir cuando hablamos de conocimiento dentro de las organizaciones.

Para *Davenport y Prusak (1999)* el conocimiento es “*una mezcla de experiencia, valores, información y “saber hacer” que sirve como marco para la incorporación de nuevas experiencias e información, y es útil para la acción. Se origina y aplica en la mente de los conocedores.”* 

En las organizaciones con frecuencia no sólo se encuentra dentro de documentos o almacenes de datos, sino que también esta en rutinas organizativas, procesos, prácticas, y normas.

Lo que inmediatamente deja claro la definición es que ese conocimiento no es simple. Es una mezcla de varios elementos; es un flujo al mismo tiempo que tiene una estructura formalizada; es intuitivo y difícil de captar en palabras o de entender plenamente de forma lógica. El conocimiento existe dentro de las personas, como parte de la complejidad humana y de nuestra impredecibilidad. El conocimiento puede ser visto como un proceso (flujo) o como algo acumulado.

El conocimiento se deriva de la información, así como la información se deriva de los datos. Para que la información se convierte en conocimiento, las personas deben hacer prácticamente todo el trabajo.

## 3. Sistemas de almacenamiento de la información

### 3.1. Evolución de los sistemas de almacenamiento de la información

Aunque, como hemos visto al inicio del tema, existen referencias a diferentes elementos y sistemas para el almacenamiento de la información desde los inicios de la historia, en este punto pasaremos a estudiar aquellos sistemas generados de manera informática.

### 3.1.1. Orígenes de los Sistemas de Gestión de Bases de Datos

Los *sistemas de gestión de bases de datos* (en inglés DBMS) surgieron por primera vez en la década de 1960, cuando las empresas y organizaciones comenzaron a reconocer la necesidad de soluciones efectivas para la gestión de datos. 

En los primeros sistemas de bases de datos, a menudo denominados sistemas basados en archivos, los datos se almacenaban y recuperaban utilizando archivos planos. Estos sistemas carecían de la escalabilidad y flexibilidad necesarias para adaptarse a las cambiantes necesidades de las organizaciones, y estaban desactualizados e inflexibles.



**Hitos Clave:** La introducción de los modelos jerárquico y de red en las décadas de 1960 y 1970 marcaron hitos importantes en la evolución de los DBMS. Estos modelos proporcionaron estructuras jerárquicas y en red para organizar y acceder a los datos, sentando las bases para tecnologías de bases de datos más sofisticadas.



Los primeros modelos en surgir fueron:

**Modelo Jerárquico:** En el modelo jerárquico, los datos se organizan en una estructura similar a un árbol con relaciones padre-hijo entre los registros. Este modelo fue popularizado por el sistema de gestión de información (IMS) de IBM y proporcionó acceso eficiente a estructuras de datos jerárquicas como organigramas y listas de materiales.

**Modelo de Red:** El modelo de red introdujo el concepto de conjuntos y relaciones entre los registros, permitiendo estructuras de datos más complejas. Este modelo se implementó en sistemas de bases de datos como CODASYL (Conferencia sobre Lenguajes de Sistemas de Datos) y proporcionó mayor flexibilidad para representar datos interconectados.

#### 3.1.2. Ascenso de las Bases de Datos Relacionales

La década de 1970 fue testigo de un avance revolucionario con el desarrollo de los *sistemas de gestión de bases de datos relacionales (RDBMS)*, pioneros por Edgar F. Codd. Las bases de datos relacionales introdujeron **tablas, filas y columnas**, junto con el lenguaje de consulta estructurado (SQL) que permite la manipulación y consulta de datos.

El modelo relacional ofreció varias innovaciones clave, como la independencia de datos, el lenguaje de consulta declarativo y el soporte para transacciones ACID. Estas características hicieron que las bases de datos relacionales fueran más flexibles, escalables y adecuadas para una amplia gama de aplicaciones en diversas industrias.

**Álgebra Relacional:** El álgebra relacional de Codd proporcionó una base teórica para las bases de datos relacionales, definiendo operaciones como selección, proyección, unión y unión. Este marco algebraico permitió a los desarrolladores realizar manipulaciones de datos complejas utilizando consultas simples y declarativas.

### 3.1.3. Surgimiento de las Bases de Datos NoSQL

La aparición de las *bases de datos NoSQL* (Not Only SQL) a principios de la década de 2000 fue impulsada por el crecimiento exponencial de los datos en la era digital y la demanda de soluciones de almacenamiento de datos escalables y de alto rendimiento. Las bases de datos NoSQL proporcionaron alternativas a las bases de datos relacionales tradicionales, ofreciendo opciones para diversos tipos de datos, volúmenes y necesidades de procesamiento.

**Tipos de Bases de Datos NoSQL:** Las bases de datos NoSQL abarcan varios tipos, incluidos las orientadas a documentos, las de clave-valor, las de familia de columnas y las de grafos. Cada tipo está optimizado para casos de uso específicos, como el modelado flexible de datos, las arquitecturas distribuidas y la alta disponibilidad.

**Bases de Datos Orientadas a Documentos:** Las bases de datos orientadas a documentos, como MongoDB y Couchbase, almacenan datos en documentos flexibles y sin esquema, generalmente en formato JSON o BSON. Estas bases de datos son adecuadas para manejar datos semiestructurados y casos de uso como la gestión de contenido, los perfiles de usuario y los catálogos de productos.

**Almacenes de Clave-Valor:** Los almacenes de clave-valor, como Redis y Amazon DynamoDB, almacenan datos como pares clave-valor y ofrecen acceso rápido y escalable a datos de acceso frecuente. Estas bases de datos son ideales para el almacenamiento en caché, la gestión de sesiones y las aplicaciones de análisis en tiempo real.

### 3.1.4. Evolución de las Bases de Datos Distribuidas

Las bases de datos distribuidas, que abarcan múltiples nodos, regiones o centros de datos, son una evolución de los sistemas distribuidos impulsada por la proliferación de los big data, la computación en la nube y los sistemas distribuidos. Las bases de datos distribuidas permiten a las organizaciones procesar y analizar enormes volúmenes de datos en entornos distribuidos, gracias a su escalabilidad, tolerancia a fallos y disponibilidad global.

**Tipos de Bases de Datos Distribuidas:** Las bases de datos distribuidas se presentan en diversas formas, como las bases de datos fragmentadas, las bases de datos replicadas y las bases de datos multimodelo. Estas bases de datos aprovechan las arquitecturas distribuidas, las técnicas de replicación y los algoritmos de consenso para garantizar la coherencia y la disponibilidad de los datos.

**Bases de Datos Fragmentadas:** La fragmentación implica dividir los datos en fragmentos más pequeños y manejables y distribuirlos en múltiples nodos o clústeres. Cada fragmento opera de forma independiente, lo que permite la escalabilidad horizontal y mejora el rendimiento. Las bases de datos fragmentadas, como Google Bigtable y Apache Cassandra, son adecuadas para manejar conjuntos de datos masivos y cargas de trabajo de alto rendimiento.

**Bases de Datos Replicadas:** La replicación implica mantener copias de los datos en múltiples nodos o centros de datos para garantizar la disponibilidad de los datos y la tolerancia a fallos. Las bases de datos replicadas, como Apache HBase y Amazon Aurora, utilizan técnicas como la replicación maestro-esclavo y la replicación multimaestro para sincronizar los datos entre las réplicas y manejar escenarios de conmutación por error.

### 3.1.5. Tendencias e Innovaciones Futuras

Se espera que los desarrollos en las bases de datos blockchain, las bases de datos en memoria y las bases de datos federadas impulsen el desarrollo de los sistemas de gestión de bases de datos (DBMS) en el futuro. Las bases de datos blockchain son ideales para aplicaciones que requieren seguridad, confianza y transparencia, ya que proporcionan almacenamiento de datos descentralizado, inmutable y transparente.

**Bases de Datos en Memoria:** Las bases de datos en memoria aprovechan la memoria principal para almacenar y procesar datos, lo que proporciona un rendimiento ultrarrápido y análisis en tiempo real. Estas bases de datos son adecuadas para el procesamiento de transacciones de alta velocidad, el almacenamiento de datos en tiempo real y las aplicaciones de análisis.

**Bases de Datos Federadas:** Las bases de datos federadas permiten la integración y consulta sin fisuras de datos en fuentes y plataformas de datos heterogéneas. Estas bases de datos aprovechan el procesamiento de consultas distribuidas, la virtualización de datos y la gestión de metadatos para proporcionar una vista unificada de los datos de fuentes dispares.

## 4. Ficheros

### **4.1. Conceptos sobre ficheros.**

> Un **fichero** es una unidad de **almacenamiento lógico no volátil** que agrupa un conjunto de **informaciones relacionada** entre sí **bajo un mismo nombre**.


**CUIDADO:** El nombre fichero es utilizado, normalmente en informática, como sinónimo de archivo, aceptándose el nombrado de estas estructuras de ambas formas en casi todos los textos científicos.


Es importante comprender los tres conceptos que la definición da: volatilidad, almacenamiento lógico y la relación de la información que en él se mantiene. 

El sistema operativo es el encargado de gestionar el sistema de ficheros y directorios. El sistema de gestión de ficheros ofrece a los usuarios una visión lógica del fichero formada por una cadena ordenada de bytes que tiene asociado un puntero, ocultando la estructura física y organización del mismo en la memoria.
💡

¿Qué es un puntero? Un puntero es una variable de memoria que contiene la dirección física de una posición/zona de concreta de la memoria del sistema. Puedes leer más sobre este concepto [aquí](https://es.wikipedia.org/wiki/Puntero_(inform%C3%A1tica))


Las operaciones de escritura y lectura se realizan a partir de dicho puntero, que queda incrementado en el número de *bytes* de la operación. De esta forma, lecturas o escrituras sucesivas afectan a zonas consecutivas del fichero

![image.png]()

La ventaja de la visión lógica como cadena de bytes tiene la ventaja de ser muy simple y permite a las aplicaciones acomodar cualquier estructura interna de fichero que se desee, entre las que se pueden destacar la **estructura en registros de tamaño fijo o variable, o la estructura en árbol**
