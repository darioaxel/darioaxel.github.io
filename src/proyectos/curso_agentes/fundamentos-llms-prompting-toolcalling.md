---
title: Fundamentos de LLMs, Prompting y Tool Calling
icon: brain
order: 2
---

# Fundamentos de LLMs, Prompting y Function Calling

**Documentación de estudio — enfoque en sistemas open source**
Última actualización: octubre de 2026

---

# PARTE 1 — LLMs y Prompting

## 1.1 ¿Qué es un modelo de lenguaje (LLM)?

Un **modelo de lenguaje grande** (LLM, por *Large Language Model*) es una red neuronal entrenada con una tarea aparentemente simple: **predecir el siguiente token** (fragmento de palabra) dado el texto anterior. Repitiendo esa predicción miles de veces, el modelo aprende gramática, hechos del mundo, patrones de razonamiento y estilos de escritura.

Conceptos clave:

- **Arquitectura Transformer**: prácticamente todos los LLMs actuales se basan en ella (introducida en el paper *"Attention Is All You Need"*, 2017). El mecanismo de **atención** permite que cada palabra "preste atención" a las demás y capture relaciones de contexto.
- **Preentrenamiento**: el modelo lee cantidades masivas de texto y aprende a predecir tokens. Este es el coste computacional gigante.
- **Ajuste posterior (post-training)**: después del preentrenamiento, los modelos se alinean con humanos mediante técnicas como **RLHF** (aprendizaje por refuerzo con retroalimentación humana) o **DPO**, para que sean útiles, seguros y sigan instrucciones. Es lo que convierte un "completador de texto" en un "asistente".
- **Modelos abiertos vs. cerrados**: modelos como **Llama (Meta), Qwen (Alibaba), DeepSeek y Mistral** tienen pesos descargables y licencias que permiten autoalojarlos (con Ollama, vLLM, llama.cpp). Los modelos cerrados (GPT-x, Claude, Gemini) solo se acceden por API.
- **Context window**: cantidad máxima de tokens que el modelo puede "ver" a la vez en una conversación (desde unos miles hasta más de un millón en modelos recientes).

> **Idea importante para agentes**: un LLM no *ejecuta* nada por sí mismo. Es un motor de texto que, dado un historial de mensajes, produce el siguiente texto. Todo lo que parece "inteligencia actuando" (buscar, calcular, escribir archivos) se logra dándole herramientas y un bucle que ejecuta lo que el modelo pide — eso es exactamente lo que veremos en la Parte 2.

---

## 1.2 Tokenización

Los LLMs no leen texto: leen **tokens**, que son unidades numéricas de texto.

- La tokenización divide el texto en fragmentos según el vocabulario del modelo (BPE, WordPiece, SentencePiece...).
- Regla aproximada: en inglés, **1 token ≈ ¾ de palabra**; en español suele ser algo menos eficiente por la tildes y caracteres especiales. `1000 tokens ≈ 750 palabras en inglés`.
- Los tokens importan por tres razones:
  1. **Coste**: las APIs cobran por token (entrada y salida).
  2. **Límite de contexto**: tu conversación cabe en la ventana de contexto medida en tokens.
  3. **Comportamiento del modelo**: el modelo puede trocear palabras de forma inesperada; los espacios iniciales, por ejemplo, pueden ser parte del token.

### Ejemplo práctico

```python
from transformers import AutoTokenizer

tokenizer = AutoTokenizer.from_pretrained("Qwen/Qwen2.5-7B-Instruct")

text = "Hola, ¿qué tiempo hace en Madrid?"
tokens = tokenizer.tokenize(text)
ids = tokenizer.encode(text)

print(tokens)
# ['Hola', ',', '¿', 'qué', 'tiempo', 'hace', 'en', 'Madrid', '?']
# (el troceo exacto depende del vocabulario del modelo)

print(ids)
# [9707, 11, 126315, ...]  -> números enteros que el modelo sí entiende

print(len(ids))  # cuenta de tokens -> clave para gestionar el contexto
```

Herramienta online para visualizar tokens: **https://platform.openai.com/tokenizer** (sirve para entender el concepto aunque uses modelos abiertos; el tokenizador exacto depende de cada modelo).

---

## 1.3 Temperatura (y parámetros de muestreo)

Cuando el modelo predice el siguiente token, no siempre elige el más probable. Hay parámetros que controlan ese muestreo:

