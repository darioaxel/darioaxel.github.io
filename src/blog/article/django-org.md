---
title: "Guía Básica del ORM de Django"
date: 2025-11-26
category: [Blog]
tag: [Django, ORM]
type: article
---

# Guía Básica del ORM de Django: Recuperación de Datos

Te muestro cómo usar el ORM con tus modelos `Socio`, `Direccion` y `Tutor`.

## 1. Setup para probar consultas

Abre el shell interactivo de Django:
```bash
python manage.py shell
```

Importa tus modelos:
```python
from socios.models import Socio, Direccion, Tutor
```

## 2. Consultas Básicas

### **Obtener todos los registros**
```python
# Todos los socios (QuerySet)
socios = Socio.objects.all()

# Convertir a lista (evaluar la consulta)
lista_socios = list(socios)

# Contar registros
total = Socio.objects.count()
```

### **Obtener un registro específico**
```python
# Por clave primaria (más eficiente)
socio = Socio.objects.get(pk='c6f3e99b-1a20-4f6a-89a3-cc7c0a1c24f1')

# Por cualquier campo único
socio = Socio.objects.get(email='maria@example.com')
```

### **Filtrar registros**
```python
# Socios mayores de edad (usando la propiedad del modelo)
# Nota: no puedes filtrar por @property, necesitas calcular el año
from datetime import date, timedelta
hace_18_anos = date.today() - timedelta(days=365*18)
mayores = Socio.objects.filter(fecha_nacimiento__lte=hace_18_anos)

# Socios que domicilian pago
domicilian = Socio.objects.filter(domicilia_pago=True)

# Por código postal
valdepenas = Socio.objects.filter(direccion__codigo_postal=13300)
```

### **Excluir registros**
```python
# Socios sin IBAN
sin_iban = Socio.objects.exclude(IBAN__isnull=False)
```

## 3. Relaciones OneToOne (Dirección)

### **Acceder a la relación directa**
```python
# Desde Socio a Dirección
socio = Socio.objects.get(email='maria@example.com')
calle = socio.direccion.calle
ciudad = socio.direccion.ciudad

# Filtrar por campos de la relación
# Socios de Valdepeñas
socios_vp = Socio.objects.filter(direccion__ciudad='Valdepeñas')

# Socios en código postal específico
socios_cp = Socio.objects.filter(direccion__codigo_postal=13300)
```

### **Acceso inverso (de Dirección a Socio)**
```python
# Usando el related_name='socio'
direccion = Direccion.objects.get(calle='Calle Mayor')
socio = direccion.socio  # Acceso directo al socio
```

## 4. Relaciones ManyToMany (Tutores)

### **Acceder a los tutores de un socio**
```python
socio = Socio.objects.get(nombre='Javier')
tutores = socio.tutor_legal.all()  # QuerySet de tutores

# Si necesitas el primer tutor
primer_tutor = socio.tutor_legal.first()
```

### **Acceso inverso (de Tutor a Socios)**
```python
# Usando el related_name='socios'
tutor = Tutor.objects.get(nombre='Juan')
socios_a_cargo = tutor.socios.all()
```

### **Filtrar por relación ManyToMany**
```python
# Socios que tienen al menos un tutor
socios_con_tutor = Socio.objects.filter(tutor_legal__isnull=False)

# Socios sin tutor
socios_sin_tutor = Socio.objects.filter(tutor_legal__isnull=True)

# Socios con un tutor específico
tutor_especifico = Tutor.objects.get(documento_identidad='12345678Z')
sus_socios = Socio.objects.filter(tutor_legal=tutor_especifico)
```

## 5. Mejoras de Performance

### **select_related() - OneToOne/ForeignKey**
```python
# Una sola consulta SQL en lugar de N+1
socios = Socio.objects.select_related('direccion').all()

for socio in socios:
    print(socio.direccion.calle)  # No hace consulta extra
```

### **prefetch_related() - ManyToMany**
```python
# Precarga todos los tutores
socios = Socio.objects.prefetch_related('tutor_legal').all()

for socio in socios:
    tutores = socio.tutor_legal.all()  # Usa caché, no consulta
```

### **Combinar ambas**
```python
socios = Socio.objects.select_related('direccion').prefetch_related('tutor_legal').all()
```

## 6. Consultas Útiles

### **Ordenar resultados**
```python
# Por apellidos ascendente
socios_ordenados = Socio.objects.order_by('apellidos')

# Por fecha de registro descendente
recientes = Socio.objects.order_by('-fecha_registro')
```

### **Obtener solo ciertos campos**
```python
# Lista de diccionarios
datos = Socio.objects.values('nombre', 'email', 'direccion__ciudad')

# Lista de tuplas
emails = Socio.objects.values_list('email', flat=True)  # flat=True para lista simple
```

### **Comprobar existencia**
```python
# Más eficiente que count()
existe = Socio.objects.filter(email='maria@example.com').exists()
```

### **Consultas complejas con Q**
```python
from django.db.models import Q

# Socios de Valdepeñas O que domicilian pago
query = Socio.objects.filter(
    Q(direccion__ciudad='Valdepeñas') | Q(domicilia_pago=True)
)
```

## 7. Ejemplos Prácticos para tu App

```python
# 1. Todos los menores de edad con sus tutores
from datetime import timedelta
hace_18_anos = date.today() - timedelta(days=365*18)

menores = Socio.objects.filter(
    fecha_nacimiento__gt=hace_18_anos
).prefetch_related('tutor_legal')

for socio in menores:
    print(f"{socio.nombre} - Tutores: {list(socio.tutor_legal.all())}")

# 2. Socios sin dirección completa
incompletos = Socio.objects.filter(
    Q(direccion__calle__isnull=True) | Q(direccion__ciudad__isnull=True)
)

# 3. Tutores con más de un socio
from django.db.models import Count
tutores_multiples = Tutor.objects.annotate(
    num_socios=Count('socios')
).filter(num_socios__gt=1)
```

## 8. Resumen de Lookups Comunes

| Lookup | Descripción | Ejemplo |
|--------|-------------|---------|
| `__exact` | Coincidencia exacta | `filter(nombre__exact='María')` |
| `__iexact` | Sin diferenciar mayúsculas | `filter(email__iexact='maria@example.com')` |
| `__contains` | Contiene texto | `filter(apellidos__contains='García')` |
| `__icontains` | Sin distinguir mayúsculas | `filter(ciudad__icontains='valde')` |
| `__in` | Lista de valores | `filter(codigo_postal__in=[13300, 13001])` |
| `__gt`, `__lt` | Mayor/menor que | `filter(fecha_nacimiento__lt=hace_18_anos)` |
| `__isnull` | Es nulo | `filter(telefono__isnull=True)` |
| `__startswith` | Empieza con | `filter(calle__startswith='Calle')` |

Aplica estos ejemplos directamente en tus vistas o en el shell para explorar tus datos.