---
title: Anexo VII. Sistemas de Cookies y Autenticación en Django
date: 2026-03-02
icon: code-branch
order: -9
---

## Anexo VII: Sistemas de Cookies y Autenticación en Django

## 1. Introducción: De la sesión anónima al usuario identificado

En aplicaciones web modernas, necesitamos **mantener estado** entre peticiones HTTP (que son intrínsecamente sin estado). Las **cookies** y los **sistemas de autenticación** son los mecanismos fundamentales que permiten:

- Recordar preferencias del usuario entre visitas
- Mantener sesiones de compra en e-commerce
- Identificar quién realiza cada acción en la aplicación
- Controlar el acceso a recursos protegidos

Django incluye un sistema de autenticación completo "batteries included" basado en **sesiones** (almacenadas en cookies) y un modelo de **usuarios** extensible. En este anexo implementaremos un flujo completo: desde el login tradicional hasta APIs con autenticación por token.

### 1.1. Estructura del proyecto de ejemplo

Partiremos del proyecto `MyOng` anterior, añadiendo una aplicación `accounts` para gestión de usuarios:

```
myong/
├── accounts/                 # Nueva app de autenticación
│   ├── __init__.py
│   ├── views.py
│   ├── urls.py
│   ├── forms.py
│   └── templates/
│       └── accounts/
│           ├── login.html
│           ├── registro.html
│           └── perfil.html
├── socios/
├── myong/
│   ├── settings.py
│   └── urls.py
└── templates/
    └── base.html
```

### 1.2. Creación de la aplicación accounts

```bash
cd myong
poetry run python manage.py startapp accounts
```

Registra la aplicación en `settings.py`:

```python
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',        # Ya incluido
    'django.contrib.contenttypes',
    'django.contrib.sessions',    # Ya incluido - gestiona cookies
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'socios',
    'accounts',                   # Añade esta línea
]
```

:::note
 `django.contrib.auth` y `django.contrib.sessions` suelen estar ya incluidos en el `INSTALLED_APPS` por defecto. Verifica que no estén duplicados.
:::


## 2. Sistema de sesiones: El corazón de las cookies en Django

Django maneja las sesiones mediante **cookies seguras** que contienen un identificador de sesión (sessionid). Los datos reales se almacenan en el servidor (por defecto en la base de datos).

### 2.1. Configuración de sesiones en settings.py

```python
# myong/settings.py

# Cookie de sesión segura (solo HTTPS en producción)
SESSION_COOKIE_SECURE = False           # True en producción con HTTPS
SESSION_COOKIE_HTTPONLY = True          # No accesible desde JavaScript
SESSION_COOKIE_SAMESITE = 'Lax'         # Protección CSRF básica
SESSION_COOKIE_AGE = 1209600            # 2 semanas en segundos

# Motor de sesiones (por defecto usa base de datos)
SESSION_ENGINE = 'django.contrib.sessions.backends.db'

# Redirecciones post-login/logout
LOGIN_REDIRECT_URL = 'perfil'
LOGOUT_REDIRECT_URL = 'login'
LOGIN_URL = 'login'
```

### 2.2. Crear las tablas de sesiones

```bash
poetry run python manage.py migrate
```

Esto crea la tabla `django_session` donde se almacenan los datos de sesión.

### 2.3. Vista de ejemplo: Contador de visitas sin autenticación

Creamos una vista que demuestra cómo Django usa cookies para mantener estado, incluso sin usuario logueado:

```python
# accounts/views.py
from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib import messages


def contador_visitas(request):
    """
    Demuestra el uso de sesiones sin autenticación.
    Cada visitante anónimo obtiene un contador persistente vía cookie.
    """
    # Obtener contador actual de la sesión (o 0 si no existe)
    visitas = request.session.get('contador_visitas', 0)
    
    # Incrementar y guardar
    visitas += 1
    request.session['contador_visitas'] = visitas
    
    # Guardar timestamp de primera visita
    if visitas == 1:
        request.session['primera_visita'] = str(timezone.now())
    
    return render(request, 'accounts/contador.html', {
        'visitas': visitas,
        'session_id': request.session.session_key,
        'primera_visita': request.session.get('primera_visita'),
    })
```

