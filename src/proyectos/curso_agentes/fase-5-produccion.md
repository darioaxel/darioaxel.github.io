---
title: Fase 5 · Producción
icon: shield-halved
order: 8
category:
  - Learning Path
tag:
  - evaluacion
  - observabilidad
  - despliegue
---

# Fase 5 — Producción: evaluación, observabilidad y despliegue

> Objetivo: convertir tus agentes en sistemas fiables: evaluarlos de forma sistemática, observar cada ejecución, protegerlos con guardrails y desplegarlos en tu propia infraestructura.

## 🎬 Vídeos del MOOC de Berkeley para esta fase

El MOOC dedica cuatro sesiones a evaluación, despliegue real y seguridad. Son el núcleo teórico de esta fase.

### Agent Evaluation & Project Overview

Panorama de cómo se evalúan los agentes en 2025: benchmarks, trazas, métricas y errores estadísticos comunes.

<VidStack src="https://www.youtube.com/watch?v=VfOA2a0dj4w" />

### Practical Lessons from Deploying Real-World AI Agents — Clay Bavor (Sierra)

Lecciones de desplegar agentes de soporte con clientes reales: dónde fallan, cómo se monitorizan y qué se aprende del tráfico real.

<VidStack src="https://www.youtube.com/watch?v=sfJM4LaiYsM" />

### Agentic AI Safety & Security — Dawn Song (UC Berkeley)

Riesgos de seguridad específicos de agentes: prompt injection, acciones no autorizadas y cómo diseñar defensas.

<VidStack src="https://www.youtube.com/watch?v=CvZDJxd4LKM" />

---

## 1. Evaluación de agentes

Los agentes son no deterministas: la evaluación no es opcional, es el único modo de saber si tu sistema mejora.

::: tabs#eval

@tab Evaluación offline

Correr datasets fijos contra el agente antes de cada cambio:

- **Datasets de casos**: 20–100 tareas reales con resultado esperado (o criterio de éxito).
- **Trazas (traces)**: cada ejecución queda registrada (pasos, tool calls, tokens, latencia).
- **Métricas**: tasa de éxito final, tasa de llamada correcta de herramientas, pasos por tarea, coste por tarea.

@tab Evaluación online

Con usuarios reales:

- **Human-in-the-loop sampling**: revisar manualmente una muestra de ejecuciones.
- **Feedback explícito**: 👍/👎 con seguimiento.
- **Métricas de negocio**: resolución sin escalado, tiempo hasta resolución.

:::

Herramientas: **LangSmith**, **Langfuse** (open source, self-hosteable), **Promptfoo** (visto en Fase 4) y **Braintrust**.

```python
# Ejemplo: dataset + eval con Langfuse (self-hosteable)
from langfuse import Langfuse
langfuse = Langfuse()

# Cada ejecución se traza automáticamente
with langfuse.start_as_current_span(name="agent-run") as span:
    result = graph.invoke({"messages": [HumanMessage(content=pregunta)]})
    span.update(level="DEFAULT", output=result)
```

## 2. Observabilidad

Si no ves qué hace el agente, no puedes mejorarlo. Mínimo viable:

- **Trazas completas**: cada LLM call, tool call y decisión con sus argumentos.
- **Costes por ejecución**: tokens × precio del modelo.
- **OpenTelemetry**: estándar abierto para instrumentación (LangGraph y MAF lo soportan nativamente).

**Langfuse** es la opción open source de referencia: trazas, scores, datasets y evaluaciones, self-hosteable con Docker:

```bash
docker compose -f docker-compose.langfuse.yml up -d
```

## 3. Guardrails

Validación y límites alrededor del agente:

1. **Entrada**: filtrado de prompt injection, validación de permisos del usuario.
2. **Durante la ejecución**: límite de iteraciones, allowlist de herramientas por contexto.
3. **Salida**: esquemas estructurados, filtros de contenido, verificación de que la respuesta usa datos reales.
4. **Acciones**: herramientas de escritura (pagos, borrados, envíos) siempre con confirmación humana.

::: caution Prompt injection
Un agente que lee contenido externo (web, emails, documentos) puede recibir instrucciones maliciosas dentro del contenido ("ignora tus instrucciones anteriores y..."). Mitigaciones: separar datos de instrucciones, delimitar contenido externo, nunca dar a una herramienta de lectura permisos de escritura sin validación.
:::

## 4. Persistencia y ejecución duradera

- **Checkpoints** (LangGraph): pausar y reanudar flujos largos.
- **Colas** para tareas asíncronas (Celery, RQ) cuando la tarea supera el tiempo de una petición HTTP.
- **Human-in-the-loop** operativo: `interrupt` + herramienta de aprobación (Slack, email, panel propio).

## 5. Despliegue

```bash
# Ejemplo: agente en producción con Docker
docker build -t mi-agente .
docker run -p 8000:8000 \
  -e OPENAI_API_KEY=... \
  -e LANGFUSE_HOST=http://langfuse:3000 \
  mi-agente
```

::: tabs#plataformas

@tab Plataformas low-code open source

- **Dify** (~144k estrellas): interfaz visual, RAG, agentes, self-hosteable.
- **n8n**: automatización de workflows con nodos de IA, self-hosteable.

Ideales para casos de negocio sin código.

@tab Código propio

LangGraph (API con FastAPI/Flask) + vLLM/Ollama local + Langfuse. Máximo control; es el camino que has construido en este learning path.

:::

## 6. Proyecto final

Un agente en producción con:

- [ ] Modelo abierto servido por ti (vLLM u Ollama)
- [ ] Trazado completo de cada ejecución (Langfuse)
- [ ] Evaluación automatizada sobre un dataset de 20+ tareas
- [ ] Guardrails: validación de entradas/salidas + aprobación humana en acciones de escritura
- [ ] Deploy con Docker en tu infraestructura
- [ ] Un servidor MCP propio (Fase 3) conectado

### 🎬 Vídeo extra — agentes autónomos y aprendizaje continuo

Sesión de cierre del MOOC sobre agentes con cuerpo (robótica), interacción y aprendizaje: útil como horizonte de hacia dónde evoluciona todo esto.

<VidStack src="https://www.youtube.com/watch?v=iDhzzugMOLA" />

**Autonomous Agents: Embodiment, Interaction, and Learning** — Peter Stone (UT Austin / Sony AI) · Dec 1, 2025

## Recursos de la fase

| Recurso | Enlace |
| --- | --- |
| Langfuse (observabilidad open source) | https://langfuse.com |
| OpenTelemetry | https://opentelemetry.io |
| Promptfoo (evaluación) | https://www.promptfoo.dev |
| Dify | https://dify.ai |
| n8n | https://n8n.io |
| τ2-bench (benchmark de agentes conversacionales) | https://arxiv.org/abs/2506.07982 |
| MOOC completo: Agentic AI (UC Berkeley) | https://rdi.berkeley.edu/agentic-ai/f25 |

::: tip Has completado el learning path
Con el proyecto final tendrás: fundamentos (F1) → tool calling (F1b) → frameworks (F2) → protocolos abiertos (F3) → modelos autoalojados (F4) → producción (F5). Siguiente paso natural: especializarte por dominio (RAG profundo, agentes de código, fine-tuning) o contribuir a un proyecto open source.
:::