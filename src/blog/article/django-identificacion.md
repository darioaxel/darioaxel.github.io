---
title: "Identificación de Elementos de Modelo en Django"
date: 2025-11-26
category: [Blog]
tag: [Django, ORM]
type: article
---

# Identificación de Elementos de Modelo en Django: IDs en URL vs. Hardcoded

Cuando desarrollamos aplicaciones web con Django, una de las tareas más comunes es identificar registros específicos de nuestra base de datos dentro de las vistas. Existen múltiples estrategias para lograrlo, cada una con implicaciones diferentes en términos de seguridad, mantenibilidad y experiencia de usuario. Exploremos las diversas fórmulas disponibles.

## **1. El Clásico: IDs en la URL (Parámetros de Ruta)**

La forma más común y directa de identificar un elemento es pasando su ID directamente en la URL. Django hace esto excepcionalmente sencillo mediante captura de parámetros.

### **Implementación Básica**

```python
# urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('producto/<int:producto_id>/', views.detalle_producto, name='detalle_producto'),
]

# views.py
from django.shortcuts import get_object_or_404
from .models import Producto

def detalle_producto(request, producto_id):
    producto = get_object_or_404(Producto, id=producto_id)
    return render(request, 'productos/detalle.html', {'producto': producto})
```

**Ventajas:**
- Simple e intuitivo
- URLs limpias y RESTful
- Integración nativa con Django
- Fácil de depurar

**Desventajas:**
- Expone el tamaño de tu base de datos
- Vulnerable a enumeración si no hay control de acceso
- No es amigable con SEO si no se combina con slugs

### **Usando expresiones regulares para más control**

```python
# urls.py
from django.urls import re_path

urlpatterns = [
    re_path(r'^producto/(?P<producto_id>\d+)/$', views.detalle_producto, name='detalle_producto'),
]
```

## **2. Identificación mediante Slug (Amigable con SEO)**

Para aplicaciones donde las URLs legibles son importantes, usar slugs es la mejor práctica.
::: note **¿Sabes lo que es un *slug*?**
Un **slug** es una versión "limpia" y amigable para URLs de una cadena de texto. Transforma títulos o nombres en segmentos de URL legibles, eliminando caracteres especiales, acentos, espacios y convirtiendo todo a minúsculas.

**Características Principales**

- **Legible**: `iphone-13-pro-max` en lugar de `id=12345`
- **URL-safe**: Solo usa caracteres alfanuméricos, guiones (`-`) y guiones bajos (`_`)
- **SEO-friendly**: Contiene palabras clave relevantes para motores de búsqueda
- **Estático**: Una vez generado, normalmente no cambia

**Ejemplos de Conversión**

| Texto Original | Slug Generado |
|----------------|---------------|
| "¡Hola Mundo!" | `hola-mundo` |
| "Artículo de Python & Django" | `articulo-de-python-django` |
| "Café con leche. Precio: $5" | `cafe-con-leche-precio-5` |
| "Preguntas frecuentes (FAQ)" | `preguntas-frecuentes-faq` |
:::

```python
# models.py
from django.db import models

class Producto(models.Model):
    nombre = models.CharField(max_length=200)
    slug = models.SlugField(max_length=200, unique=True)
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.nombre)
        super().save(*args, **kwargs)

# urls.py
path('producto/<slug:slug>/', views.detalle_producto_slug, name='detalle_producto_slug')

# views.py
def detalle_producto_slug(request, slug):
    producto = get_object_or_404(Producto, slug=slug)
    return render(request, 'productos/detalle.html', {'producto': producto})
```

**Ventajas:**
- URLs semánticas (`/producto/iphone-13-pro/`)
- Mejora el SEO
- No expone IDs internos

**Desventajas:**
- Requiere gestión de duplicados
- Necesita generación automática del slug
- Puede haber problemas con caracteres especiales

### **Patrón Combinado: ID + Slug**

```python
# urls.py
path('producto/<int:producto_id>-<slug:slug>/', views.detalle_producto_completo, name='detalle_producto_completo')

# views.py
def detalle_producto_completo(request, producto_id, slug):
    producto = get_object_or_404(Producto, id=producto_id, slug=slug)
    return render(request, 'productos/detalle.html', {'producto': producto})
```

Esta combinación ofrece la mejor de ambos mundos: URLs SEO-friendly con identificación única mediante ID.

## **3. Identificación Hardcoded (Códigos Fijos)**

A veces necesitamos identificar elementos especiales que siempre existen, como configuraciones del sistema o registros de referencia.

### **Opción A: Constantes en el Modelo**

```python
# models.py
class ConfiguracionSistema(models.Model):
    CLAVES_PREDETERMINADAS = {
        'MANTENIMIENTO': 1,
        'DEFAULT_USER': 2,
        'CONFIG_EMAIL': 3,
    }
    
    clave = models.CharField(max_length=50, unique=True)
    valor = models.TextField()

# views.py
from django.shortcuts import get_object_or_404
from .models import ConfiguracionSistema

def modo_mantenimiento(request):
    config_id = ConfiguracionSistema.CLAVES_PREDETERMINADAS['MANTENIMIENTO']
    mantenimiento = get_object_or_404(ConfiguracionSistema, id=config_id)
    return render(request, 'configuracion/mantenimiento.html', {'activo': mantenimiento.valor == 'true'})
```

**Ventajas:**
- Código auto-documentado
- Evita búsquedas por strings mágicos
- Útil para configuraciones estáticas

**Desventajas:**
- Rompe si los IDs cambian en la base de datos
- Difícil de mantener en migraciones
- No es portable entre entornos

