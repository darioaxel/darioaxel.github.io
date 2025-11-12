---
title: "Herencia y polimorfismo: un enfoque práctico y comparativo entre Java y Django"
date: 2025-10-03
category: [Blog]
tag: [Programacion, Herencia, Polimorfismo]
type: article
---

# Herencia y polimorfismo: un enfoque práctico y comparativo entre Java y Django

## Introducción

En el marco de una organización sin ánimo de lucro (ONG) como *myOng*, la gestión de **proyectos** puede adquirir múltiples formas.
Algunos proyectos se centran en la **modificación de estatutos**, donde varios socios colaboran con una fecha tope y documentación asociada; otros son **proyectos de actividades**, donde uno o varios socios presentan una propuesta, se vota, se aprueba un presupuesto y se lleva a cabo, generando finalmente una memoria de ejecución y gastos.

A nivel de diseño de software, ambos tipos comparten la misma **entidad conceptual**: un **Proyecto**, aunque difieren en su estructura y comportamiento.
Esto plantea una cuestión fundamental: ¿cómo modelar en el código una entidad con múltiples implementaciones?

En este artículo se aborda cómo resolver este problema en **Java**, un lenguaje fuertemente tipado y orientado a objetos, y en **Django**, el framework web de Python basado en el patrón MTV (Model–Template–View).

## Enfoque en Java: interfaces, herencia y polimorfismo

En Java, la orientación a objetos se expresa de forma explícita a través de **clases, interfaces y herencia**.
Un modelo típico para nuestros proyectos podría estructurarse así:

```java
// Interfaz común
public interface Proyecto {
    String getNombre();
    void iniciar();
    void finalizar();
}
```

Ahora implementamos dos tipos concretos de proyecto:

```java
public class ProyectoEstatutos implements Proyecto {
    private String nombre;
    private LocalDate fechaTope;
    private List<String> documentos;

    public ProyectoEstatutos(String nombre, LocalDate fechaTope) {
        this.nombre = nombre;
        this.fechaTope = fechaTope;
        this.documentos = new ArrayList<>();
    }

    @Override
    public void iniciar() {
        System.out.println("Comienza la revisión de estatutos. Fecha límite: " + fechaTope);
    }

    @Override
    public void finalizar() {
        System.out.println("Revisión completada. Documentos generados: " + documentos.size());
    }
}
```

Y un segundo tipo:

```java
public class ProyectoActividad implements Proyecto {
    private String nombre;
    private double presupuesto;
    private boolean aprobado;
    private String memoriaFinal;

    public ProyectoActividad(String nombre, double presupuesto) {
        this.nombre = nombre;
        this.presupuesto = presupuesto;
        this.aprobado = false;
    }

    @Override
    public void iniciar() {
        System.out.println("Proyecto de actividad propuesto: " + nombre);
    }

    @Override
    public void finalizar() {
        if (aprobado)
            System.out.println("Actividad finalizada. Memoria: " + memoriaFinal);
        else
            System.out.println("Actividad no aprobada.");
    }
}
```

Este modelo permite usar **polimorfismo**:

```java
List<Proyecto> proyectos = List.of(
    new ProyectoEstatutos("Reforma Estatutos", LocalDate.of(2025, 6, 30)),
    new ProyectoActividad("Taller de reciclaje", 300.0)
);

for (Proyecto p : proyectos) {
    p.iniciar();
    p.finalizar();
}
```

### Ventajas del modelo Java

* **Tipado fuerte**: las diferencias entre tipos están definidas en tiempo de compilación.
* **Polimorfismo explícito**: se puede invocar `p.iniciar()` sin conocer la clase concreta.
* **Control estricto del modelo**: ideal para arquitecturas empresariales grandes.

### Inconvenientes

* Se necesita más **código boilerplate** (getters, constructores, etc.).
* La **persistencia** (guardar en BD) suele gestionarse con frameworks externos como JPA/Hibernate.
* Añadir un nuevo tipo implica crear una nueva clase y ajustar el mapeo ORM.


## Enfoque en Django: modelos, herencia ORM y flexibilidad dinámica

Django se basa en el principio de **"los modelos son tus datos"**:
cada clase en `models.py` representa una tabla en la base de datos.
La herencia de modelos proporciona tres patrones equivalentes a los del mundo Java.

### 1. Modelo base abstracto

Primero, definimos una clase `ProyectoBase` común:

```python
# proyectos/models/base.py
from django.db import models
import uuid

class ProyectoBase(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    nombre = models.CharField(max_length=150)
    fecha_inicio = models.DateField(auto_now_add=True)
    estado = models.CharField(max_length=30, default='pendiente')

    class Meta:
        abstract = True
```

### 2. Implementaciones concretas

