---
title: UT03 MVC y otros patrones
date: 2025-09-01    
icon: gear
---

# UT03 MVC y otros patrones
![En construcción](/images/under-construction.jpg)
<!--
## 1. Introducción

En ingeniería del software, como en cualquier otra ingeniería, existen una serie de soluciones estandarizadas que se ajustan sorprendentemente bien a una enorme variedad de situaciones diferentes.
Estas soluciones se denominan **patrones de software**, y vamos a empezar este tema hablando de ellas.

Después nos centraremos en los **patrones de arquitectura**, y sobre todo en uno en concreto denominado **MVC** (*Modelo-Vista-Controlador*), que tiene una enorme importancia en el ámbito de las aplicaciones web.

Pero, antes de meternos de lleno con el patrón MVC, tendremos que darle un par de vueltas al término **“arquitectura”**, porque, en el ámbito de las aplicaciones web, se usa con dos significados distintos que conviene que tengas claros para no hacerte un lío.

Terminaremos el tema mostrando, como siempre, un ejemplo de código bastante basado en la arquitectura MVC, de modo que puedas usarlo para comprender mejor los conceptos teóricos y como base para tus propios proyectos.

### 1.1. Problemas del “código espagueti”

Antes de hablar de patrones, conviene recordar un problema clásico en el desarrollo de software: el **código espagueti**.

Se denomina así al código que:

* No tiene una estructura clara.
* Mezcla lógica de negocio, presentación y acceso a datos en el mismo archivo.
* Es difícil de mantener y escalar.
* Genera errores cuando se modifica, porque todo está acoplado.

Un ejemplo real (extraído de proyectos web antiguos en PHP) sería algo así:

```php
<html>
<head><title>Login</title></head>
<body>
<?php
  $conexion = mysqli_connect("localhost","root","","app");
  if ($_POST["user"] && $_POST["pass"]) {
     $sql = "SELECT * FROM usuarios WHERE user='".$_POST["user"]."' 
             AND pass='".$_POST["pass"]."'";
     $res = mysqli_query($conexion,$sql);
     if (mysqli_num_rows($res)>0) {
        echo "<h1>Bienvenido ".$_POST["user"]."</h1>";
     } else {
        echo "<h1>Usuario o contraseña incorrectos</h1>";
     }
  }
?>
<form method="post">
  Usuario: <input type="text" name="user"><br>
  Contraseña: <input type="password" name="pass"><br>
  <input type="submit" value="Entrar">
</form>
</body>
</html>
```

Problemas de este enfoque:

* El **HTML y PHP están mezclados sin separación de responsabilidades**.
* La **lógica de negocio** (autenticación) está pegada a la **vista** (HTML).
* El **acceso a datos** (consulta SQL) se hace de forma insegura y sin validación.
* Es casi imposible reutilizar este código en otro contexto.

Con patrones como MVC, este ejemplo se divide en capas:

* **Modelo** → gestiona la conexión y consulta a la base de datos.
* **Vista** → presenta el formulario y los resultados.
* **Controlador** → coordina la autenticación.

## 2. Patrones de software

Antes de entrar en la parte más práctica de todo este asunto, es decir, antes de que veamos los patrones de arquitectura y los apliquemos en un ejemplo concreto de aplicación web, tienes que dejarme que te hable de los **patrones de software**.

Los patrones de software son soluciones comprobadas a problemas comunes en el *desarrollo de software*. La arquitectura MVC, de hecho, es un patrón, porque se ha probado infinidad de veces y se adapta a la perfección a multitud de problemas diferentes.

Para que un patrón pueda considerarse tal cosa, tiene que cumplir estas condiciones:

* Debe haber sido comprobado en otros sistemas.
* Debe ser fácilmente reutilizable.
* Debe ser aplicable a diferentes circunstancias.
* Debe estar bien documentado.

### 2.1. Tipos de patrones

Dependiendo del grado de abstracción del patrón, existen patrones de diverso tipo:

 1. De arquitectura
 2. De diseño
 3. De creación de objetos
 4. De estructura de clases
 5. De comportamiento
 6. De dialectos
 7. De interacción o interfaz de usuario
 8. De análisis
 9. De dominio

### 2.2. Ejemplo de patrón: el patrón Singleton

Antes de centrarnos en el patrón MVC, vamos a ver, solo a modo de ejemplo, otro tipo de patrón: el **patrón Singleton**, que está considerado un patrón de diseño.

Algunos recursos en una aplicación son de tal naturaleza que **sólo puede existir una instancia** de ese tipo de recurso.
Por ejemplo:

* La conexión a la base de datos.
* El gestor de configuración global de una aplicación.

El patrón Singleton cubre esta necesidad. Un objeto es “singleton” si la aplicación puede generar una y solo una instancia del mismo.

Esta es una implementación sencilla y reutilizable de ese patrón. Utiliza un constructor privado para evitar que se creen varias instancias del objeto y un método static para obtener la única instancia permitida.

::: note 
Ojo, que solo se trata de un ejemplo. De hecho, ni siquiera está completo. No te lo tomes como algo que tengas que aprenderte de memoria o algo así. Lo interesante de este ejemplo es que veas que existen muchos patrones que pueden (y, de hecho, deben) reutilizarse una y otra vez en el diseño de aplicaciones.
:::

