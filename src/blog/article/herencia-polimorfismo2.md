---
title: "Implementando Herencia y Polimorfismo en Django II"
date: 2025-11-20
category: [Blog]
tag: [Django, Python, herencia, polimorfismo]
type: article
---
# Implementando Herencia y Polimorfismo en Django II

La herencia y el polimorfismo son pilares fundamentales para construir sistemas de gestión de asociaciones robustos y mantenibles. 

## 1. Fundamentos de Herencia en Python (Contexto MyOng)

Imaginemos que necesitamos modelar diferentes roles en nuestra ONG. Todos comparten información básica, pero cada tipo tiene atributos específicos.

```python
# Clase base para personas en la ONG
class Persona:
    def __init__(self, nombre, email, telefono):
        self.nombre = nombre
        self.email = email
        self.telefono = telefono
    
    def obtener_info_contacto(self):
        return f"{self.nombre} - {self.email}"
    
    def generar_informe(self):
        return f"Informe básico para {self.nombre}"

# Clases derivadas específicas
class Socio(Persona):
    def __init__(self, nombre, email, telefono, numero_socio, fecha_alta):
        super().__init__(nombre, email, telefono)
        self.numero_socio = numero_socio
        self.fecha_alta = fecha_alta
    
    def generar_informe(self):
        return f"Informe de socio {self.numero_socio}: {self.nombre}"
    
    def calcular_cuota_anual(self):
        return 120  # Cuota base

class Tutor(Persona):
    def __init__(self, nombre, email, telefono, especialidad, disponible=True):
        super().__init__(nombre, email, telefono)
        self.especialidad = especialidad
        self.disponible = disponible
    
    def generar_informe(self):
        return f"Informe de tutor {self.nombre} - Especialidad: {self.especialidad}"
    
    def asignar_proyecto(self, proyecto):
        self.disponible = False
        return f"{self.nombre} asignado a {proyecto}"

# Uso práctico
socio_1 = Socio("Ana García", "ana@example.com", "600123456", "SOC-001", "2023-01-15")
tutor_1 = Tutor("Carlos Ruiz", "carlos@example.com", "600789123", "Educación Ambiental")

print(socio_1.obtener_info_contacto())  # Heredado de Persona
print(socio_1.generar_informe())        # Implementación específica
print(tutor_1.generar_informe())        # Implementación específica
```

## 2. Herencia en Modelos de Django para myONG

### Opción A: Herencia Abstracta (Modelo Base Persona)

Usamos esto para campos comunes a todos los roles sin crear tabla en la BD para `Persona`.

```python
# myONG/models.py
from django.db import models

class PersonaBase(models.Model):
    """Modelo abstracto con información común de todas las personas en la ONG"""
    TIPO_DOCUMENTO_CHOICES = [
        ('DNI', 'DNI'),
        ('RUC', 'RUC'),
        ('PAS', 'Pasaporte'),
    ]
    
    nombre_completo = models.CharField(max_length=200)
    email = models.EmailField(unique=True)
    telefono = models.CharField(max_length=20, blank=True)
    direccion = models.TextField(blank=True)
    tipo_documento = models.CharField(max_length=3, choices=TIPO_DOCUMENTO_CHOICES)
    numero_documento = models.CharField(max_length=20, unique=True)
    fecha_registro = models.DateTimeField(auto_now_add=True)
    activo = models.BooleanField(default=True)
    
    class Meta:
        abstract = True  # No crea tabla en BD
        ordering = ['nombre_completo']
    
    def __str__(self):
        return f"{self.nombre_completo} ({self.numero_documento})"
    
    def desactivar(self):
        """Método común a todas las personas"""
        self.activo = False
        self.save()

class Socio(PersonaBase):
    numero_socio = models.CharField(max_length=10, unique=True)
    fecha_alta = models.DateField()
    aportacion_mensual = models.DecimalField(max_digits=8, decimal_places=2, default=50.00)
    
    def calcular_aportacion_anual(self):
        return self.aportacion_mensual * 12

class Tutor(PersonaBase):
    ESPECIALIDADES = [
        ('EDU', 'Educación'),
        ('MED', 'Medicina'),
        ('AMB', 'Medio Ambiente'),
        ('ADM', 'Administración'),
    ]
    
    especialidad = models.CharField(max_length=3, choices=ESPECIALIDADES)
    disponible = models.BooleanField(default=True)
    proyectos_activos = models.IntegerField(default=0)
    
    def asignar_a_proyecto(self):
        self.proyectos_activos += 1
        self.disponible = self.proyectos_activos < 3
        self.save()

class Voluntario(PersonaBase):
    HORAS_SEMANALES = [
        ('5', '5 horas/semana'),
        ('10', '10 horas/semana'),
        ('15', '15+ horas/semana'),
    ]
    
    horas_compromiso = models.CharField(max_length=2, choices=HORAS_SEMANALES)
    area_trabajo = models.CharField(max_length=100)
    
    def registrar_horas(self, horas):
        # Lógica para registrar horas voluntarias
        pass
```

