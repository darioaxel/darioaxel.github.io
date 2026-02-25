title: Anexo VI. Django REST Framework
date: 2026-02-25
icon: code-branch
order: -10
---

# 🔌 Anexo VI: Django REST Framework (DRF)

## 1. Introducción a las APIs REST en Django

Cuando desarrollamos aplicaciones web modernas, frecuentemente necesitamos que nuestro backend no solo sirva páginas HTML, sino que también proporcione datos a otras aplicaciones: aplicaciones móviles, SPAs (Single Page Applications), o incluso otros servicios backend. 

La solución son las **APIs REST** (Representational State Transfer): una arquitectura que permite la comunicación entre sistemas mediante peticiones HTTP utilizando formatos estándar como JSON.

**Django REST Framework (DRF)** es una librería que convierte proyectos Django en potentes APIs REST de forma rápida y con muy poco código, manteniendo la filosofía "batteries included" de Django.

### 1.1. Instalación de Django REST Framework

Al igual que con otras dependencias Python, utilizaremos **Poetry** para gestionar la instalación:

```bash
poetry add djangorestframework
```

Esto añadirá automáticamente la dependencia a tu `pyproject.toml` y actualizará el archivo `poetry.lock` con las versiones exactas.

Una vez instalado, debes registrar la aplicación en tu proyecto. Abre el archivo `settings.py` y añade `'rest_framework'` a la lista `INSTALLED_APPS`:

```python
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',  # Añade esta línea
    'socios',
]
```

### 1.2. Configuración básica de DRF

DRF permite personalizar su comportamiento mediante un diccionario de configuración en `settings.py`. Para un entorno de desarrollo sin autenticación (el enfoque más sencillo), añade lo siguiente:

```python
REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.AllowAny',  # Sin autenticación
    ],
    'DEFAULT_RENDERER_CLASSES': [
        'rest_framework.renderers.JSONRenderer',
    ],
}
```

> **Nota**: En producción siempre deberías implementar autenticación. DRF soporta tokens, JWT, OAuth2 y sesiones de Django.

## 2. Serializadores: El puente entre modelos y JSON

Los **serializadores** son clases de DRF que determinan cómo se convierten los modelos Django a formatos como JSON (y viceversa). Actúan de forma similar a los formularios Django, pero para APIs.

### 2.1. Creación del archivo de serializadores

En tu aplicación `socios`, crea un archivo nuevo llamado `serializers.py`:

```python
from rest_framework import serializers
from .models import Socio, Direccion, Tutor, Pago

class DireccionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Direccion
        fields = '__all__'

class TutorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tutor
        fields = '__all__'

class PagoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pago
        fields = '__all__'

class SocioSerializer(serializers.ModelSerializer):
    """Serializer para lectura: incluye relaciones anidadas"""
    direccion = DireccionSerializer(read_only=True)
    tutor_legal = TutorSerializer(many=True, read_only=True)
    
    class Meta:
        model = Socio
        fields = '__all__'

class SocioCreateSerializer(serializers.ModelSerializer):
    """Serializer para escritura: permite crear socio con dirección"""
    direccion = DireccionSerializer()
    
    class Meta:
        model = Socio
        exclude = ['fecha_alta']  # Campo automático
    
    def create(self, validated_data):
        direccion_data = validated_data.pop('direccion')
        direccion = Direccion.objects.create(**direccion_data)
        return Socio.objects.create(direccion=direccion, **validated_data)
```

El `Meta` interno especifica:
- `model`: El modelo Django asociado
- `fields`: Qué campos incluir (`'__all__'` para todos, o lista específica)
- `exclude`: Campos a omitir (alternativa a `fields`)

## 3. ViewSets: Vistas automatizadas para CRUD

DRF introduce el concepto de **ViewSet**: una clase que agrupa la lógica de listar, crear, recuperar, actualizar y eliminar objetos en un único lugar.

### 3.1. Creación de ViewSets

Crea un archivo `api_views.py` en tu aplicación `socios`:

```python
from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from datetime import date

from .models import Socio, Pago
from .serializers import SocioSerializer, SocioCreateSerializer, PagoSerializer

class SocioViewSet(viewsets.ModelViewSet):
    """
    Proporciona operaciones CRUD completas para el modelo Socio.
    Hereda de ModelViewSet que incluye: list, create, retrieve, update, destroy
    """
    queryset = Socio.objects.select_related('direccion').prefetch_related('tutor_legal')
    
    def get_serializer_class(self):
        """Usa diferente serializer según la acción"""
        if self.action in ['create', 'update', 'partial_update']:
            return SocioCreateSerializer
        return SocioSerializer

class PagoViewSet(viewsets.ReadOnlyModelViewSet):
    """
    ViewSet de solo lectura para consultar pagos.
    Soporta filtrado por socio y año mediante query params.
    """
    serializer_class = PagoSerializer
    
    def get_queryset(self):
        queryset = Pago.objects.select_related('socio')
        
        # Filtrado opcional por parámetros URL
        socio_id = self.request.query_params.get('socio')
        year = self.request.query_params.get('year', date.today().year)
        
        if socio_id:
            queryset = queryset.filter(socio__id=socio_id)
        
        return queryset.filter(anio=year)

# Endpoint funcional adicional (alternativa a acciones de ViewSet)
@api_view(['GET'])
def pagos_por_socio(request, socio_id):
    """
    Endpoint personalizado para obtener pagos de un socio específico.
    Accesible en: /api/socios/<uuid>/pagos/
    """
    year = request.query_params.get('year', date.today().year)
    pagos = Pago.objects.filter(socio__id=socio_id, anio=year).order_by('mes')
    
    return Response({
        'socio_id': str(socio_id),
        'year': year,
        'pagos': PagoSerializer(pagos, many=True).data,
        'total_meses': pagos.count(),
        'total_pagado': sum(p.monto for p in pagos if p.pagado),
    })
```

### 3.2. Diferencias entre tipos de ViewSets

| Clase Base | Operaciones incluidas | Uso típico |
|------------|----------------------|------------|
| `ViewSet` | Ninguna (manual) | Control total |
| `GenericViewSet` | Mixins opcionales | Personalización selectiva |
| `ModelViewSet` | CRUD completo | Recursos estándar |
| `ReadOnlyModelViewSet` | Solo list + retrieve | Datos de consulta |

## 4. Enrutamiento de URLs

DRF proporciona un **router** que genera automáticamente las URLs necesarias para los ViewSets.

### 4.1. Configuración de URLs de la API

Crea `urls_api.py` en tu aplicación `socios`:

```python
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .api_views import SocioViewSet, PagoViewSet, pagos_por_socio

# Crea el router y registra los ViewSets
router = DefaultRouter()
router.register(r'socios', SocioViewSet)      # Genera /api/socios/
router.register(r'pagos', PagoViewSet, basename='pago')  # Genera /api/pagos/

# Las URLs generadas incluyen:
# /socios/          -> list (GET), create (POST)
# /socios/{id}/     -> retrieve (GET), update (PUT/PATCH), destroy (DELETE)

urlpatterns = [
    path('', include(router.urls)),
    # Endpoint personalizado para pagos por socio
    path('socios/<uuid:socio_id>/pagos/', pagos_por_socio, name='api_pagos_socio'),
]
```

### 4.2. Integración en URLs principales

Modifica el archivo `urls.py` de tu proyecto principal para incluir la API:

```python
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('socios/', include('socios.urls')),      # Tu interfaz web existente
    path('api/', include('socios.urls_api')),      # Nueva API REST
]
```

::: note
Mantener separadas las URLs web (`/socios/`) de la API (`/api/`) permite que ambas interfaces coexistan. Tu aplicación web actual sigue funcionando mientras desarrollas la API.
:::

