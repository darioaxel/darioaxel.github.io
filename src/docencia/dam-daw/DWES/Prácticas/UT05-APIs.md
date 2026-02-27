---
title: Práctica UT05 Servicios Web
date: 2026-28-02
icon: pen
---

# Práctica 5: Gestión de Socios con Validación Externa

## Apartado 1: Crear endpoint validador de DNI

### Objetivo
Convertir una función Python existente en un endpoint funcional de la API REST.

### Código de la función

```python
# socios/dni_utils.py
import re

def check_dni(dni: str) -> dict:
    """
    Valida el formato de un DNI español (8 dígitos + letra).
    
    Args:
        dni: Cadena con el documento a validar
        
    Returns:
        dict con el resultado de la validación
    """
    dni = dni.upper().strip()
    
    # Patrón: 8 dígitos seguidos de letra válida
    if not re.match(r'^\d{8}[A-HJ-NP-TV-Z]$', dni):
        return {
            "valido": False,
            "documento": dni,
            "error": "Formato inválido. Use: 12345678A"
        }
    
    # Validar letra (algoritmo módulo 23)
    numero = int(dni[:-1])
    letra = dni[-1]
    letras_validas = 'TRWAGMYFPDXBNJZSQVHLCKE'
    
    if letras_validas[numero % 23] != letra:
        return {
            "valido": False,
            "documento": dni,
            "error": "Letra incorrecta"
        }
    
    return {
        "valido": True,
        "documento": dni,
        "tipo": "DNI"
    }
```

### Tareas a realizar

1. **Crear el archivo `dni_utils.py`** con la función proporcionada
2. **Crear un endpoint POST** en `api_views.py` accesible en `/api/socios/check-dni/`
3. **El endpoint debe**:
   - Recibir JSON: `{"documento": "12345678A"}`
   - Usar la función `check_dni()` para validar
   - Devolver el resultado como JSON

### Guía de ayuda con referencias

| Problema | Referencias a consultar |
|----------|------------------------|
| ¿Cómo crear un endpoint que no use modelo (solo recibe datos y devuelve resultado)? | Buscar: `APIView drf`, `GenericAPIView`, o `@action` en ViewSet |
| ¿Cómo acceder a los datos del body de la petición POST? | Buscar: `request.data drf`, `django rest framework request object` |
| ¿Cómo importar y usar una función desde otro archivo? | Buscar: `python import from module` |
| ¿Cómo devolver una respuesta JSON con código HTTP 200 o 400 según validez? | Buscar: `Response drf status code`, `rest_framework.response` |

### Criterios de aceptación

- [ ] POST a `/api/socios/check-dni/` con `{"documento": "12345678A"}` devuelve `{"valido": true, ...}`
- [ ] POST con `{"documento": "12345678Z"}` devuelve `{"valido": false, ...}` y HTTP 400
- [ ] POST con formato incorrecto devuelve error descriptivo
- [ ] El código importa `check_dni` desde `socios.dni_utils`



## Apartado 2: Extender el Serializador

### Objetivo
Usar la misma lógica de validación pero integrada en el flujo de creación de socios.

### Tareas a realizar

1. **Crear `DNIValidatorSerializer`** en `serializers.py`:
   - Campo `documento` de tipo CharField
   - Método `validate_documento()` que use la función `check_dni()`
   - Si `check_dni()` devuelve `valido: False`, lanzar `ValidationError`

2. **Modificar `SocioCreateSerializer`**:
   - Usar `DNIValidatorSerializer` como base o llamar a su validación
   - Asegurar que no se puede crear un socio con DNI inválido

### Guía de ayuda con referencias

| Problema | Referencias |
|----------|-------------|
| ¿Cómo validar un campo específico en un serializer? | Buscar: `validate_<field> drf`, `field level validation` |
| ¿Cómo reutilizar validación entre serializers? | Buscar: `serializer inheritance drf`, `mixin pattern` |
| ¿Cómo convertir el dict de `check_dni()` en excepción de validación? | Buscar: `serializers.ValidationError`, `raise validation error drf` |

### Criterios de aceptación

- [ ] Intentar crear socio con DNI "12345678Z" devuelve error 400 con mensaje claro
- [ ] Crear socio con DNI "12345678A" funciona correctamente
- [ ] El código no duplica la lógica de validación (reusa `check_dni`)


## PDF entregable:

En la entrega de la tarea se deben incluir (a tamaño de letra legible!!!)

1. **Capturas de pantalla** de:
   - POST `/api/socios/check-dni/` con DNI válido (200 OK)
   - POST `/api/socios/check-dni/` con DNI inválido (400 Bad Request)
   - POST `/api/socios/` creando socio con DNI inválido (error de validación)

2. **Código** de:
   - `dni_utils.py` (proporcionado, sin cambios)
   - `api_views.py` con el endpoint
   - `serializers.py` con la validación integrada

3. **Breve explicación** (5-10 líneas) de qué problema tuviste al montar el endpoint y cómo lo resolviste

## Ejemplos de uso esperados

### Endpoint check-dni (Parte 1)

```bash
# Válido
curl -X POST http://localhost:8000/api/socios/check-dni/ \
  -H "Content-Type: application/json" \
  -d '{"documento": "12345678A"}'
```
Respuesta 200:
```json
{"valido": true, "documento": "12345678A", "tipo": "DNI"}
```

```bash
# Inválido
curl -X POST http://localhost:8000/api/socios/check-dni/ \
  -H "Content-Type: application/json" \
  -d '{"documento": "12345678Z"}'
```
Respuesta 400:
```json
{"valido": false, "documento": "12345678Z", "error": "Letra incorrecta"}
```

### Creación de socio (Parte 2)

```bash
curl -X POST http://localhost:8000/api/socios/ \
  -H "Content-Type: application/json" \
  -d '{"nombre": "Ana", "apellidos": "García", "documento_identidad": "12345678Z", ...}'
```
Respuesta 400:
```json
{"documento_identidad": ["Letra incorrecta"]}
```
