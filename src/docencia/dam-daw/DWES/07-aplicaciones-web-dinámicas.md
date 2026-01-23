---
title: UT07 Aplicaciones web dinámicas
date: 2025-09-29   
icon: material-symbols:dynamic-feed-rounded
---

# UT07 Aplicaciones web dinámicas
![En construcción](/images/under-construction.jpg)

> **En este tema trabajaremos los siguientes RAs:**
> RA8. - Genera páginas Web dinámicas analizando y utilizando tecnologías y frameworks del servidor Web que añadan código al lenguaje de marcas
>

## 1. Introducción

### 1.1. Breve perspectiva histórica

En los **años 90**, la web era fundamentalmente **estática**: servía archivos HTML pregrabados. Cada usuario veía el mismo contenido, y las actualizaciones requerían editar manualmente los archivos en el servidor. Era suficiente para catálogos y páginas corporativas, pero inviable para contenido personalizado o interactivo.

**¿Por qué surgieron las webs dinámicas?**

1. **Necesidad de personalización**: Usuarios que accedían a sus emails, veían sus pedidos o configuraban perfiles.
2. **Almacenamiento masivo de datos**: Bases de datos se volvieron accesibles y asequibles (MySQL, PostgreSQL).
3. **Interacción en tiempo real**: Foros, comentarios, carritos de compra.

### 1.2. Primeras aproximaciones en Java

- **Java Servlets (1997)**: Clases Java que respondían a peticiones HTTP directamente. Escribías `out.println("<html>...")` en el `doGet()`. **Problema**: Mezclaba lógica y presentación.
- **JSP (JavaServer Pages, 1999)**: Invertía el modelo: escribías HTML con incrustaciones `<%= variable %>`. **Problema**: Pronto se convirtieron en "spaghetti code" con lógica de negocio en la vista.
- **Java EE / Jakarta EE**: Estándar empresarial con EJB, JSF. Demasiado pesado para proyectos ágiles.

### 1.3. Evolución en otros lenguajes

- **PHP (1995)**: Script incrustado en HTML (`<?php ... ?>`). Difundido pero con problemas de seguridad y mantenibilidad.
- **ASP.NET (2000)**: Eventos y controles tipo escritorio en C#. Enfoque stateful por defecto.
- **Ruby on Rails (2004)**: Convención sobre configuración. MVC limpio.
- **Python (Django 2005, Flask 2010)**: "Baterías incluidas" vs minimalismo.
- **Node.js (2009)**: JavaScript del lado servidor, non-blocking I/O.

## 2. El estado y su gestión. Aplicaciones Stateless vs Stateful

A medida que las aplicaciones crecieron en complejidad y recibieron cantidades crecientes de tráfico, las limitaciones del diseño **stateful** se hicieron evidentes. Gestionar y mantener los datos de sesión añade una sobrecarga de rendimiento y complejidad significativa al sistema. Esta complejidad dificultó que los sistemas escalaran horizontalmente, ya que compartir el estado entre múltiples instancias se convierte en un desafío.

La necesidad urgente de escalabilidad y eficiencia impulsó la popularidad del diseño **stateless**. En lugar de depender de mecanismos para la gestión de estado, las peticiones contenían toda la información necesaria para procesarse. Esto permitió a los sistemas manejar altos volúmenes de peticiones al tiempo que añadía flexibilidad a la forma en que el sistema escala, haciéndolo más eficiente en el uso de recursos.

La mayoría de las aplicaciones **eligen un enfoque híbrido** entre el diseño stateful y stateless según las necesidades y restricciones de cada componente. La clave de un sistema bien diseñado es el **equilibrio**. Debería ser escalable, simple y rápido sin sacrificar funcionalidad.

### 2.1. Definiciones clave

**Estado de una aplicación web** es el conjunto de datos que representan la situación actual de la interacción entre un usuario y el servidor en un momento determinado. Es la "memoria" que permite que la aplicación "recuerde" quién eres, qué has hecho y dónde te encuentras en un flujo de trabajo.

