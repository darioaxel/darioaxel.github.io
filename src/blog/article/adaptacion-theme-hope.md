---
title: "Adaptación de Theme Hope para mi Blog"
date: 2025-06-23
category: [Blog]
tag: [Vue, Nuxt, Theme Hope]
type: article
---
# Adaptación de Theme Hope para mi Blog


## Descripción del Proyecto
Este proyecto es una API RESTful desarrollada con Django y PostgreSQL para el testeo de futuros 
usos en los módulos.

## Software a utilizar
* Python: 3.11 (última estable)
* Django: 5.2.3 (última estable, requiere Python ≥3.10)
* PostgreSQL: 17 (última estable, disponible como imagen oficial en Docker)
* Poetry: para gestión de dependencias y entorno virtual
* Docker y Docker Compose: para contenerización

## Inicialización del Proyecto


### Estructura para la gestión de imágenese dentro de la documentación

Las imágenes se almacenan en el árbol de carpetas dentro de `src/.vuepress/public/images` y se referencian en la documentación con la ruta relativa. 
Por ejemplo, para una imagen llamada `01_image_1.png` dentro del módulo ***Bases de Datos***, se utilizaría:

```markdown
![Descripción de la imagen](/images/bbdd/01_image_1.png)
``` 