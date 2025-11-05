# Responsi Modul 4 Mustofa Ahmad Rusli Kel 25

## PWA Travel Nusantara ✈️

Ini adalah sebuah Progressive Web App (PWA) yang berfungsi sebagai katalog destinasi wisata di Indonesia. Aplikasi ini dibangun menggunakan React.js dan Vite, serta dilengkapi dengan fungsionalitas PWA sehingga dapat di-install di perangkat (desktop & mobile) dan diakses secara offline.

Proyek ini dibuat untuk memenuhi [Masukkan nama mata kuliah/praktikum di sini].

## ✨ Fitur Utama

- **Installable (PWA):** Dapat di-install di perangkat seperti aplikasi native melalui _prompt_ "Add to Home Screen".
- **Akses Offline:** Aset utama di-_cache_ menggunakan Service Worker, memungkinkan aplikasi tetap diakses tanpa koneksi internet.
- **Responsive Design:** Tampilan menyesuaikan antara desktop (navigasi atas) dan mobile (navigasi bawah/bottom bar).
- **3 Halaman:**
  - **Home:** Menampilkan daftar destinasi teratas dengan _pagination_.
  - **Destinasi:** Menampilkan semua destinasi dengan fitur pencarian _real-time_.
  - **Profil:** Halaman statis berisi data diri pengembang (mengambil foto dari GitHub).
- **Modal Detail:** Menampilkan detail informasi destinasi dalam bentuk pop-up yang interaktif.
- **Data Dinamis:** Menggunakan gambar placeholder dari Unsplash (`source.unsplash.com`) untuk destinasi.

## 🛠️ Teknologi yang Digunakan

- **Vite:** Build tool frontend modern.
- **React.js:** Library utama untuk membangun UI.
- **Tailwind CSS:** Framework utility-first CSS untuk styling.
- **`vite-plugin-pwa`:** Plugin untuk mengimplementasikan fungsionalitas PWA (Service Worker dan Manifest).
- **`lucide-react`:** Library ikon yang ringan.

## 👨‍💻 Profil Pengembang

- **Nama:** Mustofa Ahmad Rusli
- **NIM:** 21120123120034
- **Kelompok:** 25

## 🚀 Cara Menjalankan Proyek

1. **Clone repository ini:**

   ```bash
   git clone [URL-repository]
   cd [nama-folder-repository]
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Jalankan di mode development:**

   ```bash
   npm run dev
   ```

   (Aplikasi akan berjalan di `http://localhost:5173`)

4. **Build untuk produksi (dan tes PWA):**

   ```bash
   npm run build
   ```

5. **Preview hasil build:**

   ```bash
   npm run preview
   ```

   (Gunakan server ini di `http://localhost:4173` untuk mengetes fungsionalitas PWA dan offline)
