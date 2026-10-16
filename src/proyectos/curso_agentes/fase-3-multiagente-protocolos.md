---
title: Fase 3 — Multi-agente y protocolos abiertos
icon: network-wired
order: 4
---

# Fase 3 — Multi-agente y protocolos abiertos (MCP y A2A)

**Documentación de estudio — enfoque en sistemas open source**
Última actualización: octubre de 2026

> Objetivo de la fase: pasar de un único agente a **sistemas de agentes que colaboran**, y —lo más importante para el enfoque open source— dominar los **dos protocolos abiertos que están estandarizando la industria**: MCP (Model Context Protocol) para conectar agentes con herramientas/datos, y A2A (Agent2Agent) para que agentes de distintos sistemas se comuniquen entre sí.

---

## 0. Mapa mental: MCP vs A2A

Esta distinción es la clave de toda la fase. Los dos protocolos **son complementarios, no competidores**:

| | **MCP** (Model Context Protocol) | **A2A** (Agent2Agent) |
|---|---|---|
| Creado por | Anthropic (2024) | Google (abril 2025) |
| Resuelve | Cómo un LLM/agente se **conecta a herramientas y datos** | Cómo **dos agentes autónomos colaboran** entre sí |
| Analogía | USB-C del agente hacia el mundo (APIs, BBDD, archivos) | Lenguaje común entre agentes |
| Modelo | Cliente (host) ↔ servidor | Cliente agent ↔ servidor agent |
| Transporte | stdio / HTTP (SSE) | JSON-RPC 2.0 sobre HTTP(S) |
| Gobierno | Open spec, comunidad | Linux Foundation (jun 2025), Apache 2.0 |

Ejemplo real de complementariedad: un agente de inventario usa **MCP** para consultar la base de datos de stock; cuando detecta que un producto se agota, usa **A2A** para encargarlo al agente del proveedor externo <REF>cite✦web_search:19#7:~:text=a retail store might have its own inventory agent that uses MCP...uses A2A to communicate with external supplier agents</REF>.

---

## 1. Orquestación multi-agente (los patrones)

Antes de protocolos, los patrones. Conocerás la mayoría ya de CrewAI/LangGraph:

1. **Secuencial**: agentes en cadena, cada uno recibe la salida del anterior (pipeline: investigador → analista → redactor). Simple, predecible, latencia = suma de pasos.
2. **Hierárquico / Manager**: un agente coordinador recibe la petición, la descompone y **delega** subtareas a agentes especialistas; recopila y entrega el resultado. CrewAI: `Process.hierarchical`; LangGraph: subgrafos; smolagents: `managed_agents`.
3. **Handoffs (transferencia)**: un agente decide ceder el control a otro especialista (patrón del que dependen los sistemas de soporte tipo "router de intenciones").
4. **Fan-out / fan-in (paralelo)**: varios agentes trabajan simultáneamente sobre partes del problema y sus resultados se agregan (huge win de latencia en investigación comparativa).
5. **Debate**: varios agentes con posturas distintas critican iterativamente el resultado de otro (refinamiento por crítica — patrón dinámico de bucle con límite de iteraciones).

Reglas de oro que aprenderás en la práctica:

- **Empieza con un solo agente**; añade agentes solo cuando un prompt bien diseñado no baste. Cada agente extra añade latencia, coste y superficie de fallo.
- Los agentes deben tener **contextos de trabajo aislados** (su propio historial de mensajes), no compartir todo el estado global.
- Todo bucle multi-agente necesita **límite de iteraciones** y un mecanismo de salida (ya viste el patrón drafter→crítico de la Fase 2 con LangGraph).

---

## 2. MCP en profundidad: construye tu propio servidor

### 2.1 Conceptos

Un servidor MCP expone al modelo tres tipos de primitivas:

- **Tools**: funciones que el modelo puede **invocar** (lectura/escritura — con efectos laterales).
- **Resources**: datos de **solo lectura** que el modelo puede consultar como contexto (archivos, registros de BBDD, respuestas de API), direccionados por URI.
- **Prompts**: **plantillas de prompt reutilizables** parametrizadas que el servidor ofrece (workflows predefinidos para el usuario o el LLM) <REF>cite✦web_search:19#15:~:text=Reusable Templates...Parameterised prompt templates and workflows defined by the server</REF>.

Flujo: el host (Claude Desktop, tu agente, VS Code...) inicia el servidor como proceso stdio o se conecta por HTTP; el protocolo se inicializa con un handshake; desde ahí el cliente lista y usa tools/resources/prompts por JSON-RPC.

### 2.2 Tu primer servidor MCP con FastMCP (Python)

