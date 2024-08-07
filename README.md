# Agenda Fenix

En este proyecto se hizo una agenda completa que usa Laravel como Backend y desde el lado de Frontend, ReactJS con Vite, Material UI y Redux. La base de datos elegida para este proyecto fue MySQL.

Las funciones incorporadas son : 

Inicio de sesión obligatorio para usar el sistema protegido con JWT.

Posibilidad de cambiar usuario y contraseña.

Posibilidad de cambiar el theme completo del sistema a un modo oscuro o claro.

Se puede agregar, editar y borrar categorías. En la misma sección se maneja un filtro de redux persistente para buscar por nombre.

Se pueden agregar, editar y borrar notas, en las cuales se puede elegir el titulo de la misma, un contenido protegido con AES-128-ECB que usa el editor Tiptap que permite usar estilos, colores, links, alineaciones de texto, listas, códigos. También se permiten agregar imágenes que se suben al backend del sistema. Se permite seleccionar una o varias categorías, fijar la nota como favorita o no, y establecer una fecha de expiración que una vez cumplida se borrar la nota de la base de datos. En ese misma ventana se maneja un filtro de redux persistente para buscar por titulo, una o varias categorías, y seleccionar si se busca una nota que es favorita o no, lo que permite una cómoda navegación mientras se agregan y editan mas registros.

En la pagina principal se listan todas las notas fijadas ordenadas por la fecha de actualización de la misma, se permite visualizar su contenido en un modal con la posibilidad de ir directamente a la sección de edición de la nota seleccionada.

Se incluye un modal que permite visualizar en un gráfico con las 3 categorías mas utilizadas cuando se crean las notas.

A continuación se muestran unas imágenes del sistema en funcionamiento.

![screenshot]()

Para la correcta instalación del sistema se deben seguir los siguiente pasos. 

En la carpeta del Backend que seria "sistema-api" se debe renombrar el archivo .env.example a solo .env y editar la configuración con los datos de tu conexión MySQL, el SECRET_KEY que seria la clave para generar el JWT y el ENCRYPT_KEY que seria la clave para encriptación AES-128-ECB.

Una vez editado el archivo .env se deben ejecutar los siguiente comandos : 

```
composer install
```
```
php artisan key:generate
```
```
php artisan migrate
```
```
php artisan db:seed --class=DatabaseSeeder
```
```
php artisan storage:link
```

Finalmente para iniciar el servidor se debe ejecutar este comando : 

```
php artisan serve --port=7777
```

En la carpeta del Frontend que seria "sistema-frontend" se debe ejecutar el siguiente comando para instalar las dependencias : 

```
npm install
```

En esa misma carpeta también se debe renombrar el archivo .env.example a solo .env y editar la configuración con la URL del Backend.

Finalmente para iniciar el servidor se debe ejecutar este comando : 

```
npm run dev
```