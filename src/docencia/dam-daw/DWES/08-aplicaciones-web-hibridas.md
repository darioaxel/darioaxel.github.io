---
title: UT08 Aplicaciones web híbridas
icon: computer
---
# UT08 Aplicaciones web híbridas: NUXT

> **En este tema trabajaremos los siguientes RAs:**
> RA9. Desarrolla aplicaciones Web híbridas seleccionando y utilizando tecnologías, frameworks servidor y repositorios heterogéneos de información.

## 1. Introducción a las aplicaciones web híbridas

Las aplicaciones web híbridas combinan las ventajas del **renderizado del lado del servidor (SSR)** y las **aplicaciones de una sola página (SPA)**, ofreciendo al usuario una experiencia fluida mientras mantienen la capacidad de ser indexadas por motores de búsqueda y optimizadas para rendimiento.

En este contexto, **NUXT** es un framework de Vue.js que nos permite crear aplicaciones universales (renderizadas en servidor y cliente) de forma sencilla, integrándose perfectamente con backends heterogéneos como Django, FastAPI o cualquier API REST.

### 1.1. El ecosistema de frameworks híbridos: Nuxt vs Next.js

Aunque ambos frameworks comparten objetivos similares (SSR, SSG, hidratación), existen diferencias fundamentales que el desarrollador debe conocer para elegir la herramienta adecuada:

| Característica | **Nuxt 4** (Vue) | **Next.js 14+** (React) |
|----------------|------------------|-------------------------|
| **Filosofía** | Convención sobre configuración. Enfoque en developer experience con cero configuración inicial. | Flexibilidad máxima. Permite múltiples patrones (Pages Router, App Router, Server Components). |
| **Motor SSR** | **Nitro Engine**: Servidor universal que funciona en Node, Deno, Bun, Workers, Lambda... | **Turbopack/Turborepo**: Optimizado para Vercel, aunque soporta otros entornos. |
| **Curva de aprendizaje** | Más suave si conoces Vue. Sistema de composables intuitivo. | Más pronunciada. Requiere entender Server Components, Client Components y Suspense. |
| **Backend integrado** | Server routes con Nitro (file-based, auto-imports). | Route handlers en `app/api/` o API Routes en `pages/api/`. |
| **Despliegue** | Universal por diseño. Mismo código funciona en Cloudflare Workers, Vercel, Netlify, Node... | Optimizado para Vercel. Otros entornos requieren configuración adicional (`output: 'standalone'`). |
| **Tamaño bundle** | Generalmente menor. Vue 3 tree-shaking agresivo. | Mayor dependencia de React runtime. Server Components reducen JS enviado al cliente. |
| **Comunidad FP/Django** | Menos ejemplos con Django, pero integración limpia vía APIs. | Más ejemplos de integración backend, pero mayor complejidad. |
| **Hot Module Replacement** | Instantáneo. Vite como bundler por defecto. | Rápido con Turbopack, pero puede ser inconsistente en proyectos grandes. |

**¿Cuándo elegir Nuxt sobre Next.js?**

- Tu equipo ya trabaja con **Vue.js** o viene de **Django Templates/Jinja2** (sintaxis similar).
- Necesitas **desplegar en edge** (Cloudflare Workers, Deno Deploy) sin configuración extra.
- Prefieres **convención sobre configuración**: en Nuxt, poner un archivo en `server/api/` crea automáticamente el endpoint.
- Tu backend es **Django/DRF** y quieres un frontend desacoplado sin añadir complejidad de React.

**¿Cuándo elegir Next.js sobre Nuxt?**

- Tu equipo domina **React** y el ecosistema npm react-specific.
- Usas **Vercel** como plataforma de despliegue (optimización nativa).
- Necesitas **React Server Components** para aplicaciones con muchos datos dinámicos.
- Requieres **Streaming SSR** avanzado con Suspense boundaries complejas.

## 2. ¿Por qué NUXT para aplicaciones híbridas?

### 2.3. ¿Qué es SSR y por qué lo necesitamos?

