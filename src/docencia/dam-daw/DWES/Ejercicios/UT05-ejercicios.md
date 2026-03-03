---
title: Ejercicios UT05. Servicios Web - REST
icon: pen
---
# Ejercicios UT04. Persistencia de datos

## EJERCICIO 1: Consumo de un API público

### **Paso 1: Abrir la consola**
1. Abre cualquier página web (puede ser Google en blanco)
2. Pulsa `F12` → Pestaña **Console**
3. Copia y pega estos comandos uno por uno:


### **Paso 2: Obtener todos los personajes (paginado)**

```javascript
// Petición básica a la API
fetch('https://rickandmortyapi.com/api/character')
  .then(res => res.json())
  .then(data => {
    console.log('Total de personajes:', data.info.count);
    console.log('Primer personaje:', data.results[0].name);
    console.table(data.results.map(p => ({ id: p.id, nombre: p.name, especie: p.species })));
  })
  .catch(err => console.error('Error:', err));
```

**Qué verás:** Una tabla con ID, nombre y especie de los primeros 20 personajes.


### **Paso 3: Buscar un personaje específico por ID**

```javascript
// Obtener solo a Rick Sanchez (ID: 1)
fetch('https://rickandmortyapi.com/api/character/1')
  .then(res => res.json())
  .then(rick => {
    console.log('Nombre:', rick.name);
    console.log('Origen:', rick.origin.name);
    console.log('Imagen:', rick.image);
    // Mostrar la imagen en el documento (bonus visual)
    document.body.innerHTML += `<img src="${rick.image}" style="position:fixed;top:10px;right:10px;border-radius:50%;width:100px;">`;
  });
```


### **Paso 4: Filtrar por nombre (búsqueda)**

```javascript
// Buscar personajes que contengan "morty" en el nombre
fetch('https://rickandmortyapi.com/api/character/?name=morty')
  .then(res => res.json())
  .then(data => {
    console.log(`Encontrados: ${data.results.length} Mortys`);
    data.results.forEach(p => console.log(`- ${p.name} (${p.status})`));
  });
```

**Prueba a cambiar** `?name=morty` por `?name=rick` o `?species=alien`.


### **Paso 5: Navegar por páginas**

```javascript
// Función reutilizable para obtener cualquier página
const getPagina = (url) => {
  fetch(url)
    .then(r => r.json())
    .then(data => {
      console.log(`Página actual: ${url}`);
      console.log('Siguiente:', data.info.next);
      console.log('Anterior:', data.info.prev);
      console.table(data.results.map(p => p.name));
    });
};

// Usar la URL de la siguiente página
getPagina('https://rickandmortyapi.com/api/character?page=2');
```

### **Endpoints útiles para probar:**

| Recurso | URL de ejemplo |
|---------|---------------|
| **Personajes** | `https://rickandmortyapi.com/api/character` |
| **Ubicaciones** | `https://rickandmortyapi.com/api/location` |
| **Episodios** | `https://rickandmortyapi.com/api/episode` |
| **Múltiples IDs** | `https://rickandmortyapi.com/api/character/1,2,3` |
| **Filtro** | `https://rickandmortyapi.com/api/character/?status=alive&species=human` |

**Tip:** Si quieres ver la imagen de un personaje directamente, usa la URL del campo `image` de la respuesta (están hosteadas en CDN).

## EJERCICIO 2: Creación de un proyecto con FastAPI (mínimo)

**Dependencias:**
```bash
poetry add fastapi uvicorn[standard] asyncpg
```

