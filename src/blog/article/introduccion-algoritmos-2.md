---
title: "Introducción a los algoritmos 2"
date: 2025-09-29
category: [Blog]
tag: [Python, algoritmos]
type: article
---

# Introducción a los Algoritmos, 
## Números en diferentes bases
Por convención de larga data, básicamente todas las sociedades en la Tierra escriben los números en **base 10**, también conocida como **decimal**. Cuando escribimos un número como  

2736  

queremos decir:  

2 · 10³ + 7 · 10² + 3 · 10 + 6  

En base 10, cada dígito tiene un valor entre 0 y 9.  

Por supuesto, el número 10 es arbitrario. Ahora queremos trabajar con números escritos en bases no decimales, es decir, en bases distintas de 10. Por ejemplo, consideremos la **base 5**. En el sistema de base 5, cada dígito tiene un valor entre 0 y 4. Considera el número  

2031₅  

Aquí, el subíndice 5 significa que el número está escrito en base 5. En este curso, puedes asumir que cualquier número escrito sin subíndice está en base 10.  

El valor decimal del número en base 5 anterior es:  

2 · 5³ + 0 · 5² + 3 · 5 + 1 = 266₁₀  

La **base 2 (binaria)** es especialmente común en programación. Aquí están los primeros números naturales en base 2:  

0₂ = 0₁₀  
1₂ = 1₁₀  
10₂ = 2₁₀  
11₂ = 3₁₀  
100₂ = 4₁₀  
101₂ = 5₁₀  
110₂ = 6₁₀  
111₂ = 7₁₀  
1000₂ = 8₁₀  

También usamos a menudo la **base 16 (hexadecimal)**, en la cual tenemos dígitos extra:  
a = 10, b = 11, c = 12, d = 13, e = 14, f = 15.  

Por ejemplo:  

ff₁₆ = 255₁₀ porque 15 · 16¹ + 15 · 16⁰ = 240 + 15 = 255  

Internamente, las computadoras no almacenan números en base 10. A nivel de hardware, en realidad se almacenan en binario (aunque esto es invisible incluso para programadores de bajo nivel). Funciones de Python como `print()` internamente realizan operaciones aritméticas para producir dígitos decimales a partir de un número. De manera similar, funciones como `int()` usan aritmética para unir dígitos decimales en un número.  

### Generación de dígitos en diferentes bases
En la lección anterior, vimos algoritmos que pueden separar un entero en dígitos decimales, y unir una serie de dígitos decimales para formar un entero.  

Ahora generalicemos esos algoritmos para trabajar con bases no decimales. En realidad, el cambio es trivial: ¡simplemente cambiamos la constante 10 en nuestro código!  

Por ejemplo, anteriormente vimos este programa para imprimir los dígitos decimales de un número:  

```python
n = int(input('Enter n: '))

while n > 0:
  d = n % 10
  n = n // 10
  print('digit:', d)
````

Modifiquémoslo para imprimir los dígitos binarios de un número. Solo necesitamos cambiar la constante `10` por `2`:

```python
n = int(input('Enter n: '))

while n > 0:
  d = n % 2
  n = n // 2
  print('digit:', d)
```

Ejecutemos el programa:

```
Enter n: 43
digit:  1
digit:  1
digit:  0
digit:  1
digit:  0
digit:  1
```

Los dígitos se generan en orden inverso. La salida significa que:

101011₂ = 43₁₀

Esto se debe a que:

1 · 2⁵ + 0 · 2⁴ + 1 · 2³ + 0 · 2² + 1 · 2 + 1 = 32 + 8 + 2 + 1 = 43

Podemos modificar el programa para imprimir el resultado como una cadena:

```python
n = int(input('Enter n: '))

s = ''
while n > 0:
  d = n % 2
  n = n // 2
  s = str(d) + s    # anteponer dígito a la cadena
print('in base 2:', s)
```

### Combinar dígitos en diferentes bases

De manera similar, la semana pasada vimos un programa que lee una serie de dígitos decimales y los une en un entero. Reescribámoslo usando `for` para iterar sobre `sys.stdin`:

```python
import sys

n = 0
for line in sys.stdin:
  digit = int(line)
  n = 10 * n + digit