Una vez que trasladamos la mayoría de la lógica al lado del cliente, el navegador tuvo problemas para renderizar todo en un tiempo razonable. Solo los servidores de alto rendimiento podían hacer frente a toneladas de código JavaScript, numerosas vistas y varios componentes; en los demás casos, las métricas de rendimiento estaban por debajo de las expectativas.

Una situación similar afecta al SEO. Cuando el navegador es responsable de renderizar HTML, todos los rastreadores tienen problemas para analizarlo.

Estas son las razones por las que surgió SSR. Gracias a él, podemos renderizar (o renderizar parcialmente) páginas en el lado del servidor, y el servidor genera markup para el lado del cliente. En este caso, el framework lo manejará y lo usará como una especie de vista inicial para las interacciones futuras. Además, el servidor puede renderizar el HTML, por lo que el SEO ya no es un problema.

#### 2.3.1. ¿Cómo funciona realmente?

Independientemente de los frameworks, el renderizado del lado del servidor siempre funciona de la misma manera. Cuando visitamos una página ingresando la URL o actualizándola, estamos recibiendo el markup desde el servidor (SSR). Ahora, cuando navegamos por la aplicación, usamos solo el renderizado del lado del cliente como se requiere HTML que ya está aquí, por lo que el servidor no tiene que estar involucrado más. Todo el proceso consta de dos partes esenciales: el renderizado en sí mismo y la hidratación.

![Proceso de renderizado SSR](https://images.contentstack.io/v3/assets/bltb1a38d5d52a9d1a1/blt38283e7c50f84f91/65d73a85286b17f5dcf03e0b/s_EBC6498B0454D5E5DFBC9B3DCE56336E80BD88251485789B45CAE29C1AD1F660_1601634543361_ssr-1.jpg?width=768&auto=webp&format=pjpg&disable=upscale&quality=100&dpr=2 )

El proceso de renderizado es manejado por el servidor (normalmente escrito en express.js). Los frameworks modernos lo gestionan mediante una función especial que toma los componentes y los renderiza a string o por el router que te devuelve los componentes renderizados y coincidentes (por la ruta actual).

![Carga de datos asíncronos en SSR](https://images.contentstack.io/v3/assets/bltb1a38d5d52a9d1a1/bltcb6b11d6ca33f7b5/65d73a869169d832e2ddf4e9/s_EBC6498B0454D5E5DFBC9B3DCE56336E80BD88251485789B45CAE29C1AD1F660_1601640505972_ssr-2.jpg?width=768&auto=webp&format=pjpg&disable=upscale&quality=100&dpr=2 )

Una vez que tenemos los componentes que queremos renderizar en la página, obviamente nos gustaría cargar algunos datos de forma asíncrona y aquí necesitamos ir más allá de los frameworks.

Cada componente que necesita algunos datos externos generalmente necesita implementar una función dedicada responsable de obtenerlos. Debido a que tenemos acceso a los componentes renderizados, podemos llamar a esta función para cada componente y cuando todas las peticiones están listas, podemos enviar el markup completado al cliente.

![Proceso de hidratación](https://images.contentstack.io/v3/assets/bltb1a38d5d52a9d1a1/bltfc1f67368bbe05ac/65d73a86a083a22d9f475fe9/s_EBC6498B0454D5E5DFBC9B3DCE56336E80BD88251485789B45CAE29C1AD1F660_1601653993119_ssr-3.jpg?width=768&auto=webp&format=pjpg&disable=upscale&quality=100&dpr=2 )

El HTML renderizado acaba de llegar al navegador. ¿Ahora qué? Bueno... ahora el proceso de hidratación toma el control. Un markup que proviene del servidor ya contiene los datos dentro y su representación cruda en algún campo de window, normalmente llamado `_INITIAL_STATE_`.

La hidratación tiene dos objetivos principales: registrar el markup recibido al framework (registrar eventos, campos, componentes, etc.) y asignar los datos a las propiedades apropiadas en el lado del cliente. El primer objetivo el framework lo hace automáticamente, pero el segundo es algo que necesitamos cuidar.

En el lado del servidor, el framework tiene los datos asignados a las variables, pero ahora, en el lado del cliente, necesitamos hacerlo de nuevo ya que los únicos datos que tenemos están incluidos en el HTML renderizado o pasados al estado inicial en el objeto window.

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

## 3. Nitro Engine: El servidor universal de Nuxt

Nitro es el motor que impulsa Nuxt 4, reemplazando la arquitectura anterior basada en Express. Es un servidor HTTP agnóstico de runtime que permite ejecutar tu aplicación en cualquier entorno sin cambios de código.

### 3.1. Características de Nitro

- **File-based routing automático**: Cualquier archivo en `server/api/` o `server/routes/` se convierte en endpoint automáticamente.
- **Universal runtime**: Mismo código funciona en Node.js, Deno, Bun, Cloudflare Workers, AWS Lambda, Netlify Functions...
- **Auto-imports**: Funciones como `defineEventHandler`, `readBody`, `getCookie` disponibles sin imports.
- **Presets de despliegue**: Cambia de entorno con una variable de entorno (`NITRO_PRESET=cloudflare-pages`).
- **Caché integrada**: `defineCachedEventHandler` para respuestas cacheables sin configuración externa.

### 3.2. Uso independiente de Django (Full Stack Nuxt)

Nitro permite crear aplicaciones completas sin backend externo, utilizando:
- **Base de datos vía conectores**: `useDatabase()` con Drizzle, Prisma o conectores nativos.
- **Autenticación integrada**: OAuth, credentials, magic links vía `nuxt-auth-utils`.
- **Almacenamiento**: `useStorage()` con filesystem, Redis, S3, Cloudflare KV...
- **Tareas programadas**: `nitro:tasks` para cron jobs y procesos en background.

**Ejemplo: API completa sin Django**

```typescript
// server/api/users/index.get.ts
export default defineEventHandler(async (event) => {
  // Conexión directa a PostgreSQL vía Prisma
  const users = await prisma.user.findMany({
    select: { id: true, email: true, name: true }
  })
  return users
})

// server/api/users.post.ts
export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  
  // Validación con zod (auto-importado si está en dependencias)
  const schema = z.object({
    email: z.string().email(),
    name: z.string().min(2)
  })
  
  const data = await schema.parseAsync(body)
  
  const user = await prisma.user.create({ data })
  return user
})
```

## 4. Autenticación con `nuxt-auth-utils`

El módulo `nuxt-auth-utils` proporciona utilidades de autenticación sin opiniones fuertes, permitiendo integrar cualquier provider (OAuth 2.0, OIDC, Credentials, LDAP) mientras mantiene la sesión en cookies httpOnly seguras.

### 4.1. Instalación y configuración

```bash
npm install nuxt-auth-utils
```

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['nuxt-auth-utils'],
  
  runtimeConfig: {
    // Secrets para firmar sesiones (rotar en producción)
    session: {
      name: 'nuxt-session',
      password: process.env.NUXT_SESSION_PASSWORD || 'default-secret-min-32-chars-long!!'
    },
    
    // OAuth providers (opcional)
    oauth: {
      github: {
        clientId: process.env.NUXT_OAUTH_GITHUB_CLIENT_ID,
        clientSecret: process.env.NUXT_OAUTH_GITHUB_CLIENT_SECRET
      }
    }
  }
})
```

### 4.2. Implementación en el proyecto (Credentials + JWT externo)

Este patrón combina `nuxt-auth-utils` para sesiones seguras con validación contra Django vía JWT:

```typescript
// server/api/auth/login.post.ts
export default defineEventHandler(async (event) => {
  const { email, password } = await readBody(event)
  
  // 1. Validar contra Django/DRF
  const djangoResponse = await $fetch<{
    access: string
    refresh: string
    user: { id: number; email: string; name: string; role: string }
  }>('/auth/login/', {
    baseURL: useRuntimeConfig().djangoApi,
    method: 'POST',
    body: { email, password }
  }).catch(() => {
    throw createError({ statusCode: 401, message: 'Credenciales inválidas' })
  })
  
  // 2. Crear sesión segura con nuxt-auth-utils
  await setUserSession(event, {
    user: {
      id: djangoResponse.user.id,
      email: djangoResponse.user.email,
      name: djangoResponse.user.name,
      role: djangoResponse.user.role,  // Para sistema de roles
      djangoAccessToken: djangoResponse.access  // Opcional: cachear token
    },
    loggedInAt: new Date().toISOString()
  })
  
  // 3. Opcional: almacenar refresh token en cookie httpOnly separada
  setCookie(event, 'django_refresh', djangoResponse.refresh, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 * 7  // 7 días
  })
  
  return { success: true }
})
```

```typescript
// server/api/auth/logout.post.ts
export default defineEventHandler(async (event) => {
  // Opcional: invalidar en Django
  const refreshToken = getCookie(event, 'django_refresh')
  if (refreshToken) {
    await $fetch('/auth/logout/', {
      baseURL: useRuntimeConfig().djangoApi,
      method: 'POST',
      body: { refresh: refreshToken }
    }).catch(() => {})  // No fallar si Django no responde
  }
  
  // Limpiar sesión Nuxt
  await clearUserSession(event)
  deleteCookie(event, 'django_refresh')
  
  return { success: true }
})
```

```typescript
// server/api/auth/me.get.ts
export default defineEventHandler(async (event) => {
  // Middleware implícito: requiere sesión activa
  const session = await requireUserSession(event)
  return session.user
})
```

### 4.3. Composable de cliente

```typescript
// composables/useAuth.ts
export const useAuth = () => {
  const { data: user, refresh: refreshUser } = useFetch('/api/auth/me', {
    server: false,  // Solo cliente para evitar flash de no-autenticado
    default: () => null
  })
  
  const isAuthenticated = computed(() => !!user.value)
  
  async function login(email: string, password: string) {
    await $fetch('/api/auth/login', {
      method: 'POST',
      body: { email, password }
    })
    await refreshUser()
    await navigateTo('/panel')
  }
  
  async function logout() {
    await $fetch('/api/auth/logout', { method: 'POST' })
    await refreshUser()
    await navigateTo('/login')
  }
  
  return {
    user,
    isAuthenticated,
    login,
    logout,
    refreshUser
  }
}
```

## 5. Sistema de roles con middleware

Implementación completa de control de acceso basado en roles (RBAC) integrado con `nuxt-auth-utils`.

### 5.1. Definición de roles y tipos

```typescript
// types/roles.ts
export enum UserRole {
  ALUMNO = 'ALUMNO',
  PROFESOR = 'PROFESOR',
  JEFE_DEPARTAMENTO = 'JEFE_DEPARTAMENTO',
  ADMIN = 'ADMIN',
  ROOT = 'ROOT'
}

// Jerarquía de permisos (mayor índice = más permisos)
export const RoleHierarchy: Record<UserRole, number> = {
  [UserRole.ALUMNO]: 1,
  [UserRole.PROFESOR]: 2,
  [UserRole.JEFE_DEPARTAMENTO]: 3,
  [UserRole.ADMIN]: 4,
  [UserRole.ROOT]: 5
}

// Permisos por recurso
export const Permissions = {
  'cursos:read': [UserRole.ALUMNO, UserRole.PROFESOR, UserRole.JEFE_DEPARTAMENTO, UserRole.ADMIN, UserRole.ROOT],
  'cursos:write': [UserRole.PROFESOR, UserRole.JEFE_DEPARTAMENTO, UserRole.ADMIN],
  'cursos:delete': [UserRole.JEFE_DEPARTAMENTO, UserRole.ADMIN],
  'usuarios:manage': [UserRole.ADMIN, UserRole.ROOT],
  'config:system': [UserRole.ROOT]
} as const
```

### 5.2. Middleware de autorización reutilizable

```typescript
// middleware/auth.ts (protección básica)
export default defineNuxtRouteMiddleware(async (to, from) => {
  const { user, isAuthenticated } = useAuth()
  
  if (!isAuthenticated.value) {
    return navigateTo('/login')
  }
  
  // Verificar roles requeridos en meta de ruta
  const requiredRole = to.meta.requiredRole as UserRole | undefined
  const requiredPermission = to.meta.requiredPermission as keyof typeof Permissions | undefined
  
  if (requiredRole) {
    const userRoleLevel = RoleHierarchy[user.value?.role as UserRole] || 0
    const requiredLevel = RoleHierarchy[requiredRole]
    
    if (userRoleLevel < requiredLevel) {
      return navigateTo('/403')  // Página de acceso denegado
    }
  }
  
  if (requiredPermission) {
    const allowedRoles = Permissions[requiredPermission]
    if (!allowedRoles.includes(user.value?.role as UserRole)) {
      return navigateTo('/403')
    }
  }
})
```

```typescript
// middleware/guest.ts (solo no autenticados)
export default defineNuxtRouteMiddleware(async (to, from) => {
  const { isAuthenticated } = useAuth()
  
  if (isAuthenticated.value) {
    return navigateTo('/panel')
  }
})
```

### 5.3. Páginas con protección por roles

```vue
<!-- pages/panel.vue (accesible para todos autenticados) -->
<script setup lang="ts">
definePageMeta({
  middleware: ['auth']
})
</script>

<template>
  <div>
    <h1>Panel de Control</h1>
    <NuxtLink v-if="user?.role !== 'ALUMNO'" to="/cursos/gestion">Gestión de Cursos</NuxtLink>
  </div>
</template>
```

```vue
<!-- pages/admin/usuarios.vue (solo ADMIN y ROOT) -->
<script setup lang="ts">
import { UserRole } from '~/types/roles'

definePageMeta({
  middleware: ['auth'],
  requiredRole: UserRole.ADMIN  // O usar: requiredPermission: 'usuarios:manage'
})

const { data: users } = await useFetch('/api/admin/users')
</script>

<template>
  <div>
    <h1>Gestión de Usuarios</h1>
    <table>
      <tr v-for="u in users" :key="u.id">
        <td>{{ u.name }}</td>
        <td>{{ u.email }}</td>
        <td>
          <select v-model="u.role" @change="updateRole(u)">
            <option v-for="role in UserRole" :key="role" :value="role">
              {{ role }}
            </option>
          </select>
        </td>
      </tr>
    </table>
  </div>
</template>
```

```vue
<!-- pages/cursos/gestion.vue (PROFESOR y superior) -->
<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
  requiredPermission: 'cursos:write'
})
</script>
```

### 5.4. API protegida por roles (server)

```typescript
// server/api/admin/users.get.ts
export default defineEventHandler(async (event) => {
  // 1. Verificar autenticación
  const session = await requireUserSession(event)
  
  // 2. Verificar rol (middleware de autorización manual)
  const allowedRoles = [UserRole.ADMIN, UserRole.ROOT]
  if (!allowedRoles.includes(session.user.role as UserRole)) {
    throw createError({
      statusCode: 403,
      message: 'Se requiere rol de administrador'
    })
  }
  
  // 3. Ejecutar lógica protegida
  const users = await prisma.user.findMany({
    select: { id: true, email: true, name: true, role: true, createdAt: true }
  })
  
  return users
})
```

```typescript
// server/utils/auth.ts (helper reutilizable)
export async function requireRole(event: H3Event, roles: UserRole[]) {
  const session = await requireUserSession(event)
  
  if (!roles.includes(session.user.role as UserRole)) {
    throw createError({
      statusCode: 403,
      message: `Se requiere uno de los roles: ${roles.join(', ')}`
    })
  }
  
  return session.user
}

