---
title: Fase 4 · Modelos abiertos y self-hosting
icon: server
order: 7
category:
  - Learning Path
tag:
  - vllm
  - ollama
  - quantizacion
---

# Fase 4 — Modelos abiertos y self-hosting

> Objetivo: llevar el enfoque open source hasta el final — desacoplarte de las APIs cerradas. Aprenderás a elegir modelos abiertos, entender la cuantización, servirlos con Ollama y vLLM, y evaluar si aguantan el trabajo de tus agentes.

## 🎬 Vídeos del MOOC de Berkeley para esta fase

Dos sesiones que dan la perspectiva de infraestructura y entrenamiento de modelos agentic. Véelas antes de montar tu servidor.

### Evolution of system designs from an AI engineer perspective — Yangqing Jia (NVIDIA)

Cómo ha evolucionado el diseño de sistemas de IA (desde sistemas clásicos hasta LLM agents) desde dentro de NVIDIA: el contexto de infraestructura perfecto para decidir cómo servir tus modelos.

<VidStack src="https://www.youtube.com/watch?v=xqRAS6rAouo" />

### Some Challenges and Lessons from Training Agentic Models — Weizhu Chen (Microsoft)

Qué aprendió Microsoft entrenando modelos para tool use multi-paso: por qué algunos modelos abiertos fallan en bucles agentic y cómo se evalúa eso.

<VidStack src="https://www.youtube.com/watch?v=xNxrBHZPDvM" />

---

## 1. Por qué self-hostear (y cuándo no)

::: tabs#razones

@tab A favor

- **Privacidad/soberanía de datos**: nada sale de tu red.
- **Coste predecible** si el volumen de tokens es alto (pagas hardware, no tokens).
- **Control total**: versiones fijas del modelo, fine-tuning, sin rate limits arbitrarios.
- **Coherencia con el enfoque open source** del learning path.

@tab En contra

- **Hardware caro** para modelos grandes (ver tabla de la sección 4).
- **Operación**: tú mantienes uptime, parches, monitorización.
- **Calidad**: los mejores modelos cerrados aún lideran en razonamiento complejo.
- **Cold starts y escalado** son problema tuyo, no del proveedor.

:::

Regla práctica: **self-hostea para desarrollo, datos sensibles y volumen alto; API para picos, prototipado y modelos frontera puntuales.**

## 2. El panorama de modelos abiertos (2026)

| Familia | Quién | Punto fuerte para agentes |
| --- | --- | --- |
| **Qwen3 / Qwen3.5** | Alibaba | Excelente tool calling, multilingüe (español incluido), tamaños 0.6B–235B |
| **Llama 4** | Meta | Ecosistema enorme, licencia comunitaria permisiva |
| **DeepSeek V3.x / R2** | DeepSeek | Razonamiento + tool use competitivo con frontera |
| **Kimi K2 / K3** | Moonshot AI | Modelos agentic de pesos abiertos más grandes (ver [Anexo Kimi](./anexo-kimi.md)) |
| **Mistral / Magistral** | Mistral AI | Licencias abiertas, eficientes en europeo |
| **gpt-oss** | OpenAI | Pesos abiertos con buen tool calling |
| **Moonlight-16B-A3B** | Moonshot/Kimi | 16B MoE (3B activos): viable en GPUs de consumo |

::: warning Siempre evalúa el tool calling
La compatibilidad de API no garantiza comportamiento equivalente. Un modelo puede declarar soporte de function calling y fallar en bucles de 10+ pasos. Prueba con **tus** herramientas y **tus** tareas antes de migrar (la Fase 5 cubre cómo evaluarlo sistemáticamente).
:::

## 3. Cuantización: el concepto clave

La cuantización reduce la precisión numérica de los pesos para que el modelo quepa en menos memoria:

| Formato | Precisión | Dónde se usa | Coste de calidad |
| --- | --- | --- | --- |
| **FP16/BF16** | 16 bits | Entrenamiento / referencia | 0 (línea base) |
| **FP8 / MXFP4** | 8 / 4 bits | Servidores modernos (vLLM, TensorRT) | Muy bajo |
| **AWQ / GPTQ** | 4 bits | GPUs de consumo | Bajo |
| **GGUF (Q4_K_M, Q8)** | 4–8 bits | **llama.cpp y Ollama** | Bajo–medio según nivel |

Regla mnemotécnica: **Q8 ≈ indistinguible de FP16; Q4_K_M es el equilibrio estándar; por debajo de Q4 empiezan a notarse fallos en razonamiento y tool calling.**

