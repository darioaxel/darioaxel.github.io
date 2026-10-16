---
title: Ruta de aprendizaje
icon: route
order: 1
---

# Learning path 

## Fase 0 — Fundamentos previos (1–2 semanas)

Antes de tocar ningún framework, necesitas dominar las piezas sobre las que se construyen los agentes:

- **Python intermedio** (funciones, decoradores, async/await, entornos virtuales) y Git básico.
- **LLMs y prompting**: qué es un modelo de lenguaje, tokenización, temperatura, system prompts, técnicas de prompting (zero-shot, few-shot, chain-of-thought).
- **Function calling / tool calling**: cómo un LLM decide cuándo invocar una función externa. Es el mecanismo central de todo agente.
- **APIs REST y JSON**: casi todo lo que un agente consume y produce pasa por aquí.

📌 *Proyecto:* un script Python que recibe una pregunta en lenguaje natural y decide si debe llamar a una API del clima o responder directamente.

## Fase 1 — Conceptos clave de agentes (2–3 semanas)

Aquí entiendes la teoría, sin framework todavía:

- **El agent loop**: percepción → razonamiento → acción → observación, iterado hasta completar la tarea.
- **Patrones clásicos**: ReAct (razonar + actuar), Plan-and-Execute, Reflexión.
- **Herramientas (tools)**: diseño de herramientas bien delimitadas y documentadas.
- **Memoria**: memoria de corto plazo (contexto), largo plazo (vectores) y episódica.
- **MCP (Model Context Protocol)**: el estándar abierto (creado por Anthropic, ahora adoptado por toda la industria) para conectar LLMs con herramientas y datos de forma uniforme .
- **RAG (Retrieval-Augmented Generation)**: embeddings, bases de datos vectoriales (Qdrant, ChromaDB), chunking e híbridos.

📌 *Proyecto:* implementa un agente ReAct "desde cero" (~100 líneas) que usa 2–3 herramientas. Entender el loop a mano es lo que te permitirá depurar cualquier framework después.

## Fase 2 — Primer framework (2–4 semanas)

Empieza por el más simple para aprender el ciclo de vida, luego pasa a uno productivo:

- **smolagents** (Hugging Face): el framework más minimalista; su `CodeAgent` expresa acciones como código Python, ideal para entender el loop interno. Muy recomendado como primer framework y para experimentar con modelos locales .
- **CrewAI** (MIT): mentalidad de "equipo de agentes con roles" (investigador, analista, redactor). Es la forma más intuitiva de construir multi-agente y requiere poco código .
- **LangGraph** (MIT): el estándar de facto para agentes con estado, ramificación, checkpoints y human-in-the-loop. Es el que usa la industria para producción (Uber, Cisco, LinkedIn, BlackRock lo usan según la documentación de LangGraph) .

📌 *Proyecto:* un agente de investigación con 3 agentes de CrewAI (buscador → analista → redactor) que genera un informe. Después rehaz el flujo en LangGraph para sentir la diferencia de control.

## Fase 3 — Multi-agente y protocolos abiertos (3–4 semanas)

- **Orquestación**: agentes jerárquicos, secuenciales, con delegación (handoffs) y colaboración.
- **A2A (Agent2Agent)**: protocolo abierto de Google para que agentes de distintos sistemas se comuniquen.
- **MCP en profundidad**: construir tu propio servidor MCP y conectarlo a Claude Desktop o a tus agentes.
- **Microsoft Agent Framework**: sucesor unificado de AutoGen + Semantic Kernel (AutoGen quedó en modo mantenimiento, solo correcciones) . Interesante si vienes del ecosistema Microsoft/.NET.
- **Google ADK** (Apache 2.0): si trabajas en GCP o con Gemini; su versión 2.0 añadió workflows basados en grafos .

📌 *Proyecto:* dos agentes independientes que se comunican: uno expone herramientas vía MCP y otro le subcontrata trabajo vía A2A.

## Fase 4 — Modelos abiertos y self-hosting (2–4 semanas)

Como quieres el enfoque open source, aquí aprendes a desacoplarte de las APIs cerradas:

- **Ollama** para correr modelos locales y **vLLM** para servir modelos en producción.
- Modelos abiertos con buen tool-calling: Qwen, Llama, DeepSeek, Mistral (ojo: la compatibilidad de endpoints no garantiza el mismo comportamiento de tool-calling — pruébalo siempre) .
- **Promptfoo** o evaluaciones propias para comparar modelos abiertos vs. cerrados en tus tareas.

📌 *Proyecto:* migra tu agente de LangGraph de la API de OpenAI a un modelo local servido con vLLM, manteniendo las herramientas intactas.

## Fase 5 — Producción: evaluación, observabilidad y despliegue (3+ semanas)

- **Evaluación**: trazas, datasets de evaluación, métricas de calidad. Herramientas open: Langfuse, LangSmith (herramientas de observabilidad), OpenTelemetry.
- **Guardarraíles (guardrails)**: validación de entradas/salidas, aprobaciones humanas en el loop.
- **Persistencia y ejecución duradera**: checkpoints, reanudación de tareas largas, colas.
- **Plataformas low-code open source** para casos de negocio: **Dify** (~144k estrellas, interfaz visual, self-hosteable) y **n8n** (workflow automation self-hosteable con nodos de IA)  .

📌 *Proyecto final:* un agente en producción con trazado completo, evaluación automatizada, desplegado en tu propia infraestructura (Docker), usando modelo abierto y con un servidor MCP propio.

