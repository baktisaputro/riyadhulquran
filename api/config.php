<?php
// ===== Konfigurasi Database =====
// Untuk cPanel: buat file api/config.local.php yang berisi credential server.
// File tersebut tidak ikut Git sehingga aman saat pull/update.
if (file_exists(__DIR__ . '/config.local.php')) {
    require __DIR__ . '/config.local.php';
}

// Default lokal (dipakai jika config.local.php tidak ada)
if (!defined('DB_HOST'))   define('DB_HOST', 'localhost');
if (!defined('DB_PORT'))   define('DB_PORT', 3306);
if (!defined('DB_USER'))   define('DB_USER', 'ppuser');
if (!defined('DB_PASS'))   define('DB_PASS', 'pp_password_2026');
if (!defined('DB_NAME'))   define('DB_NAME', 'ppalhikmah');
if (!defined('DB_SOCKET')) define('DB_SOCKET', '/run/mysqld/mysqld.sock'); // kosongkan di cPanel

// ===== Helper: koneksi PDO =====
function get_db(): PDO {
    static $pdo = null;
    if ($pdo === null) {
        // Gunakan unix_socket jika tersedia (lokal), fallback ke TCP (cPanel)
        if (defined('DB_SOCKET') && DB_SOCKET !== '') {
            $dsn = 'mysql:unix_socket=' . DB_SOCKET . ';dbname=' . DB_NAME . ';charset=utf8mb4';
        } else {
            $dsn = 'mysql:host=' . DB_HOST . ';port=' . DB_PORT . ';dbname=' . DB_NAME . ';charset=utf8mb4';
        }
        $pdo = new PDO($dsn, DB_USER, DB_PASS, [
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        ]);
    }
    return $pdo;
}

// ===== Helper: CORS & JSON headers =====
function set_headers(): void {
    header('Content-Type: application/json; charset=utf-8');
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(204);
        exit;
    }
}

// ===== Helper: kirim JSON =====
function json_out(mixed $data, int $code = 200): void {
    http_response_code($code);
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

// ===== Helper: ambil JSON body =====
function get_body(): array {
    $raw = file_get_contents('php://input');
    return json_decode($raw, true) ?? [];
}
