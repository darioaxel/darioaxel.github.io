---
title: Práctica UT06 Autenticación JWT
date: 2026-08-03
icon: pen
---
# Práctica 5: Autenticación JWT en MyOng

## Parte 1: Instalación y configuración básica 

### Paso 1.1: Instalar dependencias

Revisa el fichero de dependencias y en el caso de que no las tuvieras ya instaladas, añade las siguientes:

```bash
# En tu entorno virtual de MyOng
poetry add djangorestframework djangorestframework-simplejwt
```

### Paso 1.2: Configurar Django settings

Edita `myong/settings.py` para realizar los procesos de configuración tal y como se indica en los comentarios del código que se adjunta:

```python
INSTALLED_APPS = [
    # ... tus apps actuales ...
    'rest_framework',
    'rest_framework_simplejwt',
    'rest_framework_simplejwt.token_blacklist',  # Para logout
]

# Configuración REST Framework
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ],
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticated',  # Por defecto, todo requiere auth
    ],
}

# Configuración JWT
from datetime import timedelta

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=30),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=1),
    'ROTATE_REFRESH_TOKENS': True,
    'BLACKLIST_AFTER_ROTATION': True,
    'AUTH_HEADER_TYPES': ('Bearer',),
}
```

### Paso 1.3: Configurar URLs

Edita `myong/urls.py`:

```python
from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    # ... tus URLs actuales ...
    
    # Endpoints JWT
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    
    # Incluir URLs de socios (la crearemos en Parte 2)
    path('api/socios/', include('socios.urls_api')),
]
```

### Paso 1.4: Migrar base de datos

```bash
python manage.py migrate
```

### Entregable Parte 1:
- Captura de pantalla de respuesta exitosa de `POST /api/token/` usando curl (incluir JSON de respuesta con access y refresh tokens)


## Parte 2: Endpoints protegidos para Socios 

En este apartado vamos a crear la protección básica para los endpoints. Revisa que los hicieras en la práctica anterior, para no repetir el trabajo.

### Paso 2.1: Crear serializer para Socios

Crea `socios/serializers.py`:

```python
from rest_framework import serializers
from .models import Socio

class SocioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Socio
        fields = ['id', 'dni', 'nombre', 'apellidos', 'email', 'telefono', 'fecha_alta']
        read_only_fields = ['id', 'fecha_alta']  # No se pueden modificar
```

### Paso 2.2: Crear vistas API protegidas

Crea `socios/views_api.py`:

```python
from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Socio
from .serializers import SocioSerializer

class SocioListCreateView(generics.ListCreateAPIView):
    """
    GET: Listar todos los socios (requiere autenticación)
    POST: Crear nuevo socio (requiere autenticación)
    """
    queryset = Socio.objects.all()
    serializer_class = SocioSerializer
    permission_classes = [permissions.IsAuthenticated]

class SocioDetailView(generics.RetrieveUpdateDestroyAPIView):
    """
    GET: Obtener detalle de un socio
    PUT/PATCH: Actualizar socio
    DELETE: Eliminar socio
    """
    queryset = Socio.objects.all()
    serializer_class = SocioSerializer
    permission_classes = [permissions.IsAuthenticated]
    lookup_field = 'pk'

class PerfilView(APIView):
    """
    Endpoint para obtener información del usuario autenticado
    """
    permission_classes = [permissions.IsAuthenticated]
    
    def get(self, request):
        return Response({
            'usuario': request.user.username,
            'email': request.user.email,
            'socio_id': getattr(request.user, 'socio_id', None)
        })
```

### Paso 2.3: Configurar URLs de API

Crea `socios/urls_api.py`:

```python
from django.urls import path
from .views_api import SocioListCreateView, SocioDetailView, PerfilView

urlpatterns = [
    path('', SocioListCreateView.as_view(), name='socio-list'),
    path('<int:pk>/', SocioDetailView.as_view(), name='socio-detail'),
    path('perfil/', PerfilView.as_view(), name='perfil'),
]
```

### Paso 2.4: Permitir acceso público a ciertos endpoints (opcional)

Si quieres que el registro de socios sea público pero el resto protegido, modifica `views_api.py`:

