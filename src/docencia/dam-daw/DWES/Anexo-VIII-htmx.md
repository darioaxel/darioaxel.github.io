---
title: Anexo VIII. Implementación de HTMX
date: 2026-03-04
icon: code-branch
order: -8
---

## Anexo VIII. Implementación de HTMX en MyONG

### A.1. Preparación del entorno

#### A.1.1. Instalación de dependencias

```bash
# Instalar django-htmx para facilitar la integración
poetry add django-htmx

# O simplemente usar HTMX vía CDN (recomendado para empezar)
```

#### A.1.2. Configuración en `settings.py`

```python
INSTALLED_APPS = [
    # ... tus apps
    'django_htmx',  # Middleware para detectar peticiones HTMX
    'socios',
]

MIDDLEWARE = [
    # ... otros middlewares
    'django_htmx.middleware.HtmxMiddleware',  # Añade request.htmx
]
```

#### A.1.3. Base template con HTMX

```html
<!-- templates/base.html -->
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{% block title %}MyONG - Gestión de Asociación{% endblock %}</title>
    
    <!-- HTMX desde CDN (versión estable) -->
    <script src="https://unpkg.com/htmx.org@1.9.12" 
            integrity="sha384-..." 
            crossorigin="anonymous"></script>
    
    <!-- Extensión para debugging (opcional, solo desarrollo) -->
    <script src="https://unpkg.com/htmx.org/dist/ext/debug.js"></script>
    
    <!-- Tailwind o tu CSS -->
    {% load static %}
    <link rel="stylesheet" href="{% static 'css/styles.css' %}">
    
    <style>
        /* Indicador de carga HTMX */
        .htmx-indicator {
            opacity: 0;
            transition: opacity 200ms;
        }
        .htmx-request .htmx-indicator {
            opacity: 1;
        }
        .htmx-request.htmx-indicator {
            opacity: 1;
        }
    </style>
</head>
<body class="bg-gray-50">
    {% include 'includes/navbar.html' %}
    
    <main class="container mx-auto px-4 py-8">
        {% block content %}{% endblock %}
    </main>
    
    <!-- Toast container para mensajes -->
    <div id="toast-container" class="fixed bottom-4 right-4 space-y-2"></div>
</body>
</html>
```


### A.2. Listado de socios con búsqueda dinámica

Implementaremos un listado que filtra socios sin recargar la página.

#### A.2.1. Vista actualizada (`socios/views.py`)

```python
from django.shortcuts import render, get_object_or_404, redirect
from django.db.models import Q
from django.http import HttpResponse
from django.contrib import messages
from .models import Socio
from .forms import SocioForm, SocioQuickForm

def socio_list(request):
    """
    Lista de socios con búsqueda dinámica vía HTMX.
    Soporta:
    - Carga inicial completa (no HTMX)
    - Actualización parcial de tabla (HTMX)
    - Búsqueda en tiempo real (HTMX)
    """
    query = request.GET.get('q', '')
    
    # Base queryset
    socios = Socio.objects.select_related('direccion').all()
    
    # Aplicar filtro si hay búsqueda
    if query:
        socios = socios.filter(
            Q(nombre__icontains=query) |
            Q(apellidos__icontains=query) |
            Q(dni__icontains=query) |
            Q(email__icontains=query)
        )
    
    context = {
        'socios': socios,
        'query': query,
        'total_socios': socios.count(),
    }
    
    # Si es petición HTMX, devolver solo el fragmento
    if request.headers.get('HX-Request'):
        return render(request, 'socios/partials/_tabla_socios.html', context)
    
    # Carga inicial completa
    return render(request, 'socios/socio_list.html', context)

def socio_detail(request, pk):
    """Detalle de socio - versión completa y modal"""
    socio = get_object_or_404(Socio, pk=pk)
    
    # Si viene de HTMX, devolver versión compacta (para modal)
    if request.headers.get('HX-Request'):
        return render(request, 'socios/partials/_socio_detail_modal.html', {
            'socio': socio
        })
    
    return render(request, 'socios/socio_detail.html', {'socio': socio})
```

#### A.2.2. Template principal (`templates/socios/socio_list.html`)