```java
public class ConexionBD {
    private static ConexionBD instancia;
    private Connection conexion;

    // Constructor privado para evitar instanciación externa
    private ConexionBD() {
        try {
            Class.forName("org.postgresql.Driver");
            conexion = DriverManager.getConnection(
                "jdbc:postgresql://localhost:5432/miapp",
                "usuario",
                "password"
            );
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    // Método estático para obtener la instancia única
    public static synchronized ConexionBD getInstance() {
        if (instancia == null) {
            instancia = new ConexionBD();
        }
        return instancia;
    }

    public Connection getConexion() {
        return conexion;
    }
}
```

Uso en un **Servlet o EJB**:

```java
Connection con = ConexionBD.getInstance().getConexion();
```

#### 2.2.2. Ejemplo en Django (Python)

En Django, la gestión de la conexión a base de datos ya está implementada con un patrón similar al Singleton, pero podemos ilustrar el patrón con un servicio propio, por ejemplo un **gestor de configuración**:

```python
class ConfiguracionSingleton:
    __instancia = None

    def __new__(cls, *args, **kwargs):
        if cls.__instancia is None:
            cls.__instancia = super().__new__(cls)
            cls.__instancia.parametros = {}
        return cls.__instancia

    def set_parametro(self, clave, valor):
        self.parametros[clave] = valor

    def get_parametro(self, clave):
        return self.parametros.get(clave, None)

# Uso en cualquier parte del proyecto Django
conf1 = ConfiguracionSingleton()
conf1.set_parametro("modo_debug", True)

conf2 = ConfiguracionSingleton()
print(conf2.get_parametro("modo_debug"))  # Devuelve True
```

Como puede verse, tanto `conf1` como `conf2` apuntan en realidad a la **misma instancia**, lo que garantiza la unicidad.

## 3. Arquitectura de una aplicación web

Ahora que tenemos claro qué es un patrón de software, vamos a centrarnos en los patrones de arquitectura.

Pero existe un problema cuando hablamos de “arquitectura de una aplicación” en el ámbito de las aplicaciones web.

El problema es este: usamos el término “arquitectura de una aplicación” para referirnos a dos cosas distintas: la arquitectura física y la arquitectura lógica.

Vamos a intentar explicar la diferencia.

### 3.1. Arquitecturas FÍSICAS multicapa (multitier)

Una arquitectura física de varios niveles (multinivel o multitier, en inglés) consiste en un conjunto de ordenadores conectados a una red que ejecutan de forma conjunta una aplicación.

El ejemplo más sencillo es la arquitectura cliente-servidor, la más popular en aplicaciones web sencillas: una máquina cliente y una máquina servidor ejecutan alternativamente fragmentos del código, proporcionando al usuario final la sensación de una aplicación unificada.

![Arquitectura en 2 niveles](/images/dwes/03-arquitectura-2-niveles.png)

Por supuesto, nada impide que tengamos más de dos máquinas colaborando en red para ejecutar una aplicación web. Podemos tener, por ejemplo, un cliente, un servidor web y un servidor de bases de datos (estos dos últimos en dos máquinas físicas diferentes). Esto sería una arquitectura de 3 niveles físicos.

Esta arquitectura se puede generalizar. Una con N niveles físicos tendría este aspecto:

![Arquitectura en N niveles](/images/dwes/03-arquitectura-N-niveles.png)

La arquitectura física es algo que incumbe sobre todo a los administradores de sistemas, que son los encargados de montarla, configurarla y mantenerla. Para el programador, sin embargo, suele resultar transparente.

Por ejemplo, cuando nos conectamos a un servidor de bases de datos desde nuestra aplicación, poco importa que ese servidor esté en la misma máquina física o en otra máquina diferente: la forma de conectarse y operar con la base de datos es exactamente la misma.

Así que la arquitectura física, siendo importante, no lo es demasiado para nosotros y nosotras como desarrolladores.

En cambio, la arquitectura lógica es otra historia…

### 3.2. Arquitecturas LÓGICAS multicapa (multilayer)

Ahora viene la vuelta de tuerca: la arquitectura de una aplicación también puede referirse a sus capas (layers en inglés) lógicas. Es decir, a las capas de software que nosotros, los desarrolladores/as, creamos.

**Dividir una aplicación en capas que colaboran entre sí por medio de interfaces bien definidos** no es una idea nueva, ni pertenece exclusivamente al ámbito de la programación web. Pero la mayor parte de las aplicaciones web hacen uso de este mecanismo de abstracción.

La idea es fragmentar nuestra aplicación en capas de niveles de abstracción cada vez mayor. En un extremo, la **capa más abstracta** es la que interacciona con el **usuario**: ahí se implementará nuestro interfaz de usuario, o lo que en aplicaciones web se llama front-end.

