---
title: UT05 Servicios Web - REST
date: 2025-09-29   
icon: mynaui:api-solid
---

<!-- ![banner](/images/dwes/banner02.webp)-->

# UT05 Servicios Web - REST
![En construcción](/images/under-construction.jpg)

> **En este tema trabajaremos los siguientes RAs:**
> - RA4. Desarrolla aplicaciones web que acceden a bases de datos utilizando lenguajes, librerías y patrones adecuados.
> - RA5. Utiliza frameworks y componentes que simplifican el acceso a los datos y la persistencia de la información.
> - RA7. Desarrolla servicios Web reutilizables y accesibles mediante protocolos Web, verificando su funcionamiento.

## 1.1. ¿Qué es un servicio web?
### 1.1.1. Una definición de servicio web
Un servicio web es una aplicación web capaz de comunicarse e intercambiar información con otra aplicación (que denominaremos cliente) independientemente de la plataforma en la que cada una se ejecute.  
![Rest API](/images/dwes/Rest-API.png)
Es decir, el servicio web puede estar programado en PHP y correr bajo un sistema operativo GNU/Linux y el cliente puede estar programado con C# y correr bajo un Windows, y deberían ser capaces de comunicarse y trabajar juntas. Pero es importante que quede claro que, en este caso, la aplicación web (servidor) y la aplicación cliente son dos aplicaciones diferentes.  
![soap diagram](/images/dwes/soap-diagram.png)
Los mensajes que las aplicaciones se intercambian generalmente tienen formato **XML** o **JSON**.  

Existen dos estándares principales en la industria para implementar servicios web, denominados **SOAP** y **REST**. Siendo el primero más antiguo y a día de hoy, con mucho menos uso que REST. A lo largo el tema, vamos a aprender cómo funciona cada uno de ellos.  

### 1.1.2. Diferencias entre servicios web y aplicaciones web
Llegados a este punto, puede que estés pensando:
> “Vale, pero ¿en qué se diferencia todo esto de una aplicación web MVC? ¿No intercambian también el cliente y el servidor información independientemente de la plataforma en la que se ejecuta cada uno?”.

Pues sí, pero hay algunas diferencias fundamentales entre un servicio web y una aplicación web:

* Una aplicación web está diseñada para que un ser humano interactúe con ella a través de un interfaz HTML. 
* Un servicio web, en cambio, está pensado para que lo use otra aplicación informática (el cliente), no necesariamente un ser humano. Por ese motivo, los servicios web suelen carecer de interfaz de usuario y no producen salidas HTML legibles. Es decir, un servicio web puro no suele tener vistas.  

En cambio, los servicios web suelen producir salidas **XML** o **JSON**, pensadas para que los clientes las procesen. Una aplicación web, en cambio, solo responde con XML o JSON cuando recibe una petición Ajax, algo que veremos próximos temas.  

Por lo demás, un servicio web puede tener una arquitectura aproximadamente MVC, y digo aproximadamente porque el servicio web, como acabo de contarte, carece de vistas. Pero puede seguir conservando sus controladores y sus modelos. Los controladores se encargarán de convertir los datos de los modelos a JSON o XML y devolverlos al cliente.  

## 2. SOAP
**SOAP** (Single Object Access Protocol) es un mecanismo estandarizado para la implementación, descripción y publicación de servicios en red.

SOAP establece el modo en el que deben comportarse el cliente y el servidor para hablar entre sí, así como la forma en la que el servidor debe dar a conocer sus servicios.

SOAP se define por primera vez en 1998 (derivado de XML‑RPC) y su versión 1.1 se publica en el año 2000; en 2003 se estandariza SOAP 1.2 como recomendación del W3C. Hoy no está exactamente “muerto”, pero en muchos entornos se ha dejado de usar en favor de APIs HTTP+JSON de estilo REST por su complejidad y rigidez.
​
### 2.1. La pila de protocolos de SOAP
El estándar SOAP define una serie de protocolos de niveles de abstracción crecientes. Esta colección de protocolos suele denominarse **pila de protocolos SOAP**, y son los siguientes:

| Nivel de abstracción |	Protocolo |
| --- | --- |
| Nivel de descubrimiento|	UDDI|
| Nivel de publicación|	UDDI|
| Nivel de descripción|	WSDL|
| Nivel de mensajería|	SOAP|
| Nivel de red|	TCP, SMTP, FTP, etc|

