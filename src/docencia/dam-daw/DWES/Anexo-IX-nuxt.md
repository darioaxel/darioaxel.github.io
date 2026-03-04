---
title: Anexo IX - Nuxt y Nitro
date: 2026-03-04
icon: code-branch
order: -8
---

# Anexo IX: Implementación de MyONG con Nuxt y Nitro

> **Objetivo**: Replicar la funcionalidad del proyecto Django MyONG utilizando Nuxt como framework full-stack, aprovechando Nitro para la API REST y Prisma como ORM. Este anexo se centra exclusivamente en el módulo de **gestión de socios**.

## 1. Arquitectura del proyecto

```
myong-nuxt/
├── prisma/
│   ├── schema.prisma         # Modelo de datos (Socios, Cuotas, etc.)
│   └── seed.ts               # Datos iniciales
├── server/
│   ├── api/
│   │   └── socios/
│   │       ├── index.get.ts      # GET /api/socios (listado)
│   │       ├── index.post.ts     # POST /api/socios (crear)
│   │       ├── [id].get.ts       # GET /api/socios/:id (detalle)
│   │       ├── [id].put.ts       # PUT /api/socios/:id (actualizar)
│   │       ├── [id].delete.ts    # DELETE /api/socios/:id (eliminar)
│   │       └── check-dni.post.ts # POST /api/socios/check-dni (validación)
│   └── utils/
│       ├── db.ts               # Cliente Prisma singleton
│       └── dni.ts              # Validador de DNI español
├── pages/
│   ├── socios/
│   │   ├── index.vue           # Listado con búsqueda
│   │   ├── [id]/
│   │   │   └── index.vue       # Detalle del socio
│   │   │   └── editar.vue      # Formulario edición
│   │   └── nuevo.vue           # Formulario alta
│   └── index.vue               # Dashboard
├── components/
│   ├── socios/
│   │   ├── SocioForm.vue       # Formulario reutilizable
│   │   ├── SocioCard.vue       # Tarjeta de socio
│   │   └── SocioTable.vue      # Tabla de listado
│   └── ui/                     # Componentes genéricos
├── composables/
│   └── useSocios.ts            # Lógica de socios
├── types/
│   └── socio.d.ts              # Tipos TypeScript
├── nuxt.config.ts
└── package.json
```

---

## 2. Configuración inicial

### 2.1. Dependencias

```bash
# Crear proyecto
npx nuxi@latest init myong-nuxt
cd myong-nuxt

# Instalar dependencias
npm install @prisma/client zod
npm install -D prisma

# Inicializar Prisma
npx prisma init
```

### 2.2. Esquema Prisma (Socios)

```prisma
// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}

model Socio {
  id          String   @id @default(uuid())
  dni         String   @unique
  nombre      String
  apellidos   String
  email       String   @unique
  telefono    String?
  direccion   String?
  fechaAlta   DateTime @default(now())
  fechaBaja   DateTime?
  activo      Boolean  @default(true)
  tipoCuota   TipoCuota @default(MENSUAL)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@map("socios")
}

enum TipoCuota {
  MENSUAL
  TRIMESTRAL
  ANUAL
  BENEFACTOR
}
```

### 2.3. Configuración Nuxt

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  devtools: { enabled: true },
  
  runtimeConfig: {
    databaseUrl: process.env.DATABASE_URL
  },
  
  nitro: {
    experimental: {
      wasm: true
    }
  }
})
```

```env
# .env
DATABASE_URL="file:./dev.db"
```

---

## 3. Utilidades del servidor

### 3.1. Cliente Prisma (singleton)

```typescript
// server/utils/db.ts
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}
```

### 3.2. Validador de DNI (migrado de Django)

```typescript
// server/utils/dni.ts
/**
 * Valida el formato y la letra del DNI español
 * Algoritmo: módulo 23 de los 8 dígitos, mapeo a letras TRWAGMYFPDXBNJZSQVHLCKE
 */
export function validarDNI(dni: string): { valido: boolean; mensaje?: string } {
  // Limpiar espacios y convertir a mayúsculas
  const limpio = dni.trim().toUpperCase()
  
  // Expresión regular: 8 dígitos + letra válida
  const regex = /^(\d{8})([A-Z])$/
  const match = limpio.match(regex)
  
  if (!match) {
    return { 
      valido: false, 
      mensaje: 'Formato inválido. Debe ser 8 dígitos seguidos de una letra (ej: 12345678Z)' 
    }
  }
  
  const [, numeros, letra] = match
  const numero = parseInt(numeros, 10)
  
  // Tabla de letras del DNI
  const letras = 'TRWAGMYFPDXBNJZSQVHLCKE'
  const letraCalculada = letras[numero % 23]
  
  if (letra !== letraCalculada) {
    return { 
      valido: false, 
      mensaje: `Letra incorrecta. Debería ser ${letraCalculada}` 
    }
  }
  
  return { valido: true }
}

// Helper para sanitizar DNI (quitar espacios y guiones)
export function sanitizarDNI(dni: string): string {
  return dni.replace(/[\s.-]/g, '').toUpperCase()
}
```

---

## 4. API REST con Nitro (Endpoints)

### 4.1. Listado de socios (con filtros)

```typescript
// server/api/socios/index.get.ts
import { z } from 'zod'

const querySchema = z.object({
  busqueda: z.string().optional(),
  activo: z.enum(['true', 'false']).optional().transform(v => v === 'true'),
  tipoCuota: z.enum(['MENSUAL', 'TRIMESTRAL', 'ANUAL', 'BENEFACTOR']).optional(),
  page: z.string().optional().default('1').transform(Number),
  limit: z.string().optional().default('10').transform(Number)
})

export default defineEventHandler(async (event) => {
  // Validar query params
  const { success, data: query, error } = querySchema.safeParse(getQuery(event))
  
  if (!success) {
    throw createError({
      statusCode: 400,
      message: 'Parámetros de búsqueda inválidos',
      data: error.flatten()
    })
  }

  // Construir where dinámico
  const where: any = {}
  
  if (query.activo !== undefined) {
    where.activo = query.activo
  }
  
  if (query.tipoCuota) {
    where.tipoCuota = query.tipoCuota
  }
  
  if (query.busqueda) {
    where.OR = [
      { nombre: { contains: query.busqueda, mode: 'insensitive' } },
      { apellidos: { contains: query.busqueda, mode: 'insensitive' } },
      { email: { contains: query.busqueda, mode: 'insensitive' } },
      { dni: { contains: query.busqueda, mode: 'insensitive' } }
    ]
  }

  // Paginación
  const skip = (query.page - 1) * query.limit
  
  const [socios, total] = await Promise.all([
    prisma.socio.findMany({
      where,
      skip,
      take: query.limit,
      orderBy: { createdAt: 'desc' }
    }),
    prisma.socio.count({ where })
  ])

  return {
    data: socios,
    meta: {
      total,
      page: query.page,
      limit: query.limit,
      totalPages: Math.ceil(total / query.limit)
    }
  }
})
```

### 4.2. Crear nuevo socio

```typescript
// server/api/socios/index.post.ts
import { z } from 'zod'

const createSchema = z.object({
  dni: z.string().min(9).max(9),
  nombre: z.string().min(2).max(100),
  apellidos: z.string().min(2).max(200),
  email: z.string().email(),
  telefono: z.string().optional(),
  direccion: z.string().optional(),
  tipoCuota: z.enum(['MENSUAL', 'TRIMESTRAL', 'ANUAL', 'BENEFACTOR']).default('MENSUAL')
})

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  
  // Validación con Zod
  const { success, data, error } = createSchema.safeParse(body)
  
  if (!success) {
    throw createError({
      statusCode: 400,
      message: 'Datos de socio inválidos',
      data: error.flatten().fieldErrors
    })
  }

  // Validar DNI
  const dniLimpio = sanitizarDNI(data.dni)
  const validacionDNI = validarDNI(dniLimpio)
  
  if (!validacionDNI.valido) {
    throw createError({
      statusCode: 400,
      message: validacionDNI.mensaje,
      data: { dni: [validacionDNI.mensaje] }
    })
  }

  // Verificar unicidad de DNI y email
  const existente = await prisma.socio.findFirst({
    where: {
      OR: [
        { dni: dniLimpio },
        { email: data.email.toLowerCase() }
      ]
    }
  })

  if (existente) {
    const campo = existente.dni === dniLimpio ? 'DNI' : 'email'
    throw createError({
      statusCode: 409,
      message: `Ya existe un socio con este ${campo}`
    })
  }

  // Crear socio
  try {
    const socio = await prisma.socio.create({
      data: {
        ...data,
        dni: dniLimpio,
        email: data.email.toLowerCase()
      }
    })
    
    setResponseStatus(event, 201)
    return { success: true, data: socio }
    
  } catch (err) {
    throw createError({
      statusCode: 500,
      message: 'Error al crear el socio'
    })
  }
})
```

### 4.3. Obtener socio por ID

```typescript
// server/api/socios/[id].get.ts
export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  
  if (!id) {
    throw createError({
      statusCode: 400,
      message: 'ID de socio requerido'
    })
  }

  const socio = await prisma.socio.findUnique({
    where: { id }
  })

  if (!socio) {
    throw createError({
      statusCode: 404,
      message: 'Socio no encontrado'
    })
  }

  return { data: socio }
})
```

### 4.4. Actualizar socio

```typescript
// server/api/socios/[id].put.ts
const updateSchema = z.object({
  nombre: z.string().min(2).max(100).optional(),
  apellidos: z.string().min(2).max(200).optional(),
  email: z.string().email().optional(),
  telefono: z.string().optional(),
  direccion: z.string().optional(),
  tipoCuota: z.enum(['MENSUAL', 'TRIMESTRAL', 'ANUAL', 'BENEFACTOR']).optional(),
  activo: z.boolean().optional()
})

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const body = await readBody(event)
  
  if (!id) {
    throw createError({ statusCode: 400, message: 'ID requerido' })
  }

  // Validar datos
  const { success, data, error } = updateSchema.safeParse(body)
  if (!success) {
    throw createError({
      statusCode: 400,
      message: 'Datos inválidos',
      data: error.flatten().fieldErrors
    })
  }

  // Verificar existencia
  const existente = await prisma.socio.findUnique({ where: { id } })
  if (!existente) {
    throw createError({ statusCode: 404, message: 'Socio no encontrado' })
  }

  // Si cambia email, verificar unicidad
  if (data.email && data.email !== existente.email) {
    const emailExistente = await prisma.socio.findUnique({
      where: { email: data.email.toLowerCase() }
    })
    if (emailExistente) {
      throw createError({ statusCode: 409, message: 'Email ya registrado' })
    }
  }

  // Actualizar
  const socio = await prisma.socio.update({
    where: { id },
    data: {
      ...data,
      ...(data.email && { email: data.email.toLowerCase() })
    }
  })

  return { success: true, data: socio }
})
```

### 4.5. Eliminar socio (baja lógica)

```typescript
// server/api/socios/[id].delete.ts
export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  
  if (!id) {
    throw createError({ statusCode: 400, message: 'ID requerido' })
  }

  const socio = await prisma.socio.findUnique({ where: { id } })
  
  if (!socio) {
    throw createError({ statusCode: 404, message: 'Socio no encontrado' })
  }

  // Baja lógica en lugar de eliminación física
  const actualizado = await prisma.socio.update({
    where: { id },
    data: {
      activo: false,
      fechaBaja: new Date()
    }
  })

  return { 
    success: true, 
    message: 'Socio dado de baja correctamente',
    data: actualizado 
  }
})
```

### 4.6. Endpoint de validación de DNI (ejercicio UT07)

```typescript
// server/api/socios/check-dni.post.ts
const checkDNISchema = z.object({
  dni: z.string().min(9).max(9)
})

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  
  const { success, data } = checkDNISchema.safeParse(body)
  if (!success) {
    throw createError({ statusCode: 400, message: 'DNI requerido' })
  }

  const dniLimpio = sanitizarDNI(data.dni)
  const validacion = validarDNI(dniLimpio)
  
  // Verificar si ya existe en BD
  const existente = await prisma.socio.findUnique({
    where: { dni: dniLimpio },
    select: { id: true, nombre: true, apellidos: true, activo: true }
  })

  return {
    valido: validacion.valido,
    mensaje: validacion.mensaje,
    formatoCorrecto: /^\d{8}[A-Z]$/.test(dniLimpio),
    existeEnBD: !!existente,
    socioExistente: existente || null
  }
})
```

---

## 5. Frontend con Nuxt

### 5.1. Tipos TypeScript

```typescript
// types/socio.d.ts
export interface Socio {
  id: string
  dni: string
  nombre: string
  apellidos: string
  email: string
  telefono?: string
  direccion?: string
  fechaAlta: string
  fechaBaja?: string
  activo: boolean
  tipoCuota: 'MENSUAL' | 'TRIMESTRAL' | 'ANUAL' | 'BENEFACTOR'
  createdAt: string
  updatedAt: string
}

export interface SocioFormData {
  dni: string
  nombre: string
  apellidos: string
  email: string
  telefono?: string
  direccion?: string
  tipoCuota: Socio['tipoCuota']
}

export interface ListadoResponse {
  data: Socio[]
  meta: {
    total: number
    page: number
    limit: number
    totalPages: number
  }
}
```

### 5.2. Composable useSocios

```typescript
// composables/useSocios.ts
export const useSocios = () => {
  // Estado
  const socios = ref<Socio[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const meta = ref<ListadoResponse['meta'] | null>(null)

  // Listar socios
  async function fetchSocios(params: {
    busqueda?: string
    activo?: boolean
    tipoCuota?: string
    page?: number
    limit?: number
  } = {}) {
    loading.value = true
    error.value = null
    
    try {
      const response = await $fetch<ListadoResponse>('/api/socios', {
        params: {
          page: params.page || 1,
          limit: params.limit || 10,
          ...(params.busqueda && { busqueda: params.busqueda }),
          ...(params.activo !== undefined && { activo: String(params.activo) }),
          ...(params.tipoCuota && { tipoCuota: params.tipoCuota })
        }
      })
      
      socios.value = response.data
      meta.value = response.meta
      return response
      
    } catch (err: any) {
      error.value = err.message || 'Error al cargar socios'
      throw err
    } finally {
      loading.value = false
    }
  }

  // Obtener un socio
  async function getSocio(id: string): Promise<Socio> {
    const response = await $fetch<{ data: Socio }>(`/api/socios/${id}`)
    return response.data
  }

  // Crear socio
  async function createSocio(data: SocioFormData): Promise<Socio> {
    const response = await $fetch<{ data: Socio }>('/api/socios', {
      method: 'POST',
      body: data
    })
    return response.data
  }

  // Actualizar socio
  async function updateSocio(id: string, data: Partial<SocioFormData>): Promise<Socio> {
    const response = await $fetch<{ data: Socio }>(`/api/socios/${id}`, {
      method: 'PUT',
      body: data
    })
    return response.data
  }

  // Dar de baja
  async function deleteSocio(id: string): Promise<void> {
    await $fetch(`/api/socios/${id}`, { method: 'DELETE' })
  }

  // Validar DNI (endpoint de verificación)
  async function checkDNI(dni: string): Promise<{
    valido: boolean
    mensaje?: string
    existeEnBD: boolean
  }> {
    return await $fetch('/api/socios/check-dni', {
      method: 'POST',
      body: { dni }
    })
  }

  return {
    socios,
    loading,
    error,
    meta,
    fetchSocios,
    getSocio,
    createSocio,
    updateSocio,
    deleteSocio,
    checkDNI
  }
}
```

### 5.3. Página de listado con búsqueda

```vue
<!-- pages/socios/index.vue -->
<template>
  <div class="container">
    <h1>Gestión de Socios</h1>
    
    <!-- Filtros -->
    <div class="filters">
      <input 
        v-model="busqueda" 
        placeholder="Buscar por nombre, DNI o email..."
        @input="debouncedSearch"
      >
      
      <select v-model="filtroActivo" @change="fetchSocios">
        <option :value="undefined">Todos</option>
        <option :value="true">Activos</option>
        <option :value="false">Inactivos</option>
      </select>
      
      <select v-model="filtroCuota" @change="fetchSocios">
        <option value="">Todas las cuotas</option>
        <option value="MENSUAL">Mensual</option>
        <option value="TRIMESTRAL">Trimestral</option>
        <option value="ANUAL">Anual</option>
        <option value="BENEFACTOR">Benefactor</option>
      </select>
      
      <NuxtLink to="/socios/nuevo" class="btn-primary">
        + Nuevo Socio
      </NuxtLink>
    </div>

    <!-- Tabla -->
    <div v-if="loading" class="loading">Cargando...</div>
    
    <div v-else-if="error" class="error">{{ error }}</div>
    
    <table v-else class="socios-table">
      <thead>
        <tr>
          <th>DNI</th>
          <th>Nombre</th>
          <th>Email</th>
          <th>Tipo Cuota</th>
          <th>Estado</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="socio in socios" :key="socio.id">
          <td>{{ socio.dni }}</td>
          <td>{{ socio.apellidos }}, {{ socio.nombre }}</td>
          <td>{{ socio.email }}</td>
          <td>
            <span :class="`badge cuota-${socio.tipoCuota.toLowerCase()}`">
              {{ socio.tipoCuota }}
            </span>
          </td>
          <td>
            <span :class="['badge', socio.activo ? 'activo' : 'inactivo']">
              {{ socio.activo ? 'Activo' : 'Inactivo' }}
            </span>
          </td>
          <td>
            <NuxtLink :to="`/socios/${socio.id}`">Ver</NuxtLink>
            <NuxtLink :to="`/socios/${socio.id}/editar`">Editar</NuxtLink>
            <button 
              v-if="socio.activo" 
              @click="confirmarBaja(socio)"
              class="btn-danger"
            >
              Dar baja
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Paginación -->
    <div v-if="meta" class="pagination">
      <button 
        :disabled="meta.page <= 1" 
        @click="cambiarPagina(meta.page - 1)"
      >
        ← Anterior
      </button>
      
      <span>Página {{ meta.page }} de {{ meta.totalPages }}</span>
      
      <button 
        :disabled="meta.page >= meta.totalPages" 
        @click="cambiarPagina(meta.page + 1)"
      >
        Siguiente →
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const { 
  socios, 
  loading, 
  error, 
  meta, 
  fetchSocios, 
  deleteSocio 
} = useSocios()

// Filtros
const busqueda = ref('')
const filtroActivo = ref<boolean | undefined>(undefined)
const filtroCuota = ref('')

// Debounce para búsqueda
let timeout: NodeJS.Timeout
const debouncedSearch = () => {
  clearTimeout(timeout)
  timeout = setTimeout(() => fetchSocios({
    busqueda: busqueda.value,
    activo: filtroActivo.value,
    tipoCuota: filtroCuota.value || undefined
  }), 300)
}

// Cargar al montar
onMounted(() => fetchSocios())

// Cambiar página
const cambiarPagina = (page: number) => {
  fetchSocios({
    page,
    busqueda: busqueda.value,
    activo: filtroActivo.value,
    tipoCuota: filtroCuota.value || undefined
  })
}

// Confirmar baja
const confirmarBaja = async (socio: Socio) => {
  if (!confirm(`¿Dar de baja a ${socio.nombre} ${socio.apellidos}?`)) return
  
  try {
    await deleteSocio(socio.id)
    await fetchSocios() // Recargar lista
  } catch (err) {
    alert('Error al dar de baja')
  }
}
</script>

<style scoped>
.container { max-width: 1200px; margin: 0 auto; padding: 20px; }
.filters { display: flex; gap: 10px; margin-bottom: 20px; }
.filters input { flex: 1; padding: 8px; }
.filters select { padding: 8px; }
.btn-primary { 
  background: #4CAF50; 
  color: white; 
  padding: 8px 16px; 
  text-decoration: none;
  border-radius: 4px;
}
.socios-table { width: 100%; border-collapse: collapse; }
.socios-table th, .socios-table td { 
  padding: 12px; 
  text-align: left; 
  border-bottom: 1px solid #ddd; 
}
.badge { 
  padding: 4px 8px; 
  border-radius: 4px; 
  font-size: 0.85em;
}
.activo { background: #4CAF50; color: white; }
.inactivo { background: #f44336; color: white; }
.cuota-mensual { background: #2196F3; color: white; }
.cuota-trimestral { background: #FF9800; color: white; }
.cuota-anual { background: #9C27B0; color: white; }
.cuota-benefactor { background: #FFD700; color: black; }
.pagination { 
  display: flex; 
  justify-content: center; 
  align-items: center;
  gap: 20px;
  margin-top: 20px;
}
.btn-danger { 
  background: #f44336; 
  color: white; 
  border: none;
  padding: 4px 8px;
  cursor: pointer;
}
</style>
```

### 5.4. Formulario de socio (alta/edición)

```vue
<!-- components/socios/SocioForm.vue -->
<template>
  <form @submit.prevent="handleSubmit" class="socio-form">
    <div class="form-group">
      <label>DNI *</label>
      <input 
        v-model="form.dni" 
        placeholder="12345678Z"
        :disabled="modo === 'editar'"
        @blur="validarDNI"
      >
      <span v-if="dniError" class="error-text">{{ dniError }}</span>
      <span v-if="dniValido" class="success-text">✓ DNI válido</span>
    </div>

    <div class="form-row">
      <div class="form-group">
        <label>Nombre *</label>
        <input v-model="form.nombre" required minlength="2">
      </div>
      <div class="form-group">
        <label>Apellidos *</label>
        <input v-model="form.apellidos" required minlength="2">
      </div>
    </div>

    <div class="form-group">
      <label>Email *</label>
      <input v-model="form.email" type="email" required>
    </div>

    <div class="form-group">
      <label>Teléfono</label>
      <input v-model="form.telefono" type="tel">
    </div>

    <div class="form-group">
      <label>Dirección</label>
      <textarea v-model="form.direccion" rows="2"></textarea>
    </div>

    <div class="form-group">
      <label>Tipo de Cuota *</label>
      <select v-model="form.tipoCuota" required>
        <option value="MENSUAL">Mensual</option>
        <option value="TRIMESTRAL">Trimestral</option>
        <option value="ANUAL">Anual</option>
        <option value="BENEFACTOR">Benefactor</option>
      </select>
    </div>

    <div class="actions">
      <button type="button" @click="$router.back()">Cancelar</button>
      <button type="submit" :disabled="!formValido || guardando">
        {{ guardando ? 'Guardando...' : (modo === 'crear' ? 'Crear Socio' : 'Guardar Cambios') }}
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
const props = defineProps<{
  modo: 'crear' | 'editar'
  socioInicial?: Partial<SocioFormData>
}>()

const emit = defineEmits<{
  submit: [data: SocioFormData]
}>()

const { checkDNI } = useSocios()

const form = reactive<SocioFormData>({
  dni: '',
  nombre: '',
  apellidos: '',
  email: '',
  telefono: '',
  direccion: '',
  tipoCuota: 'MENSUAL',
  ...props.socioInicial
})

const dniError = ref('')
const dniValido = ref(false)
const guardando = ref(false)

// Validación DNI en tiempo real
const validarDNI = async () => {
  if (form.dni.length !== 9) return
  
  dniError.value = ''
  dniValido.value = false
  
  try {
    const resultado = await checkDNI(form.dni)
    
    if (!resultado.valido) {
      dniError.value = resultado.mensaje || 'DNI inválido'
      return
    }
    
    if (resultado.existeEnBD && props.modo === 'crear') {
      dniError.value = 'Este DNI ya está registrado'
      return
    }
    
    dniValido.value = true
  } catch (err) {
    dniError.value = 'Error al validar DNI'
  }
}

const formValido = computed(() => {
  return form.dni && form.nombre && form.apellidos && form.email && 
         form.tipoCuota && !dniError.value
})

const handleSubmit = () => {
  if (!formValido.value) return
  emit('submit', { ...form })
}
</script>

<style scoped>
.socio-form { max-width: 600px; }
.form-group { margin-bottom: 16px; }
.form-group label { display: block; margin-bottom: 4px; font-weight: 500; }
.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}
.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.error-text { color: #f44336; font-size: 0.85em; }
.success-text { color: #4CAF50; font-size: 0.85em; }
.actions { display: flex; gap: 10px; justify-content: flex-end; margin-top: 20px; }
.actions button { padding: 10px 20px; border-radius: 4px; cursor: pointer; }
.actions button[type="submit"] { background: #4CAF50; color: white; border: none; }
.actions button[type="submit"]:disabled { background: #ccc; }
</style>
```

```vue
<!-- pages/socios/nuevo.vue -->
<template>
  <div class="container">
    <h1>Nuevo Socio</h1>
    <SociosSocioForm modo="crear" @submit="crearSocio" />
  </div>
</template>

<script setup lang="ts">
const { createSocio } = useSocios()

const crearSocio = async (data: SocioFormData) => {
  try {
    await createSocio(data)
    alert('Socio creado correctamente')
    await navigateTo('/socios')
  } catch (err: any) {
    alert(err.message || 'Error al crear socio')
  }
}
</script>
```

---

## 6. Seed de datos iniciales

```typescript
// prisma/seed.ts
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const sociosMock = [
  {
    dni: '12345678Z',
    nombre: 'María',
    apellidos: 'García López',
    email: 'maria.garcia@email.com',
    telefono: '600123456',
    direccion: 'Calle Mayor 1, Madrid',
    tipoCuota: 'MENSUAL',
    activo: true
  },
  {
    dni: '87654321X',
    nombre: 'Carlos',
    apellidos: 'Martínez Ruiz',
    email: 'carlos.martinez@email.com',
    telefono: '611987654',
    direccion: 'Avenida Principal 45, Barcelona',
    tipoCuota: 'ANUAL',
    activo: true
  },
  {
    dni: '11223344B',
    nombre: 'Ana',
    apellidos: 'Fernández Sánchez',
    email: 'ana.fernandez@email.com',
    tipoCuota: 'BENEFACTOR',
    activo: true
  },
  {
    dni: '55667788C',
    nombre: 'Luis',
    apellidos: 'Rodríguez Gómez',
    email: 'luis.rodriguez@email.com',
    tipoCuota: 'TRIMESTRAL',
    activo: false,
    fechaBaja: new Date('2024-01-15')
  }
]

async function main() {
  console.log('🌱 Iniciando seed...')
  
  for (const socio of sociosMock) {
    await prisma.socio.upsert({
      where: { dni: socio.dni },
      update: {},
      create: socio
    })
  }
  
  console.log(`✅ ${sociosMock.length} socios creados`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
```

```json
// package.json (añadir)
{
  "prisma": {
    "seed": "tsx prisma/seed.ts"
  }
}
```


## 7. Comparativa: Django vs Nuxt+Nitro

| Aspecto | Django (MyONG) | Nuxt + Nitro |
|---------|---------------|--------------|
| **Definición de modelos** | `models.py` con clases Python | `schema.prisma` con sintaxis declarativa |
| **Migraciones** | `makemigrations` + `migrate` | `prisma migrate dev` |
| **Vistas/API** | `views.py` con clases `APIView` | File-based routing automático en `server/api/` |
| **Serialización** | `serializers.py` (DRF) | Zod para validación, tipos TypeScript nativos |
| **URLs** | Configuración manual en `urls.py` | Auto-routing basado en estructura de carpetas |
| **Frontend** | Templates Django + HTMX/Alpine | Vue 3 SSR con composables |
| **Autenticación** | Django Auth + DRF tokens | `nuxt-auth-utils` + sesiones httpOnly |
| **Admin** | Django Admin automático | Panel personalizado en `/pages/admin` |
| **Despliegue** | Servidor WSGI/ASGI (Gunicorn) | Cualquier runtime (Node, Deno, Workers) |



## 8. Recursos adicionales

- **Documentación Nitro**: https://nitro.unjs.io/ 
- **Prisma con Nuxt**: https://sidebase.io/nuxt-prisma/getting-started 
- **Validación Zod**: https://zod.dev/ 
- **Patrones Nuxt Server**: https://nuxt.com/docs/guide/directory-structure/server 

::: note
**Ventajas de esta arquitectura para MyONG:**
- **Full TypeScript**: Tipos compartidos entre frontend y backend
- **Auto-imports**: No necesitas importar manualmente utilidades comunes
- **Despliegue flexible**: Mismo código en VPS barato (Node) o edge gratis (Cloudflare)
- **Developer Experience**: Hot reload instantáneo de API y frontend simultáneamente
:::