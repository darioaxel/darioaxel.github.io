---
title: UT02.1 Álgebra relacional
icon: material-symbols:book-5-outline
---

# Motivación

:::info
En los apuntes anteriores hablamos de cómo SQL es un lenguaje de programación **declarativo**. Esto significa que especificas **qué** quieres, pero no **cómo** obtenerlo. Esto es genial desde la perspectiva del usuario, ya que hace que las consultas sean mucho más fáciles de escribir.

Sin embargo, como ingenieros de bases de datos, a menudo queremos un lenguaje más **expresivo**. Cuando estudiemos la **optimización de consultas** dentro de unas semanas, necesitaremos una forma de expresar los distintos planes válidos que una base de datos puede usar para ejecutar una consulta.

Para esto usaremos el **Álgebra Relacional**, un lenguaje de programación **procedimental** (lo que significa que la consulta especifica exactamente qué operadores usar y en qué orden).
:::
---

# 1. Introducción al Álgebra Relacional

Todos los operadores en álgebra relacional **reciben una relación como entrada y devuelven otra relación como salida**. Una consulta básica se ve así:

El operador **proyección (π)** selecciona solo las columnas que desea pasar al siguiente operador (igual que `SELECT` en SQL). Por ejemplo, si el operador toma como parámetro la relación `dogs` y devuelve solo la columna `name`, se obtiene:

**Relación de entrada (`dogs`)**:

| name   | age |
| ------ | --- |
| Scooby | 10  |
| Buster | 15  |
| Buster | 20  |

**Resultado de la consulta**:

| name   |
| ------ |
| Scooby |
| Buster |

Aunque inicialmente los dos `Buster` son distintos (por la edad), al eliminar la columna `age`, se vuelven duplicados y solo queda uno en la salida. Las relaciones en álgebra relacional son **conjuntos** de tuplas, lo que significa que **no pueden tener duplicados**.

---

## Proyección (π)

La proyección toma una relación como entrada y selecciona solo las columnas especificadas. Las columnas se indican en el subíndice del operador.

El operador de proyección es la versión en álgebra relacional del `SELECT` en SQL.

Ejemplo SQL:

```sql
SELECT name FROM dogs;
```

Álgebra relacional:

```
π_name(dogs)
```

> No existe un operador equivalente al `FROM` en álgebra relacional, ya que los parámetros de los operadores indican de qué relaciones se extraen los datos.

---

## Selección (σ)

La **selección** filtra filas según una condición. La salida tendrá el mismo esquema que la entrada. Este operador equivale a la cláusula `WHERE` en SQL.

Ejemplo SQL:

```sql
SELECT name, age FROM dogs WHERE age = 12;
```

Álgebra relacional (dos formas equivalentes):

```
π_name,age(σ_age=12(dogs))
σ_age=12(π_name,age(dogs))
```

> Esto demuestra la flexibilidad del álgebra relacional: hay múltiples formas de obtener el mismo resultado.

También se pueden usar **predicados compuestos**:

* `∧` equivale a `AND`
* `∨` equivale a `OR`

Ejemplo SQL:

```sql
SELECT name, age FROM dogs WHERE age = 12 AND name = 'Timmy';
```

Álgebra relacional:

```
σ_age=12 ∧ name='Timmy'(dogs)
```

---

## Unión (∪)

La **unión** combina tuplas de dos relaciones y elimina duplicados (como `UNION` en SQL). Requiere que las relaciones tengan el **mismo número de columnas** y **tipos compatibles**.

Ejemplo:

**dogs**:

| name     | age |
| -------- | --- |
| Scooby   | 10  |
| Buster   | 15  |
| Garfield | 20  |

**cats**:

| name     | age |
| -------- | --- |
| Tom      | 8   |
| Garfield | 10  |

Álgebra relacional:

```
π_name(dogs) ∪ π_name(cats)
```

Resultado:

| name     |
| -------- |
| Scooby   |
| Buster   |
| Tom      |
| Garfield |

---

## Diferencia de conjuntos (−)

Este operador devuelve las tuplas que están en la primera relación pero no en la segunda (como `EXCEPT` en SQL). También requiere relaciones compatibles.