Template correspondiente (`accounts/templates/accounts/contador.html`):

```html
{% extends 'base.html' %}

{% block content %}
<div class="container mt-5">
    <h2>🍪 Demo de Sesiones y Cookies</h2>
    
    <div class="card mt-4">
        <div class="card-body">
            <h5 class="card-title">Contador de visitas</h5>
            <p class="display-4">{{ visitas }}</p>
            
            <hr>
            
            <dl class="row">
                <dt class="col-sm-3">ID de Sesión:</dt>
                <dd class="col-sm-9"><code>{{ session_id }}</code></dd>
                
                <dt class="col-sm-3">Primera visita:</dt>
                <dd class="col-sm-9">{{ primera_visita|default:"Justo ahora" }}</dd>
                
                <dt class="col-sm-3">Cookie activa:</dt>
                <dd class="col-sm-9">
                    {% if request.session.session_key %}
                        ✅ Sí (revisa herramientas de desarrollador → Application → Cookies)
                    {% else %}
                        ❌ No
                    {% endif %}
                </dd>
            </dl>
        </div>
    </div>
    
    <div class="alert alert-info mt-3">
        <strong>Experimento:</strong> Abre las herramientas de desarrollador (F12) → 
        Application → Cookies → localhost. Busca la cookie <code>sessionid</code>.
        Si borras esa cookie, el contador se reiniciará.
    </div>
</div>
{% endblock %}
```

Añade la URL en `accounts/urls.py`:

```python
from django.urls import path
from . import views

urlpatterns = [
    path('demo-sesion/', views.contador_visitas, name='demo_sesion'),
]
```

Y en el `urls.py` principal del proyecto:

```python
urlpatterns = [
    path('admin/', admin.site.urls),
    path('socios/', include('socios.urls')),
    path('api/', include('socios.urls_api')),
    path('accounts/', include('accounts.urls')),  # Nuevas URLs de auth
]
```

## 3. Sistema de autenticación tradicional: Login/Logout

Django proporciona vistas, formularios y URLs predefinidas para autenticación, pero crearemos las nuestras para entender el flujo completo.

### 3.1. Formulario de login personalizado

```python
# accounts/forms.py
from django import forms
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib.auth.models import User


class LoginForm(AuthenticationForm):
    """Formulario de login con estilos Bootstrap"""
    username = forms.CharField(
        widget=forms.TextInput(attrs={
            'class': 'form-control',
            'placeholder': 'Nombre de usuario'
        })
    )
    password = forms.CharField(
        widget=forms.PasswordInput(attrs={
            'class': 'form-control', 
            'placeholder': 'Contraseña'
        })
    )
    remember_me = forms.BooleanField(
        required=False,
        widget=forms.CheckboxInput(attrs={'class': 'form-check-input'}),
        label="Mantener sesión iniciada"
    )


class RegistroForm(UserCreationForm):
    """Formulario de registro extendido"""
    email = forms.EmailField(
        required=True,
        widget=forms.EmailInput(attrs={'class': 'form-control'})
    )
    first_name = forms.CharField(
        max_length=30,
        required=False,
        widget=forms.TextInput(attrs={'class': 'form-control'}),
        label="Nombre"
    )
    last_name = forms.CharField(
        max_length=30, 
        required=False,
        widget=forms.TextInput(attrs={'class': 'form-control'}),
        label="Apellidos"
    )

    class Meta:
        model = User
        fields = ('username', 'first_name', 'last_name', 'email', 'password1', 'password2')
        
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        # Aplicar clase form-control a todos los campos
        for field in self.fields.values():
            if 'class' not in field.widget.attrs:
                field.widget.attrs['class'] = 'form-control'
```

### 3.2. Vistas de autenticación