**Ventajas**: Cada modelo tiene su propia tabla limpia, sin repetir campos comunes. **Ideal para**: La estructura principal de roles en nuestra ONG.

### Opción B: Herencia Multi-Tabla (Diferentes Tipos de Socios)

Cuando necesitamos consultar todos los socios juntos, pero con atributos específicos por tipo.

```python
class SocioBase(models.Model):
    """Modelo padre real - crea tabla en BD"""
    numero_socio = models.CharField(max_length=10, unique=True)
    fecha_alta = models.DateField()
    aportacion_base = models.DecimalField(max_digits=8, decimal_places=2, default=50.00)
    
    def calcular_aportacion_anual(self):
        return self.aportacion_base * 12
    
    def get_tipo_socio(self):
        return "Socio Base"

class SocioIndividual(SocioBase):
    persona = models.OneToOneField('Persona', on_delete=models.CASCADE)
    ocupacion = models.CharField(max_length=100)
    
    def calcular_aportacion_anual(self):
        # Socios individuales tienen 10% de descuento
        return super().calcular_aportacion_anual() * 0.9

class SocioEmpresa(SocioBase):
    razon_social = models.CharField(max_length=200)
    ruc = models.CharField(max_length=11, unique=True)
    nombre_contacto = models.CharField(max_length=200)
    
    def get_tipo_socio(self):
        return "Socio Empresarial"

# Uso práctico
socio_ind = SocioIndividual.objects.create(
    numero_socio="SOC-001",
    fecha_alta="2023-01-15",
    persona_id=1,
    ocupacion="Ingeniero"
)

# Consultar todos los socios en una sola query
todos_los_socios = SocioBase.objects.all()
for socio in todos_los_socios:
    if hasattr(socio, 'socioindividual'):
        print(f"Individual: {socio.socioindividual.persona.nombre_completo}")
    elif hasattr(socio, 'socioempresa'):
        print(f"Empresa: {socio.socioempresa.razon_social}")
```

**Ventajas**: Puedes consultar socios genéricos y acceder a los específicos. **Ideal para**: Manejar diferentes tipos de cuotas, beneficios o documentación según el tipo de socio.

### Opción C: Herencia Proxy (Vistas Específicas de Tutores)

Cuando necesitas managers diferentes sin cambiar la estructura de datos.

