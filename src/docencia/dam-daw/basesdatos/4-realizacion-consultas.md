---
title: UT04 Realización de consultas
icon: material-symbols:book-5-outline
---

# Tema 4: Realización de consultas

<aside>
💡 Una vez creada la base de datos con sus tablas, debemos poder insertar, modificar y borrar los valores de las filas de las tablas. Para poder hacer esto, el
SQL92 nos ofrece las siguientes sentencias: INSERT para insertar, UPDATE para
modificar y DELETE para borrar. Una vez hemos insertado valores en nuestras
tablas, tenemos que poder consultarlos. La sentencia para hacer consultas a
una base de datos con el SQL92 es SELECT FROM. Veamos a continuación estas
sentencias.

</aside>

[Tema 4.2. Subconsultas](https://www.notion.so/Tema-4-2-Subconsultas-6e8f29a02c6e45bb937c825106fc7f53?pvs=21)

[Consultas básicas de datos](https://www.notion.so/1609b53402a4802d82e0d99ca3cda716?pvs=21)

[Imágenes para Documentación](https://www.notion.so/1609b53402a480348ed7e8d36168eb9d?pvs=21)

[Funciones en Postgresql](https://www.notion.so/1849b53402a4802b9969f7c5d0889ca5?pvs=21)

[Agrupamientos GROUP BY y HAVING (2)](https://www.notion.so/1b49b53402a48008b9f1e4c185dea370?pvs=21)

[Agrupamientos GROUP BY y HAVING](https://www.notion.so/1af9b53402a480e7b3e0d6bd8089c9be?pvs=21)

[Left/Right Join](https://www.notion.so/8bc947080eb1483b85d8c7243870c30a?pvs=21)

# 1. Introducción

El DML (Data Manipulation Language) o Lenguaje de Manipulación de Datos es la parte de SQL dedicada a la manipulación de los datos. Las sentencias DML son las siguientes:

- SELECT: se utiliza para realizar consultas y extraer información de la base de datos.
- INSERT: se utiliza para insertar registros en las tablas de la base de datos.
- UPDATE: se utiliza para actualizar los registros de una tabla.
- DELETE: se utiliza para eliminar registros de una tabla.

En este tema nos vamos a centrar en el uso de la sentencia SELECT.

## 2. Consultas básicas sobre una tabla

Según la documentación oficial de MySQL ésta sería la sintaxis para realizar una consulta con la sentencia SELECT en MySQL:

```sql
SELECT
[ALL | DISTINCT | DISTINCTROW ]
[HIGH_PRIORITY]
[STRAIGHT_JOIN]
[SQL_SMALL_RESULT] [SQL_BIG_RESULT] [SQL_BUFFER_RESULT]
[SQL_CACHE | SQL_NO_CACHE] [SQL_CALC_FOUND_ROWS]
select_expr [, select_expr ...]
[FROM table_references]
[PARTITION partition_list]
[WHERE where_condition]
[GROUP BY {col_name | expr | position}
[ASC | DESC], ... [WITH ROLLUP]]
[HAVING having_condition]
[ORDER BY {col_name | expr | position}
[ASC | DESC], ...]
[LIMIT {[offset,] row_COUNT | row_COUNT OFFSET offset}]
[PROCEDURE procedure_name(argument_list)]
[INTO OUTFILE 'file_name'
[CHARACTER SET charset_name]
export_options
| INTO DUMPFILE 'file_name'
| INTO var_name [, var_name]]
[FOR UPDATE | LOCK IN SHARE MODE]]

```

Para empezar con consultas sencillas podemos simplificar la definición anterior y quedarnos con la siguiente:

```sql
SELECT [DISTINCT] select_expr [, select_expr ...]
[FROM table_references]
[WHERE where_condition]
[GROUP BY {col_name | expr | position} [ASC | DESC], ... [WITH ROLLUP]]
[HAVING having_condition]
[ORDER BY {col_name | expr | position} [ASC | DESC], ...]
[LIMIT {[offset,] row_COUNT | row_COUNT OFFSET offset}]
```

Es muy importante conocer en qué orden se ejecuta cada una de las cláusulas que forman la sentencia SELECT. El orden de ejecución es el siguiente:

- Cláusula FROM.
- Cláusula WHERE (Es opcional, puede ser que no aparezca)
- Cláusula GROUP BY (Es opcional, puede ser que no aparezca).
- Cláusula HAVING (Es opcional, puede ser que no aparezca).
- Cláusula SELECT.
- Cláusula ORDER BY (Es opcional, puede ser que no aparezca).
- Cláusula LIMIT (Es opcional, puede ser que no aparezca).

Hay que tener en cuenta que el resultado de una consulta siempre será una tabla de datos, que puede tener una o varias columnas y ninguna, una o varias filas.

El hecho de que el resultado de una consulta sea una tabla es muy interesante porque nos permite realizar cosas como almacenar los resultados como una nueva en la base de datos. También será posible combinar el resultado de dos o más consultas para crear una tabla mayor con la unión de los dos resultados. Además, los resultados de una consulta también pueden consultados por otras nuevas consultas.

## 2.1. Cláusula SELECT

Nos permite indicar cuáles serán las columnas que tendrá la tabla de resultados de la consulta que estamos realizando. Las opciones que podemos indicar son las siguientes:

- El nombre de una columna de la tabla sobre la que estamos realizando la consulta. Será una columna de la tabla que aparece en la cláusula FROM.
- Una constante que aparecerá en todas las filas de la tabla resultado.
- Una expresión que nos permite calcular nuevos valores.
    
    ### 2.1.1. Cómo obtener los datos de todas las columnas de una tabla (SELECT *)
    
    Vamos a utilizar la siguiente base de datos de ejemplo:
    
    ```sql
    DROP DATABASE IF EXISTS instituto;
    CREATE DATABASE instituto CHARACTER SET utf8mb4;
    USE instituto;
    
    CREATE TABLE alumno (
     id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
     nombre VARCHAR(100) NOT NULL,
     apellido1 VARCHAR(100) NOT NULL,
     apellido2 VARCHAR(100),
     fecha_nacimiento DATE NOT NULL,
     es_repetidor ENUM('sí', 'no') NOT NULL,
     telefono VARCHAR(9)
    );
    
    INSERT INTO alumno VALUES(1, 'María', 'Sánchez', 'Pérez', '1990-12-01', 'no',
    NULL);
    INSERT INTO alumno VALUES(2, 'Juan', 'Sáez', 'Vega', '1998-04-02', 'no',
    618253876);
    INSERT INTO alumno VALUES(3, 'Pepe', 'Ramírez', 'Gea', '1988-01-03', 'no', NULL
    );
    INSERT INTO alumno VALUES(4, 'Lucía', 'Sánchez', 'Ortega', '1993-06-13', 'sí',
    678516294);
    INSERT INTO alumno VALUES(5, 'Paco', 'Martínez', 'López', '1995-11-24', 'no',
    692735409);
    INSERT INTO alumno VALUES(6, 'Irene', 'Gutiérrez', 'Sánchez', '1991-03-28', 'sí
    ', NULL);
    INSERT INTO alumno VALUES(7, 'Cristina', 'Fernández', 'Ramírez', '1996-09-17',
    'no', 628349590);
    INSERT INTO alumno VALUES(8, 'Antonio', 'Carretero', 'Ortega', '1994-05-20', 's
    í', 612345633);
    INSERT INTO alumno VALUES(9, 'Manuel', 'Domínguez', 'Hernández', '1999-07-08',
    'no', NULL);
    INSERT INTO alumno VALUES(10, 'Daniel', 'Moreno', 'Ruiz', '1998-02-03', 'no',
    NULL);
    ```
    
    Supongamos que tenemos una tabla llamada **alumno** con la siguiente información de los alumnos matriculados en un determinado curso.
    
    | id | nombre | apellido1 | apellido2 | fecha_nacimiento | es_repetidor | telefono |
    | --- | --- | --- | --- | --- | --- | --- |
    | 1 | María | Sánchez | Pérez | 1990-12-01 | no | NULL |
    | 2 | Juan | Sáez | Vega | 1998-04-02 | no | 618253876 |
    | 3 | Pepe | Ramírez | Gea | 1988-01-03 | no | NULL |
    | 4 | Lucía | Sánchez | Ortega | 1993-06-13 | sí | 678516294 |
    | 5 | Paco | Martínez | López | 1995-11-24 | no | 692735409 |
    | 6 | Irene | Gutiérrez | Sánchez | 1991-03-28 | sí | NULL |
    | 7 | Cristina | Fernández | Ramírez | 1996-09-17 | no | 628349590 |
    | 8 | Antonio | Carretero | Ortega | 1994-05-20 | sí | 612345633 |
    | 9 | Manuel | Domínguez | Hernández | 1999-07-08 | no | NULL |
    | 10 | Daniel | Moreno | Ruiz | 1998-02-03 | no | NULL |
    
    Vamos a ver qué consultas sería necesario realizar para obtener los siguientes datos.
    
    1. **Obtener todos los datos de todos los alumnos matriculados en el curso.**
    
    ```sql
    SELECT *
    FROM alumno;
    
    ```
    
    **nombre**
    
    ---
    
    María
    
    ---
    
    Juan
    
    ---
    
    Pepe
    
    ---
    
    Lucía
    
    ---
    
    Paco
    
    ---
    
    Irene
    
    ---
    
    Cristina
    
    ---
    
    Antonio
    
    ---
    
    Manuel
    
    ---
    
    Daniel
    
    ---
    
    El carácter * es un comodín que utilizamos para indicar que queremos seleccionar todas las columnas de la tabla. La consulta anterior devolverá todos los datos de la tabla.
    
    Tenga en cuenta que las palabras reservadas de SQL no son *case sensitive*, por lo tanto es posible escribir la sentencia anterior de la siguiente forma obteniendo el mismo resultado:
    
    ```sql
    select *
    from alumno;
    ```
    
    Otra consideración que también debemos tener en cuenta es que una consulta SQL se puede escribir en una o varias líneas. Por ejemplo, la siguiente sentencia tendría el mismo resultado que la anterior:
    
    ```sql
    SELECT * FROM alumno;
    ```
    
    A lo largo del curso vamos a considerar como una buena práctica escribir las consultas SQL en varias líneas, empezando cada línea con la palabra reservada de la cláusula correspondiente que forma la consulta.
    
    ### 2.1.2. Cómo obtener los datos de algunas columnas de una tabla
    
    1. **Vamos a obtener el nombre de todos los alumnos:**
    
    ```sql
    SELECT nombre
    FROM alumno;
    ```
    
    | **nombre** |
    | --- |
    | María |
    | Juan |
    | Pepe |
    | Lucía |
    | Paco |
    | Irene |
    | Cristina |
    | Antonio |
    | Manuel |
    | Daniel |
    1. **Obtener el nombre y los apellidos de todos los alumnos.**
    
    ```sql
    SELECT nombre, apellido1, apellido2
    FROM alumno;
    ```
    
    Tenga en cuenta que el resultado de la consulta SQL mostrará las columnas que haya solicitado, siguiendo el orden en el que se hayan indicado. 
    
    Por lo tanto la siguiente consulta:
    
    ```sql
    SELECT apellido1, apellido2, nombre
    FROM alumno;
    ```
    
    Devolverá lo siguiente: