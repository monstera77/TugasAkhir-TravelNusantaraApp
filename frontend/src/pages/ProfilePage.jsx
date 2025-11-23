import React from "react";
// 1. IMPORT GAMBAR DARI ASET LOKAL
import profileImg from "../assets/profile.jpeg"; // Pastikan nama file sesuai

const ProfilePage = () => {
  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-24 md:pb-0">
      <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 rounded-3xl p-10 text-white shadow-xl">
        <div className="flex items-center gap-6">
          {/* 2. GUNAKAN VARIABEL IMPORT DI SRC */}
          <img
            src={profileImg}
            alt="Foto Profil Mustofa Ahmad Rusli"
            className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
          />
          <div>
            <h1 className="text-2xl md:text-4xl font-bold mb-2">
              Profil Mahasiswa
            </h1>
            <p className="text-blue-100 text-lg">
              Informasi Pengembang Aplikasi
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
        <div className="p-8 space-y-6">
          <div className="pb-6 border-b border-gray-200">
            <label className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-2 block">
              Nama Lengkap
            </label>
            <p className="text-3xl font-bold text-gray-900">
              Mustofa Ahmad Rusli
            </p>
          </div>

          <div className="pb-6 border-b border-gray-200">
            <label className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-2 block">
              NIM
            </label>
            <p className="text-3xl font-bold text-gray-900">21120123120034</p>
          </div>

          <div className="pb-6 border-b border-gray-200">
            <label className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-2 block">
              Kelompok
            </label>
            <p className="text-3xl font-bold text-gray-900">25</p>
          </div>

          <div className="pt-2">
            <label className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-3 block">
              Tentang Aplikasi
            </label>
            <p className="text-gray-700 leading-relaxed text-lg">
              Travel Nusantara adalah aplikasi Progressive Web App (PWA) yang
              menampilkan destinasi wisata terbaik di Indonesia. Aplikasi ini
              dapat diinstall di perangkat Anda dan bekerja secara offline.
            </p>
          </div>
        </div>

        <div className="bg-gray-50 px-8 py-6">
          <h3 className="font-bold text-gray-900 mb-4 text-lg">
            Teknologi yang Digunakan
          </h3>
          <div className="flex flex-wrap gap-3">
            {[
              "React.js",
              "Vite",
              "Tailwind CSS",
              "vite-plugin-pwa",
              "JavaScript",
              "Supabase", // Tambahan
              "Express.js", // Tambahan
            ].map((tech) => (
              <span
                key={tech}
                className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
