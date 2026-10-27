<?php
require_once __DIR__ . '/config.php';
set_headers();

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    json_out(['error' => 'Method not allowed'], 405);
}

try {
    $db   = get_db();
    $stmt = $db->query('SELECT id, judul, tanggal, konten, gambar FROM berita ORDER BY tanggal DESC');
    $rows = $stmt->fetchAll();
    json_out($rows);
} catch (Exception $e) {
    json_out(['error' => 'Gagal mengambil data berita'], 500);
}
