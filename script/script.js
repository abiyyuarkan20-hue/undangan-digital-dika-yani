// ==========================================
// 1. Inisialisasi AOS (Animasi)
// ==========================================
AOS.init({ duration: 1000, once: true });

// ==========================================
// 2. Ambil Nama Tamu dari URL
// ==========================================
const urlParams = new URLSearchParams(window.location.search);
const guest = urlParams.get("to");

if (guest) {
  const guestNameEl = document.getElementById("guestName");
  if (guestNameEl) guestNameEl.innerText = guest;
}

// ==========================================
// 3. Kontrol Buka Undangan & Partikel
// ==========================================
function createParticles() {
  const overlay = document.getElementById("overlay");
  if (!overlay) return;

  const particleCount = 30;
  const colors = ["#ffffff", "#fcf4dd", "#d4af37"];

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    particle.className = "particle";

    const size = Math.random() * 4 + 2 + "px";
    particle.style.width = size;
    particle.style.height = size;
    particle.style.left = Math.random() * 100 + "vw";

    const duration = Math.random() * 4 + 4 + "s";
    particle.style.animation = `fall-particle ${duration} linear infinite`;
    particle.style.animationDelay = Math.random() * 5 + "s";
    particle.style.background =
      colors[Math.floor(Math.random() * colors.length)];

    overlay.appendChild(particle);
  }
}
window.addEventListener("load", createParticles);

function openInvitation() {
  const overlay = document.getElementById("overlay");
  const content = document.querySelector(".overlay-content");
  const wayangLeft = document.querySelector(".wayang-left");
  const wayangRight = document.querySelector(".wayang-right");

  if (content) content.classList.add("zoom-out");

  setTimeout(() => {
    if (wayangLeft) wayangLeft.classList.add("move");
    if (wayangRight) wayangRight.classList.add("move");
  }, 300);

  toggleMusic(true);

  setTimeout(() => {
    if (overlay) {
      overlay.style.opacity = "0";
      overlay.style.pointerEvents = "none";

      setTimeout(() => {
        overlay.style.display = "none";
        document.body.style.overflow = "auto";
        AOS.refresh();
      }, 1000);
    }
  }, 1200);
}

// ==========================================
// 4. Kontrol Musik
// ==========================================
let isPlaying = false;
const bgMusic = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicControl");

function toggleMusic(forcePlay = false) {
  if (!bgMusic || !musicBtn) return;

  if (!isPlaying || forcePlay) {
    bgMusic.play().catch((e) => console.log("Autoplay blocked:", e));
    isPlaying = true;
    musicBtn.classList.add("rotate");
  } else {
    bgMusic.pause();
    isPlaying = false;
    musicBtn.classList.remove("rotate");
  }
}

// ==========================================
// 5. Hitung Mundur (Countdown)
// ==========================================
const weddingDate = new Date("Apr 04, 2026 09:00:00").getTime();

const elDays = document.getElementById("days");
const elHours = document.getElementById("hours");
const elMins = document.getElementById("mins");
const elSecs = document.getElementById("secs");

setInterval(() => {
  const now = new Date().getTime();
  const diff = weddingDate - now;

  if (diff > 0) {
    if (elDays) elDays.innerText = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (elHours)
      elHours.innerText = Math.floor(
        (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
    if (elMins)
      elMins.innerText = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    if (elSecs) elSecs.innerText = Math.floor((diff % (1000 * 60)) / 1000);
  }
}, 1000);

// ==========================================
// 6. Inisialisasi Swiper & Petals
// ==========================================
if (document.querySelector(".mySwiper")) {
  const swiper = new Swiper(".mySwiper", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    loop: true,
    speed: 1200,
    coverflowEffect: {
      rotate: 30,
      stretch: 0,
      depth: 200,
      modifier: 1,
      slideShadows: true,
    },
    autoplay: { delay: 3000, disableOnInteraction: false },
    pagination: { el: ".swiper-pagination", clickable: true },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
}

function createPetals() {
  const section = document.querySelector(".gallery");
  if (!section) return;

  const petalCount = 15;
  for (let i = 0; i < petalCount; i++) {
    const petal = document.createElement("div");
    petal.className = "petal";
    petal.style.left = Math.random() * 100 + "vw";
    petal.style.animationDelay = Math.random() * 5 + "s";
    petal.style.animationDuration = Math.random() * 3 + 7 + "s";
    section.appendChild(petal);
  }
}
window.addEventListener("DOMContentLoaded", createPetals);

// ==========================================
// 7. Toast Notification (Custom Alert)
// ==========================================
const toastContainer = document.createElement("div");
toastContainer.id = "toast-container";
document.body.appendChild(toastContainer);

function showToast(message, type = "success") {
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.innerHTML = message;

  toastContainer.appendChild(toast);

  // Trigger animasi masuk
  setTimeout(() => toast.classList.add("show"), 10);

  // Hapus otomatis
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 400);
  }, 3000);
}

