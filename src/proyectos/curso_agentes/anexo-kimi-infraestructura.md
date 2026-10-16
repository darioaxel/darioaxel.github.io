---
title: Anexo — Kimi e infraestructura Moonshot AI
icon: moon
order: 5
---

# Anexo — Usando Kimi y la infraestructura de Moonshot AI en tu learning path

**Anexo de la Fase 2 — documentación de agentes open source**
Última actualización: octubre de 2026

> Este anexo te enseña a sustituir el LLM de tus agentes por **Kimi**, la familia de modelos abiertos de **Moonshot AI**, usando su infraestructura: la API compatible con OpenAI/Anthropic, el plan de programación Kimi Code, y el autoalojamiento de pesos abiertos. Encaja perfecto con el enfoque open source del learning path.

---

## 1. ¿Qué es Kimi y qué ofrece para agentes?

**Moonshot AI** desarrolla la familia **Kimi**, una de las líneas de modelos abiertos más relevantes para tareas agentic (tool use, codificación y razonamiento largo). Hoja de ruta relevante:

| Modelo | Lanzamiento | Claves para agentes |
|---|---|---|
| Kimi K2 / K2-Instruct-0905 | jul / sep 2025 | 1T parámetros MoE (32B activos), tool use avanzado, contexto ampliado a 256K  |
| Kimi K2 Thinking | nov 2025 | Razonamiento intercalado con tool use en bucles agentic; 256K de contexto |
| Kimi K2.5 | ene 2026 | Multimodal (visión+texto). Cuatro modos: instant, thinking, agent y **Agent Swarm** (orquestación de hasta ~100 sub-agentes en paralelo)  |
| Kimi K2.6 | abr 2026 | General multimodal (texto, imagen, vídeo), 256K, mejor self-corrección |
| Kimi K2.7 Code | jun 2026 | Especializado en código, invocación multi-paso de herramientas, 256K  |
| Kimi K3 | jul 2026 | 2.8T parámetros (el mayor modelo de pesos abiertos), pesos en Hugging Face bajo licencia custom  |

⚠️ **Detalle de licencia**: los modelos Kimi K2 se publican bajo **MIT modificada**; K3 usa una **licencia custom** que exige compartir ingresos (hasta ~30%) a proveedores de inferencia que superen ~$20M anuales . Para uso personal y de aprendizaje no es un problema, pero revísala antes de un despliegue comercial.

---

## 2. Vías de acceso a la infraestructura de Moonshot

Hay **tres caminos**, y conviene no mezclarlos porque las claves no son portables entre ellos :

| Vía | Endpoint | Facturación | Para qué |
|---|---|---|---|
| **Developer API** (platform.moonshot.ai) | `https://api.moonshot.ai/v1` (internacional) / `https://api.moonshot.cn/v1` (China) | Pago por token (~$0.60 / 1M input y ~$2.50 / 1M output en K2.5/K2.6)  | Integrar el modelo en tus agentes |
| **Kimi Code Plan** (kimi.com/code) | `https://api.kimi.ai/coding/v1` (compatible OpenAI y Anthropic) | Suscripción plana, ~30 peticiones concurrentes  | Agentes de programación en IDE/terminal |
| **Pesos abiertos** (Hugging Face `moonshotai`) | Tu propio servidor (vLLM/SGLang) | Tu hardware | Autoalojamiento total |

> La API es **compatible con OpenAI** (chat completions) y también ofrece un endpoint **compatible con Anthropic** (`https://api.moonshot.ai/anthropic`). En el endpoint Anthropic, la temperatura se mapea como `real = request × 0.6` para compatibilidad con herramientas existentes .
> Además, en algunos modelos recientes (p. ej. K2.6/K3) la API fija la temperatura a 1 y rechaza otros valores con un error 400 . Si un framework envía temperature por defecto, configúralo a 1 o desactívalo.

### Crear la clave

