/* =========================================================================
   SEG MEN 1: KONFIGURASI UTAMA HALAMAN DEPAN (ID: particles-js)
   Fungsi: Mengatur animasi debu kosmik jaring data spasial pada area Beranda.
========================================================================= */

// Memanggil fungsi library particlesJS untuk menyuntikkan kanvas partikel ke elemen HTML ber-ID "particles-js"
particlesJS("particles-js", {
  
  // Objek utama "particles" untuk mengatur bentuk fisik, jumlah, warna, dan pergerakan debu
  "particles": {
    
    // Blok pengaturan jumlah objek partikel yang melayang di layar
    "number": {
      "value": 50,             // Membatasi jumlah debu maksimal 50 biji saja agar HP pembaca tidak panas/lag
      "density": {
        "enable": true,        // Mengaktifkan kalkulasi kepadatan otomatis berdasarkan luas layar perangkat
        "value_area": 800      // Rumus penyebaran: 50 partikel akan disebar rata setiap luasan ruang 800 piksel
      }
    },
    
    // Blok pengaturan warna partikel debu kosmik
    "color": {
      // Menyimpan 3 variasi warna (Biru Neon, Ungu Spasial, Putih Cerah) yang akan diacak di setiap butiran
      "value": ["#00e5ff", "#4f46e5", "#ffffff"] 
    },
    
    // Blok pengaturan geometri bentuk partikel
    "shape": {
      "type": "circle",        // Memahat cetakan partikel menjadi bentuk bulat/lingkaran debu murni
    },
    
    // Blok pengaturan transparansi (kebeningan) butiran partikel
    "opacity": {
      "value": 0.4,            // Mengunci transparansi maksimal di angka 40% agar teks profil Bos Daus tetap kontras
      "random": true,          // Mengaktifkan efek acak: ada butiran yang terang dan ada yang redup samar (efek bokeh)
      
      // Mengaktifkan animasi kelap-kelip (pulsing) pada transparansi partikel
      "anim": { 
        "enable": true,        // Menghidupkan animasi siklus perubahan kebeningan debu
        "speed": 1.5,          // Kecepatan transisi kelap-kelip debu diatur konstan di angka ritme 1.5
        "opacity_min": 0.1,    // Batas paling redup saat partikel memudar adalah 10% (tidak sampai hilang gaib)
        "sync": false          // Diatur false agar kedipan butiran debu tidak barengan (berkedip bergantian)
      }
    },
    
    // Blok pengaturan diameter ukuran besar-kecilnya butiran partikel
    "size": {
      "value": 3,              // Mengunci ukuran diameter rata-rata butiran debu kosmik di dimensi kecil 3px
      "random": true,          // Mengaktifkan ukuran acak: ada debu yang berukuran mikro dan ada yang sedikit besar
      
      // Mengaktifkan animasi kembang-kempis (bernafas) pada diameter partikel
      "anim": { 
        "enable": true,        // Menghidupkan animasi perubahan dinamis ukuran partikel
        "speed": 2,            // Kecepatan animasi kembang kempis butiran diatur pada tempo sedang skala 2
        "size_min": 0.1,       // Batas ciut paling minimal butiran debu mengecil adalah seukuran 0.1px
        "sync": false          // Diatur false agar setiap butiran membesar dan mengecil secara acak bergantian
      }
    },
    
    // Blok pengaturan jaring-jaring laba-laba penghubung antar data spasial (Line Linked)
    "line_linked": {
      "enable": true,          // DIAKTIFKAN KEMBALI: Menghubungkan butiran debu dengan garis rajutan data spasial
      "distance": 150,         // Jarak jangkauan maksimal antar debu untuk bisa saling menarik garis jaring (150px)
      "color": "#ffffff",      // Tinta rajutan garis jaring diwarnai putih murni bercahaya
      "opacity": 0.2,          // Jaring dibuat super tipis transparan (20%) agar latar belakang tidak terlihat semak
      "width": 1               /* Ketebalan kuas garis jaring pembentuk rasi bintang disetel setipis 1px */
    },
    
    // Blok pengaturan fisika pergerakan gaya kinetik debu kosmik
    "move": {
      "enable": true,          // Menyalakan motor penggerak agar butiran debu bisa berlayar melayang dinamis
      "speed": 2,              // Kecepatan meluncur debu kosmik diatur santai di skala 2 agar terlihat tenang
      "direction": "none",     // Arah terbang bebas ke segala penjuru mata angin (tidak condong ke atas/bawah)
      "random": true,          // Membuat rute arah terbang setiap butiran acak berliku-liku ( Brown Mode )
      "straight": false,       // Diatur false agar butiran bergerak meliuk-liuk lembut (tidak kaku lurus seperti peluru)
      "out_mode": "out",       // Jika butiran terbang menembus batas layar, ia akan keluar (out) dan lahir baru di sisi lain
      "bounce": false,         /* Diatur false agar butiran tidak memantul seperti bola pingpong saat menabrak dinding layar */
    }
  },
  
  // Objek "interactivity" untuk menangkap dan merespons interaksi kursor mouse/jari pengguna di layar canvas
  "interactivity": {
    "detect_on": "canvas",     // Detektor interaksi diikat kuat langsung pada lapisan papan canvas HTML5
    
    // Blok pemicu aksi berdasarkan jenis gerakan kursor (Event Trigger)
    "events": {
      "onhover": { 
        "enable": true,        // Menyalakan radar pengendus kursor mouse saat melintas di atas partikel
        "mode": "grab"         // Mode Grab: Jaring rasi bintang akan otomatis menangkap dan mengikatkan diri ke kursor mouse
      },
      "onclick": { 
        "enable": true,        // Menyalakan fungsi deteksi ketukan klik jari/mouse di layar website
        "mode": "push"         // Mode Push: Setiap Bos Daus klik layar, rasi bintang baru akan lahir mendadak
      },
      "resize": true           // Wajib true: Mengatur ulang formasi partikel jika orientasi layar HP diputar/dibalik
    },
    
    // Blok rincian teknis dari masing-masing mode interaksi di atas
    "modes": {
      "grab": {
        "distance": 140,       // Batas radius magnet penarik jaring kursor disetel sejauh 140px
        "line_linked": {
          "opacity": 0.8       // Ketika kursor mendekat, garis jaring spasial mengeras menebal jelas jadi 80% pekat
        }
      },
      "push": {
        "particles_nb": 3      // Menetapkan jumlah angka kelahiran debu kosmik baru sebanyak 3 biji sekali klik
      }
    }
  },
  
  "retina_detect": true        // Mengaktifkan dukungan resolusi layar tajam (Retina/DPI Tinggi) agar debu tidak pecah
});