print('n is', n)
```

Podemos modificar fácilmente este programa para trabajar en otra base. Una vez más, cambiemos `10` por `2`:

```python
import sys

n = 0
for line in sys.stdin:
  digit = int(line)
  n = 2 * n + digit
print('n is', n)
```

Ejecutemos el programa:

```
$ py hello.py
1
0
1
0
1
1
n is 43
```

El programa ha leído los dígitos binarios de `101011₂` y los ha unido en el número 43.


### Conversión entre bases

Para convertir de base B a base C, todo lo que necesitamos hacer es leer los dígitos de un número en base B y luego generar los dígitos en base C. Esto se puede lograr combinando los programas de las dos secciones anteriores (ejercicio recomendado).


### Prueba de primalidad

Como sabemos de matemáticas, un **número primo** es un entero mayor que 1 cuyos únicos factores son 1 y él mismo. Por ejemplo: 2, 7, 47 y 101 son primos.

Queremos escribir un programa que pruebe si un número dado es primo. Usaremos un algoritmo sencillo llamado **división de prueba**, que consiste en dividir entre cada posible factor sucesivamente. (Por cierto, existen algoritmos más eficientes y complejos de prueba de primalidad; podrás encontrarlos en cursos más avanzados).

Implementación ingenua de la división de prueba:

```python
n = int(input('Enter n: '))

prime = True
for i in range(2, n):  # loop from 2 .. (n - 1)
  if n % i == 0:
    prime = False
    break

if prime:
  print('n is prime')
else
  print('not prime')
```

Esto funciona, pero es ineficiente porque puede necesitar probar todos los enteros desde 2 hasta (n – 1).

En realidad, para un `n` dado solo necesitamos probar los valores hasta **sqrt(n)**.

**Demostración:**
Si `a · b = n` para enteros `a` y `b`, entonces o bien `a ≤ sqrt(n)` o `b ≤ sqrt(n)`.
Supongamos que `a > sqrt(n)` y `b > sqrt(n)`. Entonces `a · b > sqrt(n) · sqrt(n) = n`, lo cual es una contradicción.

Por lo tanto, si hemos probado todos los valores de 2 a sqrt(n) y ninguno divide a n, entonces n es primo.

Podemos hacer nuestro programa mucho más eficiente reemplazando:

```python
for i in range(2, n)
```

por:

```python
for i in range(2, int(math.sqrt(n)) + 1)
```


### Factorización prima

El **Teorema Fundamental de la Aritmética** establece que:

> Todo entero positivo tiene una factorización prima única.

Por ejemplo:

* 24 = 2 · 2 · 2 · 3 = 2³ · 3¹
* 30 = 2 · 3 · 5 = 2¹ · 3¹ · 5¹
* 64 = 2 · 2 · 2 · 2 · 2 · 2 = 2⁶
* 100 = 2 · 2 · 5 · 5 = 2² · 5²

La demostración puede verse en un curso introductorio de teoría de números.

Podemos usar la **división de prueba** para factorizar un entero. Dado un entero N, probamos primero dividirlo entre 2, luego entre 3, etc. Si N es divisible por un número como 3, debemos dividir repetidamente entre ese número, ya que un factor primo puede aparecer múltiples veces.

Primer programa para factorización prima:

```python
n = int(input('Enter n: '))

i = 2
  
while i < n:
  if n % i == 0:
    print(i, end = ' ')  # imprime en la misma línea, separados por espacios
    n //= i
  else:
    i += 1
    
print(n)
```

Este programa elimina todos los factores menores que n. Una vez hecho, el valor restante de n es el último factor primo, así que se imprime al final.

Nota: el programa intentará dividir entre factores no primos (ej. i = 4). Pero n nunca será divisible por ellos, ya que todo factor no primo es el producto de primos más pequeños que ya fueron eliminados.

El programa funciona, pero es ineficiente porque potencialmente prueba todos los valores de 1 a n. Al igual que en la prueba de primalidad, podemos hacerlo mucho más eficiente deteniendo el bucle una vez que i alcanza sqrt(n).

Versión optimizada:

```python
import math

n = int(input('Enter n: '))

i = 2
  
while i <= math.sqrt(n):
  if n % i == 0:
    print(i, end = ' ')
    n //= i
  else:
    i += 1
    
print(n)
```