```python
# accounts/views.py (añadir al archivo existente)
from django.utils import timezone
from .forms import LoginForm, RegistroForm


def login_view(request):
    """
    Vista de login personalizada.
    Maneja autenticación y configuración de sesión.
    """
    if request.user.is_authenticated:
        return redirect('perfil')
    
    if request.method == 'POST':
        form = LoginForm(request, data=request.POST)
        if form.is_valid():
            user = form.get_user()
            login(request, user)
            
            # Gestión de "Recordarme"
            if not form.cleaned_data.get('remember_me'):
                # Sesión expira al cerrar navegador
                request.session.set_expiry(0)
            else:
                # Usar duración por defecto (2 semanas)
                request.session.set_expiry(None)
            
            messages.success(request, f'¡Bienvenido, {user.username}!')
            
            # Redirigir a página solicitada originalmente (o perfil por defecto)
            next_url = request.GET.get('next')
            if next_url:
                return redirect(next_url)
            return redirect('perfil')
        else:
            messages.error(request, 'Usuario o contraseña incorrectos.')
    else:
        form = LoginForm()
    
    return render(request, 'accounts/login.html', {'form': form})


def logout_view(request):
    """Cierra sesión y elimina la cookie de sesión"""
    logout(request)
    messages.info(request, 'Has cerrado sesión correctamente.')
    return redirect('login')


def registro_view(request):
    """Registro de nuevos usuarios"""
    if request.user.is_authenticated:
        return redirect('perfil')
        
    if request.method == 'POST':
        form = RegistroForm(request.POST)
        if form.is_valid():
            user = form.save()
            messages.success(request, 'Cuenta creada. Ahora puedes iniciar sesión.')
            return redirect('login')
    else:
        form = RegistroForm()
    
    return render(request, 'accounts/registro.html', {'form': form})


@login_required
def perfil_view(request):
    """
    Vista protegida: solo usuarios autenticados.
    El decorador @login_required verifica la sesión automáticamente.
    """
    # Información de la sesión actual
    session_info = {
        'session_key': request.session.session_key,
        'fecha_expiracion': request.session.get_expiry_date(),
        'tiempo_restante': request.session.get_expiry_age(),
    }
    
    return render(request, 'accounts/perfil.html', {
        'session_info': session_info,
        'user': request.user,
    })
```

### 3.3. Templates de autenticación

**Login** (`accounts/templates/accounts/login.html`):

```html
{% extends 'base.html' %}

{% block content %}
<div class="row justify-content-center mt-5">
    <div class="col-md-4">
        <div class="card shadow">
            <div class="card-header bg-primary text-white">
                <h4 class="mb-0">Iniciar Sesión</h4>
            </div>
            <div class="card-body">
                {% if messages %}
                    {% for message in messages %}
                        <div class="alert alert-{{ message.tags }}">{{ message }}</div>
                    {% endfor %}
                {% endif %}
                
                <form method="post" action="{% url 'login' %}">
                    {% csrf_token %}
                    
                    <div class="mb-3">
                        <label class="form-label">Usuario</label>
                        {{ form.username }}
                    </div>
                    
                    <div class="mb-3">
                        <label class="form-label">Contraseña</label>
                        {{ form.password }}
                    </div>
                    
                    <div class="mb-3 form-check">
                        {{ form.remember_me }}
                        <label class="form-check-label">{{ form.remember_me.label }}</label>
                    </div>
                    
                    <input type="hidden" name="next" value="{{ request.GET.next }}">
                    
                    <button type="submit" class="btn btn-primary w-100">Entrar</button>
                </form>
                
                <hr>
                <p class="text-center mb-0">
                    ¿No tienes cuenta? <a href="{% url 'registro' %}">Regístrate</a>
                </p>
            </div>
        </div>
        
        <div class="mt-3 text-center">
            <a href="{% url 'demo_sesion' %}" class="text-muted">→ Ver demo de sesiones sin login</a>
        </div>
    </div>
</div>
{% endblock %}
```

**Perfil** (`accounts/templates/accounts/perfil.html`):