En el otro extremo, la **capa menos abstracta** es la que está en contacto con el **hardware** de la máquina. Bueno, en el caso de una aplicación web, no hay contacto directo con el harware, sino con otras capas aún menos abstractas que están fuera de nuestra aplicación, como el sistema operativo, el servidor web o el gestor de bases de datos. Esas capas externas a nuestra aplicación son las que, realmente, interaccionan con el hardware en última instancia.

Esta división en capas de abstracción, que puede parecer una complicación innecesaria, tiene un montón de ventajas y por eso se usa en cualquier aplicación un poco más complicada que “Hola, mundo”.

### 3.3. Ventajas de las arquitecturas multicapa

Las arquitecturas multicapa permiten varias cosas que no pueden hacerse con los códigos monolíticos. Entre otras:

* Desarrollar en paralelo cada capa (mayor rapidez de desarrollo).
* Aplicaciones más robustas gracias al encapsulamiento. ¿Te suena? ¡Programación orientada a objetos! Cada capa se implementa en una clase, y cada clase hace su trabajo sin importunar a las demás y sin preocuparse por cómo funcionan las otras internamente.
* El matenimiento es más sencillo.
* Más flexibilidad para añadir módulos.
* Más seguridad, al poder aislar (relativamente) cada capa del resto.
* Mejor escalabilidad: es más fácil hacer crecer al sistema.
* Mejor rendimiento (aunque esto podría discutirse: puedes hacer un sistema multicapa con un rendimiento desastroso y un sistema monolítico que vaya como un tiro. Pero, en general, es más fácil mejorar el rendimiento trabajando en cada capa por separado).
* Es más fácil hacer el control de calidad, incluyendo la fase de pruebas.

El único inconveniente reseñable de las arquitecturas multicapa es que pueden hacer que una aplicación muy simple se vuelva artificialmente más compleja de lo necesario. Pero eso solo sucede en aplicaciones muy, pero que muy simples. Para cualquier aplicación convencional, la arquitectura multicapa simplifica el diseño en lugar de complicarlo.

En resumen: todo son ventajas. Ya ves por qué todo el mundo hace aplicaciones web con arquitecturas multicapa.

### 3.4. La arquitectura Modelo-Vista-Controlador (MVC)

Y por fin llegamos a la palabreja: la arquitectura Modelo-Vista-Controlador o MVC.

Cuando hablamos de **arquitectura de una aplicación** nos referimos a la estructura básica que la sustenta, como los pilares de un edificio en construcción. Si quitas las paredes, las ventanas, las puertas, los azulejos de la cocina… todavía pueden distinguirse las formas fundamentales, ¿verdad?

Pues bien, el *patrón de arquitectura* más popular en aplicaciones web se llama **MVC o Modelo-Vista-Controlador** y muy pronto se va a convertir para ti en un viejo amigo.

#### 3.4.1. ¿Qué es el MVC?

El MVC es tan solo una **arquitectura multicapa estandarizada**. Una arquitectura de **3 capas**, para ser exactos.

Este es el esquema de una arquitectura en 3 capas. Recuerda lo que hemos visto antes: cada capa ejecuta una parte de la solución, y entre ellas colaboran para formar la aplicación completa. La capa superior interactúa con el usuario; la capa inferior, con la máquina (donde dice “hardware”, debería decir “cualquier cosa menos abstracta que nuestro programa”). Tienes permiso para imaginar cada capa como una clase con sus métodos y atributos.

![Arquitectura en 3 capas](/images/dwes/03-arquitectura-3-capas.png)

Pues bien, si a esas tres capas les ponemos nombres exóticos como modelo, vista y controlador, y tuneamos un poco el esquema, ya lo tenemos: la arquitectura MVC.

![Arquitectura MVC](/images/dwes/03-arquitectura-mvc.png)

Es decir, **la arquitectura MVC solo es un caso particular de la arquitectura en 3 capas.**

¿Y ya está? Bueno, no. Ahora tienes que aprender qué significa en realidad esta palabrería.

Porque todo esto está muy bien como construcción teórica, pero ¿cómo te afecta a ti a la hora de programar? ¿Qué clases tienes que crear? ¿Qué parte del código hay que poner en cada clase?

En la práctica, es más simple de lo que parece. Lo vas a ver enseguida. Y lo maravilloso es que el 99,99% de las aplicaciones web encajan como un guante en esta arquitectura. Es decir, apenas tendremos que hacer trabajo de diseño previo, porque, si es una aplicación web, ya sabemos qué clases tendremos que construir: los que nos indique la arquitectura MVC.

Antes de pasar a la parte práctica de todo esto, permíteme un breve apunte: por supuesto, nada impide construir arquitecturas con más de 3 capas. De hecho, nosotros vamos a usar una variante del MVC en el que se añade una capa adicional por debajo del modelo, es decir, una arquitectura con 4 capas. Pero ya llegaremos a eso.

#### 3.4.2. MVC en la práctica: una implementación incremental

Tras esta introducción al MVC, vamos a estudiar a fondo este patrón. Y lo vamos a hacer por medio de un ejemplo, que es como mejor suelen comprenderse estas cosas. Una vez terminado y comprendido el ejemplo, daremos una definición más teórica.

Es decir, que lo vamos hacer al revés de lo habitual: primero la práctica y luego la teoría. Según mi experiencia, la gente suele comprenderlo mejor en ese orden.