```html
{% extends 'base.html' %}

{% block title %}Listado de Socios - MyONG{% endblock %}

{% block content %}
<div class="max-w-6xl mx-auto">
    <!-- Header con acciones -->
    <div class="flex justify-between items-center mb-6">
        <h1 class="text-3xl font-bold text-gray-800">Socios de la Asociación</h1>
        
        <button hx-get="{% url 'socio_create' %}" 
                hx-target="#modal-container"
                hx-swap="innerHTML"
                class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            + Nuevo Socio
        </button>
    </div>
    
    <!-- Estadísticas rápidas -->
    <div class="grid grid-cols-4 gap-4 mb-6" 
         hx-get="{% url 'stats_socios' %}" 
         hx-trigger="load, socioChanged from:body">
        {% include 'socios/partials/_stats_cards.html' %}
    </div>
    
    <!-- Barra de búsqueda con indicador -->
    <div class="bg-white p-4 rounded-lg shadow mb-6">
        <div class="relative">
            <input 
                type="text" 
                name="q" 
                placeholder="Buscar por nombre, DNI o email..."
                value="{{ query }}"
                hx-get="{% url 'socio_list' %}"
                hx-target="#tabla-container"
                hx-trigger="keyup changed delay:300ms, search"
                hx-indicator="#search-spinner"
                class="w-full px-4 py-2 border rounded-lg pl-10"
            >
            <!-- Icono de búsqueda -->
            <svg class="absolute left-3 top-2.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
            
            <!-- Spinner de carga -->
            <div id="search-spinner" class="htmx-indicator absolute right-3 top-2.5">
                <svg class="animate-spin h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            </div>
        </div>
    </div>
    
    <!-- Contenedor de la tabla (se actualiza vía HTMX) -->
    <div id="tabla-container" class="bg-white rounded-lg shadow overflow-hidden">
        {% include 'socios/partials/_tabla_socios.html' %}
    </div>
    
    <!-- Modal container (para creación/edición) -->
    <div id="modal-container" class="fixed inset-0 bg-black bg-opacity-50 hidden flex items-center justify-center z-50">
        <!-- Se carga dinámicamente -->
    </div>
</div>

<!-- Script para manejar cierre de modal -->
<script>
    document.body.addEventListener('htmx:afterSwap', function(evt) {
        if (evt.detail.target.id === 'modal-container') {
            evt.detail.target.classList.remove('hidden');
        }
    });
    
    document.body.addEventListener('click', function(evt) {
        if (evt.target.id === 'modal-container') {
            evt.target.classList.add('hidden');
            evt.target.innerHTML = '';
        }
    });
</script>
{% endblock %}
```

#### A.2.3. Fragmento de tabla (`templates/socios/partials/_tabla_socios.html`)

```html
<!-- Este partial se recarga completamente vía HTMX -->
<div class="overflow-x-auto">
    <table class="w-full">
        <thead class="bg-gray-50 border-b">
            <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">DNI/NIE</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contacto</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
            </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
            {% for socio in socios %}
            <tr class="hover:bg-gray-50 transition-colors">
                <td class="px-6 py-4 whitespace-nowrap font-mono text-sm">{{ socio.dni }}</td>
                <td class="px-6 py-4">
                    <div class="text-sm font-medium text-gray-900">{{ socio.nombre }} {{ socio.apellidos }}</div>
                    {% if socio.es_menor %}
                    <span class="text-xs text-orange-600">⚠ Menor (tutor: {{ socio.nombre_tutor }})</span>
                    {% endif %}
                </td>
                <td class="px-6 py-4 text-sm text-gray-500">
                    <div>{{ socio.email|default:"—" }}</div>
                    <div class="text-xs">{{ socio.telefono|default:"—" }}</div>
                </td>
                <td class="px-6 py-4">
                    {% if socio.activo %}
                        <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            Activo
                        </span>
                    {% else %}
                        <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                            Inactivo
                        </span>
                    {% endif %}
                </td>
                <td class="px-6 py-4 text-sm font-medium space-x-2">
                    <!-- Ver detalle en modal -->
                    <button hx-get="{% url 'socio_detail' socio.pk %}" 
                            hx-target="#modal-container"
                            class="text-blue-600 hover:text-blue-900">
                        Ver
                    </button>
                    
                    <!-- Editar inline (swap en la fila) -->
                    <button hx-get="{% url 'socio_edit_row' socio.pk %}" 
                            hx-target="closest tr"
                            hx-swap="outerHTML"
                            class="text-indigo-600 hover:text-indigo-900">
                        Editar
                    </button>
                    
                    <!-- Eliminar con confirmación -->
                    <button hx-delete="{% url 'socio_delete' socio.pk %}" 
                            hx-confirm="¿Eliminar a {{ socio.nombre }}? Esta acción no se puede deshacer."
                            hx-target="closest tr"
                            hx-swap="outerHTML swap:1s"
                            class="text-red-600 hover:text-red-900">
                        Eliminar
                    </button>
                </td>
            </tr>
            {% empty %}
            <tr>
                <td colspan="5" class="px-6 py-8 text-center text-gray-500">
                    {% if query %}
                        No se encontraron socios para "{{ query }}".
                        <button hx-get="{% url 'socio_list' %}" 
                                hx-target="#tabla-container"
                                class="text-blue-600 underline ml-2">
                            Ver todos
                        </button>
                    {% else %}
                        No hay socios registrados.
                        <button hx-get="{% url 'socio_create' %}" 
                                hx-target="#modal-container"
                                class="text-blue-600 underline ml-2">
                            Crear el primero
                        </button>
                    {% endif %}
                </td>
            </tr>
            {% endfor %}
        </tbody>
    </table>
</div>

{% if socios %}
<div class="bg-gray-50 px-6 py-3 border-t text-sm text-gray-500">
    Mostrando {{ socios|length }} socio{{ socios|length|pluralize:"s" }}
    {% if query %} (filtrado de {{ total_socios }} total){% endif %}
</div>
{% endif %}
```

