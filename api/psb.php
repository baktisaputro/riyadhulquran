<?php
require_once __DIR__ . '/config.php';
set_headers();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    json_out(['error' => 'Method not allowed'], 405);
}

$body = get_body();
$nama        = trim($body['nama']        ?? '');
$ttl         = trim($body['ttl']         ?? '');
$jenis_kelamin = trim($body['jenis_kelamin'] ?? '');
$jenjang     = trim($body['jenjang']     ?? '');
$nama_ortu   = trim($body['nama_ortu']   ?? '');
$no_wa       = trim($body['no_wa']       ?? '');
$alamat      = trim($body['alamat']      ?? '');

if (!$nama || !$ttl || !$jenis_kelamin || !$jenjang || !$nama_ortu || !$no_wa || !$alamat) {
    json_out(['error' => 'Semua kolom wajib diisi'], 400);
}

// Validasi jenis_kelamin
if (!in_array($jenis_kelamin, ['Laki-laki', 'Perempuan'], true)) {
    json_out(['error' => 'Jenis kelamin tidak valid'], 400);
}

// Validasi jenjang
if (!in_array($jenjang, ['MTs', 'MA', 'Program Tahfidz'], true)) {
    json_out(['error' => 'Jenjang tidak valid'], 400);
}

try {
    $db   = get_db();
    $stmt = $db->prepare(
        'INSERT INTO pendaftar (nama, ttl, jenis_kelamin, jenjang, nama_ortu, no_wa, alamat)
         VALUES (:nama, :ttl, :jenis_kelamin, :jenjang, :nama_ortu, :no_wa, :alamat)'
    );
    $stmt->execute([
        ':nama'         => $nama,
        ':ttl'          => $ttl,
        ':jenis_kelamin'=> $jenis_kelamin,
        ':jenjang'      => $jenjang,
        ':nama_ortu'    => $nama_ortu,
        ':no_wa'        => $no_wa,
        ':alamat'       => $alamat,
    ]);
    json_out(['success' => true, 'id' => (int) $db->lastInsertId()], 201);
} catch (Exception $e) {
    json_out(['error' => 'Gagal menyimpan pendaftaran'], 500);
}
