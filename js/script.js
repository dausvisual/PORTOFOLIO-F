// Ambil elemen yang diperlukan
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

// Fungsi untuk menangani scroll
window.onscroll = () => {
    // Highlight navbar link yang sesuai dengan section yang sedang dilihat
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        }
    });

    // Cek visibilitas section untuk animasi fade-in
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const sectionBottom = section.getBoundingClientRect().bottom;

        if (sectionTop < window.innerHeight * 0.75 && sectionBottom > 0) {
            section.classList.add('visible');
        } else {
            section.classList.remove('visible');
        }
    });

    // Tampilkan atau sembunyikan tombol scroll-to-top
    if (window.scrollY > 60) {
        document.querySelector('#scroll-top').classList.add('active');
    } else {
        document.querySelector('#scroll-top').classList.remove('active');
    }
};

// Fungsi untuk toggle menu icon (hamburger menu)
menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

// Fungsi untuk smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Fungsi untuk menangani form kontak
document.getElementById('contact-form').addEventListener('submit', function (e) {
    e.preventDefault();
    emailjs.init("user_TTDmetQLYgWCLzHTDgqxm"); // Ganti dengan User ID EmailJS Anda

    emailjs.sendForm('contact_service', 'template_contact', '#contact-form')
        .then(function (response) {
            console.log('SUCCESS!', response.status, response.text);
            alert("Pesan berhasil dikirim!");
            document.getElementById("contact-form").reset();
        }, function (error) {
            console.log('FAILED...', error);
            alert("Pesan gagal dikirim. Silakan coba lagi.");
        });
});

// Fungsi untuk animasi teks (Typed.js)
const typed = new Typed(".text-animation span", {
    strings: ["Drone Pilot", "Web Designer", "Graphic Designer", "Surveyor", "Freelance Foto & Videographer"],
    typeSpeed: 100,
    backSpeed: 50,
    loop: true
});

// Fungsi untuk menangani perubahan bahasa
const translations = {
    en: {
        home: "Home",
        about: "About",
        skills: "Skills",
        education: "Education",
        work: "Work",
        experience: "Experience",
        contact: "Contact",
        greeting: "Hi There, I'm Firdaus Ikram",
        description: "I am into <span class='typing-text'></span>",
        aboutMe: "About Me",
        myEducation: "My Education",
        getInTouch: "Get in Touch"
    },
    id: {
        home: "Beranda",
        about: "Tentang",
        skills: "Keahlian",
        education: "Pendidikan",
        work: "Pekerjaan",
        experience: "Pengalaman",
        contact: "Kontak",
        greeting: "Halo, Saya Firdaus Ikram",
        description: "Saya tertarik pada <span class='typing-text'></span>",
        aboutMe: "Tentang Saya",
        myEducation: "Pendidikan Saya",
        getInTouch: "Hubungi Saya"
    }
};

function changeLanguage(lang) {
    document.querySelector('a[href="#home"]').textContent = translations[lang].home;
    document.querySelector('a[href="#about"]').textContent = translations[lang].about;
    document.querySelector('a[href="#skills"]').textContent = translations[lang].skills;
    document.querySelector('a[href="#education"]').textContent = translations[lang].education;
    document.querySelector('a[href="#work"]').textContent = translations[lang].work;
    document.querySelector('a[href="#experience"]').textContent = translations[lang].experience;
    document.querySelector('a[href="#contact"]').textContent = translations[lang].contact;
    document.querySelector('.home-content h1').textContent = translations[lang].greeting;
    document.querySelector('.about .heading').textContent = translations[lang].aboutMe;
    document.querySelector('.education .heading').textContent = translations[lang].myEducation;
    document.querySelector('.contact .heading').textContent = translations[lang].getInTouch;
}

// Event listener untuk dropdown bahasa
document.getElementById("languageSwitcher").addEventListener("change", function () {
    changeLanguage(this.value);
});

// Set default bahasa saat halaman pertama kali dimuat
document.addEventListener("DOMContentLoaded", function () {
    changeLanguage("en"); // Ubah ke "id" jika ingin Bahasa Indonesia sebagai default
});

// Fungsi untuk menangani loading screen
window.addEventListener('load', function () {
    const loading = document.getElementById('loading');
    loading.style.display = 'none';
});

// Fungsi untuk menonaktifkan developer mode
document.onkeydown = function (e) {
    if (e.keyCode == 123 || // F12
        (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) || // Ctrl + Shift + I
        (e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) || // Ctrl + Shift + C
        (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) || // Ctrl + Shift + J
        (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0))) { // Ctrl + U
        return false;
    }
};

// Scroll Reveal Animations
const srtop = ScrollReveal({
    origin: 'top',
    distance: '80px',
    duration: 1000,
    reset: true
});

srtop.reveal('.home-content, .services, .projects, .testimonials, .contact', {
    delay: 300,
    distance: '50px',
    origin: 'bottom',
    interval: 200
});