Como ves, SOAP solo es uno de los protocolos de la pila, aunque todo el tinglado recibe el nombre “SOAP” por extensión.

Vamos a explicar brevemente en qué consiste cada protocolo de la pila, y lo vamos a hacer, como en otras ocasiones, por medio de unos ejemplos en lugar de perdernos en largas y farragosas explicaciones.

### 2.2. Los protocolos SOAP y WSDL
Para entender cómo funciona el protocolo SOAP (el más importante de la pila, como ya te habrás imaginado por su nombre) y, en menor medida, el protocolo WSDL, vamos a implementar tres ejemplos de servicios web muy sencillos:

* En el primero veremos cómo construir un servidor que devuelva colecciones de datos en forma de array.
* En el segundo veremos cómo puede un servidor devolver datos con estructura más compleja formateados con JSON.
* En el tercero montaremos un pequeño servidor con WSDL.
  
#### Ejemplo 1: Consulta de una BD de marcas y modelos de coches

Vamos a programar un servicio web muy simple capaz de servir a los clientes que nos lo pidan un listado de las marcas de coches que existen y otro con los modelos registrados que pertenecen a una marca en concreto.

El servidor, por lo tanto, necesita dos funciones:
 * obtenerMarcas
 * obtenerModelos($idMarca)

:::important
Aquí ya se ve la primera diferencia con REST: ni los nombres de los métodos están estandarizados, ni hay una colección de métodos predefinidos para cada tipo de recurso. Cuando veamos REST en el siguiente apartado, entenderás mejor qué significa esta afirmación.
:::

El cliente, como es lógico, debe conocer cómo utilizar el servidor. Esto puede hacerse mediante el protocolo WSDL (que ya veremos un poco después) o por otras vías más tradicionales: documentación de la API, guía del desarrollador, manual de usuario…

1. pom.xml (packaging jar, dependencias provided)
```xml
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0
                             https://maven.apache.org/xsd/maven-4.0.0.xsd">
  <modelVersion>4.0.0</modelVersion>
  <groupId>org.ejemplo</groupId>
  <artifactId>payara-coches</artifactId>
  <version>1.0</version>
  <packaging>jar</packaging>

  <properties>
    <maven.compiler.source>11</maven.compiler.source>
    <maven.compiler.target>11</maven.compiler.target>
    <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    <payara.version>6.2023.10</payara.version>   <!-- o la última -->
  </properties>

  <dependencies>
    <!-- API JAX-WS ya incluida en Payara -->
    <dependency>
      <groupId>jakarta.xml.ws</groupId>
      <artifactId>jakarta.xml.ws-api</artifactId>
      <version>4.0.0</version>
      <scope>provided</scope>
    </dependency>
    <!-- Para anotar la clase -->
    <dependency>
      <groupId>jakarta.jws</groupId>
      <artifactId>jakarta.jws-api</artifactId>
      <version>3.0.0</version>
      <scope>provided</scope>
    </dependency>
  </dependencies>

  <build>
    <plugins>
      <plugin>
        <groupId>org.apache.maven.plugins</groupId>
        <artifactId>maven-compiler-plugin</artifactId>
        <version>3.10.1</version>
      </plugin>
      <!-- plugin de Payara para arrancar rápido -->
      <plugin>
        <groupId>fish.payara.maven.plugins</groupId>
        <artifactId>payara-micro-maven-plugin</artifactId>
        <version>2.2</version>
        <configuration>
          <payaraVersion>${payara.version}</payaraVersion>
          <deployWar>false</deployWar>
        </configuration>
      </plugin>
    </plugins>
  </build>
</project>
```

2. Interfaz del servicio
```java
package org.ejemplo.service;

import jakarta.jws.WebMethod;
import jakarta.jws.WebParam;
import jakarta.jws.WebService;
import java.util.List;

@WebService
public interface CochesService {
    @WebMethod
    List<String> obtenerMarcas();

    @WebMethod
    List<String> obtenerModelos(@WebParam(name = "idMarca") int idMarca);
}
```

