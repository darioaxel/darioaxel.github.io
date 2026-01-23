---
title: UT08 Aplicaciones web híbridas
icon: computer
---

# UT08 Aplicaciones web híbridas: NUXT
![En construcción](/images/under-construction.jpg)

> **En este tema trabajaremos los siguientes RAs:**
> RA9. Desarrolla aplicaciones Web híbridas seleccionando y utilizando tecnologías, frameworks servidor y repositorios heterogéneos de información.

## 1. Introducción a las aplicaciones web híbridas

Las aplicaciones web híbridas combinan las ventajas del **renderizado del lado del servidor (SSR)** y las **aplicaciones de una sola página (SPA)**, ofreciendo al usuario una experiencia fluida mientras mantienen la capacidad de ser indexadas por motores de búsqueda y optimizadas para rendimiento.

En este contexto, **NUXT** es un framework de Vue.js que nos permite crear aplicaciones universales (renderizadas en servidor y cliente) de forma sencilla, integrándose perfectamente con backends heterogéneos como Django, FastAPI o cualquier API REST.

## 2. ¿Por qué NUXT para aplicaciones híbridas?

### 2.3. ¿Qué es SSR y por qué lo necesitamos?

Una vez que trasladamos la mayoría de la lógica al lado del cliente, el navegador tuvo problemas para renderizar todo en un tiempo razonable. Solo los servidores de alto rendimiento podían hacer frente a toneladas de código JavaScript, numerosas vistas y varios componentes; en los demás casos, las métricas de rendimiento estaban por debajo de las expectativas.

Una situación similar afecta al SEO. Cuando el navegador es responsable de renderizar HTML, todos los rastreadores tienen problemas para analizarlo.

Estas son las razones por las que surgió SSR. Gracias a él, podemos renderizar (o renderizar parcialmente) páginas en el lado del servidor, y el servidor genera markup para el lado del cliente. En este caso, el framework lo manejará y lo usará como una especie de vista inicial para las interacciones futuras. Además, el servidor puede renderizar el HTML, por lo que el SEO ya no es un problema.

#### 2.3.1. ¿Cómo funciona realmente?

Independientemente de los frameworks, el renderizado del lado del servidor siempre funciona de la misma manera. Cuando visitamos una página ingresando la URL o actualizándola, estamos recibiendo el markup desde el servidor (SSR). Ahora, cuando navegamos por la aplicación, usamos solo el renderizado del lado del cliente como se requiere HTML que ya está aquí, por lo que el servidor no tiene que estar involucrado más. Todo el proceso consta de dos partes esenciales: el renderizado en sí mismo y la hidratación.

