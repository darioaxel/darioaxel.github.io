---
title: "Promesas"
date: 2026-01-10
category: [Blog]
tag: [Programacion, Promesas, Asincronia]
type: article
---

# Promesas en Desarrollo Web

## Entendiendo la Asincronía en el Desarrollo Web Servidor

Antes de hablar de promesas, debemos entender **por qué existen**: el problema de la asincronía es uno de los pilares fundamentales en el desarrollo de aplicaciones web modernas que manejan miles de conexiones simultáneas.

### El Problema: El Cajero Bloqueado

Imagina un supermercado con un único cajero (nuestro hilo de ejecución/hilo principal):

**Modelo Síncrono (Bloqueante):**
El cajero atiende al Cliente 1. Este saca la tarjeta de crédito, tarda 10 segundos en introducir el PIN y esperar la respuesta del banco. Durante esos 10 segundos, el cajero **se queda parado, mirando al cliente**, mientras la cola de Clientes 2, 3, 4... crece desesperadamente. Nadie más puede pagar hasta que el banco responda.

**Modelo Asíncrono (No Bloqueante):**
El cajero atiende al Cliente 1, le pasa el datáfono y **mientras el banco procesa la transacción**, el cajero ya está escaneando los productos del Cliente 2. Cuando el banco responde (evento), el cajero interrumpe un segundo, finaliza la venta del Cliente 1, y continúa. **Nadie espera tiempo muerto**.

