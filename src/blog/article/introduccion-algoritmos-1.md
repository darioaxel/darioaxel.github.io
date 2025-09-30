---
title: "Introducción a los algoritmos 1"
date: 2025-09-29
category: [Blog]
tag: [Python, algoritmos]
type: article
---

# Introducción a los Algoritmos, 
## Tutorial 1 – Notas  

### Los enteros
Comenzaremos nuestro estudio de los algoritmos observando aquellos que trabajan con enteros. Distinguimos:

`Z = { ..., -2, -1, 0, 1, 2, ... }` : el conjunto de todos los enteros  

`N = { 0, 1, 2, ... }` : el conjunto de los números naturales  

`{ 1, 2, ... }` : los enteros positivos  

El estudio matemático de los enteros se denomina **teoría de números**.  

---

### División entera
Un resultado básico de la teoría elemental de números es el **teorema de la división**:

Para cualquier entero `a` y cualquier entero `b > 0`, existen enteros únicos `q` y `r`, con `0 ≤ r < b`, tales que  

`a = q · b + r` 

Dados `a` y `b`, las funciones **div** (división entera) y **mod** (resto entero) calculan los valores `q` y `r`. Escribimos:  

`q = a div b` (el cociente)  
`r = a mod b` (el resto)  

Así, para todos los enteros `a` y `b` con `b > 0`:  

`a = (a div b) · b + (a mod b`  

Por ejemplo:  

- Si `a = 17` y `b = 3`, entonces `q = a div b = 5` y `r = a mod b = 2`, porque `17 = 5 · 3 + 2`.  
- Si `a = -17` y `b = 3`, entonces `q = a div b = -6` y `r = a mod b = 1`, porque `-17 = -6 · 3 + 1`.  

En Python, el operador `//` realiza la división entera y el operador `%` calcula el resto. Así:  

```python
17 // 3 == 5
17 % 3 == 2
-17 // 3 == -6
-17 % 3 == 1
````

Observa que si `a` es divisible exactamente por `b`, entonces el resto después de dividir es 0. Por tanto, podemos comprobar si `b` divide a `a` verificando el resto. En Python, por ejemplo:

```python
n = int(input('Enter n: '))
if n % 7 == 0:
  print(n, 'is divisible by 7')
else:
  print(n, 'is not divisible by 7')
```

### Horas, minutos y segundos

Hay `60 · 60 · 24 = 86,400` segundos en un día. Supongamos que se nos da un entero `0 ≤ t < 86,400` que representa el número de segundos desde medianoche. Queremos calcular el número de horas, minutos y segundos desde medianoche, obteniendo una hora como `3:24:54`.

En otras palabras, queremos encontrar enteros `0 ≤ h < 24`, `0 ≤ m < 60` y `0 ≤ s < 60` tales que

t = 3600 h + 60 m + s

¿Cómo hacerlo? Una forma es calcular primero el número de horas: `h = t // 3600`. Luego `t % 3600` es el número de segundos restantes tras quitar las `h` horas. Esto se implementa en Python así:

```python
t = int(input('How many seconds? '))

hours = t // 3600
t = t % 3600
mins = t // 60
secs = t % 60

print(hours, ':', mins, ':', secs)
```

Otra forma posible es calcular primero los segundos: `s = t % 60`. Luego `t // 60` es el número de minutos que quedan tras quitar los `s` segundos. En Python:

```python
t = int(input('How many seconds? '))

secs = t % 60
t = t // 60  # ahora t es el total de minutos
mins = t % 60
hours = t // 60

print(hours, ':', mins, ':', secs)
```

### Representación decimal

Por convención, usamos la **representación decimal (base 10)** al escribir números en la vida cotidiana. Cuando escribimos un número como `1985`, en realidad queremos decir una suma de potencias de 10:

1985 = 1 · 10³ + 9 · 10² + 8 · 10 + 5

Ahora discutiremos algoritmos simples que pueden descomponer un entero (por ejemplo, 1985) en una serie de dígitos decimales (1, 9, 8, 5), y combinar una serie de dígitos decimales en un entero.


### Separar en dígitos

Para separar en dígitos, primero observamos que para cualquier entero `i`:

* `i % 10` es el último dígito de `i`
* `i // 10` es el número formado por todos los dígitos de `i` excepto el último

Podemos verlo matemáticamente factorizando la expansión de 1985:

1985 = 1 · 10³ + 9 · 10² + 8 · 10 + 5 = 10 (1 · 10² + 9 · 10 + 8) + 5

De esta factorización es evidente que `1985 % 10 = 5` y `1985 // 10 = (1 · 10² + 9 · 10 + 8) = 198`.

Así que podemos escribir un bucle simple que extrae los dígitos de un entero sucesivamente. En Python:

```python
n = int(input('Enter n: '))

while n > 0:
  d = n % 10
  n = n // 10
  print('digit: ', d)
```

Por cierto, observa la similitud de este problema con el ejercicio anterior sobre las horas. La hora `3:24:54` son `12,294` segundos después de medianoche, ya que

12,294 = 3 · 60² + 24 · 60 + 54

Así que una hora como `3:24:54` es en realidad como un número escrito en base 60. (Si esto no está claro, no te preocupes: pronto hablaremos de bases distintas a la base 10).

---

### Combinar dígitos

Para combinar una serie de dígitos en un número, observamos primero que podemos **añadir un dígito decimal d a un entero n** usando esta fórmula:

n' = 10 n + d

Por ejemplo, si `n = 198` y `d = 5`, entonces `n' = 10 · 198 + 5 = 1985`.

Así que podemos escribir un bucle simple que lea una serie de dígitos y los combine en un entero. En Python:

```python
n = 0
while True:
  d = int(input('Digit: '))
  if d < 0:
    break
  n = 10 * n + d
print('n is', n)
```

El programa se comporta así:

```
$ py joinDigits.py
Digit: 1
Digit: 9
Digit: 8
Digit: 5
Digit: -1
n is 1985

$
```

Como señalaron algunos estudiantes, podemos reescribir el bucle anterior sin `break` (aunque al coste de realizar una multiplicación innecesaria):

```python
n = 0
d = 0
while d >= 0:
  n = 10 * n + d
  d = int(input('Digit: '))
print('n is', n)
```