```html
{% extends 'base.html' %}

{% block content %}
<div class="container mt-5">
    <div class="row">
        <div class="col-md-8">
            <h2>👤 Perfil de Usuario</h2>
            
            <div class="card mt-4">
                <div class="card-body">
                    <h5 class="card-title">Información de cuenta</h5>
                    <table class="table table-borderless">
                        <tr>
                            <td width="30%"><strong>Usuario:</strong></td>
                            <td>{{ user.username }}</td>
                        </tr>
                        <tr>
                            <td><strong>Email:</strong></td>
                            <td>{{ user.email }}</td>
                        </tr>
                        <tr>
                            <td><strong>Nombre:</strong></td>
                            <td>{{ user.first_name|default:"No especificado" }}</td>
                        </tr>
                        <tr>
                            <td><strong>Apellidos:</strong></td>
                            <td>{{ user.last_name|default:"No especificado" }}</td>
                        </tr>
                        <tr>
                            <td><strong>Fecha registro:</strong></td>
                            <td>{{ user.date_joined|date:"d/m/Y H:i" }}</td>
                        </tr>
                        <tr>
                            <td><strong>Último login:</strong></td>
                            <td>{{ user.last_login|date:"d/m/Y H:i"|default:"Nunca" }}</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
        
        <div class="col-md-4">
            <div class="card bg-light">
                <div class="card-header">🔒 Información de Sesión</div>
                <div class="card-body">
                    <p><strong>Session ID:</strong><br>
                    <code class="small">{{ session_info.session_key|default:"N/A" }}</code></p>
                    
                    <p><strong>Expira:</strong><br>
                    {{ session_info.fecha_expiracion|date:"d/m/Y H:i" }}</p>
                    
                    <p><strong>Segundos restantes:</strong><br>
                    {{ session_info.tiempo_restante }}</p>
                    
                    <hr>
                    <a href="{% url 'logout' %}" class="btn btn-danger btn-sm w-100">
                        Cerrar Sesión
                    </a>
                </div>
            </div>
        </div>
    </div>
</div>
{% endblock %}
```

### 3.4. URLs de autenticación

Actualiza `accounts/urls.py`:

```python
from django.urls import path
from . import views

urlpatterns = [
    path('demo-sesion/', views.contador_visitas, name='demo_sesion'),
    path('login/', views.login_view, name='login'),
    path('logout/', views.logout_view, name='logout'),
    path('registro/', views.registro_view, name='registro'),
    path('perfil/', views.perfil_view, name='perfil'),
]
```

## 4. Protección de vistas y permisos

### 4.1. Decoradores de acceso

Django proporciona decoradores para controlar el acceso:

```python
# accounts/views.py (ejemplos adicionales)

from django.contrib.admin.views.decorators import staff_member_required
from django.contrib.auth.decorators import login_required, permission_required
from django.http import HttpResponseForbidden


@login_required
def area_socios(request):
    """
    Solo usuarios autenticados.
    Redirige a login si no hay sesión activa.
    """
    return render(request, 'accounts/area_socios.html')


@staff_member_required
def panel_admin(request):
    """
    Solo usuarios con is_staff=True (personal administrativo).
    """
    return render(request, 'accounts/panel_admin.html')


@permission_required('socios.view_socio', raise_exception=True)
def listado_socios_privado(request):
    """
    Requiere permiso específico del modelo Socio.
    Genera 403 si tiene sesión pero no el permiso.
    """
    socios = Socio.objects.all()
    return render(request, 'accounts/socios_list.html', {'socios': socios})
```

### 4.2. Mixins para vistas basadas en clases

```python
from django.contrib.auth.mixins import LoginRequiredMixin, UserPassesTestMixin
from django.views.generic import ListView, DetailView
from socios.models import Socio


class SocioListView(LoginRequiredMixin, ListView):
    """
    CBV que requiere autenticación.
    Configuración alternativa al decorador @login_required.
    """
    model = Socio
    template_name = 'socios/list.html'
    login_url = 'login'  # Dónde redirigir si no está autenticado


class AdminRequiredMixin(UserPassesTestMixin):
    """Mixin personalizado para verificar rol de administrador"""
    def test_func(self):
        return self.request.user.is_staff


class SocioAdminView(AdminRequiredMixin, ListView):
    """Solo accesible para staff"""
    model = Socio
    template_name = 'socios/admin_list.html'
```


## 5. Autenticación en APIs REST

Para APIs, el sistema de sesiones/cookies no siempre es adecuado (especialmente para apps móviles o SPAs). Implementaremos **Token Authentication** con DRF.

### 5.1. Instalación y configuración

```bash
poetry add djangorestframework
```

