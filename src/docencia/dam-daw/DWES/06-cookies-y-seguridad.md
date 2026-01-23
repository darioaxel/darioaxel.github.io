---
title: UT06 Cookies y Seguridad en aplicaciones web
date: 2025-10-01    
icon: fluent:cookies-16-filled
---

# UT06 Cookies y Seguridad en aplicaciones web
![En construcción](/images/under-construction.jpg)

> **En este tema trabajaremos los siguientes RAs:**
> - RA5. Utiliza frameworks y componentes que simplifican el acceso a los datos y la persistencia de la información.
> - RA6. Desarrolla aplicaciones de acceso a almacenes de datos, aplicando medidas para mantener la seguridad y la integridad de la información.

## 1. Introducción
En este capítulo vamos a profundizar en varios aspectos de vital importancia para las aplicaciones web.

Por un lado, tenemos las cookies y las sesiones, dos mecanismos que permiten a la aplicación mantener vivas algunas variables de forma indefinida.

Después estudiaremos un problema endémico a las aplicaciones web: la seguridad. En efecto, al tratarse de aplicaciones que, por definición, están permanentemente conectadas a la red, son susceptibles de recibir ataques de manera continua e indiscriminada. Y, de hecho, lo hacen. Veremos cuáles son los tipos de ataque más frecuente y cómo podemos proteger nuestra aplicación contra ellos, algo en lo que juegan un papel importante las cookies y las variables de sesión.

Por último, nos centraremos en algo muy relacionado con la seguridad: la autenticación de usuarios para acceder a la aplicación. La mayor parte de las aplicaciones web necesitan un mecanismo seguro de autenticación. Veremos en qué consisten las listas de control de acceso y plantearemos una implementación muy completa en la que pondremos en práctica todo lo que hemos aprendido hasta ahora e incluso iremos un paso más allá al introducir la arquitectura MVC, que veremos en el siguiente tema.

## 2. Seguridad en aplicaciones de servidor

### 2.1. Autenticación y Autorización
La autenticación y la autorización son dos aspectos fundamentales en las aplicaciones en red. A continuación, te explico la importancia de cada uno de ellos:

1. **Autenticación:**
La autenticación se refiere al proceso de verificar la identidad de un usuario o entidad que intenta acceder a un sistema. Es esencial para garantizar que solo los usuarios legítimos tengan acceso a los recursos y funcionalidades de una aplicación. Al autenticar a los usuarios, se asegura que sean quienes dicen ser, generalmente mediante la verificación de credenciales, como un nombre de usuario y una contraseña. La autenticación es crucial para prevenir el acceso no autorizado y proteger la información sensible.

2. **Autorización:**
La autorización se ocupa de determinar qué acciones o recursos están permitidos para un usuario autenticado en una aplicación. Después de que un usuario se autentica, la autorización establece los permisos y los niveles de acceso que se le otorgan. Esto se logra mediante la asignación de roles, privilegios o permisos específicos a los usuarios. La autorización garantiza que los usuarios solo puedan acceder a los recursos y realizar acciones para los que tienen permiso, evitando así posibles abusos o violaciones de seguridad.

La importancia de la sesión en la autenticación y autorización radica en mantener el estado y la continuidad de la identidad del usuario durante su interacción con la aplicación. Una sesión representa la conexión entre el usuario y la aplicación, y permite mantener información relevante y contextual sobre el usuario autenticado. Algunos aspectos clave son:

- **Gestión de sesiones**: La aplicación debe establecer y gestionar correctamente las sesiones para cada usuario autenticado. Esto implica asignar un identificador único a cada sesión y mantener un registro de las sesiones activas.

- **Almacenamiento de información de sesión**: Durante una sesión, se pueden almacenar datos relevantes, como la identificación del usuario, los roles asignados, las preferencias o cualquier otra información necesaria para personalizar la experiencia del usuario o aplicar reglas de autorización.

- **Control de acceso basado en sesiones**: La información de sesión se utiliza para verificar la autorización de cada solicitud o acción realizada por el usuario. Se pueden aplicar controles de acceso a nivel de sesión para garantizar que el usuario tenga los permisos adecuados para llevar a cabo una determinada acción.

