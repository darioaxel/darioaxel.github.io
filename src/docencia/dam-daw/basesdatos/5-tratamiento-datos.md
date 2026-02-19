---
title: UT05 Tratamiento de datos
date: 2026-02-19   
icon: mynaui:api-solid
---

# Tema 5: Tratamiento Avanzado de Datos en MySQL

> **En este tema trabajaremos los siguientes RAs:**
> Contenido principal
> ****RA 4: Modifica la información almacenada utilizando herramientas gráficas y DML**
> Objetivo del tema:
> **Objetivo**: Dominar DML avanzado mediante subconsultas como tablas derivadas y joins complejos, garantizando integridad ACID.


| ****RA 4: Modifica la información almacenada utilizando herramientas gráficas y DML**|
| --- |
|a) |

## 1. Caso Práctico: Plataforma de Gaming Online

::: note **Contexto Empresarial:**

Ada revisa el módulo de estadísticas avanzadas. Juan necesita implementar:

- **Análisis multi-tabla**: Rankings cruzando usuarios, partidas y juegos
- **Actualizaciones masivas**: Ajustar créditos basándose en subtotales calculados  
- **Integridad transaccional**: Transferencias atómicas de crédito entre usuarios
- **Concurrencia**: Múltiples usuarios simultáneos sin corrupción de datos
:::

## 2. Fundamentos del DML en MySQL

### 2.1. Operaciones Fundamentales

El lenguaje DML (Data Manipulation Language) opera sobre el modelo relacional mediante tres sentencias atómicas:

| Operación | Sintaxis Básica | Propósito |
|-----------|----------------|-----------|
| **INSERT** | `INSERT INTO tabla (cols) VALUES (vals)` | Crear registros |
| **UPDATE** | `UPDATE tabla SET col=val WHERE cond` | Modificar existentes |
| **DELETE** | `DELETE FROM tabla WHERE cond` | Eliminar registros |

> 🔥 **Regla de Oro**: Siempre ejecuta un `SELECT` con la misma cláusula `WHERE` antes de un UPDATE o DELETE para verificar el scope de filas afectadas.

### 2.2. Esquema de Trabajo: Jardinería Plus

Adaptación del esquema clásico con complejidad relacional aumentada:

```sql
-- Base de datos para prácticas
CREATE DATABASE IF NOT EXISTS jardineria_pro CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE jardineria_pro;

-- Tabla de oficinas
CREATE TABLE oficinas (
    codigo_oficina VARCHAR(10) PRIMARY KEY,
    ciudad VARCHAR(30) NOT NULL,
    pais VARCHAR(50) NOT NULL,
    region VARCHAR(50),
    codigo_postal VARCHAR(10) NOT NULL,
    telefono VARCHAR(20) NOT NULL,
    linea_direccion1 VARCHAR(50) NOT NULL,
    linea_direccion2 VARCHAR(50)
) ENGINE=InnoDB;

-- Tabla de empleados
CREATE TABLE empleados (
    codigo_empleado INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    apellido1 VARCHAR(50) NOT NULL,
    apellido2 VARCHAR(50),
    extension VARCHAR(10),
    email VARCHAR(100) NOT NULL,
    codigo_oficina VARCHAR(10),
    codigo_jefe INT,
    puesto VARCHAR(50),
    FOREIGN KEY (codigo_oficina) REFERENCES oficinas(codigo_oficina)
        ON DELETE SET NULL ON UPDATE CASCADE,
    FOREIGN KEY (codigo_jefe) REFERENCES empleados(codigo_empleado)
) ENGINE=InnoDB;

-- Tabla de clientes con representante
CREATE TABLE clientes (
    codigo_cliente INT AUTO_INCREMENT PRIMARY KEY,
    nombre_cliente VARCHAR(50) NOT NULL,
    nombre_contacto VARCHAR(30),
    apellido_contacto VARCHAR(30),
    telefono VARCHAR(15) NOT NULL,
    fax VARCHAR(15),
    linea_direccion1 VARCHAR(50) NOT NULL,
    linea_direccion2 VARCHAR(50),
    ciudad VARCHAR(50) NOT NULL,
    region VARCHAR(50),
    pais VARCHAR(50),
    codigo_postal VARCHAR(10),
    codigo_empleado_rep_ventas INT,
    limite_credito DECIMAL(15,2) DEFAULT 0.00,
    FOREIGN KEY (codigo_empleado_rep_ventas) REFERENCES empleados(codigo_empleado)
        ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB;

-- Tabla de pedidos
CREATE TABLE pedidos (
    codigo_pedido INT AUTO_INCREMENT PRIMARY KEY,
    fecha_pedido DATE NOT NULL,
    fecha_esperada DATE,
    fecha_entrega DATE,
    estado VARCHAR(15) DEFAULT 'Pendiente',
    comentarios TEXT,
    codigo_cliente INT NOT NULL,
    FOREIGN KEY (codigo_cliente) REFERENCES clientes(codigo_cliente)
        ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB;

-- Tabla de detalle con relación compleja
CREATE TABLE detalle_pedidos (
    codigo_pedido INT,
    codigo_producto VARCHAR(15),
    cantidad INT NOT NULL CHECK (cantidad > 0),
    precio_unidad DECIMAL(15,2) NOT NULL,
    numero_linea SMALLINT,
    PRIMARY KEY (codigo_pedido, codigo_producto),
    FOREIGN KEY (codigo_pedido) REFERENCES pedidos(codigo_pedido)
        ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;
```

