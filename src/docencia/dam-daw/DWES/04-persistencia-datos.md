---
title: UT04 Persistencia de datos
date: 2025-09-29    
icon: database
---

<!-- ![banner](/images/dwes/banner02.webp)-->

# UT04 Persistencia de datos
![En construcción](/images/under-construction.jpg)

## 1. La capa de persistencia de datos

La **capa de persistencia** en una aplicación sirve de puente entre la compleja lógica de negocio de una aplicación y el almacén de datos subyacente, que a menudo es una base de datos relacional. Las decisiones que se tomen en esta capa repercuten a lo largo de toda la vida útil del software, influyendo en su rendimiento, mantenibilidad y adaptabilidad. Para abordar este desafío, debemos navegar entre los dos paradigmas principales en la persistencia.


### 1.1. Orientado a objetos y orientado a datos: tratando con los desajustes de impedancia

Cada vez que nos adentramos en el ámbito del manejo de motores de persistencia de bases de datos y aplicaciones, nos enfrentamos a un desafío fundamental: **salvar la brecha entre los paradigmas de la aplicación y los de la propia base de datos**. Este proceso de transformación a menudo introduce un **desajuste de impedancia** que puede afectar significativamente el rendimiento y la mantenibilidad de la aplicación.

Es una tarea crítica porque tratamos con principios y conceptos completamente distintos al comparar Java con cualquier motor de base de datos.

* Por un lado del espectro, tenemos lenguajes de alto nivel como podría ser Java, un lenguaje que presume de **herencia, polimorfismo, encapsulación** y un **rico sistema de tipos**. Estos conceptos orientados a objetos dan forma a la manera en que diseñamos y construimos nuestras aplicaciones. Proporcionan un alto nivel de abstracción y estructura que nos ayuda a gestionar la complejidad y mantener el código de forma eficaz.

* Por otro lado, cuando observamos la base de datos, encontramos un mundo dominado por conceptos como **normalización, desnormalización, indexación y optimización de consultas**. Las bases de datos se centran en almacenar y recuperar datos de manera eficiente, a menudo con el rendimiento como máxima prioridad. La base de datos no comprende ni admite de forma inherente las características orientadas a objetos, lo que puede generar impedancias al intentar sincronizar estos dos mundos distintos.

---

*Figura 1: El desajuste entre una base de datos y el lenguaje de programación Java*

---

Para salvar esta brecha y crear una conexión fluida entre aplicaciones y bases de datos, confiamos en diversos **patrones de diseño** y enfoques arquitectónicos. Estos patrones actúan como traductores, ayudando a reducir el impacto del desajuste de impedancia y a lograr que ambos mundos trabajen juntos de forma armoniosa.

Estos patrones de diseño no reinventan la rueda. Son soluciones bien establecidas que han demostrado ser eficaces para mitigar el desajuste de impedancia entre los paradigmas de aplicación y base de datos. Entre ellos se incluyen el **Patrón Driver**, el **Patrón Mapper**, el **Patrón Active Record** y el **Patrón Repository**.


En un extremo del espectro, tenemos el clásico paradigma de la **Programación Orientada a Objetos (OOP)**. Inspirada en los principios expuestos en libros como *“Clean Code”* de Robert Martin, la OOP pone un fuerte énfasis en los siguientes aspectos clave:

* **Ocultar datos para exponer comportamiento**: OOP fomenta la encapsulación, que consiste en ocultar las estructuras internas de datos y exponer interfaces bien definidas para el comportamiento. Este enfoque favorece la modularidad y el mantenimiento al limitar la manipulación de datos a métodos controlados.
* **Polimorfismo**: permite que objetos diversos sean tratados como si compartieran características comunes. En Java, se logra mediante la sobrescritura y la sobrecarga de métodos, permitiendo llamadas dinámicas y adaptables a métodos para distintos tipos de objetos.
* **Abstracción**: simplifica conceptos complejos en el software modelando clases basadas en objetos del mundo real. En Java, se implementa usando clases abstractas e interfaces, garantizando un comportamiento consistente a la vez que permite diversas implementaciones.

En el otro extremo, adoptamos los principios de la **Programación Orientada a Datos (DOP)**, tal como los define Yehonathan Sharvit, un ingeniero de software con más de veinte años de experiencia. Estos principios son particularmente relevantes cuando se trabaja con bases de datos y operaciones intensivas en datos. La DOP fomenta las siguientes prácticas:

