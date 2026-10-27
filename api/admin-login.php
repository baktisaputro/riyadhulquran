<?php
require_once __DIR__ . '/config.php';
set_headers();

session_start();

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Cek status session
    json_out(['logged_in' => isset($_SESSION['admin_logged_in']) && $_SESSION['admin_logged_in'] === true]);
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    json_out(['error' => 'Method not allowed'], 405);
}

$body    = get_body();
$action  = trim($body['action'] ?? '');

// ===== Logout =====
if ($action === 'logout') {
    session_destroy();
    json_out(['success' => true]);
}

// ===== Login =====
$username = trim($body['username'] ?? '');
$password = trim($body['password'] ?? '');

if (!$username || !$password) {
    json_out(['error' => 'Username dan password wajib diisi'], 400);
}

// Credentials admin — ganti sebelum production
define('ADMIN_USERNAME', 'admin');
define('ADMIN_PASSWORD_HASH', password_hash('admin123', PASSWORD_DEFAULT));

// Untuk production, hardcode hash-nya:
// define('ADMIN_PASSWORD_HASH', '$2y$10$xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');

if ($username !== ADMIN_USERNAME || !password_verify($password, ADMIN_PASSWORD_HASH)) {
    // Delay untuk mencegah brute force
    sleep(1);
    json_out(['error' => 'Username atau password salah'], 401);
}

$_SESSION['admin_logged_in'] = true;
$_SESSION['admin_username']  = $username;
$_SESSION['admin_login_time'] = time();

json_out(['success' => true]);