| Parámetro | Qué controla | Valor bajo | Valor alto |
|---|---|---|---|
| **Temperature** | Aleatoriedad de la distribución | Salida enfocada, determinista, predecible | Salida diversa, creativa, menos predecible |
| **top_p** (nucleus sampling) | De qué conjunto de tokens acumulados se muestrea | Conjunto pequeño, tokens muy probables | Conjunto amplio |
| **top_k** | Solo los *k* tokens más probables | Muy conservador | Más variedad |
| **max_tokens** | Límite de tokens de salida | Respuestas cortas | Respuestas largas (hasta el límite) |

Guía de valores habituales (rango válido de temperature: 0 a 2 según la API de OpenAI; en la mayoría de modelos abiertos: 0 a 1+):

- **Tareas deterministas** (extracción de datos, clasificación, código, agentes que llaman herramientas): `temperature = 0` a `0.2`.
- **Escritura creativa / lluvia de ideas**: `0.7` a `1.0`.
- **Recomendación oficial**: ajusta **temperatura O top_p, no ambos a la vez**.

> ⚠️ La temperatura **no elimina alucinaciones**: un valor bajo solo hace que el modelo se mantenga en caminos de alta probabilidad. Si el modelo "no sabe" algo, baja temperatura hará que alucine de forma más consistente, no que deje de hacerlo.

---

## 1.4 System prompts (y los roles del mensaje)

En las APIs de chat, el historial se estructura como mensajes con **roles**:

- **system**: instrucciones de alto nivel que definen quién es el modelo, cómo debe comportarse y qué reglas cumplir. No lo escribe el usuario final; lo define el desarrollador. Tienen el mayor peso en el comportamiento.
- **user**: lo que escribe la persona.
- **assistant**: lo que respondió previamente el modelo (la conversación se construye alternando user/assistant).

### Ejemplo de system prompt

```text
Eres un asistente de soporte técnico para una empresa de hosting.
Reglas:
- Responde siempre en español, tono profesional y breve.
- Si no conoces la respuesta, di "No lo sé" en lugar de inventarla.
- Nunca compartas datos internos de otros clientes.
- Cuando el usuario pregunte por el estado de un servidor, usa la
  herramienta get_server_status en lugar de responder de memoria.
```

**Buenas prácticas para system prompts:**

1. Sé específico: mejor "Responde en máximo 3 viñetas" que "sé conciso".
2. Sé explícito sobre el formato de salida deseado (JSON, Markdown, etc.).
3. Dile qué hacer en los casos límite (sin datos, petición ambigua, fuera de alcance).
4. Pon las instrucciones importantes **al final** del prompt cuando trabajes con documentos muy largos — los modelos recuerdan mejor lo cercano a donde generan (hallazgo documentado de Anthropic en contextos largos).

---

## 1.5 Técnicas de prompting

### a) Zero-shot prompting

Dar la tarea sin ejemplos. El modelo usa solo sus conocimientos entrenados.

```text
Clasifica el siguiente comentario de cliente como POSITIVO, NEUTRO o NEGATIVO.

Comentario: "Llegó dos días tarde pero el producto funciona bien."
Clasificación:
```
> Respuesta esperada: `NEUTRO`

Funciona bien en tareas comunes; cuando falla o el formato es inconsistente, pasa a few-shot.

### b) Few-shot prompting (aprendizaje en contexto)

Incluir **ejemplos** de entrada→salida dentro del prompt. El modelo imita el patrón. Es una de las técnicas más efectivas para fijar formato y estilo.

```text
Extrae nombre y ciudad del texto. Devuelve solo JSON.

Texto: "Me llamo Ana y vivo en Sevilla."
{"nombre": "Ana", "ciudad": "Sevilla"}

Texto: "Soy Carlos, de Valencia."
{"nombre": "Carlos", "ciudad": "Valencia"}

Texto: "Hola, mi nombre es Lucía y resido en Bilbao."
```

Consejo: los ejemplos deben ser **relevantes y representativos**; ejemplos genéricos o no relacionados no mejoran (y a veces empeoran) el resultado.

### c) Chain-of-Thought (CoT)

Pedirle al modelo que **razone paso a paso** antes de dar la respuesta final. Mejora muchísimo el razonamiento aritmético, lógico y de múltiples pasos.

```text
Resuelve paso a paso. Al final, escribe "RESPUESTA: <resultado>".

Una tienda vende camisetas a 12 €. Si compro 3 y pago con un billete
de 50 €, ¿cuánto cambio recibo?

Razonamiento:
- Precio total: 3 × 12 = 36 €
- Cambio: 50 − 36 = 14 €
RESPUESTA: 14 €
```

