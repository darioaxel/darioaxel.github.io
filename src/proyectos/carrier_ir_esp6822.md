---
title: Flasheando una placa ESP_IR_TR_WIFI
icon: famicons:hardware-chip-outline
tag:
  - ESP6822
  - Raspberry Pi Zero W
  - Tasmota-IR
date: 3/9/2026
---


# Flasheando una placa ESP_IR_TR_WIFI con Tasmota-IR: Crónica de un proyecto que casi fracasa

> **Proyecto:** Análisis IR + Emulación Bus CCN Carrier  
> **Hardware:** Placa ESP_IR_TR_WIFI (ESP-12F) + Raspberry Pi Zero W  
> **Firmware:** Tasmota-IR 14.4.1  
> **Fecha:** 3 de septiembre de 2026  
> **Autor:** Documento generado a partir de la experiencia real del proyecto

---

## 1. El objetivo: domar un aire acondicionado Carrier

El proyecto nace de una necesidad muy concreta: controlar una unidad de aire acondicionado **Carrier** de forma inteligente, sin depender del mando a distancia original ni de termostatos propietarios.

### Arquitectura del sistema Carrier

```
Mando FRL011 ──IR 38kHz──> Receptor B034310H01 ──Bus CCN──> Unidad NTC
                                    (NO disponible)
```

El mando **NO habla directamente** con la unidad. Habla con un receptor IR cableado al **bus CCN** (RS485 a 9600 baudios). El usuario tiene el termostato CRC2-NTC pero **NO tiene el receptor IR**, por lo que la estrategia es:

1. **Fase 1:** Capturar códigos IR del mando FRL011
2. **Fase 2:** Espiar el bus CCN con el termostato para correlacionar IR <-> tramas CCN
3. **Fase 3:** Emular comandos CCN directamente con ESP32 + MAX485

### Hardware disponible

| Componente | Estado |
|---|---|
| Placa ESP_IR_TR_WIFI (ESP-12F) | Recibida, pines soldados |
| Mando Carrier FRL011 / FRL09 | Disponible |
| Termostato CRC2-NTC | Disponible (con bus CCN) |
| Receptor IR B034310H01 | **NO disponible** |
| Raspberry Pi Zero W | Disponible |
| Adaptador USB-TTL CH340 (HW-234) | Disponible |

---

## 2. Los intentos previos: fracaso con PC + CH340

### Primeros intentos de flasheo

Antes de usar la Raspberry Pi, se intentó flashear la placa con un **PC + adaptador USB-TTL HW-234 (CH340)**.

| Problema | Causa real | Solución aplicada |
|---|---|---|
| No aparecía en `lsusb` | El USB-C de la placa es **solo alimentación**, sin datos | Se usó el header UART |
| "Permission denied" en `/dev/ttyUSB0` | Usuario no en grupo `dialout` | Se usó `sudo` |
| "No serial data received" | Placa no entraba en modo flash | Se identificó que faltaba reset físico |
| Contacto intermitente | Pines del header no estaban soldados | **Pines soldados** |
| Fallos repetidos | Posible flash size incorrecto | Se identificó probar con `-fs 4MB -fm dio` |

**Conclusión de la fase:** El hardware (adaptador + placa) funcionaba. El problema era el **contacto físico** y el **procedimiento de modo flash**. Con pines soldados y reset manual (corte de VCC con IO0 a GND), debería haber funcionado... pero no lo hizo.

---

## 3. El cambio de estrategia: Raspberry Pi Zero W

### ¿Por qué la Pi Zero W?

La Raspberry Pi Zero W tiene **GPIO nativo con UART** (`/dev/ttyAMA0` o `/dev/serial0`). La idea era usarla directamente **sin adaptador USB-TTL**, eliminando un punto de fallo.

### Conexión Pi Zero W -> Placa ESP_IR_TR_WIFI

| Pi Zero W GPIO | Placa ESP_IR_TR_WIFI |
|---|---|
| **GPIO 14 (TXD)** | **RX** |
| **GPIO 15 (RXD)** | **TX** |
| **GND** | **GND** |
| **5V (pin 2)** | **5V** |

Y el puente **IO0 -> GND** en la placa para entrar en modo bootloader.

---

## 4. El primer obstáculo: el mini UART de la Zero W

### El problema del Bluetooth

En la **Raspberry Pi Zero W**, el chip Bluetooth **roba el UART principal (PL011, `/dev/ttyAMA0`)**. Los pines GPIO 14/15 quedan conectados al **mini UART (`/dev/ttyS0`)**, que es menos capaz y más propenso a errores de sincronización.

**Regla de oro:** Usar `/dev/serial0` (alias que apunta al UART correcto de los pines GPIO), no `/dev/ttyAMA0` directamente.