```python
class Tutor(PersonaBase):
    especialidad = models.CharField(max_length=3, choices=Tutor.ESPECIALIDADES)
    disponible = models.BooleanField(default=True)
    
    class Meta:
        verbose_name = "Tutor"

class TutorDisponibleManager(models.Manager):
    def get_queryset(self):
        return super().get_queryset().filter(disponible=True, activo=True)

class TutorOcupadoManager(models.Manager):
    def get_queryset(self):
        return super().get_queryset().filter(disponible=False, activo=True)

# Proxy para tutores disponibles
class TutorDisponibleProxy(Tutor):
    objects = TutorDisponibleManager()
    
    class Meta:
        proxy = True
        verbose_name = "Tutor Disponible"
    
    def asignar_urgente(self, proyecto):
        """Método específico para asignación rápida"""
        self.asignar_a_proyecto()
        # Lógica adicional de notificación urgente
        return f"ASIGNACIÓN URGENTE: {self.nombre_completo} a {proyecto}"

# Proxy para tutores ocupados
class TutorOcupadoProxy(Tutor):
    objects = TutorOcupadoManager()
    
    class Meta:
        proxy = True
        verbose_name = "Tutor Ocupado"

# Uso
# Crear tutor normal
tutor = Tutor.objects.create(
    nombre_completo="María López",
    email="maria@example.com",
    numero_documento="12345678A",
    especialidad="EDU"
)

# Consultar solo disponibles
disponibles = TutorDisponibleProxy.objects.all()
for tutor_disp in disponibles:
    tutor_disp.asignar_urgente("Proyecto Alpha")
```

**Ventajas**: Mismos datos, comportamientos y filtros diferentes. **Ideal para**: Dashboards específicos por estado.

## 3. Polimorfismo en Python (Gestión de roles)

```python
def enviar_comunicacion(persona, asunto, mensaje):
    """Función polimórfica que trabaja con cualquier tipo de persona"""
    info = persona.obtener_info_contacto()
    # Lógica de envío de email
    return f"Enviado a {info}: {asunto}"

# Lista de objetos diferentes
roles = [
    Socio.objects.get(id=1),
    Tutor.objects.get(id=1),
    Voluntario.objects.get(id=1)
]

for actor in roles:
    print(enviar_comunicacion(actor, "Asamblea General", "Recordatorio de asamblea"))
```

---

## 4. Polimorfismo en Django para myONG

### En Vistas y Templates

```python
# models.py
class Beneficiario(PersonaBase):
    """Modelo para beneficiarios de la ONG"""
    situacion = models.TextField()
    fecha_ingreso = models.DateField()
    
    def obtener_estado(self):
        return f"Beneficiario desde {self.fecha_ingreso}"

# views.py
from django.views.generic import ListView
from django.shortcuts import render

class DirectorioRolesView(ListView):
    template_name = 'myONG/directorio.html'
    context_object_name = 'roles'
    
    def get_queryset(self):
        # Combinamos diferentes tipos de roles
        socios = Socio.objects.filter(activo=True)
        tutores = Tutor.objects.filter(activo=True)
        voluntarios = Voluntario.objects.filter(activo=True)
        return list(socios) + list(tutores) + list(voluntarios)

# directorio.html
{% for actor in roles %}
    <div class="actor-card">
        <h3>{{ actor.nombre_completo }}</h3>
        <p>{{ actor.email }} | {{ actor.telefono }}</p>
        <p><strong>Tipo:</strong> {{ actor.__class__.__name__ }}</p>
        
        {# Métodos polimórficos #}
        {% if actor.calcular_aportacion_anual %}
            <p>Aportación anual: €{{ actor.calcular_aportacion_anual }}</p>
        {% endif %}
        
        {% if actor.especialidad %}
            <p>Especialidad: {{ actor.get_especialidad_display }}</p>
        {% endif %}
    </div>
{% endfor %}
```

### Polimorfismo con GenericForeignKey (Comentarios Universales)