## 5. Endpoints disponibles y ejemplos de uso

Tras la configuración anterior, estos endpoints estarán disponibles:

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/socios/` | Listar todos los socios |
| POST | `/api/socios/` | Crear nuevo socio |
| GET | `/api/socios/{uuid}/` | Ver detalle completo |
| PUT | `/api/socios/{uuid}/` | Actualizar socio completo |
| PATCH | `/api/socios/{uuid}/` | Actualización parcial |
| DELETE | `/api/socios/{uuid}/` | Eliminar socio |
| GET | `/api/socios/{uuid}/pagos/?year=2024` | Pagos del socio |
| GET | `/api/pagos/?socio={uuid}&year=2024` | Filtrar pagos |

### 5.1. Ejemplos de peticiones con cURL

**Listar socios:**
```bash
curl http://localhost:8000/api/socios/
```

**Crear socio con dirección:**
```bash
curl -X POST http://localhost:8000/api/socios/ \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Ana",
    "apellidos": "García López",
    "email": "ana@example.com",
    "documento_identidad": "12345678A",
    "telefono": "600123456",
    "menor_edad": false,
    "direccion": {
      "calle": "Calle Mayor",
      "numero": "10",
      "ciudad": "Valdepeñas",
      "codigo_postal": "13300",
      "provincia": "Ciudad Real",
      "pais": "España"
    }
  }'
```

**Actualizar email de socio:**
```bash
curl -X PATCH http://localhost:8000/api/socios/{uuid}/ \
  -H "Content-Type: application/json" \
  -d '{"email": "nuevo@example.com"}'
```

**Consultar pagos de 2024:**
```bash
curl "http://localhost:8000/api/pagos/?year=2024"
```

## 6. Buenas prácticas y próximos pasos

### 6.1. Optimización de consultas

Siempre usa `select_related()` para relaciones ForeignKey y `prefetch_related()` para ManyToMany o reverse ForeignKeys en tu `queryset`. Esto evita el problema de consultas N+1:

```python
# En tu ViewSet
queryset = Socio.objects.select_related('direccion').prefetch_related('tutor_legal', 'pagos')
```

### 6.2. Validación de datos

Los serializadores permiten validación personalizada mediante métodos `validate_<campo>` o `validate`:

```python
class SocioCreateSerializer(serializers.ModelSerializer):
    # ... campos ...
    
    def validate_documento_identidad(self, value):
        """Valida formato del DNI/NIE"""
        if not validar_dni(value):
            raise serializers.ValidationError("Documento no válido")
        return value.upper()
```

### 6.3. Documentación automática

Para documentación interactiva de tu API, instala:

```bash
poetry add drf-spectacular
```

Y añade a `settings.py`:
```python
INSTALLED_APPS += ['drf_spectacular']

REST_FRAMEWORK['DEFAULT_SCHEMA_CLASS'] = 'drf_spectacular.openapi.AutoSchema'
```

Esto genera automáticamente documentación OpenAPI/Swagger accesible en `/api/schema/swagger-ui/`.

### 6.4. Cuándo añadir autenticación

Aunque hemos omitido la autenticación para simplificar, en producción deberías implementarla cuando:
- La API expone datos sensibles
- Permite operaciones de escritura (POST, PUT, DELETE)
- Se consume desde aplicaciones móviles o terceros

DRF facilita la transición: solo cambia `AllowAny` por `IsAuthenticated` o `IsAdminUser` en los permisos.

::: note
**Resumen del flujo de trabajo con DRF:**
1. Define tus modelos Django (ya lo tienes)
2. Crea serializadores que mapeen modelos ↔ JSON
3. Implementa ViewSets con la lógica de negocio
4. Registra rutas en el router
5. ¡Tu API está lista para consumir!
:::

Consulta la [documentación oficial de DRF](https://www.django-rest-framework.org/) para funcionalidades avanzadas como paginación, throttling, filtros complejos y autenticación.