1. Entra en `platform.moonshot.ai` (o `.cn` si operas desde China continental).
2. Añade un método de pago (suelen dar un pequeño saldo inicial).
3. Crea la clave en la sección **API Keys**.

---

## 3. Usando Kimi en los tres frameworks de la Fase 2

### 3.1 Llamada directa (base de todo)

```python
from openai import OpenAI

client = OpenAI(
    base_url="https://api.moonshot.ai/v1",   # internacional
    api_key="sk-...",                          # tu clave de platform.moonshot.ai
)

resp = client.chat.completions.create(
    model="kimi-k2.6",          # o kimi-k2.7-code, kimi-k3...
    messages=[{"role": "user", "content": "Explícame qué es un agente de IA en 3 viñetas"}],
    temperature=1,              # algunos modelos Kimi fijan temperature=1
)
print(resp.choices[0].message.content)
```

### 3.2 Tool calling con Kimi

Kimi soporta function calling nativo con el formato estándar de OpenAI. Úsalo con las herramientas de la Parte 2 de tu documentación de fundamentos:

```python
tools = [
    {
        "type": "function",
        "function": {
            "name": "cotizacion",
            "description": "Obtiene la cotización de una divisa frente al euro.",
            "parameters": {
                "type": "object",
                "properties": {
                    "divisa": {"type": "string", "description": "Código ISO, ej. USD"}
                },
                "required": ["divisa"]
            }
        }
    }
]

messages = [{"role": "user", "content": "¿Cuánto vale el dólar en euros?"}]
resp = client.chat.completions.create(
    model="kimi-k2.6", messages=messages, tools=tools, temperature=1
)

msg = resp.choices[0].message
if msg.tool_calls:
    # ... ejecutar la herramienta y enviar el resultado como role="tool"
    # (mismo bucle que en la Parte 2)
    pass
```

> Históricamente la API de Moonshot ha tenido desviaciones del esquema JSON (rechazaba tipos `boolean`/`null` en las definiciones de herramientas); un bug reportado en noviembre de 2025 fue corregido rápidamente . Si ves errores de validación, simplifica los tipos de tus esquemas.

### 3.3 smolagents + Kimi

vía `LiteLLMModel` (LiteLLM soporta Moonshot de forma nativa):

```python
from smolagents import CodeAgent, LiteLLMModel

model = LiteLLMModel(
    model="openai/kimi-k2.6",   # prefijo openai/ + nombre del modelo
    api_key="sk-...",
    api_base="https://api.moonshot.ai/v1",
)
agent = CodeAgent(tools=[DuckDuckGoSearchTool()], model=model)
agent.run("Resume las noticias de IA de hoy.")
```

### 3.4 CrewAI + Kimi

```python
from crewai import Agent, LLM

llm = LLM(
    model="openai/kimi-k2.6",      # LiteLLM bajo el capó
    base_url="https://api.moonshot.ai/v1",
    api_key="sk-...",
)

agente = Agent(role="Investigador", goal="...", backstory="...", llm=llm)
```

### 3.5 LangGraph + Kimi

```python
from langchain_openai import ChatOpenAI

llm = ChatOpenAI(
    model="kimi-k2.6",
    api_key="sk-...",
    base_url="https://api.moonshot.ai/v1",
    temperature=1,
)
llm_with_tools = llm.bind_tools([sumar])   # tu @tool de LangGraph
```

El resto del grafo (nodos, aristas condicionales, checkpoints) no cambia: es la ventaja de que la API sea compatible con OpenAI — tus agentes son portables entre proveedores cambiando solo la configuración del modelo.

---

## 4. Autoalojamiento: la vía 100% open source

Si quieres llevar el enfoque open source hasta el final, puedes servir Kimi en tu propia infraestructura. Los pesos están en Hugging Face (`huggingface.co/moonshotai`) en formato FP8/MXFP4 .

**Hardware necesario** (importante: estos son modelos enormes):

