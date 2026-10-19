# Agenda Fenix

Agenda full-stack con **Laravel** en el backend y **React** (con **Vite**, **Material UI** y **Redux**) en el frontend. Usa **MySQL** como base de datos y, de forma opcional, **Redis** como cache.

## Tabla de contenidos

- [Funcionalidades](#funcionalidades)
- [Capturas de pantalla](#capturas-de-pantalla)
- [Requisitos previos](#requisitos-previos)
- [Instalación local](#instalación-local)
  - [Backend (Laravel)](#backend-laravel)
  - [Frontend (React)](#frontend-react)
- [Uso con Docker](#uso-con-docker)
- [Cache con Redis (opcional)](#cache-con-redis-opcional)
- [Pruebas](#pruebas)
  - [Pruebas en local](#pruebas-en-local)
  - [Pruebas con Docker](#pruebas-con-docker)

## Funcionalidades

- **Autenticación:** el inicio de sesión es obligatorio y usa **JWT**. Podés cambiar el usuario y la contraseña.
- **Personalización:** podés alternar entre tema claro y oscuro.
- **Categorías:** permite agregar, editar y eliminar categorías.
- **Notas:** permite agregar, editar y eliminar notas.
  - El contenido se crea con el editor **Tiptap** y se protege con **AES-128-ECB**.
  - Cada nota admite imágenes, múltiples categorías y una fecha de expiración.
- **Filtros:** las secciones de notas y categorías tienen filtros persistentes que facilitan la navegación.
- **Página principal:** lista las notas fijadas e incluye un gráfico con las tres categorías más usadas.
- **Cache:** los listados y las consultas de notas y categorías se cachean. Por defecto el cache se guarda en la base de datos y, si lo preferís, podés usar **Redis** con Docker.

## Capturas de pantalla

A continuación se muestran algunas imágenes del sistema en funcionamiento:

![Captura 1 del sistema](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi-Bz9kB1ANks7q4ia2l3jtrkikULChzp1_McfroeWzfR8w0M2i99J3F7Rw8NlbRLCVzhoXRT7ZEr0UPniurvt3aSA5gTjlPiSA_yoqURemYixxJc8VTmVuQYOJ8ZZKf71Wr9U-qT0-sKluxtsK3PCVXurbZwuMTIYyUxbFBd4y2pQbktfBr71HZBEmERU/s1919/1.png)

![Captura 2 del sistema](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhUGtx7tZX1q7ygp-7bEMdOM5bU2o9CoMhHkdm9xsvpaxm5BXiMxoD9dCY5MQpuh2qXBU6Je3FofZ9pynpeHVDIXvPZbx5mJPa_HH6mZW18GyJV76Y-1mj5ZIut3QEz7QjFCwzLfBRL2V_OTVqFx8Yiz7nBusEnoetrgyhlzG9a_R7r-fZJGdBrastfMio/s1919/2.png)

![Captura 3 del sistema](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEigR2fzRD2CLJ1VhBZScMczIvyaabc060FnjrbBSK60Qz_Betl53GSZnOCfaR5W6b5VaAWI1V0bhma300OXCV3eYO0T_TCdQ7LJsPDv0a3p5Mgfs2afFdM4Qq4TcIkcR9KpJS5UQaKhxy4TYKrlaRYshmU0hasni7vYGZtimwfUJpkPnLYQDRN1etvAnUY/s1919/3.png)

![Captura 4 del sistema](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgnCZcyxtDp9-8AJePT8hHt7KXFtbFqU9Ee3FWVL_QgRskqBsZe96WTN4MUuVK7eaNKqfAA_cVZtbXheHr8KoqK8kLc_399KirsbBeloEm3cu7V5OryBlqK2o6KtsN1hE4lsw9dytWPQNcmCNCY9DzjeGUbM7-ZXXJqbiuzvetkqCA1vsoECi9WvOmxjfs/s1919/4.png)

![Captura 5 del sistema](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjh6bd5irc8SDvW49T7MrJBnTepOvSuQglxgE4BLsijQKO4VC_eO2fSSS5dxjnX5sqaeRSsVILk_xZkfy7DyzMXoj98G0y7R9RQPCKFGIvWHQ4xjk6cVz5JlQKcTRzUFP6yrhMk8F4Yu1OmkrUIt0xsStYBbL7HTb0Ioe-m3vvgY3OzjLE7IWQgaLP8MtQ/s1919/5.png)

![Captura 6 del sistema](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiH6PfV9JPi9z6UG0hDCE7P0l1RInoJS1IQuSEmQ-5_vJZlGoCcJXR51ZV-Slfd18PvTyQyXDr559tqWh3vGkHQz6cjeZX4uL_nYyO34WXaoPFbY18Kj9bXojMaClRFwAastskneuhHTjM3UO6a3EAEWY2PH4-xtaytKyMrY-2XYRMf_s84hyCxCwF3Qxo/s1919/6.png)

![Captura 7 del sistema](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhVtKW6Ippo79ZK_02M9Cged7BTjHZPXbwMr_AD_HO8S_TYA1r1n7ZwNvfr9ei9s6AiOoZkcGOpGe8d2pCMya7QLuB-FdRlMwnQMs-HolycehY8n2yRBmWrTs08DVN7AKamU12kWSM96f517z_HyDh-ndBBjS8gLEfCQd05_ZRDzRe8q_VppBH3_3JdhuI/s1919/7.png)

![Captura 8 del sistema](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhgoy9E4Hgt2qiTNpwwctaU0O3MxyF2bbwlWsVN78WNlNMcX6efTwRheQqKdDyShaoQB0nrDhvOhg0fPXfPbo_X-Hu0Qu5TpnKb1bTiF67GegJ_9qlipqHFgOnnKOqpGdr7r0LoeicDP5FRFwXJV2_oCls0z7uG-n17OJvUXfzPt-XIiMFi5TesjpFSoL8/s1919/8.png)

## Requisitos previos

**Para la instalación local:**

- PHP y Composer.
- Node.js y npm.
- MySQL.

**Para usar Docker:**

- Docker y Docker Compose.

## Instalación local

El proyecto está dividido en dos carpetas: `sistema-api` (backend) y `sistema-frontend` (frontend).

### Backend (Laravel)

Seguí estos pasos para configurar la API ubicada en la carpeta `sistema-api`.

#### 1. Configurá el entorno

1. Renombrá el archivo `.env.example` a `.env`.
2. Abrí el archivo `.env` y ajustá estas variables:
   - **Base de datos:** las credenciales de tu base de datos MySQL.
   - **`SECRET_KEY`:** la clave para generar los tokens JWT.
   - **`ENCRYPT_KEY`:** la clave para la encriptación AES-128-ECB.
   - **`CACHE_STORE`:** dejala en `database`. Redis solo se activa con Docker (ver [Cache con Redis](#cache-con-redis-opcional)).

#### 2. Ejecutá los comandos

Abrí una terminal en la carpeta `sistema-api` y ejecutá estos comandos en orden:

```bash
# Instala las dependencias
composer install

# Genera la clave de la aplicación
php artisan key:generate

# Ejecuta las migraciones de la base de datos
php artisan migrate

# Carga los datos iniciales
php artisan db:seed --class=DatabaseSeeder

# Crea el enlace simbólico para el almacenamiento
php artisan storage:link
```

#### 3. Iniciá el servidor

```bash
php artisan serve --port=7771
```

El backend queda disponible en `http://localhost:7771`.

### Frontend (React)

Seguí estos pasos para configurar el frontend ubicado en la carpeta `sistema-frontend`.

#### 1. Configurá el entorno

1. Renombrá el archivo `.env.example` a `.env`.
2. Editá la variable `VITE_API_URL` para que apunte a tu backend. Si seguiste los pasos anteriores, el valor es `http://localhost:7771`.

#### 2. Instalá las dependencias e iniciá el servidor

Abrí una terminal en la carpeta `sistema-frontend` y ejecutá:

```bash
npm install
npm run dev
```

La aplicación arranca en modo desarrollo y se conecta al backend que iniciaste antes. Para que funcione, el backend y el frontend tienen que estar en ejecución al mismo tiempo, cada uno en su propia terminal.

## Uso con Docker

Con Docker podés levantar el backend y el frontend con un solo comando.

### 1. Configurá el entorno

1. En la raíz del proyecto, renombrá el archivo `.env.example` a `.env`. Este archivo configura las variables de los contenedores.
2. Abrí el archivo `.env` y verificá estas variables:
   - **MySQL:** `MYSQL_ROOT_PASSWORD`, `MYSQL_DATABASE`, `MYSQL_USER` y `MYSQL_PASSWORD`.
   - **Encriptación:** `ENCRYPT_KEY`.
   - **Frontend:** `VITE_API_URL` y `VITE_IMAGES_URL`.
   - **Cache (opcional):** `DOCKER_REDIS`, `COMPOSE_PROFILES` y `REDIS_PASSWORD`. Se explican en la [siguiente sección](#cache-con-redis-opcional).

### 2. Levantá los servicios

Desde la raíz del proyecto, construí y levantá todos los servicios en segundo plano:

```bash
docker compose up -d --build
```

### 3. Accedé a las aplicaciones

Cuando los contenedores estén activos, podés abrir estas URLs:

| Servicio | URL |
| --- | --- |
| Backend (Laravel) | http://localhost:7771 |
| Frontend (React) | http://localhost:9991 |
| phpMyAdmin | http://localhost:8080 |

## Cache con Redis (opcional)

El sistema cachea los listados y las consultas de notas y categorías. Por defecto el cache se guarda en la base de datos, pero podés usar **Redis** con Docker.

### Activá Redis

1. Agregá estas variables al archivo `.env` de la raíz del proyecto:

   ```env
   DOCKER_REDIS=1
   COMPOSE_PROFILES=redis
   REDIS_PASSWORD=null
   ```

   - `DOCKER_REDIS=1` le indica a Laravel que use Redis.
   - `COMPOSE_PROFILES=redis` le indica a Docker que levante el contenedor de Redis.
   - Las dos variables tienen que estar presentes.
   - `REDIS_PASSWORD` se deja en `null` porque Redis solo es accesible desde la red interna de Docker.

2. Levantá los servicios. La primera vez usá `--build` para que se instale la extensión **phpredis**:

   ```bash
   docker compose up -d --build
   ```

### Verificá que Redis funcione

Este comando muestra en tiempo real cómo el sistema guarda y consulta el cache en Redis:

```bash
docker exec agenda_redis redis-cli MONITOR
```

### Desactivá Redis

Para volver al cache en base de datos:

1. En el archivo `.env` de la raíz, cambiá la variable:

   ```env
   DOCKER_REDIS=0
   ```

2. Eliminá o comentá la línea `COMPOSE_PROFILES=redis`.
3. Ejecutá:

   ```bash
   docker compose --profile redis down
   docker compose up -d
   ```

Los datos que estaban en Redis no se migran. El cache se vuelve a llenar con las próximas consultas.

### Cambiá de modo con los contenedores ya levantados

Laravel guarda la configuración cuando inicia el contenedor, así que si cambiás `DOCKER_REDIS` tenés que recrearlo:

```bash
docker compose up -d --force-recreate laravel_app
```

### Detalles a tener en cuenta

- Se usa la imagen `redis:7-alpine`, con un límite de 128 MB.
- Los datos se guardan en disco, así que si reiniciás el contenedor el cache se reconstruye solo.

## Pruebas

El proyecto incluye pruebas unitarias para el backend y para el frontend.

### Pruebas en local

#### Backend (Laravel)

El entorno de pruebas usa su propio archivo `.env.testing` para no alterar tu base de datos de desarrollo.

1. En la carpeta `sistema-api`, renombrá el archivo `.env.testing.example` a `.env.testing`.
2. Editá `DB_DATABASE`, `DB_USERNAME` y `DB_PASSWORD` para que apunten a una base de datos de pruebas dedicada.
3. Abrí una terminal en la carpeta `sistema-api` y ejecutá:

   ```bash
   php artisan test
   ```

   Laravel migra la base de datos de pruebas automáticamente.

#### Frontend

Abrí una terminal en la carpeta `sistema-frontend` y ejecutá:

```bash
npm run test
```

### Pruebas con Docker

#### Levantá el entorno de pruebas

```bash
docker compose --profile test up -d --build
```

#### Backend

```bash
# Ejecuta todas las pruebas
docker exec -it agenda_laravel_tests php artisan test

# Ejecuta solo las pruebas de una clase
docker exec -it agenda_laravel_tests php artisan test --filter=CategoriaTest
```

#### Frontend

```bash
docker exec -it agenda_react_tests npm run test
```

#### Entrá a la terminal de cada contenedor

```bash
docker exec -it agenda_laravel_tests bash
docker exec -it agenda_react_tests sh
```

#### Apagá el entorno de pruebas

```bash
docker compose --profile test down
```