Variantes avanzadas:

- **Self-consistency**: generar varias cadenas de razonamiento con temperature alta y quedarte con la respuesta mayoritaria (mejoró ~18% en benchmarks de matemáticas frente a CoT simple).
- **Tree of Thoughts**: explorar varias ramas de razonamiento y podar las malas.
- **Scratchpad**: pedir al modelo que anote apuntes intermedios al procesar documentos largos.

> ⚠️ En productos con usuarios finales, el razonamiento suele ocultarse y solo se muestra la respuesta. En agentes, en cambio, ese razonamiento interno es justo lo que alimenta el ciclo de decisión (ver Parte 2).

---

# PARTE 2 — Function Calling / Tool Calling

## 2.1 ¿Qué es y por qué es el mecanismo central de los agentes?

Los LLMs **no pueden** consultar una base de datos, llamar a una API, ejecutar código o leer archivos: solo predicen texto. **Tool calling** (o function calling) es la convención por la cual:

1. Tú describes las funciones disponibles al modelo (nombre, descripción, parámetros con tipos).
2. El modelo, al responder, puede "decidir" devolver **una llamada a función estructurada** (nombre + argumentos en JSON) **en lugar de** texto libre.
3. **Tu código** ejecuta esa función de verdad y obtiene un resultado.
4. Envías el resultado de vuelta al modelo, que continúa la conversación con esa información.

Ese ciclo —modelo pide una acción, tu código la ejecuta, el modelo recibe el resultado y decide el siguiente paso— **es literalmente el bucle de un agente de IA**. Sin tool calling no hay agentes; solo chatbots.

> Dato clave de la documentación de OpenAI: *"The chat completion API itself doesn't call any functions, but the model can generate JSON output that you can use in your code to trigger function calls."* El modelo **propone**, tu código **dispone**.

## 2.2 El flujo completo paso a paso

```
Usuario: "¿Qué tiempo hace en París?"

   ┌─ Paso 1: El modelo recibe el prompt + las definiciones de herramientas
   │
   ├─ Paso 2: El modelo responde NO con texto, sino con una tool call:
   │          get_weather(location="París")
   │
   ├─ Paso 3: TU CÓDIGO ejecuta get_weather("París")
   │          → {"temperature": "18", "unit": "C"}
   │
   ├─ Paso 4: Envías el resultado al modelo como mensaje
   │          role=tool: {"temperature": "18", "unit": "C"}
   │
   └─ Paso 5: El modelo genera la respuesta final para el usuario:
             "En París hoy hay 18 °C."
```

## 2.3 Ejemplo completo en Python (OpenAI / compatible con modelos abiertos vía Ollama)

```python
import json
from openai import OpenAI

# Con Ollama (open source, modelos locales) la API es idéntica:
# client = OpenAI(base_url="http://localhost:11434/v1", api_key="ollama")
client = OpenAI()

# ---------- 1. Definir la herramienta ----------
tools = [
    {
        "type": "function",
        "function": {
            "name": "get_weather",
            "description": "Obtiene el tiempo actual de una ciudad. "
                           "Usa esta herramienta SIEMPRE que pregunten por el tiempo.",
            "parameters": {
                "type": "object",
                "properties": {
                    "location": {
                        "type": "string",
                        "description": "Nombre de la ciudad, ej. 'Madrid'"
                    },
                    "unit": {
                        "type": "string",
                        "enum": ["celsius", "fahrenheit"],
                        "description": "Unidad de temperatura"
                    }
                },
                "required": ["location"],
                "additionalProperties": False
            }
        }
    }
]

def get_weather(location: str, unit: str = "celsius"):
    # En la vida real: llamarías a una API meteorológica real
    return {"temperature": 18, "unit": "C" if unit == "celsius" else "F",
            "location": location}

# ---------- 2. Primera llamada al modelo ----------
messages = [
    {"role": "system",
     "content": "Eres un asistente de viajes. Usa herramientas cuando las necesites."},
    {"role": "user", "content": "¿Qué tiempo hace en París?"}
]

response = client.chat.completions.create(
    model="gpt-4o-mini",            # o "qwen2.5:7b" con Ollama
    messages=messages,
    tools=tools,
    tool_choice="auto"              # "auto" | "required" | "none" | {"name": ...}
)

message = response.choices[0].message

# ---------- 3. Si el modelo pidió una herramienta, la ejecutamos ----------
if message.tool_calls:
    for tool_call in message.tool_calls:
        name = tool_call.function.name
        args = json.loads(tool_call.function.arguments)

        # ¡VALIDA siempre antes de ejecutar en código real!
        if name == "get_weather":
            result = get_weather(**args)

        # Añadimos la llamada del asistente y el resultado al historial
        messages.append(message)
        messages.append({
            "role": "tool",
            "tool_call_id": tool_call.id,
            "content": json.dumps(result)
        })

    # ---------- 4. Segunda llamada: el modelo responde con el resultado ----------
    final = client.chat.completions.create(model="gpt-4o-mini", messages=messages)
    print(final.choices[0].message.content)
    # "Hoy en París hay 18 °C. ¡Lleva una chaqueta ligera!"
```