::: tip
Como lo define Roy Fielding en su tesis sobre REST: *"El estado de una aplicación es el conjunto mínimo de variables que representan de forma completa y única la condición del sistema en un instante dado"* [Enlace al paper](https://www.cems.uwe.ac.uk/~pchatter/2011/atwd/RoyFielding_REST.pdf)
:::

**Stateless (sin estado)**: Cada petición HTTP es independiente. El servidor NO recuerda peticiones previas. Toda la información necesaria debe viajar en la petición (headers, body, cookies, tokens).

**Stateful (con estado)**: El servidor mantiene información de la sesión del usuario entre peticiones. Una vez autenticado, sabe quién eres sin reenviar credenciales cada vez.

![Statefull vs stateless](https://media.licdn.com/dms/image/v2/D5622AQGf5r_MMJSHSw/feedshare-shrink_800/B56ZqryjNzH8Ag-/0/1763818772558?e=1770854400&v=beta&t=UC3C3Ipg9wBGT8cfcEQ5_Mydh1Y4l6BMHRKf7tMxQWo)

### 2.2. **Aproximación Stateless – La web moderna**

**Características**:
- Cada petición incluye token JWT o cookie de sesión.
- El servidor es "dumb": recibe token, lo valida, responde.
- Escalado horizontal trivial: cualquier servidor puede atender cualquier petición.

**Frameworks y ejemplos**:

| Framework | Mecanismo | Ejemplo práctico |
|-----------|-----------|------------------|
| **FastAPI** | JWT en `Authorization: Bearer` | `from fastapi import Depends; oauth2_scheme = OAuth2PasswordBearer(...)` |
| **Django REST** | Token en headers | `rest_framework.authtoken` |
| **Express.js** | JWT o cookies firmadas | `jwt.verify(token, SECRET)` |
| **Spring Boot** | Stateless sessions | `http.sessionManagement().sessionCreationPolicy(STATELESS)` |

**Problemas**:
- **Token leakage**: Si roban el token, acceden a todo. Solución: tiempos de expiración cortos (<15 min) y refresh tokens.
- **Revocación**: ¿Cómo invalidas un token antes de que expire? Solución: blacklist en Redis o base de datos.
- **Tamaño**: Los JWT pueden crecer (claims). Solución: usar reference tokens (solo ID) o cookies de sesión cifradas.


### 2.3. **Aproximación Stateful – El modelo tradicional**

**Características**:
- El servidor almacena sesiones en memoria o base de datos.
- Usuario recibe solo un `sessionId` en cookie.
- El servidor "sabe" quién eres.

**Frameworks y ejemplos**:

| Framework | Almacenamiento | Ejemplo práctico |
|-----------|----------------|------------------|
| **Django** | `django_session` (DB) | `request.session['user_id'] = 123` |
| **ASP.NET Core** | In-memory, Redis, SQL Server | `services.AddSession()` |
| **PHP (Laravel)** | File, Redis, DB | `session()->put('key', 'value')` |
| **Java (Spring MVC)** | HttpSession | `session.setAttribute("user", user)` |

**Ventajas**: Fácil de desarrollar. Invalidas sesión borrando registro.

**Problemas**:
- **Escalado**: Si usas memoria local, solo ese servidor conoce la sesión. Solución: sticky sessions (nginx `ip_hash`) o almacenamiento centralizado (Redis).
- **Performance**: Cada request requiere lookup en DB/Redis.
- **CSRF**: Las cookies son vulnerables a Cross-Site Request Forgery. Solución: tokens CSRF en formularios.

### 2.4. **Comparativa y recomendaciones para FP**

| Criterio | Stateless (API + JWT) | Stateful (Sessions) |
|----------|----------------------|---------------------|
| **Complejidad** | Alta (gestión tokens) | Baja |
| **Escalado** | Excelente | Moderado (requiere Redis) |
| **Seguridad** | Riesgo de token theft | Riesgo CSRF (mitigable) |
| **Uso típico** | APIs (móviles, SPAs) | Aplicaciones web tradicionales |
| **Frameworks** | FastAPI, Express, Spring Boot (API) | Django, Laravel, ASP.NET MVC |


## 3. HTMX: Voltear el modelo de SPAs

### 3.1. ¿Qué es HTMX?

**HTMX** es una librería JavaScript de **~14 KB** que permite actualizar páginas HTML directamente desde el servidor usando **atributos HTML**. No necesitas escribir JavaScript. Su lema: *"El HTML es el hipermedia original"*.

```html
<!-- Ejemplo básico: Cargar listado sin recargar -->
<button hx-get="/api/alumnos" hx-target="#listado">
  Cargar alumnos
</button>
<div id="listado"></div>
```

Cuando el usuario pulsa el botón, HTMX hace una petición GET a `/api/alumnos` y reemplaza el contenido de `#listado` con el HTML devuelto.

### 3.2. **¿Por qué usar HTMX?**

1. **Menos abstracción**: El servidor devuelve HTML, no JSON. Tu plantilla se renderiza **una vez**, en el backend.
2. **No JavaScript boilerplate**: Olvídate de `fetch()`, `useEffect()`, `axios`.
3. **SEO nativo**: El contenido ya está en HTML desde el primer render.
4. **Menos complejidad**: Una sola codebase (Python/Django) en lugar de backend + frontend separados.
5. **Progresivo**: Funciona sin JavaScript y se mejora con él.


### 3.3. **Comparativa con otros frameworks**

| Característica | HTMX + Django | React/Vue SPA | Laravel Livewire | Alpine.js |
|----------------|---------------|---------------|------------------|-----------|
| **Tamaño** | 14 KB | >100 KB (sin ReactDOM) | 25 KB (Livewire) | 8 KB |
| **Rendering** | Servidor | Cliente (Virtual DOM) | Servidor (AJAX) | Cliente |
| **Lenguaje** | HTML + atributos | JSX/TSX + JS | PHP + Blade | HTML + x-data |
| **Estado** | En servidor (sessions) | En cliente (Redux/Pinia) | En servidor | En cliente |
| **Learning curve** | Muy baja | Alta | Media | Baja |
| **Ejemplo** | `hx-post="/save"` | `onSubmit={handleSave}` | `wire:click="save"` | `@click="save"` |



### 3.4. **Problemas y limitaciones de HTMX**

1. **Lógica en el servidor**: Si necesitas validación instantánea sin red, requieres JavaScript adicional (Alpine.js es complemento ideal).
2. **No es para juegos**: Aplicaciones ultra-interactivas (Canvas, WebGL) siguen necesitando React/Unity.
3. **No hay componentes reutilizables**: Aunque puedes usar `hx-boost` y templates includes, no hay sistema de props/components como en Vue.
4. **Carga del servidor**: Renderizas HTML en cada interacción. Solución: usar caching (Redis) y fragmentos ESI.


### 3.5. **Ejemplo completo: Lista de alumnos con HTMX en Django**

```python
# views.py
def alumnos_list(request):
    alumnos = Alumno.objects.all()
    if request.headers.get('HX-Request'):  # Petición de HTMX
        return render(request, '_alumnos_table.html', {'alumnos': alumnos})
    return render(request, 'alumnos_full.html', {'alumnos': alumnos})

def alumno_delete(request, pk):
    Alumno.objects.filter(pk=pk).delete()
    alumnos = Alumno.objects.all()
    return render(request, '_alumnos_table.html', {'alumnos': alumnos})
```

```html
<!-- _alumnos_table.html (fragmento) -->
<table>
  {% for a in alumnos %}
  <tr>
    <td>{{ a.nombre }}</td>
    <td>
      <button hx-delete="{% url 'alumno_delete' a.pk %}" 
              hx-confirm="¿Borrar?" 
              hx-target="#tabla">
        Borrar
      </button>
    </td>
  </tr>
  {% endfor %}
</table>

<!-- alumnos_full.html -->
<html>
<body>
  <div id="tabla" hx-get="{% url 'alumnos_list' %}" hx-trigger="load">
    <!-- Carga inicial -->
  </div>
</body>
</html>
```