```python
# proyectos/models/estatutos.py
from .base import ProyectoBase

class ProyectoEstatutos(ProyectoBase):
    fecha_tope = models.DateField()
    documentos = models.TextField(blank=True)

    def iniciar(self):
        print(f"Iniciando revisión de estatutos con fecha límite {self.fecha_tope}")
```

```python
# proyectos/models/actividad.py
from .base import ProyectoBase

class ProyectoActividad(ProyectoBase):
    presupuesto = models.DecimalField(max_digits=8, decimal_places=2)
    aprobado = models.BooleanField(default=False)
    memoria_final = models.TextField(blank=True)

    def iniciar(self):
        print(f"Iniciando actividad '{self.nombre}' con presupuesto {self.presupuesto} €")
```

### 3. Uso en código (vista o servicio)

```python
from proyectos.models import ProyectoEstatutos, ProyectoActividad

proyectos = [
    ProyectoEstatutos(nombre="Modificación de Estatutos", fecha_tope="2025-06-30"),
    ProyectoActividad(nombre="Taller de reciclaje", presupuesto=300)
]

for p in proyectos:
    p.iniciar()
```

### Equivalencia conceptual

| Concepto Java                  | Equivalente Django                                       |
| ------------------------------ | -------------------------------------------------------- |
| Interface `Proyecto`           | Clase abstracta `ProyectoBase`                           |
| Clases hijas concretas         | Modelos hijos (`ProyectoEstatutos`, `ProyectoActividad`) |
| Polimorfismo en objetos        | Métodos compartidos (`iniciar`, `finalizar`)             |
| Persistencia JPA/Hibernate     | ORM integrado de Django                                  |
| Tipos definidos en compilación | Tipos definidos dinámicamente en tiempo de ejecución     |



## Comparativa entre ambos enfoques

| Aspecto                  | Java                                   | Django                                |
| ------------------------ | -------------------------------------- | ------------------------------------- |
| **Lenguaje**             | Fuertemente tipado, compilado          | Dinámico, interpretado                |
| **Abstracción de datos** | Clases + JPA/Hibernate                 | Modelos ORM                           |
| **Polimorfismo**         | Estático (interfaces, herencia)        | Dinámico (métodos sobreescritos)      |
| **Extensibilidad**       | Alta, pero más código                  | Alta, con menor boilerplate           |
| **Persistencia**         | Mediante frameworks externos           | Incluida en el framework              |
| **Productividad**        | Requiere planificación y configuración | Muy rápida para prototipos            |
| **Escalabilidad**        | Excelente para sistemas grandes        | Excelente con modularización adecuada |

## Conclusiones

La gestión de distintos tipos de proyectos en una ONG ilustra perfectamente cómo las **decisiones de diseño** dependen del lenguaje y del framework.
Mientras Java ofrece una **arquitectura rígida y segura**, Django permite una **evolución ágil del modelo**, ideal para proyectos donde los tipos de entidad pueden crecer o cambiar con el tiempo.

En el entorno educativo o de desarrollo rápido —como el caso de *myOng*—, Django facilita **prototipar, probar y desplegar** nuevas variantes de proyecto sin apenas esfuerzo, manteniendo coherencia mediante la herencia de modelos.
En cambio, Java brilla cuando se necesita **consistencia contractual** y **control fuerte sobre tipos y validaciones**.

Ambas estrategias convergen en un mismo principio:

> Diseñar las entidades en torno a su **comportamiento compartido** y extenderlas mediante **especialización controlada**.

## Bibliografía técnica

1. Gamma, E., Helm, R., Johnson, R., & Vlissides, J. (1994). *Design Patterns: Elements of Reusable Object-Oriented Software*. Addison-Wesley.
2. Bloch, J. (2018). *Effective Java* (3rd ed.). Addison-Wesley.
3. Greenfeld, D., & Roy, A. (2021). *Two Scoops of Django 3.x: Best Practices for the Django Web Framework*. Two Scoops Press.
4. *Django Documentation: Model Inheritance*. Django Software Foundation. [https://docs.djangoproject.com/en/stable/topics/db/models/#model-inheritance](https://docs.djangoproject.com/en/stable/topics/db/models/#model-inheritance)
5. *Java SE 17 Documentation: Interfaces and Inheritance*. Oracle. [https://docs.oracle.com/en/java/javase/17/docs/api/](https://docs.oracle.com/en/java/javase/17/docs/api/)
6. *RealPython – Django ORM Best Practices*. Real Python, 2023.
7. *Baeldung – Inheritance in Java*. Baeldung, 2023.

---

¿Quieres que ahora te genere una **versión extendida con diagramas UML (en Mermaid)** para ilustrar la herencia en ambos enfoques (Java y Django)?
Sería ideal para complementar el artículo visualmente.
