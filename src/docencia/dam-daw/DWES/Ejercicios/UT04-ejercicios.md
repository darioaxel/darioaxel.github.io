---
title: Ejercicios UT04. Persistencia de datos
icon: pen
---
# Ejercicios UT04. Persistencia de datos

En este ejercicio daré un paso a paso de como crear la persistencia de datos en nuestra aplicación Django. Espero que lo intentéis vosotros y me enviéis vuestras conclusiones/problemas.

## 1. Creación de la base de datos y acceso con usuario *alumno* 
Vamos a crear en nuestro VDI la base de datos para utilizar con *MyOng*. Una vez conectados y usando DBeaver llevaremos a cabo los siguientes pasos:

### a. Creamos la nueva base de datos
![crear base datos](/images/dwes/ejercicios/persistencia/create-bbdd.png)

---

### b. Creamos una nueva conexión para acceder a esta base de datos

![crear conexión con usuario alumno](/images/dwes/ejercicios/persistencia/create_connection.png)

![indicamos que es postgres](/images/dwes/ejercicios/persistencia/create_connection_2.png)

## 2. Añadimos usuario *ong_root* 

### a. Primero procedemos a crear el perfil del superusuario con permisos para hacer todo lo que necesitemos en la nueva base de datos. Este será el usuario con el que trabaje Django:

![Creamos el nuevo rol *ong_root*](/images/dwes/ejercicios/persistencia/crear_rol.png)

![Le asignamos permisos amplios](/images/dwes/ejercicios/persistencia/crear_rol_2.png)

![Muy amplios](/images/dwes/ejercicios/persistencia/crear_rol_3.png)

![Guardamos todo](/images/dwes/ejercicios/persistencia/crear_rol_4.png)

## 3. Modificamos la conexión para probar *ong_root* 

### a. Usando la contraseña que hemos creado para el usuario, actualizamos la conexión.

![Guardamos todo](/images/dwes/ejercicios/persistencia/new_role_connection.png)
---

### b. Probamos la conexión y comprobamos que no hay tablas creadas.
![Guardamos todo](/images/dwes/ejercicios/persistencia/new_role_connection2-notables.png)

## 4. Creación de la conexión en Django

![Configuración .ENV](/images/dwes/ejercicios/persistencia/crear-env.png)


## 5. Creación de la migración y comprobación de la bbdd

![Configuración .ENV](/images/dwes/ejercicios/persistencia/necesitas-migrar.png)
![Configuración .ENV](/images/dwes/ejercicios/persistencia/migrado.png)
![Configuración .ENV](/images/dwes/ejercicios/persistencia/final-tablas-creadas.png)