- **Caducidad y cierre de sesiones**: Es importante establecer políticas de caducidad de sesiones para proteger la seguridad de la aplicación. Las sesiones deben cerrarse automáticamente después de un período de inactividad o cuando el usuario cierra explícitamente la sesión.

En resumen, la autenticación y la autorización son fundamentales para garantizar la seguridad y el control de acceso en las aplicaciones en red. La sesión desempeña un papel crucial en la gestión de la identidad del usuario y en la aplicación de políticas de autorización, permitiendo una interacción segura y personalizada entre el usuario y la aplicación.

## 3. Cookies

### 3.1. ¿Qué son las cookies?

Las cookies son pequeños archivos de texto enviados desde el servidor que se almacenan en el lado del cliente. Es decir, en el navegador.

Permiten guardar información de forma persistente, de manera que se mantenga entre una petición al servidor y otra. Una cookie puede estar viva durante minutos, horas, días o incluso indefinidamente.

### 3.2. Manejando cookies con Django

Django ofrece varias formas de trabajar con cookies, desde el nivel básico de `HttpResponse` hasta la gestión avanzada en Django REST Framework. Veamos las más utilizadas:

### 3.2.1. Estableciendo una cookie básica

La forma más sencilla es usando el método `set_cookie()` del objeto `HttpResponse`:

```python
# views.py
from django.http import HttpResponse

def setear_cookie_basica(request):
    respuesta = HttpResponse("Cookie establecida. Actualiza la página.")
    respuesta.set_cookie('tema', 'oscuro')  # Nombre y valor
    return respuesta
```

**Atributos importantes del método `set_cookie()`:**
- `key`: Nombre de la cookie (obligatorio)
- `value`: Valor de la cookie (obligatorio)
- `max_age`: Tiempo de vida en segundos (ej: 3600 = 1 hora)
- `expires`: Fecha de expiración como objeto datetime
- `path`: Ruta donde es válida (por defecto "/")
- `domain`: Dominio donde es válida
- `secure`: Solo se envía por HTTPS (por defecto False)
- `httponly`: No accesible por JavaScript (por defecto False)
- `samesite`: Protección CSRF con valores 'Lax', 'Strict' o 'None'

### 3.2.2. Cookie con atributos de seguridad

```python
# views.py
from django.http import HttpResponse
import datetime

def setear_cookie_segura(request):
    respuesta = HttpResponse("Cookie segura establecida")
    
    # Cookie con múltiples atributos de seguridad
    respuesta.set_cookie(
        key='session_pref',
        value='usuario_12345',
        max_age=1800,  # 30 minutos
        expires=datetime.datetime.utcnow() + datetime.timedelta(days=1),
        path='/',
        domain='tudominio.com',  # Opcional: restringir dominio
        secure=True,  # SOLO EN PRODUCCIÓN CON HTTPS
        httponly=True,  # Protege contra XSS
        samesite='Lax'  # Protege contra CSRF
    )
    return respuesta
```

::: warning 
Nunca configures `secure=False` en producción. En desarrollo, si usas `localhost`, el navegador ignora este atributo, pero en un entorno real con dominio, una cookie sin `secure=True` viaja en texto plano y es vulnerable a sniffing.
:::

### 3.2.3. Leyendo cookies del cliente

Para recuperar el valor de una cookie enviada por el navegador:

```python
# views.py
def leer_cookie(request):
    tema = request.COOKIES.get('tema', 'claro')  # Valor por defecto 'claro'
    return HttpResponse(f"El tema actual es: {tema}")
```

### 3.2.4. Eliminando cookies

```python
# views.py
def eliminar_cookie(request):
    respuesta = HttpResponse("Cookie eliminada")
    respuesta.delete_cookie('tema')  # Elimina la cookie estableciendo fecha de expiración en el pasado
    return respuesta
```

### 3.2.5. Ejemplo práctico: Sistema de tema oscuro/claro

Vamos a implementar un sistema completo para que los usuarios elijan su tema preferido:

