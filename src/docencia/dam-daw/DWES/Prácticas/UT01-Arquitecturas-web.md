---
title: Práctica UT01. Arquitecturas web 
date: 2024-06-10
icon: pen
---

# Práctica UT01. Arquitecturas web

| Módulo y curso |
| --- |
| **Desarrollo Web en Entorno Servidor** |
|**Curso 2025/2026**|

:::info
**Resultados de aprendizaje a trabajar**
RA1
:::

## Objetivo

Con esta práctica se pretende que el alumnado se familiarice con:

* La creación y uso de una cuenta en GitHub.
* La clonación de proyectos remotos en un entorno local.
* La publicación de páginas web estáticas en su servidor Apache local.
* La modificación de código HTML existente.
* El flujo de trabajo básico con GitHub (clonación, modificación, pull request).
* La verificación de peticiones HTTP entre cliente y servidor.

## Enunciado de la práctica

Se proporcionará al alumnado un repositorio de GitHub con un proyecto inicial. A partir de él deberán realizar las siguientes tareas:

1. **Crear una cuenta en GitHub**

   * Si no dispones de una, regístrate en [https://github.com](https://github.com).
   * Configura un nombre de usuario y correo válido.

2. **Clonar el proyecto**

   * Accede al repositorio:
     👉 [https://github.com/darioaxel/DWES-UT01-Practica-2025-2026](https://github.com/darioaxel/DWES-UT01-Practica-2025-2026)
   * Haz un fork del repositorio en tu cuenta de GitHub.
   * Clona tu fork en tu equipo local mediante:

     ```bash
     git clone https://github.com/<TU_USUARIO>/DWES-UT01-Practica-2025-2026.git
     ```

3. **Publicar la web en Apache**

   * Localiza el archivo HTML proporcionado en el repositorio.
   * Copia el proyecto dentro del directorio raíz de tu servidor Apache local (ejemplo: `/var/www/html/` en Linux, `htdocs/` en XAMPP para Windows).
   * Accede desde el navegador a [http://localhost](http://localhost) y comprueba que la web inicial se muestra correctamente.

4. **Ampliar el HTML**

   * El archivo contiene una *card* con información de ejemplo.
   * Debes **duplicar** esa card y, en la nueva, **rellenar tus datos personales**:

     * Imagen de perfil.
     * Nombre y apellidos.
     * Dirección de correo electrónico.
   * Mantén el mismo estilo visual que el original.

5. **Verificar comunicación HTTP**

   * Accede de nuevo a la web en [http://localhost](http://localhost).
   * Abre las herramientas de desarrollo del navegador (F12 → pestaña *Network*).
   * Realiza una captura de pantalla en la que se observe:

     * La petición GET al servidor.
     * La respuesta obtenida.
     * La visualización de la web en el navegador.

6. **Subir cambios a GitHub**

   * Añade y confirma los cambios en tu repositorio local:

     ```bash
     git add .
     git commit -m "Añadida nueva card con mis datos"
     git push origin main
     ```
   * Accede a tu repositorio en GitHub y crea un **pull request** hacia el repositorio original para proponer tus cambios.


## Entrega

La entrega de la práctica consistirá en un documento PDF, debidamente formateado, que se subirá al Moodle del centro donde se incluirá:
  
* Capturas del **proceso de modificación del html**.
* La **captura de pantalla** donde se muestre la petición GET y la respuesta del servidor en `localhost`.
* La **URL del pull request** realizado sobre el repositorio original.

---

## Criterios de evaluación

* [ ] Se ha creado correctamente la cuenta de GitHub y clonado el repositorio.
* [ ] Se ha publicado la web en Apache local.
* [ ] Se ha duplicado la card y personalizado con los datos del alumno.
* [ ] Se ha realizado la captura de la petición GET y respuesta del servidor.
* [ ] Se ha generado correctamente el pull request en GitHub.

---

