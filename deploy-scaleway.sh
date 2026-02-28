#!/usr/bin/env bash
set -euo pipefail

# Deploy Avalonia Docs to Scaleway Object Storage
# Bucket: docs.avaloniaui.net (fr-par)
# Website: https://docs.avaloniaui.net.s3-website.fr-par.scw.cloud

BUCKET="docs.avaloniaui.net"
RCLONE_REMOTE="scaleway:${BUCKET}"
BUILD_DIR="./build"
WEBSITE_URL="https://${BUCKET}.s3-website.fr-par.scw.cloud"

SKIP_BUILD=false
VERIFY_ONLY=false

usage() {
    cat <<EOF
Usage: $(basename "$0") [OPTIONS]

Deploy Avalonia docs to Scaleway Object Storage.

Options:
  --skip-build    Skip npm ci and build, upload existing build/ directory
  --verify-only   Only verify the deployment (no build or upload)
  --help          Show this help message

EOF
    exit 0
}

while [[ $# -gt 0 ]]; do
    case "$1" in
        --skip-build)  SKIP_BUILD=true; shift ;;
        --verify-only) VERIFY_ONLY=true; shift ;;
        --help)        usage ;;
        *)             echo "Unknown option: $1"; usage ;;
    esac
done

log() { echo "==> $*"; }
err() { echo "ERROR: $*" >&2; exit 1; }

# --- Preflight checks ---

preflight() {
    log "Running preflight checks"

    command -v rclone >/dev/null 2>&1 || err "rclone is not installed. Run: brew install rclone"

    # Verify rclone can reach Scaleway
    if ! rclone lsd scaleway: >/dev/null 2>&1; then
        err "Cannot connect to Scaleway via rclone. Run: scw object config install type=rclone region=fr-par"
    fi

    log "Preflight checks passed"
}

# --- Build ---

build() {
    if $SKIP_BUILD; then
        log "Skipping build (--skip-build)"
    else
        log "Installing dependencies"
        npm ci

        log "Building Docusaurus site"
        npm run build || true  # redirect plugin may fail; build output is still valid
    fi

    [[ -f "${BUILD_DIR}/index.html" ]] || err "Build directory missing or empty. Run without --skip-build."
    log "Build directory OK ($(du -sh "$BUILD_DIR" | cut -f1) total)"
}

# --- Upload ---

upload() {
    log "Uploading hashed assets (immutable cache)"
    rclone sync "${BUILD_DIR}/assets/" "${RCLONE_REMOTE}/assets/" \
        --header-upload "Cache-Control: public, max-age=31536000, immutable" \
        --s3-acl public-read \
        --progress

    log "Uploading remaining files (short cache)"
    rclone sync "${BUILD_DIR}/" "${RCLONE_REMOTE}/" \
        --exclude "assets/**" \
        --header-upload "Cache-Control: public, max-age=300, s-maxage=3600" \
        --s3-acl public-read \
        --progress

    log "Upload complete"
}

# --- Verify ---

verify() {
    log "Verifying deployment at ${WEBSITE_URL}"

    local status
    status=$(curl -s -o /dev/null -w "%{http_code}" "${WEBSITE_URL}")

    if [[ "$status" == "200" ]]; then
        log "Verification passed (HTTP ${status})"
    else
        echo "WARNING: Website returned HTTP ${status}"
        echo "If static website hosting is not yet enabled, configure it in the Scaleway console:"
        echo "  https://console.scaleway.com/object-storage/buckets"
        echo "  → ${BUCKET} → Bucket settings → Enable static website hosting"
        echo "  → Index: index.html, Error: 404.html"
        exit 1
    fi
}

# --- Main ---

preflight

if $VERIFY_ONLY; then
    verify
    exit 0
fi

build
upload
verify
