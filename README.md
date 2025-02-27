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

![screenshot](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhraJaOqGAwkjSgjaaEzM0i22yhwhWwkrm9Dki_2-xRLxq8y3F4_XjyrWyJuRPzO1RJBvzJoKRmKXfLKkH9W6dIYAA-i8_R4grqLZ6GspqBnCMxq-jYpFaw6B2RodFIXnIGm7Nzg-ySPiEimMdyLFRhajocz2ZS3Deig2KSQy8C63PVb4i_bqM-Dj3oHfo/s1914/1.png)

![screenshot](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjRaIEU0m-F9tzsRRlFPIoKeOdQepVG6FU-RlePRbZRiiyepwjwj8RZOdg6qWPuXezavzftIAoGA-vxL68ci-swF6ECa2Wv0STZgOjKiu2PTtgl9kFayL-efHz7_ARHOONYqjx8y8XLBWDqax2svmslCLNLDNgJYZD_oac10se_QN0ssH7Dq7fdwtyn41k/s1914/2.png)

![screenshot](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiHKUAkw5I2Rjx1LzjjyFOtkmpiijdG62HipKSP__Ti3trG0Nc6CjqRn146KtFXZNY1foiLupXKwyj9lOtTVHaFlQV3rHwaqnJddChfsFVVOkDXotVGBoEDa57qFcgT7SILqq2BuVLf6_bgphYrAIkp7F2K3yiE9TteKobZEgV9JkUfVXIkYC7GivhGtTM/s1919/3.png)

![screenshot](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjVLUPZDGGPzngdzglPnPMG1xMxuT_GL5cy_TneebvyopmDYboARWk3b4VHb2KGSEOxnDOuDHoie5H5nm8ULkgpqCEXBZJi7Jyw6Olki1wp0zrAr8viTVrk-QYn8TEt21KmBAjT2h8MKML3QoueeWXMGjfsl8YGqMiW4KtFXnLKz4GNdmbQSy7AWpBQ5a4/s1916/4.png)

![screenshot](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhpIqe-VL5D4dDMDNajoSA8YSqptulOY8U_VhBNyy7agD_HO17C15IQCiGUvqfDEtPANhyIS69hQCqhA2fzZ3D9t4m8Ti6d0mQStU1UCfLm1c-RYvxo9I3DyKVfpq0ZZVxNZBoUqvzoa0RpAwCNoSugak1lLk3lQ2o2WS0Qjre6TMJZcM4bzvAizJdzbno/s1919/5.png)

![screenshot](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhQVkVG3QG6PKHcmuN_IR4B7T5x6n2XaC8Yd323MHetPddPIWH4tWllBbOqMsXy1auxVCKOte0z2J85PufksBX5YaMMXgTSCQ-OLCD49GwNCia7uMqWYQig8e_r8wBTEM1lG8utawhyphenhypheno4rhz7lzsYr-DjCjugagtzxTId1IvVTM0qLAwa7OF-mx0H9jTMA/s1919/6.png)

![screenshot](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg3w0vegAlY20a5bj7BWOU5DXz0Oaem41RJuuVndIzdMBu3PeeIJb6TlvVS94MT0P7PYewWZJ9XM2ZccDFlMblPggU3XVQM_mT_6Dc3arBQKqWI2fuYwu9MdICylrlO1lCNG9QDCF9Hgv1oKfdYNpkTtepxsvbAHxPlbhRAgVAgpl8cktru3f41N_41MbQ/s1919/7.png)

![screenshot](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjmiyWblEPQFSIzymbSEkpxRuDP7j3liSM8ePNn7bFPj2zjrzCtf0LYesw1nqSnnCvD0lEbjNVR7mbD0paS_IT_blTd3RnnZw2UeEEEP2BCZXElk2d6ZdWtRUq4rIy2AP7XLPD31Gju90aiuksMSjmGhyphenhyphenGUWg0oxoPdb0YqgG_BJLfexSQr9yJLH12_6IM/s1919/8.png)

![screenshot](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiXoLln5qa_JmYgpfeA0y0IazkIusVqQwk_K8e8E1sO37mCNRwBjJRjvh7hLiplVUL-ZNh-j4KybHdPxrHPb4g8bP62Yj2gDiEBV6NxUrqnowHw84g03Yh8PUuDOqzAANR8McZh_Sg9XwliigTeoEoeHPaKR1yB-69SA-jAszZSDIxJ8zMmSHng-cB0vSc/s1919/9.png)

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