* **Separar el código (comportamiento) de los datos**: la DOP promueve desacoplar la lógica de manipulación de datos de los propios datos. Esta separación permite una mayor flexibilidad y eficiencia en el procesamiento de datos.
* **Representar los datos con estructuras genéricas de datos**: en lugar de depender de jerarquías complejas de objetos, la DOP recomienda usar estructuras de datos genéricas para el almacenamiento, lo que posibilita una manipulación y procesamiento eficientes de los datos.
* **Tratar los datos como inmutables**: la inmutabilidad de los datos es un concepto clave en DOP. Los datos inmutables aseguran que los cambios en los datos sean controlados y predecibles, lo que los hace adecuados para el procesamiento concurrente.
* **Separar el esquema de datos de la representación de los datos**: la DOP fomenta separar la estructura de los datos (esquema) de la forma en que se representan. Esto habilita flexibilidad y adaptabilidad en la gestión de datos.

---

¿Quieres que te prepare también una **tabla comparativa en español** entre OOP y DOP para usar como recurso visual en el tema de persistencia de datos?

## 2. Patrones de diseño de persistencia

Al explorar los patrones de diseño de persistencia, comenzaremos nuestro recorrido en el núcleo, cerca de la propia base de datos, y avanzaremos gradualmente hacia el lado de la programación orientada a objetos. 

Este enfoque nos permite primero adentrarnos en patrones que interactúan directamente con la base de datos, enfatizando principios orientados a los datos y manejando información en bruto. A medida que avanzamos, nos centraremos en la programación orientada a objetos, donde los datos se transforman en entidades específicas de la aplicación. Pasando de patrones cercanos a la base de datos a aquellos alineados con los paradigmas orientados a objetos, entendemos cómo salvar la brecha entre la gestión de datos y la lógica de la aplicación, creando aplicaciones Java robustas y eficientes. 

Descubramos los patrones que conectan sin problemas estos dos aspectos fundamentales del desarrollo de software. 


### 2.1. Patrón Driver

En primer lugar, hablamos del **Patrón Driver** y su papel en el manejo de la comunicación con la base de datos. Este patrón, más cercano a la base de datos, ofrece una perspectiva única sobre la programación orientada a datos, mostrando la flexibilidad que proporciona.

El **Patrón Driver** es principalmente responsable de establecer la conexión y comunicarse con la base de datos. En muchos escenarios, este patrón es más fluido en la capa de base de datos, y se puede observar su implementación en diversos ejemplos y frameworks, como los **drivers JDBC** para bases de datos relacionales o las capas de comunicación para bases de datos NoSQL como MongoDB y Cassandra.

El siguiente fragmento de código proporciona un ejemplo sencillo de uso del **Patrón Driver** con Java y JDBC para la comunicación con la base de datos. Este ejemplo demuestra la extracción de datos de una tabla de base de datos y muestra la inmutabilidad a menudo asociada con la programación orientada a datos:

```java
try (Connection conn = DriverManager.getConnection(DB_URL, USER, PASS);
     Statement stmt = conn.createStatement();
     ResultSet rs = stmt.executeQuery(QUERY);) {
    // Extract data from result set
    while (rs.next()) {
        // Retrieve data by column name
        System.out.print("ID: " + rs.getInt("id"));
        System.out.print(", name: " + rs.getString("name"));
        System.out.print(", birthday: " + rs.getString("birthday"));
        System.out.print(", city: " + rs.getString("city"));
        System.out.println(", street: " + rs.getString("street"));
        // Handle and process data as needed...
    }
}
```

En este código, `ResultSet` se comporta como un mapa de solo lectura, ofreciendo métodos *getter* para acceder a los datos del resultado de la consulta. Este enfoque se alinea con los principios de la programación orientada a datos, enfatizando la inmutabilidad de los datos.

Por un lado, el Patrón Driver y este enfoque orientado a datos proporcionan flexibilidad para manejar los datos, permitiendo tratarlos como entidades de primera clase desde la perspectiva de los datos. Sin embargo, esta flexibilidad también introduce la necesidad de código adicional al convertir los datos en entidades específicas de la aplicación, lo que puede aumentar la complejidad y la posibilidad de introducir errores.