![Proceso de renderizado SSR](https://images.contentstack.io/v3/assets/bltb1a38d5d52a9d1a1/blt38283e7c50f84f91/65d73a85286b17f5dcf03e0b/s_EBC6498B0454D5E5DFBC9B3DCE56336E80BD88251485789B45CAE29C1AD1F660_1601634543361_ssr-1.jpg?width=768&auto=webp&format=pjpg&disable=upscale&quality=100&dpr=2)

El proceso de renderizado es manejado por el servidor (normalmente escrito en express.js). Los frameworks modernos lo gestionan mediante una función especial que toma los componentes y los renderiza a string o por el router que te devuelve los componentes renderizados y coincidentes (por la ruta actual).

![Carga de datos asíncronos en SSR](https://images.contentstack.io/v3/assets/bltb1a38d5d52a9d1a1/bltcb6b11d6ca33f7b5/65d73a869169d832e2ddf4e9/s_EBC6498B0454D5E5DFBC9B3DCE56336E80BD88251485789B45CAE29C1AD1F660_1601640505972_ssr-2.jpg?width=768&auto=webp&format=pjpg&disable=upscale&quality=100&dpr=2)

Una vez que tenemos los componentes que queremos renderizar en la página, obviamente nos gustaría cargar algunos datos de forma asíncrona y aquí necesitamos ir más allá de los frameworks.

Cada componente que necesita algunos datos externos generalmente necesita implementar una función dedicada responsable de obtenerlos. Debido a que tenemos acceso a los componentes renderizados, podemos llamar a esta función para cada componente y cuando todas las peticiones están listas, podemos enviar el markup completado al cliente.

![Proceso de hidratación](https://images.contentstack.io/v3/assets/bltb1a38d5d52a9d1a1/bltfc1f67368bbe05ac/65d73a86a083a22d9f475fe9/s_EBC6498B0454D5E5DFBC9B3DCE56336E80BD88251485789B45CAE29C1AD1F660_1601653993119_ssr-3.jpg?width=768&auto=webp&format=pjpg&disable=upscale&quality=100&dpr=2)

El HTML renderizado acaba de llegar al navegador. ¿Ahora qué? Bueno... ahora el proceso de hidratación toma el control. Un markup que proviene del servidor ya contiene los datos dentro y su representación cruda en algún campo de window, normalmente llamado `_INITIAL_STATE_`.

La hidratación tiene dos objetivos principales: registrar el markup recibido al framework (registrar eventos, campos, componentes, etc.) y asignar los datos a las propiedades apropiadas en el lado del cliente. El primer objetivo el framework lo hace automáticamente, pero el segundo es algo que necesitamos cuidar.

En el lado del servidor, el framework tiene los datos asignados a las variables, pero ahora, en el lado del cliente, necesitamos hacerlo de nuevo ya que los únicos datos que tenemos están incluidos en el HTML renderizado o pasados al estado inicial en el objeto window.

---

::: note
**Integración con NUXT 4:**
En Nuxt 4, este proceso está completamente automatizado mediante el Nitro Engine. Los componentes en la carpeta `.server/` se renderizan automáticamente en el servidor, mientras que `.client/` permanecen exclusivamente del lado del cliente. La hidratación es gestionada por el `useAsyncData` y `useFetch` composables, que serializan automáticamente los datos en el estado inicial.
:::

### 2.4. Ventajas de combinar NUXT con múltiples backends

NUXT brilla especialmente cuando necesitas integrar **repositorios heterogéneos de información**. Puedes consumir simultáneamente:

- **Django API REST** (autenticación JWT, datos principales)
- **FastAPI microservice** (procesamiento en tiempo real)
- **Supabase/Firebase** (datos en tiempo real, chats)
- **Apollo GraphQL** (consultas flexibles)
- **APIs públicas** (GitHub, OpenWeather, etc.)

Cada backend puede tener su propio mecanismo de autenticación y Nuxt actúa como **orquestador universal**, renderizando el HTML inicial desde el servidor mientras mantiene la reactividad de una SPA en el cliente.

## 3. Configuración inicial de Nuxt 4 con Django

### 3.1. Estructura del proyecto

```
proyecto-hibrido/
├── backend/                   # Django API
│   ├── manage.py
│   ├── db.sqlite3
│   └── api/
│       ├── settings.py
│       ├── urls.py
│       └── jwt_app/          # App con JWT (del tema anterior)
├── frontend/                  # Nuxt 4
│   ├── nuxt.config.ts
│   ├── app.vue
│   ├── pages/
│   │   ├── index.vue
│   │   ├── login.vue
│   │   └── panel.vue
│   ├── composables/
│   │   └── useAuth.ts
│   └── server/
│       └── api/
│           └── auth/
│               └── login.post.ts
└── .env
```

### 3.2. Instalación de Nuxt

```bash
# Desde la carpeta raíz
npx nuxi@latest init frontend
cd frontend
npm install
npm run dev
```

### 3.3. Configuración de entorno

**frontend/.env**
```env
# Backend API (puede ser Django, FastAPI, etc.)
NUXT_PUBLIC_API_BASE=http://localhost:8000/api

# Para producción con múltiples backends
NUXT_PUBLIC_DJANGO_API=https://api.tudominio.com
NUXT_PUBLIC_ANALYTICS_API=https://stats.tudominio.com
```

**frontend/nuxt.config.ts**
```typescript
export default defineNuxtConfig({
  devtools: { enabled: true },
  
  runtimeConfig: {
    // Variables privadas (solo servidor)
    apiSecret: process.env.API_SECRET,
    
    // Variables públicas (accesibles desde cliente)
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE,
      djangoApi: process.env.NUXT_PUBLIC_DJANGO_API
    }
  },
  
  // Para consumir APIs con CORS
  nitro: {
    routeRules: {
      '/api/**': {
        proxy: { to: `${process.env.NUXT_PUBLIC_API_BASE}/**` }
      }
    }
  }
})
```

## 4. Mini ejemplo: Sistema de autenticación completo

Implementaremos un login que consume el backend Django con JWT del tema anterior.

### 4.1. Composable de autenticación reutilizable

**frontend/composables/useAuth.ts**
```typescript
export const useAuth = () => {
  const accessToken = useCookie<string | null>('access_token', {
    maxAge: 60 * 30, // 30 minutos
    httpOnly: false, // Accesible desde JS para enviar en headers
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax'
  })
  
  const refreshToken = useCookie<string | null>('refresh_token', {
    maxAge: 60 * 60 * 24, // 1 día
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax'
  })

  // Estado reactivo
  const user = useState<User | null>('user', () => null)
  const isAuthenticated = computed(() => !!accessToken.value)

  // Login
  async function login(email: string, password: string) {
    try {
      const { data } = await $fetch<LoginResponse>('/api/auth/login/', {
        method: 'POST',
        baseURL: useRuntimeConfig().public.djangoApi,
        body: { email, password }
      })

      accessToken.value = data.access
      refreshToken.value = data.refresh
      
      // Decodificar JWT para obtener usuario
      const payload = JSON.parse(atob(data.access.split('.')[1]))
      user.value = {
        email: payload.email,
        nombre: payload.nombre,
        id: payload.user_id
      }

      await navigateTo('/panel')
    } catch (error) {
      throw new Error('Credenciales inválidas')
    }
  }

  // Logout
  async function logout() {
    if (refreshToken.value) {
      await $fetch('/api/auth/logout/', {
        method: 'POST',
        baseURL: useRuntimeConfig().public.djangoApi,
        body: { refresh: refreshToken.value }
      })
    }
    
    accessToken.value = null
    refreshToken.value = null
    user.value = null
    await navigateTo('/login')
  }

  // Refrescar token automáticamente
  async function refreshAccessToken() {
    if (!refreshToken.value) throw new Error('No refresh token')

    const { data } = await $fetch<RefreshResponse>('/api/auth/refresh/', {
      method: 'POST',
      baseURL: useRuntimeConfig().public.djangoApi,
      body: { refresh: refreshToken.value }
    })

    accessToken.value = data.access
    return data.access
  }

  return {
    user,
    isAuthenticated,
    login,
    logout,
    refreshAccessToken
  }
}
```

### 4.2. Página de login

**frontend/pages/login.vue**
```vue
<template>
  <div class="login-container">
    <h1>Login Alumnado</h1>
    <form @submit.prevent="handleLogin">
      <input 
        v-model="email" 
        type="email" 
        placeholder="email@cesur.com" 
        required
      >
      <input 
        v-model="password" 
        type="password" 
        placeholder="Contraseña" 
        required
      >
      <button type="submit" :disabled="loading">
        {{ loading ? 'Cargando...' : 'Entrar' }}
      </button>
    </form>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
const { login } = useAuth()
const email = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')

async function handleLogin() {
  try {
    loading.value = true
    error.value = ''
    await login(email.value, password.value)
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

// Si ya está autenticado, redirigir
definePageMeta({
  middleware: ['guest']
})
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
}
input {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
}
button {
  width: 100%;
  padding: 10px;
  background: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;
}
.error {
  color: red;
  margin-top: 10px;
}
</style>
```

### 4.3. Panel protegido

**frontend/pages/panel.vue**
```vue
<template>
  <div>
    <h1>Panel de Control</h1>
    <p>Bienvenido, <strong>{{ user?.nombre }}</strong></p>
    <p>Email: {{ user?.email }}</p>
    
    <h2>Mis cursos</h2>
    <ul v-if="cursos.length">
      <li v-for="curso in cursos" :key="curso.id">
        {{ curso.nombre }} - Nota: {{ curso.nota }}
      </li>
    </ul>
    
    <button @click="logout">Cerrar sesión</button>
  </div>
</template>

<script setup lang="ts">
const { user, logout } = useAuth()
const cursos = ref([])

// Middleware de autenticación
definePageMeta({
  middleware: ['auth']
})

// Obtener datos del backend Django
onMounted(async () => {
  try {
    const config = useRuntimeConfig()
    cursos.value = await $fetch('/cursos/', {
      baseURL: config.public.djangoApi,
      headers: {
        'Authorization': `Bearer ${useCookie('access_token').value}`
      }
    })
  } catch (error) {
    console.error('Error al cargar cursos:', error)
  }
})
</script>
```

### 4.4. Middleware de protección de rutas

**frontend/middleware/auth.ts**
```typescript
export default defineNuxtRouteMiddleware((to, from) => {
  const { isAuthenticated } = useAuth()
  
  if (!isAuthenticated.value) {
    return navigateTo('/login')
  }
})
```

**frontend/middleware/guest.ts** (para rutas de invitados)
```typescript
export default defineNuxtRouteMiddleware((to, from) => {
  const { isAuthenticated } = useAuth()
  
  if (isAuthenticated.value) {
    return navigateTo('/panel')
  }
})
```

### 4.5. Plugin de interceptores HTTP (opcional avanzado)

**frontend/plugins/api.ts**
```typescript
export default defineNuxtPlugin(() => {
  const { refreshAccessToken, logout } = useAuth()
  
  globalThis.$api = $fetch.create({
    baseURL: useRuntimeConfig().public.djangoApi,
    async onRequest({ options }) {
      const token = useCookie('access_token').value
      if (token) {
        options.headers = {
          ...options.headers,
          'Authorization': `Bearer ${token}`
        }
      }
    },
    async onResponseError({ response }) {
      // Si el token expiró (401), intentar refrescar
      if (response.status === 401) {
        try {
          await refreshAccessToken()
          // Reintenta la petición
          return $api(response.url, { method: response.request.method })
        } catch {
          await logout()
        }
      }
    }
  })
})
```

## 5. Despliegue en entornos heterogéneos

### 5.1. Multi-backend en producción

**frontend/server/api/analytics.get.ts** (backend propio de Nuxt)
```typescript
export default defineEventHandler(async (event) => {
  // Conecta a otro servicio (ej: Analytics)
  const config = useRuntimeConfig()
  
  const data = await $fetch('/stats', {
    baseURL: config.analyticsApi,
    headers: getHeaders(event)
  })
  
  return data
})
```

### 5.2. Dockerización completa

**docker-compose.yml**
```yaml
version: '3.8'

services:
  db:
    image: postgres:15
    environment:
      POSTGRES_DB: cesur_db
      POSTGRES_USER: admin
      POSTGRES_PASSWORD: ${DB_PASSWORD}
  
  backend:
    build: ./backend
    ports:
      - "8000:8000"
    depends_on:
      - db
    environment:
      DATABASE_URL: postgres://admin:${DB_PASSWORD}@db:5432/cesur_db
  
  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    depends_on:
      - backend
    environment:
      NUXT_PUBLIC_DJANGO_API: http://backend:8000/api
```

## 6. Ejercicios prácticos para el aula

### Ejercicio 1: Configuración multi-backend (30 min)
Añade un segundo backend (ej: API pública de GitHub) que muestre los repositorios del usuario autenticado. Configura en `nuxt.config.ts` la URL base y crea un composable `useGitHub.ts`.

### Ejercicio 2: Gestión de errores global (60 min)
Crea un middleware que capture errores 401 (no autorizado) y 403 (prohibido) y redirija automáticamente al login o muestre una página de error específica.

### Ejercicio 3: Offline-first con IndexedDB (90 min)
Implementa una caché local usando IndexedDB para guardar los cursos del alumno. Cuando el cliente esté offline, mostrar los datos de la caché y sincronizar cuando vuelva online.

**Pista:**
```typescript
// composables/useCache.ts
const cursosCache = useIndexedDB('cursos', 1)

async function getCursos() {
  try {
    const cursos = await $fetch('/cursos/')
    await cursosCache.set('lista', cursos)
    return cursos
  } catch {
    return await cursosCache.get('lista') || []
  }
}
```

### Ejercicio 4: Auditoría de seguridad (45 min)
Analiza este código y detecta vulnerabilidades:
```typescript
// pages/admin.vue
<script setup>
const config = useRuntimeConfig()
// Usando API key directamente en cliente
const apiKey = config.public.analyticsApiKey
</script>
```

**Preguntas:**
1. ¿Cuál es el problema? (Expone claves sensibles)
2. ¿Cómo lo arreglas? (Mover a server/api/)
3. ¿Qué diferencia hay entre `runtimeConfig` y variables de entorno?

## 7. Tabla de decisiones: ¿Cuándo usar Nuxt?

| Caso de uso | Nuxt 4 | Vue SPA | Django Templates | Angular |
|-------------|--------|---------|------------------|---------|
| **SEO crítico** | ✅ Excelente | ❌ Malo | ✅ Bueno | ⚠️ Parcial |
| **APIs múltiples** | ✅ Perfecto | ✅ Bueno | ⚠️ Difícil | ✅ Bueno |
| **Equipo Vue.js** | ✅ Idioma nativo | ✅ Nativo | ❌ Diferente paradigma | ❌ Diferente |
| **Rendimiento inicial** | ✅ SSR/SSG | ❌ Lentitud inicial | ✅ Rápido | ⚠️ Pesado |
| **Curva aprendizaje** | ⚠️ Media | ✅ Baja | ✅ Baja | ❌ Alta |

## 8. Recursos oficiales

- **Documentación Nuxt 4**: https://nuxt.com/docs
- **Guía de autenticación**: https://nuxt.com/docs/guide/authentication
- **Ejemplos oficiales**: https://github.com/nuxt/examples
- **Nuxt DevTools**: https://devtools.nuxt.com/
- **Módulo de Nuxt para JWT**: https://github.com/sidebase/nuxt-auth


::: note
**Para producción con múltiples backends:**
- Usa `runtimeConfig` para separar variables de entorno por entorno (dev, staging, prod)
- Implementa un API Gateway si tienes más de 3 backends para centralizar autenticación
- Considera NuxtHub para despliegue sin configuración en Vercel o Cloudflare Pages
:::

## 9. Glosario de términos de desarrollo web avanzado

| Término | Definición | Uso práctico en el proyecto |
| --------- | ------------ |---------------------------- |
| **API Gateway** | Patrón de arquitectura que actúa como único punto de entrada para múltiples microservicios, gestionando autenticación, rate limiting y enrutado. | Centraliza el acceso a Django API, FastAPI y Supabase desde Nuxt. |
| **Buildtime** | Momento en que el código se compila y optimiza (contrasta con Runtime). Las decisiones tomadas aquí no se pueden cambiar sin recompilar. | Configuración de Nuxt en `nuxt.config.ts`, generación de rutas estáticas. |
| **Bundle** | Archivo único generado al compilar el frontend que contiene todo el JavaScript, CSS y assets. | `dist/_nuxt/` en Nuxt, optimizado por Vite/Rollup. |
| **Cache-busting** | Técnica para invalidar caché del navegador añadiendo hash al nombre de archivos (ej: `app.a1b2c3.js`). | Nuxt lo hace automáticamente en producción. |
| **CORS** (Cross-Origin Resource Sharing) | Mecanismo de seguridad que permite o deniega peticiones de otros dominios. Configurar en backend Django con `corsheaders`. | `CORS_ALLOWED_ORIGINS = ['http://localhost:3000']` para Nuxt. |
| **Composable** | Función reutilizable en Vue 3/Nuxt que encapsula lógica con estado reactivo (ej: `useAuth()`, `useFetch()`). | `composables/useAuth.ts` para gestionar JWT. |
| **CSRF** (Cross-Site Request Forgery) | Ataque que fuerza al usuario autenticado a ejecutar acciones no deseadas en otro sitio. | Protegido con `samesite='Lax'` en cookies y tokens CSRF en Django. |
| **CSR** (Client-Side Rendering) | Renderizado en el navegador. El servidor envía HTML vacío y JavaScript construye la página. | SPA tradicional, sin SEO. |
| **Hydration** (Hidratación) | Proceso por el que el framework (Vue) "activa" el HTML estático generado por el servidor, añadiendo interactividad y estado. | Nuxt transforma HTML estático en SPA automáticamente tras la carga inicial. |
| **Hook** | Función de ciclo de vida que se ejecuta en momentos específicos (ej: `onMounted`, `definePageMeta`). | `onMounted` para cargar datos tras la hidratación. |
| **Isomorphic / Universal** | Código que se ejecuta tanto en servidor como en cliente (ej: validaciones, utilidades). | Validación de formularios en `composables/` compartidos. |
| **JWT** (JSON Web Token) | Token firmado que contiene información del usuario, usado para autenticación sin estado. | `access_token` y `refresh_token` entre Nuxt y Django. |
| **Lazy-loading** | Cargar recursos solo cuando se necesitan (imágenes, componentes, rutas). | `defineAsyncComponent` en Vue o imágenes con `loading="lazy"`. |
| **Middleware** | Función que se ejecuta antes de renderizar una ruta o petición (en Nuxt o Django). | Protección de rutas `/panel` en `middleware/auth.ts`. |
| **Prefetching** | Cargar recursos antes de que el usuario los necesite (hover sobre links). | Nuxt lo hace automáticamente en enlaces `<NuxtLink>`. |
| **Props** | Propiedades pasadas de padre a hijo en componentes Vue. | `:user="user"` en componentes de panel. |
| **Rate Limiting** | Limitar el número de peticiones por IP/usuario para evitar abusos. | `django-ratelimit` en login, `rate-limit` en Nuxt server API. |
| **Runtime** | Momento de ejecución del código. Las decisiones aquí son dinámicas. | Validar JWT en cada petición, cambiar tema oscuro/claro. |
| **SPA** (Single Page Application) | Aplicación que carga una vez y navega sin recargar la página completa. | Interacción post-login en `/panel`. |
| **SSG** (Static Site Generation) | Generar páginas HTML estáticas en buildtime. Ideal para contenido que no cambia. | Blog institucional, landing page de la FP. |
| **SSR** (Server-Side Rendering) | Renderizar HTML en el servidor para cada petición. Mejora SEO y velocidad inicial. | Página de login y panel de Nuxt con `ssr: true`. |
| **State** | Datos reactivos que definen el estado de la aplicación. | `const user = useState('user', () => null)` |
| **Store** (Pinia/Vuex) | Gestor centralizado de estado para toda la aplicación. | `stores/auth.ts` con Pinia en proyectos complejos. |
| **Tree-shaking** | Eliminar código muerto no utilizado del bundle final. | Nuxt + Vite eliminan automáticamente componentes y funciones no usados. |
