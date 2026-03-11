---
title: Ejercicios UT06. Cookies y seguridad
icon: pen
---

## Ejercicio 1 : Autenticación JWT con API Pública

Usaremos **JSONPlaceholder** (fake API) combinada con **JWT.io** para simular el flujo completo, o puedes usar tu propio backend Django/DRF si lo prefieres.

### **Parte 1: Entender el Flujo JWT (15 min)**

#### 1.1 Conceptos clave

| Concepto | Descripción | Ejemplo |
|----------|-------------|---------|
| **Header** | Algoritmo y tipo de token | `{"alg":"HS256","typ":"JWT"}` |
| **Payload** | Datos del usuario (claims) | `{"sub":"123","name":"Ana","role":"teacher"}` |
| **Signature** | Firma para verificar integridad | `HMACSHA256(base64(header)+"."+base64(payload), secret)` |

#### 1.2 Genera un token de prueba

Ve a [jwt.io](https://jwt.io) y usa este payload:

```json
{
  "sub": "1234567890",
  "name": "Profesor Demo",
  "role": "teacher",
  "iat": 1741700000,
  "exp": 1893456000
}
```

**Secret key (para pruebas):** `tu-clave-secreta-muy-larga-y-segura-2025`

Copia el token generado (tendrá 3 partes separadas por puntos).


### **Parte 2: Práctica con curl**

#### Paso 1: Simular login y obtener token

```bash
# Si tienes tu API Django/DRF:
curl -X POST http://localhost:8000/api/token/ \
  -H "Content-Type: application/json" \
  -d '{"username":"profesor1","password":"Pass1234!"}'

# Respuesta esperada:
# {"access":"eyJ0eXAiOiJKV1Qi...","refresh":"eyJ0eXAiOiJKV1Qi..."}
```

#### Paso 2: Guardar token en variable (Bash)

```bash
# Guardar el access token
TOKEN="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9..."

# Verificar que se guardó
echo $TOKEN
```

#### Paso 3: Acceder a endpoint protegido

```bash
# Solicitud SIN token (debe fallar con 401)
curl -X GET http://localhost:8000/api/socios/ \
  -H "Content-Type: application/json"

# Solicitud CON token (debe funcionar)
curl -X GET http://localhost:8000/api/socios/ \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN"

# O si prefieres en una línea:
curl -X GET http://localhost:8000/api/socios/ \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9..."
```

#### Paso 4: Crear recurso con autenticación (POST)

```bash
curl -X POST http://localhost:8000/api/socios/ \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "nombre": "Nuevo Socio",
    "email": "socio@ejemplo.com",
    "dni": "12345678Z"
  }'
```

#### Paso 5: Refresh token (cuando el access expira)

```bash
curl -X POST http://localhost:8000/api/token/refresh/ \
  -H "Content-Type: application/json" \
  -d '{"refresh":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9..."}'
```

## Ejercicio 2: Dominio de Cookies HTTP

### **Parte 1: Fundamentos Visuales (10 min)**

#### 1.1 Inspecciona cookies en sitios reales

Abre tu navegador en modo incógnito y visita estos sitios:

| Sitio | Qué observar |
|-------|--------------|
| `https://www.google.com` | Cookies `NID`, `1P_JAR` (tracking/publicidad) |
| `https://github.com` | Cookies de sesión `_gh_sess`, `logged_in` |
| `https://httpbin.org/cookies` | Cookies de prueba en tiempo real |

**En Chrome/Edge:** F12 → Application → Cookies → Selecciona el dominio

**Atributos a identificar:**
- `Name`, `Value`, `Domain`, `Path`, `Expires/Max-Age`, `HttpOnly`, `Secure`, `SameSite`

### **Parte 2: Laboratorio con curl (40 min)**

#### Paso 1: Ver cookies que envía un servidor

```bash
# Guardar cookies en archivo
curl -c cookies.txt -I https://httpbin.org/cookies/set/mi_cookie/valor123

# Ver el archivo creado
cat cookies.txt

# Formato esperado:
# # Netscape HTTP Cookie File
# httpbin.org	FALSE	/	FALSE	0	mi_cookie	valor123
```

#### Paso 2: Enviar cookies almacenadas

```bash
# Primero, establece varias cookies
curl -c cookies.txt https://httpbin.org/cookies/set/session_id/abc123
curl -c cookies.txt https://httpbin.org/cookies/set/preferencias/tema_oscuro

# Luego, enviar esas cookies en nueva petición
curl -b cookies.txt https://httpbin.org/cookies

# Respuesta esperada:
# {
#   "cookies": {
#     "session_id": "abc123",
#     "preferencias": "tema_oscuro"
#   }
# }
```

#### Paso 3: Cookie específica vs archivo

```bash
# Cookie inline (única)
curl -H "Cookie: session_id=xyz789; lang=es" \
  https://httpbin.org/cookies

# Combinar archivo + adicionales
curl -b cookies.txt -H "Cookie: extra=dato" \
  https://httpbin.org/cookies
```

#### Paso 4: Atributos de seguridad (simulación)

```bash
# HttpOnly: No accesible por JavaScript (solo servidor la lee)
# Secure: Solo se envía por HTTPS
# SameSite: Controla envío en cross-site requests

# Ver headers Set-Cookie completos
curl -I -s https://httpbin.org/cookies/set | grep -i set-cookie

# Petición con verbose para ver todo el intercambio
curl -v -c cookies.txt https://httpbin.org/cookies/set/segura/dato
```

#### Paso 5: Dominio y Path

```bash
# Cookie con path específico
curl -c cookies.txt "https://httpbin.org/cookies/set?Path=/api&nombre=api_key&valor=secret456"

# Ver diferencia de paths en el archivo
cat cookies.txt

# Intentar acceder desde path diferente (no enviará la cookie)
curl -b cookies.txt https://httpbin.org/ip
curl -b cookies.txt https://httpbin.org/cookies  # Sí envía si path coincide
```

### **Parte 3: Simulación de Sesión de Usuario (30 min)**

#### Escenario: Login → Acción → Logout

```bash
# 1. LOGIN - Simular autenticación
curl -c session.txt -X POST https://httpbin.org/post \
  -H "Content-Type: application/json" \
  -d '{"username":"profesor","password":"1234"}' \
  -s | jq '.headers'

# Nota: httpbin devuelve lo que envías, incluyendo cookies recibidas

# 2. ACCIÓN PROTEGIDA - Usar sesión
curl -b session.txt https://httpbin.org/get \
  -H "X-Action: crear-nota" \
  -s | jq '.headers.Cookie'

# 3. VERIFICAR COOKIES ACTIVAS
curl -b session.txt https://httpbin.org/cookies -s | jq

# 4. LOGOUT - Eliminar sesión (simulado)
# En APIs reales: POST /logout que invalida cookie en servidor
curl -c /dev/null -b session.txt https://httpbin.org/cookies/delete?session_id
```