El Patrón Driver ejemplifica que, cuanto más nos acercamos a la base de datos en nuestra arquitectura de aplicación, más interactuamos con los datos como información en bruto, lo cual puede beneficiar escenarios específicos. No obstante, resalta la importancia de un diseño y una abstracción cuidadosa al trasladar los datos de la base de datos a la capa de aplicación, reduciendo significativamente la complejidad y los errores potenciales.

En el contexto del Patrón Driver, obtenemos una visión de la programación orientada a datos, que ofrece una flexibilidad significativa en el manejo de datos en bruto. Sin embargo, esto a menudo exige convertir esos datos en representaciones significativas para nuestros dominios de negocio, especialmente al tratar con *Domain-Driven Design (DDD)*. Para facilitar esta conversión, introducimos el patrón **Data Mapper**, una herramienta poderosa en *Patterns of Enterprise Application Architecture*.

### 2.2. Patrón Data Mapper

El **Data Mapper** es una capa crucial que media entre los objetos y la base de datos, asegurando su independencia mutua y respecto al propio *mapper*. Proporciona un enfoque centralizado para conectar los paradigmas orientados a datos y orientados a objetos. Sin embargo, es importante señalar que, si bien este patrón simplifica el proceso de conversión de datos a objetos, también introduce la posibilidad de desajustes de impedancia.

La implementación del patrón Data Mapper puede observarse en varios frameworks, como **Jakarta Persistence**, anteriormente conocido como JPA. Jakarta Persistence permite mapear entidades mediante anotaciones para crear una conexión fluida entre la base de datos y los objetos. El siguiente fragmento de código muestra cómo mapear una entidad *Person* usando anotaciones de Jakarta Persistence:

```java
@Entity
public class Person {
    @Id @GeneratedValue(strategy = GenerationType.AUTO) 
    Long id;
    String name;

    LocalDate birthday;
    @ManyToOne List<Address> address;
    // ...
}
```

Además, se pueden emplear métodos alternativos cuando no se prefieren anotaciones. Por ejemplo, **Spring JDBC template** proporciona un enfoque flexible. Se puede crear una clase personalizada *PersonRowMapper* para mapear filas de base de datos a la entidad *Person*, como se muestra a continuación:

```java
public class PersonRowMapper implements RowMapper<Person> {
    @Override
    public Person mapRow(ResultSet rs, int rowNum) throws SQLException {
        Person person = new Person();
        person.setId(rs.getInt("ID"));
        // Populate other fields as needed
        return person;
    }
}
```

El patrón Data Mapper no se limita a las bases de datos relacionales. También se puede observar su implementación en bases de datos NoSQL mediante anotaciones o conversión manual de datos a objetos. Esta versatilidad hace que el patrón Data Mapper sea un recurso valioso para manejar datos en distintas tecnologías de base de datos manteniendo una clara separación entre los datos y el modelo de dominio.

### 2.3. Data Access Object (DAO)

En efecto, el patrón Mapper proporciona una manera eficaz de centralizar la conversión entre la base de datos y las representaciones de entidad, ofreciendo beneficios sustanciales en pruebas y mantenimiento de código. Además, permite consolidar las operaciones de base de datos dentro de una capa dedicada. Uno de los patrones destacados en esta categoría es el patrón **Data Access Object (DAO)**, que se especializa en proporcionar operaciones de datos mientras protege a la aplicación de los detalles intrincados de la base de datos.

El DAO sirve como un componente crítico que abstrae y encapsula todas las interacciones con la fuente de datos. Administra eficazmente la conexión con la fuente para recuperar y almacenar datos, manteniendo una clara separación entre la base de datos y la lógica de negocio de la aplicación. Esta separación de responsabilidades permite una arquitectura robusta y fácil de mantener.

Una de las ventajas distintivas del patrón DAO es la estricta separación que impone entre dos partes de una aplicación que no necesitan ser conscientes una de la otra. Esta separación les permite evolucionar de manera independiente y frecuente. Cuando cambia la lógica de negocio, puede apoyarse en una interfaz DAO consistente, mientras que las modificaciones en la lógica de persistencia no afectan a los clientes del DAO.

Ejemplo de interfaz DAO para la entidad *Person*:

```java
public interface PersonDAO {
   Optional<Person> findById(Long id);
   List<Person> findAll();
   Person update(Person person);
   void delete(Person person);
   Person insert(Person person);
}
```

Aunque el DAO abstrae y encapsula el acceso a datos, se apoya implícitamente en el patrón Mapper para manejar la conversión entre la base de datos y las representaciones de entidad. En consecuencia, esta interacción entre patrones puede introducir un desajuste de impedancia, lo cual es un desafío a la hora de trabajar con operaciones de base de datos.

El patrón DAO es versátil y puede implementarse con diversos frameworks de base de datos, tanto SQL como NoSQL. Por ejemplo, al trabajar con **Jakarta Persistence**, se puede crear una implementación de la interfaz *PersonDAO* para facilitar operaciones de base de datos sobre la entidad *Person*.

Ejemplo simplificado con Jakarta Persistence:

```java
public class JakartaPersistencePersonDAO implements PersonDAO {
    
    private EntityManager entityManager;
        
    @Override
    public Optional<Person> findById(Long id) {
        return Optional.ofNullable(entityManager.find(Person.class, id));
    }
    
    @Override
    public List<User> findAll() {
        Query query = entityManager.createQuery("SELECT p FROM Person p");
        return query.getResultList();
    }
    // ...more 
}
```

### 2.4.  Patrón Active Record

A continuación, encontramos el patrón **Active Record** en la expansión de los patrones de persistencia. Este patrón otorga a una entidad la capacidad de integrarse directamente con la base de datos en función de su herencia, otorgándole efectivamente el “superpoder” de autogestionar operaciones de base de datos. Este enfoque simplifica la integración al consolidar las operaciones dentro de la propia entidad. Sin embargo, conlleva compensaciones, como el acoplamiento fuerte y una posible violación del principio de responsabilidad única.

El patrón Active Record ganó popularidad en la comunidad Ruby y llegó a Java principalmente a través del framework **Quarkus**, con el proyecto **Panache**. Panache simplifica la integración con bases de datos en Java implementando el patrón Active Record, permitiendo que las entidades realicen operaciones sin necesitar una capa de acceso a datos separada.

Ejemplo con Quarkus Panache:

```java
@Entity
public class Person extends PanacheEntity {
    public String name;
    public LocalDate birthday;
    public List<Address> addresses;
}

// Create a new Person and persist it to the database
Person person = ...;
person.persist();

// Retrieve a list of all Person records from the database
List<Person> people = Person.listAll();

// Find a specific Person by ID
person = Person.findById(personId);
```

Aquí, la entidad *Person* hereda de *PanacheEntity* y obtiene métodos como `persist()`, `listAll()` y `findById()`.

---

### 2.5. Patrón Repository

Por último, el patrón **Repository** representa un cambio significativo hacia un enfoque más centrado en el dominio. Media entre el dominio y las capas de mapeo de datos, introduciendo una colección en memoria de objetos de dominio que se alinea con el lenguaje ubicuo de la aplicación.

La principal diferencia con el DAO es el **enfoque semántico**:

* DAO: se centra en operaciones técnicas (insert, update).
* Repository: define métodos expresivos alineados con el lenguaje del dominio.

Ejemplo con **Jakarta Persistence + Jakarta Data**:

```java
@Entity
public class Person {
    private @Id Long id;
    private @Column String name;
    private @Column LocalDate birthday;
    private @ManyToOne List<Address> addresses;
}

public interface People extends CrudRepository<Person, Long> {}
```

Uso:

```java
repository.save(person);
List<Person> people = repository.findAll();
person = repository.findById(personId);
```

Ejemplo más expresivo (Garage):

```java
@Repository
public interface Garage {

    @Save
    Car park(Car car);

    @Delete
    void unpark(Car car);
}
```

Aquí tienes la **traducción exacta** del texto solicitado, manteniendo la terminología técnica y el estilo original:

---

## 3. Objeto de Transferencia de Datos (DTO)

Avanzando, encontramos un patrón ampliamente utilizado y versátil llamado **Data Transfer Object (DTO)**. Este patrón cumple varios propósitos, incluyendo el movimiento fluido de datos a través de diferentes capas o niveles, como cuando se extraen datos para su representación en JSON en una API RESTful. Además, los DTO pueden aislar la entidad del esquema de la base de datos, permitiendo una relación transparente entre la entidad y varios modelos de base de datos.