3. Implementación (sin web.xml)
```java
package org.ejemplo.service;

import jakarta.jws.WebService;
import java.util.List;
import java.util.Map;

import static java.util.Map.entry;

@WebService(endpointInterface = "org.ejemplo.service.CochesService")
public class CochesServiceImpl implements CochesService {

    private static final Map<Integer, List<String>> BD = Map.ofEntries(
        entry(1, List.of("Arona", "Ibiza", "Leon")),
        entry(2, List.of("Golf", "T-Roc", "Passat")),
        entry(3, List.of("C3", "C4", "C5"))
    );

    @Override
    public List<String> obtenerMarcas() {
        return List.of("Seat", "Volkswagen", "Citroën");
    }

    @Override
    public List<String> obtenerModelos(int idMarca) {
        return BD.getOrDefault(idMarca, List.of());
    }
}
```
4. WSDL que deberemos de usar
```xml
<?xml version="1.0" encoding="UTF-8"?>
<!-- 
  WSDL generado por Payara 6 / Metro 4.0  
  Servicio: CochesServiceImplService  
  Namespace: http://service.ejemplo.org/
-->
<definitions xmlns="http://schemas.xmlsoap.org/wsdl/"
             xmlns:tns="http://service.ejemplo.org/"
             xmlns:soap="http://schemas.xmlsoap.org/wsdl/soap/"
             xmlns:xsd="http://www.w3.org/2001/XMLSchema"
             xmlns:wsam="http://www.w3.org/2007/05/addressing/metadata"
             targetNamespace="http://service.ejemplo.org/"
             name="CochesServiceImplService">

  <types>
    <xsd:schema targetNamespace="http://service.ejemplo.org/">
      <!-- obtenerMarcas -->
      <xsd:element name="obtenerMarcas" type="tns:obtenerMarcas"/>
      <xsd:element name="obtenerMarcasResponse" type="tns:obtenerMarcasResponse"/>
      <xsd:complexType name="obtenerMarcas">
        <xsd:sequence/>
      </xsd:complexType>
      <xsd:complexType name="obtenerMarcasResponse">
        <xsd:sequence>
          <xsd:element name="return" type="xsd:string" minOccurs="0" maxOccurs="unbounded"/>
        </xsd:sequence>
      </xsd:complexType>

      <!-- obtenerModelos -->
      <xsd:element name="obtenerModelos" type="tns:obtenerModelos"/>
      <xsd:element name="obtenerModelosResponse" type="tns:obtenerModelosResponse"/>
      <xsd:complexType name="obtenerModelos">
        <xsd:sequence>
          <xsd:element name="idMarca" type="xsd:int"/>
        </xsd:sequence>
      </xsd:complexType>
      <xsd:complexType name="obtenerModelosResponse">
        <xsd:sequence>
          <xsd:element name="return" type="xsd:string" minOccurs="0" maxOccurs="unbounded"/>
        </xsd:sequence>
      </xsd:complexType>
    </xsd:schema>
  </types>

  <message name="obtenerMarcas">
    <part name="parameters" element="tns:obtenerMarcas"/>
  </message>
  <message name="obtenerMarcasResponse">
    <part name="parameters" element="tns:obtenerMarcasResponse"/>
  </message>

  <message name="obtenerModelos">
    <part name="parameters" element="tns:obtenerModelos"/>
  </message>
  <message name="obtenerModelosResponse">
    <part name="parameters" element="tns:obtenerModelosResponse"/>
  </message>

  <portType name="CochesServiceImpl">
    <operation name="obtenerMarcas">
      <input message="tns:obtenerMarcars"/>
      <output message="tns:obtenerMarcasResponse"/>
    </operation>
    <operation name="obtenerModelos">
      <input message="tns:obtenerModelos"/>
      <output message="tns:obtenerModelosResponse"/>
    </operation>
  </portType>

  <binding name="CochesServiceImplPortBinding" type="tns:CochesServiceImpl">
    <soap:binding transport="http://schemas.xmlsoap.org/soap/http" style="document"/>
    <operation name="obtenerMarcas">
      <soap:operation soapAction=""/>
      <input>
        <soap:body use="literal"/>
      </input>
      <output>
        <soap:body use="literal"/>
      </output>
    </operation>
    <operation name="obtenerModelos">
      <soap:operation soapAction=""/>
      <input>
        <soap:body use="literal"/>
      </input>
      <output>
        <soap:body use="literal"/>
      </output>
    </operation>
  </binding>

  <service name="CochesServiceImplService">
    <port name="CochesServiceImplPort" binding="tns:CochesServiceImplPortBinding">
      <soap:address location="http://localhost:8080/CochesServiceImplService"/>
    </port>
  </service>
</definitions>
```

