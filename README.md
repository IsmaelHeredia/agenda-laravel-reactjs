# Agenda Fenix

Este proyecto es una agenda full-stack que usa **Laravel** para el backend y **ReactJS** con **Vite**, **Material UI** y **Redux** para el frontend, con **MySQL** como base de datos.

## Funcionalidades principales

- Autenticación: Inicio de sesión obligatorio con **JWT**, con opción de cambiar usuario y contraseña.

- Personalización: Permite cambiar el tema a modo claro u oscuro.

- Gestión de categorías: Se pueden agregar, editar y eliminar categorías.

- Gestión de notas: Las notas se pueden agregar, editar y eliminar. Su contenido, creado con el editor **Tiptap**, está protegido con **AES-128-ECB**. Las notas pueden tener imágenes, múltiples categorías y una fecha de expiración.

- Filtros: Ambas secciones, notas y categorías, cuentan con filtros persistentes para una mejor navegación.

- Visualización: La página principal lista las notas fijadas. Incluye un gráfico con las tres categorías más usadas.

## Capturas de pantalla

A continuación, se muestran algunas imágenes del sistema en funcionamiento:

![screenshot](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi-Bz9kB1ANks7q4ia2l3jtrkikULChzp1_McfroeWzfR8w0M2i99J3F7Rw8NlbRLCVzhoXRT7ZEr0UPniurvt3aSA5gTjlPiSA_yoqURemYixxJc8VTmVuQYOJ8ZZKf71Wr9U-qT0-sKluxtsK3PCVXurbZwuMTIYyUxbFBd4y2pQbktfBr71HZBEmERU/s1919/1.png)

![screenshot](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhUGtx7tZX1q7ygp-7bEMdOM5bU2o9CoMhHkdm9xsvpaxm5BXiMxoD9dCY5MQpuh2qXBU6Je3FofZ9pynpeHVDIXvPZbx5mJPa_HH6mZW18GyJV76Y-1mj5ZIut3QEz7QjFCwzLfBRL2V_OTVqFx8Yiz7nBusEnoetrgyhlzG9a_R7r-fZJGdBrastfMio/s1919/2.png)

![screenshot](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEigR2fzRD2CLJ1VhBZScMczIvyaabc060FnjrbBSK60Qz_Betl53GSZnOCfaR5W6b5VaAWI1V0bhma300OXCV3eYO0T_TCdQ7LJsPDv0a3p5Mgfs2afFdM4Qq4TcIkcR9KpJS5UQaKhxy4TYKrlaRYshmU0hasni7vYGZtimwfUJpkPnLYQDRN1etvAnUY/s1919/3.png)

![screenshot](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgnCZcyxtDp9-8AJePT8hHt7KXFtbFqU9Ee3FWVL_QgRskqBsZe96WTN4MUuVK7eaNKqfAA_cVZtbXheHr8KoqK8kLc_399KirsbBeloEm3cu7V5OryBlqK2o6KtsN1hE4lsw9dytWPQNcmCNCY9DzjeGUbM7-ZXXJqbiuzvetkqCA1vsoECi9WvOmxjfs/s1919/4.png)

![screenshot](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjh6bd5irc8SDvW49T7MrJBnTepOvSuQglxgE4BLsijQKO4VC_eO2fSSS5dxjnX5sqaeRSsVILk_xZkfy7DyzMXoj98G0y7R9RQPCKFGIvWHQ4xjk6cVz5JlQKcTRzUFP6yrhMk8F4Yu1OmkrUIt0xsStYBbL7HTb0Ioe-m3vvgY3OzjLE7IWQgaLP8MtQ/s1919/5.png)

![screenshot](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiH6PfV9JPi9z6UG0hDCE7P0l1RInoJS1IQuSEmQ-5_vJZlGoCcJXR51ZV-Slfd18PvTyQyXDr559tqWh3vGkHQz6cjeZX4uL_nYyO34WXaoPFbY18Kj9bXojMaClRFwAastskneuhHTjM3UO6a3EAEWY2PH4-xtaytKyMrY-2XYRMf_s84hyCxCwF3Qxo/s1919/6.png)

![screenshot](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhVtKW6Ippo79ZK_02M9Cged7BTjHZPXbwMr_AD_HO8S_TYA1r1n7ZwNvfr9ei9s6AiOoZkcGOpGe8d2pCMya7QLuB-FdRlMwnQMs-HolycehY8n2yRBmWrTs08DVN7AKamU12kWSM96f517z_HyDh-ndBBjS8gLEfCQd05_ZRDzRe8q_VppBH3_3JdhuI/s1919/7.png)

![screenshot](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhgoy9E4Hgt2qiTNpwwctaU0O3MxyF2bbwlWsVN78WNlNMcX6efTwRheQqKdDyShaoQB0nrDhvOhg0fPXfPbo_X-Hu0Qu5TpnKb1bTiF67GegJ_9qlipqHFgOnnKOqpGdr7r0LoeicDP5FRFwXJV2_oCls0z7uG-n17OJvUXfzPt-XIiMFi5TesjpFSoL8/s1919/8.png)

## Instalación del proyecto

### Backend (Laravel)

