/* =========================================================================
   SEGMEN 1: INFORMASI LISENSI
   Fungsi: Menampilkan hak cipta dan lisensi resmi dari pembuat ScrollReveal.
========================================================================= */
/*! @license ScrollReveal v4.0.9
    Copyright 2021 Fisssion LLC.
    Licensed under the GNU General Public License 3.0 for
    compatible open source projects and non-commercial use.
    For commercial sites, themes, projects, and applications,
    keep your source code private/proprietary by purchasing
    a commercial license from https://scrollrevealjs.org/
*/

/* =========================================================================
   SEGMEN 2: UMD (Universal Module Definition) WRAPPER
   Fungsi: Memastikan script ini bisa berjalan di berbagai environment (Node.js, AMD, atau Browser biasa).
========================================================================= */
(function (global, factory) {
    // Mengecek apakah environment mendukung modul 'exports' (seperti Node.js/CommonJS)
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    // Mengecek apakah environment menggunakan AMD (Asynchronous Module Definition seperti RequireJS)
    typeof define === 'function' && define.amd ? define(factory) :
    // Jika keduanya tidak ada, pasang ScrollReveal langsung ke objek global (window di browser)
    (global = global || self, global.ScrollReveal = factory());
}(this, function () { 
    'use strict'; // Mengaktifkan mode ketat JavaScript agar kode lebih aman dari error tersembunyi

    /* =========================================================================
       SEGMEN 3: PENGATURAN DEFAULT (DEFAULTS)
       Fungsi: Berisi nilai-nilai standar jika pengguna tidak memasukkan opsi custom.
    ========================================================================= */
    var defaults = {
        delay: 0,                               // Waktu tunda sebelum animasi dimulai (dalam milidetik)
        distance: '0',                          // Jarak pergerakan elemen saat animasi muncul
        duration: 600,                          // Lama waktu animasi berjalan (600ms)
        easing: 'cubic-bezier(0.5, 0, 0, 1)',   // Gaya transisi/percepatan animasi (halus di akhir)
        interval: 0,                            // Jarak waktu antar elemen jika dianimasikan berurutan (sequence)
        opacity: 0,                             // Tingkat kebeningan awal elemen (0 = hilang/transparan)
        origin: 'bottom',                       // Arah datangnya elemen (dari bawah)
        rotate: {                               // Pengaturan rotasi 3D elemen saat muncul
            x: 0,                               // Rotasi sumbu X awal
            y: 0,                               // Rotasi sumbu Y awal
            z: 0                                // Rotasi sumbu Z awal
        },
        scale: 1,                               // Skala ukuran awal elemen (1 = ukuran normal)
        cleanup: false,                         // Apakah gaya animasi dihapus setelah selesai (default false)
        container: document.documentElement,    // Elemen pembungkus tempat scroll dipantau (default seluruh dokumen HTML)
        desktop: true,                          // Apakah animasi diaktifkan di perangkat Desktop
        mobile: true,                           // Apakah animasi diaktifkan di perangkat Mobile (HP)
        reset: false,                           // Apakah animasi diulang ketika elemen di-scroll keluar lalu masuk lagi
        useDelay: 'always',                     // Kapan delay digunakan ('always', 'once', 'onload')
        viewFactor: 0.0,                        // Berapa persen elemen harus terlihat di layar sebelum animasi terpicu
        viewOffset: {                           // Margin semu tambahan untuk mendeteksi visibilitas elemen
            top: 0,                             // Offset batas atas
            right: 0,                           // Offset batas kanan
            bottom: 0,                          // Offset batas bawah
            left: 0                             // Offset batas kiri
        },
        afterReset: function afterReset() {},   // Fungsi kosong yang akan dipanggil SETELAH elemen di-reset
        afterReveal: function afterReveal() {}, // Fungsi kosong yang dipanggil SETELAH elemen selesai muncul
        beforeReset: function beforeReset() {}, // Fungsi kosong yang dipanggil SEBELUM elemen di-reset
        beforeReveal: function beforeReveal() {}// Fungsi kosong yang dipanggil SEBELUM elemen mulai muncul
    };

    /* =========================================================================
       SEGMEN 4: FUNGSI STATUS MOUNTING (SUCCESS / FAILURE)
       Fungsi: Menangani status apakah browser mendukung library ini atau tidak.
    ========================================================================= */
    function failure() {
        // Menghapus class 'sr' dari tag <html> jika inisialisasi gagal/browser tidak mendukung
        document.documentElement.classList.remove('sr');

        // Mengembalikan objek fungsi-fungsi kosong (noop/no-operation) agar web tidak error walau gagal
        return {
            clean: function clean() {},         // Fungsi kosong untuk clean
            destroy: function destroy() {},     // Fungsi kosong untuk destroy
            reveal: function reveal() {},       // Fungsi kosong untuk reveal
            sync: function sync() {},           // Fungsi kosong untuk sync
            get noop() {                        // Getter yang menandakan bahwa ini adalah mode no-op
                return true;                    // Selalu kembalikan true
            }
        };
    }

    function success() {
        // Menambahkan class 'sr' ke tag <html> sebagai penanda ScrollReveal aktif
        document.documentElement.classList.add('sr');

        // Jika tag <body> sudah tersedia di HTML
        if (document.body) {
            document.body.style.height = '100%'; // Pastikan tinggi body minimal 100% untuk kalkulasi scroll
        } else {
            // Jika belum tersedia, tunggu sampai seluruh elemen DOM HTML selesai dimuat
            document.addEventListener('DOMContentLoaded', function () {
                document.body.style.height = '100%'; // Baru setel tingginya menjadi 100%
            });
        }
    }

    // Mengumpulkan fungsi success dan failure ke dalam satu variabel objek 'mount'
    var mount = { success: success, failure: failure };

    /* =========================================================================
       SEGMEN 5: UTILITAS DOM DAN ARRAY (Tealight & Pengecekan Node)
       Fungsi: Membantu memilih elemen HTML dan mengubahnya menjadi Array murni.
    ========================================================================= */
    
    // Fungsi untuk memastikan apakah sebuah variabel (x) adalah Elemen DOM murni
    function isDomNode(x) {
        return typeof window.Node === 'object'  // Cek apakah browser mendukung objek Node
            ? x instanceof window.Node          // Jika ya, pastikan x adalah instance dari Node
            : x !== null &&                     // Jika tidak, gunakan metode manual: pastikan tidak null
              typeof x === 'object' &&          // Pastikan x adalah objek
              typeof x.nodeType === 'number' && // Pastikan memiliki angka nodeType
              typeof x.nodeName === 'string';   // Pastikan memiliki nama node bertipe string
    }

    // Fungsi untuk memastikan apakah sebuah variabel (x) adalah kumpulan/NodeList elemen DOM
    function isDomNodeList(x) {
        var prototypeToString = Object.prototype.toString.call(x);       // Ambil tipe objek dalam bentuk string
        var regex = /^\[object (HTMLCollection|NodeList|Object)\]$/;     // Pola regex untuk mendeteksi daftar elemen

        return typeof window.NodeList === 'object' // Cek apakah browser mengenali NodeList
            ? x instanceof window.NodeList         // Jika ya, pastikan x adalah NodeList
            : x !== null &&                        // Jika tidak, cek manual
              typeof x === 'object' &&             // Harus objek
              typeof x.length === 'number' &&      // Harus punya panjang (length)
              regex.test(prototypeToString) &&     // Harus cocok dengan regex di atas
              (x.length === 0 || isDomNode(x[0])); // Isinya harus kosong atau minimal elemen pertamanya adalah DOM Node
    }

    // Library Tealight terintegrasi: Mengubah berbagai input (string/NodeList) menjadi Array elemen DOM
    function tealight(target, context) {
        if ( context === void 0 ) { context = document; } // Jika context tidak diisi, gunakan document secara default

        if (target instanceof Array) { return target.filter(isDomNode); } // Jika sudah array, filter hanya DOM Node saja
        if (isDomNode(target)) { return [target]; }                       // Jika 1 DOM Node, masukkan ke dalam array
        if (isDomNodeList(target)) { return Array.prototype.slice.call(target); } // Jika NodeList, konversi jadi Array murni
        if (typeof target === "string") {                                 // Jika string (seperti class/id css)
            try {
                var query = context.querySelectorAll(target);             // Cari elemen HTML menggunakan querySelectorAll
                return Array.prototype.slice.call(query);                 // Konversi hasil pencarian menjadi Array
            } catch (err) {
                return [];                                                // Jika error (query tidak valid), kembalikan array kosong
            }
        }
        return [];                                                        // Jika format tidak dikenali, kembalikan array kosong
    }

    // Fungsi untuk memastikan variabel adalah objek murni (literal {} )
    function isObject(x) {
        return (
            x !== null &&                                                 // Tidak boleh null
            x instanceof Object &&                                        // Harus instance dari Object
            (x.constructor === Object ||                                  // Konstruktornya harus Object murni
                Object.prototype.toString.call(x) === '[object Object]')  // String representasinya harus [object Object]
        );
    }

    // Fungsi perulangan serbaguna (mendukung array maupun objek)
    function each(collection, callback) {
        if (isObject(collection)) {                                       // Jika yang di-loop adalah objek literal
            var keys = Object.keys(collection);                           // Ambil seluruh kunci (keys) objeknya
            // Lakukan iterasi pada setiap key, jalankan callback dengan membawa nilai, key, dan objek aslinya
            return keys.forEach(function (key) { return callback(collection[key], key, collection); });
        }
        if (collection instanceof Array) {                                // Jika yang di-loop adalah Array
            // Gunakan metode forEach bawaan Array untuk menjalankan callback
            return collection.forEach(function (item, i) { return callback(item, i, collection); });
        }
        // Jika format data salah, lemparkan pesan error
        throw new TypeError('Expected either an array or object literal.');
    }

    // Fungsi pencatat pesan (Logger) khusus untuk menampilkan peringatan di konsol browser
    function logger(message) {
        var details = [], len = arguments.length - 1;                     // Siapkan tempat penampung argumen ekstra
        while ( len-- > 0 ) details[ len ] = arguments[ len + 1 ];        // Ekstrak sisa parameter ke dalam array 'details'

        if (this.constructor.debug && console) {                          // Cek apakah mode 'debug' aktif dan console tersedia
            var report = "%cScrollReveal: " + message;                    // Buat format pesan pembuka
            // Gabungkan setiap detail pesan ke baris baru
            details.forEach(function (detail) { return (report += "\n — " + detail); });
            console.log(report, 'color: #ea654b;');                       // Cetak ke konsol browser dengan warna merah/oranye
        }
    }

    /* =========================================================================
       SEGMEN 6: MANAJEMEN DATA & PEMBERSIHAN (Rinse)
       Fungsi: Membuang elemen atau data sisa yang sudah tidak terpakai dari memori.
    ========================================================================= */
    function rinse() {
        var this$1 = this; // Menyimpan referensi 'this' (ScrollReveal) agar bisa diakses di fungsi dalam (closure)

        // Membuat fungsi pencetak kerangka data (struktur array aktif dan kadaluarsa/stale)
        var struct = function () { return ({
            active: [], // Menampung ID yang masih dipakai
            stale: []   // Menampung ID yang sudah tidak dipakai (usang)
        }); };

        var elementIds = struct();   // Buat struktur ID untuk Elemen
        var sequenceIds = struct();  // Buat struktur ID untuk Animasi berurutan (Sequence)
        var containerIds = struct(); // Buat struktur ID untuk Pembungkus (Container)

        try { // Mencoba mendata seluruh elemen yang memiliki atribut data-sr-id aktif di HTML
            each(tealight('[data-sr-id]'), function (node) {
                var id = parseInt(node.getAttribute('data-sr-id')); // Ambil nilai ID dari elemen HTML
                elementIds.active.push(id);                         // Masukkan ID tersebut ke daftar aktif
            });
        } catch (e) {
            throw e; // Jika gagal memilih, lempar error
        }

        // Mengecek elemen yang ada di memori (store), jika tidak ada di HTML, tandai sebagai 'usang' (stale)
        each(this.store.elements, function (element) {
            if (elementIds.active.indexOf(element.id) === -1) {
                elementIds.stale.push(element.id); // Pindahkan ID ke daftar stale
            }
        });

        // Menghapus semua elemen usang dari memori aplikasi (mencegah memory leak)
        each(elementIds.stale, function (staleId) { return delete this$1.store.elements[staleId]; });

        // Mendata Container (pembungkus) dan Sequence (urutan) dari elemen-elemen yang masih aktif
        each(this.store.elements, function (element) {
            if (containerIds.active.indexOf(element.containerId) === -1) { // Jika ID container belum dicatat
                containerIds.active.push(element.containerId);             // Catat sebagai container aktif
            }
            if (element.hasOwnProperty('sequence')) {                      // Jika elemen ini masuk dalam Sequence
                if (sequenceIds.active.indexOf(element.sequence.id) === -1) { // Jika ID sequence belum dicatat
                    sequenceIds.active.push(element.sequence.id);          // Catat sebagai sequence aktif
                }
            }
        });

        // Mengecek container di memori, apakah ada yang tidak masuk daftar aktif
        each(this.store.containers, function (container) {
            if (containerIds.active.indexOf(container.id) === -1) {
                containerIds.stale.push(container.id); // Jika ada, tandai container itu usang
            }
        });

        // Hapus pendengar event (listener) dari container usang lalu hapus dari memori
        each(containerIds.stale, function (staleId) {
            var stale = this$1.store.containers[staleId].node;    // Ambil elemen DOM containernya
            stale.removeEventListener('scroll', this$1.delegate); // Lepas pantauan scroll
            stale.removeEventListener('resize', this$1.delegate); // Lepas pantauan perubahan ukuran (resize)
            delete this$1.store.containers[staleId];              // Hapus dari penyimpanan internal
        });

        // Mengecek sequence di memori, apakah ada yang tidak masuk daftar aktif
        each(this.store.sequences, function (sequence) {
            if (sequenceIds.active.indexOf(sequence.id) === -1) {
                sequenceIds.stale.push(sequence.id); // Tandai sequence usang
            }
        });

        // Hapus sequence usang dari memori internal
        each(sequenceIds.stale, function (staleId) { return delete this$1.store.sequences[staleId]; });
    }

    /* =========================================================================
       SEGMEN 7: KALKULASI MATEMATIKA TRANSISI (Rematrix)
       Fungsi: Memanipulasi matriks CSS Transform 3D untuk pergerakan elemen.
    ========================================================================= */
    // Mengonversi format matriks CSS pendek (6 nilai) menjadi format panjang 3D (16 nilai)
    function format(source) {
        if (source.constructor !== Array) {                 // Pastikan input adalah Array
            throw new TypeError('Expected array.');         // Tolak jika bukan Array
        }
        if (source.length === 16) {                         // Jika sudah berjumlah 16
            return source;                                  // Kembalikan langsung (sudah Matrix 3D)
        }
        if (source.length === 6) {                          // Jika berjumlah 6 (Matrix 2D)
            var matrix = identity();                        // Buat matriks 3D dasar (identity)
            matrix[0] = source[0];                          // Petakan nilai skala X
            matrix[1] = source[1];                          // Petakan kemiringan (skew) Y
            matrix[4] = source[2];                          // Petakan kemiringan (skew) X
            matrix[5] = source[3];                          // Petakan nilai skala Y
            matrix[12] = source[4];                         // Petakan perpindahan (Translate) X
            matrix[13] = source[5];                         // Petakan perpindahan (Translate) Y
            return matrix;                                  // Kembalikan hasil konversi 16 nilai
        }
        throw new RangeError('Expected array with either 6 or 16 values.'); // Tolak format panjang yang salah
    }

    // Mengembalikan Matriks Dasar 4x4 (Identity Matrix) - ibarat angka 1 dalam perkalian
    function identity() {
        var matrix = [];                                    // Penampung matriks kosong
        for (var i = 0; i < 16; i++) {                      // Looping 16 kali
            i % 5 == 0 ? matrix.push(1) : matrix.push(0);   // Taruh angka 1 di posisi diagonal, selainnya 0
        }
        return matrix;                                      // Kembalikan array berisi 16 angka
    }

    // Mengalikan dua matriks 4x4 untuk menggabungkan efek transformasi (misal: rotasi + translasi)
    function multiply(m, x) {
        var fm = format(m);                                 // Pastikan matriks pertama berformat 16
        var fx = format(x);                                 // Pastikan matriks kedua berformat 16
        var product = [];                                   // Tempat penampung hasil kali

        for (var i = 0; i < 4; i++) {                       // Loop baris 0 s.d 3
            var row = [fm[i], fm[i + 4], fm[i + 8], fm[i + 12]]; // Ambil nilai 1 baris
            for (var j = 0; j < 4; j++) {                   // Loop kolom 0 s.d 3
                var k = j * 4;                              // Indeks offset
                var col = [fx[k], fx[k + 1], fx[k + 2], fx[k + 3]]; // Ambil nilai 1 kolom
                // Rumus dot product (perkalian baris x kolom)
                var result =
                    row[0] * col[0] + row[1] * col[1] + row[2] * col[2] + row[3] * col[3];
                product[i + k] = result;                    // Simpan hasil ke matriks baru
            }
        }
        return product;                                     // Kembalikan matriks gabungan
    }

    // Membaca string CSS Transform dari browser lalu mengubahnya menjadi Array matriks
    function parse(source) {
        if (typeof source === 'string') {                   // Pastikan tipe data input string
            var match = source.match(/matrix(3d)?\(([^)]+)\)/); // Cari pola teks 'matrix(...)' atau 'matrix3d(...)'
            if (match) {                                    // Jika ditemukan
                var raw = match[2].split(', ').map(parseFloat); // Pecah nilai di dalam kurung menjadi Array angka
                return format(raw);                         // Format hasil pecahan menjadi array 16 nilai
            }
        }
        return identity();                                  // Jika gagal parse, kembalikan matriks kosong dasar
    }

    // Mengembalikan matriks putaran 3D di poros X
    function rotateX(angle) {
        var theta = Math.PI / 180 * angle;                  // Konversi derajat ke radian
        var matrix = identity();                            // Buat matriks dasar
        matrix[5] = matrix[10] = Math.cos(theta);           // Atur nilai Cosinus
        matrix[6] = matrix[9] = Math.sin(theta);            // Atur nilai Sinus
        matrix[9] *= -1;                                    // Negatifkan nilai di indeks ke-9
        return matrix;                                      // Kembalikan matriks rotasi X
    }

    // Mengembalikan matriks putaran 3D di poros Y
    function rotateY(angle) {
        var theta = Math.PI / 180 * angle;                  // Konversi derajat ke radian
        var matrix = identity();                            // Buat matriks dasar
        matrix[0] = matrix[10] = Math.cos(theta);           // Atur nilai Cosinus
        matrix[2] = matrix[8] = Math.sin(theta);            // Atur nilai Sinus
        matrix[2] *= -1;                                    // Negatifkan nilai di indeks ke-2
        return matrix;                                      // Kembalikan matriks rotasi Y
    }

    // Mengembalikan matriks putaran 3D di poros Z (Pusing muter seperti jam)
    function rotateZ(angle) {
        var theta = Math.PI / 180 * angle;                  // Konversi derajat ke radian
        var matrix = identity();                            // Buat matriks dasar
        matrix[0] = matrix[5] = Math.cos(theta);            // Atur nilai Cosinus
        matrix[1] = matrix[4] = Math.sin(theta);            // Atur nilai Sinus
        matrix[4] *= -1;                                    // Negatifkan nilai di indeks ke-4
        return matrix;                                      // Kembalikan matriks rotasi Z
    }

    // Mengembalikan matriks penskalaan ukuran (besar/kecil)
    function scale(scalar, scalarY) {
        var matrix = identity();                            // Buat matriks dasar
        matrix[0] = scalar;                                 // Skala sumbu X
        matrix[5] = typeof scalarY === 'number' ? scalarY : scalar; // Skala sumbu Y (jika kosong, samakan dengan X)
        return matrix;                                      // Kembalikan matriks skala
    }

    // Mengembalikan matriks perpindahan titik koordinat di sumbu X (kiri/kanan)
    function translateX(distance) {
        var matrix = identity();                            // Buat matriks dasar
        matrix[12] = distance;                              // Isi indeks perpindahan X
        return matrix;                                      // Kembalikan matriks pindah X
    }

    // Mengembalikan matriks perpindahan titik koordinat di sumbu Y (atas/bawah)
    function translateY(distance) {
        var matrix = identity();                            // Buat matriks dasar
        matrix[13] = distance;                              // Isi indeks perpindahan Y
        return matrix;                                      // Kembalikan matriks pindah Y
    }

    /* =========================================================================
       SEGMEN 8: PEMBUATAN GAYA CSS (COMPUTED STYLE GENERATOR)
       Fungsi: Membaca properti CSS asli elemen, dan menimpanya dengan animasi.
    ========================================================================= */
    
    // Fungsi untuk mendapatkan awalan (Prefix) CSS khusus browser lama (seperti -webkit-)
    var getPrefixedCssProp = (function () {
        var properties = {};                                // Objek penampung memori sementara
        var style = document.documentElement.style;         // Menarik kamus gaya CSS dari peramban

        function getPrefixedCssProperty(name, source) {     // Fungsi utama untuk memeriksa kata properti
            if ( source === void 0 ) source = style;        // Sumber gaya default adalah HTML style

            if (name && typeof name === 'string') {         // Pastikan nama properti valid
                if (properties[name]) {                     // Jika sudah pernah dicari di memori
                    return properties[name];                // Langsung berikan hasilnya (Hemat kinerja)
                }
                if (typeof source[name] === 'string') {     // Cek apakah browser mendukung sintaks asli tanpa prefix
                    return (properties[name] = name);       // Simpan dan kembalikan namanya
                }
                if (typeof source[("-webkit-" + name)] === 'string') { // Jika butuh prefix webkit (contoh safari lama)
                    return (properties[name] = "-webkit-" + name); // Simpan hasil perbaikan
                }
                throw new RangeError(("Unable to find \"" + name + "\" style property.")); // Error jika tidak dukung sama sekali
            }
            throw new TypeError('Expected a string.');      // Error jika tipe data bukan teks
        }

        getPrefixedCssProperty.clearCache = function () { return (properties = {}); }; // Fitur mereset memori

        return getPrefixedCssProperty;                      // Mengembalikan fungsi utuh
    })();

    // Fungsi utama pembentuk instruksi teks Style yang akan disuntik ke elemen
    function style(element) {
        var computed = window.getComputedStyle(element.node); // Tarik rincian CSS sesungguhnya milik elemen tersebut
        var position = computed.position;                   // Simpan posisi CSS-nya (misal: absolute, relative)
        var config = element.config;                        // Ambil opsi kustom milik elemen tersebut

        // -- MENGAMBIL CSS ASLI BAWAAN ELEMEN --
        var inline = {};                                    
        var inlineStyle = element.node.getAttribute('style') || ''; // Tarik teks mentah di atribut <div style="...">
        var inlineMatch = inlineStyle.match(/[\w-]+\s*:\s*[^;]+\s*/gi) || []; // Potong masing-masing deklarasi CSS

        // Gabungkan kembali jadi string rapi tanpa nyangkut
        inline.computed = inlineMatch ? inlineMatch.map(function (m) { return m.trim(); }).join('; ') + ';' : '';

        // Suntikkan gaya 'visibility: visible' secara paksa agar elemen kelihatan saat dianimasikan
        inline.generated = inlineMatch.some(function (m) { return m.match(/visibility\s?:\s?visible/i); })
            ? inline.computed
            : inlineMatch.concat( ['visibility: visible']).map(function (m) { return m.trim(); }).join('; ') + ';';

        // -- MENGHITUNG TINGKAT KEBENINGAN (OPACITY) --
        var computedOpacity = parseFloat(computed.opacity); // Nilai opacity dari CSS aslinya (misal: 1)
        var configOpacity = !isNaN(parseFloat(config.opacity)) // Nilai opacity saat sebelum muncul (titik 0)
            ? parseFloat(config.opacity)
            : parseFloat(computed.opacity);

        var opacity = {
            // Teks instruksi: opacity akhir (bila berbeda dengan start)
            computed: computedOpacity !== configOpacity ? ("opacity: " + computedOpacity + ";") : '',
            // Teks instruksi: opacity awal persembunyian (titik 0)
            generated: computedOpacity !== configOpacity ? ("opacity: " + configOpacity + ";") : ''
        };

        // -- MERACIK PERGERAKAN JURUS (TRANSFORM MATRIX) --
        var transformations = []; // Daftar jurus pergerakan

        if (parseFloat(config.distance)) { // Jika User meminta elemen jalan dari kejauhan tertentu
            // Tentukan apakah jalan dari sumbu Y (atas/bawah) atau sumbu X (kiri/kanan)
            var axis = config.origin === 'top' || config.origin === 'bottom' ? 'Y' : 'X';

            var distance = config.distance; 
            // Balikkan angka jadi minus (-) jika arahnya dari top (atas) atau left (kiri)
            if (config.origin === 'top' || config.origin === 'left') {
                distance = /^-/.test(distance) ? distance.substr(1) : ("-" + distance);
            }

            var ref = distance.match(/(^-?\d+\.?\d?)|(em$|px$|%$)/g); // Pisah antara nominal angka dengan satuannya
            var value = ref[0]; // Angka jarak
            var unit = ref[1];  // Satuan (px, em, %)

            switch (unit) {
                case 'em':
                    distance = parseInt(computed.fontSize) * value; // Konversi ke pixel jika pakai satuan font 'em'
                    break;
                case 'px':
                    distance = value; // Tetap kalau pixel
                    break;
                case '%':
                    // Konversi ukuran persen menggunakan dimensi asli kotak elemen dari bounding client
                    distance = axis === 'Y'
                        ? (element.node.getBoundingClientRect().height * value) / 100
                        : (element.node.getBoundingClientRect().width * value) / 100;
                    break;
                default:
                    throw new RangeError('Unrecognized or missing distance unit.');
            }

            // Daftarkan jurus melayang bergeser sesuai sumbu yang dihitung
            if (axis === 'Y') {
                transformations.push(translateY(distance));
            } else {
                transformations.push(translateX(distance));
            }
        }

        // Daftarkan jurus putar balik badan (Rotasi 3D) jika ada diseting
        if (config.rotate.x) { transformations.push(rotateX(config.rotate.x)); }
        if (config.rotate.y) { transformations.push(rotateY(config.rotate.y)); }
        if (config.rotate.z) { transformations.push(rotateZ(config.rotate.z)); }

        // Daftarkan jurus kembang kempis (Scale)
        if (config.scale !== 1) { // 1 artinya normal
            if (config.scale === 0) {
                // Bug fix browser: Skala nol (0) gak bisa di-transisi, kita akali dengan ukuran ghaib super kecil 0.0002
                transformations.push(scale(0.0002));
            } else {
                transformations.push(scale(config.scale)); // Pakai nilai asli User
            }
        }

        // -- MENGGABUNGKAN SELURUH JURUS KE SATU SERANGAN MATRIKS (COMPOSE) --
        var transform = {};
        if (transformations.length) { // Jika ada daftar transformasi
            transform.property = getPrefixedCssProp('transform'); // Panggil properti browser 'transform'
            
            transform.computed = { // Ambil matriks asli elemen di halaman (kalo ada sisa-sisa CSS transform sebelumnya)
                raw: computed[transform.property],
                matrix: parse(computed[transform.property])
            };

            transformations.unshift(transform.computed.matrix); // Satukan matriks awal ke tumpukan jurus animasi baru
            var product = transformations.reduce(multiply); // Hajar!! Kalikan semua array matriksnya jadi satu matriks akhir!

            transform.generated = { // Render teks CSS-nya
                initial: ((transform.property) + ": matrix3d(" + (product.join(', ')) + ");"), // Gaya saat sembunyi di pojokan
                final: ((transform.property) + ": matrix3d(" + (transform.computed.matrix.join(', ')) + ");") // Gaya sasaran saat selesai muncul
            };
        } else {
            transform.generated = { initial: '', final: '' }; // Kosong jika tidak ada pergerakan spesifik
        }

        // -- MERANGKAI DURASI DAN PENGHALUSAN (TRANSITION) --
        var transition = {};
        if (opacity.generated || transform.generated.initial) { // Jika butuh efek fading atau efek gerak
            transition.property = getPrefixedCssProp('transition'); // Panggil properti 'transition'
            transition.computed = computed[transition.property];    // Tarik nilai gaya bawaan browser
            transition.fragments = [];                              // Penampung instruksi transisi per properti

            var delay = config.delay;       // Durasi nyangkut tunggu (delay)
            var duration = config.duration; // Durasi lamanya jalan (duration)
            var easing = config.easing;     // Pola gaya kelancaran (curve easing)

            if (opacity.generated) { // Jika transisi kebeningan diikutkan
                transition.fragments.push({ // Tambahkan script opacity dengan timing
                    delayed: ("opacity " + (duration / 1000) + "s " + easing + " " + (delay / 1000) + "s"), // Yang nunggu
                    instant: ("opacity " + (duration / 1000) + "s " + easing + " 0s") // Yang nge-gas instan 0 delay
                });
            }

            if (transform.generated.initial) { // Jika transisi perpindahan diikutkan
                transition.fragments.push({ // Tambahkan script transform dengan timing
                    delayed: ((transform.property) + " " + (duration / 1000) + "s " + easing + " " + (delay / 1000) + "s"),
                    instant: ((transform.property) + " " + (duration / 1000) + "s " + easing + " 0s")
                });
            }

            // Jika elemen sudah punya transisi lain (seperti background-color dari custom CSS), jangan dihapus, ditimpa perlahan
            var hasCustomTransition =
                transition.computed && !transition.computed.match(/all 0s|none 0s/);

            if (hasCustomTransition) { // Jika dia emang punya dari CSS aslinya
                transition.fragments.unshift({
                    delayed: transition.computed,
                    instant: transition.computed
                });
            }

            // Menyusun seluruh fragmen teks transisi (menggunakan koma pemisah)
            var composed = transition.fragments.reduce(
                function (composition, fragment, i) {
                    composition.delayed += i === 0 ? fragment.delayed : (", " + (fragment.delayed));
                    composition.instant += i === 0 ? fragment.instant : (", " + (fragment.instant));
                    return composition;
                },
                { delayed: '', instant: '' }
            );

            // Output final deklarasi transisi CSS
            transition.generated = {
                delayed: ((transition.property) + ": " + (composed.delayed) + ";"),
                instant: ((transition.property) + ": " + (composed.instant) + ";")
            };
        } else {
            transition.generated = { delayed: '', instant: '' }; // Kosongkan bila tidak digunakan
        }

        // Kumpulkan semua kalkulasi baju siap pakai untuk elemen ini!
        return {
            inline: inline,
            opacity: opacity,
            position: position,
            transform: transform,
            transition: transition
        };
    }

    // Fungsi pengoles cat CSS ke elemen yang jauh lebih aman (tidak pakai setAttribute yang rawan CSP / block)
    function applyStyle (el, declaration) {
        declaration.split(';').forEach(function (pair) {      // Potong baris deklarasi CSS dari tanda ';'
            var ref = pair.split(':');                        // Belah lagi antara key (kiri titik dua) & value (kanan titik dua)
            var property = ref[0];                            // Nama properti (misal: 'opacity')
            var value = ref.slice(1);                         // Nilai gayanya (misal: '1')
            if (property && value) {                          // Jika keduanya valid
                el.style[property.trim()] = value.join(':');  // Suntikkan via CSSOM Object Model
            }
        });
    }

    /* =========================================================================
       SEGMEN 9: SIKLUS HIDUP ELEMEN (Clean & Destroy)
       Fungsi: Mematikan animasi dan membersihkan DOM seperti semula.
    ========================================================================= */
    function clean(target) {
        var this$1 = this; // Cadangan scope 'this'
        var dirty;         // Bendera untuk menandakan kalau ada yang kotor dan berhasil dicabut

        try { // Mencoba membasmi kutukan animasi dari target yang diminta
            each(tealight(target), function (node) {          // Cari elemennya
                var id = node.getAttribute('data-sr-id');     // Tarik ID saktinya
                if (id !== null) {                            // Kalo dia beneran punya stempel scroll reveal
                    dirty = true;                             // Kibarkan bendera kotor
                    var element = this$1.store.elements[id];  // Tarik profil datanya dari memori pusat
                    if (element.callbackTimer) {              // Kalo timer eventnya masih jalan (lagi transisi)
                        window.clearTimeout(element.callbackTimer.clock); // Patahkan jam pasirnya! Matikan!
                    }
                    applyStyle(element.node, element.styles.inline.generated); // Balikin tampilannya ke baju asli (sebelum dighaibkan)
                    node.removeAttribute('data-sr-id');       // Cabut segel kutukannya dari atribut HTML!
                    delete this$1.store.elements[id];         // Lupakan dia selamanya dari memori panti asuhan ScrollReveal
                }
            });
        } catch (e) {
            return logger.call(this, 'Clean failed.', e.message); // Kalo gagal murtad, lapor konsol
        }

        if (dirty) { // Kalo ada sisa bangkai
            try {
                rinse.call(this); // Mandikan memori sampah pakai fungsi Rinse di atas
            } catch (e) {
                return logger.call(this, 'Clean failed.', e.message);
            }
        }
    }

    // Fungsi Kiamat Sughra: Menggugurkan semua animasi di semua elemen se-website sekaligus
    function destroy() {
        var this$1 = this;

        // Bantai satu per satu baju gaib tiap elemen, balikin ke style HTML kodratnya, cabut id-nya
        each(this.store.elements, function (element) {
            applyStyle(element.node, element.styles.inline.generated);
            element.node.removeAttribute('data-sr-id');
        });

        // Hentikan fungsi telinga mata-mata yang menguping kejadian Scroll / Resize di browser
        each(this.store.containers, function (container) {
            var target = container.node === document.documentElement ? window : container.node;
            target.removeEventListener('scroll', this$1.delegate);
            target.removeEventListener('resize', this$1.delegate);
        });

        // Setel ulang gudang penyimpanan ke awal penciptaan semesta alam (kosong plong)
        this.store = {
            containers: {},
            elements: {},
            history: [],
            sequences: {}
        };
    }

    // Fungsi penyalin objek kustom User ke blueprint Default (Merge Object / Copy Paste bertingkat)
    function deepAssign(target) {
        var sources = [], len = arguments.length - 1;
        while ( len-- > 0 ) sources[ len ] = arguments[ len + 1 ];

        if (isObject(target)) {                                   // Jika target adalah objek murni
            each(sources, function (source) {                     // Looping sumber data yang mau dicangkok
                each(source, function (data, key) {               // Looping isian dalam sumber tersebut
                    if (isObject(data)) {                         // Kalau datanya ternyata bentuk objek juga (bersarang nested)
                        if (!target[key] || !isObject(target[key])) { 
                            target[key] = {};                     // Buat sarang kosong di target
                        }
                        deepAssign(target[key], data);            // Pangil dirinya sendiri (rekursi) agar masuk mencangkok ke kedalaman
                    } else {
                        target[key] = data;                       // Kalo isinya cuma string/angka biasa, timpa langsung nilainya!
                    }
                });
            });
            return target;                                        // Kembalikan objek yang sudah dimutasi
        } else {
            throw new TypeError('Target must be an object literal.'); // Ngamuk kalau target bukan objek
        }
    }

    /* =========================================================================
       SEGMEN 10: SENSOR PERANGKAT & CORE ENGINE TRIGGERS
       Fungsi: Menjalankan eksekusi transisi elemen saat discroll
    ========================================================================= */
    // Mendeteksi apakah Bos Daus lagi buka dari HP/Tablet (Berdasarkan user-agent browser)
    function isMobile(agent) {
        if ( agent === void 0 ) agent = navigator.userAgent;
        return /Android|iPhone|iPad|iPod/i.test(agent); // Mengembalikan true jika mendeteksi OS mobile
    }

    // Pabrik pencetak plat nomor ID acak yang ga bakal kembar
    var nextUniqueId = (function () {
        var uid = 0; // Mulai dari nol
        return function () { return uid++; }; // Setiap dipanggil nambah 1
    })();

    // Mesin penata barisan pertama kali waktu halaman web diloading
    function initialize() {
        var this$1 = this;

        rinse.call(this); // Sapu-sapu bersih debu kotor memori dulu sebelum baris

        each(this.store.elements, function (element) { // Sidak satu per satu anak buah elemen
            var styles = [element.styles.inline.generated]; // Bawa baju standarnya

            if (element.visible) { // Kalo elemennya saat loading awal sudah nongol jelas di depan mata viewport layar
                styles.push(element.styles.opacity.computed);       // Langsung pake baju bening normal
                styles.push(element.styles.transform.generated.final); // Langsung pindah ke posisi finish nangkring!
                element.revealed = true; // Tandai dia udah menetas (revealed)
            } else { // Kalo dia masih ngumpet di bawah scrollan tanah (belum terlihat layar)
                styles.push(element.styles.opacity.generated);          // Pakai baju gaib persembunyian awal
                styles.push(element.styles.transform.generated.initial); // Ngumpet di posisi awal yg tertulis di matriks
                element.revealed = false; // Tandai belum menetas
            }

            // Pakaikan baju yang sudah dipilih ke elemen dengan membuang ruang kosong spasi (filter dan join)
            applyStyle(element.node, styles.filter(function (s) { return s !== ''; }).join(' '));
        });

        each(this.store.containers, function (container) { // Cari wadah pembungkus (misal window/body browser)
            var target = container.node === document.documentElement ? window : container.node;
            target.addEventListener('scroll', this$1.delegate); // Pasangkan alat pendengar scroll!!
            target.addEventListener('resize', this$1.delegate); // Pasangkan alat pendengar putaran layar (HP landscape/portrait)
        });

        this.delegate(); // Pancing panggil satu kali delegasi untuk kalibrasi ukuran luas wilayah dan kordinat scroll

        this.initTimeout = null; // Matikan bendera timer antrean karena inisialisasi sudah kelar!
    }

    // Jenderal Panglima pengendali cuaca pergerakan (Maju animasi atau Mundur mereset)
    function animate(element, force) {
        if ( force === void 0 ) force = {};

        var pristine = force.pristine || this.pristine; // pristine = kondisi perawan alias website belum kena gesekan scroll sama sekali
        // Hitung syarat delay: Kapan delay digunakan (selalu, atau cuma pas pertama kali onload/sekali doang)
        var delayed =
            element.config.useDelay === 'always' ||
            (element.config.useDelay === 'onload' && pristine) ||
            (element.config.useDelay === 'once' && !element.seen);

        // Pertanyaan logis: Haruskah elemen ini nongol bergerak sekarang? (Ya, Jika nampak di layar TAPI statusnya belum nongol)
        var shouldReveal = element.visible && !element.revealed;
        // Pertanyaan logis: Haruskah elemen ini reset mundur sembunyi? (Ya, Jika hilang dari layar TAPI statusnya ngaku masih nongol DAN config opsi reset diizinkan user)
        var shouldReset = !element.visible && element.revealed && element.config.reset;

        if (force.reveal || shouldReveal) { // Jika dipaksa atau emang wajib muncul
            return triggerReveal.call(this, element, delayed); // Beri perintah MUNCUL (Reveal)
        }

        if (force.reset || shouldReset) {   // Jika dipaksa atau wajib sembunyi karena mundur scroll
            return triggerReset.call(this, element); // Beri perintah RESET mundur
        }
    }

    // Jurus Panggilan: Menyuruh satu elemen untuk muncul dengan gaya (Reveal Trigger)
    function triggerReveal(element, delayed) {
        var styles = [ // Siapkan baju jubahnya!
            element.styles.inline.generated, // Baju asli
            element.styles.opacity.computed, // Opacity nyata pekat
            element.styles.transform.generated.final // Posisi sasaran akhir
        ];
        if (delayed) { // Kalau kena delay, kasih gaya CSS animasi numpang telat (delayed)
            styles.push(element.styles.transition.generated.delayed);
        } else {       // Kalau instant, hajar maju tanpa nunggu lama!
            styles.push(element.styles.transition.generated.instant);
        }
        element.revealed = element.seen = true; // Ketok palu! Dia sudah muncul, mata dunia sudah melihatnya!
        applyStyle(element.node, styles.filter(function (s) { return s !== ''; }).join(' ')); // Pakaikan jubah pergerakannya!
        registerCallbacks.call(this, element, delayed); // Jangan lupa bel alarm lapor (callback before/after event)
    }

    // Jurus Penarik: Menyuruh satu elemen untuk mundur membatalkan kemunculannya (Reset Trigger)
    function triggerReset(element) {
        var styles = [ // Siapkan baju malingnya buat ngumpet lagi
            element.styles.inline.generated, // Baju asli
            element.styles.opacity.generated, // Balik ke opacity ghaib/hilang
            element.styles.transform.generated.initial, // Mundur ke kordinat persembunyian awal matriks
            element.styles.transition.generated.instant // Animasi tarik mundur dadakan!
        ];
        element.revealed = false; // Ketok palu: Status jadi perawan ngumpet lagi
        applyStyle(element.node, styles.filter(function (s) { return s !== ''; }).join(' ')); // Eksekusi penyembunyian
        registerCallbacks.call(this, element); // Laporkan panggil callback trigger reset
    }

    // Petugas satpam yang nungguin elemen sampai animasinya kelar buat jalanin fungsi After/Before (Callbacks)
    function registerCallbacks(element, isDelayed) {
        var this$1 = this;

        // Kalkulasi berapa lama kita harus nunggu? Durasi animasi + Waktu delay (kalo ada)
        var duration = isDelayed
            ? element.config.duration + element.config.delay
            : element.config.duration;

        // Ambil fungsi lapor Sebelum Mulai (Before Callback)
        var beforeCallback = element.revealed
            ? element.config.beforeReveal
            : element.config.beforeReset;

        // Ambil fungsi lapor Setelah Selesai (After Callback)
        var afterCallback = element.revealed
            ? element.config.afterReveal
            : element.config.afterReset;

        var elapsed = 0;
        if (element.callbackTimer) { // Kalo elemen ini tadinya lagi sibuk di animasi lain belum kelar
            elapsed = Date.now() - element.callbackTimer.start; // Hitung udah berapa detik jalannya?
            window.clearTimeout(element.callbackTimer.clock);   // Berhentikan timer yang lama
        }

        beforeCallback(element.node); // Jalankan laporan SEBELUM mulai animasi seketika!

        element.callbackTimer = { // Pasang jam alarm baru
            start: Date.now(),    // Waktu mulai adalah Sekarang
            clock: window.setTimeout(function () { // Panggil fungsi di bawah kalo waktunya udah habis
                afterCallback(element.node);       // Teriakkan Laporan AFTER Selesai!
                element.callbackTimer = null;      // Matikan jam
                // Jika elemen udah nongol, dan gak disuruh reset ulang, dan disuruh buang sampah gaya CSS (cleanup)...
                if (element.revealed && !element.config.reset && element.config.cleanup) {
                    clean.call(this$1, element.node); // Sapu bersih jubah transformnya biar DOM HTML bersih tanpa gaya sisa (Clean)
                }
            }, duration - elapsed) // Kurangi durasi total dengan waktu sisa yang udah ditunggu tadi
        };
    }

    /* =========================================================================
       SEGMEN 11: ANIMASI BARISAN BERANTAI (Sequencer Engine)
       Fungsi: Mengatur animasi muncul 1, 2, 3... berurutan bagai efek kaskade ombak (interval)
    ========================================================================= */
    function sequence(element, pristine) {
        if ( pristine === void 0 ) pristine = this.pristine;

        if (!element.visible && element.revealed && element.config.reset) { // Kalo elemennya harus reset..
            return animate.call(this, element, { reset: true }); // Bebaskan aja jangan diantrikan
        }

        var seq = this.store.sequences[element.sequence.id]; // Ambil profil antrean geng/kelompok si elemen
        var i = element.sequence.index;                      // Elemen ini peserta antrean ke berapa?

        if (seq) { // Kalau gerombolan antreannya terdaftar
            var visible = new SequenceModel(seq, 'visible', this.store);    // Cek siapa aja dari gerombolan yang saat ini KELIHATAN di layar
            var revealed = new SequenceModel(seq, 'revealed', this.store);  // Cek siapa aja yang udah MENETAS muncul

            seq.models = { visible: visible, revealed: revealed };

            // Kalo kelompok antrean ini belum ada 1 orang pun yang nongol...
            if (!revealed.body.length) {
                var nextId = seq.members[visible.body[0]];          // Panggil orang pertama yang kelihatan dari urutan gerombolan
                var nextElement = this.store.elements[nextId];

                if (nextElement) {
                    cue.call(this, seq, visible.body[0], -1, pristine); // Kasih isyarat mundur (trigger efek ombak ke depan)
                    cue.call(this, seq, visible.body[0], +1, pristine); // Kasih isyarat maju (trigger efek ombak ke belakang antrean)
                    return animate.call(this, nextElement, { reveal: true, pristine: pristine }); // Hajar suruh orang pertama muncul!
                }
            }

            // Kalo gak disuruh reset, kita ukur indeks indeks kepala dan kakinya untuk memantulkan ombak kaskade sequence
            if (
                !seq.blocked.head &&                               // Jika barisan depan belum terkunci (blocked)
                i === [].concat( revealed.head ).pop() &&          // Elemen ini ada di buntut terluar dari deret yang udah muncul
                i >= [].concat( visible.body ).shift()             // Dan dia di atas dari anggota tubuh kelomok
            ) {
                cue.call(this, seq, i, -1, pristine);              // Antrekan isyarat ke indeks sebelumnya mundur 1 langkah
                return animate.call(this, element, { reveal: true, pristine: pristine });
            }

            if (
                !seq.blocked.foot &&                               // Jika barisan buntut kaki belum terkunci
                i === [].concat( revealed.foot ).shift() &&        // Elemen ini ada di pangkal deret ekor yang udah nongol
                i <= [].concat( visible.body ).pop()
            ) {
                cue.call(this, seq, i, +1, pristine);              // Lanjutkan estafet ombak antrean maju 1 langkah (+1)
                return animate.call(this, element, { reveal: true, pristine: pristine });
            }
        }
    }

    // Konstruktor pembentuk rahim Gerombolan Antrean (Sequence Group)
    function Sequence(interval) {
        var i = Math.abs(interval); // Nilai absolut durasi (gak boleh minus)
        if (!isNaN(i)) {
            this.id = nextUniqueId();     // Beri nomor KTP kelompok antrean 
            this.interval = Math.max(i, 16); // Waktu jeda antar peserta antrean (Minimal dipaksa 16ms/1 frame)
            this.members = [];            // Buku absensi para anggota
            this.models = {};             // Status keberadaan
            this.blocked = {              // Rem/Kunci jalurnya
                head: false,              // Kunci barisan kepala
                foot: false               // Kunci barisan buntut
            };
        } else {
            throw new RangeError('Invalid sequence interval.'); // Error kalo nominal jedanya salah
        }
    }

    // Model pemecah kelompok menjadi Kepala, Tubuh Inti, dan Kaki Buntut
    function SequenceModel(seq, prop, store) {
        var this$1 = this;

        this.head = []; // Barisan Depan
        this.body = []; // Barisan Perut Inti
        this.foot = []; // Barisan Kaki Belakang

        each(seq.members, function (id, index) { // Loop absen seluruh peserta grup
            var element = store.elements[id];
            if (element && element[prop]) {
                this$1.body.push(index);         // Kalau dia masuk kriteria property (misal keliatan/nongol), masukan ke perut
            }
        });

        if (this.body.length) {                  // Kalo isi perut ada isinya...
            each(seq.members, function (id, index) {
                var element = store.elements[id];
                if (element && !element[prop]) {
                    if (index < this$1.body[0]) {
                        this$1.head.push(index); // Anak bawang di atas indeks perut taruh di posisi kepala
                    } else {
                        this$1.foot.push(index); // Sisanya taruh di posisi kaki ekor bawah
                    }
                }
            });
        }
    }

    // Fungsi pengoper tongkat estafet ombak antar anggota gerombolan antrean
    function cue(seq, i, direction, pristine) {
        var this$1 = this;

        var blocked = ['head', null, 'foot'][1 + direction]; // Nentuin mana yang dikunci (Kepala kalo -1, foot kalo +1)
        var nextId = seq.members[i + direction];             // Tarik nomor KTP peserta sebelahnya yang mau disambung
        var nextElement = this.store.elements[nextId];       // Panggil wujud elemennya!

        seq.blocked[blocked] = true; // Gembok jalurnya dulu biar ga nyelonong!

        setTimeout(function () {     // Pasang timer penundaan sebanyak interval config (Jarak kedipan kaskade, ex: 100ms)
            seq.blocked[blocked] = false; // Buka gemboknya
            if (nextElement) {
                sequence.call(this$1, nextElement, pristine); // Jalankan eksekusi estafet ombak kepada elemen penerus!
            }
        }, seq.interval);
    }

    /* =========================================================================
       SEGMEN 12: API FRONT-END / PINTU MASUK USER (Reveal Method)
       Fungsi: Perintah sakti "ScrollReveal().reveal('.elemen', opsi)" yang dipakai Bos Daus
    ========================================================================= */
    function reveal(target, options, syncing) {
        var this$1 = this;
        if ( options === void 0 ) options = {}; // Jika opsi kosong, gunakan objek kosong
        if ( syncing === void 0 ) syncing = false;

        var containerBuffer = [];
        var sequence$$1;
        var interval = options.interval || defaults.interval; // Menarik setingan interval antrean (kaskade)

        try {
            if (interval) {
                sequence$$1 = new Sequence(interval); // Kalo ada interval, pesen 1 tiket kelompok antrean Sequence!
            }

            var nodes = tealight(target); // Cari elemen HTML menggunakan nama class/id yang diketik Bos Daus
            if (!nodes.length) {
                throw new Error('Invalid reveal target.'); // Ngamuk kalo elemen HTML-nya gak ketemu di website!
            }

            // Loop mengelola satu persatu anak elemen yang ketemu
            var elements = nodes.reduce(function (elementBuffer, elementNode) {
                var element = {}; // Penampung calon bayi elemen
                var existingId = elementNode.getAttribute('data-sr-id'); // Cek ada tempelan segel ID lama gak?

                if (existingId) { // Kalo ini barang lama (sebelumnya udah pernah di-reveal)
                    deepAssign(element, this$1.store.elements[existingId]); // Tarik memorinya buat digabung
                    // Lucuti baju matriksnya dan pakaikan kembali ke aslinya sebentar buat ngereset kalkulasi agar akurat
                    applyStyle(element.node, element.styles.inline.computed);
                } else { // Kalo ini barang baru (baru disidak satpol pp reveal)
                    element.id = nextUniqueId(); // Bikin ID stempel baru
                    element.node = elementNode;  // Ikatan batin dengan DOM HTML-nya
                    element.seen = false;        // Belum pernah dilihat manusia
                    element.revealed = false;    // Belum menetas
                    element.visible = false;     // Gaib di luar jangkauan scroll 
                }

                var config = deepAssign({}, element.config || this$1.defaults, options); // Gabungkan semua resep opsi (Bawaan + User)

                // Cek blokir perangkat (Contoh user mematikan reveal di layar HP)
                if ((!config.mobile && isMobile()) || (!config.desktop && !isMobile())) {
                    if (existingId) {
                        clean.call(this$1, element); // Bersihkan sisa sihirnya biar HTML murni natural aja kalo dimatikan
                    }
                    return elementBuffer; // Lewati pembidanan anak ini (skip element disable)
                }

                var containerNode = tealight(config.container)[0]; // Cari badan wadah scrollnya
                if (!containerNode) {
                    throw new Error('Invalid container.');
                }
                if (!containerNode.contains(elementNode)) { // Kalo elemen ada di planet HTML lain di luar container
                    return elementBuffer; // Lewati! 
                }

                var containerId;
                { // Pasangkan wadah container ke KTP anak elemen ini 
                    containerId = getContainerId(
                        containerNode,
                        containerBuffer,
                        this$1.store.containers
                    );
                    if (containerId === null) { // Jika containernya belum terdaftar
                        containerId = nextUniqueId(); // Bikin ID baru wadahnya
                        containerBuffer.push({ id: containerId, node: containerNode });
                    }
                }

                element.config = config; // Simpan opsi setting 
                element.containerId = containerId; // Simpan nomor identitas bapak wadahnya
                element.styles = style(element); // JAHIT! Ukur dan cetak pola matriks gaun pergerakan CSS nya! (Sesuai SEGMEN 8)

                if (sequence$$1) { // Kalo dia termasuk peserta lomba antrean ombak (interval sequence)
                    element.sequence = {
                        id: sequence$$1.id,                // Catat nomor kelompok gengnya
                        index: sequence$$1.members.length  // Dia peserta nomor urut absen keberapa di barisan geng?
                    };
                    sequence$$1.members.push(element.id);  // Cemplungkan KTP elemen ini ke buku absensi panitia gerombolan
                }

                elementBuffer.push(element); // Lolos kualifikasi! Masukin ke daftar panjang kelahiran!
                return elementBuffer;
            }, []);

            // --- BATCHING DOM CHANGES (Pengoptimalan Kecepatan Browser) ---
            // Modifikasi atribut HTML dilakukan belakangan dan dipisah dari pembacaan CSS (getComputedStyle) agar browser gak nge-Lag! (Reflow Layout Thrashing)
            each(elements, function (element) {
                this$1.store.elements[element.id] = element; // Simpan anak elemen ke ingatan mesin pusat utama (Store)
                element.node.setAttribute('data-sr-id', element.id); // Tempel stempel KTP rahasia (data-sr-id) di badannya secara gaib
            });
        } catch (e) {
            return logger.call(this, 'Reveal failed.', e.message); // Kalo gagal, panggil wartawan logger merah konsol
        }

        // Simpan data Bapak Container Wadahnya ke dalam ingatan mesin pusat
        each(containerBuffer, function (container) {
            this$1.store.containers[container.id] = {
                id: container.id,
                node: container.node
            };
        });
        if (sequence$$1) { // Simpan grup antrean Sequence-nya
            this.store.sequences[sequence$$1.id] = sequence$$1;
        }

        // Kalo dipanggil dari pengguna (bukan dipanggil otomatis oleh fungsi sinkronisasi (Sync))
        if (syncing !== true) {
            this.store.history.push({ target: target, options: options }); // Catat sejarah perintah Reveal ke buku riwayat

            if (this.initTimeout) {
                window.clearTimeout(this.initTimeout); // Bersihkan delay inisialisasi tumpang tindih
            }
            // Panggil eksekusi panglima lapangan Initialize dengan delay 0, nunggu stack proses javascript kosong bentar
            this.initTimeout = window.setTimeout(initialize.bind(this), 0); 
        }
    }

    // Tukang parkir yang mencarikan nama KTP (ID) dari seorang Bapak Wadah (Container)
    function getContainerId(node) {
        var collections = [], len = arguments.length - 1;
        while ( len-- > 0 ) collections[ len ] = arguments[ len + 1 ]; // Ekstrak daftar array yang dilempar fungsi

        var id = null;
        each(collections, function (collection) {
            each(collection, function (container) {
                if (id === null && container.node === node) { // Kalau dicocokin wajahnya sama!
                    id = container.id; // Tarik ID-nya!
                }
            });
        });
        return id;
    }

    // Fungsi Refresh Pengecekan (Sync). Sangat berguna kalo website Bos Daus memuat konten AJAX / lazy-load gambar belakangan 
    function sync() {
        var this$1 = this;

        // Baca ulang buku harian memori Reveal masa lalu, eksekusi satu persatu pakai status "sync = true"
        each(this.store.history, function (record) {
            reveal.call(this$1, record.target, record.options, true);
        });

        initialize.call(this); // Atur barisan kembali karena formasi HTML halamannya nambah/berubah akibat injeksi AJAX konten!
    }

    /* =========================================================================
       SEGMEN 13: MESIN PENGUKUR POSISI GEOMETRI & POLYFILLS
       Fungsi: Mengecek detak jantung animasi (FPS) dan lokasi kordinat batas elemen
    ========================================================================= */
    
    // Penambal fungsi jadul buat cari penanda positif/negatif (Math.sign ga disupport IE, jadi di-polyfill-in)
    var polyfill = function (x) { return (x > 0) - (x < 0) || +x; };
    var mathSign = Math.sign || polyfill;

    // Mini RAF (Request Animation Frame) buatan tangan biar animasi super mulus tanpa ngos-ngosan baterainya
    var polyfill$1 = (function () {
        var clock = Date.now(); // Cek jam sekarang

        return function (callback) {
            var currentTime = Date.now();
            if (currentTime - clock > 16) { // Batas bingkai 16ms, biar nyampe resolusi kecepatan dewa layar 60 FPS !!
                clock = currentTime;
                callback(currentTime);      // Tarik pelatuk fungsi render grafis!
            } else {
                setTimeout(function () { return polyfill$1(callback); }, 0); // Kalo belum sampe 16ms, santai tahan nafas bentar
            }
        };
    })();

    // Panggil alat pemacu animasi sejati dari peramban, pake Mini-Raf kalau browsernya butut ketinggalan jaman (fallback)
    var miniraf = window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        polyfill$1;

    // Sang Surveyor Tanah Kordinat: Mengukur tinggi, lebar, dan jarak ubin elemen dari ujung kiri-atas atap jendela peramban
    function getGeometry(target, isContainer) {
        // Buat Container, abaikan bantalan padding & palang scrollbar (Makanya pake clientHeight bukan offsetHeight)
        var height = isContainer ? target.node.clientHeight : target.node.offsetHeight;
        var width = isContainer ? target.node.clientWidth : target.node.offsetWidth;

        var offsetTop = 0;
        var offsetLeft = 0;
        var node = target.node;

        // Meniti anak tangga silsilah kakek moyang pembungkus HTML (offsetParent) buat mengukur jarak murni mutlak sampai pucuk halaman body
        do {
            if (!isNaN(node.offsetTop)) { offsetTop += node.offsetTop; }   // Tambah jarak atap terus
            if (!isNaN(node.offsetLeft)) { offsetLeft += node.offsetLeft; } // Tambah jarak pilar kiri
            node = node.offsetParent; // Naik kasta ke bapaknya elemen
        } while (node);

        return { // Serahkan sertifikat tanah
            bounds: { // Batas ujung jurang peta tanahnya
                top: offsetTop,
                right: offsetLeft + width,
                bottom: offsetTop + height,
                left: offsetLeft
            },
            height: height,
            width: width
        };
    }

    // Mendengarkan berapa meter kedalaman roda scroll mouse udah tergulir
    function getScrolled(container) {
        var top, left;
        if (container.node === document.documentElement) { // Kalo ini jendela utama web (Bukan div khusus kotak scroll overflow)
            top = window.pageYOffset;                      // Cek Y guliran poros roda atas bawah
            left = window.pageXOffset;                     // Cek X guliran kiri kanan
        } else {
            top = container.node.scrollTop;                // Cek scroll atas pembungkus div
            left = container.node.scrollLeft;              // Cek scroll samping pembungkus
        }
        return { top: top, left: left };
    }

    // Mata Elang Sniper: Mengintip apakah kotak batas elemen sudah berpotongan masuk (intersect) nabrak wilayah kotak pandangan layar? 
    function isElementVisible(element) {
        if ( element === void 0 ) element = {};

        var container = this.store.containers[element.containerId]; // Tanya wadah bapaknya
        if (!container) { return; }

        var viewFactor = Math.max(0, Math.min(1, element.config.viewFactor)); // Kunci persentase view factor biar ga aneh-aneh melampaui rentang (0 sampai 1 / 0% ke 100%)
        var viewOffset = element.config.viewOffset; // Tambahan jarak batas jangkauan (biasanya 0)

        // Hitung garis tepi zona batas suci kotak ELEMEN, dikurangi jatah view factornya (elemen kudu keliatan minimal segini badannya biar sah)
        var elementBounds = {
            top: element.geometry.bounds.top + element.geometry.height * viewFactor,
            right: element.geometry.bounds.right - element.geometry.width * viewFactor,
            bottom: element.geometry.bounds.bottom - element.geometry.height * viewFactor,
            left: element.geometry.bounds.left + element.geometry.width * viewFactor
        };

        // Hitung garis tepi zona batas kekuasaan layar WADAH BAPAK (Batas viewport layar) yang ditambah dengan arah scroll rodanya (dunia terus bergerak)
        var containerBounds = {
            top: container.geometry.bounds.top + container.scroll.top + viewOffset.top,
            right: container.geometry.bounds.right + container.scroll.left - viewOffset.right,
            bottom:
                container.geometry.bounds.bottom + container.scroll.top - viewOffset.bottom,
            left: container.geometry.bounds.left + container.scroll.left + viewOffset.left
        };

        return (
            // LOGIKA TABRAKAN (COLLISION DETECTION BBOX): Elemen SUDAH TERLIHAT bila perbatasan tanah mereka tumpang tindih berpotongan masuk ke layar! 
            (elementBounds.top < containerBounds.bottom &&
                elementBounds.right > containerBounds.left &&
                elementBounds.bottom > containerBounds.top &&
                elementBounds.left < containerBounds.right) ||
            // ATAU, posisinya emang di lem (Fixed/lengket) di layar kaca HP Bos Daus alias melayang terus, jadi ya otomatis dihitung selalu terlihat (true) 
            element.styles.position === 'fixed'
        );
    }

    /* =========================================================================
       SEGMEN 14: SAKLAR PELATUK DELEGASI EVENT (The Event Loop)
       Fungsi: Mengelola apa yang terjadi pas scroll roda mouse diputar
    ========================================================================= */
    function delegate(
        event,
        elements
    ) {
        var this$1 = this;
        if ( event === void 0 ) event = { type: 'init' }; // Otomatis disetel "init" awal nyala
        if ( elements === void 0 ) elements = this.store.elements; // Ambil semua elemen

        miniraf(function () { // Pasang di roda gigi Mini-Raf supaya jalannya licin di 60fps layar hp ga nyendat
            var stale = event.type === 'init' || event.type === 'resize'; // stale tandanya kalibrasi ukuran wadah udah basi krn hp diputar miring

            each(this$1.store.containers, function (container) {
                if (stale) { // Kalo kalibrasi usang (stale), ukur ulang surveyor tanah lagi panjang lebarnya!
                    container.geometry = getGeometry.call(this$1, container, true);
                }
                var scroll = getScrolled.call(this$1, container); // Tangkap angka mutlak kedalaman scroll roda mouse!
                if (container.scroll) { // Tentukan kompas arah maju (1) atau mundur (-1) scrollan user!!
                    container.direction = {
                        x: mathSign(scroll.left - container.scroll.left),
                        y: mathSign(scroll.top - container.scroll.top)
                    };
                }
                container.scroll = scroll; // Update posisi jejak langkah kedalaman roda gulir hari ini
            });

            // Update status seluruh warga elemen HTML satu persatu SECARA SERENTAK sebelum eksekusi (menghindari cacat antrean sequence engine)
            each(elements, function (element) {
                if (stale || element.geometry === undefined) {
                    element.geometry = getGeometry.call(this$1, element); // Ukur lokasi kemahnya di kordinat peta DOM
                }
                element.visible = isElementVisible.call(this$1, element); // Cek pake keker sniper elang, apakah sudah masuk ke kamera viewport???
            });

            // Setelah data nasib serentak kekumpul akurat, saatnya mengeksekusi nasib animasi (Nol/mundur/Maju!)
            each(elements, function (element) {
                if (element.sequence) {
                    sequence.call(this$1, element); // Kalo dia tim kelompok nyanyi berantai (kaskade), masuk alur sequencer
                } else {
                    animate.call(this$1, element);  // Kalo serigala pejuang solo karier, lgsg animasi jalan di tempat!!
                }
            });

            this$1.pristine = false; // Bendera pecah telur (Website sudah pernah discroll minimal sekali!)
        });
    }

    // Tukang Cek Spesifikasi HP Kreditan: "Support CSS Transform 3D ngga OS nya??"
    function isTransformSupported() {
        var style = document.documentElement.style;
        return 'transform' in style || 'WebkitTransform' in style;
    }

    // Tukang Cek Spesifikasi Baterai Aki: "Support Transisi perpindahan gaya nggak??"
    function isTransitionSupported() {
        var style = document.documentElement.style;
        return 'transition' in style || 'WebkitTransition' in style;
    }

    var version = "4.0.9"; // Tinta cap stempel versi pabrik

    var boundDelegate; // Ikat fungsi biar scope var "this" gak lepas
    var boundDestroy;
    var boundReveal;
    var boundClean;
    var boundSync;
    var config;
    var debug;
    var instance;

    /* =========================================================================
       SEGMEN 15: PANGKAL MUARA LIBRARY (ScrollReveal Constructor)
       Fungsi: Menyiapkan objek utama (Singleton) yang akan dipanggil oleh pengguna.
    ========================================================================= */
    function ScrollReveal(options) {
        if ( options === void 0 ) options = {}; // Setingan input param dari user

        // Pastikan dipanggil menggunakan kata suci 'new' (Contoh: var sr = new ScrollReveal())
        var invokedWithoutNew =
            typeof this === 'undefined' ||
            Object.getPrototypeOf(this) !== ScrollReveal.prototype;

        if (invokedWithoutNew) {
            return new ScrollReveal(options); // Kalo Bos Daus lupa tulis new, kita tambahin diam diam di belakang layar!
        }

        // Cek dukungan kakek moyang peramban butut (misal IE 8)
        if (!ScrollReveal.isSupported()) {
            logger.call(this, 'Instantiation failed.', 'This browser is not supported.');
            return mount.failure(); // Jatuhkan pelampung gagal No-Op (Anti Web Crash)
        }

        var buffer;
        try {
            // Lebur gabungkan settingan pabrik bawaan dengan settingan request Bos Daus
            buffer = config
                ? deepAssign({}, config, options)
                : deepAssign({}, defaults, options);
        } catch (e) {
            logger.call(this, 'Invalid configuration.', e.message); // Kalo salah ketik, bentak ke konsol
            return mount.failure();
        }

        try {
            // Ambil nama ID container Scrollnya
            var container = tealight(buffer.container)[0];
            if (!container) {
                throw new Error('Invalid container.');
            }
        } catch (e) {
            logger.call(this, e.message);
            return mount.failure();
        }

        config = buffer; // Simpan resep campuran

        // Cek settingan anti HP atau anti Komputer (Matiin animasi berdasarkan devicenya)
        if ((!config.mobile && isMobile()) || (!config.desktop && !isMobile())) {
            logger.call(
                this,
                'This device is disabled.',
                ("desktop: " + (config.desktop)),
                ("mobile: " + (config.mobile))
            );
            return mount.failure(); // Blokir!
        }

        mount.success(); // YEY LULUS SELEKSI! Tempelkan cap class 'sr' ke <html> bapak moyangnya web Bos Daus!

        this.store = { // Siapkan keranjang panti asuhan tempat ngumpulin anak-anak elemen (Singleton State)
            containers: {},
            elements: {},
            history: [],
            sequences: {}
        };

        this.pristine = true; // Set perawan blm kena sentuhan tangan jahil (Scroll)

        // Mengikat (Bind) seluruh fungsi jurus rahasia (Method) ke raga fisik objek Class ini
        boundDelegate = boundDelegate || delegate.bind(this);
        boundDestroy = boundDestroy || destroy.bind(this);
        boundReveal = boundReveal || reveal.bind(this);
        boundClean = boundClean || clean.bind(this);
        boundSync = boundSync || sync.bind(this);

        // Cetak tombol pintasan saklar akses publik API biar bisa dikontrol Bos Daus lewat script eksternalnya
        Object.defineProperty(this, 'delegate', { get: function () { return boundDelegate; } });
        Object.defineProperty(this, 'destroy', { get: function () { return boundDestroy; } });
        Object.defineProperty(this, 'reveal', { get: function () { return boundReveal; } });
        Object.defineProperty(this, 'clean', { get: function () { return boundClean; } });
        Object.defineProperty(this, 'sync', { get: function () { return boundSync; } });

        // Pajang brosur daftar menu dan versi di meja etalase umum
        Object.defineProperty(this, 'defaults', { get: function () { return config; } });
        Object.defineProperty(this, 'version', { get: function () { return version; } });
        Object.defineProperty(this, 'noop', { get: function () { return false; } }); // noop = No Operation = jalan gaib boongan kalo gagal support

        return instance ? instance : (instance = this); // Kalo udah pernah dibentuk di tab itu, return bekasnya aja biar irit memori (Singleton Pattern)
    }

    // Fungsi luar tambahan buat di intip dev lain, ngecek HPnya mendukung ngga!
    ScrollReveal.isSupported = function () { return isTransformSupported() && isTransitionSupported(); };

    // Saklar lampu pijar merah mode Debug untuk para dewa ngoding di konsol!
    Object.defineProperty(ScrollReveal, 'debug', {
        get: function () { return debug || false; },
        set: function (value) { return (debug = typeof value === 'boolean' ? value : debug); }
    });

    ScrollReveal(); // Tembakkan meriam penciptaannya secara mandiri (Self Initialize)

    return ScrollReveal; // Kembalikan jasad perpustakaan ajaib ke penguasa Browser Dunia Nyata!!!

}));