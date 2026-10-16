---
title: Fase 2 — Primer framework de agentes
icon: diagram-project
order: 3
---

# Fase 2 — Tu primer framework de agentes (smolagents → CrewAI → LangGraph)

**Documentación de estudio — enfoque en sistemas open source**
Última actualización: octubre de 2026

> Objetivo de la fase: pasar de entender el agent loop "a mano" (Fase 1) a construir agentes con frameworks, sin perder el control sobre lo que ocurre dentro. Dominarás los tres frameworks open source más relevantes y sabrás cuándo usar cada uno.

---

## 0. ¿Por qué estos tres frameworks?

| Framework | Licencia | Filosofía | Cuándo usarlo |
|---|---|---|---|
| **smolagents** (Hugging Face) | Apache 2.0 | Minimalista (~1000 líneas de código base). El agente "piensa en código": escribe Python en cada paso y lo ejecuta | Aprender el ciclo interno, prototipos rápidos, combinar herramientas con lógica compleja en pocos pasos |
| **CrewAI** | MIT | Mentalidad de "equipo": agentes con roles, objetivos y backstories que colaboran en tareas | Multi-agente intuitivo, procesos de negocio (investigación → análisis → redacción), poco código |
| **LangGraph** | MIT | Grafos de estados con nodos y aristas: control total del flujo, ramificación, checkpoints, human-in-the-loop | Producción: flujos complejos, recuperación de errores, pausas humanas, persistencia |

La ruta recomendada: **smolagents primero** (entender el loop con mínima abstracción) → **CrewAI** (sentir cómo se descompone un problema en roles) → **LangGraph** (control de producción).

---

## 1. smolagents — "piensa en código"

### 1.1 Idea central

smolagents es la librería minimalista de Hugging Face. Su apuesta diferente es el **CodeAgent**: en cada paso, el LLM no devuelve una llamada a herramienta en JSON, sino un **fragmento de código Python** que puede llamar herramientas, hacer bucles, transformar datos y combinar resultados. El framework lo ejecuta en un entorno controlado. Menos pasos, más expresividad, y puedes inspeccionar el código exacto que el agente ejecutó.

Hay dos tipos de agente:

- `CodeAgent`: escribe y ejecuta código Python en cada paso (el recomendado por defecto).
- `ToolCallingAgent`: emite llamadas a herramienta en JSON, como la API de OpenAI. Útil si no quieres ejecutar código.

### 1.2 Primer agente (hello world)

```bash
pip install smolagents
```

```python
from smolagents import CodeAgent, DuckDuckGoSearchTool, InferenceClientModel

agent = CodeAgent(tools=[DuckDuckGoSearchTool()], model=InferenceClientModel())

agent.run("Busca las mejores recomendaciones de música para una fiesta.")
```

- `InferenceClientModel` usa la Serverless Inference API de Hugging Face (hay tokens gratuitos). El modelo por defecto es `Qwen/Qwen2.5-Coder-32B-Instruct`, que es gratuito y está optimizado para código.
- Para modelos 100% locales, puedes usar `LiteLLMModel` apuntando a Ollama.

Al ejecutarlo, verás un **trace paso a paso**: el código que el agente genera, lo que devuelve cada herramienta y cómo itera hasta la respuesta final.

### 1.3 Crear tu propia herramienta

La forma más rápida es el decorador `@tool`: la firma de la función, los type hints y el docstring **son** la descripción que ve el LLM.

```python
from smolagents import tool, CodeAgent, InferenceClientModel

@tool
def cotizacion(divisa: str) -> str:
    """
    Devuelve la cotización actual de una divisa frente al euro.
    Args:
        divisa: código ISO de la divisa, ej. 'USD', 'JPY', 'GBP'
    """
    # En real: llamar a una API de mercados
    precios = {"USD": "0,92 €", "JPY": "0,0061 €", "GBP": "1,17 €"}
    return precios.get(diviso := divisa.upper(), "Divisa no encontrada")

model = InferenceClientModel()
agent = CodeAgent(tools=[cotizacion], model=model)
agent.run("¿Cuántos euros son 100 dólares ahora mismo?")
```

Reglas para que las herramientas funcionen bien:

1. Nombre descriptivo (verbo + objeto).
2. Type hints en todos los argumentos y el retorno.
3. Docstring claro con sección `Args:` describiendo cada parámetro.

### 1.4 Multi-agente y observabilidad

- **Multi-agente**: pasas un agente en `managed_agents` y el agente manager lo invoca como herramienta:

```python
from smolagents import CodeAgent, InferenceClientModel, WebSearchTool

model = InferenceClientModel()
web_agent = CodeAgent(
    tools=[WebSearchTool()], model=model,
    name="buscador_web",
    description="Ejecuta búsquedas web. Pásale tu consulta como argumento."
)
manager = CodeAgent(tools=[], model=model, managed_agents=[web_agent])
manager.run("¿Quién es el CEO de Hugging Face?")
```