// Uso:
// const user = await requireRole(event, [UserRole.ADMIN, UserRole.ROOT])
```

## 6. Configuración inicial de Nuxt 4 con Django

### 6.1. Estructura del proyecto

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
│   │   ├── panel.vue
│   │   └── admin/
│   │       └── usuarios.vue
│   ├── composables/
│   │   └── useAuth.ts
│   ├── middleware/
│   │   ├── auth.ts
│   │   └── guest.ts
│   ├── types/
│   │   └── roles.ts
│   └── server/
│       └── api/
│           ├── auth/
│           │   ├── login.post.ts
│           │   ├── logout.post.ts
│           │   └── me.get.ts
│           └── admin/
│               └── users.get.ts
└── .env
```

### 6.2. Instalación de Nuxt

```bash
# Desde la carpeta raíz
npx nuxi@latest init frontend
cd frontend
npm install nuxt-auth-utils zod  # Añadimos utilidades de auth y validación
npm run dev
```

### 6.3. Configuración de entorno

**frontend/.env**
```env
# Backend API (puede ser Django, FastAPI, etc.)
NUXT_PUBLIC_API_BASE=http://localhost:8000/api
NUXT_DJANGO_API=http://localhost:8000/api

# Session secret (mínimo 32 caracteres, cambiar en producción)
NUXT_SESSION_PASSWORD=tu-clave-secreta-muy-larga-para-firmar-sesiones

# OAuth (opcional)
NUXT_OAUTH_GITHUB_CLIENT_ID=tu-client-id
NUXT_OAUTH_GITHUB_CLIENT_SECRET=tu-client-secret
```