### Configuración del UART en Raspbian Trixie

En Trixie, los archivos de arranque están en `/boot/firmware/`:

```bash
# Verificar que no hay consola serial robando el puerto
cat /boot/firmware/cmdline.txt
# Correcto: console=tty1 (solo HDMI, no toca el UART)

# Habilitar UART
sudo raspi-config
# Interface Options -> Serial Port -> No login shell -> Yes hardware

# O manualmente:
echo "enable_uart=1" | sudo tee -a /boot/firmware/config.txt
```

Tras reiniciar:
```bash
ls -la /dev/serial*
# lrwxrwxrwx ... /dev/serial0 -> ttyS0
# lrwxrwxrwx ... /dev/serial1 -> ttyAMA0
```

### Solución definitiva: deshabilitar Bluetooth para usar el PL011

Para usar el UART de hardware completo (más robusto para esptool):

```bash
sudo nano /boot/firmware/config.txt
# Añadir al final:
# enable_uart=1
# dtoverlay=disable-bt

sudo systemctl disable hciuart
sudo reboot

# Tras reiniciar:
ls -la /dev/serial*
# lrwxrwxrwx ... /dev/serial0 -> ttyAMA0  <- ¡Ahora es el bueno!
# lrwxrwxrwx ... /dev/serial1 -> ttyS0
```

**Esta fue una mejora clave**, aunque no la solución final.

---

## 5. El problema oculto: el receptor IR bloquea el bootloader

### Síntoma

Con todo configurado correctamente (UART PL011, pines bien conectados, puente IO0-GND, reset manual), esptool seguía respondiendo:

```
esptool --port /dev/serial0 --baud 57600 chip_id
Connecting..................................
A fatal error occurred: Failed to connect to Espressif device: No serial data received.
```

### Investigación

Se buscó en internet si alguien había flasheado este modelo específico. Se encontró una pista crítica en la comunidad OpenMQTTGateway:

> **"The board is no flashable when the IR Receiver is connected."**

El receptor IR (fotodiodo demodulador 38kHz conectado a GPIO14) estaba **enviando señales de ruido/luz ambiente** que confundían al bootloader del ESP8266 al arrancar. El chip lee todos los GPIO en el momento del reset, y si GPIO14 tiene actividad, la sincronización del bootloader falla.

### La solución que funcionó

**Tapar el receptor IR** (o poner la placa boca abajo sobre una superficie oscura) antes de alimentarla con el puente IO0-GND puesto.

```text
1. Desconectar TODO de la placa (sin alimentación)
2. Tapar el receptor IR con cinta aislante negra O poner la placa boca abajo
3. Conectar el puente FIRME entre IO0 y GND
4. Conectar 5V y GND desde la Pi
5. Ejecutar esptool inmediatamente
```

**Resultado:** Conexión exitosa al primer intento.

---

## 6. Flasheo exitoso con Tasmota-IR

### Comandos utilizados

```bash
# Instalar esptool (disponible en repositorios de Debian Trixie)
sudo apt install esptool python3-serial

# Verificar conexión
esptool --port /dev/serial0 --baud 115200 chip_id
# Detecting chip type... ESP8266
# Chip is ESP8266EX

# Borrar flash
esptool --port /dev/serial0 --baud 115200 erase_flash

# Flashear Tasmota-IR
esptool --port /dev/serial0 --baud 115200 write_flash -fs 4MB -fm dio 0x0 tasmota-ir.bin
```

### Firmware utilizado

- **Archivo:** `tasmota-ir.bin` (versión 14.4.1)
- **Razón:** Incluye la librería `IRremoteESP8266` completa con soporte para decenas de protocolos de aire acondicionado, incluyendo Carrier.

---

## 7. Configuración del template de pines

### El problema del módulo

Tras flashear, Tasmota arrancó con el módulo genérico "Sonoff Basic". El template de pines se cargó pero **no se activó automáticamente**.

### Template para ESP_IR_TR_WIFI

```json
{"NAME":"ESP_IR_TR_WIFI","GPIO":[0,0,0,0,1056,0,0,0,0,0,1088,0,0,0],"FLAG":0,"BASE":18}
```

| GPIO | Función Tasmota | Hardware físico |
|---|---|---|
| GPIO4 (1056) | IRsend | LED emisor IR |
| GPIO14 (1088) | IRrecv | Receptor IR demodulador 38kHz |

### Comandos de activación

En la consola web de Tasmota:

```
Template {"NAME":"ESP_IR_TR_WIFI","GPIO":[0,0,0,0,1056,0,0,0,0,0,1088,0,0,0],"FLAG":0,"BASE":18}
Module 0
Restart 1
```