```python
# views.py
from django.shortcuts import render
from django.http import HttpResponse

def configurar_tema(request):
    if request.method == 'POST':
        tema = request.POST.get('tema', 'claro')
        respuesta = HttpResponse(f"Tema establecido a {tema}")
        respuesta.set_cookie(
            'tema', 
            tema, 
            max_age=2592000,  # 30 días
            httponly=False,   # Accesible por JS para aplicar estilos
            samesite='Lax'
        )
        return respuesta
    
    return render(request, 'configurar_tema.html')

def mostrar_pagina(request):
    tema = request.COOKIES.get('tema', 'claro')
    return render(request, 'pagina.html', {'tema': tema})
```

**templates/configurar_tema.html**
```html
<!DOCTYPE html>
<html>
<head>
    <title>Configurar Tema</title>
</head>
<body>
    <h1>Elige tu tema preferido</h1>
    <form method="post">
        {% csrf_token %}
        <label>
            <input type="radio" name="tema" value="claro" checked> Claro
        </label>
        <label>
            <input type="radio" name="tema" value="oscuro"> Oscuro
        </label>
        <button type="submit">Guardar preferencia</button>
    </form>
</body>
</html>
```

### 3.2.6. Cookies en Django REST Framework

Para APIs REST, el manejo es similar pero usamos `Response` de DRF:

```python
# api/views.py
from rest_framework.response import Response
from rest_framework.decorators import api_view

@api_view(['POST'])
def api_login(request):
    # Lógica de autenticación...
    usuario = request.data.get('email')
    
    respuesta = Response({
        "mensaje": "Login exitoso",
        "usuario": usuario
    })
    
    # Establecer cookie de sesión
    respuesta.set_cookie(
        key='auth_token',
        value='abc123xyz',
        httponly=True,
        secure=True,  # Solo en HTTPS
        samesite='Lax',
        max_age=3600
    )
    
    return respuesta

@api_view(['GET'])
def api_perfil(request):
    token = request.COOKIES.get('auth_token')
    if not token:
        return Response({"error": "No autenticado"}, status=401)
    
    # Verificar token...
    return Response({"usuario": "datos del perfil"})
```

### 3.2.7. Middleware para gestionar cookies globalmente

Si necesitas procesar cookies en cada petición, crea middleware:

```python
# middleware/cookie_middleware.py
class CookieThemeMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        # Antes de la vista
        request.tema = request.COOKIES.get('tema', 'claro')
        
        response = self.get_response(request)
        
        # Después de la vista
        if hasattr(request, 'tema_nuevo'):
            response.set_cookie('tema', request.tema_nuevo, max_age=2592000)
        
        return response
```

**settings.py**
```python
MIDDLEWARE = [
    ...
    'tuapp.middleware.cookie_middleware.CookieThemeMiddleware',
]
```

### 3.2.8. Atributo `samesite` y protección CSRF

El atributo `samesite` es crucial para prevenir ataques CSRF:

- **`Samesite='Strict'`**: La cookie solo se envía en peticiones al mismo origen. Muy seguro pero puede romper flujos de navegación (ej: links externos).
- **`Samesite='Lax'`**: La cookie se envía en navegación top-level (GET) y peticiones POST del mismo sitio. Recomendado para la mayoría de casos.
- **`Samesite='None'`**: La cookie se envía en todas las peticiones cross-site. Requiere `secure=True`. Útil para APIs consumidas por múltiples dominios.

```python
# Para API que debe funcionar cross-origin
respuesta.set_cookie(
    key='api_token',
    value='xyz789',
    samesite='None',
    secure=True,  # ¡OBLIGATORIO con SameSite=None!
    httponly=True
)
```

### 3.2.9. Almacenando múltiples valores: serialización JSON

Si necesitas guardar estructuras complejas:

