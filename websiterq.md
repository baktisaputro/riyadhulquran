# Website Riyadhul Quran — Project Progress

**Project Date**: 2026-09-07  
**Last Updated**: 01 Oktober 2026  
**Status**: ✅ Production Ready (Phase 2)

---

## Stack Teknologi

| Layer | Teknologi |
|---|---|
| Frontend | HTML5, Bootstrap 5.3, Font Awesome 6.4 |
| Font | Merriweather (heading) + Poppins (body) |
| Backend (lokal) | Node.js + Express (aktif di port 3000) |
| Backend (hosting) | PHP 8+ murni (siap deploy ke cPanel) |
| Database | MySQL / MariaDB |
| Tunnel (preview) | Cloudflare Quick Tunnel |

---

## Theme Baru

**Palet warna sesuai logo:**

| Peran | Hex |
|---|---|
| Primary Green (gelap) | `#2D4A0F` |
| Primary Green (tengah) | `#4A7A1A` |
| Primary Green (muda) | `#8A9E2A` |
| Accent Gold | `#FCCD0D` |
| Accent Gold Dark | `#D4A800` |
| Footer BG | `#1A2E08` |

**Layout mengikuti template theme baru:**
- Top bar (info alamat + link portal/admin)
- Navbar putih dengan logo + menu uppercase
- Hero section dengan floating info bar
- Section labels uppercase
- Stats banner hijau tua
- Footer hijau tua gelap
- Font Merriweather untuk heading serif

---

## File Struktur

```
WEBSITE RQ BARU/
├── index.html              ✅ Theme baru
├── profil.html             ✅ Theme baru
├── fasilitas.html          ✅ Theme baru
├── berita.html             ✅ Theme baru
├── psb.html                ✅ Theme baru
├── kontak.html             ✅ Theme baru
├── unit.html               ✅ Theme baru
├── unit-ma.html            ✅ Top bar + font
├── unit-mts.html           ✅ Top bar + font
├── unit-pkbm.html          ✅ Top bar + font
├── unit-putri.html         ✅ Top bar + font
├── portal.html             ✅ Theme baru
├── portal-dashboard.html   ✅ Theme baru
├── admin.html              ✅ Theme baru
├── .htaccess               ✅ Routing PHP API
├── assets/
│   ├── css/style.css       ✅ CSS variables baru
│   └── js/
│       ├── main.js         ✅ Navbar/footer baru + fetch → .php
│       └── admin.js        (tidak berubah)
├── api/                    ✅ PHP API (siap cPanel)
│   ├── config.php          ✅ DB config + helpers
│   ├── berita.php          ✅ GET /api/berita.php
│   ├── psb.php             ✅ POST /api/psb.php
│   ├── kontak.php          ✅ POST /api/kontak.php
│   ├── login.php           ✅ POST /api/login.php
│   └── health.php          ✅ GET /api/health.php
├── db/
│   └── schema.sql          ✅ Schema lengkap
└── server/                 (Node.js — bisa dihapus setelah deploy)
    ├── server.js
    ├── .env
    └── package.json
```

---

## API Endpoints (PHP)

| Method | URL | Fungsi |
|---|---|---|
| GET | `/api/berita.php` | Ambil semua berita |
| POST | `/api/psb.php` | Simpan pendaftaran santri |
| POST | `/api/kontak.php` | Simpan pesan kontak |
| POST | `/api/login.php` | Login wali santri |
| GET | `/api/health.php` | Cek status server & DB |

---

## Deploy ke cPanel

### Step 1: Upload file
Upload semua file **kecuali** folder `server/` dan `node_modules/` ke `public_html/`

### Step 2: Buat Database MySQL di cPanel
1. Buka cPanel → MySQL Databases
2. Buat database: `cpaneluser_ppalhikmah`
3. Buat user: `cpaneluser_ppuser`
4. Import `db/schema.sql`

### Step 3: Update `api/config.php`
```php
define('DB_HOST',   'localhost');
define('DB_PORT',   3306);
define('DB_USER',   'cpaneluser_ppuser');
define('DB_PASS',   'password_baru');
define('DB_NAME',   'cpaneluser_ppalhikmah');
define('DB_SOCKET', ''); // kosongkan untuk cPanel (pakai TCP)
```

### Step 4: Pastikan `.htaccess` aktif
cPanel Apache sudah support `.htaccess` secara default.

### Step 5: Test
Buka `https://domainmu.com/api/health.php` — harus return `{"status":"ok","db":"connected",...}`

---

## Data Yang Masih Perlu Diisi

1. **Foto pesantren** → upload ke `assets/img/` (hero-1.jpg, hero-2.jpg, hero-3.jpg, profil.jpg)
2. **Nama pengurus** MA, MTs, PKBM, Putri → isi via Admin Panel
3. **Nomor WhatsApp** → isi via Admin Panel → Informasi Kontak
4. **Link sosial media** (FB, IG, YT) → isi via Admin Panel
5. **Password wali santri** → generate bcrypt hash baru di DB

---

## Generate Password Bcrypt (untuk DB)

```bash
php -r "echo password_hash('passwordbaru', PASSWORD_DEFAULT);"
```

Lalu update di tabel `wali`:
```sql
UPDATE wali SET password = '$2y$10$...' WHERE username = 'ahmad';
```

---

## Next Steps Opsional

1. Tambah halaman detail berita (`berita-detail.php`)
2. API manajemen berita via admin panel (CRUD berita)
3. Upload foto langsung ke server (bukan localStorage)
4. ~~Favicon & Open Graph meta tags~~ ✅ (favicon.svg/ico, apple-touch-icon, og-image.png)
5. Google Analytics
6. HTTPS redirect di `.htaccess`

---

**By**: OpenCode AI + Kiro