```python
from django.contrib.contenttypes.models import ContentType
from django.contrib.contenttypes.fields import GenericForeignKey

class Interaccion(models.Model):
    """Modelo para registrar notas, llamadas o reuniones con cualquier actor"""
    TIPO_CHOICES = [
        ('LLAMADA', 'Llamada Telefónica'),
        ('REUNION', 'Reunión'),
        ('EMAIL', 'Email'),
        ('NOTA', 'Nota Interna'),
    ]
    
    tipo = models.CharField(max_length=10, choices=TIPO_CHOICES)
    fecha = models.DateTimeField(auto_now_add=True)
    notas = models.TextField()
    registrado_por = models.ForeignKey('auth.User', on_delete=models.CASCADE)
    
    # Clave polimórfica
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    object_id = models.PositiveIntegerField()
    actor = GenericForeignKey('content_type', 'object_id')
    
    def __str__(self):
        return f"{self.tipo} con {self.actor} - {self.fecha.strftime('%d/%m/%Y')}"

# Uso en la práctica
from django.contrib.contenttypes.models import ContentType

# Registrar interacción con un socio
socio = Socio.objects.get(numero_socio="SOC-001")
interaccion = Interaccion.objects.create(
    tipo="LLAMADA",
    notas="Confirmó asistencia a asamblea",
    registrado_por=request.user,
    actor=socio  # Funciona con cualquier modelo!
)

# Registrar interacción con un tutor
tutor = Tutor.objects.get(id=1)
Interaccion.objects.create(
    tipo="REUNION",
    notas="Revisión de proyecto educativo",
    registrado_por=request.user,
    actor=tutor
)

# Obtener todas las interacciones de un socio
interacciones_socio = Interaccion.objects.filter(actor=socio)
```

### Patrón Strategy en Notificaciones

```python
class NotificacionONG(models.Model):
    asunto = models.CharField(max_length=200)
    mensaje = models.TextField()
    fecha_envio = models.DateTimeField(null=True, blank=True)
    enviada = models.BooleanField(default=False)
    
    class Meta:
        abstract = True
    
    def enviar(self):
        raise NotImplementedError("Cada subclase debe implementar enviar()")

class NotificacionSocio(NotificacionONG):
    socio = models.ForeignKey(Socio, on_delete=models.CASCADE)
    
    def enviar(self):
        print(f"[EMAIL] Enviando a socio {self.socio.email}: {self.asunto}")
        self.enviada = True
        # Registrar interacción automáticamente
        Interaccion.objects.create(
            tipo="EMAIL",
            notas=self.asunto,
            actor=self.socio
        )
        self.save()

class NotificacionMasiva(NotificacionONG):
    """Notificación a todos los roles activos"""
    def enviar(self):
        roles = list(Socio.objects.filter(activo=True)) + \
                 list(Tutor.objects.filter(activo=True)) + \
                 list(Voluntario.objects.filter(activo=True))
        
        for actor in roles:
            print(f"[EMAIL MASIVO] Enviando a {actor.email}: {self.asunto}")
        
        self.enviada = True
        self.save()

# Uso polimórfico en vista administrativa
def enviar_notificaciones_pendientes(request):
    notificaciones = NotificacionONG.objects.filter(enviada=False)
    
    for notificacion in notificaciones:
        notificacion.enviar()  # Polimorfismo en acción
    
    return JsonResponse({'status': f'{notificaciones.count()} notificaciones enviadas'})
```

---

## 5. Caso Práctico Completo: Sistema de Gestión de Proyectos

