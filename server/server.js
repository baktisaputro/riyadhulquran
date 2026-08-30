require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Pool koneksi database
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    charset: 'utf8mb4'
});

// Sajikan halaman statis (index.html, dll) dari folder induk
const publicDir = path.join(__dirname, '..');
app.use(express.static(publicDir));

// ====== API: Berita ======
app.get('/api/berita', async (req, res) => {
    try {
        const [rows] = await pool.query(
            'SELECT id, judul, tanggal, konten, gambar FROM berita ORDER BY tanggal DESC'
        );
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Gagal mengambil data berita' });
    }
});

// ====== API: Pendaftaran PSB ======
app.post('/api/psb', async (req, res) => {
    const { nama, ttl, jenis_kelamin, jenjang, nama_ortu, no_wa, alamat } = req.body;
    if (!nama || !ttl || !jenis_kelamin || !jenjang || !nama_ortu || !no_wa || !alamat) {
        return res.status(400).json({ error: 'Semua kolom wajib diisi' });
    }
    try {
        const [result] = await pool.query(
            'INSERT INTO pendaftar (nama, ttl, jenis_kelamin, jenjang, nama_ortu, no_wa, alamat) VALUES (?,?,?,?,?,?,?)',
            [nama, ttl, jenis_kelamin, jenjang, nama_ortu, no_wa, alamat]
        );
        res.status(201).json({ success: true, id: result.insertId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Gagal menyimpan pendaftaran' });
    }
});

// ====== API: Form Kontak ======
app.post('/api/kontak', async (req, res) => {
    const { nama, email, subjek, pesan } = req.body;
    if (!nama || !email || !subjek || !pesan) {
        return res.status(400).json({ error: 'Semua kolom wajib diisi' });
    }
    try {
        const [result] = await pool.query(
            'INSERT INTO pesan_kontak (nama, email, subjek, pesan) VALUES (?,?,?,?)',
            [nama, email, subjek, pesan]
        );
        res.status(201).json({ success: true, id: result.insertId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Gagal mengirim pesan' });
    }
});

// ====== API: Login Portal Wali ======
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ error: 'Username dan password wajib diisi' });
    }
    try {
        const [rows] = await pool.query('SELECT * FROM wali WHERE username = ?', [username]);
        if (rows.length === 0) {
            return res.status(401).json({ error: 'Username atau password salah' });
        }
        const user = rows[0];
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
            return res.status(401).json({ error: 'Username atau password salah' });
        }
        res.json({
            success: true,
            user: { id: user.id, nama: user.nama, username: user.username, santri: user.santri }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Terjadi kesalahan pada server' });
    }
});

// ====== API: Cek koneksi ======
app.get('/api/health', (req, res) => res.json({ status: 'ok', time: new Date().toISOString() }));

app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});