```python
import json
from django.http import HttpResponse

def setear_datos_usuario(request):
    datos = {
        'preferencias': {
            'tema': 'oscuro',
            'idioma': 'es',
            'notificaciones': True
        },
        'ultima_visita': '2025-10-01'
    }
    
    respuesta = HttpResponse("Datos de usuario guardados")
    respuesta.set_cookie(
        'user_prefs',
        json.dumps(datos),  # Serializar a JSON string
        max_age=86400,
        httponly=True,
        samesite='Lax'
    )
    return respuesta

def leer_datos_usuario(request):
    datos_json = request.COOKIES.get('user_prefs', '{}')
    try:
        datos = json.loads(datos_json)
    except json.JSONDecodeError:
        datos = {}
    
    return HttpResponse(f"Preferencias: {datos.get('preferencias', {})}")
```

### 3.2.10. Ejercicios prácticos

**Ejercicio 1: Contador de visitas (30 min)**
Crea una vista que cuente cuántas veces ha visitado el usuario la página usando una cookie llamada `visitas`. La cookie debe expirar después de 24 horas.

**Ejercicio 2: Carrito de compras simple (60 min)**
Implementa un carrito de compras que almacene los IDs de productos en una cookie. Usa JSON para serializar la lista de productos. Incluye vistas para:
- Añadir producto al carrito
- Ver contenido del carrito
- Vaciar carrito

**Ejercicio 3: Auditoría de seguridad (45 min)**
Analiza este código y detecta los problemas:
```python
def cookie_insegura(request):
    respuesta = HttpResponse("Cookie guardada")
    respuesta.set_cookie(
        'session_id',
        'valor_secreto_12345',
        secure=False,
        httponly=False,
        samesite=None
    )
    return respuesta
```
::: tip **Preguntas:**
1. ¿Qué ataques permite esta configuración? (XSS, CSRF, sniffing)
2. ¿Qué cambios propones y por qué?
3. ¿En qué casos usarías `httponly=False`?
:::


## 4. JWT

### 4.1. ¿Qué es JWT y por qué usarlo?

JWT (JSON Web Token) es un estándar abierto (RFC 7519) que permite transmitir información entre cliente y servidor de forma segura y compacta. A diferencia de las sesiones tradicionales, **JWT no requiere almacenar estado en el servidor**, lo que lo hace ideal para APIs REST y aplicaciones escalables.

**Ventajas clave:**
- **Sin estado**: El servidor no necesita guardar sesiones en memoria o base de datos
- **Escalabilidad**: Facilita el balanceo de carga entre múltiples servidores
- **Portabilidad**: Un mismo token puede ser validado por diferentes servicios
- **Seguridad**: Información firmada digitalmente que no puede ser alterada

### 4.2. Instalación y configuración en Django

Para implementar JWT usaremos `djangorestframework-simplejwt`, la librería más mantenida y segura.

```bash
pip install djangorestframework djangorestframework-simplejwt
```

**settings.py**
```python
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'rest_framework_simplejwt',
    'jwt_app',  # Nuestra aplicación
]

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ],
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticated',
    ],
}

from datetime import timedelta

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=30),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=1),
    'ROTATE_REFRESH_TOKENS': True,
    'BLACKLIST_AFTER_ROTATION': True,
    'AUTH_HEADER_TYPES': ('Bearer',),
}
```

### 4.3. Ejemplo completo: API de autenticación

Vamos a crear un sistema mínimo pero funcional con registro, login y acceso protegido.

**jwt_app/models.py**
```python
from django.contrib.auth.models import AbstractUser
from django.db import models

class Usuario(AbstractUser):
    email = models.EmailField(unique=True)
    nombre = models.CharField(max_length=100)
    
    USERNAME_FIELD = 'email'  # Usamos email para login
    REQUIRED_FIELDS = ['username', 'nombre']

    def __str__(self):
        return self.email
```

**jwt_app/serializers.py**
```python
from rest_framework import serializers
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

User = get_user_model()

class RegistroSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=6)

    class Meta:
        model = User
        fields = ['email', 'password', 'nombre']

    def create(self, validated_data):
        user = User.objects.create_user(
            email=validated_data['email'],
            password=validated_data['password'],
            nombre=validated_data['nombre']
        )
        return user

class LoginSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['email'] = user.email
        token['nombre'] = user.nombre
        return token
```