> 📸 **[INSERTAR CAPTURA PANTALLA 1: Diagrama ER del esquema en DBeaver]**

---

## 3. Subconsultas como Tablas Derivadas (Derived Tables)

La técnica más potente para operaciones DML complejas consiste en tratar una consulta `SELECT` como una tabla virtual dentro de otra operación.

### 3.1. Sintaxis MySQL para Derived Tables

```sql
-- Estructura base
SELECT dt.columna1, dt.columna2
FROM (
    SELECT columna_a, columna_b, funcion_agregada
    FROM tabla_origen
    WHERE condicion
    GROUP BY columna_a
    HAVING filtro_agregado
) AS dt
INNER JOIN otra_tabla ON dt.columna_a = otra_tabla.columna;
```

**Reglas MySQL específicas:**
- Obligatorio usar alias (`AS dt`) para la subconsulta
- No se puede referenciar la derived table desde fuera de su scope
- Se materializa en memoria (o temp table si excede `tmp_table_size`)

### 3.2. UPDATE Masivo con Derived Table

**Escenario**: Aumentar el límite de crédito de clientes basándose en el volumen de compras histórico.

```sql
UPDATE clientes c
INNER JOIN (
    SELECT 
        p.codigo_cliente,
        SUM(dp.cantidad * dp.precio_unidad) AS total_compras,
        COUNT(DISTINCT p.codigo_pedido) AS num_pedidos
    FROM pedidos p
    INNER JOIN detalle_pedidos dp ON p.codigo_pedido = dp.codigo_pedido
    WHERE p.estado = 'Entregado'
    GROUP BY p.codigo_cliente
    HAVING total_compras > 10000
) AS ventas ON c.codigo_cliente = ventas.codigo_cliente
SET c.limite_credito = c.limite_credito + (ventas.total_compras * 0.10);
```

**Flujo de ejecución:**
1. MySQL ejecuta la subconsulta (derived table `ventas`) primero
2. Materializa los resultados: clientes con >10k€ en pedidos entregados
3. Realiza el JOIN con la tabla `clientes`
4. Actualiza solo las filas coincidentes

> 📸 **[INSERTAR CAPTURA PANTALLA 2: Captura de DBeaver mostrando el resultado del UPDATE anterior con filas afectadas]**