```python
# models.py
class ProyectoONG(models.Model):
    nombre = models.CharField(max_length=200)
    descripcion = models.TextField()
    fecha_inicio = models.DateField()
    fecha_fin = models.DateField(null=True, blank=True)
    presupuesto = models.DecimalField(max_digits=12, decimal_places=2)
    
    def asignar_participante(self, participante):
        """Método polimórfico que acepta cualquier tipo de actor"""
        if isinstance(participante, Tutor):
            participante.asignar_a_proyecto()
            return f"Tutor {participante.nombre_completo} asignado"
        elif isinstance(participante, Voluntario):
            VoluntarioProyecto.objects.create(
                voluntario=participante,
                proyecto=self
            )
            return f"Voluntario {participante.nombre_completo} asignado"
        else:
            raise ValueError("Tipo de participante no válido")

class VoluntarioProyecto(models.Model):
    """Relación muchos a muchos con datos adicionales"""
    voluntario = models.ForeignKey(Voluntario, on_delete=models.CASCADE)
    proyecto = models.ForeignKey(ProyectoONG, on_delete=models.CASCADE)
    horas_asignadas = models.IntegerField(default=0)
    
    class Meta:
        unique_together = ['voluntario', 'proyecto']

# managers.py
class ActorManager(models.Manager):
    def activos(self):
        return self.filter(activo=True)
    
    def por_especialidad(self, especialidad):
        return self.filter(especialidad=especialidad, activo=True)

# Actualizar modelo Tutor
class Tutor(PersonaBase):
    especialidad = models.CharField(max_length=3, choices=ESPECIALIDADES)
    disponible = models.BooleanField(default=True)
    
    objects = ActorManager()  # Manager personalizado
    
    def asignar_a_proyecto(self):
        self.proyectos_activos += 1
        self.disponible = self.proyectos_activos < 3
        self.save()

# Uso en vista
def detalle_proyecto(request, proyecto_id):
    proyecto = ProyectoONG.objects.get(id=proyecto_id)
    
    if request.method == "POST":
        actor_id = request.POST.get('actor_id')
        actor_tipo = request.POST.get('actor_tipo')
        
        # Polimorfismo: asignamos según el tipo
        if actor_tipo == 'tutor':
            actor = Tutor.objects.get(id=actor_id)
        elif actor_tipo == 'voluntario':
            actor = Voluntario.objects.get(id=actor_id)
        
        mensaje = proyecto.asignar_participante(actor)
        messages.success(request, mensaje)
    
    return render(request, 'myONG/proyecto_detalle.html', {
        'proyecto': proyecto,
        'tutores_disponibles': Tutor.objects.disponibles(),
        'voluntarios_activos': Voluntario.objects.activos(),
    })
```

---

## 6. Ventajas y Mejores Prácticas para myONG

### ✅ **DO: Mejores Prácticas Específicas**
- Usa herencia abstracta para `PersonaBase` con campos comunes (`nombre`, `email`, `activo`)
- Implementa managers personalizados: `SociosActivosManager`, `TutoresDisponiblesManager`
- Usa proxy models para vistas administrativas separadas (`TutorDisponibleProxy`)
- Sobrescribe `save()` para validar datos específicos (RUC de 11 dígitos)
- Usa `GenericForeignKey` para historial de interacciones universal
- Documenta con docstrings qué métodos deben ser implementados por subclases

### ❌ **DON'T: Errores Comunes a Evitar**
- No abuses de herencia multi-tabla si tienen >1000 registros (afecta performance)
- No uses `isinstance()` en templates; mejor crea propiedades en el modelo
- No dupliques lógica entre modelos; usa `PersonaBase` siempre que sea posible
- Evita crear modelos de solo un campo diferente; usa proxy o campos opcionales

### Performance para ONGs Grandes

```python
# Mal: N+1 queries en listado de socios
for socio in Socio.objects.all():
    print(socio.personabase_ptr.nombre_completo)  # Query adicional por cada socio

# Bien: Select related en herencia multi-tabla
socios = Socio.objects.select_related('personabase_ptr').all()

# Bueno: Prefetch related en relaciones inversas
from django.db.models import Prefetch

tutores = Tutor.objects.prefetch_related(
    Prefetch('interaccion_set', queryset=Interaccion.objects.select_related('registrado_por'))
).filter(activo=True)
```

### Mejora: Serializers Django REST Framework

```python
# serializers.py
from rest_framework import serializers

class PersonaBaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = PersonaBase
        fields = ['id', 'nombre_completo', 'email', 'telefono']

class SocioSerializer(serializers.ModelSerializer):
    persona_info = PersonaBaseSerializer(source='*', read_only=True)
    
    class Meta:
        model = Socio
        fields = ['persona_info', 'numero_socio', 'aportacion_mensual']
```


## Conclusión 

Implementar herencia y polimorfismo te permite:

1. **Reducir duplicación**: Un solo lugar para campos comunes de contacto
2. **Flexibilidad**: Añadir nuevos tipos de socios o roles sin reescribir código
3. **Mantenibilidad**: Cambios en `PersonaBase` se propagan automáticamente
4. **Escalabilidad**: Managers específicos optimizan consultas para cada rol
5. **Integridad**: GenericForeignKey unifica el historial de interacciones