**jwt_app/views.py**
```python
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import get_user_model
from .serializers import RegistroSerializer, LoginSerializer

User = get_user_model()

class RegistroView(generics.CreateAPIView):
    """Registro de nuevos usuarios"""
    queryset = User.objects.all()
    permission_classes = [AllowAny]
    serializer_class = RegistroSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        
        # Generamos tokens inmediatamente
        refresh = RefreshToken.for_user(user)
        
        return Response({
            'mensaje': 'Usuario creado exitosamente',
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'usuario': {
                'email': user.email,
                'nombre': user.nombre
            }
        }, status=status.HTTP_201_CREATED)


class LoginView(APIView):
    """Login de usuarios existentes"""
    permission_classes = [AllowAny]

    def post(self, request):
        from rest_framework_simplejwt.views import TokenObtainPairView
        
        # Usamos la vista integrada con nuestro serializer
        view = TokenObtainPairView.as_view(serializer_class=LoginSerializer)
        return view(request._request)


class PerfilView(APIView):
    """Vista protegida que requiere autenticación JWT"""
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({
            'mensaje': 'Acceso concedido',
            'usuario': {
                'email': request.user.email,
                'nombre': request.user.nombre,
                'id': request.user.id
            }
        })


class LogoutView(APIView):
    """Logout que invalida el refresh token"""
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            refresh_token = request.data.get('refresh')
            token = RefreshToken(refresh_token)
            token.blacklist()  # Requiere 'rest_framework_simplejwt.token_blacklist'
            return Response({'mensaje': 'Logout exitoso'}, status=200)
        except Exception as e:
            return Response({'error': str(e)}, status=400)
```

**jwt_app/urls.py**
```python
from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import RegistroView, PerfilView, LogoutView, LoginView

urlpatterns = [
    path('auth/registro/', RegistroView.as_view(), name='registro'),
    path('auth/login/', LoginView.as_view(), name='login'),
    path('auth/refresh/', TokenRefreshView.as_view(), name='refresh'),
    path('auth/logout/', LogoutView.as_view(), name='logout'),
    path('perfil/', PerfilView.as_view(), name='perfil'),
]
```

**proyecto/settings.py** (añadir al final)
```python
AUTH_USER_MODEL = 'jwt_app.Usuario'
```

### 4.4. Ejemplos de uso con curl

**1. Registro de nuevo usuario**
```bash
curl -X POST http://127.0.0.1:8000/api/auth/registro/ \
  -H "Content-Type: application/json" \
  -d '{
    "email": "alumno@cesur.com",
    "password": "C3sur2024!",
    "nombre": "Ana García"
  }'
```

**Respuesta esperada:**
```json
{
    "mensaje": "Usuario creado exitosamente",
    "refresh": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
    "access": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
    "usuario": {
        "email": "alumno@cesur.com",
        "nombre": "Ana García"
    }
}
```

**2. Login de usuario**
```bash
curl -X POST http://127.0.0.1:8000/api/auth/login/ \
  -H "Content-Type: application/json" \
  -d '{"email": "alumno@cesur.com", "password": "C3sur2024!"}'
```

**3. Acceder a recurso protegido (usa el access token)**
```bash
curl -X GET http://127.0.0.1:8000/api/perfil/ \
  -H "Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9..."
```

**Respuesta esperada:**
```json
{
    "mensaje": "Acceso concedido",
    "usuario": {
        "email": "alumno@cesur.com",
        "nombre": "Ana García",
        "id": 1
    }
}
```

**4. Refrescar token (cuando el access expire)**
```bash
curl -X POST http://127.0.0.1:8000/api/auth/refresh/ \
  -H "Content-Type: application/json" \
  -d '{"refresh": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9..."}'
```

**5. Logout (invalida el refresh token)**
```bash
curl -X POST http://127.0.0.1:8000/api/auth/logout/ \
  -H "Authorization: Bearer <access_token>" \
  -H "Content-Type: application/json" \
  -d '{"refresh": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9..."}'
```

### 4.5. Anatomía de un JWT

Un JWT consta de tres partes separadas por puntos:
```
eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI3ODA5NzAwLCJpYXQiOjE3Mjc4MDYxMDAsImp0aSI6ImFiYzEyMyIsInVzZXJfaWQiOjEsImVtYWlsIjoiYWx1bW5vQGNlc3VyLmNvbSIsIm5vbWJyZSI6IkFuYSJ9.FirmaDigitalAquí
```