Esta adaptabilidad permite que la aplicación trabaje con múltiples bases de datos como posibles destinos sin afectar la estructura central de la entidad. Estos son solo dos de los muchos casos de uso de los DTO que demuestran su flexibilidad.

*Figura 4: Dos ejemplos de uso del DTO en aplicaciones Java*

Sin embargo, es esencial recordar que, aunque los DTO ofrecen numerosos beneficios, requieren una gestión cuidadosa de la conversión de datos para garantizar el aislamiento correcto entre capas. El uso de DTO trae consigo el desafío de mantener la consistencia y la coherencia en las diferentes partes de la aplicación, lo cual es un aspecto crucial para su implementación exitosa.


## 4. Segregación de Responsabilidades de Comando y Consulta (CQRS)

A medida que hemos explorado la importancia de las capas y de los Objetos de Transferencia de Datos (DTO) en este recorrido, ahora llegamos al patrón **Command and Query Responsibility Segregation (CQRS)**. CQRS es una poderosa estrategia arquitectónica que separa las operaciones de lectura y actualización dentro de un almacén de datos. Es importante señalar que la aplicación de CQRS puede complementar significativamente el uso de DTO en tu arquitectura.

La implementación de CQRS en tu aplicación puede aportar una multitud de beneficios, incluyendo la **maximización del rendimiento, la escalabilidad y la seguridad**. Puedes gestionar de manera efectiva la transferencia de datos entre el lado de lectura y el de escritura de tu arquitectura CQRS usando DTO. Esto asegura que los datos estén correctamente formateados y transformados entre estas responsabilidades segregadas.

Para quienes están familiarizados con las bases de datos NoSQL, el concepto de CQRS puede resultar bastante conocido. Las bases de datos NoSQL suelen seguir un enfoque de modelado impulsado por consultas, donde los datos están optimizados para su recuperación en lugar de para las actualizaciones. En este contexto, la separación de operaciones de lectura y escritura de CQRS se alinea perfectamente con el comportamiento nativo de estas bases de datos.

Sin embargo, es esencial abordar CQRS con una comprensión matizada. Aunque puede ofrecer ventajas, también introduce complejidades, y su adopción debe sopesarse cuidadosamente en relación con los requisitos específicos de tu aplicación. Algunos inconvenientes potenciales incluyen:

* **Mayor complejidad**: implementar CQRS introduce capas adicionales y separación de responsabilidades, lo que puede incrementar la complejidad de la arquitectura general del sistema. Esta complejidad puede afectar el tiempo de desarrollo, la depuración y la curva de aprendizaje del equipo de desarrollo.
* **Desafíos de sincronización**: mantener la consistencia entre los lados de lectura y escritura del sistema puede ser un reto. Al separar las actualizaciones de las lecturas, garantizar vistas sincronizadas y actualizadas para los usuarios puede requerir una consideración cuidadosa y mecanismos adicionales.
* **Potencial de sobre-ingeniería**: en aplicaciones más sencillas, introducir CQRS puede ser innecesario y conducir a una sobre-ingeniería. Es crucial evaluar si los beneficios justifican la complejidad añadida, especialmente en proyectos con requisitos simples de acceso a datos.

Si bien CQRS puede ofrecer ventajas, viene acompañado de compensaciones, y su adopción debe evaluarse cuidadosamente frente a las necesidades específicas de tu aplicación. La sinergia entre DTO y CQRS puede, en efecto, potenciar una transferencia de datos eficiente dentro de la arquitectura de tu aplicación. Aun así, es crucial reconocer que los beneficios vienen acompañados de desafíos, y se requiere una evaluación cuidadosa del impacto global en la complejidad del sistema, su mantenibilidad y la velocidad de desarrollo.

La combinación de DTO y CQRS puede permitirte gestionar de manera eficiente la transferencia de datos dentro de la arquitectura de tu aplicación. Al mantener una separación clara entre las operaciones de lectura y escritura y usar DTO como intermediarios, puedes disfrutar de los beneficios de rendimiento, escalabilidad y seguridad que ofrece CQRS, mientras te adaptas sin problemas a entornos NoSQL impulsados por consultas, como lo ilustra el siguiente diagrama:

## 5. Mapeo Objeto-Relacional (ORM)