`FastMCP` es el SDK de alto nivel del MCP Python SDK: defines tools con decoradores y el SDK genera los JSON schemas por ti — sin escribir JSON-RPC a mano <REF>cite✦web_search:18#3:~:text=you can define tools with decorators...SDK handle the heavy lifting</REF>.

```bash
pip install mcp fastmcp
```

```python
# server.py — servidor MCP de gestión de inventario
from mcp.server.fastmcp import FastMCP

mcp = FastMCP("Inventario", log_level="ERROR")

# --- Base de datos simulada ---
productos = {
    "SKU-001": {"nombre": "Teclado mecánico", "stock": 34, "precio": 89.90},
    "SKU-002": {"nombre": "Monitor 27\"", "stock": 5, "precio": 219.00},
    "SKU-003": {"nombre": "Ratón vertical", "stock": 0, "precio": 45.50},
}

# --- TOOLS (el modelo puede invocarlas) ---
@mcp.tool()
def consultar_stock(sku: str) -> dict:
    """Consulta el stock y precio de un producto por su SKU."""
    return productos.get(sku, {"error": f"SKU {sku} no encontrado"})

@mcp.tool()
def registrar_pedido(sku: str, cantidad: int) -> str:
    """Registra un pedido de reposición si el stock es bajo. Requiere aprobación humana."""
    if sku not in productos:
        return f"SKU {sku} no encontrado"
    return f"Pedido registrado: {cantidad} × {productos[sku]['nombre']}"

# --- RESOURCES (solo lectura) ---
@mcp.resource("inventario://catalogo")
def catalogo() -> str:
    """Catálogo completo de productos en formato legible."""
    return "\n".join(f"{sku}: {p['nombre']} — {p['stock']} uds — {p['precio']} €"
                     for sku, p in productos.items())

# --- PROMPTS (plantillas) ---
@mcp.prompt()
def resumen_inventario() -> str:
    return ("Analiza el catálogo de productos e informa de: "
            "1) productos sin stock, 2) productos con stock crítico (<10), "
            "3) valor total del inventario.")

if __name__ == "__main__":
    mcp.run()   # stdio por defecto
```

### 2.3 Conectarlo a tus herramientas

- **Claude Desktop** (u otro host MCP): añade en la configuración el comando para lanzar tu `server.py`. El host listará `consultar_stock`, `registrar_pedido`, el recurso `inventario://catalogo` y el prompt `resumen_inventario` automáticamente.
- **Desde tu agente propio** (smolagents, LangGraph, CrewAI): todos soportan servidores MCP como fuente de herramientas; en LangGraph/LangChain usa `langchain-mcp-adapters` para convertir tools MCP en tools de LangChain.
- **Depuración**: el **MCP Inspector** es la herramienta oficial de debugging (interfaz web para listar y probar tools/resources/prompts de cualquier servidor) <REF>cite✦web_search:19#4:~:text=MCP Inspector (Debugging tool)</REF>.

### 2.4 Recursos MCP

| Recurso | Enlace |
|---|---|
| Documentación oficial | https://modelcontextprotocol.io |
| Quickstart: construir un servidor | https://modelcontextprotocol.io/quickstart/server |
| Especificación (arquitectura, protocolo, auth) | https://modelcontextprotocol.io/specification |
| Python SDK (FastMCP) | https://github.com/modelcontextprotocol/python-sdk |
| Servidores de la comunidad (registry) | https://github.com/modelcontextprotocol/servers |
| Curso de Anthropic: Introducción a MCP (gratuito) | https://academy.claude.com/courses/introduction-to-model-context-protocol |

---

## 3. A2A: agentes hablando con agentes

### 3.1 Conceptos

A2A es un estándar abierto (Apache 2.0, alojado en la Linux Foundation desde junio 2025) para que **agentes independientes y potencialmente "opacos"** se comuniquen: se descubren capacidades, negocian modalidades y colaboran en tareas largas **sin exponer su memoria interna ni sus herramientas** <REF>cite✦web_search:19#3:~:text=Operate without exposing their internal state, memory, or tools</REF>.

Piezas del protocolo (JSON-RPC 2.0 sobre HTTPS, con streaming SSE y notificaciones push asíncronas):

- **Agent Card**: JSON público que describe al agente (habilidades, endpoint, modalidades, autenticación). Es su "tarjeta de visita" para que otros agentes lo descubran <REF>cite✦web_search:19#7:~:text=This JSON file outlines agentic AI metadata...Agent cards are similar to model cards</REF>.
- **Task**: unidad de trabajo con ciclo de vida (submitted → working → input-required → completed/failed). Soporta tareas largas con actualizaciones asíncronas vía webhook.
- **Message / Part**: turnos de conversación (TextPart, FilePart, DataPart).
- **Artifact**: producto tangible que el agente servidor entrega (documento, imagen, JSON).