5. Cliente 
```java
URL wsdl = new URL("http://localhost:8080/CochesServiceImplService?wsdl");
QName  qn  = new QName("http://service.ejemplo.org/","CochesServiceImplService");
Service service = Service.create(wsdl, qn);
CochesService port = service.getPort(CochesService.class);
System.out.println(port.obtenerMarcas());
```

### 2.3. SOAP en la actualidad
Actualmente SOAP no es un protocolo que plantee para nuevas implementaciones a no ser que sea una exigencia por el sofware con el que se va trabajar. Las principales razones por las que se deja de usar tanto son
 * Es un protocolo complejo: especificación grande, WSDL, pila WS-* (WS-Security, WS-Addressing, etc.), lo que hace costoso aprenderlo, configurarlo y mantenerlo.
​
 * Requiere herramientas y frameworks pesados; el código y configuración generados suelen ser difíciles de depurar y de mantener a lo largo del tiempo.

## 2. Servicios REST
REST, que significa Representational State Transfer, es un estilo de arquitectura para sistemas de software que se utiliza principalmente en el desarrollo de servicios web. Los servicios web que siguen los principios de REST se denominan servicios web RESTful.

### 2.1. Características 

1. **Protocolo Cliente-Servidor:** En un servicio REST, la interacción entre el cliente y el servidor se realiza a través de solicitudes y respuestas. El cliente envía una solicitud al servidor, y el servidor procesa la solicitud y envía una respuesta al cliente.

2. **Sin estado:** Cada solicitud del cliente al servidor debe contener toda la información necesaria para comprender y procesar la solicitud. El servidor no almacena ninguna información sobre el estado del cliente entre solicitudes.

3. **Cacheable:** Las respuestas del servidor pueden ser almacenadas en cache por el cliente. Esto puede mejorar la eficiencia y la escalabilidad del servicio al reducir la necesidad de solicitudes repetitivas de la misma información.

4. **Sistema en capas:** Un servicio REST puede estar compuesto por varias capas de servidores. Cada capa tiene una responsabilidad específica y puede interactuar solo con la capa inmediatamente anterior o siguiente.

5. **Interfaz uniforme:** Los servicios REST utilizan un conjunto limitado de métodos bien definidos para interactuar con los recursos. Los recursos se identifican por sus URIs (Uniform Resource Identifiers), y se pueden manipular utilizando representaciones estándar.

### 2.2. Componentes

- **Request:** Una solicitud REST se compone de un método HTTP, una URI, una serie de headers y, opcionalmente, un body. Los métodos HTTP más comunes utilizados en los servicios REST son GET (para recuperar información), POST (para enviar nueva información), PUT (para actualizar información existente) y DELETE (para eliminar información).

- **Header:** El header de una solicitud REST contiene metadatos sobre la solicitud, como el tipo de contenido, la autenticación, la información de la cache, etc.

- **Response:** Una respuesta REST incluye un código de estado HTTP, un header y, a menudo, un body con la representación del recurso solicitado. Los códigos de estado HTTP indican el resultado de la solicitud, por ejemplo, si fue exitosa, si hubo un error del cliente o del servidor, etc.

### 2.3. Ventajas y Desventajas

**Ventajas de los servicios REST**

- Son fáciles de entender y utilizar.
- Son altamente escalables debido a su naturaleza sin estado.
- Permiten una gran flexibilidad en el tipo de datos que pueden ser transferidos.
- Son compatibles con la mayoría de los lenguajes y plataformas.

**Desventajas de los servicios REST**

- No son adecuados para operaciones en tiempo real o para la transmisión de datos en tiempo real.
- La seguridad puede ser más desafiante debido a la falta de un estándar de seguridad integrado.
- No son la mejor opción para operaciones que requieren el mantenimiento de un estado de conexión.

## 3. API REST (RestFul)

Una API es RESTful cuando respeta de forma consistente los principios REST en su diseño y comportamiento.
:::tip
REST es la teoría. RESTful es la aplicación práctica, con todas sus implicaciones.
:::

### 3.1. REST vs RESTful 
| Aspecto	| REST (teoría)	| RESTful	| REST-like habitual |
| --- | --- | ---| --- |
|Modelo|	Estilo arquitectónico	|Implementación coherente|	Convención informal|
|Recursos|	Obligatorios	|Bien definidos	|Mezcla recursos y acciones|
|Métodos HTTP	|Semánticos	|Usados correctamente	|POST para todo|
|Estado	|Stateless	|Stateless real	|Estado implícito|