El **Mapeo Objeto-Relacional (ORM)** es el mapeo entre objetos (en el código) y datos almacenados en una base de datos relacional.
En la forma más simple de ORM, una clase se mapea a una tabla en una base de datos; cada objeto se guarda como (mapeado a) una fila en la tabla, y los valores de los atributos se mapean a los campos de la tabla.

### 5.1. Presentación: Persistencia y ORM

**Terminología:**

* **Persistencia** en programación significa conservar valores de datos entre ejecuciones de un programa. La persistencia puede ser en un archivo, base de datos u otra forma de almacenamiento no volátil.
* **Entidad** es un tipo de dato que se persiste. Las clases de modelo en el diseño MVC son a menudo entidades.
  Ejemplo: *Question* y *Choice* en **KU Polls** son entidades.
* No todos los modelos son entidades; por ejemplo, una clase *Credit Card Validator* es parte de un modelo de dominio de comercio electrónico, pero puede no contener datos que persistir: es solo un servicio.

Un programador puede escribir comandos SQL (de bajo nivel) en el código para guardar valores en una base de datos. Esto suele ser una mala idea. No solo es redundante, sino que es una fuente frecuente de problemas de seguridad como la **inyección SQL**.

En lugar de escribir el código de bajo nivel para enviar comandos SQL a la base de datos, se debe usar un framework que realice el **mapeo objeto-relacional**. Este mapea objetos a filas en una base de datos relacional.

### 5.2. Operaciones CRUD en ORM

El ORM debe proporcionar (al menos) las 4 operaciones básicas de base de datos:

* **Create** – guardar un objeto en la base de datos.
* **Retrieve** – recrear un objeto a partir de los datos en la base de datos.
* **Update** – actualizar los datos guardados de un objeto ya persistido.
* **Delete** – eliminar un objeto de la base de datos.

En este curso cubriremos qué servicios proporciona un ORM, no cómo los implementa.

#### Retrieve (recuperación)

La recuperación es la más compleja de las operaciones CRUD. Tiene 2 formas:

1. **Recuperar por id**. Es la forma más sencilla. En Django:

```python
q = Question.objects.get(id=3)   # Devuelve un objeto.
```

`get` puede obtener un objeto en base a cualquier campo especificado, no solo el id.

2. **Consulta por expresión**. Más compleja, y las consultas pueden encadenarse:

```python
today = datetime.date.today()
question_list = Question.objects.filter(pub_date__lte=today)
first_question = question_list.first()
```

Para ser competente usando el ORM, hay que aprender a usar el **lenguaje de consultas**.

#### Ejemplo de código ineficiente

```python
# Obtener todas las preguntas sobre programación 
questions = Question.objects.all()
prog_questions = []
for q in questions:
    if q.lower().find("programming") >= 0:
        prog_questions.append(q)
```

Esto es ineficiente porque recupera todos los datos como objetos, aunque no te interesen la mayoría.

Es un error porque el lenguaje de consultas puede hacerlo por ti:

```python
# Obtener preguntas sobre programación ('__icontains' es insensible a mayúsculas/minúsculas)
prog_questions = Question.objects.filter(question_text__icontains="programming")
```

Esto devuelve un **QuerySet** que puedes seguir refinando o manipulando.

### 5.3. ORM de Django

Cada “entidad” en Django es una subclase de `models.Model`.
La clase `Model` proporciona operaciones CRUD a todas las subclases:

* `save()` – guarda o actualiza un objeto en la base de datos.
* `delete()` – elimina este objeto de la base de datos (pero sigue existiendo en Python, con `id=None`).
* `objects.all()` – recupera todos los objetos. (Evitar su uso indiscriminado).
* `objects.get(id=n)` – obtiene una entidad con el id dado, o cualquier atributo especificado.
* `objects.filter(expression)` – obtiene un QuerySet que puede encadenarse y manipularse sin acceder aún a la base de datos.


#### 5.3.1. El atributo `id`

Cada clase de entidad necesita un campo `id` que sea la clave primaria en la tabla correspondiente de la base de datos. Tiene un valor único que identifica filas en una tabla, de modo que los datos en distintas tablas puedan “relacionarse” entre sí.

Django añade automáticamente un campo entero `id` a las subclases de `Model`. Puedes sobrescribirlo declarando explícitamente un campo `id`, pero es poco común. La mayoría de otros frameworks ORM requieren que el programador declare explícitamente la clave primaria.