**frontend/nuxt.config.ts**
```typescript
export default defineNuxtConfig({
  modules: ['nuxt-auth-utils'],
  devtools: { enabled: true },
  
  runtimeConfig: {
    session: {
      password: process.env.NUXT_SESSION_PASSWORD
    },
    djangoApi: process.env.NUXT_DJANGO_API,
    
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE
    }
  },
  
  nitro: {
    routeRules: {
      '/api/proxy/**': {
        proxy: { to: `${process.env.NUXT_DJANGO_API}/**` }
      }
    }
  }
})
```

## 7. Mini ejemplo: Sistema de autenticación completo

### 7.1. Página de login

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
  } catch (err: any) {
    error.value = err.message || 'Error al iniciar sesión'
  } finally {
    loading.value = false
  }
}

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
button:disabled {
  background: #ccc;
}
.error {
  color: red;
  margin-top: 10px;
}
</style>
```

### 7.2. Panel protegido con diferenciación por roles

**frontend/pages/panel.vue**
```vue
<template>
  <div>
    <h1>Panel de Control</h1>
    <p>Bienvenido, <strong>{{ user?.name }}</strong> ({{ user?.role }})</p>
    
    <!-- Menú según permisos -->
    <nav>
      <NuxtLink to="/cursos">Mis Cursos</NuxtLink>
      
      <NuxtLink v-if="canWriteCourses" to="/cursos/gestion">
        Gestión de Cursos
      </NuxtLink>
      
      <NuxtLink v-if="isAdmin" to="/admin/usuarios">
        Administración
      </NuxtLink>
    </nav>
    
    <button @click="logout">Cerrar sesión</button>
  </div>
</template>

<script setup lang="ts">
const { user, logout } = useAuth()

definePageMeta({
  middleware: ['auth']
})

// Helpers computados para permisos
const isAdmin = computed(() => 
  [UserRole.ADMIN, UserRole.ROOT].includes(user.value?.role as UserRole)
)

const canWriteCourses = computed(() => {
  const level = RoleHierarchy[user.value?.role as UserRole] || 0
  return level >= RoleHierarchy[UserRole.PROFESOR]
})
</script>
```

## 8. Despliegue en entornos heterogéneos

### 8.1. Multi-backend en producción

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

### 8.2. Dockerización completa

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
      NUXT_DJANGO_API: http://backend:8000/api
      NUXT_SESSION_PASSWORD: ${SESSION_SECRET}
```

## 9. Recursos oficiales

- **Documentación Nuxt 4**: https://nuxt.com/docs 
- **Nitro Engine**: https://nitro.unjs.io/ 
- **nuxt-auth-utils**: https://github.com/Hebilicious/nuxt-auth-utils 
- **Guía de autenticación**: https://nuxt.com/docs/guide/authentication 
- **Ejemplos oficiales**: https://github.com/nuxt/examples 
- **Nuxt DevTools**: https://devtools.nuxt.com/ 

::: note
**Para producción con múltiples backends:**
- Usa `runtimeConfig` para separar variables de entorno por entorno (dev, staging, prod)
- Implementa un API Gateway si tienes más de 3 backends para centralizar autenticación
- Considera NuxtHub para despliegue sin configuración en Vercel o Cloudflare Pages
- Rota `NUXT_SESSION_PASSWORD` regularmente y almacénalo en secret manager (no en .env del repo)
:::

## 10. Glosario de términos de desarrollo web avanzado

| Término | Definición | Uso práctico en el proyecto |
| --------- | ------------ |---------------------------- |
| **API Gateway** | Patrón de arquitectura que actúa como único punto de entrada para múltiples microservicios, gestionando autenticación, rate limiting y enrutado. | Centraliza el acceso a Django API, FastAPI y Supabase desde Nuxt. |
| **BFF** (Backend for Frontend) | Patrón donde el frontend tiene su propio backend ligero (Nitro) que orquesta llamadas a servicios reales, ocultando tokens y lógica al cliente. | `server/api/auth/login.post.ts` maneja JWT sin exponerlos al navegador. |
| **Buildtime** | Momento en que el código se compila y optimiza (contrasta con Runtime). Las decisiones tomadas aquí no se pueden cambiar sin recompilar. | Configuración de Nuxt en `nuxt.config.ts`, generación de rutas estáticas. |
| **Bundle** | Archivo único generado al compilar el frontend que contiene todo el JavaScript, CSS y assets. | `dist/_nuxt/` en Nuxt, optimizado por Vite/Rollup. |
| **Cache-busting** | Técnica para invalidar caché del navegador añadiendo hash al nombre de archivos (ej: `app.a1b2c3.js`). | Nuxt lo hace automáticamente en producción. |
| **CORS** (Cross-Origin Resource Sharing) | Mecanismo de seguridad que permite o deniega peticiones de otros dominios. Configurar en backend Django con `corsheaders`. | `CORS_ALLOWED_ORIGINS = ['http://localhost:3000']` para Nuxt. |
| **Composable** | Función reutilizable en Vue 3/Nuxt que encapsula lógica con estado reactivo (ej: `useAuth()`, `useFetch()`). | `composables/useAuth.ts` para gestionar sesión con `nuxt-auth-utils`. |
| **CSRF** (Cross-Site Request Forgery) | Ataque que fuerza al usuario autenticado a ejecutar acciones no deseadas en otro sitio. | Protegido con `samesite='Lax'` en cookies y tokens CSRF en Django. |
| **CSR** (Client-Side Rendering) | Renderizado en el navegador. El servidor envía HTML vacío y JavaScript construye la página. | SPA tradicional, sin SEO. |
| **Hydration** (Hidratación) | Proceso por el que el framework (Vue) "activa" el HTML estático generado por el servidor, añadiendo interactividad y estado. | Nuxt transforma HTML estático en SPA automáticamente tras la carga inicial. |
| **Hook** | Función de ciclo de vida que se ejecuta en momentos específicos (ej: `onMounted`, `definePageMeta`). | `onMounted` para cargar datos tras la hidratación. |
| **Isomorphic / Universal** | Código que se ejecuta tanto en servidor como en cliente (ej: validaciones, utilidades). | Validación de formularios en `composables/` compartidos. |
| **JWT** (JSON Web Token) | Token firmado que contiene información del usuario, usado para autenticación sin estado. | `access_token` gestionado en servidor Nitro, nunca expuesto al cliente. |
| **Lazy-loading** | Cargar recursos solo cuando se necesitan (imágenes, componentes, rutas). | `defineAsyncComponent` en Vue o imágenes con `loading="lazy"`. |
| **Middleware** | Función que se ejecuta antes de renderizar una ruta o petición (en Nuxt o Django). | Protección de rutas `/panel` y `/admin/**` con verificación de roles. |
| **Nitro** | Motor de servidor universal de Nuxt. Permite ejecutar código en cualquier runtime (Node, Deno, Workers). | `server/api/` y `server/routes/` funcionan igual en local y en Cloudflare. |
| **Prefetching** | Cargar recursos antes de que el usuario los necesite (hover sobre links). | Nuxt lo hace automáticamente en enlaces `<NuxtLink>`. |
| **Props** | Propiedades pasadas de padre a hijo en componentes Vue. | `:user="user"` en componentes de panel. |
| **Rate Limiting** | Limitar el número de peticiones por IP/usuario para evitar abusos. | `django-ratelimit` en login, `rate-limit` en Nuxt server API. |
| **RBAC** (Role-Based Access Control) | Control de acceso basado en roles. Sistema de permisos jerárquico. | Middleware `auth.ts` verificando `requiredRole` en meta de rutas. |
| **Runtime** | Momento de ejecución del código. Las decisiones aquí son dinámicas. | Validar JWT en cada petición, cambiar tema oscuro/claro. |
| **SPA** (Single Page Application) | Aplicación que carga una vez y navega sin recargar la página completa. | Interacción post-login en `/panel`. |
| **SSG** (Static Site Generation) | Generar páginas HTML estáticas en buildtime. Ideal para contenido que no cambia. | Blog institucional, landing page de la FP. |
| **SSR** (Server-Side Rendering) | Renderizar HTML en el servidor para cada petición. Mejora SEO y velocidad inicial. | Página de login y panel de Nuxt con `ssr: true`. |
| **State** | Datos reactivos que definen el estado de la aplicación. | `const user = useState('user', () => null)` |
| **Store** (Pinia/Vuex) | Gestor centralizado de estado para toda la aplicación. | `stores/auth.ts` con Pinia en proyectos complejos (alternativa a `useState`). |
| **Tree-shaking** | Eliminar código muerto no utilizado del bundle final. | Nuxt + Vite eliminan automáticamente componentes y funciones no usados. |

<!--

## 9. Ejercicios prácticos para el aula

### Ejercicio 1: Configuración multi-backend (30 min)
Añade un segundo backend (ej: API pública de GitHub) que muestre los repositorios del usuario autenticado. Configura en `nuxt.config.ts` la URL base y crea un composable `useGitHub.ts`.

### Ejercicio 2: Sistema de roles jerárquico (60 min)
Extiende el middleware de autorización para soportar herencia de permisos (ej: ROOT puede hacer todo lo de ADMIN, y ADMIN todo lo de PROFESOR). Implementa una página `/403` personalizada.

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

---

## 10. Tabla de decisiones: ¿Cuándo usar Nuxt?

| Caso de uso | Nuxt 4 | Vue SPA | Django Templates | Next.js |
|-------------|--------|---------|------------------|---------|
| **SEO crítico** | ✅ Excelente | ❌ Malo | ✅ Bueno | ✅ Excelente |
| **APIs múltiples** | ✅ Perfecto | ✅ Bueno | ⚠️ Difícil | ✅ Bueno |
| **Equipo Vue.js** | ✅ Idioma nativo | ✅ Nativo | ❌ Diferente paradigma | ❌ Diferente |
| **Rendimiento inicial** | ✅ SSR/SSG | ❌ Lentitud inicial | ✅ Rápido | ✅ Rápido |
| **Curva aprendizaje** | ⚠️ Media | ✅ Baja | ✅ Baja | ⚠️ Media-alta |
| **Despliegue edge** | ✅ Universal | ⚠️ Limitado | ❌ No | ⚠️ Vercel-optimizado |
| **Backend integrado** | ✅ Nitro incluido | ❌ Necesita API | ✅ Django completo | ⚠️ Next API routes |

---
-->