### **Opción B: Usando Fixtures y Fixtures de Datos Iniciales**

```python
# fixtures/configuracion_inicial.json
[
  {
    "model": "app.configuracionsistema",
    "pk": 1,
    "fields": {
      "clave": "MANTENIMIENTO",
      "valor": "false"
    }
  }
]

# settings.py
FIXTURE_DIRS = ['fixtures/']

# Uso en views
from django.core.cache import cache

def get_config_cacheada(clave):
    # Usamos caché para evitar hardcoding de IDs
    return cache.get_or_set(f'config_{clave}', 
                           lambda: ConfiguracionSistema.objects.get(clave=clave))
```

## **4. Métodos Alternativos Avanzados**

### **Usando UUIDs para Obfuscar IDs**

```python
# models.py
import uuid
from django.db import models

class Orden(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    numero = models.CharField(max_length=50)

# urls.py
path('orden/<uuid:orden_id>/', views.detalle_orden, name='detalle_orden')

# views.py
def detalle_orden(request, orden_id):
    orden = get_object_or_404(Orden, id=orden_id)
    return render(request, 'ordenes/detalle.html', {'orden': orden})
```

### **Token Seguros para Acceso Temporal**

```python
# models.py
from django.db import models
import secrets

class TokenAcceso(models.Model):
    token = models.CharField(max_length=64, unique=True, default=secrets.token_urlsafe)
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE)
    expira_en = models.DateTimeField()

# urls.py
path('acceso-temporal/<str:token>/', views.acceso_privado, name='acceso_privado')

# views.py
from django.utils import timezone

def acceso_privado(request, token):
    token_obj = get_object_or_404(TokenAcceso, token=token, expira_en__gt=timezone.now())
    return render(request, 'productos/detalle_privado.html', {'producto': token_obj.producto})
```

## **5. Comparativa y Mejores Prácticas**

| Método | Seguridad | SEO | Mantenibilidad | Uso Recomendado |
|--------|-----------|-----|----------------|-----------------|
| ID numérico en URL | ⚠️ Baja (enumeración) | ❌ Pobre | ✅ Alta | APIs internas, admin |
| Slug único | ✅ Media | ✅ Excelente | ⚠️ Media | Blogs, productos públicos |
| ID + Slug | ✅ Alta | ✅ Excelente | ✅ Alta | Aplicaciones modernas |
| Hardcoded IDs | ❌ Muy baja | N/A | ❌ Baja | Solo configuración fija |
| UUID | ✅ Alta | ⚠️ Media | ✅ Alta | Sistemas distribuidos |
| Token temporal | ✅ Excelente | ❌ N/A | ⚠️ Media | Enlaces privados |

### **Recomendaciones por Escenario**

**Para contenido público (blogs, tiendas):**
```python
# Usa siempre slug o ID+slug
path('articulo/<int:year>/<int:month>/<slug:slug>-<int:pk>/', ...)
```

**Para APIs REST:**
```python
# Usa IDs numéricos pero con autenticación
path('api/v1/productos/<int:pk>/', ...)
```

**Para configuraciones del sistema:**
```python
 # Usa clave única en lugar de ID hardcoded
config = get_object_or_404(Configuracion, clave='MANTENIMIENTO')
```

**Para datos sensibles:**
```python
# Usa UUID o tokens
path('documento/<uuid:doc_id>/', ...)
```

## **6. Consideraciones de Seguridad Críticas**

### **Protección contra BFO (Broken Function Level Object)**

```python
# views.py - NUNCA hagas esto
def ver_pedido(request, pedido_id):
    # ❌ INSEGURO: Cualquier usuario puede ver cualquier pedido
    pedido = get_object_or_404(Pedido, id=pedido_id)
    return render(...)

# ✅ SEGURO: Verificar propiedad
def ver_pedido_securizado(request, pedido_id):
    pedido = get_object_or_404(Pedido, id=pedido_id, usuario=request.user)
    return render(request, 'pedidos/detalle.html', {'pedido': pedido})
```

### **Decorador Reutilizable**

```python
# decorators.py
from django.shortcuts import get_object_or_404
from functools import wraps

def user_owns_model(model_class, user_field='usuario', pk_param='pk'):
    def decorator(view_func):
        @wraps(view_func)
        def _wrapped_view(request, *args, **kwargs):
            pk = kwargs.get(pk_param)
            obj = get_object_or_404(model_class, pk=pk, **{user_field: request.user})
            kwargs['obj'] = obj  # Pasamos el objeto a la vista
            return view_func(request, *args, **kwargs)
        return _wrapped_view
    return decorator

# Uso en views
from .decorators import user_owns_model

@user_owns_model(Pedido)
def ver_mi_pedido(request, obj, **kwargs):
    # 'obj' ya es el pedido del usuario actual
    return render(request, 'pedidos/detalle.html', {'pedido': obj})
```

## **Conclusión**

La elección del método de identificación depende de tus necesidades específicas:

- **Para casi todos los casos públicos**: Usa el patrón `ID-slug` (`/producto/123-nombre-amigable/`)
- **Para APIs internas**: IDs numéricos con autenticación robusta
- **Para datos sensibles**: UUIDs o tokens temporales
- **Para configuraciones**: Sistema de claves únicas, NUNCA IDs hardcoded
- **Siempre**: Implementa controles de acceso adecuados

El hardcoding de IDs debe evitarse completamente excepto en fixtures de datos iniciales con claves foráneas. La flexibilidad y seguridad de Django nos permite construir sistemas robustos sin sacrificar la mantenibilidad del código.