Pero, para que esto funcione, tienes que leer el código fuente con atención. Es un código sencillo y bien comentado, y que se va complicando muy poco a poco, en pasos incrementales, desde un código clásico monolítico hasta una implementación completa de un MVC.

Si lo lees con la atención que te pido, verás como, al acabar, entenderás perfectamente en qué consiste el MVC y podrás empezar a aplicarlo en tus proyectos.

El ejemplo con el que vamos a trabajar es este: supongamos que queremos programar una pequeña aplicación web que nos permita hacer publicaciones en una especie de blog simplificado. Esas publicaciones se guardan como registros en una tabla de una base de datos.

En el código de ejemplo sobre el que vamos a trabajar, nos vamos a centrar en una funcionalidad concreta de este mini-blog: el listado de los artículos existentes en la base de datos.

##### a. Código monolítico

Una primera aproximación a la solución, sin usar ningún patrón de arquitectura en absoluto, podría ser esta (échale un vistazo y asegúrate de entenderlo):

```java
@WebServlet("/articulos")
public class ArticulosServlet extends HttpServlet {
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("text/html;charset=UTF-8");
        try (PrintWriter out = response.getWriter();
             Connection con = DriverManager.getConnection(
                "jdbc:postgresql://localhost:5432/miapp", "usuario", "clave");
             Statement st = con.createStatement();
             ResultSet rs = st.executeQuery("SELECT fecha, titulo FROM articulo")) {

            out.println("<h1>Listado de Artículos</h1>");
            out.println("<table><tr><th>Fecha</th><th>Título</th></tr>");
            while (rs.next()) {
                out.println("<tr><td>" + rs.getDate("fecha") + "</td><td>" + rs.getString("titulo") + "</td></tr>");
            }
            out.println("</table>");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
```

Esta solución se denomina monolítica, porque incluye todo el código necesario en el mismo bloque.

Por supuesto, para un ejemplo tan simple como este, el código monolítico es más que suficiente, pero en un sistema más complejo pronto empieza a convertirse en un monstruo inmanejable.

##### b. Primera mejora: controlador + vista

Vamos a aproximarnos un poco a la solución MVC separando ese código monolítico en dos bloques (que guardaremos en archivos distintos):

* Un controlador (archivo ArticulosServlet.java).
* Una vista (archivo showAllArticles.jsp).

Primero, el controlador. Se encargará de recuperar los datos, pero no de mostrarlos. Generar el interfaz de usuario, es decir, el HTML, será la labor que le dejaremos a la vista. El controlador preparará esos datos y los empaquetará en un array para que estén disponibles en la vista mediante su inclusion en el jsp usando `request.setAttribute`.

```java
@WebServlet("/articulos")
public class ArticulosServlet extends HttpServlet {
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        List<String[]> articulos = new ArrayList<>();
        try (Connection con = DriverManager.getConnection(
                "jdbc:postgresql://localhost:5432/miapp", "usuario", "clave");
             Statement st = con.createStatement();
             ResultSet rs = st.executeQuery("SELECT fecha, titulo FROM articulo")) {

            while (rs.next()) {
                articulos.add(new String[]{rs.getString("fecha"), rs.getString("titulo")});
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        request.setAttribute("articulos", articulos);
        request.getRequestDispatcher("showAllArticles.jsp").forward(request, response);
    }
}

```

La vista que mostrará los datos del array contiene un código muy semejante al de la solución monolítica, solo que ahora estará ubicada en un archivo aparte (showAllArticles.jsp) y hará un bucle sobre el array de resultados que le ha preparado el controlador:

```html
<h1>Listado de Artículos</h1>
<table>
    <tr><th>Fecha</th><th>Título</th></tr>
    <c:forEach var="art" items="${articulos}">
        <tr>
            <td>${art[0]}</td>
            <td>${art[1]}</td>
        </tr>
    </c:forEach>
</table>
```

##### c. Segunda mejora: modelo, vista y controlador

En esta segunda mejora, dividiremos el código en tres bloques (ubicados, de nuevo, en archivos diferentes):

* Un modelo para los artículos (archivo ArticuloDAO.java). Contendrá una clase con un método que se encargará de acceder a la base de datos y empaquetar el resultado de la consulta en un array de objetos de nuestra entidad (archivo Articulo.java).

```java
public class Articulo {
    private Date fecha;
    private String titulo;

    public Articulo(Date fecha, String titulo) {
        this.fecha = fecha;
        this.titulo = titulo;
    }
    public Date getFecha() { return fecha; }
    public String getTitulo() { return titulo; }
}
```

* Una vista (archivo showAllArticles.jsp). Se encargará de generar el HTML con el resultado de la consulta.
* Un controlador (archivo ArticulosServlet.java). Se encargará de invocar al modelo y a la vista en el orden correcto.

Por lo tanto, el controlador (ArticulosServlet.java), al extraer de él todo lo que tenga que ver con la base de datos, se queda en algo tan sencillo como esto:

```java
@WebServlet("/articulos")
public class ArticulosServlet extends HttpServlet {
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        ArticuloDAO dao = new ArticuloDAO();
        request.setAttribute("articulos", dao.getAll());
        request.getRequestDispatcher("showAllArticles.jsp").forward(request, response);
    }
}
```

El modelo (articles.php) consta de una clase con solo un método (de momento) encargado de consultar todos los artículos y devolverlos empaquetados en un array:

```java
public class ArticuloDAO {
    public List<Articulo> getAll() {
        List<Articulo> lista = new ArrayList<>();
        try (Connection con = DriverManager.getConnection(
                "jdbc:postgresql://localhost:5432/miapp", "usuario", "clave");
             Statement st = con.createStatement();
             ResultSet rs = st.executeQuery("SELECT fecha, titulo FROM articulo")) {

            while (rs.next()) {
                lista.add(new Articulo(rs.getDate("fecha"), rs.getString("titulo")));
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return lista;
    }
}

```

Por último, la vista (showAllArticles.jsp) será exactamente igual que en la versión anterior: un recorrido por el array de artículos para mostrarlos en formato HTML:

```html
<h1>Listado de Artículos</h1>
<table>
    <tr><th>Fecha</th><th>Título</th></tr>
    <c:forEach var="art" items="${articulos}">
        <tr>
            <td>${art[0]}</td>
            <td>${art[1]}</td>
        </tr>
    </c:forEach>
</table>
```

##### d. Tercera mejora: añadiendo capa de abstracción de datos

Como no sabemos lo que es el miedo, vamos a complicar nuestro patrón modelo-vista-controlador con una **cuarta capa**: **la capa de abstracción de datos.**

La idea de esta capa adicional es proporcionar un mecanismo de abstracción respecto del gestor de base de datos concreto que estemos utilizando.

Vaya frasecita, ¿eh? *“Un mecanismo de abstracción respecto del gestor de base de datos”*. Si no has bizqueado un poco al leerlo, es que tienes los nervios de acero. ¿Qué narices significa eso?

Es solo una de esas expresiones que los informáticos usamos para fardar, como cuando un médico te dice que estás acatarrado, pero te lo dice en latín para que parezca más complicado de lo que es.

Te explico qué es eso del *“mecanismo de abstracción bla, bla, bla”*.

Si te fijas en el modelo de la solución anterior, verás que estamos usando directamente **JDBC** con `Connection`, `Statement` y `ResultSet`. El problema es que esas clases y métodos dependen del gestor de base de datos concreto (PostgreSQL, MySQL, etc.). Si algún día quisiéramos cambiar el gestor de base de datos, tendríamos que revisar todos nuestros modelos y modificar miles de líneas de código.

Una forma de independizar nuestra aplicación del gestor de base de datos que haya debajo es programar lo que se llama **capa de abstracción**, que contenga unos pocos métodos genéricos (como `dataQuery()` para lanzar `SELECT` o `dataManipulation()` para lanzar `INSERT`, `UPDATE` o `DELETE`).

De ese modo, cuando queramos hacer una consulta desde el modelo, no lo haremos con las clases de JDBC directamente, sino con nuestros métodos. Si algún día necesitamos cambiar de SGBD, solo tendríamos que reescribir esta capa (unas decenas de líneas), en lugar de todo el proyecto.

Por lo tanto, en esta tercera mejora vamos a dividir el código en cuatro bloques:

* Un **controlador** (un `Servlet` que hace de Front Controller).
* Una **vista** (un JSP).
* Un **modelo en dos capas**:

  * Capa de abstracción de datos (`Db.java`).
  * Capa de acceso a datos (el modelo de artículos propiamente dicho, `ArticlesDAO.java`).

**Código de la capa de abstracción (Db.java):**

```java
package app.model.db;

import java.sql.*;
import java.util.*;

public class Db {
    private Connection conn;

    /** Abre la conexión con la base de datos */
    public int createConnection(String server, String username, String pass, String dbname) {
        try {
            Class.forName("org.postgresql.Driver"); // o el driver que uses
            String url = "jdbc:postgresql://" + server + "/" + dbname;
            conn = DriverManager.getConnection(url, username, pass);
            return 0;
        } catch (Exception e) {
            e.printStackTrace();
            return -1;
        }
    }

    /** Cierra la conexión con la base de datos */
    public void closeConnection() {
        try {
            if (conn != null && !conn.isClosed()) conn.close();
        } catch (SQLException ignored) {}
    }

    /** Lanza una consulta (SELECT) contra la base de datos */
    public List<Map<String, Object>> dataQuery(String sql) {
        List<Map<String, Object>> result = new ArrayList<>();
        try (Statement st = conn.createStatement();
             ResultSet rs = st.executeQuery(sql)) {
            ResultSetMetaData md = rs.getMetaData();
            int cols = md.getColumnCount();
            while (rs.next()) {
                Map<String, Object> row = new HashMap<>();
                for (int i = 1; i <= cols; i++) {
                    row.put(md.getColumnLabel(i), rs.getObject(i));
                }
                result.add(row);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return result;
    }

    /** Lanza una sentencia de manipulación de datos (INSERT, UPDATE, DELETE) */
    public int dataManipulation(String sql) {
        try (Statement st = conn.createStatement()) {
            return st.executeUpdate(sql);
        } catch (SQLException e) {
            e.printStackTrace();
            return 0;
        }
    }
}
```