Se necesitan seguir estos pasos para configurar la API de **Laravel** ubicada en la carpeta **sistema-api**.

**1 - Configuración inicial**

Copia y configura el archivo de entorno: Renombra el archivo **.env.example** a **.env** y ábrelo para editarlo.

Ajusta las variables de entorno: Dentro del archivo **.env**, configura los siguientes parámetros con tu información:

Conexión a la base de datos: Introduce las credenciales de tu base de datos **MySQL**.

Claves de seguridad: Define el **SECRET_KEY** para la generación de tokens **JWT** y el **ENCRYPT_KEY** para la encriptación **AES-128-ECB**.

**2 - Ejecución de comandos**

Abre la terminal en la carpeta **sistema-api** y ejecuta los siguientes comandos en orden:

Instala las dependencias:

```
composer install
```

Genera la clave de la aplicación:

```
php artisan key:generate
```

Ejecuta las migraciones de la base de datos:

```
php artisan migrate
```

Siembra los datos iniciales:

```
php artisan db:seed --class=DatabaseSeeder
```

Crea un enlace simbólico para el almacenamiento:

```
php artisan storage:link
```

**3 - Iniciar el servidor**

Para iniciar el servidor del backend, ejecuta este comando:

```
php artisan serve --port=7777
```

### Frontend (React.js)

Se necesitan seguir estos pasos para configurar el frontend ubicado en la carpeta **sistema-frontend**.

**1 - Configuración inicial**

Copia y configura el archivo de entorno: Renombra el archivo **.env.example** a **.env**.

Ajusta la URL de la API: Dentro del archivo .env, edita el parámetro para que apunte a la URL donde se está ejecutando tu backend. Por defecto, será la URL del servidor que acabas de iniciar.

**2 - Iniciar el servidor**

Instala las dependencias: Abre la terminal en la carpeta **sistema-frontend** y ejecuta este comando:

```
npm install
```

Inicia el servidor de desarrollo:

```
npm run dev
```

### Iniciar los servidores

Se necesitan seguir estos pasos para arrancar tanto el servidor de la API de **Laravel** como el de la aplicación de **React**.

**1 - Iniciar el Backend (Laravel)**

Abre una terminal, navega hasta la carpeta **sistema-api** y ejecuta el siguiente comando:

```
php artisan serve --port=7771
```

Este comando iniciará el servidor de desarrollo de **Laravel** en el puerto 7771.

**2 - Iniciar el Frontend**

Abre una nueva terminal, navega hasta la carpeta **sistema-frontend** y ejecuta este comando:

```
npm run dev
```

Este comando arrancará la aplicación de **React** en modo de desarrollo, la cual se conectará al backend que acabas de iniciar.

### Pruebas unitarias

Este proyecto incluye pruebas unitarias tanto para el backend como para el frontend. Se necesitan seguir las siguientes instrucciones para ejecutarlas.

**1 - Pruebas del Backend (Laravel)**

El entorno de pruebas del backend usa su propio archivo **.env** para evitar cualquier alteración de tu base de datos de desarrollo.

Configura el archivo **.env.testing**: En la raíz del proyecto, renombra el archivo **.env.testing.example** a **.env.testing**. Luego, abre el archivo y edita los campos de la base de datos (**DB_DATABASE**, **DB_USERNAME**, **DB_PASSWORD**) para que apunten a una base de datos de pruebas dedicada.

Ejecuta las pruebas: Abre la terminal en el directorio **sistema-api** y usa el siguiente comando. **Laravel** se encargará de migrar la base de datos de pruebas automáticamente.

```
php artisan test
```

**2 - Pruebas del Frontend**

Para ejecutar las pruebas del frontend, solo necesitas un comando.

Ejecuta las pruebas: Abre la terminal en el directorio **sistema-frontend** y usa este comando:

```
npm run test
```

Este comando ejecutará todas las pruebas configuradas para el frontend.

### Uso con Docker

Para poner en marcha el backend de **Laravel** y el frontend de **React** con **Docker**, se necesitan seguir estos pasos:

**1 - Configuración inicial**

Copia el archivo de entorno: En la raíz de tu proyecto, renombra el archivo **.env.example** a **.env**. Este archivo se usará para configurar las variables de entorno de tus contenedores.

Ajusta las variables de entorno: Abre el archivo **.env** y asegúrate de que los siguientes valores estén configurados correctamente:

Variables de MySQL: **MYSQL_ROOT_PASSWORD**, **MYSQL_DATABASE**, **MYSQL_USER** y **MYSQL_PASSWORD**.

Clave de encriptación: **ENCRYPT_KEY**.

URLs del Frontend: **VITE_API_URL** y **VITE_IMAGES_URL**.

**2 - Levantar los servicios**

Desde la raíz del proyecto, ejecuta el siguiente comando para construir y levantar todos los servicios en segundo plano:

```
docker compose up -d --build
```

**3 - Acceder a las aplicaciones**

Una vez que los contenedores estén activos, se pueden acceder a los servicios en las siguientes URLs:

**Backend (Laravel)**: http://localhost:7771

**Frontend (React)**: http://localhost:9991

**phpMyAdmin**: http://localhost:8080
