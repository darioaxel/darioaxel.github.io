# Práctica 5: Gestión de Socios con Validación Externa

## Objetivos de aprendizaje

- Implementar serializadores con lógica de negocio (no mapeo 1:1 modelo-JSON)
- Consumir APIs externas desde Django
- Integrar datos externos en el flujo de validación
- Manejar errores de servicios terceros

## Escenario

Tu ONG **MyOng** necesita verificar la validez de los documentos de identidad (DNI/NIE) de los socios antes de aceptarlos. Para ello, consultarás una API pública de validación (simulada con httpbin.org) y enriquecerás los datos del socio con información geográfica obtenida de la API de Códigos Postales de España.


### 1.1 Contexto

El modelo `Socio` tiene estos campos relevantes:

```python
# models.py (ya existente)
class Socio(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    nombre = models.CharField(max_length=100)
    apellidos = models.CharField(max_length=200)
    documento_identidad = models.CharField(max_length=20, unique=True)
    codigo_postal = models.CharField(max_length=5)
    provincia = models.CharField(max_length=100, blank=True)  # Se rellena automático
    es_dni_valido = models.BooleanField(default=False)  # Se valida externamente
    fecha_validacion = models.DateTimeField(null=True, blank=True)
```

### 1.2 Problema a resolver

Debes crear un `SocioValidadoSerializer` que:

1. **Al crear un socio**: Valide el formato del DNI/NIE (8 dígitos + letra, o formato NIE)
2. **Consulte API externa**: Envíe el DNI a `https://httpbin.org/post` (simula validación) y registre la respuesta
3. **Enriquezca datos**: Consulte `https://api.zippopotam.us/es/{cp}` para obtener la provincia desde el código postal
4. **Guarde metadatos**: Almacene en `es_dni_valido` si la API respondió HTTP 200, y la fecha de validación

### 1.3 Ayuda

Para la resolución de cada uno de los apartados se debe buscar en la documentación oficial cómo resolver estos puntos (no se proporciona la solución directa):

| Problema | Referencias a consultar |
|----------|------------------------|
| ¿Cómo hacer peticiones HTTP desde Django? | Buscar: `requests python`, `urllib django` |
| ¿Dónde ejecutar lógica de validación que requiera datos ya parseados? | Buscar: `serializer validate method drf`, `object level validation` |
| ¿Cómo modificar datos antes de guardar sin que estén en el payload? | Buscar: `serializer create method override`, `validated_data modify` |
| ¿Cómo manejar si la API externa está caída? | Buscar: `requests timeout exception`, `try except python` |
| ¿Cómo formatear fechas automáticamente? | Buscar: `django timezone now`, `datetime utc` |

### 1.4 Esqueleto proporcionado

```python
# socios/serializers.py
import requests
from django.utils import timezone
from rest_framework import serializers
from .models import Socio, Direccion

class SocioValidadoSerializer(serializers.ModelSerializer):
    """
    Serializer que valida DNI contra API externa y enriquece provincia desde CP.
    Campos de solo lectura: provincia, es_dni_valido, fecha_validacion
    """
    # TODO: Define qué campos son de solo lectura en Meta
    
    class Meta:
        model = Socio
        # TODO: Especifica fields o exclude según necesidad
    
    def validate_documento_identidad(self, value):
        """
        Valida formato del DNI/NIE.
        Investiga: validación regex DNI español
        """
        # TU CÓDIGO AQUÍ
        pass
    
    def validate(self, data):
        """
        Validación a nivel de objeto.
        Investiga: cómo acceder a campos ya validados
        """
        # TODO: Verificar que codigo_postal tiene 5 dígitos
        return data
    
    def create(self, validated_data):
        """
        Crea el socio consultando APIs externas.
        Investiga: cómo hacer peticiones POST y GET, manejar timeouts
        """
        # PASO 1: Extraer datos necesarios (dni, cp)
        dni = validated_data.get('documento_identidad')
        cp = validated_data.get('codigo_postal')
        
        # PASO 2: Consultar API de validación de DNI (simulada con httpbin)
        # Endpoint: POST https://httpbin.org/post
        # Enviar JSON: {"documento": dni}
        # Si responde 200, es_dni_valido = True
        
        # PASO 3: Consultar API de códigos postales
        # Endpoint: GET https://api.zippopotam.us/es/{cp}
        # Extraer: response.json()['places'][0]['state'] (es la provincia)
        
        # PASO 4: Añadir campos calculados a validated_data
        # provincia = resultado de paso 3
        # es_dni_valido = resultado de paso 2
        # fecha_validacion = timezone.now()
        
        # PASO 5: Crear el socio con datos completos
        return super().create(validated_data)
```

### 1.5 Criterios de evaluación

- [ ] El serializer rechaza DNIs con formato inválido (mensaje claro)
- [ ] Consulta httpbin.org y registra si respondió correctamente
- [ ] Obtiene provincia desde zippopotam.us y la guarda
- [ ] Maneja excepciones si las APIs fallan (no crashea, guarda `es_dni_valido=False`)
- [ ] Los campos calculados no aparecen en el payload de entrada (read-only)
