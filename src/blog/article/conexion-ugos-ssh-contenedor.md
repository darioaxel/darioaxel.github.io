---
title: "Guía configuración NAS Ugreen con UGOS"
date: 2025-11-30
category: [Blog]
tag: [NAS, Linux, Docker, SSH]
type: article
---
# Conexión desde contenedor ssh a UGOS mediante terminal

## Dentro del contenedor ejecuta:
```
ip route | grep default
```
 La salida será algo como:
```
default via 172.19.0.1 dev eth0
```                 ↑
Esta IP (172.19.0.1) es el NAS en la red Docker
Conéctate usando esa IP
```
ssh admin@172.19.0.1 -p puerto
```