El atributo `id` (no obligatorio como nombre, pero convencional) es usado por el ORM para indicar qué objetos han sido persistidos y cuáles son transitorios (no persistidos).

Ejemplo:

```python
>>> q = Question(question_text='Who are you?', pub_date=datetime.now())
>>> q.id
None
>>> q.save()
>>> q.id
5
>>> q.pk
5
>>> q.delete()  # se elimina de la base de datos, pero el objeto sigue en Python
>>> q.id
None
```

Django asigna automáticamente un valor a `id` al persistir el objeto, y lo elimina al borrarlo. Los valores de `id` deben ser únicos.

Además, los modelos heredan la propiedad `pk` que siempre se refiere a `id`.

#### 5.3.2. Claves primarias

* Una **clave primaria sintética** (synthetic id) es un id que no tiene un significado intrínseco en los datos. Generalmente se autogenera de manera secuencial. Django crea automáticamente este tipo de id.
* Una **clave primaria natural** (natural id) sí tiene significado, como el *studentId*. Ningún alumno comparte el mismo, y nunca cambia.

#### 5.3.3. Claves externas y asociaciones

Los objetos se relacionan entre sí usando referencias. Estas relaciones se guardan como **foreign keys** en las tablas de base de datos.

Ejemplo:

```python
class Choice(models.Model):
    choice_text = models.CharField(max_length=80)
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
```

Una *Question* puede tener muchas *Choices* (1 a muchos). Una *Choice* se asocia a una única *Question* (muchos a 1).

#### 5.3.3. Unicidad de objetos en ORM

El ORM debe preservar la unicidad de objetos:

```python
q1 = Question.objects.get(id=5)
q2 = Question.objects.get(question_text='Who are you?')
q1 == q2   # debería ser True
```

Del mismo modo, si varias entidades hacen referencia al mismo objeto, esas referencias deben ser compartidas, no copias duplicadas.

#### 5.3.4. Cascading (operaciones en cascada)

El **cascading** define si una operación sobre un objeto debe propagarse a los objetos asociados.

* Guardar un `Question` debería guardar también sus `Choices`.
* Borrar un `Question` debería borrar también todas sus `Choices`.

Esto se controla en los modelos con opciones como `on_delete=models.CASCADE`.

#### 5.3.5. Instanciación perezosa (*Lazy instantiation*)

Crear objetos desde la base de datos requiere tiempo y memoria. Los ORMs suelen retrasar la creación de objetos hasta que son accedidos.

Django usa **lazy instantiation** en sus QuerySets:

```python
questions = Question.objects.all()  # no crea objetos todavía
```

Los objetos se crean al iterar sobre el QuerySet o acceder a sus atributos.

### 5.4. Patrones de diseño en ORM

Existen **dos patrones principales** en el diseño de ORM:

1. **Data Access Object (DAO):** define una clase separada responsable de las operaciones ORM.

   * En Django no se usa explícitamente, pero podría implementarse creando una capa adicional de servicios que maneje los `QuerySet`.

2. **Active Object (Active Record):** cada clase de entidad proporciona las operaciones ORM por sí misma.

   * En Django, esto se logra haciendo que todas las entidades sean subclases de `Model`, heredando automáticamente los métodos CRUD (`save()`, `delete()`).

👉 Django combina **Active Record** con un **Repository implícito** (`objects` es un *Manager* que actúa como repositorio). Internamente, también implementa principios de **Data Mapper**, ya que convierte filas en objetos Python y viceversa.

### Anti-Patrón MVC: Modelos Anémicos

A veces, las clases de modelo solo exponen atributos y no comportamientos útiles. Martin Fowler las llama **modelos anémicos**.

Ejemplo en Django Polls:

```python
class Choice(models.Model):
    choice_text = models.CharField(max_length=80)
    votes = models.IntegerField(default=0)
```

Es un modelo anémico porque solo almacena datos.

**Solución**: mover comportamiento lógico al modelo.

```python
class Choice(models.Model):
    choice_text = models.CharField(max_length=80)
    votes = models.IntegerField(default=0)

    def add_vote(self):
        self.votes += 1
        self.save()
```

De esta forma, la lógica se encapsula en el modelo, evitando anemias de diseño.

-->