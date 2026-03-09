#!/bin/bash

# =============================================================================
# SCRIPT DE DEPLOY PARA GITHUB ACTIONS (Usuario: deploy)
# =============================================================================

set -e

APP_DIR="/apps/app1"
BACKUP_DIR="/apps/backups"

# Colores
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[OK]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

echo ""
echo "╔══════════════════════════════════════════════════════════════════╗"
echo "║           DEPLOY AUTOMÁTICO - GitHub Actions                     ║"
echo "╚══════════════════════════════════════════════════════════════════╝"
echo ""

# Verificar que estamos en el directorio correcto
cd "$APP_DIR"
log_info "Directorio de trabajo: $(pwd)"

# =============================================================================
# BACKUP
# =============================================================================

log_info "Creando backup..."
mkdir -p "$BACKUP_DIR"
BACKUP_FILE="$BACKUP_DIR/app1-backup-$(date +%Y%m%d-%H%M%S).tar.gz"

# Backup de la carpeta public (el sitio actual)
if [ -d "src/.vuepress/dist" ]; then
    tar -czf "$BACKUP_FILE" src/.vuepress/dist/ 2>/dev/null || true
    log_success "Backup creado: $BACKUP_FILE"
else
    log_warning "No se encontró carpeta dist para backup"
fi

# Limpiar backups antiguos (mantener últimos 5)
ls -t "$BACKUP_DIR"/app1-backup-*.tar.gz 2>/dev/null | tail -n +6 | xargs -r rm -f

# =============================================================================
# ACTUALIZAR CÓDIGO
# =============================================================================

log_info "Actualizando código desde GitHub..."

# Configurar git (por si acaso)
git config user.email "deploy@darioaxel.dev" 2>/dev/null || true
git config user.name "Deploy Bot" 2>/dev/null || true

# Hacer fetch
git fetch origin

# Detectar la rama principal (main o master)
if git show-ref --verify --quiet refs/remotes/origin/main; then
    BRANCH="main"
elif git show-ref --verify --quiet refs/remotes/origin/master; then
    BRANCH="master"
else
    log_error "No se encontró rama main ni master"
    exit 1
fi

log_info "Usando rama: $BRANCH"

# Reset hard para tener exactamente lo que hay en GitHub
git reset --hard "origin/$BRANCH"
log_success "Código actualizado a: $(git rev-parse --short HEAD)"

# =============================================================================
# BUILD Y DEPLOY (Docker)
# =============================================================================

log_info "Construyendo y desplegando contenedor..."

# Detener contenedor actual si existe
if docker ps -q -f name=app1 | grep -q .; then
    log_info "Deteniendo contenedor actual..."
    docker compose down
fi

# Reconstruir y levantar
log_info "Construyendo imagen..."
docker compose build --no-cache

log_info "Iniciando contenedor..."
docker compose up -d

# =============================================================================
# VERIFICACIÓN
# =============================================================================

log_info "Verificando despliegue..."
sleep 5

# Verificar que el contenedor está corriendo
if docker ps | grep -q app1; then
    log_success "Contenedor app1 está corriendo"
    
    # Verificar health check
    if docker exec app1 wget -q --spider http://localhost/api/health 2>/dev/null; then
        log_success "Health check: OK"
    else
        log_warning "Health check no responde aún (puede tardar unos segundos)"
    fi
else
    log_error "El contenedor no se inició correctamente"
    docker logs app1 --tail 20
    exit 1
fi

# =============================================================================
# RESUMEN
# =============================================================================

echo ""
echo "╔══════════════════════════════════════════════════════════════════╗"
echo "║                    DEPLOY COMPLETADO ✅                          ║"
echo "╚══════════════════════════════════════════════════════════════════╝"
echo ""
echo "📅 Fecha: $(date)"
echo "🔀 Commit: $(git rev-parse --short HEAD)"
echo "👤 Usuario: $(whoami)"
echo "🐋 Contenedor: $(docker ps --filter name=app1 --format 'table {{.Names}}\t{{.Status}}' | tail -1)"
echo ""
echo "🌐 URLs:"
echo "   • Producción: https://www.darioaxel.dev"
echo "   • GitHub:     https://darioaxel.github.io"
echo ""
