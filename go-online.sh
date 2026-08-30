#!/usr/bin/env bash
# ============================================================
#  go-online.sh — Jalankan website Riyadhul Quran + tunnel publik
#  (Cloudflare Quick Tunnel, gratis, tanpa domain)
#
#  Cara pakai:  ./go-online.sh
# ============================================================
set -u

SITE_DIR="$(cd "$(dirname "$0")" && pwd)"
SERVER_DIR="$SITE_DIR/server"
LOG_DIR="${SITE_DIR}/.logs"
TUNNEL_LOG="$LOG_DIR/cloudflared.log"

mkdir -p "$LOG_DIR"

# ---- 1. Pastikan server Node berjalan ----
ensure_server() {
    if curl -s --max-time 3 http://localhost:3000/api/health >/dev/null 2>&1; then
        echo "[OK] Server website sudah berjalan di http://localhost:3000"
        return 0
    fi
    echo "[..] Menjalankan server website..."
    (cd "$SERVER_DIR" && setsid nohup node server.js >"$LOG_DIR/server.log" 2>&1 </dev/null &)
    sleep 3
    if curl -s --max-time 3 http://localhost:3000/api/health >/dev/null 2>&1; then
        echo "[OK] Server website berjalan di http://localhost:3000"
    else
        echo "[!] Gagal menjalankan server. Cek: cat $LOG_DIR/server.log"
        exit 1
    fi
}

# ---- 2. Pastikan cloudflared terpasang ----
ensure_cloudflared() {
    if command -v cloudflared >/dev/null 2>&1; then
        echo "[OK] cloudflared terpasang ($(cloudflared --version 2>/dev/null))"
        return 0
    fi
    echo "[!] cloudflared belum terpasang. Jalankan dulu:"
    echo "    curl -fsSL -o /tmp/cloudflared.deb https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.deb"
    echo "    sudo dpkg -i /tmp/cloudflared.deb"
    exit 1
}

# ---- 3. Jalankan tunnel publik ----
start_tunnel() {
    # hentikan tunnel lama
    pkill -f "cloudflared tunnel --url" 2>/dev/null
    sleep 1

    echo "[..] Membuat Cloudflare Quick Tunnel..."
    (cd "$SITE_DIR" && setsid nohup cloudflared tunnel --url http://localhost:3000 --no-autoupdate >"$TUNNEL_LOG" 2>&1 </dev/null &)

    # tunggu URL muncul di log (maks ~20 detik)
    local url=""
    for i in $(seq 1 20); do
        url=$(grep -oE 'https://[a-z0-9-]+\.trycloudflare\.com' "$TUNNEL_LOG" 2>/dev/null | head -1)
        [ -n "$url" ] && break
        sleep 1
    done

    if [ -z "$url" ]; then
        echo "[!] Gagal membuat tunnel. Cek: cat $TUNNEL_LOG"
        exit 1
    fi

    echo
    echo "============================================================"
    echo "  🎉 WEBSITE ONLINE!  Buka di browser:"
    echo
    echo "      $url"
    echo
    echo "  (URL ini bersifat sementara — berubah tiap tunnel di-restart)"
    echo "============================================================"
}

ensure_server
ensure_cloudflared
start_tunnel