/* =========================================================================
   BAGIAN 1: ANIMASI TEKS MENGETIK OTOMATIS (TYPED.JS) DI BERANDA
========================================================================= */
// Mengecek apakah elemen dengan kelas .text-animation ada di halaman
if (document.querySelector('.text-animation')) {
    // Memulai efek mesin ketik yang menampilkan berbagai keahlian secara bergantian
    var typed = new Typed(".text-animation", {
        strings: ["Urban Planner", "GIS Enthusiast", "Surveyor", "Drone Pilot", "Graphic Designer"],
        typeSpeed: 100, // Kecepatan mengetik teks per huruf (100 ms)
        backSpeed: 50,  // Kecepatan menghapus teks sebelum ganti kata baru (50 ms)
        backDelay: 1000, // Jeda waktu menunggu setelah kata selesai diketik sebelum dihapus (1 detik)
        loop: true // Mengulang animasi ketikan ini tanpa henti (selamanya)
    });
}


/* =========================================================================
   BAGIAN 2: EFEK MUNCUL HALUS SAAT HALAMAN DIGULIR (SCROLL REVEAL)
========================================================================= */
// Menginisialisasi alat efek ScrollReveal dengan pengaturan dasar
const sr = ScrollReveal({
    distance: '60px', // Elemen akan bergeser sejauh 60px sebelum muncul utuh
    duration: 2500,   // Durasi pelan pergerakan memakan waktu 2.5 detik
    delay: 400,       // Jeda waktu sebelum animasi dimulai
    reset: false      // Disetel false agar animasi cuma terjadi sekali (saat pertama dilihat)
});

// Menerapkan efek pudar turun dari atas ke elemen-elemen judul & sapaan
sr.reveal('.home-content h3, .home-content h1, .section-header h2, .section-header h3', { origin: 'top' });

// Menerapkan efek pudar naik dari bawah ke tombol, foto profil, dan teks deskripsi
sr.reveal('.home-content p, .btn-group, .social-icons, .home-img, .about-content', { origin: 'bottom' });

// Menerapkan efek pudar geser dari arah luar kiri untuk elemen-elemen barisan awal
sr.reveal('.about-img-box, .service-box:nth-child(1), .project-card:nth-child(1)', { origin: 'left' });

// Menerapkan efek pudar geser dari arah luar kanan untuk elemen-elemen barisan akhir
sr.reveal('.service-box:last-child, .project-card:last-child, .contact form', { origin: 'right' });


/* =========================================================================
   BAGIAN 3: EFEK KARTU MIRING 3D MELAYANG (VANILLA TILT) PADA FOTO
========================================================================= */
// Menerapkan efek hologram 3D jika kursor mouse melayang di atas foto About Me
VanillaTilt.init(document.querySelectorAll(".about-img-box img"), {
    max: 15,          // Sudut kemiringan maksimal kardus saat diputar
    speed: 400,       // Kecepatan transisi kartu merespons gerakan mouse
    glare: true,      // Menambahkan efek kilap kaca di atas foto
    "max-glare": 0.3, // Intensitas cahaya kilap silau maksimal 30%
});


/* =========================================================================
   BAGIAN 4: LOGIKA POPUP DOWNLOAD CV DAN PENGIRIMAN EMAIL (EMAILJS)
========================================================================= */
document.addEventListener("DOMContentLoaded", function() {
    const cvPopup = document.getElementById('cvPopup'); 
    const openCvBtn = document.getElementById('openCvPopup'); 
    const closeCvBtn = document.querySelector('.close-cv-popup'); 
    const cvForm = document.getElementById('cvForm'); 

    // EVENT 1: Fungsi Membuka Jendela Popup saat Tombol Download CV ditekan
    if (openCvBtn) {
        openCvBtn.addEventListener('click', function(e) {
            e.preventDefault(); 
            cvPopup.classList.add('show'); 
        });
    }

    // EVENT 2: Fungsi Menutup Jendela Popup lewat Tanda Silang (X)
    if (closeCvBtn) {
        closeCvBtn.addEventListener('click', function() {
            cvPopup.classList.remove('show'); 
        });
    }

    // EVENT 3: Fungsi Menutup Jendela saat Area Luar hitam buram diklik
    window.addEventListener('click', function(e) {
        if (e.target === cvPopup) {
            cvPopup.classList.remove('show');
        }
    });

    // Menginisialisasi Kunci (Public Key) EmailJS API milik Bos Daus 
    if (typeof emailjs !== 'undefined') {
        emailjs.init("kxst4R5_oEL4gNZAP");

        // Perintah pengiriman form ke email pengunjung
        if (cvForm) {
            cvForm.addEventListener('submit', function(e) {
                e.preventDefault(); 
                
                const emailInput = document.getElementById('userEmail').value; 
                const submitBtn = cvForm.querySelector('button[type="submit"]'); 
                const originalBtnText = submitBtn.innerText; 
                
                // Ubah status tombol jadi Loading
                submitBtn.innerText = "Mengirim...";
                submitBtn.disabled = true;
                
                const templateParams = {
                    user_email: emailInput
                };

                // Perintah Inti: Menembak Service ID dan Template ID
                emailjs.send("service_di2sbtm", "template_vl7ido2", templateParams)
                    .then(function(response) {
                        alert('Berhasil! Tautan CV telah dikirim ke ' + emailInput);
                        cvPopup.classList.remove('show'); 
                        cvForm.reset(); 
                    }, function(error) {
                        alert('Gagal mengirim email. Periksa koneksi internet Bos Daus.\nError: ' + JSON.stringify(error));
                    })
                    .finally(function() {
                        // Mengembalikan status tombol menjadi normal
                        submitBtn.innerText = originalBtnText;
                        submitBtn.disabled = false;
                    });
            });
        }
    }
});