Tras reiniciar, el log confirmó:
```
"Module":"ESP_IR_TR_WIFI"
```

---

## 8. Captura exitosa: el protocolo CARRIER_AC40

### Primer contacto

Apuntando el mando **Carrier FRL011** al receptor IR de la placa, la consola de Tasmota mostró inmediatamente:

```json
{"IrReceived":{"Protocol":"CARRIER_AC40","Bits":40,"Data":"0xF03716407D","DataLSB":"0xFEC6802BE","Repeat":0}}
```

**Protocolo identificado:** `CARRIER_AC40` — ¡soportado nativamente por Tasmota-IR!

### Estructura de los códigos capturados

| Código (hex) | Contexto (aproximado) |
|---|---|
| `0xF03716407D` | Estado inicial / ON |
| `0xC03716C0CD` | Cambio de temperatura/modo |
| `0xD03716405D` | Otro estado |
| `0xE03716C0ED` | Otro estado |

**Patrón detectado:**
- Bytes `37 16` = fijos (identificador de marca/modelo)
- Byte 1 (`F0`, `C0`, `D0`, `E0`) = cambia con el estado
- Byte 4 (`40`/`C0`) + Byte 5 = checksum o flags de estado

### Característica clave de los mandos de AC

A diferencia de un mando de TV (donde cada botón envía un código fijo), los mandos de aire acondicionado envían el **ESTADO COMPLETO** del equipo en cada pulsación. El código incluye:
- Encendido/Apagado
- Temperatura objetivo
- Modo (frío/calor/ventilador/deshumidificar)
- Velocidad del ventilador
- Swing (aleteo)
- etc.

Esto explica por qué al pulsar "apagar y encender" aparecieron múltiples códigos diferentes.

---

## 9. Lecciones aprendidas (resumen de fallos y aciertos)

### ❌ Lo que NO funcionó

| Intento | Por qué falló |
|---|---|
| Flasheo con PC + CH340 | Contacto intermitente en pines no soldados + receptor IR enviando ruido |
| Usar `/dev/ttyAMA0` en Pi Zero W | El Bluetooth roba ese UART; hay que usar `/dev/serial0` o deshabilitar Bluetooth |
| Reset por software | El ESP-12F no tiene pin RST en el header; requiere corte de alimentación |
| Flasheo con receptor IR expuesto | El fotodiodo en GPIO14 envía señales que bloquean el bootloader |
| Subir firmware por web OTA (192.168.4.1) | El "upload new firmware" del firmware chino solo sirve para actualizar el mismo firmware; subir Tasmota por ahí habría brickeado la placa |

### ✅ Lo que SÍ funcionó

| Acierto | Impacto |
|---|---|
| Soldar los pines del header | Contacto estable y fiable |
| Usar Raspberry Pi Zero W con GPIO UART | Elimina adaptadores USB-TTL, alimentación y comunicación en un solo cableado |
| Deshabilitar Bluetooth (`dtoverlay=disable-bt`) | Libera el UART PL011 de hardware completo, más robusto |
| **Tapar el receptor IR** | **La clave del éxito**: evita que GPIO14 interfiera con el bootloader |
| Reset manual por corte de VCC | El único método viable sin pin RST |
| Tasmota-IR con template correcto | Reconoce nativamente el protocolo CARRIER_AC40 |

---

## 10. Próximos pasos

### Fase 1 (en curso): Mapeo completo del mando

Completar la tabla de códigos IR para cada combinación de:
- Temperatura (16°C - 30°C)
- Modo (Frío, Calor, Ventilador, Deshumidificar)
- Velocidad del ventilador (Baja, Media, Alta, Auto)
- Swing (On/Off)
- ON/OFF

### Fase 2: Espiar el bus CCN

Conectar la Raspberry Pi Zero W al bus CCN (RS485) vía un adaptador MAX485 para correlacionar cada código IR con su trama CCN equivalente.

### Fase 3: Emulación

Usar un ESP32 + MAX485 para emular directamente el bus CCN, eliminando la necesidad del receptor IR original.

---

## 11. Referencias y recursos

- **Placa:** ESP_IR_TR_WIFI (código 303ESPIR3, ESP-12F)
- **Firmware:** [Tasmota-IR releases](https://github.com/arendst/Tasmota/releases)
- **Librería IR:** [IRremoteESP8266](https://github.com/crankyoldgit/IRremoteESP8266)
- **Documentación Tasmota:** [Templates](https://tasmota.github.io/docs/Templates/)
- **Proyecto base:** OpenMQTTGateway / IRremoteESP8266 Carrier AC support

---

> *"El receptor IR tapado fue la diferencia entre un proyecto abandonado y uno que funciona. A veces la solución más simple es la que menos te esperas."*

---

