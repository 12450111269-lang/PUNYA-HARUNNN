# Harun's 19th Birthday Web Project 🎂✨

Project website interaktif perayaan ulang tahun ke-19 untuk **Harun** (20 Oktober) dari **Gaby**. Dibuat menggunakan arsitektur modern **Vite + React + GSAP**.

---

## 🚀 Cara Menjalankan Project

### 1. Prasyarat
- [Node.js](https://nodejs.org/) (versi 18 ke atas)

### 2. Instalasi Dependensi
```bash
npm install
```

### 3. Menjalankan Server Development
```bash
npm run dev
```
Buka browser di `http://localhost:5173` atau alamat yang tertera di terminal.

### 4. Build untuk Production
```bash
npm run build
npm run preview
```

---

## 🔑 Kunci Rahasia / Passcode
- **Passcode:** `2010` (Format tanggal 20 Oktober)
- **Fallback Passcode:** `1234` atau `201007`

---

## 📁 Struktur Lengkap Direktori & Kode

```
├── public/                                      # File statis dan media
│   ├── favicon.svg                             # Icon web SVG
│   ├── lalu biru.mp3                           # Playlist track 1 (lalu biru X panasea)
│   ├── Terpukau - Astrid.mp3                   # Playlist track 2
│   ├── segalanya itu kamu.mp3                  # Playlist track 3 (David Bayu)
│   ├── harun 1.jpeg ~ harun 6.jpeg             # 6 Foto kenangan Polaroid & Card
│   ├── bunga 1 no bg.png ~ bunga 3 no bg.png   # Aset bunga animasi mekar & burst
│   ├── bunga bucket no bg.png                  # Banner bouquet bunga
│   ├── bucket bunga 2 no bg.png                # Bucket bunga ucapan penutup
│   ├── bunga no bg 2.png                       # Hiasan bunga dekoratif
│   ├── lucu1 no bg.png                         # Karakter maskot lucu hero
│   └── lucu 2 no bg.png                        # Maskot lucu gift box & jar
│
├── src/
│   ├── components/
│   │   ├── LoadingScreen.jsx                   # Fase 1: Screen loading awal dengan SVG flower & progress
│   │   ├── PasscodeScreen.jsx                  # Fase 2: Lock screen PIN 4 digit + clue interaktif
│   │   ├── FlowerBloomLoading.jsx              # Fase 3: Transisi 36 bunga mekar & progress bar
│   │   ├── UnboxingScreen.jsx                  # Fase 4: Kotak kado 3D interaktif + ledakan bunga & confetti
│   │   ├── BirthdayCard3D.jsx                  # Kartu ucapan 3D dengan efek buka lipatan & tilt mouse
│   │   ├── LetterSection.jsx                   # Surat cinta dengan animasi mengetik (typewriter effect)
│   │   ├── HeartfeltNote.jsx                   # Pesan personal / heartfelt note dari lubuk hati
│   │   ├── FarewellSection.jsx                 # Bagian penutup ucapan doa + tombol modal kue ultah
│   │   └── MainCelebration.jsx                 # Dashboard utama setelah unlock (Musik, Polaroid, Bouquet, Jar)
│   │
│   ├── App.jsx                                 # State machine pengatur 5 fase alur aplikasi
│   ├── main.jsx                                # Entry point React DOM
│   └── index.css                               # CSS tema Cyberpunk Neon / Romantic Glow & Mobile Shell
│
├── index.html                                  # Dokumen HTML utama
├── package.json                                # Konfigurasi dependensi project
├── vite.config.js                              # Konfigurasi bundler Vite
└── README.md                                   # Panduan dan dokumentasi teknis
```

---

## 🧠 Penjelasan Lengkap Alur & Struktur Kode

Aplikasi ini dirancang sebagai **Single Page Application (SPA)** dengan representasi tampilan seperti aplikasi mobile (`mobile-app-shell` dengan max-width 430px dan glow frame).

### 1. State Machine Alur (`App.jsx`)
Aplikasi bekerja menggunakan 5 tahapan (*phases*):
1. `'loading'`: Menampilkan `LoadingScreen.jsx` sampai 100% dan tombol ditekan.
2. `'passcode'`: Menampilkan `PasscodeScreen.jsx` meminta 4 digit kode.
3. `'flower-loading'`: Menampilkan animasi bunga mekar (`FlowerBloomLoading.jsx`).
4. `'unboxing'`: Menampilkan kotak kado yang bisa di-tap (`UnboxingScreen.jsx`).
5. `'unlocked'`: Membuka halaman perayaan utama (`MainCelebration.jsx`).

---

### 2. Rincian Komponen & Fungsinya

#### A. `LoadingScreen.jsx`
- **Tujuan**: Loading screen awal untuk menyiapkan aset dan membangun *anticipation*.
- **Fitur Utama**:
  - Animasi partikel melayang acak di latar belakang (`floatUp`).
  - Animasi lingkaran berputar dua arah dengan GSAP.
  - Bunga SVG neon bercahaya dengan 12 kelopak berputar.
  - Counter persentase dari `0%` ke `100%`.
  - Tombol shimmer gradient *"Open Surprise"* yang muncul saat progress selesai.

#### B. `PasscodeScreen.jsx`
- **Tujuan**: Mengamankan konten agar hanya orang spesial yang bisa membukanya.
- **Fitur Utama**:
  - Keypad numerik kustom 1–9, 0, tombol Clear (`X`), dan tombol Hapus (`Delete`).
  - Indikator 4 titik LED neon yang menyala saat angka dimasukkan.
  - Efek getar (*shake animation*) dan border merah jika kode salah.
  - Transisi keluar halus (*fade and zoom out*) jika kode benar (`2010`).

#### C. `FlowerBloomLoading.jsx`
- **Tujuan**: Layar jeda artistik bertema bunga sebelum masuk ke hadiah utama.
- **Fitur Utama**:
  - Grid 36 bunga mekar (`bunga 1/2/3 no bg.png`) dengan stagger GSAP dari titik tengah (`from: 'center'`).
  - Progress bar neon biru-cyan (0% - 100%).
  - Teks: *"Sebentar ya... Bunganya sedang mekar untukmu 🌷"*.

#### D. `UnboxingScreen.jsx`
- **Tujuan**: Interaksi buka kado surprise.
- **Fitur Utama**:
  - Kotak kado SVG dengan pita gradient dan maskot lucu.
  - Saat diklik: kado bergoyang (*shake*), tutup kado terlempar ke atas, confetti meledak (`canvas-confetti`), 28 bunga melesat ke segala arah (*radial burst*), dan layar memancarkan cahaya putih/cyan.

#### E. `MainCelebration.jsx`
Ini adalah halaman utama perayaan yang memuat fitur-fitur berikut:
1. **Music Player (Floating & Widget Playlist)**:
   - Memutar 3 lagu spesial: *Lalu Biru X Panasea*, *Terpukau* (Astrid), dan *Segalanya Itu Kamu* (David Bayu).
   - Tombol volume melayang di pojok kanan bawah.
   - Piringan hitam vinyl berputar dengan visual track duration bar dan tombol play/pause/skip.
2. **Hero Section**:
   - Ucapan ulang tahun bertingkat dengan teks gradient mawar neon.
   - Typewriter teks: *"Scroll pelan-pelan yaa, aku punya sedikit sesuatu buat kamu 🥹🤍"*.
3. **Kartu Ucapan 3D (`BirthdayCard3D.jsx`)**:
   - Kartu 3D dengan efek parallax mengikuti gerakan mouse/touch (`rotateX`, `rotateY`).
   - Sisi depan berdesain gingham merah klasik dengan foto kenangan & lencana stempel bergerigi (*scallop*).
   - Saat diklik, kartu membuka lipatannya (`rotateY: -160deg`) memunculkan surat ucapan hangat dan hujan hati.
4. **Digital Bouquet (Buket Bunga Interaktif)**:
   - Pot bunga SVG dengan 5 cabang tanaman.
   - 5 jenis bunga yang dapat diklik: **Mawar**, **Tulip**, **Sakura**, **Sunflower**, dan **Daisy**.
   - Setiap bunga memiliki makna & pujian tersendiri yang muncul dalam *toast card*.
5. **Surat Cinta Typewriter (`LetterSection.jsx`)**:
   - Menggunakan `IntersectionObserver` untuk mendeteksi saat user men-scroll ke bagian ini.
   - Efek mengetik otomatis kalimat demi kalimat yang sangat romantis, diakhiri dengan tanda tangan *"Gaby 🤍"*.
6. **Catatan Lubuk Hati (`HeartfeltNote.jsx`)**:
   - Pesan apresiasi mendalam mengenai hal-hal bermakna dalam hubungan.
7. **Our Photo Memories (Polaroid Gallery)**:
   - 6 foto polaroid dengan sudut rotasi dinamis.
   - Klik pada foto mana saja akan membuka modal Lightbox HD dengan tanggal dan judul kenangan.
8. **Reasons I'm Grateful To Know You (Grateful Jar)**:
   - Stoples toples pesan `🫙` interaktif.
   - Tombol *"Shake the Jar ✨"* mengocok stoples dengan animasi getar GSAP lalu mengeluarkan gulungan kertas ucapan.
9. **Bagian Doa & Tombol Kue Ultah (`FarewellSection.jsx`)**:
   - Kalimat puitis harapan dan bucket bunga penutup.
   - Tombol *"Happy Birthday Wishes! 💕"* yang memicu ledakan confetti emas-pink dan modal kejutan kue ulang tahun.

---

## 🎨 Teknologi yang Digunakan
- **Framework**: React 18 / Vite 6
- **Animasi Fisik & Timeline**: [GSAP](https://gsap.com/) & [@gsap/react](https://gsap.com/docs/v3/Plugins/useGSAP/)
- **Partikel Confetti**: [canvas-confetti](https://www.npmjs.com/package/canvas-confetti)
- **Icons**: [lucide-react](https://lucide.dev/)
- **Styling**: Modern CSS3 dengan CSS Variables, CSS Grid, 3D CSS Transforms (`perspective`, `transform-style: preserve-3d`), dan Google Fonts (*Playfair Display*, *Cinzel*, *Outfit*).