/* =========================================================================
   BAGIAN 5: LOGIKA SISTEM FILTRASI GRID (LIHAT LEBIH BANYAK)
========================================================================= */
document.addEventListener("DOMContentLoaded", function() {
    const seeMoreBtn = document.getElementById('seeMoreBtn'); // Menangkap tombol See More
    const projectsContainer = document.getElementById('portfolioGrid'); // Menangkap wadah spesifik daftar Proyek

    if (seeMoreBtn && projectsContainer) {
        seeMoreBtn.addEventListener('click', function() {
            // Bergantian melepas/memasang class pelindung "show-all" (pengatur CSS tersembunyi)
            projectsContainer.classList.toggle('show-all');
            
            // Logika If/Else penggantian label tombol
            if (projectsContainer.classList.contains('show-all')) {
                seeMoreBtn.innerHTML = "Sembunyikan <i class='bx bx-chevron-up'></i>"; 
            } else {
                seeMoreBtn.innerHTML = "Lihat Lebih Banyak <i class='bx bx-chevron-down'></i>"; 
                window.location.href = "#projects"; // Memaksa browser meloncat balik ke area judul Portofolio
            }
        });
    }
});


/* =========================================================================
   BAGIAN 6: LOGIKA MENU NAVIGASI MOBILE (HAMBURGER MENU) 
========================================================================= */
document.addEventListener("DOMContentLoaded", function() {
    const menuIcon = document.querySelector('#menu-icon'); 
    const navbar = document.querySelector('.navbar'); 

    if (menuIcon) {
        // Membuka/Menutup menu saat ikon hamburger diklik dengan jari
        menuIcon.addEventListener('click', () => {
            menuIcon.classList.toggle('bx-x'); // Ubah ikon ke Tanda Silang
            navbar.classList.toggle('active');  // Munculkan palet menu
        });
    }

    // Menutup kotak menu navigasi otomatis jika pengguna mulai menggulir layar
    window.addEventListener('scroll', () => {
        if (menuIcon && navbar) {
            menuIcon.classList.remove('bx-x'); 
            navbar.classList.remove('active'); 
        }
    });
});


/* =========================================================================
   BAGIAN 7: KONFIGURASI ENGINE PARTICLES.JS (EFEK DEBU KOSMIK & JARING DATA)
========================================================================= */