```python
from rest_framework.permissions import AllowAny

class SocioCreatePublicView(generics.CreateAPIView):
    """
    POST: Crear socio sin autenticación (registro público)
    """
    queryset = Socio.objects.all()
    serializer_class = SocioSerializer
    permission_classes = [AllowAny]  # Público
```

### Entregable Parte 2:
- Captura de Postman mostrando o usando herramientas de desarrollo del navegador:
  1. `GET /api/socios/` **sin** token → debe devolver 401 Unauthorized
  2. `POST /api/token/` con credenciales válidas → obtener access token
  3. `GET /api/socios/` **con** header `Authorization: Bearer <token>` → debe devolver lista de socios (200 OK)


## Parte 3: Implementar Logout y gestión de tokens

### Paso 3.1: Crear vista de logout

Añade a `socios/views_api.py`:

```python
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status

class LogoutView(APIView):
    """
    POST: Invalidar el refresh token (logout)
    Requiere enviar el refresh token en el body
    """
    permission_classes = [permissions.IsAuthenticated]
    
    def post(self, request):
        try:
            refresh_token = request.data.get('refresh')
            if not refresh_token:
                return Response(
                    {'error': 'Refresh token requerido'}, 
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            token = RefreshToken(refresh_token)
            token.blacklist()  # Añade a lista negra
            
            return Response(
                {'mensaje': 'Logout exitoso, token invalidado'}, 
                status=status.HTTP_200_OK
            )
            
        except Exception as e:
            return Response(
                {'error': str(e)}, 
                status=status.HTTP_400_BAD_REQUEST
            )
```

### Paso 3.2: Añadir URL de logout

Edita `socios/urls_api.py`:

```python
path('auth/logout/', LogoutView.as_view(), name='logout'),
```

### Paso 3.3: Script de prueba con curl

Copia y pega el siguente código como `test_jwt.sh` para probar el flujo completo:

```bash
#!/bin/bash

BASE_URL="http://127.0.0.1:8000/api"

echo "=== 1. Intentar acceder sin token ==="
curl -s $BASE_URL/socios/ | jq .

echo -e "\n=== 2. Obtener tokens (login) ==="
TOKENS=$(curl -s -X POST $BASE_URL/token/ \
  -H "Content-Type: application/json" \
  -d '{"username": "admin", "password": "admin123"}')

echo $TOKENS | jq .
ACCESS=$(echo $TOKENS | jq -r '.access')
REFRESH=$(echo $TOKENS | jq -r '.refresh')

echo -e "\n=== 3. Acceder con token ==="
curl -s $BASE_URL/socios/ \
  -H "Authorization: Bearer $ACCESS" | jq .

echo -e "\n=== 4. Logout (invalidar refresh) ==="
curl -s -X POST $BASE_URL/socios/auth/logout/ \
  -H "Authorization: Bearer $ACCESS" \
  -H "Content-Type: application/json" \
  -d "{\"refresh\": \"$REFRESH\"}" | jq .

echo -e "\n=== 5. Intentar usar refresh token invalidado ==="
curl -s -X POST $BASE_URL/token/refresh/ \
  -H "Content-Type: application/json" \
  -d "{\"refresh\": \"$REFRESH\"}" | jq .
```

### Entregable Parte 3:
- Captura del script `test_jwt.sh` ejecutándose mostrando todo el flujo
- Explicación de qué sucede en el paso 5 y por qué

## Recursos y Documentación

- **Documentación oficial Simple JWT**: https://django-rest-framework-simplejwt.readthedocs.io/
- **RFC 7519 (JWT)**: https://tools.ietf.org/html/rfc7519
- **OWASP JWT Security Cheat Sheet**: https://cheatsheetseries.owasp.org/cheatsheets/JSON_Web_Token_for_Java_Cheat_Sheet.html

## Criterios de Evaluación

| Criterio | Puntuación |
|----------|-----------|
| Parte 1: Configuración correcta | 3 puntos |
| Parte 2: Endpoints protegidos funcionando | 3 puntos |
| Parte 3: Logout y blacklist operativo | 4 puntos |
| **Total** | **10 puntos** |