- **Depuración**: `agent.logs` guarda cada paso (prompts, código generado, salidas). `agent.write_inner_memory_from_logs()` convierte los logs en un transcript legible que puedes pasar a otro LLM para "reflexionar" sobre una ejecución fallida.
- **UI**: `GradioUI(agent).launch()` levanta una interfaz web para chatear con el agente viendo su razonamiento.
- **Seguridad**: la ejecución de código puede correr en local (cuidado), en Docker (`executor_type="docker"`) o en E2B (sandbox en la nube).

### 1.5 Recursos smolagents

| Recurso | Enlace |
|---|---|
| Documentación oficial (guided tour) | https://huggingface.co/docs/smolagents/guided_tour |
| Guía de ejecución segura de código | https://huggingface.co/docs/smolagents/tutorials/secure_code_execution |
| Unidad del Agents Course (Code Agents) | https://huggingface.co/learn/agents-course/en/unit2/smolagents/code_agents |
| smolagents en GitHub | https://github.com/huggingface/smolagents |

---

## 2. CrewAI — "un equipo de especialistas"

### 2.1 Idea central

CrewAI organiza el trabajo como una **tripulación**: cada agente tiene `role` (rol), `goal` (objetivo) y `backstory` (contexto). Las tareas (`Task`) se asignan a agentes, y el `Crew` las ejecuta en secuencia o en jerarquía. Es la forma más natural de traducir un proceso de negocio a agentes.

### 2.2 Conceptos clave

- **Agent**: quién es y qué persigue.
- **Task**: qué hay que hacer, con `description`, `expected_output` y el `agent` responsable.
- **Process**: `sequential` (los agentes trabajan uno tras otro) o `hierarchical` (un agente manager delega).
- **Tools**: cualquier herramienta de Python o de la comunidad (búsqueda web, RAG, APIs).
- **Flows**: añaden control de flujo estructurado con estado tipado (Pydantic) para casos más complejos.

### 2.3 Ejemplo: equipo de investigación

```bash
pip install crewai crewai-tools
```

```python
from crewai import Agent, Task, Crew, Process

investigador = Agent(
    role="Investigador Senior",
    goal="Encontrar información fiable y reciente sobre {tema}",
    backstory="Eres un periodista de investigación experto en fuentes primarias.",
    verbose=True,
)

analista = Agent(
    role="Analista de Datos",
    goal="Sintetizar la información en conclusiones accionables",
    backstory="Eres un analista que convierte datos en hallazgos claros.",
    verbose=True,
)

redactor = Agent(
    role="Redactor",
    goal="Redactar un informe claro en markdown de máximo 500 palabras",
    backstory="Eres un redactor técnico especializado en informes ejecutivos.",
    verbose=True,
)

tarea_investigar = Task(
    description="Investiga sobre {tema}: principales hallazgos, cifras y fuentes.",
    expected_output="Lista de 5 hallazgos con sus fuentes.",
    agent=investigador,
)

tarea_analizar = Task(
    description="Analiza los hallazgos e identifica patrones y riesgos.",
    expected_output="3 conclusiones con nivel de confianza (alto/medio/bajo).",
    agent=analista,
    context=[tarea_investigar],   # recibe la salida de la tarea anterior
)

tarea_redactar = Task(
    description="Redacta el informe final con titular, resumen y conclusiones.",
    expected_output="Informe en markdown, máximo 500 palabras.",
    agent=redactor,
    context=[tarea_analizar],
)

crew = Crew(
    agents=[investigador, analista, redactor],
    tasks=[tarea_investigar, tarea_analizar, tarea_redactar],
    process=Process.sequential,
    verbose=True,
)

resultado = crew.kickoff(inputs={"tema": "adopción de agentes de IA en empresas 2026"})
print(resultado)
```

### 2.4 Consejos prácticos

- El `expected_output` concreto y medible es lo que mantiene a la crew enfocada; sé específico ("markdown de máximo 500 palabras", "JSON con campos X e Y").
- Usa `context=[...]` para encadenar salidas entre tareas; sin eso cada agente no ve lo que hizo el anterior.
- Para procesos con ramas y condiciones, pasa de `Process` a **Flows** (con `@start`, `@listen`, `@router` sobre estado Pydantic).
- Con modelos abiertos: configura el LLM por agente (`Agent(..., llm=...)`), por ejemplo apuntando a Ollama.

### 2.5 Recursos CrewAI