// Pastikan library particlesJS terdeteksi dan tidak error sebelum dieksekusi
if (typeof particlesJS !== 'undefined') {

    /* --- SEG MEN 1: KONFIGURASI UTAMA HALAMAN DEPAN (ID: particles-js) --- */
    if (document.getElementById('particles-js')) {
        particlesJS("particles-js", {
          "particles": {
            "number": {
              "value": 50,             // Membatasi jumlah debu maksimal 50 biji saja agar HP tidak panas
              "density": { "enable": true, "value_area": 800 }
            },
            "color": {
              "value": ["#00e5ff", "#4f46e5", "#ffffff"] // Tinta Biru Neon, Ungu Spasial, Putih Cerah
            },
            "shape": { "type": "circle" }, // Cetakan bundar bulat
            "opacity": {
              "value": 0.4,            // Kebeningan maksimal 40%
              "random": true,          // Efek redup-terang acak
              "anim": { "enable": true, "speed": 1.5, "opacity_min": 0.1, "sync": false }
            },
            "size": {
              "value": 3,              // Ukuran butiran debu 3px
              "random": true, 
              "anim": { "enable": true, "speed": 2, "size_min": 0.1, "sync": false }
            },
            "line_linked": {
              "enable": true,          // Jaring penghubung data spasial diaktifkan
              "distance": 150,         // Batas saling terkait 150 piksel
              "color": "#ffffff",
              "opacity": 0.2,          // Setipis bayangan (20%)
              "width": 1 
            },
            "move": {
              "enable": true,
              "speed": 2,              // Laju konstan tenang kecepatan 2
              "direction": "none",
              "random": true,
              "straight": false,
              "out_mode": "out",
              "bounce": false,
            }
          },
          "interactivity": {
            "detect_on": "canvas",
            "events": {
              "onhover": { "enable": true, "mode": "grab" }, // Kursor menangkap jaring
              "onclick": { "enable": true, "mode": "push" }, // Klik melahirkan 3 bintang baru
              "resize": true
            },
            "modes": {
              "grab": { "distance": 140, "line_linked": { "opacity": 0.8 } },
              "push": { "particles_nb": 3 }
            }
          },
          "retina_detect": true
        });
    }

    /* --- SEG MEN 2: KONFIGURASI SEG MEN PENDIDIKAN (ID: particles-js-education) --- */
    if (document.getElementById('particles-js-education')) {
        particlesJS("particles-js-education", {
          "particles": {
            "number": { "value": 50, "density": { "enable": true, "value_area": 800 } },
            "color": { "value": ["#00e5ff", "#4f46e5", "#ffffff"] },
            "shape": { "type": "circle" },
            "opacity": { "value": 0.4, "random": true, "anim": { "enable": true, "speed": 1.5, "opacity_min": 0.1, "sync": false } },
            "size": { "value": 3, "random": true, "anim": { "enable": true, "speed": 2, "size_min": 0.1, "sync": false } },
            "line_linked": { "enable": true, "distance": 150, "color": "#ffffff", "opacity": 0.2, "width": 1 },
            "move": { "enable": true, "speed": 2, "direction": "none", "random": true, "straight": false, "out_mode": "out", "bounce": false }
          },
          "interactivity": {
            "detect_on": "canvas",
            "events": { "onhover": { "enable": true, "mode": "grab" }, "onclick": { "enable": true, "mode": "push" }, "resize": true },
            "modes": { "grab": { "distance": 140, "line_linked": { "opacity": 0.8 } }, "push": { "particles_nb": 3 } }
          },
          "retina_detect": true
        });
    }

    /* --- SEG MEN 3: KONFIGURASI SEG MEN KEAHLIAN (ID: particles-js-skill) --- */
    if (document.getElementById('particles-js-skill')) {
        particlesJS("particles-js-skill", {
          "particles": {
            "number": { "value": 50, "density": { "enable": true, "value_area": 800 } },
            "color": { "value": ["#00e5ff", "#4f46e5", "#ffffff"] },
            "shape": { "type": "circle" },
            "opacity": { "value": 0.4, "random": true, "anim": { "enable": true, "speed": 1.5, "opacity_min": 0.1, "sync": false } },
            "size": { "value": 3, "random": true, "anim": { "enable": true, "speed": 2, "size_min": 0.1, "sync": false } },
            "line_linked": { "enable": true, "distance": 150, "color": "#ffffff", "opacity": 0.2, "width": 1 },
            "move": { "enable": true, "speed": 2, "direction": "none", "random": true, "straight": false, "out_mode": "out", "bounce": false }
          },
          "interactivity": {
            "detect_on": "canvas",
            "events": { "onhover": { "enable": true, "mode": "grab" }, "onclick": { "enable": true, "mode": "push" }, "resize": true },
            "modes": { "grab": { "distance": 140, "line_linked": { "opacity": 0.8 } }, "push": { "particles_nb": 3 } }
          },
          "retina_detect": true
        });
    }

    /* --- SEG MEN 4: KONFIGURASI SEG MEN RIWAYAT KOLABORASI (ID: particles-js-riwayatkolaborasi) --- */
    if (document.getElementById('particles-js-riwayatkolaborasi')) {
        particlesJS("particles-js-riwayatkolaborasi", {
          "particles": {
            "number": { "value": 50, "density": { "enable": true, "value_area": 800 } },
            "color": { "value": ["#00e5ff", "#4f46e5", "#ffffff"] },
            "shape": { "type": "circle" },
            "opacity": { "value": 0.4, "random": true, "anim": { "enable": true, "speed": 1.5, "opacity_min": 0.1, "sync": false } },
            "size": { "value": 3, "random": true, "anim": { "enable": true, "speed": 2, "size_min": 0.1, "sync": false } },
            "line_linked": { "enable": true, "distance": 150, "color": "#ffffff", "opacity": 0.2, "width": 1 },
            "move": { "enable": true, "speed": 2, "direction": "none", "random": true, "straight": false, "out_mode": "out", "bounce": false }
          },
          "interactivity": {
            "detect_on": "canvas",
            "events": { "onhover": { "enable": true, "mode": "grab" }, "onclick": { "enable": true, "mode": "push" }, "resize": true },
            "modes": { "grab": { "distance": 140, "line_linked": { "opacity": 0.8 } }, "push": { "particles_nb": 3 } }
          },
          "retina_detect": true
        });
    }

}