**`main.py`** 
```python
from fastapi import FastAPI
import asyncpg
import os
from typing import List, Optional

app = FastAPI(title="Discoteca Minimalista")

# Configuración directa 
DATABASE_URL = "postgresql://usuario:password@localhost:5432/discoteca"

# Pool de conexiones global
pool = None

@app.on_event("startup")
async def startup():
    global pool
    pool = await asyncpg.create_pool(DATABASE_URL, min_size=1, max_size=10)

@app.on_event("shutdown")
async def shutdown():
    await pool.close()

@app.get("/")
async def root():
    return {"message": "API Discoteca: NIN, The Cure, Depeche Mode, Talking Heads"}

@app.get("/discos")
async def listar_discos(artista: Optional[str] = None):
    """Lista todos o filtra por artista (/discos?artista=NIN)"""
    async with pool.acquire() as conn:
        if artista:
            rows = await conn.fetch(
                "SELECT * FROM discos WHERE artista = $1 ORDER BY anio", 
                artista
            )
        else:
            rows = await conn.fetch("SELECT * FROM discos ORDER BY artista, anio")
        
        # asyncpg devuelve objetos Record, los convertimos a dict
        return [dict(row) for row in rows]

@app.get("/discos/{disco_id}")
async def obtener_disco(disco_id: int):
    async with pool.acquire() as conn:
        row = await conn.fetchrow("SELECT * FROM discos WHERE id = $1", disco_id)
        if not row:
            return {"error": "Disco no encontrado"}, 404
        return dict(row)

@app.post("/discos", status_code=201)
async def crear_disco(
    titulo: str, 
    artista: str,  # 'NIN', 'THE_CURE', 'DEPECHE_MODE', 'TALKING_HEADS'
    anio: int,
    genero: str = "industrial"
):
    async with pool.acquire() as conn:
        # $1, $2... evitan SQL Injection automáticamente
        id_nuevo = await conn.fetchval("""
            INSERT INTO discos (titulo, artista, anio, genero) 
            VALUES ($1, $2, $3, $4) 
            RETURNING id
        """, titulo, artista, anio, genero)
        
        return {"id": id_nuevo, "titulo": titulo, "artista": artista}

@app.delete("/discos/{disco_id}")
async def borrar_disco(disco_id: int):
    async with pool.acquire() as conn:
        result = await conn.execute("DELETE FROM discos WHERE id = $1", disco_id)
        # result es string tipo "DELETE 1" o "DELETE 0"
        if result == "DELETE 0":
            return {"error": "No existe"}, 404
        return {"message": f"Disco {disco_id} eliminado"}
```

**SQL para crear la tabla** 
```sql
CREATE TABLE discos (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(200) NOT NULL,
    artista VARCHAR(50) NOT NULL,  
    anio INTEGER CHECK (anio > 1970 AND anio < 2030),
    genero VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insertar datos de ejemplo manualmente (o haz un endpoint POST)
INSERT INTO discos (titulo, artista, anio, genero) VALUES 
('The Downward Spiral', 'NIN', 1994, 'industrial'),
('Disintegration', 'THE_CURE', 1989, 'post_punk'),
('Violator', 'DEPECHE_MODE', 1990, 'synth_pop'),
('Remain in Light', 'TALKING_HEADS', 1980, 'new_wave');
```

**Ejecutar:**
```bash
poetry run uvicorn main:app --reload --port 8000
```

**Probar:**
```bash
curl http://localhost:8000/discos
curl "http://localhost:8000/discos?artista=NIN"
curl -X POST "http://localhost:8000/discos?titulo=Pretty Hate Machine&artista=NIN&anio=1989&genero=industrial"
```
## EJERCICIO 3: Creación de una documentación con OpenAPI/Swagger

### 3.1: Instalación y Configuración Básica 

#### 3.1.1: Instalar dependencia

Ejecuta en tu entorno Poetry:

```bash
poetry add drf-spectacular
```

**Verificación:** Debe aparecer en tu `pyproject.toml`:
```toml
[tool.poetry.dependencies]
drf-spectacular = "^0.27.0"
```

#### 3.1.2: Registrar en aplicaciones

Abre `myong_proyect/settings.py` y añade `'drf_spectacular'` a `INSTALLED_APPS`:

```python
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    # ... tus apps ...
    'rest_framework',
    'drf_spectacular',  # <-- Añade esta línea
    'socios',
]
```

#### 3.1.3: Configurar generador de schema

En el mismo `settings.py`, añade o modifica estas secciones:

```python
REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.AllowAny',
    ],
    # Esta línea activa la generación automática
    'DEFAULT_SCHEMA_CLASS': 'drf_spectacular.openapi.AutoSchema',
}

# Nueva sección: configuración de spectacular
SPECTACULAR_SETTINGS = {
    'TITLE': 'MyOng API',
    'DESCRIPTION': 'API de gestión de socios para ONG',
    'VERSION': '1.0.0',
}
```