| Recurso | Enlace |
|---|---|
| Documentación oficial | https://docs.crewai.com |
| Repositorio (con ejemplos: Trip Planner, Stock Analysis) | https://github.com/crewAIInc/crewAI |
| Unidad del Agents Course sobre CrewAI | https://huggingface.co/learn/agents-course/en/unit2/crewai |
| Ejemplos de la comunidad | https://github.com/crewAIInc/crewAI-examples |

---

## 3. LangGraph — "control total con grafos"

### 3.1 Idea central

LangGraph modela el agente como un **grafo dirigido**: los **nodos** son funciones (o pasos) y las **aristas** definen el orden. El **estado** (un diccionario tipado, normalmente con el historial de mensajes) fluye por el grafo y cada nodo devuelve actualizaciones parciales del estado. Esto te da: ramificación condicional, bucles, checkpoints (persistencia y reanudación), interrupciones humanas (`interrupt`) y streaming — lo que la industria usa para agentes en producción.

### 3.2 Los 4 conceptos

1. **State**: esquema del estado que viaja por el grafo (`MessagesState` viene predefinido con `messages`).
2. **Nodes**: funciones que reciben el estado y devuelven actualizaciones (`{"messages": [respuesta]}`).
3. **Edges**: conexiones fijas (`add_edge`) o condicionales (`add_conditional_edges`) que deciden el siguiente nodo en tiempo de ejecución.
4. **Compile + invoke**: `graph.compile()` produce el ejecutable; `graph.invoke()` corre el flujo.

### 3.3 Ejemplo: agente con herramientas (el patrón canónico)

```bash
pip install langgraph
```

```python
from typing import Literal
from langchain_core.tools import tool
from langgraph.graph import StateGraph, MessagesState, START, END

# --- 1. Herramienta ---
@tool
def sumar(a: int, b: int) -> int:
    """Suma dos números enteros."""
    return a + b

tools = [sumar]

# --- 2. Nodos ---
def llm_call(state: MessagesState):
    """El LLM decide: responder o pedir una herramienta."""
    response = llm_with_tools.invoke(state["messages"])
    return {"messages": [response]}

def tool_node(state: MessagesState):
    """Ejecuta las herramientas que pidió el LLM."""
    last = state["messages"][-1]
    outputs = []
    for tc in last.tool_calls:
        result = tool_map[tc["name"]].invoke(tc["args"])
        outputs.append({"name": tc["name"], "args": tc["args"],
                        "result": result, "id": tc["id"]})
    return {"messages": outputs}

def should_continue(state: MessagesState) -> Literal["tool_node", END]:
    """¿El LLM pidió herramientas? → tool_node. Si no → terminar."""
    last = state["messages"][-1]
    if last.tool_calls:
        return "tool_node"
    return END

# --- 3. Grafo ---
builder = StateGraph(MessagesState)
builder.add_node("llm_call", llm_call)
builder.add_node("tool_node", tool_node)
builder.add_edge(START, "llm_call")
builder.add_conditional_edges("llm_call", should_continue, ["tool_node", END])
builder.add_edge("tool_node", "llm_call")     # bucle: herramienta → LLM
graph = builder.compile()

# Visualiza el grafo
# display(Image(graph.get_graph(xray=True).draw_mermaid_png()))

# --- 4. Ejecutar ---
from langchain.messages import HumanMessage
final = graph.invoke({"messages": [HumanMessage(content="¿Cuánto es 3 + 4?")]})
for m in final["messages"]:
    m.pretty_print()
```

Este patrón (LLM → condicional → tools → vuelta al LLM) **es** el agent loop que implementaste a mano en la Fase 1, ahora expresado como grafo. La magia adicional de LangGraph:

- **Checkpoints**: `graph.compile(checkpointer=InMemorySaver())` + `config={"configurable": {"thread_id": "1"}}` permite pausar, reanudar e inspeccionar el estado en cualquier punto.
- **Human-in-the-loop**: `interrupt("¿Apruebas esta acción?")` dentro de un nodo pausa el grafo hasta recibir la aprobación (`Command(resume="yes")`).
- **create_react_agent**: si no necesitas control fino, `from langgraph.prebuilt import create_react_agent` te da un agente ReAct funcional en una línea.

### 3.4 Recursos LangGraph

| Recurso | Enlace |
|---|---|
| Documentación oficial (overview + quickstart Python y JS) | https://docs.langchain.com/oss/python/langgraph/overview |
| Graph API (State, nodos, edges, Command, interrupt) | https://docs.langchain.com/oss/python/langgraph/graph-api |
| LangGraph en GitHub | https://github.com/langchain-ai/langgraph |
| Academia (tutoriales paso a paso) | https://academy.langchain.com |
| LangGraph Studio (visualizar/debug) | https://langchain-ai.github.io/langgraph/concepts/langgraph-studio/ |

---

## 4. Proyecto de la fase

