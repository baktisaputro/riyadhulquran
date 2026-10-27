<?php
require_once __DIR__ . '/config.php';
set_headers();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    json_out(['error' => 'Method not allowed'], 405);
}

$body     = get_body();
$username = trim($body['username'] ?? '');
$password = trim($body['password'] ?? '');

if (!$username || !$password) {
    json_out(['error' => 'Username dan password wajib diisi'], 400);
}

try {
    $db   = get_db();
    $stmt = $db->prepare('SELECT * FROM wali WHERE username = :username LIMIT 1');
    $stmt->execute([':username' => $username]);
    $user = $stmt->fetch();

    if (!$user) {
        json_out(['error' => 'Username atau password salah'], 401);
    }

    if (!password_verify($password, $user['password'])) {
        json_out(['error' => 'Username atau password salah'], 401);
    }

    json_out([
        'success' => true,
        'user'    => [
            'id'       => (int) $user['id'],
            'nama'     => $user['nama'],
            'username' => $user['username'],
            'santri'   => $user['santri'],
        ]
    ]);
} catch (Exception $e) {
    json_out(['error' => 'Terjadi kesalahan pada server'], 500);
}
