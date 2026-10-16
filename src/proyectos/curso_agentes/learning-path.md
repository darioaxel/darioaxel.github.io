---
title: Ruta de aprendizaje
icon: route
order: 1
---

# Learning Path — Agentes de IA con enfoque open source

Ruta completa para aprender a construir agentes de IA sobre software libre: desde los fundamentos de LLMs hasta agentes multi-agente con protocolos abiertos (MCP, A2A), modelos autoalojados y despliegue en producción.

## Estructura del path

| Orden | Fase | Contenido |
| --- | --- | --- |
| 1 | **LLMs y Prompting** | Qué es un LLM, tokenización, temperatura, system prompts, zero/few-shot, CoT |
| 2 | **Function/Tool Calling** | El mecanismo central de todo agente, Structured Outputs |
| 3 | **Tu primer framework** | smolagents → CrewAI → LangGraph |
| — | **Anexo Kimi** | Usar Kimi (Moonshot AI) y su infraestructura en los frameworks |
| 4 | **Multi-agente y protocolos** | Patrones de orquestación, MCP, A2A, Microsoft Agent Framework, ADK 2.0 |
| 5 | **Modelos abiertos y self-hosting** | Ollama, vLLM, cuantización, comparación de modelos con promptfoo |
| 6 | **Producción** | Evaluación, observabilidad (Langfuse), guardrails, despliegue |

::: tip Cómo usar estos documentos
Están formateados para **vuepress-theme-hope**. Los contenedores (`::: tip`, `::: warning`...), las pestañas (`::: tabs` con `@tab`) y el componente `<VidStack>` requieren que actives las opciones correspondientes en tu tema. Ver la sección de configuración al final de esta página.
:::

---

## 🎓 MOOC de referencia: Agentic AI — UC Berkeley CS294/194-196 (Fall 2025)

