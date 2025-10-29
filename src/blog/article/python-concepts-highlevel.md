---
title: "Conceptos de Python 🐍"
date: 2025-10-28
category: [Blog]
tag: [Programacion, Python]
type: article
---
# 🐍 Conceptos clave de Python que todo desarrollador debe dominar


## 1. Objetos mutables e inmutables

En Python, todo es un objeto. Sin embargo, algunos objetos **pueden modificarse (mutables)** y otros **no (inmutables)**.
Comprender esta diferencia es esencial para evitar errores al pasar datos entre funciones o modificar estructuras de datos.

```python
def añadir_item(items, valor):
    items.append(valor)
    return items

mi_lista = [1, 2, 3]
añadir_item(mi_lista, 4)
print(mi_lista)  # [1, 2, 3, 4] - modificada en su lugar
```

**La clave:**

* Tipos **inmutables** (`int`, `float`, `str`, `tuple`) → los cambios crean un nuevo objeto.
* Tipos **mutables** (`list`, `dict`, `set`) → los cambios afectan al mismo objeto.

### 1.1. Ejercicios

1. Crea una función que reciba una lista y le añada un número. Comprueba si la lista original cambia fuera de la función.
2. Explica qué sucede en este código y por qué los resultados son distintos:

   ```python
   a = (1, 2)
   b = [1, 2]
   a += (3,)
   b += [3]
   print(a, b)
   ```

📘 **Documentación oficial:**

