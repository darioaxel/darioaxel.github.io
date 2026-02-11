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

## EJERCICIO 2: Creación de un proyecto con FastAPI 