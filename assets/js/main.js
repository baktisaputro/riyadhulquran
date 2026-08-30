// ===== Pondok Pesantren Riyadhul Quran - main.js =====
// Konfigurasi (ganti sesuai kebutuhan)
window.SITE_NAME = 'Riyadhul Quran';
// URL subdomain pendaftaran (akan diintegrasikan setelah dibangun)
window.REGISTRATION_URL = 'https://psb.riyadhulquran.sch.id';
// Inject navbar & footer bersama, menandai menu aktif, smooth scroll.

(function () {
    'use strict';

    // Nama file halaman saat ini (mis. "index.html", "profil.html")
    var page = (location.pathname.split('/').pop() || 'index.html');

    var navLinks = [
        { page: 'index.html', label: 'Beranda', href: 'index.html', icon: '' },
        { page: 'profil.html', label: 'Profil', href: 'profil.html', icon: '' },
        { page: 'unit.html', label: 'Unit Pesantren', href: 'unit.html', icon: '' },
        { page: 'fasilitas.html', label: 'Fasilitas', href: 'fasilitas.html', icon: '' },
        { page: 'berita.html', label: 'Kanal Berita', href: 'berita.html', icon: '' },
        { page: 'psb.html', label: 'Penerimaan Santri', href: 'psb.html', icon: '' },
        { page: 'kontak.html', label: 'Hubungi Kami', href: 'kontak.html', icon: '' }
    ];

    var navbar = document.getElementById('site-navbar');
    var footer = document.getElementById('site-footer');

    // ===== Navbar =====
    if (navbar) {
        var links = navLinks.map(function (l) {
            var active = (page === l.page) ? ' active' : '';
            return '<li class="nav-item"><a class="nav-link' + active + '" href="' + l.href + '">' + l.label + '</a></li>';
        }).join('');

        navbar.innerHTML =
            '<div class="container">' +
                '<a class="navbar-brand d-flex align-items-center" href="index.html"><img src="assets/img/logo-rq.svg" alt="Logo Riyadhul Quran" style="height:42px; width:auto; margin-right:10px;"> Riyadhul Quran</a>' +
                '<button class="navbar-toggler bg-light" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">' +
                    '<span class="navbar-toggler-icon"></span>' +
                '</button>' +
                '<div class="collapse navbar-collapse" id="navbarNav">' +
                    '<ul class="navbar-nav ms-auto align-items-center">' +
                        links +
                        '<li class="nav-item ms-lg-3 mt-2 mt-lg-0">' +
                            '<a class="btn btn-login" href="portal.html"><i class="fa-solid fa-user-graduate me-1"></i> Portal Wali</a>' +
                        '</li>' +
                    '</ul>' +
                '</div>' +
            '</div>';
    }

    // ===== Footer =====
    if (footer) {
        footer.innerHTML =
            '<div class="container">' +
                '<div class="row">' +
                    '<div class="col-lg-4 mb-4">' +
                        '<h5 class="footer-title d-flex align-items-center"><img src="assets/img/logo-rq.svg" alt="Logo" style="height:34px; width:auto; margin-right:10px;"> Riyadhul Quran</h5>' +
                        '<p class="text-muted">Pondok Pesantren Tahfidz Quran Riyadhul Quran, didirikan tahun 2014, fokus mencetak generasi penghafal Al-Qur\u2019an dengan tenaga pengajar lulusan terkemuka dalam dan luar negeri.</p>' +
                    '</div>' +
                    '<div class="col-lg-3 mb-4">' +
                        '<h5 class="footer-title">Tautan Cepat</h5>' +
                        '<ul class="list-unstyled">' +
                            '<li><a href="profil.html" class="text-muted text-decoration-none">Profil Pesantren</a></li>' +
                            '<li><a href="unit.html" class="text-muted text-decoration-none">Unit Pesantren</a></li>' +
                            '<li><a href="psb.html" class="text-muted text-decoration-none">Penerimaan Santri Baru</a></li>' +
                            '<li><a href="portal.html" class="text-muted text-decoration-none">Portal Akademik Wali Santri</a></li>' +
                            '<li><a href="berita.html" class="text-muted text-decoration-none">Kanal Berita</a></li>' +
                            '<li><a href="kontak.html" class="text-muted text-decoration-none">Hubungi Kami</a></li>' +
                        '</ul>' +
                    '</div>' +
                    '<div class="col-lg-5 mb-4">' +
                        '<h5 class="footer-title">Hubungi Kami</h5>' +
                        '<ul class="contact-info ps-0">' +
                            '<li><i class="fa-solid fa-location-dot"></i> Kadiresa RT 06, Triwidadi, Pajangan, Bantul, Yogyakarta</li>' +
                        '</ul>' +
                        '<div class="mt-3">' +
                            '<iframe src="https://maps.google.com/maps?q=-7.850461,110.2631047&z=15&output=embed" width="100%" height="150" style="border:0; border-radius: 8px;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
                '<hr class="border-secondary mt-4">' +
                '<div class="row text-center text-md-start align-items-center">' +
                    '<div class="col-md-6 text-muted">' +
                        '<small>&copy; ' + new Date().getFullYear() + ' Pondok Pesantren Riyadhul Quran. All Rights Reserved.</small>' +
                    '</div>' +
                    '<div class="col-md-6 text-md-end mt-3 mt-md-0">' +
                        '<a href="#" class="text-muted me-3 fs-5"><i class="fa-brands fa-facebook"></i></a>' +
                        '<a href="#" class="text-muted me-3 fs-5"><i class="fa-brands fa-instagram"></i></a>' +
                        '<a href="#" class="text-muted fs-5"><i class="fa-brands fa-youtube"></i></a>' +
                    '</div>' +
                '</div>' +
            '</div>';
    }

    // Smooth scroll untuk tautan #di dalam halaman
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            var target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // ===== Render berita dari API =====
    window.renderBerita = function (containerId, limit) {
        var container = document.getElementById(containerId);
        if (!container) return;

        var loading = document.getElementById('berita-loading');
        var empty = document.getElementById('berita-empty');

        fetch('/api/berita')
            .then(function (res) { return res.json(); })
            .then(function (items) {
                if (loading) loading.style.display = 'none';
                if (!items || items.length === 0) {
                    if (empty) empty.classList.remove('d-none');
                    return;
                }
                if (limit) items = items.slice(0, limit);

                var html = items.map(function (b) {
                    var img = b.gambar
                        ? '<img src="' + b.gambar + '" class="card-img-top" alt="' + b.judul + '">'
                        : '<div class="card-img-top" style="height:200px;background:linear-gradient(135deg,var(--primary-color),var(--secondary-color));"></div>';
                    var tgl = new Date(b.tanggal + 'T00:00:00');
                    var tglStr = tgl.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
                    return '<div class="col-lg-4 col-md-6 mb-4">' +
                        '<div class="card card-berita h-100">' +
                            img +
                            '<div class="card-body">' +
                                '<small class="text-muted"><i class="fa-regular fa-calendar-days me-1"></i> ' + tglStr + '</small>' +
                                '<h5 class="card-title mt-2">' + b.judul + '</h5>' +
                                '<p class="card-text">' + b.konten + '</p>' +
                                '<a href="#" class="link-theme">Baca Selengkapnya &rarr;</a>' +
                            '</div>' +
                        '</div>' +
                    '</div>';
                }).join('');

                container.innerHTML = html;
            })
            .catch(function () {
                if (loading) loading.style.display = 'none';
                if (container) container.innerHTML = '<div class="col-12 text-center text-danger">Gagal memuat berita.</div>';
            });
    };

    // ===== Arahkan semua tombol pendaftaran ke URL subdomain =====
    document.querySelectorAll('[data-reg-btn]').forEach(function (btn) {
        btn.href = window.REGISTRATION_URL;
        btn.target = '_blank';
        btn.rel = 'noopener';
    });
})();