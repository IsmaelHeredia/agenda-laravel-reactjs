#!/bin/bash

APP_DIR=/var/www/html

echo "[ENTRYPOINT] Iniciando entrypoint para la aplicación Laravel..."

echo "[INFO] Esperando a que el servicio MySQL esté disponible..."
while ! nc -z mysql 3306; do
  sleep 1
done
echo "[INFO] MySQL ya está disponible. Se continúa con la configuración de Laravel."

echo "[INFO] Configurando permisos para los directorios de Laravel..."
mkdir -p "$APP_DIR/storage/framework/cache"
mkdir -p "$APP_DIR/storage/framework/sessions"
mkdir -p "$APP_DIR/storage/framework/views"
mkdir -p "$APP_DIR/storage/app/public/imagenes"
mkdir -p "$APP_DIR/bootstrap/cache"

chown -R www-data:www-data \
  "$APP_DIR/storage" \
  "$APP_DIR/bootstrap/cache"

chmod -R ug+rwX \
  "$APP_DIR/storage" \
  "$APP_DIR/bootstrap/cache"
echo "[INFO] Permisos configurados."

if [ ! -d "$APP_DIR/vendor" ]; then
  echo "[INFO] El directorio 'vendor' no existe. Ejecutando composer install..."
  composer install --no-interaction --prefer-dist --optimize-autoloader
else
  echo "[INFO] El directorio 'vendor' ya existe. Omitiendo composer install."
fi

if [ -z "$APP_KEY" ] || [ "$APP_KEY" = "base64:..." ]; then
  echo "[INFO] APP_KEY no encontrada. Generando una nueva..."
  php artisan key:generate
else
  echo "[INFO] APP_KEY ya existe. Omitiendo generación."
fi

echo "[INFO] Verificando y creando el enlace simbólico para storage..."
if [ -L "$APP_DIR/public/storage" ]; then
  echo "[INFO] El enlace simbólico 'storage' ya existe. Eliminándolo para recrearlo."
  rm "$APP_DIR/public/storage"
fi
php artisan storage:link
echo "[INFO] Enlace simbólico de storage creado exitosamente."

echo "[INFO] Configurando permisos para 'storage/app/public/imagenes'..."
chmod -R 775 "$APP_DIR/storage/app/public/imagenes"
echo "[INFO] Permisos aplicados."

echo "[INFO] Limpiando caché y corriendo migraciones de base de datos..."
php artisan config:cache
php artisan migrate --force

echo "[INFO] Corriendo seeders de base de datos..."
php artisan db:seed --class=DatabaseSeeder

echo "[ENTRYPOINT] Lanzando Apache en primer plano..."
exec apache2-foreground