**Código del modelo (ArticlesDAO.java):**

```java
package app.model;

import app.model.db.Db;
import java.util.*;

public class ArticlesDAO {

    public List<Map<String, Object>> getAll() {
        Db db = new Db();  // Creamos un objeto para usar nuestra capa de abstracción
        try {
            db.createConnection("localhost", "usuario", "clave", "miapp");
            return db.dataQuery("SELECT fecha, titulo FROM articulo");
        } finally {
            db.closeConnection();
        }
    }
}
```

El **controlador** (`ArticulosServlet.java`) y la **vista** (`showAllArticles.jsp`) son exactamente los mismos que en la mejora anterior, así que no los repetimos.

Y esto es lógico: solo hemos modificado la forma en la que trabaja el modelo, pero gracias al **encapsulamiento**, el resto de la aplicación ni se entera de los cambios.

##### e. Cuarta mejora: transformación en clases y objetos reutilizables

Ahora vamos a dejar el código bien organizado y a mostrarlo (casi) completo.

Lo que haremos es empaquetarlo todo en **clases reutilizables**. Observa que sigue siendo el mismo código fuente, solo que empaquetado en clases y métodos. Lo único que queda fuera de una clase es la inicialización del **Front Controller** (un `Servlet` central que distribuye las peticiones).

Fíjate bien en cómo hemos convertido las vistas en una clase auxiliar (`ViewHelper`) con un método `show()` que nos servirá para mostrar cualquier vista y reutilizar el mismo `header` y `footer`. Cada vista se programará en un archivo JSP independiente que deberemos organizar en directorios y subdirectorios. De momento, nuestra aplicación solo tiene una vista llamada `showAllArticles`, pero se podrían visualizar todas las necesarias usando el método `show()`.

Otra cosa que quiero que observes con mucha atención es el **punto de entrada a la aplicación** (`FrontControllerServlet.java`), porque lo hemos dejado preparado para poder añadir nuevas funciones al programa con posterioridad, así como varios controladores. El método que se ejecutará dependerá no solo de la variable `action` que se pasa por GET, sino también de otra variable llamada `controller`, que también se pasa por GET, y que contendrá el nombre de la clase del controlador.

Así, para invocar, por ejemplo, el método `showAll()` del `ArticlesController`, la ruta debería ser esta:

```
http://mi-servidor/index?controller=ArticlesController&action=showAll
```

Este `FrontControllerServlet` es tan genérico que te servirá para montar cualquier aplicación MVC en el futuro.


**Punto de entrada a la aplicación (FrontControllerServlet.java):**

```java
package app.web;

import jakarta.servlet.*;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.*;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@WebServlet("/index")
public class FrontControllerServlet extends HttpServlet {

  private final Map<String, Controller> registry = new HashMap<>();

  @Override
  public void init() {
    registry.put("ArticlesController", new ArticlesController());
    // Añade aquí más controladores si los necesitas
  }

  @Override
  protected void doGet(HttpServletRequest req, HttpServletResponse resp)
      throws ServletException, IOException {
    String action = req.getParameter("action") == null ? "main" : req.getParameter("action");
    String controllerName = req.getParameter("controller") == null ? "ArticlesController" : req.getParameter("controller");

    Controller controller = registry.get(controllerName);
    if (controller == null) {
      resp.sendError(HttpServletResponse.SC_NOT_FOUND, "Controlador no encontrado");
      return;
    }
    controller.execute(action, req, resp);
  }
}

// Interface común para controladores
interface Controller {
  void execute(String action, HttpServletRequest req, HttpServletResponse resp)
      throws ServletException, IOException;
}
```


**Controlador de artículos (ArticlesController.java):**

```java
package app.web;

import app.model.ArticlesDAO;
import app.util.ViewHelper;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.*;
import java.io.IOException;
import java.util.Map;
import java.util.HashMap;

public class ArticlesController implements Controller {

  private final ArticlesDAO dao = new ArticlesDAO();

  @Override
  public void execute(String action, HttpServletRequest req, HttpServletResponse resp)
      throws ServletException, IOException {
    switch (action) {
      case "showAll":
        showAll(req, resp);
        break;
      case "main":
      default:
        showAll(req, resp);
    }
  }

  private void showAll(HttpServletRequest req, HttpServletResponse resp)
      throws ServletException, IOException {
    var articles = dao.getAll();
    Map<String, Object> data = new HashMap<>();
    data.put("articles", articles);
    req.setAttribute("data", data);
    req.setAttribute("articles", articles); // acceso directo, como en el ejemplo
    ViewHelper.show("showAllArticles", req, resp);
  }
}
```


**Clase vista (ViewHelper.java):**