### 3.3. INSERT con SELECT complejo (CTAS - Create Table As Select)

**Escenario**: Crear tabla de histórico de clientes VIP basada en agregaciones.

```sql
-- Crear tabla y poblar en una operación
CREATE TABLE clientes_vip AS
SELECT 
    c.codigo_cliente,
    c.nombre_cliente,
    c.ciudad,
    c.pais,
    ventas.totales,
    ventas.ultima_compra,
    e.nombre AS nombre_rep,
    e.email AS email_rep
FROM clientes c
INNER JOIN (
    SELECT 
        codigo_cliente,
        SUM(cantidad * precio_unidad) AS totales,
        MAX(fecha_pedido) AS ultima_compra
    FROM pedidos p
    JOIN detalle_pedidos dp ON p.codigo_pedido = dp.codigo_pedido
    GROUP BY codigo_cliente
    HAVING totales > 5000
) AS ventas ON c.codigo_cliente = ventas.codigo_cliente
LEFT JOIN empleados e ON c.codigo_empleado_rep_ventas = e.codigo_empleado;

-- Añadir clave primaria a posteriori (MySQL requiere esto para InnoDB)
ALTER TABLE clientes_vip 
ADD COLUMN id_vip INT AUTO_INCREMENT PRIMARY KEY,
ADD INDEX idx_ciudad (ciudad);
```

> 📸 **[INSERTAR CAPTURA PANTALLA 3: Estructura de tabla creada con CTAS en DBeaver]**

---

## 4. Joins Complejos en Operaciones DML

MySQL permite utilizar JOINs en sentencias UPDATE y DELETE, pero con sintaxis específica diferente a PostgreSQL.

### 4.1. Tipos de JOIN en MySQL