// ==========================================
// 8. Fungsi Salin Rekening
// ==========================================
function copyText(id) {
  const el = document.getElementById(id);
  if (el) {
    navigator.clipboard
      .writeText(el.innerText)
      .then(() => showToast("Nomor rekening berhasil disalin!", "success"))
      .catch((err) => console.error("Gagal menyalin text: ", err));
  }
}

// ==========================================
// 9. Form RSVP & Guest Book (TERHUBUNG FIREBASE)
// ==========================================

// 1. Konfigurasi Firebase Anda (Ganti dengan milik Anda nanti)
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDnvFYX1KjWSeFwr-8IanQ8otoubEx-DYk",
  authDomain: "undangandigital-dika-yani.firebaseapp.com",
  databaseURL:
    "https://undangandigital-dika-yani-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "undangandigital-dika-yani",
  storageBucket: "undangandigital-dika-yani.firebasestorage.app",
  messagingSenderId: "438248688498",
  appId: "1:438248688498:web:23090305d9c70e6012abeb",
};

// 2. Inisialisasi Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const db = firebase.database();

// 3. Elemen-elemen DOM
const container = document.getElementById("guestMessages");
const form = document.querySelector("form");
const btnDisplayOnly = document.getElementById("btnDisplayOnly");

// 4. MENGAMBIL & MENAMPILKAN DATA DARI DATABASE (Real-time)
db.ref("guestbook").on("value", (snapshot) => {
  if (!container) return;
  container.innerHTML = ""; // Bersihkan tampilan lama agar tidak dobel

  const messages = [];
  snapshot.forEach((childSnapshot) => {
    messages.push(childSnapshot.val());
  });

  // Balik urutan array agar pesan yang paling baru berada di paling atas
  messages.reverse().forEach((data) => {
    const initial = data.nama ? data.nama.charAt(0).toUpperCase() : "?";
    const badgeClass =
      data.kehadiran === "Hadir" ? "badge-hadir" : "badge-absen";

    const msgDiv = document.createElement("div");
    msgDiv.className = "message-card";

    // Animasi muncul (fade in & slide up)
    msgDiv.style.opacity = "0";
    msgDiv.style.transform = "translateY(15px)";
    msgDiv.style.transition = "all 0.5s ease";

    // Format desain HTML
    msgDiv.innerHTML = `
      <div class="msg-avatar">${initial}</div>
      <div class="msg-content">
        <div class="msg-header">
          <strong>${data.nama}</strong>
          <span class="msg-badge ${badgeClass}">${data.kehadiran}</span>
        </div>
        <p>${data.pesan}</p>
        <small style="color: #999; font-size: 0.75rem;">${data.waktu}</small>
      </div>
    `;

    container.appendChild(msgDiv);

    // Trigger animasi setelah elemen masuk ke DOM
    setTimeout(() => {
      msgDiv.style.opacity = "1";
      msgDiv.style.transform = "translateY(0)";
    }, 50);
  });
});

// 5. MENGIRIM DATA SAAT TOMBOL "VIA WHATSAPP" DIKLIK
if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const attendance = document.getElementById("attendance").value;
    const msg = document.getElementById("message").value;

    if (name.trim() === "" || msg.trim() === "") {
      showToast("Mohon isi nama dan ucapan terlebih dahulu.", "error");
      return;
    }

    // Simpan ke Firebase Database
    db.ref("guestbook").push({
      nama: name,
      kehadiran: attendance,
      pesan: msg,
      waktu: new Date().toLocaleString("id-ID"),
    });

    // Buka WhatsApp
    const phone = "6285959304478"; // GANTI DENGAN NOMOR WA ANDA
    const text = `Form Kehadiran Tamu\n\nNama: ${name}\nKehadiran: ${attendance}\nUcapan: ${msg}`;
    window.open(
      "https://wa.me/" + phone + "?text=" + encodeURIComponent(text),
      "_blank",
    );

    form.reset();
  });
}

// 6. MENGIRIM DATA SAAT TOMBOL "WEB SAJA" DIKLIK
if (btnDisplayOnly) {
  btnDisplayOnly.addEventListener("click", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const attendance = document.getElementById("attendance").value;
    const msg = document.getElementById("message").value;

    if (name.trim() === "" || msg.trim() === "") {
      showToast("Mohon isi nama dan ucapan terlebih dahulu.", "error");
      return;
    }

    // Simpan ke Firebase Database (Tanpa buka WA)
    db.ref("guestbook").push({
      nama: name,
      kehadiran: attendance,
      pesan: msg,
      waktu: new Date().toLocaleString("id-ID"),
    });

    showToast("Pesan berhasil ditambahkan ke buku tamu!", "success");
    if (form) form.reset();
  });
}