1. **Nivel 1 (smolagents)**: agente que busca en la web y resume las noticias de IA del día en un markdown. Añade una herramienta propia (ej. lectura de un CSV local).
2. **Nivel 2 (CrewAI)**: reescribe el flujo anterior como crew de 3 agentes (buscador → analista → redactor) con `expected_output` medibles.
3. **Nivel 3 (LangGraph)**: reescríbelo de nuevo como grafo: un nodo de búsqueda, un nodo LLM analista con arista condicional, y `interrupt` para que tú apruebes el informe antes de que se guarde. Guarda un checkpoint para poder reanudar.

Al terminar el nivel 3 habrás construido el mismo sistema de tres maneras y entenderás qué abstracción te conviene para cada problema.

---

## 5. Cursos universitarios y recursos de alta calidad

### 5.1 Universidades (materiales abiertos y online)

| Curso | Institución | Qué ofrece online | Enlace |
|---|---|---|---|
| **CS329A — Self-Improving AI Agents** (otoño 2025) | Stanford | Sitio del curso con syllabus, readings y **todas las clases grabadas gratis en YouTube**. Cubre self-improvement de LLMs, tool use, planificación multi-paso, evaluación y orquestación. Impartido por Aakanksha Chowdhery y Azalia Mirhoseini. Versión online de pago para profesionales: XCS329 (Stanford Online) | https://cs329a.stanford.edu |
| **CS294/194-196 — Agentic AI** (otoño 2025) | UC Berkeley (RDI) | **MOOC gratuito**: fundamento de LLMs, razonamiento, planificación, frameworks, aplicaciones (generación de código, robótica, automatización web) y riesgos. Más de 40.000 estudiantes en la primera edición; clases completas en YouTube | https://rdi.berkeley.edu/agentic-ai/f25 |
| **LLM Agents MOOC** (edición anterior de Berkeley) | UC Berkeley (RDI) | Serie de clases dedicada específicamente a agentes LLM | https://rdi.berkeley.edu/llm-agents |
| **MIT OpenCourseWare** | MIT | +2.500 cursos gratuitos con materiales abiertos. Para fundamentos: **6.864 Advanced NLP** (base de los LLM), 6.S191 Intro to Deep Learning | https://ocw.mit.edu |
| **MIT Open Learning** (MITx / xPRO) | MIT | MITx: cursos MOOC gratuitos auditables de CS/ML; xPRO: programas de pago para profesionales en IA | https://openlearning.mit.edu |

> Consejo: el MOOC de Berkeley y las grabaciones de CS329A son el complemento perfecto de esta fase — te dan la teoría (planificación, evaluación, límites de los agentes) mientras tú construyes con los frameworks.

### 5.2 Cursos y tutoriales gratuitos (no universitarios pero de referencia)

| Recurso | Enlace |
|---|---|
| **Hugging Face Agents Course** — gratuito y oficial; unidades dedicadas a smolagents, CrewAI y LangGraph | https://huggingface.co/learn/agents-course |
| **DeepLearning.AI** — cursos cortos gratuitos sobre agentes (funcion calling, RAG, agentic patterns) | https://www.deeplearning.ai/short-courses/ |
| **Microsoft AI Agents for Beginners** — curso gratuito de 10 lecciones, open source | https://github.com/microsoft/ai-agents-for-beginners |
| LangChain Academy — cursos interactivos (incluye LangGraph) | https://academy.langchain.com |

### 5.3 Código de referencia y ejemplos reales

| Recurso | Enlace |
|---|---|
| crewAI-examples (Trip Planner, Stock Analysis...) | https://github.com/crewAIInc/crewAI-examples |
| smolagents — ejemplos y recetas oficiales | https://github.com/huggingface/smolagents/tree/main/examples |
| LangGraph — templates de producción | https://github.com/langchain-ai/langgraph/tree/main/examples |
| Awesome LLM Agents (lista curada de papers + frameworks) | https://github.com/e2b-dev/awesome-ai-agents |

---

## 6. Orden de trabajo sugerido (2–4 semanas)

1. **Semana 1**: smolagents — guided tour + herramienta propia + leer el trace de cada ejecución. Ver las grabaciones de CS329A (partes sobre tool use y agent workflows).
2. **Semana 2**: CrewAI — crew de 3 agentes con tareas encadenadas; probar `Process.hierarchical` con un manager.
3. **Semana 3**: LangGraph — quickstart + agente con herramientas + checkpoints + un `interrupt` de aprobación humana.
4. **Semana 4**: proyecto integrador (sección 4) + clases del MOOC de Berkeley sobre riesgos y evaluación de agentes.

**Criterio de avance**: no pases al siguiente framework hasta poder explicar en voz alta qué hace el agente en cada paso y por qué falló en su último error.