| Modelo | Tamaño de pesos | Mínimo viable |
|---|---|---|
| Kimi K2.x (1T MoE / 32B activos) | ~1 TB (FP8); cuantizado ~630 GB (INT4) | 8× H100/H200 o similar; con KTransformers puedes hacer offload parcial a CPU |
| Kimi K3 (2.8T) | ~594 GB (MXFP4) | 8× H100 80 GB mínimo  |

**Servir con vLLM** (los motores recomendados oficialmente son vLLM, SGLang, KTransformers y TensorRT-LLM ):

```bash
vllm serve moonshotai/Kimi-K2.5 \
  --host 0.0.0.0 --port 8000 \
  --tensor-parallel-size 8 \
  --tool-call-parser kimi_k2 \
  --enable-auto-tool-choice \
  --reasoning-parser kimi_k2
```

Los flags `--tool-call-parser kimi_k2` y `--enable-auto-tool-choice` son clave: le dicen a vLLM cómo parsear las llamadas a herramientas del modelo, y el servidor expone una API **compatible con OpenAI** en `http://localhost:8000/v1` . Una vez servido, tus tres frameworks apuntan a `base_url="http://localhost:8000/v1"` y no cambia nada más.

> Para hardware modesto, la alternativa realista es **Moonlight-16B-A3B** (16B MoE, 3B activos), también de Moonshot, que sí corre en GPUs de consumo.

---

## 5. Kimi Code CLI — agente de programación open source

Moonshot ofrece **Kimi Code**, un agente de terminal/IDE con dos vías:

- Suscripción **Kimi Code Plan** (endpoint dedicado `api.kimi.ai/coding/v1`, compatible OpenAI y Anthropic, pensado para Claude Code y herramientas similares) .
- Es un caso de estudio perfecto para tu fase de agentes: es un agente real, de código abierto, que ejecuta herramientas (leer/escribir archivos, shell, tests) en un bucle — exactamente el patrón que tú implementas con LangGraph, pero productizado.

**Ejercicio propuesto**: usa Kimi Code CLI en un repo pequeño y compara su comportamiento (qué herramientas invoca, cuándo corre tests) con el agente ReAct que construiste en la Fase 1.

---

## 6. Buenas prácticas y advertencias

1. **Temperatura fija**: en modelos recientes envía `temperature=1` o desactívala en el cliente para evitar errores 400 .
2. **Latencia**: la primera llamada tras un período de inactividad puede tener cold start; para agentes en bucle considera hacer warm-up.
3. **Reintentos con backoff** en los bucles agentic (429 si superas concurrencia).
4. **Revisa la licencia** del modelo exacto antes de uso comercial (MIT modificada en K2.x, licencia custom en K3).
5. **Evalúa antes de migrar**: el tool calling funciona muy bien en Kimi K2.x, pero prueba tu agente con tus herramientas antes de dar por buena la migración — como con cualquier modelo abierto.
6. **Cumplimiento**: si operas en China continental, usa `api.moonshot.cn` y las claves de `platform.moonshot.cn`.

---

## 7. Recursos

| Recurso | Enlace |
|---|---|
| Kimi Platform (API keys, consola, docs) | https://platform.moonshot.ai |
| Documentación de la API de Kimi | https://platform.moonshot.ai/docs |
| Kimi Code (plan y docs) | https://www.kimi.com/code |
| Organización moonshotai en Hugging Face (pesos abiertos) | https://huggingface.co/moonshotai |
| GitHub oficial de Kimi K2 (guía de despliegue) | https://github.com/moonshotai/kimi-k2 |
| Paper Kimi K2: Open Agentic Intelligence | https://arxiv.org/abs/2507.20534 |
| Receta vLLM oficial para Kimi | https://recipes.vllm.ai/moonshotai/Kimi-K2.5 |
| OpenRouter (alternativa gestionada de Kimi) | https://openrouter.ai/moonshotai/kimi-k2-thinking |

---

*Nota: las versiones de modelo y precios cambian rápido en este ecosistema; verifica siempre la lista vigente en `platform.moonshot.ai/docs` antes de diseñar tu sistema.*