---
title: UT02 Diseño lógico de Bases de Datos
icon: material-symbols:book-5-outline
---
# 1. Modelos de datos

El modelado de datos es el primer paso para diseñar las bases de datos, y sirve de puente entre el mundo real y el modelo de base de datos que reside en el ordenador. Desempeña un papel fundamental ya que reduce las complejidades del mundo real y las convierte en abstracciones más fáciles de entender.

Un [modelo de datos](https://www.fpvirtualaragon.es/pluginfile.php/68126/mod_resource/content/0/index.html#te59a3a37-68ee-fe81-1557-6c439de07008) es la representación relativamente simple, generalmente gráfica, de estructuras de datos complejas del mundo real. Con relación a las bases de datos un modelo representa estructuras de datos y sus características, relaciones, restricciones y transformaciones.

Un buen diseño de la base de datos es el fundamento de buenas aplicaciones, y un buen diseño se inicia con la construcción de un buen modelo.

## 1.1. **Evolución de los sistemas de almacenamiento de la información.**

# 2. Modelo Entidad-Relación

El **modelo Entidad/Relación**  lo introdujo Peter Chen en 1976 y se trata de un modelo conceptual que permite representar el mundo real mediante una serie de símbolos y expresiones determinados. El modelo de datos **Entidad/Relación (E/R , ER ó E-R)** está basado en una percepción consistente en objetos básicos llamados **entidades** y las **relaciones**  entre estos objetos. Con el paso del tiempo, este modelo ha sufrido modificaciones y mejoras. Actualmente, el modelo **Entidad/Relación Extendido** (**ERE**) es el más aceptado, aunque existen variaciones que hacen que este modelo no sea totalmente un estándar. Ambos modelos serán estudiados a lo largo de esta unidad.

El modelo Entidad/Relación es una herramienta de referencia para la representación conceptual de problemas del mundo real. Su objetivo principal es facilitar el diseño de bases de datos permitiendo la especificación de un esquema que representa la estructura lógica completa de una base de datos. Este esquema partirá de las descripciones textuales de la realidad, que establecen los requerimientos del sistema, buscando ser lo más fiel posible al comportamiento del mundo real para modelarlo.

El modelo de datos E/R representa el significado de los datos, es un modelo semántico. De ahí que no esté orientado a ningún sistema físico concreto y tampoco tiene un ámbito informático puro de aplicación, ya que podría utilizarse para describir procesos de producción, estructuras de empresa, etc. Además, las características actuales de este modelo favorecen la representación de cualquier tipo de sistema y a cualquier nivel de abstracción o refinamiento, lo cual da lugar a que se aplique tanto a la representación de problemas que vayan a ser tratados mediante un sistema informatizado, como manual.