**Desglose:**
1. **Header** (rojo): Algoritmo y tipo de token
2. **Payload** (púrpura): Datos del usuario (claims) + metadata
3. **Signature** (azul): Firma para validar autenticidad

**Claims importantes:**
- `exp`: Fecha de expiración (obligatorio)
- `iat`: Fecha de creación
- `sub`: Sujeto (normalmente user_id)
- `jti`: ID único del token

### 4.6. Mejores prácticas de seguridad

| Práctica | Implementación | ¿Por qué? |
|----------|----------------|-----------|
| **Access token corto** | `ACCESS_TOKEN_LIFETIME: 30 min` | Limita daño si es robado |
| **Refresh token rotativo** | `ROTATE_REFRESH_TOKENS: True` | Cada uso genera uno nuevo, invalida el anterior |
| **HTTPS obligatorio** | `secure=True` en cookies | Evita sniffing de redes |
| **No almacenar en localStorage** | Usar variables en memoria o cookies HttpOnly | Previene robo por XSS |
| **Algoritmo robusto** | `HS256` o mejor `RS256` | Firma más segura con clave pública/privada |
| **Blacklist** | `'rest_framework_simplejwt.token_blacklist'` | Permite invalidar tokens en logout |
| **Rate limiting** | `django-ratelimit` en login | Previene ataques de fuerza bruta |

### 4.7. Ejercicios prácticos

