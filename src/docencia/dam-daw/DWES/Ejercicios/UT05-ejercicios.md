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

**`main.py`** (todo en uno, ~60 líneas):
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

**SQL para crear la tabla** (ejecutar una vez en `psql` o pgAdmin):
```sql
CREATE TABLE discos (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(200) NOT NULL,
    artista VARCHAR(50) NOT NULL,  -- 'NIN', 'THE_CURE', etc.
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