### Cuándo importa ser “RESTful”… y cuándo no

* Cuándo ***SI*** importa (mucho)
  * APIs públicas o con múltiples clientes (web, móvil, terceros): coherencia y predictibilidad reducen fricción.
  * Integraciones a largo plazo: cuanto más dura un contrato, más duele romperlo.
  * Ecosistemas con muchos equipos: RESTful actúa como “idioma común” para evitar APIs caóticas.
  * Necesidad de caché y escalado de lecturas: REST facilita cacheabilidad cuando se diseña bien.

* Cuándo ***NO*** es crítico ser “REST puro”
  * APIs internas de bajo impacto con un solo cliente controlado (por ejemplo, un BFF simple).
  * Sistemas orientados a eventos donde el flujo principal no es request/response.
  * Casos con alta complejidad de consulta donde GraphQL puede encajar mejor.
  * Operaciones muy específicas (RPC real) donde la semántica de “recursos” no encaja sin forzar el diseño.

::: tip
El **criterio Gondor** aquí es simple: no conviertas REST en religión. Si el coste de “ser RESTful” supera el beneficio, aplica REST-like coherente y documentado.
:::


### 3.2. Ejemplo 1: Consulta de una BD de marcas y modelos de coches

Ahora vamos a implementar el mismo ejemplo que hicimos con SOAP mediante un servicio REST utilizando [FastAPI](https://fastapi.tiangolo.com/). 

Servicio que expone exactamente las mismas dos funciones que el SOAP anterior:

1. `GET /marcas` → devuelve la lista de marcas  
2. `GET /marcas/{id_marca}/modelos` → devuelve los modelos de esa marca

**Estructura:**
```
fastapi-coches/
├── main.py
└── requirements.txt
```

**requirements.txt**
```
fastapi==0.110.0
uvicorn[standard]==0.27.1
```

```python
# main.py
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List

app = FastAPI(title="CochesAPI", version="1.0.0")

# ---- esquemas ----
class MarcaOut(BaseModel):
    id: int
    nombre: str

class ModeloOut(BaseModel):
    id_marca: int
    modelos: List[str]

# ---- datos mock ----
MARCAS = {1: "Seat", 2: "Volkswagen", 3: "Citroën"}
MODELOS = {1: ["Arona", "Ibiza", "León"],
           2: ["Golf", "T-Roc", "Passat"],
           3: ["C3", "C4", "C5"]}

# ---- endpoints ----
@app.get("/marcas", response_model=List[MarcaOut])
def obtener_marcas():
    """Lista de marcas en formato JSON completo."""
    return [{"id": i, "nombre": m} for i, m in MARCAS.items()]

@app.get("/marcas/{id_marca}/modelos", response_model=ModeloOut)
def obtener_modelos(id_marca: int):
    """Modelos de la marca solicitada."""
    if id_marca not in MODELOS:
        raise HTTPException(status_code=404, detail="Marca no encontrada")
    return ModeloOut(id_marca=id_marca, modelos=MODELOS[id_marca])
```

Para levantar la apliación haremos (ya lo veremos en prácticas más detalladamente)
```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

Podemos probar nuestra api usando **curl** como sigue:

`GET /marcas`
```bash
# marcas
curl http://localhost:8000/marcas
# ["Seat","Volkswagen","Citroën"]
```

```json
[
  {"id": 1, "nombre": "Seat"},
  {"id": 2, "nombre": "Volkswagen"},
  {"id": 3, "nombre": "Citroën"}
]
```

`GET /marcas/2/modelos`
```bash
curl http://localhost:8000/marcas/2/modelos
# ["Golf","T-Roc","Passat"]
```

```json
{
  "id_marca": 2,
  "modelos": ["Golf", "T-Roc", "Passat"]
}
```




Documentación generada de forma automática: `http://localhost:8000/docs` (Swagger UI)

## 4. Buenas prácticas creando una API RestFull

Diseñar una API REST (Representational State Transfer) para gestionar un recurso implica seguir ciertas **convenciones y principios fundamentales**. 

En primer lugar, debes entender qué es un **recurso** en el contexto de una API REST. Un recurso es cualquier objeto que queremos gestionar y puede ser accedido a través de una URL única. Por ejemplo, si estás construyendo una API para un blog, tus recursos podrían ser "usuarios", "posts" y "comentarios".

### 4.1. Recursos y Endpoints

Las URL de los **endpoints** en una API REST deben ser diseñadas de tal manera que representen los recursos. Aquí hay algunas convenciones comunes:

- Utiliza sustantivos en plural para los nombres de los recursos. Por ejemplo, `/users` para acceder a la lista de usuarios y `/users/{id}` para acceder a un usuario específico.

- Evita utilizar verbos en las URL. En su lugar, utiliza los métodos HTTP para representar acciones. Por ejemplo, `GET /users` para obtener la lista de usuarios, `POST /users` para crear un nuevo usuario, `PUT /users/{id}` para actualizar un usuario específico, y `DELETE /users/{id}` para eliminar un usuario específico.

Ten en cuenta que una URL debe identificar un recurso específico, y no una acción. Por ejemplo, `/users/123` es una URL válida, pero `/users/create` no lo es.

### 4.2. Métodos HTTP
Los métodos HTTP representan las acciones que se pueden realizar sobre un recurso. Los más comunes son:

1. **GET**: Este método se utiliza para obtener información de un recurso en particular. Cuando se realiza una solicitud GET a un servidor, este devuelve los datos solicitados del recurso especificado. Por ejemplo, si tienes un servicio web que proporciona información sobre libros, una solicitud GET a "/books/1" podría devolver los detalles del libro con el ID 1.

2. **POST**: Este método se utiliza para enviar datos a un servidor y crear un nuevo recurso. Los datos a enviar se incluyen en el cuerpo de la solicitud. Siguiendo el ejemplo anterior, podrías usar POST para añadir un nuevo libro a la colección, enviando los detalles del libro (título, autor, fecha de publicación, etc.) en el cuerpo de la solicitud a "/books".

3. **PUT**: Este método se utiliza para actualizar un recurso existente. Al igual que POST, los datos a enviar se incluyen en el cuerpo de la solicitud. Sin embargo, a diferencia de POST, PUT es idempotente, lo que significa que hacer la misma solicitud PUT varias veces tendrá el mismo efecto que hacerla una vez. Por ejemplo, podrías utilizar PUT para actualizar los detalles del libro con el ID 1, enviando los nuevos detalles en el cuerpo de la solicitud a "/books/1".

4. **PATCH**: Este método es similar a PUT, pero se utiliza para actualizar parcialmente un recurso. Mientras que PUT requiere que envíes todos los datos del recurso, independientemente de si han cambiado o no, PATCH te permite enviar solo los datos que han cambiado. Por ejemplo, podrías utilizar PATCH para actualizar solo el título del libro con el ID 1, enviando el nuevo título en el cuerpo de la solicitud a "/books/1".

5. **DELETE**: Este método se utiliza para eliminar un recurso. No necesitas enviar ningún dato adicional con una solicitud DELETE; simplemente especificas el recurso que deseas eliminar. Por ejemplo, podrías utilizar DELETE para eliminar el libro con el ID 1 haciendo una solicitud DELETE a "/books/1".

Estos métodos son fundamentales para el diseño de APIs RESTful, que se basan en los principios de los sistemas de representación de estado transferible (REST) para permitir la creación de servicios web que pueden ser utilizados por múltiples clientes, incluyendo navegadores web, aplicaciones móviles, y otros servidores.

### 4.3 Respuestas
Los códigos de estado HTTP son una parte integral de cómo funcionan los servicios web y la arquitectura REST. Estos códigos son la manera en que un servidor informa al cliente sobre el resultado de su solicitud, y pueden tener un contenido asociado. Por ejemplo, si realizas una solicitud GET a un servidor y el recurso solicitado se encuentra, el servidor devolverá un código 200 OK junto con el recurso solicitado en el cuerpo de la respuesta. Algunos de lo que más usarás son:

- **200 OK**: Este es el código de estado más comúnmente recibido. Significa que la solicitud ha sido procesada con éxito y la respuesta es apropiada a la petición.

- **201 Created**: Este código de estado se utiliza para indicar que la solicitud ha sido cumplida y ha resultado en la creación de un nuevo recurso. Por ejemplo, si se realiza una solicitud POST para crear un nuevo usuario en una base de datos y la operación es exitosa, el servidor puede devolver un código 201. El cuerpo de la respuesta puede incluir una URL que apunte al nuevo recurso, así como los datos del nuevo recurso.

- **204 No Content**: Este código indica que la solicitud se ha completado con éxito, pero no hay contenido para enviar de vuelta. Esto es común en situaciones donde sólo necesitas realizar una acción, como eliminar un recurso, pero no necesitas una respuesta.

- **400 Bad Request**: Este código indica que el servidor no pudo entender la solicitud debido a una sintaxis inválida. Por ejemplo, si envías datos JSON mal formados en una solicitud POST, puedes recibir un código 400.

- **401 Unauthorized**: Este código de estado indica que la solicitud requiere autenticación de usuario. Si intentas acceder a un recurso que requiere autenticación sin proporcionar las credenciales correctas, recibirás un código 401.

- **403 Forbidden**: A diferencia del 401, este código indica que la autenticación ha sido procesada pero el cliente no tiene permisos para acceder al recurso. Por ejemplo, si un usuario intenta modificar datos a los que no tiene acceso, recibirá un código 403.

- **404 Not Found**: Este código indica que el recurso solicitado no pudo ser encontrado en el servidor. Por ejemplo, si intentas acceder a una URL que no existe, recibirás un código 404.

- **405 Method Not Allowed**: Este código indica que el método de solicitud (GET, POST, PUT, DELETE, etc.) no es compatible con el recurso solicitado. Por ejemplo, si intentas realizar una solicitud PUT en una URL que sólo admite GET, recibirás un código 405.

- **406 Not Acceptable**: Este código se utiliza para indicar que el recurso solicitado es incapaz de generar contenido que cumpla con los encabezados de aceptación enviados en la solicitud. Por ejemplo, si solicitas un tipo de contenido que el servidor no puede proporcionar, recibirás un código 406, o si pasas un tipo de contenido que el servidor no puede aceptar, recibirás un código 415.

- **408 Request Timeout**: Este código indica que el servidor cerró la conexión inactiva porque la solicitud del cliente tardó demasiado tiempo. Por ejemplo, si el servidor tiene un tiempo de espera configurado y tu solicitud no se completa en ese tiempo, recibirás un código 408.

- **500 Internal Server Error**: Este código indica que el servidor encontró una condición inesperada que le impidió cumplir con la solicitud. Por ejemplo, si el servidor encuentra un error al procesar una solicitud, puede devolver un código 500.

Además, las respuestas deberían incluir el recurso o los recursos solicitados en el cuerpo de la respuesta en un formato como JSON.

### 4.4 Error Handling
Es importante manejar los errores de manera adecuada en tu API REST. Esto significa proporcionar mensajes de error claros y útiles, así como códigos de estado HTTP adecuados.

### 4.5. Versionado
Es aconsejable versionar tu API para que puedas hacer cambios y mejoras sin romper las aplicaciones existentes que utilizan tu API. Una forma común de hacer esto es incluir el número de versión en la URL, como en `/v1/users`.

### 4.6 Ejemplo de diseño de acceso de un recurso

| Endpoint | Petición HTTP | Body | Response Code | Response Body | Posibles Errores |
|----------|---------------|------|---------------|---------------|------------------|
| /productos | GET | N/A | 200 (OK) | `{ "productos": [{"id": 1, "nombre": "Producto 1", "precio": 10.99}, {"id": 2, "nombre": "Producto 2", "precio": 20.99}]}` | |
| /productos | POST | `{ "nombre": "Producto Nuevo", "precio": 15.99 }` | 201 (Created) | `{ "id": 3, "nombre": "Producto Nuevo", "precio": 15.99 }` | 400 (Solicitud incorrecta) |
| /productos/{id} | GET | N/A | 200 (OK) | `{ "id": 1, "nombre": "Producto 1", "precio": 10.99}` | 404 (No encontrado) |
| /productos/{id} | PUT | `{ "nombre": "Producto Actualizado", "precio": 12.99 }` | 200 (OK) | `{ "id": 1, "nombre": "Producto Actualizado", "precio": 12.99 }` | 400 (Solicitud incorrecta), 404 (No encontrado) |
| /productos/{id} | PATCH | `{ "precio": 12.99 }` | 200 (OK) | `{ "id": 1, "nombre": "Producto Actualizado", "precio": 12.99 }` | 400 (Solicitud incorrecta), 404 (No encontrado) |
| /productos/{id} | DELETE | N/A | 204 (No Content) | N/A | 404 (No encontrado) |
