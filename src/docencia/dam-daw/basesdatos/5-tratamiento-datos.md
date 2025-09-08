# Tema 5: Tratamiento de datos

<aside>
💡 **Caso Práctico:**

Ada le ha preguntado a Juan sobre el estado actual del proyecto y él le comenta que está empezando el desarrollo de la aplicación y va a empezar a desarrollar una serie de procesos en los que se deberá almacenar la información que debe manejar la aplicación, así como modificarla o eliminar los datos que así lo requieran.

Estas acciones de tratamiento de la información deberán asegurar que no se obtengan resultados incorrectos, por errores en la ejecución de la aplicación o por las acciones de los usuarios, y además debe asegurar que los datos puedan ser accesibles por varios usuarios simultáneamente.

La aplicación requiere que se puedan dar de alta nuevos usuarios en la base de datos, así como juegos y partidas. Además se podrá modificar en un determinado momento la información personal de los usuarios, de los juegos, o añadir nuevos usuarios a las partidas. También asegurará la posibilidad de suprimir cualquiera de esos datos.

Se debe asegurar que, por ejemplo, una partida no haga referencia a usuario que han sido eliminado, o a juegos que no existen. Un usuario podrá ver reducido su crédito en un determinado momento, y la nueva información de su crédito sólo deberá ser accesible cuando haya finalizado el proceso de reducción del crédito, y no mientras se realiza esa actualización, ya que el crédito disponible no estará actualizado.

Por supuesto, al ser una aplicación online, distintos usuarios podrán realizar operaciones simultáneamente, como crear partidas al mismo tiempo.

</aside>