---

### A.3. Creación de socios con validación inline

#### A.3.1. Vista de creación (`socios/views.py`)

```python
from django.views.decorators.http import require_http_methods

@require_http_methods(["GET", "POST"])
def socio_create(request):
    """
    Creación de socio vía modal HTMX.
    - GET: Devuelve formulario vacío
    - POST: Valida y crea, o devuelve errores
    """
    if request.method == 'POST':
        form = SocioForm(request.POST)
        if form.is_valid():
            socio = form.save()
            
            # Disparar evento para actualizar estadísticas
            response = HttpResponse(
                f'<div class="p-4 bg-green-100 text-green-800 rounded">'
                f'✓ Socio <strong>{socio.nombre}</strong> creado correctamente.'
                f'</div>'
            )
            response['HX-Trigger'] = json.dumps({
                'socioChanged': None,
                'showToast': {'message': f'Socio {socio.nombre} creado', 'type': 'success'}
            })
            # Recargar lista después de crear
            response['HX-Retarget'] = '#modal-container'
            response['HX-Reswap'] = 'innerHTML'
            # Tras 1s, recargar la tabla
            response['HX-Trigger-After-Settle'] = json.dumps({
                'reloadTable': {'url': reverse('socio_list')}
            })
            return response
        else:
            # Errores de validación - devolver formulario con errores
            return render(request, 'socios/partials/_socio_form.html', {
                'form': form,
                'action_url': reverse('socio_create')
            }, status=422)  # 422 Unprocessable Entity
    else:
        form = SocioForm()
        return render(request, 'socios/partials/_socio_form_modal.html', {
            'form': form,
            'action_url': reverse('socio_create'),
            'title': 'Nuevo Socio'
        })
```

#### A.3.2. Formulario en modal (`templates/socios/partials/_socio_form_modal.html`)

```html
<!-- Modal completo con formulario -->
<div class="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 overflow-hidden" 
     hx-on::keydown="if (event.key === 'Escape') document.getElementById('modal-container').classList.add('hidden')">
    
    <div class="bg-gray-50 px-6 py-4 border-b flex justify-between items-center">
        <h3 class="text-lg font-semibold text-gray-800">{{ title }}</h3>
        <button onclick="document.getElementById('modal-container').classList.add('hidden')" 
                class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
        </button>
    </div>
    
    <form hx-post="{{ action_url }}" 
          hx-target="#form-container"
          hx-swap="innerHTML"
          class="p-6">
        
        <div id="form-container">
            {% include 'socios/partials/_socio_form.html' %}
        </div>
        
        <div class="mt-6 flex justify-end space-x-3">
            <button type="button" 
                    onclick="document.getElementById('modal-container').classList.add('hidden')"
                    class="px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-50">
                Cancelar
            </button>
            <button type="submit" 
                    class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center">
                <span>Guardar Socio</span>
                <span class="htmx-indicator ml-2">
                    <svg class="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    </svg>
                </span>
            </button>
        </div>
    </form>
</div>
```

#### A.3.3. Campos del formulario con validación inline (`templates/socios/partials/_socio_form.html`)