/* =========================================================================
   SEG MEN 2: KONFIGURASI SEG MEN PENDIDIKAN (ID: particles-js-education)
   Fungsi: Mengatur background partikel untuk area alur garis waktu sekolah.
========================================================================= */

// Menginisialisasi instansi partikel kedua khusus untuk area ID "particles-js-education"
particlesJS("particles-js-education", {
  "particles": {
    "number": {
      "value": 50,             // Membatasi populasi debu 50 biji untuk menjaga efisiensi RAM handphone
      "density": { "enable": true, "value_area": 800 }
    },
    "color": {
      "value": ["#00e5ff", "#4f46e5", "#ffffff"] 
    },
    "shape": {
      "type": "circle",
    },
    "opacity": {
      "value": 0.4,            // Kebeningan diatur 40% agar tulisan SMP/SMA/UMB Bos Daus terbaca tajam
      "random": true, 
      "anim": { 
        "enable": true, 
        "speed": 1.5, 
        "opacity_min": 0.1, 
        "sync": false 
      }
    },
    "size": {
      "value": 3,              // Diameter butiran debu rasi 3px agar proporsional di balik garis kelok neon
      "random": true, 
      "anim": { 
        "enable": true, 
        "speed": 2, 
        "size_min": 0.1, 
        "sync": false 
      }
    },
    "line_linked": {
      "enable": true,          // DIAKTIFKAN KEMBALI: Menghubungkan debu membentuk rasi bintang di area pendidikan
      "distance": 150,
      "color": "#ffffff",
      "opacity": 0.2, 
      "width": 1
    },
    "move": {
      "enable": true,
      "speed": 2,              // Kecepatan konstan skala 2 membuat pergerakan terasa tenang mengalir
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
      "onhover": { 
        "enable": true, 
        "mode": "grab"         // Mengaktifkan jaring rasi bintang menangkap kursor mouse pengunjung
      },
      "onclick": { 
        "enable": true, 
        "mode": "push"         // Menambah 3 butiran debu baru saat area pendidikan diklik
      },
      "resize": true
    },
    "modes": {
      "grab": {
        "distance": 140,
        "line_linked": {
          "opacity": 0.8
        }
      },
      "push": {
        "particles_nb": 3
      }
    }
  },
  "retina_detect": true
});