```java
package app.util;

import jakarta.servlet.*;
import jakarta.servlet.http.*;
import java.io.IOException;

public class ViewHelper {
  public static void show(String viewName, HttpServletRequest req, HttpServletResponse resp)
      throws ServletException, IOException {
    RequestDispatcher header = req.getRequestDispatcher("/WEB-INF/views/partials/header.jsp");
    header.include(req, resp);

    RequestDispatcher body = req.getRequestDispatcher("/WEB-INF/views/" + viewName + ".jsp");
    body.include(req, resp);

    RequestDispatcher footer = req.getRequestDispatcher("/WEB-INF/views/partials/footer.jsp");
    footer.include(req, resp);
  }
}
```

**Vista showAllArticles (showAllArticles.jsp):**

```jsp
<%@ page contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<h1>Listado de Artículos</h1>
<table>
  <tr><th>Fecha</th><th>Título</th></tr>
  <c:forEach var="article" items="${articles}">
    <tr>
      <td><c:out value="${article.fecha}"/></td>
      <td><c:out value="${article.titulo}"/></td>
    </tr>
  </c:forEach>
</table>
```


**Modelo - Capa de acceso a datos (ArticlesDAO.java):**

```java
package app.model;

import app.model.db.Db;
import java.util.*;

public class ArticlesDAO {

  public List<Map<String, Object>> getAll() {
    Db db = new Db();
    try {
      db.createConnection("localhost", "usuario", "clave", "miapp");
      String sql = "SELECT fecha, titulo FROM articulo";
      return db.dataQuery(sql);
    } finally {
      db.closeConnection();
    }
  }
}
```


**Modelo - Capa de abstracción de datos (Db.java):**

```java
package app.model.db;

import java.sql.*;
import java.util.*;

public class Db {

  private Connection conn;

  public int createConnection(String server, String username, String pass, String dbname) {
    try {
      Class.forName("org.postgresql.Driver"); // o el driver correspondiente
      String url = "jdbc:postgresql://" + server + "/" + dbname;
      conn = DriverManager.getConnection(url, username, pass);
      return 0;
    } catch (Exception e) {
      e.printStackTrace();
      return -1;
    }
  }

  public void closeConnection() {
    try {
      if (conn != null && !conn.isClosed()) conn.close();
    } catch (SQLException ignored) {}
  }

  /** SELECT genérico */
  public List<Map<String, Object>> dataQuery(String sql) {
    List<Map<String, Object>> rows = new ArrayList<>();
    try (Statement st = conn.createStatement();
         ResultSet rs = st.executeQuery(sql)) {
      ResultSetMetaData md = rs.getMetaData();
      int cols = md.getColumnCount();
      while (rs.next()) {
        Map<String, Object> row = new HashMap<>();
        for (int i = 1; i <= cols; i++) {
          row.put(md.getColumnLabel(i), rs.getObject(i));
        }
        rows.add(row);
      }
    } catch (SQLException e) {
      e.printStackTrace();
    }
    return rows;
  }

  /** INSERT/UPDATE/DELETE genérico */
  public int dataManipulation(String sql) {
    try (Statement st = conn.createStatement()) {
      return st.executeUpdate(sql);
    } catch (SQLException e) {
      e.printStackTrace();
      return 0;
    }
  }
}
```

##### f. Quinta (y última) mejora: añadiendo un modelo genérico (con `.env` para la conexión)

En todos los modelos nos solemos encontrar una serie de operaciones que se repiten una y otra vez (obtener todos, obtener por id, borrar, insertar y modificar). Podemos programar un **modelo genérico** para no repetir código: los modelos concretos heredarán de él y tendrán estas operaciones listas.

###### ¿Por qué incorporamos un `.env`?

Porque **no debemos publicar credenciales en el código** ni “quemarlas” en el repositorio. Usar un `.env` nos da:

* **Seguridad**: las credenciales no viajan en el repo.
* **Portabilidad**: puedes tener `.env` distintos para *desarrollo*, *preproducción* y *producción*.
* **Mantenibilidad**: cambiar credenciales o el host no obliga a recompilar ni tocar código.
* **Buenas prácticas** (estilo 12-factor): configuración fuera del binario.

> Nota profesional: en entornos Jakarta EE empresariales es habitual usar **JNDI DataSource** del servidor de aplicaciones o un **secrets manager**. Aquí usamos `.env` por simplicidad didáctica y porque funciona igual de bien en despliegues ligeros (Tomcat/Jetty/Payara Micro, contenedores, etc.).

###### 1) Archivo `.env` y `.gitignore`

**`.env` (en la raíz del proyecto, fuera del war):**

```
DB_HOST=localhost
DB_NAME=miapp
DB_USER=usuario
DB_PASS=clave
```

**`.gitignore`:**

```
.env
```

###### 2) Cargador de variables de entorno

**EnvConfig.java**

```java
package app.util;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.Properties;

public class EnvConfig {
    private static final Properties props = new Properties();
    static {
        try (FileInputStream fis = new FileInputStream(".env")) {
            props.load(fis);
        } catch (IOException e) {
            throw new RuntimeException("No se pudo cargar el archivo .env", e);
        }
    }
    public static String get(String key) {
        return props.getProperty(key);
    }
}
```

###### 3) Capa de abstracción de datos usando `.env`

**Db.java** (igual concepto que en la mejora 3, pero lo recordamos aquí para cerrar el ciclo)