SDKs oficiales: **Python (`pip install a2a-sdk`), Go, JavaScript (`@a2a-js/sdk`), Java, .NET y Rust** <REF>cite✦web_search:19#3:~:text=A2A Python SDK...Rust SDK</REF>.

### 3.2 Esqueleto: agente A2A con el SDK de Python

```python
# agente_especialista.py — expone un agente LangGraph como servidor A2A
from a2a.server.apps import A2AStarletteApplication
from a2a.server.request_handlers import DefaultRequestHandler
from a2a.server.tasks import InMemoryTaskStore
from a2a.types import AgentCard, AgentSkill

# 1. La Agent Card (qué soy, qué sé hacer, dónde estoy)
card = AgentCard(
    name="agente-analista",
    description="Analiza documentos y devuelve resúmenes estructurados en JSON",
    url="http://localhost:9999/",
    version="1.0.0",
    capabilities={"streaming": True},
    skills=[AgentSkill(id="analizar", name="Analizar documento",
                       description="Resume y extrae entidades de un texto")],
)

# 2. El handler conecta tu agente (aquí: tu grafo de LangGraph de la Fase 2)
handler = DefaultRequestHandler(
    agent_executor=tu_grafo_langgraph_como_callable,  # async def (query) -> resultado
    task_store=InMemoryTaskStore(),
)

app = A2AStarletteApplication(agent_card=card, http_handler=handler)
app.build().run(host="0.0.0.0", port=9999)
```

Y un **cliente** que lo descubre y le encarga trabajo:

```python
from a2a.client import A2AClient

async with A2AClient.fetch_agent_card("http://localhost:9999") as card:
    print(card.name, [s.name for s in card.skills])

    # Envía una tarea y espera su finalización (con streaming de progreso)
    async for event in client.send_message(...):
        print(event)
```

El punto didáctico clave: el cliente **no sabe nada del grafo interno** — solo ve la Agent Card y envía tareas. Así puedes reemplazar el especialista por uno hecho en CrewAI o ADK sin tocar al cliente. Esa es la interoperabilidad que compra A2A.

### 3.3 A2A + frameworks y recursos

El curso gratuito de DeepLearning.AI "A2A: The Agent2Agent Protocol" (con Google Cloud e IBM Research) enseña exactamente tu proyecto de fase: exponer agentes de ADK, LangGraph o CrewAI como servidores A2A y orquestar workflows jerárquicos de agentes multi-framework <REF>cite✦web_search:19#1:~:text=Expose agents built with frameworks like Google ADK, LangGraph, or BeeAI as A2A servers</REF>.

| Recurso | Enlace |
|---|---|
| Proyecto A2A (GitHub, docs + spec + SDKs) | https://github.com/a2aproject/A2A |
| Sitio de documentación | https://a2a-protocol.org |
| Curso DeepLearning.AI — A2A (gratuito) | https://www.deeplearning.ai/short-courses/a2a-the-agent2agent-protocol/ |
| awesome-a2a (proyectos de la comunidad) | https://github.com/ai-boost/awesome-a2a |

---

## 4. Frameworks complementarios (panorama)

### 4.1 Microsoft Agent Framework (sucesor de AutoGen + Semantic Kernel)

Microsoft unificó sus dos frameworks en un único proyecto **open source bajo licencia MIT**: combina las abstracciones simples de AutoGen (single/multi-agent) con las características enterprise de Semantic Kernel (estado por sesiones, tipado, middleware, telemetría) y añade **workflows basados en grafos** con checkpoints y soporte human-in-the-loop <REF>cite✦web_search:19#0:~:text=Agent Framework is the direct successor...explicit multi-agent orchestration</REF>.

- Lenguajes: **Python y .NET** con APIs consistentes; multi-proveedor (OpenAI, Anthropic, Ollama...).
- Soporta protocolos abiertos: **MCP, A2A y AG-UI**.
- AutoGen y Semantic Kernel siguen mantenidos, pero **los proyectos nuevos deben usar Agent Framework**; hay guías de migración oficiales. Alcanzó 1.0 GA en abril de 2026, con comunidad aún más pequeña que LangGraph/CrewAI <REF>cite✦web_search:19#13:~:text=Just reached 1.0 GA (April 2026)...Smaller community than LangGraph or CrewAI</REF>.
- Cuándo mirarlo: si vienes del ecosistema Microsoft/.NET, necesitas telemetría OpenTelemetry nativa o Azure AI Foundry.

Recursos: https://learn.microsoft.com/agent-framework/ · https://github.com/microsoft/agent-framework