## 2.4 Cómo decide el modelo cuándo llamar a una función

El modelo decide en función de tres señales, en este orden de importancia práctica:

1. **La descripción de la herramienta**: es tu herramienta de marketing. "get_weather" con descripción "Obtiene el tiempo actual de una ciudad" funcionará; "func_1" con descripción vacía jamás será llamada correctamente.
2. **El system prompt**: instrucciones explícitas ("Usa `get_weather` para cualquier pregunta meteorológica, nunca respondas de memoria") corrigen ambigüedades.
3. **Few-shot en tool calling**: un ejemplo de conversación donde el asistente llama correctamente la herramienta es muy efectivo para modelos pequeños.

Buenas prácticas documentadas:

- Nombres de función **claros y verbosos**: `get_weather`, no `weather_stuff`.
- Mantén el **número de herramientas bajo** (regla general: menos de ~20; demasiadas confunden al modelo).
- **Valida los argumentos** del lado de tu código: el modelo puede inventar parámetros o valores. Nunca ejecutes SQL, borrados o pagos sin validación.
- `tool_choice`: `"auto"` deja decidir al modelo; `"required"` fuerza una llamada (útil en pipelines); `{"name": "..."}` fuerza una función concreta.

## 2.5 Herramientas múltiples y llamadas paralelas

Una sola petición de usuario puede requerir varias herramientas ("compara el tiempo de Madrid y Londres"). Los modelos recientes emiten **varias tool calls en paralelo** en una misma respuesta; tu código debe ejecutarlas todas y devolver cada resultado con su `tool_call_id` correspondiente.

```python
for tool_call in message.tool_calls:
    name = tool_call.function.name
    args = json.loads(tool_call.function.arguments)
    result = dispatch(name, args)          # tu enrutador de funciones
    messages.append({"role": "tool",
                     "tool_call_id": tool_call.id,
                     "content": json.dumps(result)})
```

## 2.6 Structured Outputs (salidas estructuradas garantizadas)

Relacionado pero distinto del tool calling: obligar a que la respuesta **final para el usuario** siga un esquema JSON exacto. OpenAI lo ofrece vía `response_format` con JSON Schema (garantiza cumplimiento de esquema; el antiguo "JSON mode" solo garantiza JSON válido, no el esquema). Regla práctica oficial:

- ¿Conectas el modelo a herramientas/datos de tu sistema? → **function calling**.
- ¿Quieres que la respuesta al usuario siga un formato (para pintar una UI, por ejemplo)? → **structured outputs con `response_format`**.

```python
from pydantic import BaseModel
from openai import OpenAI

class ResumenTicket(BaseModel):
    problema: str
    urgencia: Literal["alta", "media", "baja"]
    departamento: str

client = OpenAI()
resp = client.beta.chat.completions.parse(
    model="gpt-4o-mini",
    messages=[{"role": "user", "content": "Resumen del ticket: ..."}],
    response_format=ResumenTicket,
)
ticket = resp.choices[0].message.parsed   # objeto Pydantic validado
```

**Alternativas open source**: las librerías **Instructor** y **Outlines** aportan validación, reintentos y soporte multi-modelo (OpenAI, Anthropic, Ollama, DeepSeek...) si tu modelo no tiene Structured Outputs nativo.

## 2.7 Herramientas en el ecosistema open source