![Diagrama JOINs SQL](https://upload.wikimedia.org/wikipedia/commons/d/d2/Square_join.png)
*Fuente: Wikipedia - SQL Joins (Dominio Público)*

| Tipo | Descripción | Uso en DML |
|------|-------------|------------|
| **INNER JOIN** | Solo filas coincidentes en ambas tablas | Actualizaciones sincronizadas |
| **LEFT JOIN** | Todas las filas de la izquierda, NULL si no hay match en derecha | Actualizaciones condicionales |
| **RIGHT JOIN** | Todas las filas de la derecha | Raro en DML, preferible reordenar |
| **CROSS JOIN** | Producto cartesiano | Generación de combinaciones |

### 4.2. UPDATE con múltiples JOINs

**Sintaxis MySQL específica:**
```sql
UPDATE tabla_destino t1
[INNER|LEFT] JOIN tabla_fuente t2 ON t1.col = t2.col
[INNER|LEFT] JOIN tabla_tercera t3 ON t2.col = t3.col
SET t1.columna = valor,
    t2.columna = valor
WHERE condicion;
```

**Ejemplo práctico**: Actualizar el estado de pedidos basándose en el total calculado y la ciudad del cliente.

```sql
UPDATE pedidos p
INNER JOIN (
    SELECT 
        dp.codigo_pedido,
        SUM(dp.cantidad * dp.precio_unidad) AS total_real
    FROM detalle_pedidos dp
    GROUP BY dp.codigo_pedido
) AS calculo ON p.codigo_pedido = calculo.codigo_pedido
INNER JOIN clientes c ON p.codigo_cliente = c.codigo_cliente
SET p.estado = CASE 
    WHEN calculo.total_real > c.limite_credito THEN 'Revision Crediticia'
    WHEN calculo.total_real > 10000 THEN 'Urgente VIP'
    ELSE p.estado
END,
p.comentarios = CONCAT(p.comentarios, ' | Total calculado: ', calculo.total_real)
WHERE p.estado = 'Pendiente';
```

### 4.3. DELETE con JOIN: Eliminación Referencial

MySQL usa sintaxis diferente para DELETE con JOIN:

```sql
-- Sintaxis correcta MySQL para DELETE con JOIN
DELETE t1, t2  -- Especificar qué tablas eliminar (puede ser solo una)
FROM tabla1 t1
INNER JOIN tabla2 t2 ON t1.id = t2.id_tabla1
WHERE condicion;
```

**Escenario**: Eliminar clientes sin pedidos y sus representantes asociados (ejemplo didáctico):

```sql
-- Eliminar solo clientes sin actividad
DELETE c
FROM clientes c
LEFT JOIN pedidos p ON c.codigo_cliente = p.codigo_cliente
WHERE p.codigo_pedido IS NULL
AND c.limite_credito = 0;
```

> 🔥 **Peligro**: Si omites el alias después de `DELETE`, MySQL eliminará de todas las tablas del JOIN.

---

## 5. Subconsultas Correlacionadas y No Correlacionadas

### 5.1. Subconsultas en SELECT (Columnas calculadas)

Útiles para evitar GROUP BY en la query principal:

```sql
SELECT 
    c.nombre_cliente,
    c.ciudad,
    c.limite_credito,
    (SELECT COUNT(*) 
     FROM pedidos p 
     WHERE p.codigo_cliente = c.codigo_cliente) AS total_pedidos,
    (SELECT COALESCE(SUM(dp.cantidad * dp.precio_unidad), 0)
     FROM pedidos p
     JOIN detalle_pedidos dp ON p.codigo_pedido = dp.codigo_pedido
     WHERE p.codigo_cliente = c.codigo_cliente
     AND p.estado = 'Entregado') AS valor_total_compras,
    (SELECT MAX(fecha_pedido) 
     FROM pedidos p2 
     WHERE p2.codigo_cliente = c.codigo_cliente) AS ultima_compra
FROM clientes c
WHERE c.pais = 'España';
```

**Performance**: MySQL materializa estas subconsultas una vez por fila de la outer query (correlacionadas). Para >1000 filas, considerar un JOIN con GROUP BY.

### 5.2. EXISTS vs IN: Optimización de Existencia

```sql
-- Anti-patrón IN (lento con subconsultas grandes)
SELECT * FROM clientes 
WHERE codigo_cliente IN (
    SELECT codigo_cliente 
    FROM pedidos 
    WHERE estado = 'Pendiente'
);

-- Optimización EXISTS (short-circuit evaluation)
SELECT c.* 
FROM clientes c
WHERE EXISTS (
    SELECT 1 
    FROM pedidos p 
    WHERE p.codigo_cliente = c.codigo_cliente 
    AND p.estado = 'Pendiente'
);
```

**Diferencia clave**: `EXISTS` deja de buscar al encontrar la primera coincidencia; `IN` materializa toda la lista primero.

> 📸 **[INSERTAR CAPTURA PANTALLA 4: Explain plan mostrando la diferencia de performance]**

---

## 6. Transacciones y Control de Concurrencia en MySQL

### 6.1. Motor InnoDB y ACID

MySQL con motor InnoDB garantiza las propiedades ACID:

![Propiedades ACID](https://kimi-web-img.moonshot.cn/img/media.geeksforgeeks.org/4f82318f562325502023f2bdf7c8a24f49ff0545.jpg)
*Fuente: GeeksforGeeks (Uso educativo)*

```sql
-- Verificar motor de almacenamiento
SHOW TABLE STATUS WHERE Name = 'clientes';

-- Si fuera MyISAM (no soporta transacciones), convertir:
ALTER TABLE clientes ENGINE=InnoDB;
```

### 6.2. Sintaxis de Transacciones MySQL

```sql
-- Iniciar transacción (tres formas equivalentes)
START TRANSACTION;
-- o
BEGIN;
-- o
BEGIN WORK;

-- Operaciones DML
INSERT INTO pedidos (...) VALUES (...);
SET @ultimo_pedido = LAST_INSERT_ID();

INSERT INTO detalle_pedidos VALUES (@ultimo_pedido, 'OR-001', 5, 100.00);
UPDATE productos SET stock = stock - 5 WHERE codigo_producto = 'OR-001';

-- Confirmar o revertir
COMMIT;
-- o
ROLLBACK;
```

### 6.3. Niveles de Aislamiento

![Niveles de Aislamiento](https://kimi-web-img.moonshot.cn/img/sqlnest.wordpress.com/657c8d7767c81bd08b41409b21db7ae45438272a.jpg)
*Fuente: SQL Nest (Uso educativo)*

| Nivel | Dirty Read | Non-Repeatable | Phantom | Default en MySQL |
|-------|-----------|----------------|---------|------------------|
| READ UNCOMMITTED | Sí | Sí | Sí | No |
| **READ COMMITTED** | No | Sí | Sí | Oracle/PostgreSQL |
| **REPEATABLE READ** | No | No | Sí (parcial) | **Sí (MySQL)** |
| SERIALIZABLE | No | No | No | No |

```sql
-- Ver nivel actual
SELECT @@transaction_isolation;

-- Cambiar nivel (solo para siguiente sesión/transacción)
SET SESSION TRANSACTION ISOLATION LEVEL READ COMMITTED;

BEGIN;
SELECT * FROM clientes WHERE codigo_cliente = 1;
-- Otra sesión modifica el cliente...
SELECT * FROM clientes WHERE codigo_cliente = 1; -- ¿Mismo resultado?
COMMIT;
```

### 6.4. Savepoints (Puntos de Salvaguarda)

MySQL soporta rollback parcial mediante savepoints:

```sql
BEGIN;

INSERT INTO pedidos (codigo_cliente, fecha_pedido) 
VALUES (1, CURDATE());
SET @pedido_id = LAST_INSERT_ID();

SAVEPOINT antes_detalle_1;

INSERT INTO detalle_pedidos VALUES (@pedido_id, 'PROD-001', 100, 50.00);

-- Verificar stock (simulado)
SELECT stock INTO @stock_actual FROM productos WHERE codigo_producto = 'PROD-001';

IF @stock_actual < 100 THEN
    ROLLBACK TO SAVEPOINT antes_detalle_1;
    -- Insertar línea alternativa o registrar error
    INSERT INTO log_errores VALUES ('Stock insuficiente', NOW());
END IF;

-- Continuar con otros detalles
INSERT INTO detalle_pedidos VALUES (@pedido_id, 'PROD-002', 50, 30.00);

COMMIT;
```

> ⚠️ **Limitación**: MySQL no permite usar variables de sesión directamente en procedimientos almacenados sin DECLARE. Para lógica compleja, usar Stored Procedures.

### 6.5. Bloqueos Explícitos (Locking)

```sql
-- Bloqueo pesimista de filas para actualización
BEGIN;
SELECT * FROM clientes 
WHERE codigo_cliente = 1 
FOR UPDATE;  -- Bloquea la fila hasta COMMIT/ROLLBACK

-- Actualizar
UPDATE clientes SET limite_credito = limite_credito - 100 WHERE codigo_cliente = 1;

COMMIT;  -- Libera el bloqueo
```

---

## 7. Buenas Prácticas y Optimización MySQL

### 7.1. Checklist Seguro para Updates/Deletes

```sql
-- Paso 1: Previsualizar con SELECT
SELECT * FROM clientes 
WHERE ciudad = 'Madrid' 
AND limite_credito < 1000;

-- Paso 2: Ejecutar dentro de transacción reversible
BEGIN;
UPDATE clientes 
SET limite_credito = limite_credito + 500 
WHERE ciudad = 'Madrid' 
AND limite_credito < 1000;

-- Paso 3: Verificar conteo de filas afectadas
SELECT ROW_COUNT();  -- MySQL devuelve número de filas modificadas

-- Paso 4: Confirmar o revertir
COMMIT;
-- o
ROLLBACK;
```

### 7.2. INSERT ... ON DUPLICATE KEY UPDATE (Upsert)

MySQL soporta operaciones atómicas insert-or-update:

```sql
INSERT INTO clientes (codigo_cliente, nombre_cliente, ciudad, limite_credito)
VALUES (100, 'Cliente Nuevo', 'Barcelona', 5000)
ON DUPLICATE KEY UPDATE
    nombre_cliente = VALUES(nombre_cliente),
    ciudad = VALUES(ciudad),
    limite_credito = limite_credito + VALUES(limite_credito);
```

**Requisito**: Debe existir PRIMARY KEY o UNIQUE INDEX sobre `codigo_cliente`.

### 7.3. REPLACE INTO (Alternativa peligrosa)

```sql
REPLACE INTO clientes (codigo_cliente, nombre_cliente) 
VALUES (1, 'Nuevo Nombre');
```

> ⚠️ **Cuidado**: `REPLACE` hace DELETE + INSERT, eliminando triggers y rompiendo foreign keys. Preferir `INSERT ... ON DUPLICATE KEY UPDATE`.

---

## 8. Ejercicios Prácticos

### Ejercicio 1: Derived Tables (3 puntos)
Actualizar el salario de empleados (`empleados.salario` - añadir columna) basándose en el 5% del total de ventas de sus clientes. Usar una subconsulta en FROM para calcular las ventas por representante.

**Solución esperada:**
```sql
ALTER TABLE empleados ADD COLUMN salario DECIMAL(10,2) DEFAULT 2000;

UPDATE empleados e
INNER JOIN (
    SELECT codigo_empleado_rep_ventas, SUM(cantidad * precio_unidad) * 0.05 AS comision
    FROM clientes c
    JOIN pedidos p ON c.codigo_cliente = p.codigo_cliente
    JOIN detalle_pedidos dp ON p.codigo_pedido = dp.codigo_pedido
    GROUP BY codigo_empleado_rep_ventas
) AS ventas ON e.codigo_empleado = ventas.codigo_empleado_rep_ventas
SET e.salario = e.salario + ventas.comision;
```

### Ejercicio 2: Delete con Join (2 puntos)
Eliminar todos los pedidos que no tengan detalles asociados (pedidos vacíos) y que tengan más de 6 meses de antigüedad.

### Ejercicio 3: Transacción con Savepoint (3 puntos)
Crear un procedimiento (o script) que:
1. Cree un pedido para el cliente 5 con fecha hoy
2. Inserte dos líneas de detalle
3. Si el producto 'OR-001' no tiene stock suficiente, rollback solo de esa línea pero mantener el pedido y la otra línea
4. Confirmar al final

### Ejercicio 4: Optimización (2 puntos)
Convertir la siguiente query correlacionada en una versión con JOIN + GROUP BY más eficiente:

```sql
-- Versión ineficiente (NO USAR)
SELECT c.nombre_cliente,
       (SELECT COUNT(*) FROM pedidos WHERE codigo_cliente = c.codigo_cliente) as num
FROM clientes c;
```

---

## 9. Referencias y Recursos

- **Documentación MySQL**: [UPDATE Syntax](https://dev.mysql.com/doc/refman/8.0/en/update.html), [DELETE Syntax](https://dev.mysql.com/doc/refman/8.0/en/delete.html)
- **Imágenes**: 
  - SQL Joins: Wikipedia (Dominio Público)
  - ACID Properties: GeeksforGeeks (CC BY-SA)
  - Isolation Levels: SQL Nest (Uso educativo)
- **Dataset**: MySQL Sample Database (Jardinería adaptada)

**Licencia**: Material adaptado para FP Superior - DAM/DAW bajo licencia Creative Commons BY-NC-SA 4.0
