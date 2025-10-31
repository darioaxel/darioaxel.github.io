---
title: Anexo VI. Vistas en Django
date: 2025-10-25    
icon: diagram-project 
order: -1
---
# 🐍 Anexo VI: Vistas en Django para la aplicación *myOng*
![En construcción](/images/under-construction.jpg)
## 1. Introducción

En este tutorial completaremos la primera versión de nuestro sitio web **myOng**, añadiendo **páginas de lista y detalle** para nuestros modelos principales: **Socios** y **Compras**.

El proceso será similar al que usamos al crear la página de inicio. De nuevo, necesitaremos:

* Definir **mapas de URL** (`urls.py`),
* Crear las **vistas** (`views.py`), y
* Diseñar las **plantillas** (`templates/`).

La diferencia principal será que, en las **vistas de detalle**, aprenderemos a extraer información desde los patrones en las URLs y pasarla a la vista. Además, veremos un nuevo tipo de vista: las **vistas genéricas basadas en clases** (*Class-Based Generic Views*).

Estas vistas reducen mucho el código necesario, haciendo nuestras aplicaciones más limpias y fáciles de mantener.


## 2. Página de lista de socios

La página de lista mostrará todos los socios registrados en la asociación, con un enlace a su ficha individual (vista de detalle).

📍 URL: `/socios/`
Cada línea mostrará el **nombre completo del socio**, enlazado a su página de detalle.

### 2.1. Mapeo URL

Abre `myong/urls.py` y añade:

```python
urlpatterns = [
    path('', views.index, name='index'),
    path('socios/', views.SocioListView.as_view(), name='socios'),
]
```