```html
{% load widget_tweaks %}

<div class="space-y-4">
    <!-- DNI con validación en blur -->
    <div>
        <label class="block text-sm font-medium text-gray-700">DNI/NIE *</label>
        <input type="text" 
               name="dni" 
               value="{{ form.dni.value|default:'' }}"
               hx-post="{% url 'validar_dni' %}"
               hx-trigger="blur"
               hx-target="#dni-error"
               hx-swap="innerHTML"
               class="mt-1 block w-full rounded-md border-gray-300 shadow-sm {% if form.dni.errors %}border-red-500{% endif %}"
               placeholder="12345678A">
        <div id="dni-error" class="text-sm text-red-600 mt-1">
            {% if form.dni.errors %}{{ form.dni.errors.0 }}{% endif %}
        </div>
    </div>
    
    <div class="grid grid-cols-2 gap-4">
        <div>
            <label class="block text-sm font-medium text-gray-700">Nombre *</label>
            {{ form.nombre|add_class:"mt-1 block w-full rounded-md border-gray-300 shadow-sm" }}
            {% if form.nombre.errors %}
                <p class="text-sm text-red-600 mt-1">{{ form.nombre.errors.0 }}</p>
            {% endif %}
        </div>
        <div>
            <label class="block text-sm font-medium text-gray-700">Apellidos *</label>
            {{ form.apellidos|add_class:"mt-1 block w-full rounded-md border-gray-300 shadow-sm" }}
        </div>
    </div>
    
    <!-- Email con validación de unicidad -->
    <div>
        <label class="block text-sm font-medium text-gray-700">Email</label>
        <input type="email" 
               name="email"
               value="{{ form.email.value|default:'' }}"
               hx-post="{% url 'check_email' %}"
               hx-trigger="change delay:500ms"
               hx-target="#email-status"
               class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
        <div id="email-status" class="text-sm mt-1"></div>
    </div>
    
    <!-- Checkbox menor de edad con toggle condicional -->
    <div class="flex items-center">
        <input type="checkbox" 
               name="es_menor" 
               id="id_es_menor"
               hx-get="{% url 'toggle_tutor_fields' %}"
               hx-target="#tutor-fields"
               hx-trigger="change"
               hx-swap="innerHTML"
               {% if form.es_menor.value %}checked{% endif %}
               class="rounded border-gray-300 text-blue-600 shadow-sm">
        <label for="id_es_menor" class="ml-2 text-sm text-gray-700">Es menor de edad</label>
    </div>
    
    <!-- Campos de tutor (cargados condicionalmente) -->
    <div id="tutor-fields" class="border-l-4 border-orange-300 pl-4 bg-orange-50 p-4 rounded">
        {% if form.es_menor.value %}
            {% include 'socios/partials/_tutor_fields.html' with form=form %}
        {% else %}
            <p class="text-sm text-gray-500">Marca la casilla si el socio es menor de edad.</p>
        {% endif %}
    </div>
    
    <!-- Errores generales -->
    {% if form.non_field_errors %}
    <div class="p-4 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
        {{ form.non_field_errors }}
    </div>
    {% endif %}
</div>
```

---

### A.4. Edición inline en la tabla (inline editing)

Permite editar un socio directamente en la fila de la tabla sin ir a otra página.

#### A.4.1. Vista de edición de fila

```python
def socio_edit_row(request, pk):
    """Devuelve la fila de la tabla en modo edición o guarda cambios"""
    socio = get_object_or_404(Socio, pk=pk)
    
    if request.method == 'POST':
        form = SocioQuickForm(request.POST, instance=socio)
        if form.is_valid():
            form.save()
            # Devolver fila en modo lectura
            return render(request, 'socios/partials/_fila_socio.html', {
                'socio': socio
            })
        # Si hay errores, devolver formulario con errores
        return render(request, 'socios/partials/_fila_socio_edit.html', {
            'form': form,
            'socio': socio
        }, status=422)
    
    # GET: Mostrar formulario de edición
    form = SocioQuickForm(instance=socio)
    return render(request, 'socios/partials/_fila_socio_edit.html', {
        'form': form,
        'socio': socio
    })
```

#### A.4.2. Fila en modo edición (`templates/socios/partials/_fila_socio_edit.html`)

