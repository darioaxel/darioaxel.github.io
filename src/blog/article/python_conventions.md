---
title: "Convenciones en Python: Subrayados al inicio"
date: 2025-10-21
category: [Blog]
tag: [Python]
type: article
---

## 🧩 1. Sin subrayado → público

```python
nombre = "Laura"
```

🔹 **Significa:** atributo o variable pública.
🔹 Se puede acceder libremente desde fuera de la clase o módulo.
🔹 Es lo **normal y más usado** en Python.

👉 Ejemplo:

```python
class Persona:
    def __init__(self, nombre):
        self.nombre = nombre  # público

p = Persona("Laura")
print(p.nombre)  # ✅ permitido
```

---

## 🧩 2. Un subrayado al principio → “protegido” (*convención*)

```python
_nombre = "Laura"
```

🔹 **Significa:** “esto es para uso interno, no lo toques fuera de la clase o módulo”.
🔹 **No impide el acceso**, solo es una **advertencia semántica** para otros desarrolladores.
🔹 Pythonistas respetan esta convención igual que si fuera `protected`.

👉 Ejemplo:

```python
class Persona:
    def __init__(self, nombre):
        self._nombre = nombre  # uso interno

p = Persona("Laura")
print(p._nombre)  # ⚠️ posible, pero no recomendado
```

## 🧩 3. Doble subrayado al principio → *name mangling* (“ocultamiento de nombre”)

```python
__nombre = "Laura"
```

🔹 Python **renombra internamente** el atributo para evitar conflictos con clases hijas.
🔹 Se vuelve accesible como `obj._NombreDeClase__atributo`.
🔹 Es lo más parecido a un **atributo privado**.

👉 Ejemplo:

```python
class Persona:
    def __init__(self, nombre):
        self.__nombre = nombre

p = Persona("Laura")
print(p.__nombre)        # ❌ Error: AttributeError
print(p._Persona__nombre) # ✅ acceso posible (pero no recomendado)
```

🔸 El doble subrayado se usa **rara vez**, solo cuando hay herencia y quieres **evitar sobrescrituras accidentales**.

## 🧩 4. Un subrayado al final → evitar conflictos con palabras reservadas

```python
class_ = "Usuario"
```

🔹 Se usa solo cuando el nombre que quieres coincide con una palabra clave de Python (`class`, `def`, `lambda`, etc.).
🔹 Ejemplo:

```python
class_ = "MiClase"
print(class_)
```


## 🧩 5. Un solo subrayado como variable temporal (“no importa”)

```python
for _ in range(5):
    print("Hola")
```

🔹 Por convención, `_` significa **“valor que no necesito”**.
🔹 Muy común en bucles o desempaquetado de tuplas:

```python
nombre, _, edad = ("Laura", "Ignorar", 25)
```


## 🧠 Resumen 

| Forma        | Nombre                                | Significado                  | Accesibilidad                    |
| ------------ | ------------------------------------- | ---------------------------- | -------------------------------- |
| `variable`   | pública                               | uso normal                   | ✅ libre                          |
| `_variable`  | protegida (convención)                | uso interno                  | ⚠️ accesible pero no recomendado |
| `__variable` | privada (name mangling)               | evita colisiones en herencia | 🚫 renombrada internamente       |
| `variable_`  | evita conflicto con palabra reservada | por estilo                   | ✅ libre                          |
| `_`          | valor descartado                      | “no lo usaré”                | ✅ libre                          |


## 📘 Documentación oficial:

* [PEP 8 – Style Guide for Python Code (sección sobre nombres)](https://peps.python.org/pep-0008/#descriptive-naming-styles)
* [Python Language Reference – Name Mangling](https://docs.python.org/3/tutorial/classes.html#private-variables)


