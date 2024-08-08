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

![screenshot](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiV2DNRKeZHCX4ccAS-rZI0hXyceDW7wjNGXdiAAmYAuNZXcMmE0DJvZpRkVvF8SQUgCWqhI4kaMHEYsCA-AoNkZH0-194TVNDQZOEHgT1Rh9gvtlFhkFB3j1-sW0lzhTFn4Zxci9Hp30UXH1KS-FwuGWMXk90u4dLFR-dbVr-UXvKyyrLwG09nwvMxVj0/s1861/1.png)

![screenshot](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjKahgd9vZHk_AfQdWEpZ7JrWkv4o_eILcfJVPGHxz2f2lehZ2EL9SZQZJPReHJmbXwKi0pgz1P8lfxTQp2MJwFCrXuXgvKHbDDMxLEp2Gmlep06Foi-zBgfxV41xLNhFGJGaI-p7cJbSuyHWaiU7uVK180L3fFbpLuu5pkogtmLiZA_c5-39LO4uxdW_s/s1861/2.png)

![screenshot](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgP33JSu8pxLqSXWdnlCSabuYDweI0zRnQzhoVWd5w7zIQrxy_FZMvzBvU3hfSB4catXeN6yMta7FtOR9tWWreHpqqRlQqSnHGtAnl5ZTuDos5_Uq3260YuqGdJV4hSj08-1OMbSo7sKQgZldgXlQ8TXXhVLELn0xDXbe8Om7MNkHcKIggLn4k9-XAK9ig/s1861/3.png)

![screenshot](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjR0gvwt03-4-ba30SlbxzGVJVh0Vkm9Yp-FVyuNLz6TN7MrpzZL5gZCyxd6f2Q-Uw3TykBYMwys7AhM2yqhyphenhyphen-Z_u_Otar7RWK6cSM4KYRDrxztrwInPMSEi0RnUsz-dVN_Yq7-mW-HxhtB-W1JeLjPT_RogjueGnhKZy8LxXXceAzC2EuCxaH3RYzLn1o/s1861/4.png)

![screenshot](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhZEZcgPwSJgeyTzb-Gmw7qKy_myuBuUoythhD8C1r_0NgDpDovespVg_bq4GjC7czszge8II8ikhxxlyVJ5VB2agfymoeuseOoV_bj-IR5mxPKrDF6jqsXpD_NTqtQ4P9LE0eGKE-qHS_CrHcPSfaiyvdmHGYbrPM4hemyCeC6XkVddsIvkUddKoT7w44/s1861/5.png)

![screenshot](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhHRjh03OD50zParDirYJyV8EerRtAB92A3qk5_CukJcxxeHKYRioN5YdVxuwpD8c5tgBLySc_D7tgeWUflH1x4OvRU_1Ax0Vp6gx9CaVnBr4SNB1gPeJK-D2maLGEV0lSlKhEr6N53EVuyJ1565SvuUDGFMIxI5HmFsIjh2JEsH3lYbodV0bTbJJqaGh8/s1861/6.png)

![screenshot](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhvH7-CEIPjyU0BfrdBLx2fDFrsLf7ljN_Xm40kEYMYSsJx1UufAW4drgXByGM7n_b6431lwrOmSwJoh0x80NzwzSbPEVtqNhi0fdm6gZVcWv3ZFb3ThYv8DhMRDsdm7czXNvR5nrJquaaF6RWBjf7KDHKPbDf5Q8_Nxzn-TsZOkPIAN5ZwQ2pJjj8168w/s1861/7.png)

![screenshot](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhbUPn7orkSWxNIHnRJCLWhP4a9MOxj-E0WgF6uaZCdX84npADLRL0KKXbzcM5jh96fvb3AODYT85Sq4sEinyPVIWAtmfU3whihjapQFILIN_PUwAzUih5IUWdf4IiXKC6x0HYei35CFiunx2Vjty14EhDS_tmAiAiBI3n40rseQOc0tHzieqiapoUmwWA/s1861/8.png)

![screenshot](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEj2pdtIni65jK5K2YxwuoGVroJEcyOSgKZl4291afauLGIuEUSZvWRAn-FynEwxAAbU4G6MrbHPvxQU5ac-PDuyiy4UmhRo6OOJkT2Hij9zWkYs_QjqT7KCDnJm94_5NWJea25S0fYoKMefk-rT2oSIJH0838es_bg7dZKdKH2irXIxMY8qqb14N5OiB0A/s1861/9.png)

![screenshot](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgHd2bYs6fh0NEwWTKhesX2M3RqCHHY7aVUjVAKVHsS5lX1iMfalEdNYVyJQf-mSxz0S3mn67vpDVQYRosHDoBv6n470J7C_DmGmHDcEsjKfD-IHA0oKgUkdkYZJM28Atpem5SNIOHNtCBOg7kFiaP9-W0DDhzG8zgku-D0VF9xBk_NZ91Hpjrd7Ob7Btg/s1861/10.png)

![screenshot](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhTRvtxkDyJ4FsjpBpHwsg5olDU-xKcORNqrJaa3-MYRTI4Wgtr0oYzi1duCnEGl5QPivpGqrZQIQL4PaK7Wb61pdxI_rNFjBP8h81ZxRgI6qr6WsRxIbxivgEerA-P7hN7q8p2gRq-7pf0L1xTGGM6uRJLpoVEjsoYYpFN9_5f__xZjmFuty_VxESq35Y/s1861/11.png)

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