Configuración en `settings.py`:

```python
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.SessionAuthentication',  # Web browser
        'rest_framework.authentication.TokenAuthentication',    # API clients
    ],
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticated',  # Por defecto requiere auth
    ],
}
```

### 5.2. Modelo de Token

Ejecuta migraciones (DRF crea automáticamente la tabla de tokens):

```bash
poetry run python manage.py migrate
```

### 5.3. Endpoints de autenticación API

Creamos un archivo `accounts/api_auth.py`:

```python
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework import status
from django.contrib.auth import authenticate
from django.contrib.auth.models import User


@api_view(['POST'])
@permission_classes([AllowAny])
def api_login(request):
    """
    Endpoint para obtener token de autenticación.
    
    POST /api/auth/login/
    {
        "username": "usuario",
        "password": "contraseña"
    }
    
    Response:
    {
        "token": "9944b09199c62bcf9418ad846dd0e4bbdfc6ee4b",
        "user_id": 1,
        "username": "usuario"
    }
    """
    username = request.data.get('username')
    password = request.data.get('password')
    
    if not username or not password:
        return Response(
            {'error': 'Se requieren username y password'}, 
            status=status.HTTP_400_BAD_REQUEST
        )
    
    user = authenticate(username=username, password=password)
    
    if not user:
        return Response(
            {'error': 'Credenciales inválidas'},
            status=status.HTTP_401_UNAUTHORIZED
        )
    
    # Obtener o crear token
    token, created = Token.objects.get_or_create(user=user)
    
    return Response({
        'token': token.key,
        'user_id': user.pk,
        'username': user.username,
        'email': user.email,
        'created': created  # True si es nuevo, False si existía
    })


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def api_logout(request):
    """
    Invalida el token actual.
    Requiere header: Authorization: Token <token>
    """
    request.user.auth_token.delete()
    return Response({'message': 'Token eliminado correctamente'})


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def api_perfil(request):
    """
    Devuelve información del usuario autenticado vía Token.
    """
    user = request.user
    return Response({
        'id': user.id,
        'username': user.username,
        'email': user.email,
        'first_name': user.first_name,
        'last_name': user.last_name,
        'is_staff': user.is_staff,
        'date_joined': user.date_joined,
    })


@api_view(['POST'])
@permission_classes([AllowAny])
def api_registro(request):
    """
    Registro de usuario vía API.
    """
    username = request.data.get('username')
    password = request.data.get('password')
    email = request.data.get('email')
    
    if not all([username, password, email]):
        return Response(
            {'error': 'Se requieren username, password y email'},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    if User.objects.filter(username=username).exists():
        return Response(
            {'error': 'El usuario ya existe'},
            status=status.HTTP_409_CONFLICT
        )
    
    user = User.objects.create_user(
        username=username,
        password=password,
        email=email
    )
    
    token = Token.objects.create(user=user)
    
    return Response({
        'token': token.key,
        'user_id': user.id,
        'username': user.username
    }, status=status.HTTP_201_CREATED)
```

### 5.4. URLs de API de autenticación

Crea `accounts/urls_api.py`:

```python
from django.urls import path
from . import api_auth

urlpatterns = [
    path('auth/login/', api_auth.api_login, name='api_login'),
    path('auth/logout/', api_auth.api_logout, name='api_logout'),
    path('auth/registro/', api_auth.api_registro, name='api_registro'),
    path('auth/perfil/', api_auth.api_perfil, name='api_perfil'),
]
```

Incluye en `urls.py` principal:

```python
urlpatterns = [
    # ... otras URLs ...
    path('api/', include('accounts.urls_api')),  # Auth API endpoints
]
```

## 6. Ejemplos de uso con cURL

### 6.1. Flujo completo de autenticación API

**1. Registro de usuario:**

```bash
curl -X POST http://localhost:8000/api/auth/registro/ \
  -H "Content-Type: application/json" \
  -d '{
    "username": "nuevo_usuario",
    "password": "contraseña_segura123",
    "email": "usuario@example.com"
  }'
```

Respuesta:
```json
{
  "token": "9944b09199c62bcf9418ad846dd0e4bbdfc6ee4b",
  "user_id": 3,
  "username": "nuevo_usuario"
}
```

