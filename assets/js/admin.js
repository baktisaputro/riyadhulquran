// Admin Panel - admin.js
// Manajemen upload foto dan data pesantren

(function() {
    'use strict';

    // Initialize
    document.addEventListener('DOMContentLoaded', function() {
        loadGallery();
        loadSavedData();
    });

    // ===== Alert Helper =====
    function showAlert(message, type = 'success') {
        const alertContainer = document.getElementById('alert-container');
        const alertHtml = `
            <div class="alert alert-${type} alert-custom alert-dismissible fade show" role="alert">
                <i class="fa-solid fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'} me-2"></i>
                ${message}
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            </div>
        `;
        alertContainer.insertAdjacentHTML('beforeend', alertHtml);
        
        setTimeout(() => {
            const alert = alertContainer.querySelector('.alert');
            if (alert) alert.remove();
        }, 4000);
    }

    // ===== Upload Hero Photo =====
    window.uploadHeroPhoto = function() {
        const fileInput = document.getElementById('hero-upload');
        const heroNumber = document.getElementById('hero-number').value;
        
        if (!fileInput.files[0]) {
            showAlert('Pilih file foto terlebih dahulu', 'danger');
            return;
        }

        const file = fileInput.files[0];
        const reader = new FileReader();

        reader.onload = function(e) {
            const filename = `hero-${heroNumber}.jpg`;
            const imageData = e.target.result;

            // Simpan ke localStorage untuk demo (production: upload ke server)
            localStorage.setItem(`img_${filename}`, imageData);
            
            // Preview
            const preview = document.getElementById('hero-preview');
            preview.innerHTML = `<img src="${imageData}" class="preview-img" alt="Hero ${heroNumber}">`;
            
            showAlert(`Foto hero ${heroNumber} berhasil disimpan!`);
            fileInput.value = '';
        };

        reader.readAsDataURL(file);
    };

    // ===== Upload Profil Photo =====
    window.uploadProfilPhoto = function() {
        const fileInput = document.getElementById('profil-upload');
        
        if (!fileInput.files[0]) {
            showAlert('Pilih file foto terlebih dahulu', 'danger');
            return;
        }

        const file = fileInput.files[0];
        const reader = new FileReader();

        reader.onload = function(e) {
            const filename = 'profil.jpg';
            const imageData = e.target.result;

            localStorage.setItem(`img_${filename}`, imageData);
            
            const preview = document.getElementById('profil-preview');
            preview.innerHTML = `<img src="${imageData}" class="preview-img" alt="Profil">`;
            
            showAlert('Foto profil berhasil disimpan!');
            fileInput.value = '';
        };

        reader.readAsDataURL(file);
    };

    // ===== Save Pengurus MA =====
    window.savePengurusMa = function() {
        const data = {
            kepala: document.getElementById('ma-kepala').value,
            wakil: document.getElementById('ma-wakil').value,
            tahfidz: document.getElementById('ma-tahfidz').value
        };

        if (!data.kepala || !data.wakil || !data.tahfidz) {
            showAlert('Semua field harus diisi', 'danger');
            return;
        }

        localStorage.setItem('pengurus_ma', JSON.stringify(data));
        showAlert('Data pengurus MA berhasil disimpan!');
    };

    // ===== Save Pengurus PKBM =====
    window.savePengurusPkbm = function() {
        const data = {
            ketua: document.getElementById('pkbm-ketua').value,
            sekretaris: document.getElementById('pkbm-sekretaris').value,
            bendahara: document.getElementById('pkbm-bendahara').value
        };

        if (!data.ketua || !data.sekretaris || !data.bendahara) {
            showAlert('Semua field harus diisi', 'danger');
            return;
        }

        localStorage.setItem('pengurus_pkbm', JSON.stringify(data));
        showAlert('Data pengurus PKBM berhasil disimpan!');
    };

    // ===== Save Pengurus Putri =====
    window.savePengurusPutri = function() {
        const data = {
            kepala: document.getElementById('putri-kepala').value,
            tahfidz: document.getElementById('putri-tahfidz').value,
            pembina: document.getElementById('putri-pembina').value
        };

        if (!data.kepala || !data.tahfidz || !data.pembina) {
            showAlert('Semua field harus diisi', 'danger');
            return;
        }

        localStorage.setItem('pengurus_putri', JSON.stringify(data));
        showAlert('Data pengurus Putri berhasil disimpan!');
    };

    // ===== Save Pengurus MTs =====
    window.savePengurusMts = function() {
        const data = {
            kepala: document.getElementById('mts-kepala').value,
            wakil: document.getElementById('mts-wakil').value,
            tahfidz: document.getElementById('mts-tahfidz').value
        };

        if (!data.kepala || !data.wakil || !data.tahfidz) {
            showAlert('Semua field harus diisi', 'danger');
            return;
        }

        localStorage.setItem('pengurus_mts', JSON.stringify(data));
        showAlert('Data pengurus MTs berhasil disimpan!');
    };

    // ===== Save Kontak Info =====
    window.saveKontakInfo = function() {
        const data = {
            wa: document.getElementById('wa-number').value,
            email: document.getElementById('email-pesantren').value,
            fb: document.getElementById('link-fb').value,
            ig: document.getElementById('link-ig').value,
            yt: document.getElementById('link-yt').value
        };

        if (!data.wa || !data.email) {
            showAlert('WhatsApp dan Email harus diisi', 'danger');
            return;
        }

        localStorage.setItem('kontak_info', JSON.stringify(data));
        
        // Update preview
        document.getElementById('preview-wa').textContent = '+62' + data.wa;
        document.getElementById('preview-email').textContent = data.email;
        document.getElementById('preview-socmed').textContent = 
            (data.fb ? '📘 FB ' : '') + 
            (data.ig ? '📷 IG ' : '') + 
            (data.yt ? '🎥 YT' : '');

        showAlert('Informasi kontak berhasil disimpan!');
    };

    // ===== Load Gallery =====
    function loadGallery() {
        const galleryList = document.getElementById('gallery-list');
        const photos = [];

        for (let i = 1; i <= 3; i++) {
            const heroImg = localStorage.getItem(`img_hero-${i}.jpg`);
            if (heroImg) {
                photos.push({
                    name: `hero-${i}.jpg`,
                    data: heroImg,
                    type: 'Hero'
                });
            }
        }

        const profilImg = localStorage.getItem('img_profil.jpg');
        if (profilImg) {
            photos.push({
                name: 'profil.jpg',
                data: profilImg,
                type: 'Profil'
            });
        }

        if (photos.length === 0) {
            galleryList.innerHTML = '<p class="text-muted col-12">Belum ada foto yang diupload</p>';
            return;
        }

        galleryList.innerHTML = photos.map(photo => `
            <div class="col-md-6 col-lg-4 mb-4">
                <div class="card">
                    <img src="${photo.data}" class="card-img-top" alt="${photo.name}" style="height: 200px; object-fit: cover;">
                    <div class="card-body">
                        <p class="card-title mb-2"><strong>${photo.name}</strong></p>
                        <span class="badge bg-primary">${photo.type}</span>
                        <button class="btn btn-sm btn-danger ms-2" onclick="deletePhoto('${photo.name}')">
                            <i class="fa-solid fa-trash me-1"></i> Hapus
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // ===== Delete Photo =====
    window.deletePhoto = function(filename) {
        if (confirm('Yakin ingin menghapus foto ini?')) {
            localStorage.removeItem(`img_${filename}`);
            loadGallery();
            showAlert(`Foto ${filename} berhasil dihapus!`);
        }
    };

    // ===== Load Saved Data =====
    function loadSavedData() {
        // Load Pengurus MA
        const pegurusMa = JSON.parse(localStorage.getItem('pengurus_ma') || '{}');
        if (pegurusMa.kepala) {
            document.getElementById('ma-kepala').value = pegurusMa.kepala;
            document.getElementById('ma-wakil').value = pegurusMa.wakil;
            document.getElementById('ma-tahfidz').value = pegurusMa.tahfidz;
        }

        // Load Pengurus PKBM
        const pegurusPkbm = JSON.parse(localStorage.getItem('pengurus_pkbm') || '{}');
        if (pegurusPkbm.ketua) {
            document.getElementById('pkbm-ketua').value = pegurusPkbm.ketua;
            document.getElementById('pkbm-sekretaris').value = pegurusPkbm.sekretaris;
            document.getElementById('pkbm-bendahara').value = pegurusPkbm.bendahara;
        }

        // Load Pengurus Putri
        const pegurusPutri = JSON.parse(localStorage.getItem('pengurus_putri') || '{}');
        if (pegurusPutri.kepala) {
            document.getElementById('putri-kepala').value = pegurusPutri.kepala;
            document.getElementById('putri-tahfidz').value = pegurusPutri.tahfidz;
            document.getElementById('putri-pembina').value = pegurusPutri.pembina;
        }

        // Load Pengurus MTs
        const pegurusMts = JSON.parse(localStorage.getItem('pengurus_mts') || '{}');
        if (pegurusMts.kepala) {
            document.getElementById('mts-kepala').value = pegurusMts.kepala;
            document.getElementById('mts-wakil').value = pegurusMts.wakil;
            document.getElementById('mts-tahfidz').value = pegurusMts.tahfidz;
        }

        // Load Kontak Info
        const kontakInfo = JSON.parse(localStorage.getItem('kontak_info') || '{}');
        if (kontakInfo.wa) {
            document.getElementById('wa-number').value = kontakInfo.wa;
            document.getElementById('email-pesantren').value = kontakInfo.email;
            document.getElementById('link-fb').value = kontakInfo.fb;
            document.getElementById('link-ig').value = kontakInfo.ig;
            document.getElementById('link-yt').value = kontakInfo.yt;

            document.getElementById('preview-wa').textContent = '+62' + kontakInfo.wa;
            document.getElementById('preview-email').textContent = kontakInfo.email;
            document.getElementById('preview-socmed').textContent = 
                (kontakInfo.fb ? '📘 FB ' : '') + 
                (kontakInfo.ig ? '📷 IG ' : '') + 
                (kontakInfo.yt ? '🎥 YT' : '');
        }

        // Load preview images
        const hero1 = localStorage.getItem('img_hero-1.jpg');
        if (hero1) document.getElementById('hero-preview').innerHTML = `<img src="${hero1}" class="preview-img">`;

        const profil = localStorage.getItem('img_profil.jpg');
        if (profil) document.getElementById('profil-preview').innerHTML = `<img src="${profil}" class="preview-img">`;
    }

})();
