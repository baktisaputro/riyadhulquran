// ===== Pondok Pesantren Riyadhul Quran - main.js =====
window.SITE_NAME = 'Riyadhul Quran';
window.REGISTRATION_URL = 'psb.html';

(function () {
    'use strict';

    var page = (location.pathname.split('/').pop() || 'index.html');

    var navLinks = [
        { page: 'index.html',    label: 'Beranda',           href: 'index.html' },
        { page: 'profil.html',   label: 'Profil',            href: 'profil.html' },
        { page: 'unit.html',     label: 'Unit Pesantren',    href: 'unit.html' },
        { page: 'fasilitas.html',label: 'Fasilitas',         href: 'fasilitas.html' },
        { page: 'berita.html',   label: 'Kanal Berita',      href: 'berita.html' },
        { page: 'psb.html',      label: 'Penerimaan Santri', href: 'psb.html' },
        { page: 'kontak.html',   label: 'Hubungi Kami',      href: 'kontak.html' }
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
                '<a class="navbar-brand" href="index.html">' +
                    '<img src="assets/img/logo-rq.svg" alt="Logo Riyadhul Quran">' +
                    'Riyadhul Quran' +
                '</a>' +
                '<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">' +
                    '<span class="navbar-toggler-icon"></span>' +
                '</button>' +
                '<div class="collapse navbar-collapse" id="navbarNav">' +
                    '<ul class="navbar-nav mx-auto">' +
                        links +
                    '</ul>' +
                    '<a class="btn btn-apply text-decoration-none ms-lg-3 mt-2 mt-lg-0" href="psb.html">' +
                        'DAFTAR SEKARANG' +
                    '</a>' +
                '</div>' +
            '</div>';
    }

    // ===== Footer =====
    if (footer) {
        footer.innerHTML =
            '<div class="container">' +
                '<div class="row">' +
                    // Kolom 1: Brand
                    '<div class="col-lg-3 col-md-6 mb-4">' +
                        '<h5 class="footer-title d-flex align-items-center gap-2">' +
                            '<img src="assets/img/logo-rq.svg" alt="Logo" style="height:32px; width:auto; filter:brightness(10);">' +
                            'Riyadhul Quran' +
                        '</h5>' +
                        '<p style="color:rgba(255,255,255,0.65); font-size:0.88rem; line-height:1.7;">' +
                            'Mendidik akal, membentuk akhlak. Mencetak generasi hafizh yang rabbani sejak 2014.' +
                        '</p>' +
                        '<div class="mt-3 d-flex gap-3">' +
                            '<a href="#" data-link="fb" style="font-size:1.3rem;"><i class="fa-brands fa-facebook"></i></a>' +
                            '<a href="#" data-link="ig" style="font-size:1.3rem;"><i class="fa-brands fa-instagram"></i></a>' +
                            '<a href="#" data-link="yt" style="font-size:1.3rem;"><i class="fa-brands fa-youtube"></i></a>' +
                        '</div>' +
                    '</div>' +
                    // Kolom 2: Tautan Cepat
                    '<div class="col-lg-2 col-md-6 mb-4">' +
                        '<h5 class="footer-title">Tautan Cepat</h5>' +
                        '<ul class="footer-links">' +
                            '<li><a href="profil.html">Profil Pesantren</a></li>' +
                            '<li><a href="unit.html">Unit Pesantren</a></li>' +
                            '<li><a href="fasilitas.html">Fasilitas</a></li>' +
                            '<li><a href="berita.html">Kanal Berita</a></li>' +
                            '<li><a href="psb.html">Penerimaan Santri</a></li>' +
                            '<li><a href="kontak.html">Hubungi Kami</a></li>' +
                        '</ul>' +
                    '</div>' +
                    // Kolom 3: Portal
                    '<div class="col-lg-2 col-md-6 mb-4">' +
                        '<h5 class="footer-title">Portal</h5>' +
                        '<ul class="footer-links">' +
                            '<li><a href="portal.html">Portal Wali Santri</a></li>' +
                            '<li><a href="unit-ma.html">Madrasah Aliyah</a></li>' +
                            '<li><a href="unit-mts.html">Madrasah Tsanawiyah</a></li>' +
                            '<li><a href="unit-pkbm.html">PKBM</a></li>' +
                            '<li><a href="unit-putri.html">Pondok Putri</a></li>' +
                        '</ul>' +
                    '</div>' +
                    // Kolom 4: Kontak
                    '<div class="col-lg-5 col-md-6 mb-4">' +
                        '<h5 class="footer-title">Hubungi Kami</h5>' +
                        '<ul class="contact-info">' +
                            '<li><i class="fa-solid fa-location-dot"></i> Kadiresa RT 06, Triwidadi, Pajangan, Bantul, Yogyakarta</li>' +
                            '<li><i class="fa-solid fa-phone"></i> <a href="#" data-link="wa">Belum tersedia</a></li>' +
                            '<li><i class="fa-solid fa-envelope"></i> <a href="#" data-link="email">Belum tersedia</a></li>' +
                        '</ul>' +
                        '<div class="mt-3" style="border-radius:8px; overflow:hidden;">' +
                            '<iframe src="https://maps.google.com/maps?q=-7.850461,110.2631047&z=15&output=embed" width="100%" height="140" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
                '<hr>' +
                '<div class="row footer-bottom align-items-center">' +
                    '<div class="col-md-6 text-center text-md-start">' +
                        '&copy; ' + new Date().getFullYear() + ' Pondok Pesantren Riyadhul Quran. All Rights Reserved.' +
                    '</div>' +
                    '<div class="col-md-6 text-center text-md-end mt-2 mt-md-0">' +
                        '<a href="admin.html" style="font-size:0.8rem; opacity:0.4;">Admin Panel</a>' +
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

        fetch('/api/berita.php')
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

    // ===== Load & Display Data Dari Admin Panel =====
    
    // Load Hero Photos
    window.loadHeroPhotos = function() {
        for (let i = 1; i <= 3; i++) {
            const imgData = localStorage.getItem(`img_hero-${i}.jpg`);
            if (imgData) {
                const carouselItem = document.querySelector(`.carousel-item:nth-child(${i})`);
                if (carouselItem) {
                    carouselItem.style.backgroundImage = `url('${imgData}')`;
                }
            }
        }
    };

    // Load Profil Photo
    window.loadProfilPhoto = function() {
        const imgData = localStorage.getItem('img_profil.jpg');
        if (imgData) {
            const profileImg = document.getElementById('profil-photo');
            if (profileImg) {
                profileImg.src = imgData;
            }
        }
    };

    // Load & Display Pengurus Data
    window.loadPengurusData = function(unit) {
        const pengurusData = JSON.parse(localStorage.getItem(`pengurus_${unit}`) || '{}');
        
        if (unit === 'ma') {
            if (pengurusData.kepala) {
                const elements = document.querySelectorAll('[data-role="ma-kepala"]');
                elements.forEach(el => el.textContent = pengurusData.kepala);
            }
            if (pengurusData.wakil) {
                const elements = document.querySelectorAll('[data-role="ma-wakil"]');
                elements.forEach(el => el.textContent = pengurusData.wakil);
            }
            if (pengurusData.tahfidz) {
                const elements = document.querySelectorAll('[data-role="ma-tahfidz"]');
                elements.forEach(el => el.textContent = pengurusData.tahfidz);
            }
        }
        else if (unit === 'pkbm') {
            if (pengurusData.ketua) {
                const elements = document.querySelectorAll('[data-role="pkbm-ketua"]');
                elements.forEach(el => el.textContent = pengurusData.ketua);
            }
            if (pengurusData.sekretaris) {
                const elements = document.querySelectorAll('[data-role="pkbm-sekretaris"]');
                elements.forEach(el => el.textContent = pengurusData.sekretaris);
            }
            if (pengurusData.bendahara) {
                const elements = document.querySelectorAll('[data-role="pkbm-bendahara"]');
                elements.forEach(el => el.textContent = pengurusData.bendahara);
            }
        }
        else if (unit === 'putri') {
            if (pengurusData.kepala) {
                const elements = document.querySelectorAll('[data-role="putri-kepala"]');
                elements.forEach(el => el.textContent = pengurusData.kepala);
            }
            if (pengurusData.tahfidz) {
                const elements = document.querySelectorAll('[data-role="putri-tahfidz"]');
                elements.forEach(el => el.textContent = pengurusData.tahfidz);
            }
            if (pengurusData.pembina) {
                const elements = document.querySelectorAll('[data-role="putri-pembina"]');
                elements.forEach(el => el.textContent = pengurusData.pembina);
            }
        }
        else if (unit === 'mts') {
            if (pengurusData.kepala) {
                const elements = document.querySelectorAll('[data-role="mts-kepala"]');
                elements.forEach(el => el.textContent = pengurusData.kepala);
            }
            if (pengurusData.wakil) {
                const elements = document.querySelectorAll('[data-role="mts-wakil"]');
                elements.forEach(el => el.textContent = pengurusData.wakil);
            }
            if (pengurusData.tahfidz) {
                const elements = document.querySelectorAll('[data-role="mts-tahfidz"]');
                elements.forEach(el => el.textContent = pengurusData.tahfidz);
            }
        }
    };

    // Load & Display Kontak Info
    window.loadKontakInfo = function() {
        const kontakInfo = JSON.parse(localStorage.getItem('kontak_info') || '{}');
        
        if (kontakInfo.wa) {
            const waLinks = document.querySelectorAll('[data-link="wa"]');
            waLinks.forEach(el => {
                el.href = `https://wa.me/62${kontakInfo.wa}`;
                el.textContent = '+62' + kontakInfo.wa;
            });
        }
        
        if (kontakInfo.email) {
            const emailLinks = document.querySelectorAll('[data-link="email"]');
            emailLinks.forEach(el => {
                el.href = `mailto:${kontakInfo.email}`;
                el.textContent = kontakInfo.email;
            });
        }
        
        if (kontakInfo.fb) {
            const fbLinks = document.querySelectorAll('[data-link="fb"]');
            fbLinks.forEach(el => el.href = kontakInfo.fb);
        }
        
        if (kontakInfo.ig) {
            const igLinks = document.querySelectorAll('[data-link="ig"]');
            igLinks.forEach(el => el.href = kontakInfo.ig);
        }
        
        if (kontakInfo.yt) {
            const ytLinks = document.querySelectorAll('[data-link="yt"]');
            ytLinks.forEach(el => el.href = kontakInfo.yt);
        }
    };

    // Initialize semua data pada page load
    document.addEventListener('DOMContentLoaded', function() {
        loadHeroPhotos();
        loadProfilPhoto();
        loadKontakInfo();
        
        // Load semua unit
        loadPengurusData('ma');
        loadPengurusData('pkbm');
        loadPengurusData('putri');
        loadPengurusData('mts');
    });
})();