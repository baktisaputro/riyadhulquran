<?php
require_once __DIR__ . '/config.php';
set_headers();

// Cek koneksi DB sekalian
try {
    get_db();
    json_out(['status' => 'ok', 'db' => 'connected', 'time' => date('c')]);
} catch (Exception $e) {
    json_out(['status' => 'ok', 'db' => 'disconnected', 'time' => date('c')], 200);
}