📘 Más info sobre [`path()`](https://docs.djangoproject.com/en/stable/ref/urls/#django.urls.path)
Esta función asocia una **ruta** con una **vista** y le da un **nombre** que podremos usar en las plantillas con `{% url 'socios' %}`.



### 2.2. Vista (basada en clases)

Podríamos escribir una vista funcional con `render()`, pero usaremos una **vista genérica**: [`ListView`](https://docs.djangoproject.com/en/stable/ref/class-based-views/generic-display/#listview).

Edita `myong/views.py` y añade:

```python
from django.views import generic
from .models import Socio

class SocioListView(generic.ListView):
    model = Socio
```

¡Listo!
Django buscará automáticamente una plantilla llamada
`myong/templates/myong/socio_list.html`.

Dentro de ella, los datos estarán disponibles como `object_list` o `socio_list`.

📘 Más info: [Generic display views](https://docs.djangoproject.com/en/stable/ref/class-based-views/generic-display/)


### 2.3. Opcional: Personalizando la vista

Podemos añadir atributos para modificar el comportamiento por defecto:

```python
class SocioListView(generic.ListView):
    model = Socio
    context_object_name = 'lista_socios'  
    queryset = Socio.objects.filter(pais='España')  
    template_name = 'socios/lista_socios.html'
```

O incluso sobreescribir métodos como `get_queryset()`:

```python
def get_queryset(self):
    return Socio.objects.filter(fecha_alta__year=2024)
```

Y `get_context_data()` para añadir variables adicionales:

```python
def get_context_data(self, **kwargs):
    context = super().get_context_data(**kwargs)
    context['titulo'] = 'Socios activos'
    return context
```

📘 Referencia: [Customizing class-based views](https://docs.djangoproject.com/en/stable/topics/class-based-views/generic-display/#adding-extra-context)



### 2.4. Creando la plantilla

Crea el archivo:

```
myong/templates/myong/socio_list.html
```

Con el siguiente contenido:

```django
{% extends "base_generic.html" %}

{% block content %}
  <h1>Lista de socios</h1>

  {% if socio_list %}
  <ul>
    {% for socio in socio_list %}
      <li>
        <a href="{{ socio.get_absolute_url }}">{{ socio.nombre }} {{ socio.apellidos }}</a>
      </li>
    {% endfor %}
  </ul>
  {% else %}
    <p>No hay socios registrados.</p>
  {% endif %}
{% endblock %}
```

> En esta plantilla usamos las etiquetas `{% if %}` y `{% for %}`

📘 Ver: [Template language — for](https://docs.djangoproject.com/en/stable/ref/templates/builtins/#for) y [if](https://docs.djangoproject.com/en/stable/ref/templates/builtins/#if)


## 3. Página de detalle de un socio

Esta vista mostrará la **información completa** de un socio:
nombre, apellidos, dirección, país, fecha de alta, etc.

📍 URL: `/socio/<uuid>`

### 3.1. Mapeo URL

Añade a `myong/urls.py`:

```python
path('socio/<uuid:pk>', views.SocioDetailView.as_view(), name='socio-detail'),
```

Aquí usamos `<uuid:pk>` porque todos los identificadores son UUIDs (según la configuración del proyecto).

📘 Más info: [Path converters](https://docs.djangoproject.com/en/stable/topics/http/urls/#path-converters)

---

### 3.2. Vista basada en clases

Edita `myong/views.py` y añade:

```python
class SocioDetailView(generic.DetailView):
    model = Socio
```

Django buscará automáticamente la plantilla:
`myong/templates/myong/socio_detail.html`

📘 Ver: [`DetailView`](https://docs.djangoproject.com/en/stable/ref/class-based-views/generic-display/#detailview)

### 3.3 Creando la plantilla

Crea el archivo:

```
myong/templates/myong/socio_detail.html
```

Y copia:

```django
{% extends "base_generic.html" %}

{% block content %}
  <h1>{{ socio.nombre }} {{ socio.apellidos }}</h1>

  <p><strong>DNI/NIE:</strong> {{ socio.dni }}</p>
  <p><strong>Fecha de nacimiento:</strong> {{ socio.fecha_nacimiento }}</p>
  <p><strong>Dirección:</strong> {{ socio.direccion }}</p>
  <p><strong>Ciudad:</strong> {{ socio.ciudad }}</p>
  <p><strong>Provincia:</strong> {{ socio.provincia }}</p>
  <p><strong>País:</strong> {{ socio.pais }}</p>
  <p><strong>Fecha de alta:</strong> {{ socio.fecha_alta }}</p>

  {% if socio.iban %}
    <p><strong>IBAN:</strong> {{ socio.iban }}</p>
  {% else %}
    <p><em>Pago mediante transferencia.</em></p>
  {% endif %}
{% endblock %}
```

📘 Ver: [Variables en plantillas](https://docs.djangoproject.com/en/stable/ref/templates/language/#variables)



### 3.4. ¿Y si el socio no existe?

La vista genérica lanza automáticamente un `Http404` si el socio no se encuentra.
Si lo hiciéramos como una vista tradicional:

```python
from django.shortcuts import render, get_object_or_404
from .models import Socio

def socio_detail_view(request, pk):
    socio = get_object_or_404(Socio, pk=pk)
    return render(request, 'myong/socio_detail.html', {'socio': socio})
```

📘 Ver: [`get_object_or_404`](https://docs.djangoproject.com/en/stable/topics/http/shortcuts/#get-object-or-404)

---

## 4. Actualizando la plantilla base

Añade los enlaces en `base_generic.html`:

```django
<li><a href="{% url 'index' %}">Inicio</a></li>
<li><a href="{% url 'socios' %}">Socios</a></li>
<li><a href="#">Compras</a></li>
```

--

## 5. Tabla de recursos

| Elemento              | Archivo             | Descripción                   |
| --------------------- | ------------------- | ----------------------------- |
| URL lista de socios   | `myong/urls.py`     | `/socios/`                    |
| Vista lista de socios | `SocioListView`     | Lista todos los socios        |
| Plantilla lista       | `socio_list.html`   | Muestra la lista              |
| URL detalle socio     | `myong/urls.py`     | `/socio/<uuid>`               |
| Vista detalle         | `SocioDetailView`   | Muestra los datos de un socio |
| Plantilla detalle     | `socio_detail.html` | Ficha individual del socio    |



## 6. Bibliografía y enlaces a documentación