Ejemplo:

```
π_name(dogs) − π_name(cats)
```

Resultado:

| name   |
| ------ |
| Scooby |
| Buster |

---

## Intersección (∩)

La **intersección** mantiene solo las filas que están en ambas relaciones (como `INTERSECT` en SQL).

Ejemplo:

```
π_name(dogs) ∩ π_name(cats)
```

Resultado:

| name     |
| -------- |
| Garfield |

---

## Producto cruzado (×)

El **producto cartesiano** combina cada fila de una relación con todas las filas de otra.

Ejemplo:

**dogs**:

| name     | age |
| -------- | --- |
| Scooby   | 10  |
| Buster   | 15  |
| Garfield | 20  |

**parks**:

| park             | city          |
| ---------------- | ------------- |
| Golden Gate Park | San Francisco |
| Central Park     | New York City |

Álgebra relacional:

```
dogs × parks
```

Resultado:

| name     | age | park             | city          |
| -------- | --- | ---------------- | ------------- |
| Scooby   | 10  | Golden Gate Park | San Francisco |
| Scooby   | 10  | Central Park     | New York City |
| Buster   | 15  | Golden Gate Park | San Francisco |
| Buster   | 15  | Central Park     | New York City |
| Garfield | 20  | Golden Gate Park | San Francisco |
| Garfield | 20  | Central Park     | New York City |

---

## Joins (⨝)

Para representar **joins internos**, se usa el operador `⨝`.

Ejemplo (unión por columna `name`):

```
dogs ⨝_dogs.name = cats.name_ cats
```

También puede escribirse como **join natural** si no se especifica condición:

```
dogs ⨝ cats
```

El **Theta Join (⨝*cond*)** es la forma formal del inner join con condición. También permite predicados compuestos (`∧`, `∨`).

> Todo join puede representarse como producto cruzado + selección:

```
σ_dogs.name=cats.name(dogs × cats)
```

---

## Renombrado (ρ)

El operador `ρ` sirve para cambiar el nombre de una relación o de sus atributos (como un alias en SQL).

Ejemplo:

```
ρ(dogs(dname, age))(dogs)
```

Este ejemplo cambia la columna `name` a `dname`.

---

## Agrupamiento y Agregación (γ)

Este operador equivale a `GROUP BY` y `HAVING` en SQL.

Ejemplo SQL:

```sql
SELECT age FROM dogs GROUP BY age HAVING COUNT(*) > 5;
```

Álgebra relacional:

```
γ_age; count(*) > 5(dogs)
```

Otro ejemplo con agregación:

```sql
SELECT age, SUM(weight) FROM dogs GROUP BY age HAVING COUNT(*) > 5;
```

Álgebra relacional:

```
γ_age; SUM(weight), count(*) > 5(dogs)
```

---

# Preguntas de práctica

Dadas las siguientes relaciones:

```text
teams(teamid, name)
players(playerid, name, teamid, position)
```

### 1. Encuentra el `name` y `playerid` de todos los jugadores que juegan de "center":

```
π_name,playerid(σ_position='center'(players))
```

---

### 2. Encuentra el `name` de cada jugador que juega en los "Warriors":

```
π_name(σ_teams.name='Warriors'(players ⨝ teams))
```

Si renombramos `players.teamid` como `pteamid`:

```
π_name(σ_teams.name='Warriors'(ρ(players(pplayerid, pname, pteamid, position))(players) ⨝_pteamid=teamid_ teams))
```

---

### 3. Encuentra los `teamid` de todos los equipos que **no tienen jugadores**:

```
π_teamid(teams) − π_teamid(players)
```

---

### 4. Equivalente a:

```sql
SELECT teamid AS tid 
FROM players
WHERE players.teamid NOT IN
  (SELECT teamid FROM teams)
AND position='shooting guard';
```

Álgebra relacional:

```
ρ(players(pid, pname, teamid, pos))(σ_pos='shooting guard'(players)) − π_teamid(teams)
```

Y luego renombrar el resultado:

```
ρ(tid)(...)
```