**2. Login (obtener token):**

```bash
curl -X POST http://localhost:8000/api/auth/login/ \
  -H "Content-Type: application/json" \
  -d '{
    "username": "nuevo_usuario",
    "password": "contraseña_segura123"
  }'
```

**3. Acceder a endpoint protegido:**

```bash
curl http://localhost:8000/api/auth/perfil/ \
  -H "Authorization: Token 9944b09199c62bcf9418ad846dd0e4bbdfc6ee4b"
```

Respuesta:
```json
{
  "id": 3,
  "username": "nuevo_usuario",
  "email": "usuario@example.com",
  "first_name": "",
  "last_name": "",
  "is_staff": false,
  "date_joined": "2024-01-15T10:30:00Z"
}
```

**4. Logout (invalidar token):**

```bash
curl -X POST http://localhost:8000/api/auth/logout/ \
  -H "Authorization: Token 9944b09199c62bcf9418ad846dd0e4bbdfc6ee4b"
```

### 6.2. Comparativa de métodos de autenticación

| Método | Uso ideal | Persistencia | Seguridad |
|--------|-----------|--------------|-----------|
| **Session** | Aplicaciones web tradicionales | Cookie de sesión (2 semanas) | CSRF protection incluida |
| **Token** | APIs, SPAs, apps móviles | Persistente hasta logout | Requiere HTTPS |
| **JWT** | Microservicios, stateless | Token con expiración | Firma criptográfica |


## 7. Seguridad avanzada de cookies

### 7.1. Configuraciones críticas para producción

```python
# settings.py - Configuración de seguridad

# Solo enviar cookies por HTTPS
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True

# Prevenir acceso JavaScript a cookies
SESSION_COOKIE_HTTPONLY = True
CSRF_COOKIE_HTTPONLY = True

# Protección contra CSRF en cookies cross-site
SESSION_COOKIE_SAMESITE = 'Strict'
CSRF_COOKIE_SAMESITE = 'Strict'

# Encriptación de cookies (alternativa a sesiones en BD)
# SESSION_ENGINE = 'django.contrib.sessions.backends.signed_cookies'
```

### 7.2. Protección CSRF en formularios

Django incluye protección CSRF automática. En templates:

```html
<form method="post">
    {% csrf_token %}  <!-- Token oculto obligatorio -->
    <!-- campos del formulario -->
</form>
```

En APIs que usan SessionAuthentication, incluye el header:

```bash
curl -X POST http://localhost:8000/api/endpoint/ \
  -H "X-CSRFToken: <token_desde_cookie_csrftoken>" \
  -H "Cookie: csrftoken=<token>; sessionid=<sessionid>"
```

<!---

## 8. Ejercicios prácticos propuestos

### Ejercicio 1: Extender el modelo de usuario
Crea un modelo `Perfil` vinculado a `User` mediante OneToOneField que almacene:
- Teléfono
- Dirección
- Fecha de nacimiento
- Foto de perfil

### Ejercicio 2: Sistema de "Recuérdame"
Implementa la funcionalidad "Recordarme" en el login que:
- Si se marca: cookie persistente (2 semanas)
- Si no se marca: sesión de navegador (expires=0)

### Ejercicio 3: Middleware de auditoría
Crea un middleware que registre en consola cada petición:
- Usuario (o "Anónimo")
- URL solicitada
- Timestamp
- IP del cliente

### Ejercicio 4: API con permisos por grupo
Extiende la API de socios para que:
- Usuarios normales solo vean sus propios datos
- Staff vea todos los datos
- Solo admin pueda eliminar

---

## 9. Referencias y documentación

- [Django Authentication System](https://docs.djangoproject.com/en/5.0/topics/auth/)
- [Django Session Framework](https://docs.djangoproject.com/en/5.0/topics/http/sessions/)
- [DRF Authentication](https://www.django-rest-framework.org/api-guide/authentication/)
- [OWASP Cookie Security](https://owasp.org/www-community/controls/SecureCookieAttribute)
- [Mozilla Web Security Guidelines](https://infosec.mozilla.org/guidelines/web_security)

-->