![Comparación visual entre ejecución Síncrona y Asíncrona](https://kimi-web-img.moonshot.cn/img/www.datocms-assets.com/f9ecec50674b28b768543be3f6e8b4f9dbe21c73.webp)

*Fuente: [Ramotion Agency](https://www.ramotion.com/blog/synchronous-vs-asynchronous-programming/)*

En la imagen superior observamos claramente cómo en el modelo **síncrono** (izquierda) el tiempo se desperdicia esperando respuestas externas (bloques rojos), mientras que en el **asíncrono** (derecha) el procesador continúa trabajando en otras tareas mientras espera.

### I/O Bloqueante vs No Bloqueante

En servidores web, el 90% del tiempo de espera no es por cálculos matemáticos complejos, sino por **I/O** (Input/Output):
- Consultas a bases de datos
- Llamadas a APIs externas (pasarelas de pago, servicios cloud)
- Lectura/escritura de archivos en disco
- Envío de emails

![Diagrama de Blocking vs Non-Blocking I/O](https://kimi-web-img.moonshot.cn/img/miro.medium.com/9d4809413cc237040111e9244b834e3028c07a27.png)

*Fuente: [Yasir Gaji - Medium](https://medium.com/geekculture/demystifying-blocking-and-non-blocking-i-o-in-javascript-a-deep-dive-5d1df54c33cf)*

Como muestra el diagrama, en un servidor **no bloqueante**, cuando llega una petición que requiere acceso a BD, el servidor no se congela. Coloca la operación de BD en proceso, atiende otras peticiones entrantes (Request 2, 3...), y cuando la BD responde, retoma el resultado.

### El Event Loop: El Orquestador Invisible

Pero si solo tenemos un hilo (como en Node.js o Python `asyncio`), ¿cómo gestionamos múltiples operaciones simultáneas sin que se mezclen? Aquí entra el **Event Loop** (bucle de eventos):

![Diagrama del Event Loop en JavaScript Runtime](https://kimi-web-img.moonshot.cn/img/i.imgur.com/d201abba7718cc6b3b7c8762bb722c8760f8262f.png)

*Fuente: [FreeCodeCamp](https://www.freecodecamp.org/news/javascript-concurrency-model-and-event-loop/)*

El Event Loop funciona como un **jefe de cocina organizado**:
1. **Call Stack** (Pila de ejecución): El plato que estás cocinando ahora mismo.
2. **Web APIs / Worker Threads**: Órdenes que has delegado (ej: "hierve el agua", tarea que lleva tiempo pero no necesita tu atención constante).
3. **Callback Queue** (Cola de callbacks): Platos terminados por los ayudantes, listos para servir.
4. **Event Loop**: El jefe que constantemente pregunta: "¿Terminé lo actual? ¿Hay algo listo en la cola? Si sí, lo traigo a la cocina principal".

### Arquitecturas Comparadas

Es importante no confundir **asincronía** con **multihilo** (multithreading). Son estrategias diferentes para lograr concurrencia:

![Comparativa: Síncrono vs Asíncrono vs Multihilo](https://kimi-web-img.moonshot.cn/img/miro.medium.com/8eacb42f5ebdfc022e59dd04c1c64cea7a87de54.jpeg)

*Fuente: [Arshdeep G - Dev Genius](https://blog.devgenius.io/multi-threading-vs-asynchronous-programming-what-is-the-difference-3ebfe1179a5)*

- **Síncrono**: Un cajero, una fila, todo el mundo espera.
- **Asíncrono**: Un cajero eficiente que mientras espera el PIN del Cliente 1, empaca las bolsas del Cliente 2.
- **Multihilo**: Varios cajeros (hilos), cada uno con su fila.

> **Clave para el módulo:** En servidores web modernos (Node.js, FastAPI, Spring WebFlux), preferimos el modelo **asíncrono sobre un único hilo** (o pocos hilos) porque es más escalable. Crear un hilo por cada cliente (modelo tradicional de Apache + PHP/Java antiguo) consume mucha memoria RAM cuando tenemos miles de conexiones concurrentes.

### ¿Por qué necesitamos las Promesas?

El problema del código asíncrono tradicional era el **"Callback Hell"** (infierno de callbacks): código anidado, difícil de leer, error-prone. 

Si el cajero tiene que hacer:
1. Leer tarjeta → 
2. Consultar saldo → 
3. Descontar importe → 
4. Emitir ticket → 
5. Enviar email...

Y cada paso es asíncrono (tarda en responder), terminamos con:

```javascript
// El infierno que queremos evitar
leerTarjeta(id, function(tarjeta) {
  consultarSaldo(tarjeta, function(saldo) {
    descontarImporte(saldo, function(resultado) {
      emitirTicket(resultado, function(ticket) {
        enviarEmail(ticket, function(final) {
          // ¿Dónde estoy? ¿Qué nivel de indentación es este?
        });
      });
    });
  });
});
```

Las **Promesas** nacieron para resolver este caos: permiten escribir código asíncrono que **se lee como síncrono**, manteniendo el rendimiento del no-bloqueo. Son el puente entre la eficiencia del modelo asíncrono y la legibilidad del código secuencial.

## ¿Qué es una Promesa en Software?

En programación, una **promesa** (*promise*) es un objeto que representa la eventual finalización (o fallo) de una operación asíncrona y su valor resultante. Es decir, es un "compromiso" de que, aunque no tengamos el dato **ahora**, lo tendremos en el futuro, o sabremos por qué no pudimos obtenerlo.

> **Analogía práctica:** Imagina que entras a un restaurante y pides una paella. El camarero no te trae la paella inmediatamente (sería síncrono), pero te da un **ticket con un número**. Ese ticket es tu *promesa*: garantiza que, cuando la cocina termine, recibirás tu plato (éxito) o te avisarán si se acabó el arroz (fallo). Mientras tanto, puedes hacer otras cosas: hablar, beber agua, mirar el móvil... no estás bloqueado esperando.

## El Ciclo de Vida de una Promesa

Toda promesa atraviesa tres estados posibles:

1. **Pending** (Pendiente): Estado inicial; la operación aún no se ha completado.
2. **Fulfilled** (Cumplida): La operación se completó exitosamente.
3. **Rejected** (Rechazada): La operación falló.

![Diagrama del ciclo de vida de una Promesa según MDN](https://kimi-web-img.moonshot.cn/img/developer.mozilla.org/3852aef72a547f5c09c6f05e327f5fbeb50ee7af.png)

*Fuente: [MDN Web Docs - Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)*

## Implementaciones en Diferentes Entornos Servidor

### 1. JavaScript (Node.js / Entorno Servidor Moderno)

En el ecosistema web, las promesas son el estándar para manejar operaciones asíncronas no bloqueantes (acceso a BD, APIs externas, lectura de archivos).

```javascript
// Ejemplo: Consulta a una API externa desde el servidor
function obtenerUsuario(id) {
  return new Promise((resolve, reject) => {
    // Simulamos una consulta a base de datos asíncrona
    setTimeout(() => {
      if (id > 0) {
        resolve({ id: id, nombre: "Ana García", rol: "admin" });
      } else {
        reject(new Error("ID de usuario inválido"));
      }
    }, 1000);
  });
}

// Consumo de la promesa con async/await (sintaxis moderna)
async function procesarPeticion(req, res) {
  try {
    console.log("Iniciando consulta...");
    const usuario = await obtenerUsuario(req.params.id);
    console.log("Usuario obtenido:", usuario);
    res.json(usuario);
  } catch (error) {
    console.error("Error en la promesa:", error.message);
    res.status(400).json({ error: error.message });
  }
}
```

**Conceptos clave:**
- `new Promise((resolve, reject) => {...})` crea la promesa.
- `resolve()` cambia el estado a *fulfilled*.
- `reject()` cambia el estado a *rejected*.
- `async/await` es azúcar sintáctico sobre las promesas para lectura secuencial.

### 2. Java (Spring Boot / Enterprise)

Java no tiene "promesas" nativas con ese nombre, pero desde Java 8 dispone de **`CompletableFuture`**, que implementa el mismo patrón (y más potente, permitiendo composición de operaciones).

```java
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;

public class GestionPedidos {
    
    public static CompletableFuture<String> procesarPago(double cantidad) {
        return CompletableFuture.supplyAsync(() -> {
            // Simula procesamiento en segundo plano (hilo del ForkJoinPool)
            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                throw new RuntimeException(e);
            }
            
            if (cantidad > 0) {
                return "Pago de " + cantidad + "€ procesado correctamente";
            } else {
                throw new IllegalArgumentException("Cantidad inválida");
            }
        });
    }
    
    public static void main(String[] args) {
        // Encadenamiento de promesas (thenApply = then en JS)
        CompletableFuture<String> resultado = procesarPago(100.0)
            .thenApply(mensaje -> mensaje.toUpperCase())
            .exceptionally(ex -> "Error en el proceso: " + ex.getMessage());
            
        // Bloqueo solo para ejemplo (en servidor real nunca harías .get() síncrono)
        try {
            System.out.println(resultado.get());
        } catch (InterruptedException | ExecutionException e) {
            e.printStackTrace();
        }
    }
}
```

**Diferencias con JS:**
- `CompletableFuture` es más explícito sobre el *thread pool* (hilos).
- Métodos como `.thenApply()`, `.thenCompose()` (encadenamiento) y `.exceptionally()` (catch).
- En servidores Java modernos (Spring WebFlux), se usa con `Mono` y `Flux` (Project Reactor).


### 3. Python (Django / FastAPI)

Python implementa el concepto mediante **`asyncio`** (biblioteca estándar desde 3.4+). Tanto **FastAPI** como Django moderno (3.1+ con vistas async) utilizan este modelo.

```python
import asyncio
from datetime import datetime

# Simulamos una operación de BD asíncrona (ej: SQLAlchemy 1.4+ async)
async def enviar_email_confirmacion(email: str) -> str:
    print(f"[{datetime.now()}] Iniciando envío a {email}...")
    await asyncio.sleep(2)  # Simula I/O de red no bloqueante
    
    if "@" in email:
        return f"Email enviado exitosamente a {email}"
    else:
        raise ValueError("Formato de email inválido")

# Vista tipo FastAPI (o Django async view)
async def registro_usuario(request):
    try:
        # La 'promesa' se crea al llamar la función async
        tarea = enviar_email_confirmacion("alumno@ejemplo.com")
        
        # Mientras tanto, el servidor puede atender otras peticiones...
        print("Procesando otros datos del formulario...")
        
        # await 'consume' la promesa (espera el resultado)
        resultado = await tarea
        return {"status": "success", "message": resultado}
        
    except Exception as e:
        return {"status": "error", "detail": str(e)}

# Para ejecutar el ejemplo standalone:
if __name__ == "__main__":
    # asyncio.run() es el event loop (equivalente al navegador/Node)
    print(asyncio.run(registro_usuario(None)))
```

**Equivalencias conceptuales:**
- `async def` = función que retorna una coroutine (similar a una función que retorna Promise).
- `await` = equivalente a `.then()`, pero con sintaxis más limpia.
- `asyncio.create_task()` = crea la "promesa" explícitamente si necesitas ejecutarla en background.

#### Ejemplo específico FastAPI:

```python
from fastapi import FastAPI, HTTPException
import asyncio

app = FastAPI()

@app.get("/items/{item_id}")
async def read_item(item_id: int):
    # FastAPI maneja automáticamente el event loop
    try:
        data = await fetch_from_database(item_id)  # Operación asíncrona
        return {"item": data}
    except Exception:
        raise HTTPException(status_code=404, detail="Item no encontrado")

async def fetch_from_database(item_id: int):
    await asyncio.sleep(0.1)  # Simula query async
    if item_id == 42:
        return {"id": 42, "name": "Respuesta终极"}
    raise Exception("No existe")
```

## Tabla Comparativa

| Característica | JavaScript (Promise) | Java (CompletableFuture) | Python (asyncio) |
|----------------|---------------------|-------------------------|------------------|
| **Creación** | `new Promise((res, rej) => ...)` | `CompletableFuture.supplyAsync()` | `async def` / `asyncio.create_task()` |
| **Consumo** | `.then()` / `await` | `.get()` / `.thenApply()` | `await` |
| **Manejo de errores** | `.catch()` / `try-catch` | `.exceptionally()` / `try-catch` | `try-except` |
| **Cancelación** | No nativa (AbortController) | `.cancel(true)` | `Task.cancel()` |
| **Uso típico servidor** | Node.js, Express, Next.js | Spring WebFlux, microservicios | FastAPI, Django ASGI, Sanic |

