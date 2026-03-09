#!/bin/bash
# Deploy manual desde el servidor

cd /apps/app1

echo "🔄 Actualizando desde GitHub..."
git pull origin main || git pull origin master

echo "🐳 Reconstruyendo contenedor..."
docker compose down
docker compose up -d --build

echo "✅ Deploy completado!"
docker ps | grep app1