```html
<tr class="bg-blue-50">
    <td class="px-6 py-2">
        <input type="text" name="dni" value="{{ form.dni.value }}" 
               class="w-full px-2 py-1 text-sm border rounded" required>
    </td>
    <td class="px-6 py-2">
        <div class="space-y-1">
            <input type="text" name="nombre" value="{{ form.nombre.value }}" 
                   class="w-full px-2 py-1 text-sm border rounded" placeholder="Nombre">
            <input type="text" name="apellidos" value="{{ form.apellidos.value }}" 
                   class="w-full px-2 py-1 text-sm border rounded" placeholder="Apellidos">
        </div>
    </td>
    <td class="px-6 py-2">
        <input type="email" name="email" value="{{ form.email.value|default:'' }}" 
               class="w-full px-2 py-1 text-sm border rounded">
    </td>
    <td class="px-6 py-2">
        <select name="activo" class="px-2 py-1 text-sm border rounded">
            <option value="True" {% if form.activo.value %}selected{% endif %}>Activo</option>
            <option value="False" {% if not form.activo.value %}selected{% endif %}>Inactivo</option>
        </select>
    </td>
    <td class="px-6 py-2 space-x-2">
        <button hx-post="{% url 'socio_edit_row' socio.pk %}" 
                hx-include="closest tr"
                hx-target="closest tr"
                hx-swap="outerHTML"
                class="text-green-600 hover:text-green-800 text-sm font-medium">
            ✓ Guardar
        </button>
        <button hx-get="{% url 'socio_row' socio.pk %}" 
                hx-target="closest tr"
                hx-swap="outerHTML"
                class="text-gray-600 hover:text-gray-800 text-sm">
            Cancelar
        </button>
    </td>
</tr>
```

---

### A.5. Gestión de pagos con actualización parcial

#### A.5.1. Lista de pagos con infinite scroll

```html
<!-- templates/pagos/_lista_pagos.html -->
<div id="pagos-container" class="space-y-2">
    {% for pago in pagos %}
    <div class="flex justify-between items-center p-3 bg-white border rounded hover:shadow transition-shadow">
        <div>
            <div class="font-medium">{{ pago.mes }}/{{ pago.anio }}</div>
            <div class="text-sm text-gray-500">{{ pago.get_tipo_display }}</div>
        </div>
        <div class="flex items-center space-x-3">
            <span class="px-2 py-1 rounded text-sm font-medium
                {% if pago.estado == 'COMPLETADO' %}bg-green-100 text-green-800
                {% elif pago.estado == 'PENDIENTE' %}bg-yellow-100 text-yellow-800
                {% else %}bg-red-100 text-red-800{% endif %}">
                {{ pago.get_estado_display }}
            </span>
            
            <!-- Cambio de estado vía dropdown HTMX -->
            <select name="estado" 
                    hx-patch="{% url 'pago_update' pago.pk %}"
                    hx-target="closest div"
                    hx-swap="outerHTML"
                    class="text-sm border rounded px-2 py-1">
                {% for codigo, nombre in pago.ESTADOS %}
                <option value="{{ codigo }}" {% if pago.estado == codigo %}selected{% endif %}>
                    Cambiar a: {{ nombre }}
                </option>
                {% endfor %}
            </select>
        </div>
    </div>
    {% endfor %}
</div>

<!-- Trigger para infinite scroll -->
{% if has_more %}
<div hx-get="{% url 'pagos_load_more' %}?page={{ next_page }}" 
     hx-trigger="revealed"
     hx-target="this"
     hx-swap="outerHTML"
     class="p-4 text-center text-gray-500">
    Cargando más...
</div>
{% endif %}
```

---

### A.6. URLs y configuración completa

```python
# socios/urls.py
from django.urls import path
from . import views

urlpatterns = [
    # Vistas tradicionales + HTMX
    path('', views.socio_list, name='socio_list'),
    path('<uuid:pk>/', views.socio_detail, name='socio_detail'),
    path('crear/', views.socio_create, name='socio_create'),
    path('<uuid:pk>/editar/', views.socio_update, name='socio_update'),
    path('<uuid:pk>/eliminar/', views.socio_delete, name='socio_delete'),
    
    # Endpoints HTMX específicos
    path('<uuid:pk>/fila/', views.socio_row, name='socio_row'),
    path('<uuid:pk>/fila/editar/', views.socio_edit_row, name='socio_edit_row'),
    path('validar-dni/', views.validar_dni, name='validar_dni'),
    path('check-email/', views.check_email, name='check_email'),
    path('toggle-tutor/', views.toggle_tutor_fields, name='toggle_tutor_fields'),
    path('stats/', views.stats_socios, name='stats_socios'),
]
```