### 4.2 Google ADK 2.0 (Agent Development Kit, Apache 2.0)

ADK 2.0 (2026) introduce **workflows basados en grafos**: defines la *forma* de la aplicación como nodos (funciones deterministas, agentes LLM, tools, JoinNodes, sub-workflows) conectados por edges con rutas condicionales, y un scheduler se encupa de ejecutarlo concurrentemente, persistir estado, pausar para humanos y reanudar incluso tras reinicios <REF>cite✦web_search:18#2:~:text=describe the shape of your application as a graph of nodes...pause for a human, and resume later</REF>. En esencia, la misma idea que LangGraph, con runtime oficial en **Python y Go** y orientación a Vertex AI/Gemini.

Patrones soportados de primeras clases: cadenas secuenciales, fan-out/fan-in paralelo con `JoinNode`, routers, bucles, sub-grafos anidados y human-in-the-loop con `state_delta` <REF>cite✦web_search:18#1:~:text=explicitly defining the edges (the pathways)...conditional branches, run in parallel, and even loop back for retries</REF>.

Ejemplo mínimo (Python):

```python
from google.adk import Workflow, Agent, Runner
from google.adk.sessions import InMemorySessionService
from google.adk.workflow import START

summarizer = Agent(name="summarizer", model="gemini-2.5-flash",
                   instruction="Resume en una frase.")

def extract(node_input):  # nodo determinista: 0 tokens, 0 latencia LLM
    return f"Resume esto: {node_input}"

workflow = Workflow(name="demo", edges=[(START, extract, summarizer)])

# Runner ejecuta y hace streaming de eventos...
```

Regla de decisión que te dará la industria en 2026: **pasos deterministas = nodos de función (baratos, instantáneos); pasos que requieren razonamiento = nodos de agente**. El LLM se invoca solo donde hace falta <REF>cite✦web_search:18#0:~:text=Deterministic steps...become standard function nodes...LLM is invoked only when necessary</REF>.

Recursos: https://adk.dev · https://github.com/google/adk-python · ejemplos de workflows: https://adk.dev/graphs/

---

## 5. Proyecto de la fase

**"Agente analista subcontratista"** — dos agentes independientes que colaboran:

1. **Especialista (servidor MCP + A2A)**: tu agente de LangGraph de la Fase 2 (investigador → analista → redactor).
   - Expon sus 2 herramientas propias como **servidor MCP** (`consultar_stock`-style para datos internos).
   - Envuélvelo con el **SDK A2A** para que otros agentes le encargen informes.
2. **Orquestador (cliente)**: un segundo agente (puede ser CrewAI o smolagents) que recibe peticiones del usuario, decide si necesita un informe, **descubre la Agent Card** del especialista por HTTP y le delega la tarea por A2A, monitorizando el ciclo de vida de la tarea.
3. **Extra**: añade un `interrupt` de aprobación humana antes de que el especialista entregue el informe final.

Criterio de éxito: ambos procesos viven en carpetas separadas, sin imports compartidos, y podrías reescribir uno entero (p. ej. el especialista en ADK en vez de LangGraph) sin tocar el otro.

---

## 6. Plan de trabajo (3–4 semanas) y recursos

1. **Semana 1**: patrones de orquestación (sección 1) + construye tu servidor MCP (FastMCP) y conéctalo a un host y a LangGraph. Depura con MCP Inspector.
2. **Semana 2**: curso DeepLearning.AI de A2A + construye el servidor A2A del especialista.
3. **Semana 3**: cliente A2A y proyecto integrador (sección 5).
4. **Semana 4**: explora Microsoft Agent Framework o ADK 2.0 (elige según tu stack: .NET → MAF; GCP/Gemini → ADK) y revisa el estado de ACP (BeeAI/IBM) como protocolo alternativo.

| Recurso | Enlace |
|---|---|
| HF Agents Course — unidades de agentes multi-LLM y MCP | https://huggingface.co/learn/agents-course |
| Especificación A2A | https://github.com/a2aproject/A2A/blob/main/specification/json/a2a.json |
| IBM Think — qué es A2A (explicación clara de conceptos) | https://www.ibm.com/think/topics/agent2agent-protocol |
| Announcing A2A (Google Developers Blog, abr 2025) | https://developers.googleblog.com/en/a2a-a-new-era-of-agent-interoperability/ |
| ADK 2.0 — why we built it | https://developers.googleblog.com/why-we-built-adk-20/ |
| awesome-llm-agents | https://github.com/e2b-dev/awesome-ai-agents |

**Criterio de avance**: debes poder dibujar en una servilleta la diferencia entre "mi agente usa una herramienta MCP" y "mi agente delega una tarea A2A a otro agente", y justificar cuándo usar cada uno.