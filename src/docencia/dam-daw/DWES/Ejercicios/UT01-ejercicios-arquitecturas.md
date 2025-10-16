---
title: Ejercicios UT01. Arquitecturas Web
icon: pen
---
# Ejercicios UT01. Introducción. 
::: danger
La clave de la máquina virtual dentro del VDI para DWES es **pirineus**
:::

::: info
Este ejercicio se trabajará en las videotutorías, por lo cual el contenido final no estará disponible hasta la segunda semana.
:::


## 🧩 Ejercicio 1: Consulta de personajes con `curl` y la API de Rick and Morty

### 📘 Objetivo

Aprender a realizar peticiones HTTP desde la línea de comandos utilizando `curl`, analizando las **cabeceras** de respuesta y el **contenido JSON** devuelto por un servicio web público.

### 🧠 Contexto

La **[Rick and Morty API](https://rickandmortyapi.com/)** es una API REST pública y gratuita que ofrece información sobre personajes, ubicaciones y episodios de la serie *Rick and Morty*.

### 📁 Pasos a seguir

1. **Realiza una petición a la API** para obtener la lista de personajes:

   ```bash
   curl -i -H "accept: application/json" \
        "https://rickandmortyapi.com/api/character"
   ```

   > 🔍 La opción `-i` muestra las **cabeceras HTTP** junto con la respuesta.

2. **Analiza la cabecera de la respuesta**, donde encontrarás información como:

   ```
   HTTP/1.1 200 OK
   Content-Type: application/json; charset=utf-8
   Date: Tue, 16 Oct 2025 09:12:47 GMT
   Server: cloudflare
   ```

   ✳️ **Preguntas de reflexión:**

   * ¿Qué indica el código de estado `200 OK`?
   * ¿Qué tipo de contenido devuelve la API?
   * ¿Qué función cumple el campo `Date`?
   * ¿Qué servidor gestiona la API?


3. **Observa el contenido JSON devuelto**, por ejemplo (fragmento):

   ```json
   {
     "info": {
       "count": 826,
       "pages": 42,
       "next": "https://rickandmortyapi.com/api/character?page=2",
       "prev": null
     },
     "results": [
       {
         "id": 1,
         "name": "Rick Sanchez",
         "status": "Alive",
         "species": "Human",
         "type": "",
         "gender": "Male",
         "origin": {
           "name": "Earth (C-137)",
           "url": "https://rickandmortyapi.com/api/location/1"
         },
         "location": {
           "name": "Citadel of Ricks",
           "url": "https://rickandmortyapi.com/api/location/3"
         },
         "image": "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
         "episode": [
           "https://rickandmortyapi.com/api/episode/1",
           "https://rickandmortyapi.com/api/episode/2"
         ]
       }
     ]
   }
   ```

4. **Filtra y muestra el JSON formateado** usando `jq` (si lo tienes instalado):

   ```bash
   curl -s "https://rickandmortyapi.com/api/character" | jq .
   ```

   También puedes buscar directamente un personaje por nombre, por ejemplo **Morty Smith**:

   ```bash
   curl -s "https://rickandmortyapi.com/api/character/?name=Morty" | jq .
   ```


### 🧩 Opcional

* Prueba a consultar un **episodio concreto**:

  ```bash
  curl -s "https://rickandmortyapi.com/api/episode/10" | jq .
  ```

* Y una **localización**:

  ```bash
  curl -s "https://rickandmortyapi.com/api/location/1" | jq .
  ```


## 🧩 Ejercicio 2: Sistema de emergencias con el patrón Observador (Python)

### 📘 Objetivo

Implementar el **patrón de diseño Observador** para modelar un **sistema de emergencias** en el que distintas unidades (Policía, Bomberos, Ambulancia) reciben notificaciones según el tipo de emergencia.

### 🧠 Contexto del ejercicio

En una arquitectura orientada a eventos, un **emisor (sujeto)** notifica a varios **observadores** cuando ocurre un evento.
En este caso, el **Centro de Emergencias** emitirá alertas que podrán ser escuchadas por **distintos servicios**: policía, bomberos o ambulancias.

Cada servicio se suscribirá solo a los tipos de alerta que le correspondan, pero el sistema permitirá también **alertas múltiples**.

---

### 📁 Estructura del proyecto

```
sistema_emergencias/
│
├── main.py
├── subject.py
├── observer.py
└── servicios/
    ├── policia.py
    ├── bomberos.py
    └── ambulancia.py
```

---

### 🧩 Código fuente

#### 🟢 `subject.py` — Clase Sujeto (Centro de emergencias)

```python
# subject.py

class Subject:
    def __init__(self):
        self._observers = {}

    def suscribir(self, tipo_alerta, observador):
        """Suscribe un observador a un tipo de alerta."""
        if tipo_alerta not in self._observers:
            self._observers[tipo_alerta] = []
        self._observers[tipo_alerta].append(observador)

    def notificar(self, tipo_alerta, mensaje):
        """Notifica a todos los observadores suscritos al tipo de alerta."""
        print(f"\n🔔 ALERTA: {tipo_alerta.upper()} — {mensaje}")
        if tipo_alerta in self._observers:
            for observador in self._observers[tipo_alerta]:
                observador.actualizar(mensaje)
```

---

#### 🟢 `observer.py` — Interfaz base para los observadores

```python
# observer.py

from abc import ABC, abstractmethod

class Observer(ABC):
    @abstractmethod
    def actualizar(self, mensaje):
        pass
```

---

#### 🚓 `servicios/policia.py`

```python
# servicios/policia.py

from observer import Observer

class Policia(Observer):
    def actualizar(self, mensaje):
        print(f"🚓 Policía en camino: {mensaje}")
```

---

#### 🚒 `servicios/bomberos.py`

```python
# servicios/bomberos.py

from observer import Observer

class Bomberos(Observer):
    def actualizar(self, mensaje):
        print(f"🚒 Bomberos desplegados: {mensaje}")
```

---

#### 🚑 `servicios/ambulancia.py`

```python
# servicios/ambulancia.py

from observer import Observer

class Ambulancia(Observer):
    def actualizar(self, mensaje):
        print(f"🚑 Ambulancia movilizada: {mensaje}")
```

---

#### ▶️ `main.py` — Ejecución del sistema

```python
# main.py

from subject import Subject
from servicios.policia import Policia
from servicios.bomberos import Bomberos
from servicios.ambulancia import Ambulancia

if __name__ == "__main__":
    # Crear el centro de emergencias
    centro = Subject()

    # Crear observadores
    policia = Policia()
    bomberos = Bomberos()
    ambulancia = Ambulancia()

    # Suscribir servicios a tipos de alertas
    centro.suscribir("robo", policia)
    centro.suscribir("incendio", bomberos)
    centro.suscribir("accidente", ambulancia)

    # Algunos eventos requieren varios servicios
    centro.suscribir("accidente", policia)
    centro.suscribir("incendio", ambulancia)

    # Enviar alertas
    centro.notificar("robo", "Robo en curso en la Calle Mayor.")
    centro.notificar("incendio", "Fuego en el edificio del Ayuntamiento.")
    centro.notificar("accidente", "Colisión múltiple en la autopista A-4.")
```

### 🧪 Salida esperada

```
🔔 ALERTA: ROBO — Robo en curso en la Calle Mayor.
🚓 Policía en camino: Robo en curso en la Calle Mayor.

🔔 ALERTA: INCENDIO — Fuego en el edificio del Ayuntamiento.
🚒 Bomberos desplegados: Fuego en el edificio del Ayuntamiento.
🚑 Ambulancia movilizada: Fuego en el edificio del Ayuntamiento.

🔔 ALERTA: ACCIDENTE — Colisión múltiple en la autopista A-4.
🚑 Ambulancia movilizada: Colisión múltiple en la autopista A-4.
🚓 Policía en camino: Colisión múltiple en la autopista A-4.
```