**Ejercicio 1: Inspección de tokens (30 min)**
Usa [jwt.io](https://jwt.io) para:
1. Decodificar tu access token
2. Identificar qué información contiene el payload
3. Modificar un byte del token y verifica que la firma falla

**Ejercicio 2: Implementar roles (60 min)**
Modifica `LoginSerializer` para añadir un claim `rol` basado en un campo `is_profesor` del modelo. Luego crea una vista `PanelProfesorView` que solo usuarios con `rol: "profesor"` puedan acceder.

**Pista:**
```python
# En get_token()
token['rol'] = 'profesor' if user.is_profesor else 'alumno'

# Permiso personalizado
class SoloProfesor(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_profesor
```

**Ejercicio 3: Análisis de vulnerabilidades (45 min)**
Dado este código frontend:
```javascript
// ¡MALA PRÁCTICA!
localStorage.setItem('token', response.data.access);

// Preguntas:
// 1. ¿Qué vulnerabilidad introduce? (XSS)
// 2. ¿Cómo lo arreglas? (Usar contexto de React/Vue o cookies HttpOnly)
// 3. ¿Ventajas de cada método?
```

**Ejercicio 4: Rate limiting (30 min)**
Instala `django-ratelimit` y protege el endpoint de login contra 5 intentos por minuto desde la misma IP.

```bash
pip install django-ratelimit
```

```python
from ratelimit.decorators import ratelimit

class LoginView(APIView):
    @ratelimit(key='ip', rate='5/m', method='POST')
    def post(self, request):
        # ... lógica de login
```

### 4.8. Tabla comparativa: JWT vs Sesiones tradicionales

| Característica | JWT (Stateless) | Sesiones tradicionales (Stateful) |
|---------------|-----------------|-----------------------------------|
| **Almacenamiento** | Cliente (token) | Servidor (memoria/BD) |
| **Escalabilidad** | Excelente | Compleja (necesita shared storage) |
| **Velocidad** | Rápido (no lookup en BD) | Lento (lookup en cada petición) |
| **Logout inmediato** | Requiere blacklist | Inmediato (borrar sesión) |
| **Tamaño** | Variable (pocas KB) | Mínimo (solo session ID) |
| **Uso recomendado** | APIs REST, microservicios | Aplicaciones web monolíticas |

### 4.9. Recursos oficiales

- **Documentación Simple JWT**: https://django-rest-framework-simplejwt.readthedocs.io/
- **GitHub con ejemplos**: https://github.com/jazzband/djangorestframework-simplejwt
- **Herramienta de debugging**: https://jwt.io

::: note
Recuerda: En producción, tu `SECRET_KEY` debe ser única, compleja y nunca subirse a Git. Usa variables de entorno:
```python
import os
SECRET_KEY = os.getenv('DJANGO_SECRET_KEY', 'clave-local-dev')
```
:::


## 5.SSL/TSL
SSL (Secure Sockets Layer) y TLS (Transport Layer Security) son protocolos de seguridad que proporcionan cifrado y autenticación para las comunicaciones en línea. Ambos protocolos son fundamentales para garantizar la privacidad y la integridad de los datos transmitidos a través de redes como Internet. A continuación, te explico la importancia de SSL/TLS en las comunicaciones:

1. Cifrado de datos: SSL/TLS utiliza algoritmos de cifrado para proteger los datos transmitidos entre un cliente y un servidor. Esto significa que los datos se convierten en un formato ilegible para terceros no autorizados, lo que garantiza la confidencialidad de la información sensible, como contraseñas, datos personales o información financiera.

2. Autenticación del servidor: SSL/TLS permite verificar la identidad del servidor al que un cliente se conecta. Esto se logra mediante certificados digitales emitidos por autoridades de certificación confiables. La autenticación del servidor ayuda a prevenir ataques de intermediarios, donde un tercero intenta suplantar al servidor y obtener información confidencial.

3. Integridad de los datos: SSL/TLS utiliza funciones de resumen (hashing) y firmas digitales para garantizar la integridad de los datos transmitidos. Esto significa que cualquier modificación o alteración de los datos durante la transmisión será detectada, ya que la firma digital no coincidirá con los datos recibidos.

4. Confianza y seguridad: Al implementar SSL/TLS, se establece una capa adicional de confianza y seguridad en las comunicaciones en línea. Los usuarios pueden tener la tranquilidad de que sus datos están protegidos y que están interactuando con el sitio o servicio legítimo.

### 5.1. Handshake
El handshake (apretón de manos) es un proceso fundamental en el establecimiento de una conexión segura utilizando los protocolos SSL/TLS. Durante el handshake, el cliente y el servidor intercambian información y acuerdan los parámetros de cifrado y autenticación necesarios para establecer una conexión segura. A continuación, te explico los pasos principales del handshake:

![](/images/dwes/tsl.png)

1. Cliente envía solicitud de conexión: El cliente envía una solicitud de conexión al servidor indicando su intención de establecer una conexión segura utilizando SSL/TLS.

2. Servidor responde con certificado: El servidor responde enviando su certificado digital, que contiene su clave pública y otros detalles relevantes. El certificado está firmado por una autoridad de certificación confiable.

3. Cliente verifica el certificado: El cliente verifica la autenticidad del certificado del servidor. Esto implica comprobar la validez del certificado, la cadena de confianza y la firma digital. Si el certificado no es válido o no se puede verificar, el cliente puede abortar la conexión.

4. Cliente genera clave de sesión: El cliente genera una clave de sesión aleatoria que se utilizará para cifrar los datos durante la conexión. La clave de sesión se cifra con la clave pública del servidor y se envía al servidor.

5. Servidor desencripta la clave de sesión: El servidor utiliza su clave privada para desencriptar la clave de sesión enviada por el cliente y la recupera.

6. Cliente y servidor acuerdan parámetros de cifrado: El cliente y el servidor acuerdan los parámetros de cifrado y autenticación que se utilizarán durante la conexión. Esto incluye el algoritmo de cifrado, el modo de operación, la longitud de la clave y otros detalles.

7. Cliente y servidor intercambian mensajes cifrados: A partir de este punto, el cliente y el servidor utilizan la clave de sesión compartida para cifrar y descifrar los mensajes que se envían durante la conexión.

Una vez completado el handshake, la conexión se considera segura y tanto el cliente como el servidor pueden comenzar a intercambiar datos de manera cifrada. El handshake se realiza solo al establecer la conexión inicial y no se repite durante la comunicación.


::: note
Contenido recuperado de [IES Celia Vivas](https://iescelia.org/docs/dwes/_site/cookies-sesiones-seguridad/)

:::