```java
package app.model.db;

import app.util.EnvConfig;
import java.sql.*;
import java.util.*;

public class Db {
    private Connection conn;

    /** Conecta leyendo credenciales desde .env */
    public int createConnection() {
        try {
            Class.forName("org.postgresql.Driver"); // ajusta el driver si usas MySQL/MariaDB
            String url = "jdbc:postgresql://" + EnvConfig.get("DB_HOST") + "/" + EnvConfig.get("DB_NAME");
            conn = DriverManager.getConnection(url, EnvConfig.get("DB_USER"), EnvConfig.get("DB_PASS"));
            return 0;
        } catch (Exception e) {
            e.printStackTrace();
            return -1;
        }
    }

    public void closeConnection() {
        try { if (conn != null && !conn.isClosed()) conn.close(); } catch (SQLException ignored) {}
    }

    /** SELECT genérico → lista de mapas columna→valor */
    public List<Map<String, Object>> dataQuery(String sql) {
        List<Map<String, Object>> rows = new ArrayList<>();
        try (Statement st = conn.createStatement();
             ResultSet rs = st.executeQuery(sql)) {
            ResultSetMetaData md = rs.getMetaData();
            int cols = md.getColumnCount();
            while (rs.next()) {
                Map<String, Object> row = new HashMap<>();
                for (int i = 1; i <= cols; i++) {
                    row.put(md.getColumnLabel(i), rs.getObject(i));
                }
                rows.add(row);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return rows;
    }

    /** INSERT/UPDATE/DELETE genérico */
    public int dataManipulation(String sql) {
        try (Statement st = conn.createStatement()) {
            return st.executeUpdate(sql);
        } catch (SQLException e) {
            e.printStackTrace();
            return 0;
        }
    }
}
```

###### 4) Modelo genérico

Para evitar conexiones colgadas, abrimos y cerramos conexión **dentro de cada método** (cambio menor respecto a la versión previa, que conectaba en el constructor).

**Model.java**

```java
package app.model;

import app.model.db.Db;
import java.util.*;

public class Model {
    protected String table;  // nombre de la tabla

    public Model(String tableName) {
        this.table = tableName;
    }

    public List<Map<String, Object>> getAll() {
        Db db = new Db();
        try {
            db.createConnection();
            return db.dataQuery("SELECT * FROM " + table);
        } finally {
            db.closeConnection();
        }
    }

    public List<Map<String, Object>> get(int id) {
        Db db = new Db();
        try {
            db.createConnection();
            return db.dataQuery("SELECT * FROM " + table + " WHERE id = " + id);
        } finally {
            db.closeConnection();
        }
    }

    public int delete(int id) {
        Db db = new Db();
        try {
            db.createConnection();
            return db.dataManipulation("DELETE FROM " + table + " WHERE id = " + id);
        } finally {
            db.closeConnection();
        }
    }

    // Inserción sencilla (demo). En producción: usar PreparedStatement.
    public int insert(Map<String, Object> values) {
        StringBuilder cols = new StringBuilder();
        StringBuilder vals = new StringBuilder();
        values.forEach((k, v) -> {
            cols.append(k).append(",");
            vals.append("'").append(v).append("',");
        });
        cols.setLength(cols.length() - 1);
        vals.setLength(vals.length() - 1);

        String sql = "INSERT INTO " + table + " (" + cols + ") VALUES (" + vals + ")";
        Db db = new Db();
        try {
            db.createConnection();
            return db.dataManipulation(sql);
        } finally {
            db.closeConnection();
        }
    }

    // Actualización sencilla (demo). En producción: usar PreparedStatement.
    public int update(int id, Map<String, Object> values) {
        StringBuilder set = new StringBuilder();
        values.forEach((k, v) -> set.append(k).append("='").append(v).append("',"));
        set.setLength(set.length() - 1);

        String sql = "UPDATE " + table + " SET " + set + " WHERE id = " + id;
        Db db = new Db();
        try {
            db.createConnection();
            return db.dataManipulation(sql);
        } finally {
            db.closeConnection();
        }
    }
}
```

> ⚠️ **Importante (seguridad)**: las versiones de `insert()` y `update()` aquí son **didácticas** y construyen SQL como *strings*. En proyectos reales usa **`PreparedStatement`** para evitar **inyección SQL** y problemas de tipos.

###### 5) Modelo específico de ejemplo

**Articles.java**

```java
package app.model;

public class Articles extends Model {
    public Articles() {
        super("articulo"); // nombre de la tabla
    }
}
```

###### 6) Uso rápido desde el controlador (opcional)

```java
Articles articles = new Articles();
var todos = articles.getAll();
var uno = articles.get(1);
articles.delete(2);

Map<String, Object> nuevo = new HashMap<>();
nuevo.put("titulo", "Nuevo post");
nuevo.put("fecha", java.sql.Date.valueOf("2025-09-23"));
articles.insert(nuevo);

Map<String, Object> cambios = new HashMap<>();
cambios.put("titulo", "Título actualizado");
articles.update(1, cambios);
```
 -->
## [Créditos y reconocimientos](/docencia/dam-daw/DWES/98-creditos-reconocimientos.md)