[Tareas y Ejercicios](https://www.notion.so/ac3243f72a4542c4b06d56257b28ca17?pvs=21)

---

# 1. Introducción

Las bases de datos no tienen razón de ser sin la posibilidad de hacer operaciones para el tratamiento de la información almacenada en ellas. Por operaciones de tratamiento de datos se deben entender las acciones que permiten *añadir* información en ellas, *modificarla* o bien *suprimirla*.

En esta unidad podrás conocer que existen distintos medios para realizar el tratamiento de los datos. Desde la utilización de herramientas gráficas hasta el uso de instrucciones o sentencias del lenguaje SQL que permiten realizar ese tipo de operaciones de una forma menos visual pero con más detalle, flexibilidad y rapidez. El uso de unos mecanismos u otros dependerá de los medios disponibles y de nuestras necesidades como usuarios de la base de datos.

Pero la información no se puede almacenar en la base de datos sin tener en cuenta que debe seguir una serie de requisitos en las relaciones existentes entre las tablas que la componen. Todas las operaciones que se realicen respecto al tratamiento de los datos deben asegurar que las relaciones existentes entre ellos se cumplan correctamente en todo momento.

Por otro lado, la ejecución de las aplicaciones puede fallar en un momento dado y eso no debe impedir que la información almacenada sea incorrecta. O incluso el mismo usuario de las aplicaciones debe tener la posibilidad de cancelar una determinada operación y dicha cancelación no debe suponer un problema para que los datos almacenados se encuentren en un estado fiable.

Todo esto requiere disponer de una serie de herramientas que aseguren esa fiabilidad de la información, y que además puede ser consultada y manipulada en sistemas multiusuario sin que las acciones realizadas por un determinado usuario afecte negativamente a las operaciones de los demás usuarios.

## 1.1. Tratamiento de los datos

El **DML** (Data Manipulation Language) es la parte de SQL dedicada a la manipulación de los datos. Las sentencias **DML** son las siguientes:

- **SELECT**: se utiliza para realizar consultas y extraer información de la base de datos.
- **INSERT**: se utiliza para insertar registros en las tablas de la base de datos.
- **UPDATE**: se utiliza para actualizar los registros de una tabla.
- **DELETE**: se utiliza para eliminar registros de una tabla.

En este tema nos vamos a centrar en el uso de las sentencias **INSERT**, **UPDATE** y **DELETE**.

# 2. Edición de información mediante aplicaciones gráficas

En este módulo estamos utilizando DBeaver, que es una herramienta de edición visual de trabajo para bases de datos muy potente. En su documentación oficial se explica con gran cantidad de detalle cada una de las posibilidades que tiene [ [enlace a la documentación oficial](https://dbeaver.com/wp-content/uploads/wikidocs_archive/dbeaver_v_21_2.pdf) ]

Por ejemplo, para la inserción de datos podemos ir a la pestaña ***Datos*** de la tabla a modificar:

![image.png]()

Una vez ahí, hacer click sobre ***Edición - > Añadir registro***

![image201.png]()

Y podremos introducir manualmente cada uno de los valores del nuevo registro. 

![image202.png]()

IMPORTANTE! Recuerda que has de grabar los datos con los botones que se muestran en la parte inferior de la tabla:

![image203.png]()

# 3. Edición de información mediante comandos SQL

## 3.1. La sentencia ***INSERT***

La sentencia ***INSERT*** permite la inserción de nuevas filas o registros en una tabla existente. Según la documentación oficial de PostgreSQL, esta es la sintaxis de la sentencia ***INSERT*** en PostgreSQL:

```sql
INSERT INTO table_name [ ( column_name [, ...] ) ]
    { DEFAULT VALUES | VALUES ( { expression | DEFAULT } [, ...] ) [, ...] | query }
    [ ON CONFLICT [ conflict_target ] conflict_action ]
    [ RETURNING * | output_expression [ [ AS ] output_name ] [, ...] ]
```

El formato más sencillo de utilización de la sentencia ***INSERT*** tiene la siguiente sintaxis:

```sql
INSERT INTO nombre_tabla (lista_campos) VALUES (lista_valores);
```

Donde:

- *nombre_tabla* será el nombre de la tabla en la que quieras añadir nuevos registros.
- En *lista_campos* se indicarán los campos de dicha tabla en los que se desea escribir los nuevos valores indicados en *lista_valores*. Es posible omitir la lista de campos (*lista_campos*), si se indican todos los valores de cada campo y en el orden en el que se encuentran en la tabla.
    - Tanto la lista de campos *lista_campos* como la de valores *lista_valores*, tendrán separados por comas cada uno de sus elementos.
    - Hay que tener en cuenta también que cada campo de *lista_campos* debe tener un valor válido en la posición correspondiente de la *lista_valores* (Si no recuerdas los valores válidos para cada campo puedes utilizar la sentencia **`*DESCRIBE*`** seguida del nombre de la tabla que deseas consultar).

Para poder probar los ejemplos debes tener creadas y cargadas las tablas de **`Jardineria`**

Antes de ejecutar el siguiente ejemplo que inserta un nuevo registro en la tabla **`*USUARIOS*`** en el que se tienen todos los datos disponibles debes ejecutar la sentencia

```sql
SET DateStyle = 'ISO, DMY';
```

para que tome la fecha en ese formato en el que le estamos dando el dato fecha. De otro modo tendrás que utilizar el formato internacional. **CUIDADO!** Este cambio solo afecta a la sesión actual y se pierde al reiniciar.

Veamos la estructura de la tabla con la que trabajaremos a continuación:

```sql
CREATE TABLE oficina (
  codigo_oficina VARCHAR(10) NOT NULL,
  ciudad VARCHAR(30) NOT NULL,
  pais VARCHAR(50) NOT NULL,
  region VARCHAR(50) DEFAULT NULL,
  codigo_postal VARCHAR(10) NOT NULL,
  telefono VARCHAR(20) NOT NULL,
  linea_direccion1 VARCHAR(50) NOT NULL,
  linea_direccion2 VARCHAR(50) DEFAULT NULL,
  PRIMARY KEY (codigo_oficina)
);
```

A continuación haremos una inserción de datos:

```sql
INSERT INTO oficina (
    codigo_oficina, ciudad, pais, region, codigo_postal, telefono, linea_direccion1, linea_direccion2
) VALUES (
    'OF001', 'Madrid', 'España', 'Comunidad de Madrid', '28001', '+34 912 345 678', 'Calle Gran Vía, 1', 'Piso 3, Puerta B'
);
```

En este otro ejemplo, se inserta un registro de igual manera, pero sin disponer de todos los datos, en este caso de la región, que por defecto el sistema incluirá como NULL:

```sql
INSERT INTO oficina (
    codigo_oficina, ciudad, pais, codigo_postal, telefono, linea_direccion1
) VALUES (
    'OF003', 'Valencia', 'España', '46001', '+34 963 987 654', 'Calle Colón, 20'
);
```

Al hacer un **`*INSERT*`** en el que no se especifiquen los valores de todos los campos, se obtendrá el valor **`*NULL*`** en aquellos campos que no se han indicado.

Si la lista de campos indicados no se corresponde con la lista de valores, o si no se proporcionan valores para campos que no admiten el valor **`NULL`**, se obtendrá un error en la ejecución.

## 3.2. La sentencia UPDATE

La sentencia **`*UPDATE*`** permite modificar una serie de valores de determinados registros de las tablas de la base de datos.

La manera más sencilla de utilizar la sentencia **`*UPDATE*`** tiene la siguiente sintaxis:

```sql
UPDATE nombre_tabla SET nombre_campo = valor [, nombre_ campo = valor]...
[ WHERE condición ];
```

Donde *nombre_tabla* será el nombre de la tabla en la que quieras modificar datos. Se pueden especificar los nombres de campos que se deseen de la tabla indicada. A cada campo especificado se le debe asociar el nuevo valor utilizando el signo =. Cada emparejamiento *campo=valor* debe separarse del siguiente utilizando comas (,).

La cláusula **`*WHERE*`** seguida de la condición es opcional (como pretenden indicar los corchetes). Si se indica, la actualización de los datos sólo afectará a los registros que cumplen la condición. Por tanto, ten en cuenta que si no indicas la cláusula **`*WHERE*`**, los cambios afectarán a todos los registros.

En este apartado trabajaremos sobre la siguiente tabla:

```sql
CREATE TABLE cliente (
  codigo_cliente INTEGER NOT NULL,
  nombre_cliente VARCHAR(50) NOT NULL,
  nombre_contacto VARCHAR(30) DEFAULT NULL,
  apellido_contacto VARCHAR(30) DEFAULT NULL,
  telefono VARCHAR(15) NOT NULL,
  fax VARCHAR(15) NOT NULL,
  linea_direccion1 VARCHAR(50) NOT NULL,
  linea_direccion2 VARCHAR(50) DEFAULT NULL,
  ciudad VARCHAR(50) NOT NULL,
  region VARCHAR(50) DEFAULT NULL,
  pais VARCHAR(50) DEFAULT NULL,
  codigo_postal VARCHAR(10) DEFAULT NULL,
  codigo_empleado_rep_ventas INTEGER DEFAULT NULL,
  limite_credito NUMERIC(15,2) DEFAULT NULL,
  PRIMARY KEY (codigo_cliente),
  FOREIGN KEY (codigo_empleado_rep_ventas) REFERENCES empleado (codigo_empleado)
);
```

Por ejemplo, si se desea poner a 200.00 el límite crédito de todos los clientes:

```sql
UPDATE cliente SET limite_credito = 200.00;
```

En este otro ejemplo puedes ver la actualización de dos campos, poniendo a 0 el límite de crédito y poniendo a Nulos la información del campo linea_direccion2 de todos los usuarios:

```sql
UPDATE cliente SET limite_credito = 0, linea_direccion2 = NULL;
```

Para que los cambios afecten a determinados registros hay que especificar una condición. Por ejemplo, si se quiere cambiar el crédito de todos los clientes de Zaragoza:

```sql
UPDATE cliente SET limite_credito = 300.25 WHERE ciudad = 'Zaragoza';
```

Cuando termina la ejecución de una sentencia **`*UPDATE*`**, se muestra la cantidad de registros (filas) que han sido actualizadas, o el error correspondiente si se ha producido algún problema. Por ejemplo podríamos encontrarnos con un mensaje similar al siguiente:

`9 fila(s) actualizada(s).`

## 3.3. La sentencia DELETE

La sentencia **`*DELETE*`** es la que permite eliminar o borrar registros de un tabla.

Esta es la sintaxis que debes tener en cuenta para utilizarla:

```sql
DELETE FROM nombre_tabla [ WHERE condición ];
```

Al igual que hemos visto en las sentencias anteriores, nombre_tabla hace referencia a la tabla sobre la que se hará la operación, en este caso de borrado. Se puede observar que la cláusula **`*WHERE*`** es opcional. Si no se indica, debes tener muy claro que se borrará todo el contenido de la tabla, aunque la tabla seguirá existiendo con la estructura que tenía hasta el momento. 

Por ejemplo, si usas la siguiente sentencia, borrarás todos los registros de la tabla **`*cliente*:`**

```sql
DELETE FROM cliente;
```

Es tan importante escribir la cláusula  **`WHERE`** en la sentencia,  si no quieres borrar la tabla entera, que incluso hay una canción que lo recuerda.. Puedes verla en este [enlace](https://www.youtube.com/watch?v=i_cVJgIz_Cs).

<aside>
🔥

La cláusula **`DELETE`**  es una de las más peligrosas y con la que todos hemos tenido problemas. Uno de los mejores consejos para evitarlos que me han dado es SIEMPRE poner AL MENOS 2 condiciones en el **`WHERE`**, incluso aunque sean triviales, en toda sentencia **`DELETE`**

</aside>

Para ver un ejemplo de uso de la sentencia **`*DELETE*`** en la que se indique una condición, supongamos que queremos eliminar todos los clientes de Estados Unidos:

```sql
DELETE FROM cliente WHERE pais = 'USA';
```

Como resultado de la ejecución de este tipo de sentencia, se obtendrá un mensaje de error si se ha producido algún problema, o bien, el número de filas que se han eliminado.

### 3.3.2. Borrado y modificación de datos con integridad
referencial

ON DELETE y ON UPDATE: Nos permiten indicar el efecto que provoca el borrado o la actualización de los datos que están referenciados por claves ajenas. Las opciones que podemos especificar son las siguientes:

- **RESTRICT**: Impide que se puedan actualizar o eliminar las filas que tienen valores referenciados por claves ajenas. Es la opción por defecto en PostgreSQL.
- **CASCADE**: Permite actualizar o eliminar las filas que tienen valores referenciados por claves ajenas.
- **SET NULL**: Asigna el valor NULL a las filas que tienen valores referenciados por claves ajenas.
- **NO ACTION**: Es una palabra clave del estándar SQL. En PostgreSQL es equivalente a RESTRICT.
- **SET DEFAULT**: Asigna el valor por defecto a las filas que tienen valores referenciados por claves ajenas.

### Ejemplo práctico:

Supongamos que tienes dos tablas relacionadas: **`oficina`** y **`empleado`**, donde **`empleado`** tiene una clave foránea que referencia a **`oficina`**.

```
CREATE TABLE oficina (
    codigo_oficina VARCHAR(10) PRIMARY KEY,
    ciudad VARCHAR(30) NOT NULL
);

CREATE TABLE empleado (
    id_empleado SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    codigo_oficina VARCHAR(10) REFERENCES oficina(codigo_oficina) ON DELETE RESTRICT
);
```

- Si intentas eliminar una fila de la tabla **`oficina`** que está siendo referenciada por alguna fila en la tabla **`empleado`**, PostgreSQL lanzará un error y no permitirá la eliminación.
- Esto ocurre porque **`RESTRICT`** es el comportamiento predeterminado.

### Comportamiento predeterminado en PostgreSQL:

- Si no especificas una acción en la definición de la clave foránea, PostgreSQL aplicará **`RESTRICT`** tanto para **`ON DELETE`** como para **`ON UPDATE`**.
- Por ejemplo, si defines la clave foránea sin especificar una acción:

```
CREATE TABLE empleado (
    id_empleado SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    codigo_oficina VARCHAR(10) REFERENCES oficina(codigo_oficina)
);
```

En este caso, PostgreSQL aplicará automáticamente **`ON DELETE RESTRICT`** y **`ON UPDATE RESTRICT`**.

# 4. Subconsultas en órdenes de edición

En unidades anteriores has podido conocer una serie de instrucciones del lenguaje SQL que han servido para realizar operaciones de inserción, modificación y eliminación de registros. Tal como las hemos analizado, esas operaciones se realizan con una sola tabla, pero vamos a ver que esas mismas sentencias pueden utilizarse de una forma más avanzada insertando consultas dentro de esas mismas operaciones de tratamiento de datos.

Por tanto, veremos que una tabla se puede ver afectada por los resultados de las operaciones en otras tablas, es decir, que con una misma instrucción se puede añadir más de un registro a una tabla, o bien actualizar o eliminar varios registros basados en otras consultas

Los valores que se añadan o se modifiquen podrán ser obtenidos  como resultado de una consulta.

Además, las condiciones que hemos podido añadir hasta ahora a las sentencias, pueden ser también consultas, por lo que pueden establecerse condiciones bastante más complejas.

## 4.1. Inserciones y creación de tablas mediante subconsultas

Primero vamos a crear nuestro escenario de trabajo con las siguientes tablas:

```sql
-- Crear la tabla clientes
CREATE TABLE clientes (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    ciudad VARCHAR(100)
);

-- Crear la tabla productos
CREATE TABLE productos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    precio NUMERIC(10, 2) NOT NULL
);

-- Crear la tabla pedidos
CREATE TABLE pedidos (
    id SERIAL PRIMARY KEY,
    cliente_id INT REFERENCES clientes(id),
    fecha DATE NOT NULL
);

-- Crear la tabla detalles_pedidos
CREATE TABLE detalles_pedidos (
    id SERIAL PRIMARY KEY,
    pedido_id INT REFERENCES pedidos(id),
    producto_id INT REFERENCES productos(id),
    cantidad INT NOT NULL
);
```

Insertaremos unos pocos datos para poder hacer pruebas:

```sql
-- Insertar datos en la tabla clientes
INSERT INTO clientes (nombre, ciudad) VALUES
('Juan Pérez', 'Madrid'),
('Ana Gómez', 'Barcelona'),
('Carlos Ruiz', 'Valencia');

-- Insertar datos en la tabla productos
INSERT INTO productos (nombre, precio) VALUES
('Laptop', 1200.00),
('Smartphone', 800.00),
('Tablet', 400.00);

-- Insertar datos en la tabla pedidos
INSERT INTO pedidos (cliente_id, fecha) VALUES
(1, '2023-10-01'),
(2, '2023-10-02'),
(3, '2023-10-03');
```

A continuación vemos un ejemplo de cómo realizar la inserción de datos en la tabla detalles_pedido usando datos provenientes de otras tablas:

```sql
-- Insertar datos en detalles_pedidos a partir de una SELECT
INSERT INTO detalles_pedidos (pedido_id, producto_id, cantidad)
SELECT 
    p.id AS pedido_id,
    pr.id AS producto_id,
    2 AS cantidad -- Supongamos que se compran 2 unidades de cada producto
FROM 
    pedidos p
CROSS JOIN 
    productos pr;
```

De igual manera, podemos crear directamente una tabla con los datos insertados que necesitemos, en base al resto de la base de datos:

```sql
-- Crear la tabla resumen_pedidos
CREATE TABLE resumen_pedidos AS
SELECT
    c.nombre AS cliente,
    c.ciudad,
    p.fecha AS fecha_pedido,
    pr.nombre AS producto,
    dp.cantidad,
    (pr.precio * dp.cantidad) AS total
FROM
    detalles_pedidos dp
JOIN
    pedidos p ON dp.pedido_id = p.id
JOIN
    clientes c ON p.cliente_id = c.id
JOIN
    productos pr ON dp.producto_id = pr.id;
```

## 5.2. Borrado y modificación de filas utilizando subquerys

La supresión de entradas en tablas mediante el comando **`DELETE`**( y su modificación utilizando **`*UPDATE`*** ) son operaciones sencillas una vez dominado el lenguaje de modificación de datos mediante SQL. 

# 6 Transacciones

## 6.1. Definición

> Una transacción SQL es un conjunto de sentencias SQL que se ejecutan formando una unidad lógica de trabajo (LUW del inglés Logic Unit of Work), es decir, en forma indivisible o atómica.
> 

Una transacción SQL finaliza con un `COMMIT`, para aceptar todos los cambios que la transacción ha realizado en la base de datos, o un `ROLLBACK` para deshacerlos. PostgreSQL permite realizar transacciones en todas sus tablas, ya que su motor de almacenamiento nativo (por defecto) soporta transacciones de manera completa.

El uso de transacciones nos permite realizar operaciones de forma segura y recuperar datos si se produce algún fallo en el servidor durante la transacción, pero por otro lado, las transacciones pueden aumentar el tiempo de ejecución de las instrucciones.

Las transacciones deben cumplir las cuatro propiedades ACID.

## 6.2 Propiedades ACID

Las propiedades ***ACID*** garantizan que las transacciones se puedan realizar en una base de datos de forma segura. Decimos que un Sistema Gestor de Bases de Datos es ACID compliant cuando permite realizar transacciones.

ACID es un acrónimo de **Atomicity**, **Consistency**, **Isolation** y **Durability**.

- **Atomicidad**: Esta propiedad quiere decir que una transacción es indivisible, o se ejecutan todas las sentencias o no se ejecuta ninguna.
- **Consistencia**: Esta propiedad asegura que después de una transacción la base de datos estará en un estado válido y consistente.
- **Aislamiento**: Esta propiedad garantiza que cada transacción está aislada del resto de transacciones y que el acceso a los datos se hará de forma exclusiva. Por ejemplo, si una transacción quiere acceder de forma concurrente a los datos que están siendo utilizados por otra transacción, no podrá hacerlo hasta que la primera haya terminado.
- **Durabilidad**: Esta propiedad quiere decir que los cambios que realiza una transacción sobre la base de datos son permanentes.

## 6.3 AUTOCOMMIT

PostgreSQL tiene activada por defecto la variable `AUTOCOMMIT`. Esto quiere decir que automáticamente se aceptan todos los cambios realizados después de la ejecución de una sentencia SQL y no es posible deshacerlos.

Aunque la variable `AUTOCOMMIT` está activada por defecto al inicio de una sesión SQL, podemos configurarlo para indicar si queremos trabajar con transacciones implícitas o explícitas.

Podemos consultar el valor actual de `AUTOCOMMIT` haciendo:

```sql
SHOW AUTOCOMMIT;
```

- Para desactivar la variable `AUTOCOMMIT` hacemos:

```sql
SET AUTOCOMMIT TO OFF;
```

Si hacemos esto, siempre tendríamos una transacción abierta y los cambios sólo se aplicarían en la base de datos ejecutando la sentencia `COMMIT` de forma explícita.

- Para activar la variable `AUTOCOMMIT` hacemos:

```sql
SET AUTOCOMMIT TO ON;
```

Para poder trabajar con transacciones en PostgreSQL, no es necesario configurar ningún motor de almacenamiento específico, ya que todas las tablas soportan transacciones de manera nativa. Se recomienda la lectura de la documentación oficial.

<aside>
🔥

**EJERCICIO**: Accede a tu cuenta de VDI del módulo y prueba a desactivar el `AUTOCOMMIT`. Lanza una Query de modificación/insercción o borrado de un dato y cierra la conexión con ese usuario sin hacer `COMMIT`. Comprueba que cuando entres nuevamente el sistema no ha guardado tus cambios.

</aside>

## 6.4 START TRANSACTION, COMMIT y ROLLBACK

Los pasos para realizar una transacción en PostgreSQL son los siguientes:

1. Indicar que vamos a realizar una transacción con la sentencia `START TRANSACTION`, `BEGIN` o `BEGIN WORK`.
2. Realizar las operaciones de manipulación de datos sobre la base de datos (insertar, actualizar o borrar filas).
3. Si las operaciones se han realizado correctamente y queremos que los cambios se apliquen de forma permanente sobre la base de datos usaremos la sentencia `COMMIT`. Sin embargo, si durante las operaciones ocurre algún error y no queremos aplicar los cambios realizados, podemos deshacerlos con la sentencia `ROLLBACK`.

Ejemplos:

```sql
BEGIN;
UPDATE table2 SET summary = (SELECT SUM(salary) FROM table1 WHERE type = 1) WHERE type = 1;
COMMIT;
```

<aside>
🔥

 **Atención**: En PostgreSQL, no se utilizan variables de usuario como en MySQL/MariaDB. En su lugar, se pueden utilizar bloques `DO` o funciones PL/pgSQL para manejar lógica más compleja.

</aside>

A continuación tenéis un ejercicio para comprobar por vosotros mismos el funcionamiento de las transacciones.

```sql
CREATE TABLE cliente (
    id INT PRIMARY KEY,
    nombre CHAR(20)
);

BEGIN;
INSERT INTO cliente VALUES (1, 'Pepe');
COMMIT;

-- 1. ¿Qué devolverá esta consulta?
SELECT * FROM cliente;

SET AUTOCOMMIT TO OFF;
INSERT INTO cliente VALUES (2, 'Maria');
INSERT INTO cliente VALUES (20, 'Juan');
DELETE FROM cliente WHERE nombre = 'Pepe';

-- 2. ¿Qué devolverá esta consulta?
SELECT * FROM cliente;

ROLLBACK;

-- 3. ¿Qué devolverá esta consulta?
SELECT * FROM cliente;
```

## 6.5 SAVEPOINT, ROLLBACK TO SAVEPOINT y RELEASE SAVEPOINT

En PostgreSQL, también es posible hacer uso de las sentencias: `SAVEPOINT`, `ROLLBACK TO SAVEPOINT` y `RELEASE SAVEPOINT`.

- **SAVEPOINT**: Nos permite establecer un punto de recuperación dentro de la transacción, utilizando un identificador. Si en una transacción existen dos `SAVEPOINT` con el mismo nombre, sólo se tendrá en cuenta el último que se ha definido.
- **ROLLBACK TO SAVEPOINT**: Nos permite hacer un `ROLLBACK` deshaciendo sólo las instrucciones que se hayan ejecutado hasta el `SAVEPOINT` que se indique.
- **RELEASE SAVEPOINT**: Elimina un `SAVEPOINT`.

Ejemplo:

```sql
BEGIN;
INSERT INTO cliente VALUES (3, 'Ana');
SAVEPOINT my_savepoint;
INSERT INTO cliente VALUES (4, 'Luis');
ROLLBACK TO SAVEPOINT my_savepoint;
COMMIT;
```

En este ejemplo, la inserción de 'Luis' se deshará, pero la inserción de 'Ana' se mantendrá y se confirmará con el `COMMIT`.

```sql
CREATE TABLE producto (
id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
nombre VARCHAR(100) NOT NULL,
precio DOUBLE
);

INSERT INTO producto (id, nombre) VALUES (1, 'Primero');
INSERT INTO producto (id, nombre) VALUES (2, 'Segundo');
INSERT INTO producto (id, nombre) VALUES (3, 'Tercero');

-- 1. Comprobamos las filas que existen en la tabla
SELECT *
FROM producto;

-- 2. Ejecutamos una transacción que incluye un SAVEPOINT
START TRANSACTION;
INSERT INTO producto (id, nombre) VALUES (4, 'Cuarto');
SAVEPOINT sp1;
INSERT INTO producto (id, nombre) VALUES (5, 'Cinco');
INSERT INTO producto (id, nombre) VALUES (6, 'Seis');
ROLLBACK TO sp1;

-- 3. ¿Qué devolverá esta consulta?
SELECT *
FROM producto;
```

## 6.6 Acceso concurrente a los datos

Cuando dos transacciones distintas intentan acceder de manera concurrente a los mismos datos pueden ocurrir los siguientes problemas:

- **Dirty Read (Lectura sucia).** Sucede cuando una segunda transacción lee datos que están siendo modificados por una transacción antes de que haga COMMIT. Esto supone dar por buenos datos que aún no sabemos si se formalizaran o serán eliminados mediante un ROLLBACK como en el ejemplo siguiente:
    
    ![DirtyRead.png]()
    
- **Non‑Repeatable Read (Lectura No Repetible).** Se produce cuando una transacción consulta el mismo dato dos veces durante su vida y, la segunda vez encuentra que el valor del dato ha sido modificado por otra transacción.
    
    ![diagramas-transacciones-NonRepeatableRead.png]()
    

- **Phantom Read (Lectura fantasma).** Este error ocurre cuando una transacción ejecuta dos veces una consulta que devuelve un conjunto de filas. El problema se da cuando entre la primera y la segunda ejecución de la consulta aparecen nuevas filas en el conjunto.
    
    ![PhantonRead.png]()
    

## 6.7 Niveles de aislamiento

Para evitar que sucedan los problemas de acceso concurrente que hemos comentado en el punto anterior podemos establecer diferentes niveles de aislamiento que controlan el nivel de bloqueo durante el acceso a los datos. 

El estándar ANSI/ISO de SQL (SQL92) define cuatro niveles de aislamiento.

- **Read Uncommitted.** En este nivel no se realiza ningún bloqueo, por lo tanto, permite que sucedan los tres problemas
- **Read Committed.** Proporciona dos propiedades:
    - **No Dirty Reads**: La base de datos no va a leer ningún valor de una transacción que no este commited.
        
        ![NoDirtyReads.png]()
        
    - **No Dirty Writes:** Esto significa que la base de datos aceptará cualquier transacción sobre una fila concreta sobre la que ya se esté ejecutando una transacción. La otra transacción tiene que esperar hasta el momento en que la transacción anterior en las filas se confirme y sólo después de eso, cualquier otra transacción será capaz de realizar una operación de escritura para las filas específicas.
        
        ![NoDirtyWrites.png]()
        
        Sin embargo, en este caso los datos leídos por una transacción pueden ser modificados por otras transacciones, por lo tanto, se pueden dar los problemas *Non‑Repeteable Read* y *Phantom Read*.
        
- **Repeatable Read.** En este nivel ningún registro leído con un SELECT puede ser modificado en otra transacción, por lo tanto, sólo puede suceder el problema del *Phantom Read*.
- **Serializable.** En este caso las transacciones se ejecutan unas detrás de otras, sin que exista la posibilidad de concurrencia. Su principal problema es que el sistema no se puede utilizar de forma concurrente.

<aside>
💡  El nivel de aislamiento que utiliza PostgreSQL por defecto es **Read Committed**

</aside>

La siguiente tabla muestra los problemas de lectura que pueden ocurrir en cada uno de los modos de aislamiento:

| **Nivel de Aislamiento** | **Dirty Read (Lectura sucia)** | **Non-Repeatable Read (Lectura no repetible)** | **Phantom Read (Lectura fantasma)** |
| --- | --- | --- | --- |
| **Read Uncommitted** | Sí | Sí | Sí |
| **Read Committed** | No | Sí | Sí |
| **Repeatable Read** | No | No | Sí |
| **Serializable** | No | No | No |

### Explicación de los problemas de lectura:

1. **Dirty Read (Lectura sucia)**: Ocurre cuando una transacción lee datos que han sido modificados por otra transacción pero que aún no han sido confirmados (`COMMIT`). Si la otra transacción hace `ROLLBACK`, los datos leídos serán incorrectos.
2. **Non-Repeatable Read (Lectura no repetible)**: Ocurre cuando una transacción lee el mismo dato dos veces, pero obtiene resultados diferentes porque otra transacción ha modificado y confirmado (`COMMIT`) ese dato entre las dos lecturas.
3. **Phantom Read (Lectura fantasma)**: Ocurre cuando una transacción ejecuta la misma consulta dos veces y obtiene un conjunto de resultados diferente porque otra transacción ha insertado o eliminado filas que cumplen con la condición de la consulta.

### Niveles de aislamiento en PostgreSQL:

- **Read Uncommitted**: En PostgreSQL, este nivel de aislamiento funciona igual que **Read Committed**, ya que PostgreSQL no permite lecturas sucias.
- **Read Committed**: Es el nivel por defecto. Garantiza que no se lean datos no confirmados, pero permite lecturas no repetibles y lecturas fantasma.
- **Repeatable Read**: Garantiza que las lecturas sean repetibles, es decir, si una transacción lee un dato dos veces, obtendrá el mismo resultado. Sin embargo, aún pueden ocurrir lecturas fantasma.
- **Serializable**: Es el nivel más estricto. Garantiza que las transacciones se ejecuten de manera que el resultado final sea el mismo que si se ejecutaran en serie, una después de la otra. Evita todos los problemas de lectura: sucia, no repetible y fantasma.

### Ejemplo de cómo cambiar el nivel de aislamiento en PostgreSQL:

```sql
BEGIN TRANSACTION ISOLATION LEVEL REPEATABLE READ;
-- Operaciones SQL
COMMIT;
```

Este comando inicia una transacción con el nivel de aislamiento **Repeatable Read**. Puedes cambiar `REPEATABLE READ` por `READ COMMITTED`, `READ UNCOMMITTED`, o `SERIALIZABLE` según sea necesario.

# 7. Créditos

Muchos de los ejercicios y diagramas que aparecen en este texto han sido extraídos de las siguientes referencias:

- El trabajo de desarrollo de múltiples de los diversos apartados así como de muchos ejercicios se deben al esfuerzo de Jose Juán Sánchez del que he tomado gran parte de estos apuntes.
¡Gracias por compartir vuestro trabajo! :)

# 8. Licencia

Este contenido se comparte bajo licencia Creative Commons Reconocimiento - NoComercial- CompartirIgual 4.0 Internacional.

![by-nc-sa.eu.png]()