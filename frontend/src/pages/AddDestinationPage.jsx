import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../services/supabaseClient";
import { ArrowLeft, CheckCircle, AlertTriangle } from "lucide-react"; // Tambah Icon

const AddDestinationPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // State untuk Modal Custom
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({
    type: "",
    title: "",
    message: "",
  });

  const [formData, setFormData] = useState({
    name: "",
    fullname: "", // Sudah diperbaiki (huruf kecil)
    location: "",
    description: "",
    image: "",
    rating: "4.5",
    category: "Nature",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.from("destinations").insert([formData]);

    if (!error) {
      // TAMPILKAN POPUP SUKSES
      setModalContent({
        type: "success",
        title: "Berhasil!",
        message: "Destinasi wisata baru telah ditambahkan ke database.",
      });
      setShowModal(true);
    } else {
      // TAMPILKAN POPUP ERROR
      setModalContent({
        type: "error",
        title: "Gagal Menyimpan",
        message: error.message || "Terjadi kesalahan saat menyimpan data.",
      });
      setShowModal(true);
    }
    setLoading(false);
  };

  // Fungsi tutup modal
  const closeModal = () => {
    setShowModal(false);
    if (modalContent.type === "success") {
      navigate("/explore"); // Pindah halaman jika sukses
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* --- CUSTOM POPUP MODAL --- */}
      {showModal && (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-6 w-full max-w-sm text-center shadow-2xl transform scale-100 animate-in zoom-in-95">
            {/* Icon Dinamis (Hijau/Merah) */}
            <div
              className={`mx-auto flex items-center justify-center h-16 w-16 rounded-full mb-4 ${
                modalContent.type === "success" ? "bg-green-100" : "bg-red-100"
              }`}
            >
              {modalContent.type === "success" ? (
                <CheckCircle className="h-8 w-8 text-green-600" />
              ) : (
                <AlertTriangle className="h-8 w-8 text-red-600" />
              )}
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {modalContent.title}
            </h3>
            <p className="text-gray-500 mb-6 text-sm">{modalContent.message}</p>

            <button
              onClick={closeModal}
              className={`w-full py-3 text-white font-bold rounded-xl shadow-lg active:scale-95 transition ${
                modalContent.type === "success"
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-red-600 hover:bg-red-700"
              }`}
            >
              {modalContent.type === "success" ? "Lihat Hasil" : "Coba Lagi"}
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="bg-white p-4 shadow-sm sticky top-0 z-10 flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-bold">Tambah Wisata Baru</h1>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-4 max-w-md mx-auto">
        <div>
          <label className="text-sm font-bold text-gray-700">
            Nama Singkat
          </label>
          <input
            required
            type="text"
            placeholder="Contoh: Karimunjawa"
            className="w-full p-3 rounded-xl border bg-white"
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>

        <div>
          <label className="text-sm font-bold text-gray-700">
            Nama Lengkap
          </label>
          <input
            required
            type="text"
            placeholder="Contoh: Karimunjawa, Jepara"
            className="w-full p-3 rounded-xl border bg-white"
            onChange={(e) =>
              setFormData({ ...formData, fullname: e.target.value })
            }
          />
        </div>

        <div>
          <label className="text-sm font-bold text-gray-700">
            Lokasi (Provinsi)
          </label>
          <input
            required
            type="text"
            placeholder="Jawa Tengah"
            className="w-full p-3 rounded-xl border bg-white"
            onChange={(e) =>
              setFormData({ ...formData, location: e.target.value })
            }
          />
        </div>

        <div>
          <label className="text-sm font-bold text-gray-700">
            Link Gambar (URL)
          </label>
          <input
            required
            type="url"
            placeholder="https://..."
            className="w-full p-3 rounded-xl border bg-white"
            onChange={(e) =>
              setFormData({ ...formData, image: e.target.value })
            }
          />
        </div>

        <div>
          <label className="text-sm font-bold text-gray-700">Deskripsi</label>
          <textarea
            required
            rows="4"
            className="w-full p-3 rounded-xl border bg-white"
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          ></textarea>
        </div>

        <button
          disabled={loading}
          type="submit"
          className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl shadow-lg hover:bg-blue-700 transition disabled:bg-gray-400"
        >
          {loading ? "Menyimpan..." : "Simpan Destinasi"}
        </button>
      </form>
    </div>
  );
};

export default AddDestinationPage;
