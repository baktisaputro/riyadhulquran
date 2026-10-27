<?php
require_once __DIR__ . '/config.php';
set_headers();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    json_out(['error' => 'Method not allowed'], 405);
}

$body   = get_body();
$nama   = trim($body['nama']   ?? '');
$email  = trim($body['email']  ?? '');
$subjek = trim($body['subjek'] ?? '');
$pesan  = trim($body['pesan']  ?? '');

if (!$nama || !$email || !$subjek || !$pesan) {
    json_out(['error' => 'Semua kolom wajib diisi'], 400);
}

// Validasi email sederhana
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    json_out(['error' => 'Format email tidak valid'], 400);
}

try {
    $db   = get_db();
    $stmt = $db->prepare(
        'INSERT INTO pesan_kontak (nama, email, subjek, pesan)
         VALUES (:nama, :email, :subjek, :pesan)'
    );
    $stmt->execute([
        ':nama'   => $nama,
        ':email'  => $email,
        ':subjek' => $subjek,
        ':pesan'  => $pesan,
    ]);
    json_out(['success' => true, 'id' => (int) $db->lastInsertId()], 201);
} catch (Exception $e) {
    json_out(['error' => 'Gagal mengirim pesan'], 500);
}
