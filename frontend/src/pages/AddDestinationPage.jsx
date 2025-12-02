import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../services/supabaseClient";
import {
  ArrowLeft,
  CheckCircle,
  AlertTriangle,
  Upload,
  Image as ImageIcon,
} from "lucide-react";

const AddDestinationPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // State Modal
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({
    type: "",
    title: "",
    message: "",
  });

  // State Data
  const [imageFile, setImageFile] = useState(null); // Menampung file foto
  const [previewUrl, setPreviewUrl] = useState(null); // Preview foto di layar
  const [formData, setFormData] = useState({
    name: "",
    fullname: "",
    location: "",
    description: "",
    // image: "" <-- Nanti diisi otomatis setelah upload
    rating: "4.5",
    category: "Nature",
  });

  // Handle Pilih File
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file)); // Buat preview lokal
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = "";

      // 1. PROSES UPLOAD GAMBAR KE SUPABASE STORAGE
      if (imageFile) {
        const fileExt = imageFile.name.split(".").pop();
        const fileName = `${Date.now()}.${fileExt}`; // Nama file unik berdasarkan waktu
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from("travel-images") // Nama Bucket yang tadi dibuat
          .upload(filePath, imageFile);

        if (uploadError) throw uploadError;

        // 2. AMBIL LINK PUBLIK GAMBAR
        const { data } = supabase.storage
          .from("travel-images")
          .getPublicUrl(filePath);

        imageUrl = data.publicUrl;
      } else {
        throw new Error("Mohon pilih gambar wisata terlebih dahulu.");
      }

      // 3. SIMPAN DATA KE DATABASE (DENGAN LINK GAMBAR BARU)
      const { error: insertError } = await supabase
        .from("destinations")
        .insert([
          {
            ...formData,
            image: imageUrl, // Masukkan link hasil upload
          },
        ]);

      if (insertError) throw insertError;

      // SUKSES
      setModalContent({
        type: "success",
        title: "Berhasil!",
        message: "Destinasi wisata dan foto berhasil diupload.",
      });
      setShowModal(true);
    } catch (error) {
      // ERROR
      setModalContent({
        type: "error",
        title: "Gagal Menyimpan",
        message: error.message || "Terjadi kesalahan sistem.",
      });
      setShowModal(true);
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    if (modalContent.type === "success") navigate("/explore");
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Modal Popup */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 w-full max-w-sm text-center shadow-2xl">
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
              className={`w-full py-3 text-white font-bold rounded-xl shadow-lg ${
                modalContent.type === "success" ? "bg-blue-600" : "bg-red-600"
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
        {/* INPUT GAMBAR (UPLOAD) */}
        <div>
          <label className="text-sm font-bold text-gray-700 mb-2 block">
            Foto Wisata
          </label>

          <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 text-center hover:bg-gray-50 transition cursor-pointer relative">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />

            {previewUrl ? (
              <div className="relative">
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="w-full h-48 object-cover rounded-lg shadow-sm"
                />
                <p className="text-xs text-gray-500 mt-2">
                  Klik untuk ganti foto
                </p>
              </div>
            ) : (
              <div className="py-8">
                <div className="bg-blue-50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Upload className="w-6 h-6 text-blue-600" />
                </div>
                <p className="text-sm font-medium text-gray-600">
                  Klik untuk upload foto
                </p>
                <p className="text-xs text-gray-400 mt-1">JPG, PNG (Max 2MB)</p>
              </div>
            )}
          </div>
        </div>

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
          {loading ? "Mengupload..." : "Simpan Destinasi"}
        </button>
      </form>
    </div>
  );
};

export default AddDestinationPage;