* [Built-in Types — Python 3](https://docs.python.org/3/library/stdtypes.html)
  📖 **Lectura recomendada:**
* [Mutable vs Immutable Objects in Python – Real Python](https://realpython.com/python-mutable-vs-immutable-types/)

---

## 2. Argumentos mutables por defecto

Los valores por defecto en las funciones de Python **solo se evalúan una vez**, cuando se define la función, no cada vez que se llama.
Por eso, usar listas o diccionarios como valores por defecto puede generar comportamientos inesperados.

```python
def añadir_a_lista(valor, items=[]):
    items.append(valor)
    return items

print(añadir_a_lista(1))  # [1]
print(añadir_a_lista(2))  # [1, 2] - no es una lista nueva
```

✅ **Solución correcta:**

```python
def añadir_a_lista(valor, items=None):
    if items is None:
        items = []
    items.append(valor)
    return items
```

### 2.1. Ejercicios

1. Implementa una función `agregar_usuario(nombre, lista=[])` y muestra por qué este diseño es peligroso.
2. Corrige el problema usando `None` como valor por defecto y explica por qué la corrección evita el fallo.

📘 **Documentación oficial:**

* [Default Argument Values — Python Tutorial](https://docs.python.org/3/tutorial/controlflow.html#default-argument-values)
  📖 **Lectura recomendada:**
* [Python Mutable Defaults Are The Source of All Evil – Florimond Manca](https://florimond.dev/en/posts/2018/08/python-mutable-defaults-are-the-source-of-all-evil)

---

## 3. Paso de parámetros por referencia de objeto

Python no usa estrictamente “paso por valor” ni “paso por referencia”.
En su lugar, pasa **referencias a los objetos**, lo que significa que los cambios en objetos mutables afectan a la variable original.

```python
def modificar(num):
    num += 1
    print("Dentro:", num)

x = 5
modificar(x)
print("Fuera:", x)  # sigue siendo 5
```

🔍 Para los tipos **inmutables**, parece “por valor”.
Para los **mutables**, se comporta “por referencia”.

### 3.1. Ejercicios

1. Crea una función que modifique una lista dentro de otra función y comprueba si el cambio se refleja fuera.
2. Explica la diferencia al pasar una lista y una tupla a una función que intenta modificarlas.

📘 **Documentación oficial:**

* [Data model — Python 3](https://docs.python.org/3/reference/datamodel.html)
  📖 **Lectura recomendada:**
* [Pass by Object Reference in Python – Medium](https://python.plainenglish.io/pass-by-object-reference-in-python-79a8d92dc493)

---

## 4. `is` vs `==`

En Python, `==` compara valores y `is` compara **identidad de objeto**.
Esta distinción es crítica, especialmente al trabajar con `None` o pequeños objetos internos que Python reutiliza.

```python
a = [1, 2]
b = [1, 2]
print(a == b)  # True
print(a is b)  # False
```

::: tip
Consejo: usa siempre `is None` y `is not None` al comprobar valores nulos.
:::

### 4.1. Ejercicios

1. Explica por qué `x is y` puede ser `True` para enteros pequeños pero no para listas iguales.
2. Crea una función que reciba un valor y determine si es `None` o no usando `is`.

📘 **Documentación oficial:**

* [Identity, Equality, and Type — Data Model](https://docs.python.org/3/reference/datamodel.html)
  📖 **Lectura recomendada:**
* [Is vs == in Python – Real Python](https://realpython.com/python-is-identity-vs-equality/)

## 5. Iteradores y generadores

Los **iteradores** son objetos que se recorren elemento a elemento con `next()`.
Los **generadores** son una forma sencilla de crear iteradores sin almacenar todos los datos en memoria.

```python
def cuenta_atras(n):
    while n > 0:
        yield n
        n -= 1

for i in cuenta_atras(3):
    print(i)
```

::: note
Los generadores permiten escribir código eficiente y legible.
:::

### 5.1. Ejercicios

1. Crea un generador que devuelva los cuadrados de los números del 1 al 5.
2. Usa `iter()` y `next()` para recorrer una lista manualmente, manejando `StopIteration`.

📘 **Documentación oficial:**

* [Iterators — Python Docs](https://docs.python.org/3/tutorial/classes.html#iterators)
  📖 **Lectura recomendada:**
* [Iterators and Iterables in Python – Real Python](https://realpython.com/python-iterators-iterables/)

## 6. List comprehensions vs generator expressions

Ambas permiten crear secuencias de forma concisa, pero **las comprensiones crean listas completas**, mientras que los **generadores** producen elementos uno a uno (más eficientes en memoria).

```python
cuadrados_lista = [x*x for x in range(5)]
cuadrados_gen = (x*x for x in range(5))
```

### 6.1. Ejercicios

1. Crea una lista de números pares entre 1 y 20 usando comprensión de listas.
2. Convierte el ejercicio anterior en una expresión generadora y usa `next()` para obtener valores.

📘 **Documentación oficial:**

* [Expressions — Python Reference](https://docs.python.org/3/reference/expressions.html#generator-expressions)
  📖 **Lectura recomendada:**
* [List Comprehensions vs Generator Expressions – GeeksforGeeks](https://www.geeksforgeeks.org/difference-between-list-comprehension-and-generator-expression/)

---

## 7. Administradores de contexto (`with`)

Los **context managers** permiten manejar recursos (archivos, conexiones, etc.) asegurando su liberación, incluso si ocurre un error.
Se implementan fácilmente con la palabra clave `with`.

```python
with open("datos.txt") as f:
    datos = f.read()
```

🔒 Garantizan el cierre o limpieza del recurso de forma automática.

### 7.1. Ejercicios

1. Crea un programa que lea un archivo usando `with` y cuente sus líneas.
2. Implementa una clase `MiContexto` con `__enter__` y `__exit__` que imprima mensajes al entrar y salir.

📘 **Documentación oficial:**

* [Context Managers — Python Tutorial](https://docs.python.org/3/reference/datamodel.html#context-managers)
  📖 **Lectura recomendada:**
* [Context Managers and the with Statement – Real Python](https://realpython.com/python-with-statement/)

## 8. El poder de `*args` y `**kwargs`

`*args` y `**kwargs` permiten definir funciones que aceptan un número variable de argumentos.
Son muy útiles para crear funciones flexibles y reutilizables.

```python
def demo(a, *args, **kwargs):
    print("a:", a)
    print("args:", args)
    print("kwargs:", kwargs)

demo(1, 2, 3, x=4, y=5)
```

### 8.1. Ejercicios

1. Crea una función `mostrar_datos` que reciba cualquier cantidad de argumentos y los imprima.
2. Usa `**kwargs` para mostrar información de usuario (`nombre`, `edad`, `email`).

📘 **Documentación oficial:**

* [Defining Functions — Python Tutorial](https://docs.python.org/3/tutorial/controlflow.html#more-on-defining-functions)
  📖 **Lectura recomendada:**
* [Understanding *args and **kwargs in Python – Real Python](https://realpython.com/python-kwargs-and-args/)


## 9. Decoradores

Los **decoradores** son funciones que modifican el comportamiento de otras funciones sin alterar su código.
Son útiles para registrar, validar, medir tiempos o aplicar patrones de diseño.

```python
def log(func):
    def envoltorio(*args, **kwargs):
        print(f"Llamando a {func.__name__}")
        return func(*args, **kwargs)
    return envoltorio

@log
def saludar(nombre):
    print(f"Hola, {nombre}")

saludar("Python")
```

### 9.1. Ejercicios

1. Crea un decorador que mida el tiempo de ejecución de una función.
2. Aplica un decorador que registre las llamadas y los argumentos de una función.

📘 **Documentación oficial:**

* [Decorators — Python Tutorial](https://docs.python.org/3/tutorial/controlflow.html#decorators)
  📖 **Lectura recomendada:**
* [Primer on Python Decorators – Real Python](https://realpython.com/primer-on-python-decorators/)


## 10. `__name__ == "__main__"`

Esta condición permite que un módulo de Python se ejecute **como script principal o como módulo importado**.
Evita que se ejecute código no deseado al importar un archivo.

```python
def main():
    print("Ejecutando como script!")

if __name__ == "__main__":
    main()
```

### 10.1. Ejercicios

1. Crea un archivo con esta estructura y ejecútalo directamente y desde otro script para ver la diferencia.
2. Explica por qué `__name__` toma distintos valores según cómo se ejecute el archivo.

📘 **Documentación oficial:**

* [Modules — Python Tutorial](https://docs.python.org/3/tutorial/modules.html)
  📖 **Lectura recomendada:**
* [What Does if **name** == "**main**" Do? – Real Python](https://realpython.com/if-name-main-python/)