Curso universitario **gratuito y online** que acompaña todo el learning path. Más de 40.000 estudiantes en su primera edición; clases completas en YouTube enlazadas desde la web oficial: [rdi.berkeley.edu/agentic-ai/f25](https://rdi.berkeley.edu/agentic-ai/f25).

A continuación, las 12 sesiones grabadas, mapeadas a las fases del path.

### 🗺️ Mapa de vídeos → fases

| Sesión | Ponente | Fase recomendada |
| --- | --- | --- |
| LLM Agents Overview (Sep 15) | Yann Dubois (OpenAI) | Fase 1 |
| Predictable Noise in LLM (Oct 27) | Sida Wang (Meta) | Fase 1 |
| Post-Training Verifiable Agents (Sep 29) | Jiantao Jiao (NVIDIA) | Fase 1b |
| Evolution of system designs (Sep 22) | Yangqing Jia (NVIDIA) | Fase 4 |
| Training Agentic Models (Oct 13) | Weizhu Chen (Microsoft) | Fase 4 |
| Multi-Agent AI (Oct 20) | Noam Brown (OpenAI) | Fase 3 |
| Multi-Agent Systems in the Era of LLMs (Nov 17) | Oriol Vinyals (Google DeepMind) | Fase 3 |
| AI Agents for Scientific Discoveries (Nov 3) | James Zou (Stanford) | Fase 3 (extra) |
| Agent Evaluation & Project Overview (Oct 6) | — | Fase 5 |
| Practical Lessons from Deploying Real-World AI Agents (Nov 10) | Clay Bavor (Sierra) | Fase 5 |
| Agentic AI Safety & Security (Dec 8) | Dawn Song (UC Berkeley) | Fase 5 |
| Autonomous Agents: Embodiment (Dec 1) | Peter Stone (UT Austin / Sony AI) | Fase 5 (extra) |

### 1. LLM Agents Overview

<VidStack src="https://www.youtube.com/watch?v=r1qZpYAmqmg" />

**Yann Dubois (OpenAI) · Sep 15, 2025** — Panorama general de los agentes LLM.

### 2. Evolution of system designs from an AI engineer perspective

<VidStack src="https://www.youtube.com/watch?v=xqRAS6rAouo" />

**Yangqing Jia (NVIDIA) · Sep 22, 2025** — Evolución del diseño de sistemas de IA.

### 3. Post-Training Verifiable Agents

<VidStack src="https://www.youtube.com/watch?v=3l0Zxus34es" />

**Jiantao Jiao (NVIDIA) · Sep 29, 2025** — Entrenamiento de modelos agentic con recompensas verificables.

### 4. Agent Evaluation & Project Overview

<VidStack src="https://www.youtube.com/watch?v=VfOA2a0dj4w" />

**Oct 6, 2025** — Evaluación de agentes: benchmarks, trazas y errores estadísticos.

### 5. Some Challenges and Lessons from Training Agentic Models

<VidStack src="https://www.youtube.com/watch?v=xNxrBHZPDvM" />

**Weizhu Chen (Microsoft) · Oct 13, 2025** — Lecciones de entrenar modelos para tool use multi-paso.

### 6. Multi-Agent AI

<VidStack src="https://www.youtube.com/watch?v=SrLcGdVOb9w" />

**Noam Brown (OpenAI) · Oct 20, 2025** — Estado del arte de sistemas multi-agente.

### 7. Predictable Noise in LLM

<VidStack src="https://www.youtube.com/watch?v=HV8pugcFVO0" />

**Sida Wang (Meta) · Oct 27, 2025** — Por qué cambian los resultados con prompt/temperatura.

### 8. AI Agents to Automate Scientific Discoveries

<VidStack src="https://www.youtube.com/watch?v=yqPIsTTdUkc" />

**James Zou (Stanford) · Nov 3, 2025** — Agentes multi-LLM diseñando nanobodies anti-SARS-CoV-2.

### 9. Practical Lessons from Deploying Real-World AI Agents

<VidStack src="https://www.youtube.com/watch?v=sfJM4LaiYsM" />

**Clay Bavor (Sierra) · Nov 10, 2025** — Despliegue de agentes con clientes reales.

### 10. Multi-Agent Systems in the Era of LLMs

<VidStack src="https://www.youtube.com/watch?v=ntjOxjZMaac" />

**Oriol Vinyals (Google DeepMind) · Nov 17, 2025** — Multi-agente como vía hacia inteligencia más general.

### 11. Autonomous Agents: Embodiment, Interaction, and Learning

<VidStack src="https://www.youtube.com/watch?v=iDhzzugMOLA" />

**Peter Stone (UT Austin / Sony AI) · Dec 1, 2025** — Agentes con cuerpo y aprendizaje continuo.

### 12. Agentic AI Safety & Security

<VidStack src="https://www.youtube.com/watch?v=CvZDJxd4LKM" />

**Dawn Song (UC Berkeley) · Dec 8, 2025** — Seguridad de agentes: prompt injection y defensas.

---

## ⚙️ Configuración necesaria en vuepress-theme-hope

Para que estos documentos rendericen correctamente en tu servidor, activa las siguientes opciones en tu tema:

```ts
// .vuepress/theme.ts
import { hopeTheme } from "vuepress-theme-hope";

export default hopeTheme({
  markdown: {
    hint: true,        // contenedores ::: tip / warning / note / details
    tabs: true,        // ::: tabs con @tab
  },
  plugins: {
    components: {
      // componentes usados en los documentos
      components: ["VidStack", "Badge"],
    },
  },
});
```

::: details Otras opciones de theme hope útiles para este material
- `markdown.tasklist: true` — listas de tareas `- [ ]`
- `markdown.codeTabs` / code group — bloques de código en pestañas
- `markdown.footnote: true` — notas al pie
- `markdown.gfm: true` — compatibilidad GFM
- `markdown.imageSize: true` — tamaños de imagen `=300x200`
- `markdown.mermaid: true` — diagramas (ideal para el agent loop y los grafos de LangGraph)
:::

## Otras fuentes universitarias online

| Curso | Institución | Enlace |
| --- | --- | --- |
| CS329A — Self-Improving AI Agents | Stanford | https://cs329a.stanford.edu |
| LLM Agents MOOC (edición anterior) | UC Berkeley (RDI) | https://rdi.berkeley.edu/llm-agents |
| MIT OpenCourseWare | MIT | https://ocw.mit.edu |
| Hugging Face Agents Course | Hugging Face | https://huggingface.co/learn/agents-course |
| AI Agents for Beginners | Microsoft | https://github.com/microsoft/ai-agents-for-beginners |