---

### A.7. Patrones avanzados y mejores prácticas

#### A.7.1. Indicadores de carga globales

```javascript
// En base.html - Manejo global de eventos HTMX
document.body.addEventListener('htmx:beforeRequest', function(evt) {
    // Mostrar spinner global si la petición tarda > 200ms
    window.loadingTimeout = setTimeout(() => {
        document.getElementById('global-spinner').classList.remove('hidden');
    }, 200);
});

document.body.addEventListener('htmx:afterRequest', function(evt) {
    clearTimeout(window.loadingTimeout);
    document.getElementById('global-spinner').classList.add('hidden');
    
    // Manejar errores
    if (evt.detail.failed) {
        showToast('Error en la operación', 'error');
    }
});

// Sistema de toast notifications
document.body.addEventListener('showToast', function(evt) {
    const { message, type = 'info' } = evt.detail;
    showToast(message, type);
});

function showToast(message, type) {
    const toast = document.createElement('div');
    toast.className = `p-4 rounded shadow-lg transform transition-all duration-300 translate-y-10 opacity-0 ${
        type === 'error' ? 'bg-red-500' : 'bg-green-500'
    } text-white`;
    toast.textContent = message;
    
    document.getElementById('toast-container').appendChild(toast);
    
    // Animación de entrada
    setTimeout(() => {
        toast.classList.remove('translate-y-10', 'opacity-0');
    }, 10);
    
    // Auto-remove
    setTimeout(() => {
        toast.classList.add('opacity-0', 'translate-y-10');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}
```

#### A.7.2. Testing de vistas HTMX

```python
# tests/test_htmx.py
from django.test import TestCase, Client
from django.urls import reverse
from socios.models import Socio

class HTMXViewsTest(TestCase):
    def setUp(self):
        self.client = Client()
        self.socio = Socio.objects.create(
            dni='12345678A',
            nombre='Ana',
            apellidos='García',
            email='ana@example.com'
        )
    
    def test_lista_socios_htmx(self):
        """Test que la vista devuelve partial cuando HTMX-Request está presente"""
        response = self.client.get(
            reverse('socio_list'),
            HTTP_HX_REQUEST='true'
        )
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'socios/partials/_tabla_socios.html')
        self.assertNotContains(response, '<html>')  # No es página completa
    
    def test_busqueda_dinamica(self):
        """Test de búsqueda vía HTMX"""
        response = self.client.get(
            reverse('socio_list'),
            {'q': 'Ana'},
            HTTP_HX_REQUEST='true'
        )
        self.assertContains(response, 'Ana')
        self.assertNotContains(response, 'No se encontraron')
    
    def test_eliminacion_htmx(self):
        """Test de eliminación con confirmación"""
        response = self.client.delete(
            reverse('socio_delete', args=[self.socio.pk]),
            HTTP_HX_REQUEST='true'
        )
        self.assertEqual(response.status_code, 200)
        self.assertFalse(Socio.objects.filter(pk=self.socio.pk).exists())
```

### A.8. Resumen de atributos HTMX utilizados

| Atributo | Uso en MyONG | Ejemplo |
|----------|-------------|---------|
| `hx-get` | Cargar listado, ver detalle | `hx-get="{% url 'socio_list' %}"` |
| `hx-post` | Crear socio, validar campo | `hx-post="{% url 'validar_dni' %}"` |
| `hx-delete` | Eliminar socio | `hx-delete="{% url 'socio_delete' pk %}"` |
| `hx-patch` | Actualizar estado pago | `hx-patch="{% url 'pago_update' pk %}"` |
| `hx-target` | Dónde colocar respuesta | `hx-target="#tabla-container"` |
| `hx-swap` | Cómo insertar (innerHTML, outerHTML) | `hx-swap="outerHTML swap:1s"` |
| `hx-trigger` | Evento que dispara (load, click, keyup) | `hx-trigger="keyup changed delay:300ms"` |
| `hx-indicator` | Elemento de carga | `hx-indicator="#spinner"` |
| `hx-confirm` | Diálogo de confirmación | `hx-confirm="¿Eliminar?"` |
| `hx-include` | Incluir valores adicionales | `hx-include="closest tr"` |
| `hx-headers` | Headers custom (CSRF) | Automático con django-htmx |