/* =========================================================================
   SEG MEN 3: KONFIGURASI SEG MEN KEAHLIAN (ID: particles-js-skill)
   Fungsi: Mengatur efek partikel di belakang barisan kotak keahlian/layanan teknis Bos Daus.
========================================================================= */

// Menginisialisasi instansi partikel ketiga khusus untuk area ID "particles-js-skill"
particlesJS("particles-js-skill", {
  "particles": {
    "number": {
      "value": 50,             // Populasi partikel dijaga di angka 50 biji demi kelancaran proses rendering browser
      "density": { "enable": true, "value_area": 800 }
    },
    "color": {
      "value": ["#00e5ff", "#4f46e5", "#ffffff"] 
    },
    "shape": {
      "type": "circle",
    },
    "opacity": {
      "value": 0.4,            // Transparansi 40% menjaga kotak keahlian tetap estetik mengambang di atas background
      "random": true, 
      "anim": { 
        "enable": true, 
        "speed": 1.5, 
        "opacity_min": 0.1, 
        "sync": false 
      }
    },
    "size": {
      "value": 3,              // Butiran debu mini 3px berkedip anggun di balik detail card
      "random": true, 
      "anim": { 
        "enable": true, 
        "speed": 2, 
        "size_min": 0.1, 
        "sync": false 
      }
    },
    "line_linked": {
      "enable": true,          // DIAKTIFKAN KEMBALI: Memberikan visual jaring konektivitas keahlian spasial
      "distance": 150,
      "color": "#ffffff",
      "opacity": 0.2, 
      "width": 1
    },
    "move": {
      "enable": true,
      "speed": 2,              // Kecepatan laju pelan skala 2 berlayar beriringan di balik layar komputer
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
      "onhover": { 
        "enable": true, 
        "mode": "grab"         // Garis jaring data menyambar kursor saat melewati area kotak keahlian
      },
      "onclick": { 
        "enable": true, 
        "mode": "push"         // Menyemburkan 3 partikel tambahan setiap ketukan layar di area skill
      },
      "resize": true
    },
    "modes": {
      "grab": {
        "distance": 140,
        "line_linked": {
          "opacity": 0.8
        }
      },
      "push": {
        "particles_nb": 3
      }
    }
  },
  "retina_detect": true
});


/* =========================================================================
   SEG MEN 4: KONFIGURASI SEG MEN RIWAYAT KOLABORASI (ID: particles-js-riwayatkolaborasi)
   Fungsi: Mengatur latar rasi bintang khusus pada tumpukan dinding logo perusahaan klien.
========================================= */

// Menginisialisasi instansi partikel terakhir khusus untuk area ID "particles-js-riwayatkolaborasi"
particlesJS("particles-js-riwayatkolaborasi", {
  "particles": {
    "number": {
      "value": 50,             // Populasi tetap dikunci 50 butir demi menghemat baterai HP pembuka portofolio
      "density": { "enable": true, "value_area": 800 }
    },
    "color": {
      "value": ["#00e5ff", "#4f46e5", "#ffffff"] 
    },
    "shape": {
      "type": "circle",
    },
    "opacity": {
      "value": 0.4,            // Transparansi tipis 40% membuat deretan logo perusahaan putih pekat terlihat menonjol
      "random": true, 
      "anim": { 
        "enable": true, 
        "speed": 1.5, 
        "opacity_min": 0.1, 
        "sync": false 
      }
    },
    "size": {
      "value": 3,              // Butiran halus berukuran 3px melayang di sela-sela logo instansi kementerian/klien
      "random": true, 
      "anim": { 
        "enable": true, 
        "speed": 2, 
        "size_min": 0.1, 
        "sync": false 
      }
    },
    "line_linked": {
      "enable": true,          // DIAKTIFKAN KEMBALI: Menghubungkan debu membentuk jaring relasi kolaborasi kerja
      "distance": 150,
      "color": "#ffffff",
      "opacity": 0.2, 
      "width": 1
    },
    "move": {
      "enable": true,
      "speed": 2,              // Kecepatan kinetik konstan skala 2 menjaga ritme ketenangan web
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
      "onhover": { 
        "enable": true, 
        "mode": "grab"         // Garis rajutan rasi bintang merespons geseran mouse pengunjung dengan lincah
      },
      "onclick": { 
        "enable": true, 
        "mode": "push"         // Melahirkan 3 butir debu kosmik tambahan saat dinding kolaborasi diketuk jari
      },
      "resize": true
    },
    "modes": {
      "grab": {
        "distance": 140,
        "line_linked": {
          "opacity": 0.8
        }
      },
      "push": {
        "particles_nb": 3
      }
    }
  },
  "retina_detect": true
});