:::info
**Investiga un poco:** ¿Qué otras opciones existen en `SPECTACULAR_SETTINGS`? Busca en la documentación oficial de drf-spectacular.
:::


### 2: Rutas de Documentación

#### 2.1: Importar vistas de documentación

En `myong_proyect/urls.py`, añade los imports:

```python
from django.contrib import admin
from django.urls import path, include
# NUEVOS IMPORTS
from drf_spectacular.views import (
    SpectacularAPIView,      # Descarga del schema
    SpectacularSwaggerView,  # Interfaz Swagger UI
    SpectacularRedocView,    # Interfaz ReDoc
)
```

#### 2.2: Añadir URLs de documentación

Añade estas rutas al `urlpatterns`:

```python
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('socios.urls_api')),
    
    # RUTAS DE DOCUMENTACIÓN (añade aquí)
    # TODO: URL para descargar schema OpenAPI (YAML/JSON)
    # path('api/schema/', ...)
    
    # TODO: URL para interfaz Swagger UI
    # path('api/docs/', ...)
    
    # TODO: URL opcional para interfaz ReDoc
    # path('api/redoc/', ...)
]
```
:::info
**Investiga un poco:** Busca en la documentación de drf-spectacular cómo se configuran `SpectacularAPIView`, `SpectacularSwaggerView` y `SpectacularRedocView`. Presta atención al parámetro `url_name`.
:::

### 3: Verificación

#### 3.1: Ejecutar servidor

```bash
python manage.py runserver
```

#### 3.2: Comprobar endpoints

Abre en navegador y verifica que cargan sin error:

| URL | Debe mostrar |
|-----|--------------|
| `http://localhost:8000/api/schema/` | Archivo YAML/JSON con el schema |
| `http://localhost:8000/api/docs/` | Interfaz Swagger UI interactiva |
| `http://localhost:8000/api/redoc/` | Documentación ReDoc |

**Verificación de contenido:** En Swagger UI (`/api/docs/`), debes ver:
- Todos tus endpoints (`/socios/`, `/socios/check-dni/`, etc.)
- Métodos HTTP disponibles (GET, POST, etc.)
- Schemas de request/response generados desde tus serializers

### 4: Mejora de Documentación

#### 4.1: Añadir docstrings descriptivos

En `socios/api_views.py`, añade docstrings a tu ViewSet:

```python
class SocioViewSet(viewsets.ModelViewSet):
    """
    Gestión completa de socios de la ONG.
    
    Permite crear, consultar, actualizar y eliminar socios.
    Incluye validación automática de DNI y gestión de direcciones anidadas.
    """
    # ... tu código existente ...
    
    @action(detail=False, methods=['post'])
    def check_dni(self, request):
        """
        Valida el formato y letra de un DNI/NIE español.
        
        Usa el algoritmo módulo 23 para verificar la letra de control.
        No requiere autenticación.
        """
        # ... tu código ...
```

**Verificación:** Recarga `/api/docs/` y comprueba que aparecen las descripciones.

#### 4.2: Personalizar endpoint con @extend_schema

Importa y usa el decorador para mejorar la documentación del endpoint `check_dni`:

```python
from drf_spectacular.utils import extend_schema, OpenApiExample

# ... en tu ViewSet ...

@extend_schema(
    # TODO: Añade summary (título corto)
    # TODO: Añade description (descripción larga)
    # TODO: Define responses con ejemplos para 200 y 400
)
@action(detail=False, methods=['post'])
def check_dni(self, request):
    # ... tu código ...
```
:::info
**Investiga:** Busca en la documentación de drf-spectacular:
- Cómo usar `OpenApiExample` para mostrar ejemplos de respuesta
- Cómo definir diferentes responses por código HTTP (200, 400)
:::
#### 4.3: Añadir parámetros de query documentados

Para el endpoint de pagos, documenta el parámetro `year`:

```python
from drf_spectacular.utils import OpenApiParameter

@extend_schema(
    # TODO: Añade parámetro 'year' de tipo integer, opcional, con default=2024
    # TODO: Añade descripción: "Año de consulta para el historial de pagos"
)
@action(detail=True, methods=['get'])
def pagos(self, request, pk=None):
    # ... tu código ...
```
