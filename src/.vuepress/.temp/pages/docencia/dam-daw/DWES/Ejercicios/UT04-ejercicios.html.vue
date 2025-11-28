<template><div><h1 id="ejercicios-ut04-persistencia-de-datos" tabindex="-1"><a class="header-anchor" href="#ejercicios-ut04-persistencia-de-datos"><span>Ejercicios UT04. Persistencia de datos</span></a></h1>
<p>En este ejercicio daré un paso a paso de como crear la persistencia de datos en nuestra aplicación Django. Espero que lo intentéis vosotros y me enviéis vuestras conclusiones/problemas.</p>
<h2 id="_1-creacion-de-la-base-de-datos-y-acceso-con-usuario-alumno" tabindex="-1"><a class="header-anchor" href="#_1-creacion-de-la-base-de-datos-y-acceso-con-usuario-alumno"><span>1. Creación de la base de datos y acceso con usuario <em>alumno</em></span></a></h2>
<p>Vamos a crear en nuestro VDI la base de datos para utilizar con <em>MyOng</em>. Una vez conectados y usando DBeaver llevaremos a cabo los siguientes pasos:</p>
<h3 id="a-creamos-la-nueva-base-de-datos" tabindex="-1"><a class="header-anchor" href="#a-creamos-la-nueva-base-de-datos"><span>a. Creamos la nueva base de datos</span></a></h3>
<figure><img src="/images/dwes/ejercicios/persistencia/create-bbdd.png" alt="crear base datos" tabindex="0" loading="lazy"><figcaption>crear base datos</figcaption></figure>
<hr>
<h3 id="b-creamos-una-nueva-conexion-para-acceder-a-esta-base-de-datos" tabindex="-1"><a class="header-anchor" href="#b-creamos-una-nueva-conexion-para-acceder-a-esta-base-de-datos"><span>b. Creamos una nueva conexión para acceder a esta base de datos</span></a></h3>
<figure><img src="/images/dwes/ejercicios/persistencia/create_connection.png" alt="crear conexión con usuario alumno" tabindex="0" loading="lazy"><figcaption>crear conexión con usuario alumno</figcaption></figure>
<figure><img src="/images/dwes/ejercicios/persistencia/create_connection_2.png" alt="indicamos que es postgres" tabindex="0" loading="lazy"><figcaption>indicamos que es postgres</figcaption></figure>
<h2 id="_2-anadimos-usuario-ong-root" tabindex="-1"><a class="header-anchor" href="#_2-anadimos-usuario-ong-root"><span>2. Añadimos usuario <em>ong_root</em></span></a></h2>
<h3 id="a-primero-procedemos-a-crear-el-perfil-del-superusuario-con-permisos-para-hacer-todo-lo-que-necesitemos-en-la-nueva-base-de-datos-este-sera-el-usuario-con-el-que-trabaje-django" tabindex="-1"><a class="header-anchor" href="#a-primero-procedemos-a-crear-el-perfil-del-superusuario-con-permisos-para-hacer-todo-lo-que-necesitemos-en-la-nueva-base-de-datos-este-sera-el-usuario-con-el-que-trabaje-django"><span>a. Primero procedemos a crear el perfil del superusuario con permisos para hacer todo lo que necesitemos en la nueva base de datos. Este será el usuario con el que trabaje Django:</span></a></h3>
<figure><img src="/images/dwes/ejercicios/persistencia/crear_rol.png" alt="Creamos el nuevo rol ong_root" tabindex="0" loading="lazy"><figcaption>Creamos el nuevo rol <em>ong_root</em></figcaption></figure>
<figure><img src="/images/dwes/ejercicios/persistencia/crear_rol_2.png" alt="Le asignamos permisos amplios" tabindex="0" loading="lazy"><figcaption>Le asignamos permisos amplios</figcaption></figure>
<figure><img src="/images/dwes/ejercicios/persistencia/crear_rol_3.png" alt="Muy amplios" tabindex="0" loading="lazy"><figcaption>Muy amplios</figcaption></figure>
<figure><img src="/images/dwes/ejercicios/persistencia/crear_rol_4.png" alt="Guardamos todo" tabindex="0" loading="lazy"><figcaption>Guardamos todo</figcaption></figure>
<h2 id="_3-modificamos-la-conexion-para-probar-ong-root" tabindex="-1"><a class="header-anchor" href="#_3-modificamos-la-conexion-para-probar-ong-root"><span>3. Modificamos la conexión para probar <em>ong_root</em></span></a></h2>
<h3 id="a-usando-la-contrasena-que-hemos-creado-para-el-usuario-actualizamos-la-conexion" tabindex="-1"><a class="header-anchor" href="#a-usando-la-contrasena-que-hemos-creado-para-el-usuario-actualizamos-la-conexion"><span>a. Usando la contraseña que hemos creado para el usuario, actualizamos la conexión.</span></a></h3>
<h2 id="" tabindex="-1"><a class="header-anchor" href="#"><span><img src="/images/dwes/ejercicios/persistencia/new_role_connection.png" alt="Guardamos todo" loading="lazy"></span></a></h2>
<h3 id="b-probamos-la-conexion-y-comprobamos-que-no-hay-tablas-creadas" tabindex="-1"><a class="header-anchor" href="#b-probamos-la-conexion-y-comprobamos-que-no-hay-tablas-creadas"><span>b. Probamos la conexión y comprobamos que no hay tablas creadas.</span></a></h3>
<figure><img src="/images/dwes/ejercicios/persistencia/new_role_connection2-notables.png" alt="Guardamos todo" tabindex="0" loading="lazy"><figcaption>Guardamos todo</figcaption></figure>
<h2 id="_4-creacion-de-la-conexion-en-django" tabindex="-1"><a class="header-anchor" href="#_4-creacion-de-la-conexion-en-django"><span>4. Creación de la conexión en Django</span></a></h2>
<figure><img src="/images/dwes/ejercicios/persistencia/crear-env.png" alt="Configuración .ENV" tabindex="0" loading="lazy"><figcaption>Configuración .ENV</figcaption></figure>
<h2 id="_5-creacion-de-la-migracion-y-comprobacion-de-la-bbdd" tabindex="-1"><a class="header-anchor" href="#_5-creacion-de-la-migracion-y-comprobacion-de-la-bbdd"><span>5. Creación de la migración y comprobación de la bbdd</span></a></h2>
<p><img src="/images/dwes/ejercicios/persistencia/necesitas-migrar.png" alt="Configuración .ENV" loading="lazy"><br>
<img src="/images/dwes/ejercicios/persistencia/migrado.png" alt="Configuración .ENV" loading="lazy"><br>
<img src="/images/dwes/ejercicios/persistencia/final-tablas-creadas.png" alt="Configuración .ENV" loading="lazy"></p>
</div></template>