```bash
# Regla rápida: VRAM aproximada = parámetros × bytes-por-parámetro
# 7B en Q4 (≈0.55 GB/B) ≈ 4 GB  → cabe en una GPU de consumo
# 32B en Q4 ≈ 18 GB            → GPU de 24 GB
# 70B en Q4 ≈ 40 GB            → 1× A100 80GB o 2× 4090 con split
```

## 4. Ollama: local en 5 minutos

Para desarrollo y pruebas, nada es más rápido:

```bash
# Instalación: https://ollama.com (Linux, macOS, Windows)
ollama pull qwen2.5:7b          # ~4.7 GB
ollama run qwen2.5:7b
```

```python
# API compatible con OpenAI, incluido tool calling
from openai import OpenAI

client = OpenAI(base_url="http://localhost:11434/v1", api_key="ollama")
resp = client.chat.completions.create(
    model="qwen2.5:7b",
    messages=[{"role": "user", "content": "Hola"}],
)
print(resp.choices[0].message.content)
```

::: tip Modelos recomendados para empezar
`qwen2.5:7b` (general + tools), `qwen2.5-coder:7b` (código), `llama3.1:8b` (ecosistema). Con 16 GB de RAM o una GPU de 8 GB ya funciona.
:::

## 5. vLLM: servir en producción

Para throughput serio: continuous batching, PagedAttention, spec decoding y API compatible con OpenAI.

```bash
pip install vllm
vllm serve Qwen/Qwen2.5-7B-Instruct --host 0.0.0.0 --port 8000
```

```bash
curl http://localhost:8000/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{"model": "Qwen/Qwen2.5-7B-Instruct",
       "messages": [{"role": "user", "content": "Hola"}]}'
```

Alternativas: **SGLang** (muy competitivo en benchmarks de agentes), **llama.cpp** (CPU/GGUF), **KTransformers** (offload híbrido CPU+GPU para modelos enormes).

## 6. Migrar tu agente a local

El punto de esta fase: tu agente LangGraph de la Fase 2 solo cambia **la configuración del modelo**, nada más:

```python
# Antes: ChatOpenAI(model="gpt-4o-mini")
# Después:
from langchain_openai import ChatOpenAI

llm = ChatOpenAI(
    model="qwen2.5:7b",
    base_url="http://localhost:11434/v1",
    api_key="ollama",
    temperature=0,
)
```

Todo el grafo (nodos, herramientas, checkpoints) funciona igual. **El ejercicio:** corre tu suite de tareas del proyecto con el modelo local y anota dónde degrada.

## 7. Comparar modelos de forma sistemática

**Promptfoo** (open source) permite evaluar varios modelos sobre los mismos casos:

```bash
npm install -g promptfoo
```

```yaml
# promptfooconfig.yaml
prompts:
  - "Responde como experto: {{pregunta}}"
providers:
  - openai:gpt-4o-mini
  - ollama:qwen2.5:7b
  - ollama:llama3.1:8b
tests:
  - vars:
      pregunta: "¿Qué es un agente de IA?"
  - vars:
      pregunta: "Explica tool calling en 3 viñetas"
```

```bash
promptfoo eval
```

Genera una tabla comparativa con latencias y salidas. Úsala para decidir modelo + cuantización.

## 8. Proyecto de la fase

1. Monta Ollama con `qwen2.5:7b` y verifica el tool calling con 3 de tus herramientas.
2. Sirve el mismo modelo con vLLM y compara latencia/throughput.
3. Migra tu agente LangGraph de la Fase 2 al modelo local manteniendo las herramientas intactas.
4. Evalúa 3 modelos (uno cerrado + dos abiertos) con promptfoo sobre 10 tareas reales de tu agente.

::: details Criterio de éxito
Un informe comparativo: para cada modelo, tasa de éxito en las 10 tareas, latencia p50 y coste. Con eso justificarás tu elección de modelo en producción.
:::

## Recursos de la fase

| Recurso | Enlace |
| --- | --- |
| Ollama | https://ollama.com |
| vLLM (docs + ejemplos) | https://docs.vllm.ai |
| SGLang | https://github.com/sgl-project/sglang |
| llama.cpp | https://github.com/ggerganov/llama.cpp |
| Promptfoo | https://www.promptfoo.dev |
| Hugging Face (pesos abiertos) | https://huggingface.co |
| Open LLM Leaderboard | https://huggingface.co/spaces/open-llm-leaderboard/open_llm_leaderboard |

::: tip Siguiente paso
[Fase 5 · Producción: evaluación, observabilidad y despliegue](./fase-5-produccion.md).
:::