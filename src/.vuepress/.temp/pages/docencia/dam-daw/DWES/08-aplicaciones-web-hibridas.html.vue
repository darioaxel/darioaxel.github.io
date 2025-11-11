<template><div><h1 id="ut08-aplicaciones-web-hibridas-nuxt" tabindex="-1"><a class="header-anchor" href="#ut08-aplicaciones-web-hibridas-nuxt"><span>UT08 Aplicaciones web híbridas: NUXT</span></a></h1>
<blockquote>
<p><strong>En este tema trabajaremos los siguientes RAs:</strong><br>
RA9. Desarrolla aplicaciones Web híbridas seleccionando y utilizando tecnologías, frameworks servidor y repositorios heterogéneos de información.</p>
</blockquote>
<h2 id="_1-introduccion-¿que-es-una-aplicacion-web-hibrida" tabindex="-1"><a class="header-anchor" href="#_1-introduccion-¿que-es-una-aplicacion-web-hibrida"><span>1. Introducción: ¿Qué es una aplicación web híbrida?</span></a></h2>
<p>Una <strong>aplicación web híbrida</strong> es aquella que combina características de las <strong>aplicaciones web tradicionales</strong> (que se ejecutan principalmente en el navegador y se desarrollan con tecnologías como HTML, CSS y JavaScript) con características de las <strong>aplicaciones nativas</strong> (que pueden instalarse y ejecutarse directamente en dispositivos móviles o aprovechar funcionalidades del servidor).</p>
<p>En el contexto del <strong>desarrollo web en entorno servidor</strong>, una aplicación híbrida:</p>
<ul>
<li>Se ejecuta parcialmente en el <strong>servidor</strong>, donde se procesan datos, se gestionan repositorios y se generan vistas dinámicas.</li>
<li>Y parcialmente en el <strong>cliente</strong>, donde se aprovechan frameworks modernos (como <strong>Nuxt 4</strong>, <strong>Next.js</strong> o <strong>SvelteKit</strong>) que permiten ejecutar código tanto en el servidor (SSR) como en el cliente (SPA).</li>
</ul>
<p>Estas aplicaciones <strong>recuperan y procesan información desde múltiples orígenes</strong> (APIs REST, bases de datos, servicios externos, etc.) y utilizan <strong>librerías de terceros</strong> para integrar funcionalidades específicas (autenticación, análisis de datos, inteligencia de negocio, mapas, etc.).</p>
<p>En resumen, son híbridas porque:</p>
<ul>
<li>Combinan <strong>tecnologías de servidor y cliente</strong>.</li>
<li>Integran <strong>fuentes de datos heterogéneas</strong>.</li>
<li>Aprovechan <strong>código reutilizable</strong> proveniente de librerías y repositorios externos.</li>
<li>Permiten <strong>desplegar la misma base de código</strong> en diferentes entornos (web, móvil, escritorio).</li>
</ul>
<h3 id="_1-2-ventajas-de-las-aplicaciones-hibridas" tabindex="-1"><a class="header-anchor" href="#_1-2-ventajas-de-las-aplicaciones-hibridas"><span>1.2. Ventajas de las aplicaciones híbridas</span></a></h3>
<p>El desarrollo híbrido promueve la <strong>reutilización del código</strong> y el <strong>aprovechamiento de información ya existente</strong>, lo que conlleva ventajas clave:</p>
<ul>
<li><strong>Eficiencia y rapidez en el desarrollo:</strong> se pueden reutilizar módulos o componentes ya probados y mantenidos por la comunidad.</li>
<li><strong>Compatibilidad multiplataforma:</strong> el mismo desarrollo puede adaptarse a diferentes entornos sin duplicar esfuerzos.</li>
<li><strong>Actualizaciones centralizadas:</strong> al apoyarse en tecnologías web, las mejoras se aplican automáticamente al servidor y al cliente.</li>
<li><strong>Integración de fuentes externas:</strong> uso de APIs públicas (por ejemplo, OpenWeatherMap, Google Maps, o GitHub) para enriquecer la aplicación.</li>
<li><strong>Mejor mantenimiento y escalabilidad:</strong> las librerías y frameworks modernos facilitan la modularidad y la evolución del proyecto.</li>
</ul>
<h3 id="_1-3-tecnologias-y-frameworks-aplicables" tabindex="-1"><a class="header-anchor" href="#_1-3-tecnologias-y-frameworks-aplicables"><span>1.3. Tecnologías y frameworks aplicables</span></a></h3>
<p>Para crear aplicaciones web híbridas, se utilizan frameworks que soportan <strong>Server-Side Rendering (SSR)</strong> y <strong>Static Site Generation (SSG)</strong>, además de permitir ejecución en el cliente (SPA):</p>
<ul>
<li><strong>Nuxt 4 (Vue 3):</strong> framework híbrido para aplicaciones universales (server + client).</li>
<li><strong>Next.js (React):</strong> equivalente en el ecosistema React.</li>
<li><strong>SvelteKit:</strong> framework moderno orientado a rendimiento y SSR.</li>
<li><strong>Angular Universal:</strong> permite el renderizado en servidor con Angular.</li>
</ul>
<p>Otros recursos clave:</p>
<ul>
<li><strong>APIs REST y GraphQL</strong> para la comunicación con fuentes externas.</li>
<li><strong>Librerías de terceros</strong> como Axios, D3.js, Chart.js, Leaflet, TensorFlow.js, etc.</li>
<li><strong>Bases de datos híbridas</strong> y servicios externos como Firebase, Supabase o MongoDB Atlas.</li>
</ul>
<h3 id="_4-creacion-e-integracion-de-repositorios-de-informacion-ce9-3-y-ce9-4" tabindex="-1"><a class="header-anchor" href="#_4-creacion-e-integracion-de-repositorios-de-informacion-ce9-3-y-ce9-4"><span><strong>4. Creación e integración de repositorios de información (CE9_3 y CE9_4)</strong></span></a></h3>
<p>Una aplicación híbrida se caracteriza por <strong>interactuar con repositorios de información existentes</strong> y <strong>crear sus propios repositorios derivados</strong>.</p>
<p>Ejemplo:</p>
<ul>
<li>Recuperar datos de una <strong>API pública</strong> (por ejemplo, precios de criptomonedas o datos meteorológicos).</li>
<li>Procesar esa información en el <strong>servidor</strong> (por ejemplo, filtrando o agregando datos).</li>
<li>Almacenar los resultados en un <strong>repositorio local o base de datos</strong> (PostgreSQL, MongoDB…).</li>
<li>Ofrecer una <strong>API interna</strong> para que otros servicios o usuarios consuman los nuevos datos generados.</li>
</ul>
<hr>
<h3 id="_5-uso-de-librerias-de-codigo-para-funcionalidades-especificas-ce9-5" tabindex="-1"><a class="header-anchor" href="#_5-uso-de-librerias-de-codigo-para-funcionalidades-especificas-ce9-5"><span><strong>5. Uso de librerías de código para funcionalidades específicas (CE9_5)</strong></span></a></h3>
<p>El uso de <strong>librerías</strong> es esencial en el desarrollo híbrido. Estas librerías amplían las capacidades de la aplicación sin tener que desarrollar todo desde cero:</p>
<ul>
<li><strong>Autenticación y seguridad:</strong> JWT, Passport, Auth.js.</li>
<li><strong>Visualización de datos:</strong> Chart.js, ECharts, D3.js.</li>
<li><strong>Mapas y geolocalización:</strong> Leaflet, Mapbox.</li>
<li><strong>Machine Learning e inteligencia de negocio:</strong> TensorFlow.js, ML5.js.</li>
<li><strong>Gestión de estado y composición:</strong> Pinia, Vuex, Redux Toolkit.</li>
</ul>
<hr>
<h3 id="_6-programacion-basada-en-codigo-e-informacion-de-terceros-ce9-6" tabindex="-1"><a class="header-anchor" href="#_6-programacion-basada-en-codigo-e-informacion-de-terceros-ce9-6"><span><strong>6. Programación basada en código e información de terceros (CE9_6)</strong></span></a></h3>
<p>Las aplicaciones híbridas se apoyan en <strong>ecosistemas abiertos de software</strong>:</p>
<ul>
<li>Se integran <strong>servicios web</strong> (APIs de terceros).</li>
<li>Se aprovecha <strong>código publicado</strong> en plataformas como GitHub, npm o PyPI.</li>
<li>Se adaptan <strong>plantillas o componentes</strong> que forman parte de frameworks de código abierto.</li>
</ul>
<p>Esto permite centrarse en el valor añadido del proyecto, reduciendo el tiempo de desarrollo y fomentando la interoperabilidad.</p>
<hr>
<h3 id="_7-inteligencia-de-datos-y-big-data-ce9-7" tabindex="-1"><a class="header-anchor" href="#_7-inteligencia-de-datos-y-big-data-ce9-7"><span><strong>7. Inteligencia de datos y Big Data (CE9_7)</strong></span></a></h3>
<p>En este ámbito, las librerías orientadas a la <strong>inteligencia de negocios (BI)</strong> y <strong>Big Data</strong> permiten que las aplicaciones híbridas analicen datos de diferentes fuentes y generen conocimiento:</p>
<ul>
<li><strong>Librerías de análisis y visualización:</strong> D3.js, Plotly, Chart.js.</li>
<li><strong>Conectores de datos heterogéneos:</strong> APIs REST, CSV, JSON, bases SQL/NoSQL.</li>
<li><strong>Análisis predictivo o dashboards:</strong> integración con servicios como Google Analytics, Power BI, o Apache Superset.</li>
</ul>
<p>Estas herramientas amplían la funcionalidad de la aplicación, transformándola en una plataforma capaz de <strong>procesar, analizar y representar datos en tiempo real</strong>.</p>
<hr>
<h3 id="_8-prueba-depuracion-y-documentacion-ce9-8" tabindex="-1"><a class="header-anchor" href="#_8-prueba-depuracion-y-documentacion-ce9-8"><span><strong>8. Prueba, depuración y documentación (CE9_8)</strong></span></a></h3>
<p>El proceso final de desarrollo incluye:</p>
<ul>
<li>
<p><strong>Pruebas unitarias y de integración</strong> (con Jest, Vitest o Cypress).</p>
</li>
<li>
<p><strong>Depuración</strong> mediante herramientas del navegador y consola del servidor.</p>
</li>
<li>
<p><strong>Documentación técnica y de usuario</strong>, que describa:</p>
<ul>
<li>Arquitectura del sistema.</li>
<li>Dependencias y librerías utilizadas.</li>
<li>APIs consultadas.</li>
<li>Estructura de carpetas y módulos.</li>
</ul>
</li>
</ul>
<Mermaid code="eJxlksFq20AQhu96imFPDsU2bdJrQbYUmpI6xjK5iBwm0tTaou6K3ZWaltyaY0sLhRZ6KaGU0kNOueTuN8kLJI+Q2chWDNFBLDvz//PNzL4p9fusQONgHgVBmIpxKUk5gt4EG1pgrs0W3P7+/EUcQb//4lQkupSZdHUOL+fzKTy9ufp6/emPOIVRKhIyjWQFTKQzGnqxctooDXZ9nxNM6hMHO97zx1/WiqMgsPXxwmBVQBLPDveig1kqHin7KyEMV+YPeuBv1MLFbymrHUJtaZdcVnA2H0P7QWUROmTKcSrC6R5IbtEohJ4vQGaIlRwOBgOP9e//ynPceu6X+A4BwcvopJVpGEXwrGs9ak03omjJN5uj09aP7xv/fp498Eatd0RNTWWzTnyVHEw842Z55uZIZXRGlrdh/aQ3W56RysnIjxyDJJnxVl7vwxNoZdsdYpyK6fJ8IRnPdApkqu9njMQ3QRCvDW1Vk+UpkmqkT8IS1PoxwE5nGQZhqzisCbahkLnhGUOJUK0q9e7HjJmTvETMIZmGW/C8M9jlsVX8mjCTy0sFxfLi2HAe3AsQrn+dM9odqKPvrA=="></Mermaid><h2 id="web-scrapping" tabindex="-1"><a class="header-anchor" href="#web-scrapping"><span>Web Scrapping</span></a></h2>
<div class="hint-container note">
<p class="hint-container-title">Nota</p>
<p>Recuperado de <a href="https://manu-perez-alfonso.github.io/modulos/01-Servidor/ud11/#evaluacion" target="_blank" rel="noopener noreferrer">Manu Perez Alonso</a></p>
</div>
<p>Internet representa una vasta y valiosa fuente de datos en numerosas áreas de interés. Existen diferentes posibilidades a través de las cuales recolectar datos a través de Internet:</p>
<ul>
<li>
<p>Juegos de datos ya existentes:</p>
<ul>
<li>Públicos: existen numerosos conjuntos de datos ya preparados para entrenar diferentes algoritmos de Inteligencia Artificial. Puedes encontrar algunos de estos ejemplos en este enlace.</li>
<li>Compra de juegos de datos: en numerosas plataformas es posible comprar juegos de datos sobre diversas temáticas: consumo, medioambiente, política... Un ejemplo lo puedes encontrar en este enlace.</li>
<li>Datos corporativos: son los datos transaccionales o agregados, generados por la propia actividad privada de una empresa u organización.</li>
</ul>
</li>
<li>
<p>Creación de juegos de datos:</p>
<ul>
<li>Generación de datos: mediante la creación de encuestas, o la utilización de servicios como AmazonTurk, que permiten contratar personal para tareas como etiquetado de datos y clasificación.</li>
<li>Recolección de datos existentes: mediante servicios API REST.</li>
</ul>
</li>
</ul>
<p>En la unidad anterior vimos cómo recuperar datos de diversas API REST, diseñadas para tal efecto, pero, ¿qué ocurre si existen sitios web que no proporcionen un servicio web similar?</p>
<p>Para estos casos se puede utilizar Web Scraping, que se trata de una técnica consistente en extraer datos del código HTML de los sitios web. Antes de aplicar esta técnica a un sitio web, es necesario tener en consideración determinados factores:</p>
<p>Legales</p>
<p>¿Se incumple algún reglamento nacional/regional?<br>
¿Se incumplen los &quot;Términos y condiciones&quot; del sitio web?<br>
¿Se está accediendo a lugares no autorizados?<br>
¿Es legal el uso que se le dará a los datos?<br>
Éticos</p>
<p>Robots.txt: es un fichero con información para que los motores de búsqueda no indexen determinadas páginas de un sitio web. Para acceder a este fichero, se añade &quot;/robots.txt&quot; al final de un determinado dominio, de la forma &quot;<a href="http://dominio.com/robots.txt" target="_blank" rel="noopener noreferrer">dominio.com/robots.txt</a>&quot;. Aquí se detallan aspectos como si se permite/deniega acceso total o parcial, frecuencia de consultas (crawl-delay), el sitemap (para facilitar la navegación por el sitio), etc. Para más información, consulta este enlace. No respetar las normas establecidas en este fichero puede acarrear consecuencias legales.<br>
En caso de dudas sobre si se puede aplicar esta técnica a un determinado sitio web, el mejor consejo es contactar con la empresa/organización y preguntar.</p>
<p>Tipos de sitios web¶<br>
Existen diferentes casuísticas que nos podemos encontrar cuando tratamos de aplicar Web Scraping en un sitio web, dependiendo del paradigma en que esté basado el sitio web en cuestión:</p>
<p>HTML pre-renderizado o sitios web estáticos: se trata de sitios web cuyo código HTML se envía desde el servidor (backend), ya sea porque se trata de un sitio web estático, porque se utilizan frameworks con sistemas de plantillas (Laravel, CodeIgniter, Django...) que embeben código de servidor en HTML, o también porque se utiliza la técnica de SSR en aplicaciones web reactivas (Vue, React, Angular...). En este caso el HTML se obtiene al hacer una petición HTTP, y se pueden utilizar librerías como BeautifulSoup4 o Scrapy.</p>
<p>Single Page Application (SPA): consiste en un fichero HTML simple con código JavaScript asociado. Durante la navegación, el navegador web ejecuta el código JavaScript y modifica dinámicamente el código HTML para liberar al servidor de esta tarea. Los datos se descargan mediante peticiones HTTP a servicios REST que residen en el servidor, actualizándose solo la parte del HTML que se necesita, sin originar un refresco de toda la página web. Al hacer una petición HTTP, lo que se obtiene es el HTML simple y no los datos que se visualizan en pantalla (ya que es el código JavaScript, en el lado cliente, quien modifica el HTML, tras hacerse la petición HTTP). En este caso existen dos aproximaciones para Web Scraping:</p>
<p>Utilizar una herramienta como Selenium, para simular un navegador web que accede al sitio web, y así poder ejecutar el código JavaScript que genere el código HTML. Selenium se trata realmente de un entorno de pruebas para aplicaciones web, aunque su uso ha derivado también hacia el Web Scraping. Además de para SPAs, Selenium también se puede utilizar para los sitios web de la tipología anterior.<br>
Inspeccionar las peticiones HTTP que se realizan al backend para descubrir los endpoints, y así poder realizar peticiones HTTP directamente a esos endpoints y recuperar los datos en formato JSON (generalmente).<br>
Además de estas consideraciones, será necesario establecer si se requiere algún tipo de autenticación al realizar la petición HTTP.</p>
<p>Ejemplos de Web Scraping¶<br>
A continuación vamos a desarrollar dos ejemplos de Web Scraping, uno con BeautifulSoup4, y otro con Selenium. Para ello, previamente deberemos instalar en nuestro entorno virtual los correspondientes paquetes:</p>
<p>pip install beautifulsoup4<br>
pip install selenium<br>
Fake jobs - BeautifulSoup4¶<br>
En este ejemplo vamos a extraer determinados datos de una web con ofertas de trabajo falsas. La URL de la cual vamos a extraer estos datos es:</p>
<p><a href="https://realpython.github.io/fake-jobs/" target="_blank" rel="noopener noreferrer">https://realpython.github.io/fake-jobs/</a></p>
<p>Y los datos de cada oferta son:</p>
<p>Título<br>
Compañía<br>
Ubicación<br>
Una vez tenemos claro los datos que necesitamos extraer, así como la URL donde encontrar dichos datos, deberíamos plantearnos si se incumple algún tipo de norma tanto legal como ética (según las consideraciones mencionadas en el apartado introductorio). Al tratarse de un sitio de pruebas específicamente diseñado para practicar Web Scraping, no tenemos ningún impedimento para continuar con las pruebas.</p>
<p>Como segundo paso a realizar (previo a la programación del script o bot), es esencial analizar la estructura del sitio web del que queremos descargar los datos. Para ello, debemos inspeccionar el código HTML con el navegador que estemos utilizando. En el caso de Google Chrome, pulsamos botón derecho del ratón sobre el elemento a inspeccionar, y pulsamos sobre &quot;Inspeccionar&quot;, tras lo cual nos aparecerán las herramientas de desarrollador, sobre la pestaña &quot;Elementos&quot;, y apuntando directamente al elemento sobre el que habíamos pulsado el botón derecho del ratón:</p>
<p>Volveremos a esta estructura más adelante, pero ahora vamos a introducir las primeras instrucciones de código:</p>
<p>import requests<br>
from bs4 import BeautifulSoup</p>
<p>URL = &quot;<a href="https://realpython.github.io/fake-jobs/" target="_blank" rel="noopener noreferrer">https://realpython.github.io/fake-jobs/</a>&quot;<br>
page = requests.get(URL)<br>
soup = BeautifulSoup(page.content, &quot;html.parser&quot;)<br>
La primera diferencia con respecto a lo que hemos hecho hasta ahora es la importación de la clase BeautifulSoup de la librería correspondiente. Además, hemos creado un objeto BeautifulSoup a partir del resultado devuelto por la petición HTTP a la URL donde se encuentran los datos.<br>
El segundo parámetro &quot;html.parser&quot; indica el tipo de parser que se va a utilizar. Un parser servirá para poder distinguir entre los distintos elementos de un documento basado en lenguaje de marcas (HTML en este caso) para poder así navegar por ellos posteriormente. En el caso de BeautifulSoup, podemos encontrar tres tipos:</p>
<p>html.parser: se trata del parser que viene por defecto instalado en la librería estándar de Python.<br>
lxml: combina características de XML y se caracteriza por su rapidez.<br>
html5lib: se caracteriza por interpretar el HTML del mismo modo que un navegador web.<br>
En general, utilizaríamos lxml cuando necesitásemos rapidez. Además, para versiones de Python igual o anteriores a la 3.2.2, se recomienda usar lxml o html5lib. Para saber más sobre las diferencias de estos parsers, se puede consultar este enlace.</p>
<p>Encontrar elementos por ID¶<br>
Tras inspeccionar el código HTML según se ha descrito anteriormente, vemos que las ofertas de trabajo están contenidas en elementos div con clase &quot;card&quot;, a su vez contenido en un div con clases &quot;column is-half&quot;. Todos estos elementos div están a su vez contenidos en un elemento div con el atributo id con valor &quot;ResultsContainer&quot;. Por tanto, éste es el primer elemento a partir del cual empezar la búsqueda:</p>
<p>La instrucción para realizar esto será:</p>
<p>results = soup.find(id=&quot;ResultsContainer&quot;)<br>
Ahora el objeto results va a contener el elemento con id &quot;ResultsContainer&quot;, y todos los contenidos dentro de él. El método find recuperará un solo elemento.<br>
Si quisiésemos ver de forma &quot;amigable&quot; el HTML obtenido, podemos utilizar la siguiente instrucción:</p>
<p>print(results.prettify())<br>
Encontrar elementos por etiqueta y clase¶<br>
Una vez hemos acotado la parte del documento que contiene los datos que nos interesan, vamos a localizar exactamente dónde se encuentran dichos datos:</p>
<p>Por tanto, se puede apreciar que los datos que necesitamos se encuentran dentro de un elemento div con clase &quot;card-content&quot;. Para poder recuperar todos los elementos con esta clase, utilizamos la siguiente instrucción:</p>
<p>job_elements = results.find_all(&quot;div&quot;, class_=&quot;card-content&quot;)<br>
De esta forma obtenemos otro objeto BeautifulSoup llamado &quot;job_elements&quot; a partir de &quot;results&quot;. Si no hubiésemos especificado el atributo class_, habríamos recuperado todos los elementos div del documento.<br>
Con el método find_all vamos a obtener un iterable que podremos recorrer con un bucle:</p>
<p>for job_element in job_elements:<br>
title_element = job_element.find(&quot;h2&quot;, class_=&quot;title&quot;)<br>
company_element = job_element.find(&quot;h3&quot;, class_=&quot;company&quot;)<br>
location_element = job_element.find(&quot;p&quot;, class_=&quot;location&quot;)<br>
print(title_element)<br>
print(company_element)<br>
print(location_element)<br>
print()<br>
NOTA: Si hubiésemos utilizado el método find en lugar de find_all, solo habríamos recuperado el primero de los elementos del árbol con las características especificadas.</p>
<p>Por cada job_element (que también es un objeto de BeautifulSoup) dentro de job_elements, buscaremos diferentes elementos (h2, h3 y p) con sus correspondientes clases (title, company y location). A continuación imprimimos sus valores, y una línea en blanco al final de cada bloque.</p>
<p>La salida del bucle tiene la siguiente apariencia:</p>
<h2 class="title is-5">Senior Python Developer</h2>
<h3 class="subtitle is-6 company">Payne, Roberts and Davis</h3>
<p class="location">Stewartbury, AA</p>
Para redondear esta primera prueba, vamos a extraer el texto de los elementos anteriores mediante la función get_text(), y el resultado lo concatenaremos con la función strip() para extraer los posibles espacios en blanco. Con lo que el script quedaría del siguiente modo:
<p>import requests<br>
from bs4 import BeautifulSoup<br>
URL = &quot;<a href="https://realpython.github.io/fake-jobs/" target="_blank" rel="noopener noreferrer">https://realpython.github.io/fake-jobs/</a>&quot;<br>
page = requests.get(URL)<br>
soup = BeautifulSoup(page.content, &quot;html.parser&quot;)<br>
results = soup.find(id=&quot;ResultsContainer&quot;)<br>
job_elements = results.find_all(&quot;div&quot;, class_=&quot;card-content&quot;)<br>
for job_element in job_elements:<br>
title_element = job_element.find(&quot;h2&quot;, class_=&quot;title&quot;)<br>
company_element = job_element.find(&quot;h3&quot;, class_=&quot;company&quot;)<br>
location_element = job_element.find(&quot;p&quot;, class_=&quot;location&quot;)<br>
print(title_element.get_text().strip())<br>
print(company_element.get_text().strip())<br>
print(location_element.get_text().strip())<br>
print()<br>
Para lanzar este script, lo guardamos primero en un fichero con extensión .py (por ejemplo fake_jobs_scraping.py), seguidamente activamos el entorno virtual desde el terminal, y lo ejecutamos de la forma:</p>
<p>(venv) usuario: python /&quot;ruta hasta el fichero&quot;/fake_jobs_scraping.py<br>
Si accedemos al directorio donde se encuentra el fichero (mediante el comando &quot;cd&quot;), simplemente lo podemos ejecutar sin especificar la ruta:</p>
<p>(venv) usuario: python fake_jobs_scraping.py</p>
</div></template>