- **Ollama**: expone una API compatible con OpenAI para modelos locales, incluido tool calling con modelos que lo soportan bien (Qwen2.5, Llama 3.1+, Mistral...). Prueba siempre: la compatibilidad de API no garantiza que el tool calling funcione igual de bien que en modelos cerrados.
- **llama.cpp**: servidor local con soporte de herramientas para GGUF.
- **LiteLLM**: un único cliente Python para hablar con 100+ modelos (cerrados y abiertos) con la misma interfaz de tool calling.
- **MCP (Model Context Protocol)**: estándar abierto para exponer herramientas/datos de forma uniforme a cualquier modelo o agente; tu servidor MCP funciona con Claude Desktop, agentes propios, etc. Es el futuro de la interoperabilidad de herramientas.
- **Librerías de frameworks**: LangGraph, CrewAI y smolagents encapsulan todo este bucle (definir tools → ejecutar → devolver resultado → repetir) por ti.

## 2.8 Checklist para producción

- [ ] Descripciones de herramienta claras y system prompt explícito.
- [ ] Validación de argumentos antes de ejecutar (schema + reglas de negocio).
- [ ] Manejo de errores: si la herramienta falla, devuelve el error al modelo como mensaje `tool` y deja que reaccione.
- [ ] Límite de iteraciones del bucle agente (evita bucles infinitos).
- [ ] Logging de cada tool call (id, args, resultado, latencia).
- [ ] Temperature baja (0–0.2) en agentes que toman decisiones con herramientas.
- [ ] Herramientas de escritura (pagos, borrados, envíos) con confirmación humana.

---

# RECURSOS PARA AMPLIAR

## Documentación oficial (primera parada)

| Recurso | Enlace |
|---|---|
| Guía de function calling — OpenAI API | https://developers.openai.com/api/docs/guides/function-calling |
| Structured Outputs — OpenAI API | https://developers.openai.com/api/docs/guides/structured-outputs |
| Guía de prompt engineering — OpenAI | https://platform.openai.com/docs/guides/prompt-engineering |
| Prompt engineering — Microsoft Foundry (técnicas + temperature/top_p) | https://learn.microsoft.com/en-us/azure/foundry/openai/concepts/prompt-engineering |
| Documentación de prompts — Anthropic | https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview |
| OpenAI Cookbook (ejemplos de código) | https://cookbook.openai.com |

## Cursos gratuitos

| Recurso | Enlace |
|---|---|
| **Hugging Face LLM Course** (gratuito, sin anuncios: transformers, tokenizers, fine-tuning) | https://huggingface.co/learn/llm-course/en/chapter1/1 |
| **Hugging Face Agents Course** (agentes, tool calling, smolagents) | https://huggingface.co/learn/agents-course |
| DeepLearning.AI — short courses de prompting | https://www.deeplearning.ai/short-courses/ |
| fast.ai — Practical Deep Learning for Coders | https://course.fast.ai |

## Prompting

| Recurso | Enlace |
|---|---|
| **Prompt Engineering Guide** (DAIR.AI, la referencia open source: técnicas, papers, ejemplos) | https://www.promptingguide.ai |
| Awesome ChatGPT Prompts / técnicas | https://github.com/f/awesome-chatgpt-prompts |
| Paper "Chain-of-Thought Prompting Elicits Reasoning in LLMs" | https://arxiv.org/abs/2201.11903 |
| Paper original del Transformer ("Attention Is All You Need") | https://arxiv.org/abs/1706.03762 |

## Tool calling / agentes

| Recurso | Enlace |
|---|---|
| Model Context Protocol (especificación + SDKs) | https://modelcontextprotocol.io |
| Ollama (modelos locales con API compatible OpenAI) | https://ollama.com |
| LiteLLM (interfaz unificada multi-modelo) | https://github.com/BerriAI/litellm |
| Instructor (structured outputs multi-proveedor) | https://github.com/jxnl/instructor |
| Outlines (generación restringida open source) | https://github.com/dottxt-ai/outlines |
| Paper ReAct (razonamiento + acción, base de los agentes) | https://arxiv.org/abs/2210.03629 |
| Awesome LLM Agents (lista curada de papers y frameworks) | https://github.com/e2b-dev/awesome-ai-agents |

## Herramientas interactivas

| Recurso | Para qué |
|---|---|
| https://platform.openai.com/tokenizer | Visualizar cómo se trocea el texto en tokens |
| https://huggingface.co/spaces | Probar modelos abiertos en el navegador sin instalar nada |
| Ollama + `ollama run qwen2.5:7b` | Probar tool calling con un modelo abierto en local en 5 minutos |

---

*Sugerencia de lectura en orden: 1) ¿Qué es un LLM? + tokenización (HF LLM Course, cap. 1) → 2) Prompting Guide (zero/few-shot, CoT) → 3) Guía de function calling de OpenAI → 4) ReAct paper → 5) HF Agents Course.*