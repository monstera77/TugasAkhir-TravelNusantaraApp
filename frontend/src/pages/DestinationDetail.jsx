import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  MapPin,
  Star,
  Heart,
  Share2,
  CheckCircle,
  X,
} from "lucide-react";
import { supabase } from "../services/supabaseClient";

const DestinationDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [destination, setDestination] = useState(null);
  const [loading, setLoading] = useState(true);

  // --- 1. GET DATA ---
  useEffect(() => {
    const fetchData = async () => {
      // Hapus variabel 'error' jika tidak dipakai, biar tidak merah
      const { data } = await supabase
        .from("destinations")
        .select("*")
        .eq("id", id)
        .single();

      if (data) setDestination(data);
      setLoading(false);
    };
    fetchData();
  }, [id]);

  // --- STATE MODAL ---
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
  });

  // --- 2. HANDLE BOOKING ---
  const handleSubmitBooking = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    const newOrder = {
      fullName: destination.fullName || destination.fullname,
      location: destination.location,
      image: destination.image,
      date: new Date(formData.date).toISOString(),
      status: "Lunas",
      visitor_name: formData.name,
      visitor_email: formData.email,
      visitor_phone: formData.phone,
    };

    const { error } = await supabase.from("orders").insert([newOrder]);

    if (!error) {
      setShowBookingModal(false);
      setShowSuccessModal(true);
      setFormData({ name: "", email: "", phone: "", date: "" });
    } else {
      alert("Gagal memesan: " + error.message);
    }
    setIsProcessing(false);
  };

  // --- 3. LOGIC FAVORIT (PERBAIKAN) ---
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    // Cek LocalStorage saat data destination sudah ada
    if (destination) {
      const storedFavorites =
        JSON.parse(localStorage.getItem("favorites")) || [];
      // Pastikan perbandingan tipe data aman (String vs Number)
      setIsFavorite(storedFavorites.includes(destination.id));
    }
  }, [destination]);

  const toggleFavorite = () => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    let newFavorites;

    if (isFavorite) {
      // Hapus ID
      newFavorites = storedFavorites.filter(
        (favId) => favId !== destination.id
      );
    } else {
      // Tambah ID
      newFavorites = [...storedFavorites, destination.id];
    }

    // Simpan ke LocalStorage
    localStorage.setItem("favorites", JSON.stringify(newFavorites));
    setIsFavorite(!isFavorite);
  };

  // --- 4. LOGIC SHARE (PERBAIKAN ERROR CATCH) ---
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: destination.fullName,
          url: window.location.href,
        });
      } catch (error) {
        // Gunakan variabel error agar linter tidak marah
        console.log("Share dibatalkan:", error);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link disalin!");
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Memuat...
      </div>
    );
  if (!destination)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Data 404
      </div>
    );

  return (
    <div className="min-h-screen bg-white pb-24">
      {/* MODAL SUKSES */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-110 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-8 w-full max-w-sm text-center shadow-2xl">
            <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-green-100 mb-6">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Berhasil!</h3>
            <p className="text-gray-500 mb-8">Tiket berhasil diamankan.</p>
            <button
              onClick={() => navigate("/orders")}
              className="w-full bg-blue-600 text-white font-bold py-4 rounded-2xl shadow-lg hover:bg-blue-700"
            >
              Lihat Pesanan Saya
            </button>
            <button
              onClick={() => setShowSuccessModal(false)}
              className="mt-4 text-gray-400 font-medium text-sm"
            >
              Tutup
            </button>
          </div>
        </div>
      )}

      {/* MODAL FORMULIR */}
      {showBookingModal && (
        <div className="fixed inset-0 z-100 flex items-end md:items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="bg-white w-full max-w-md rounded-t-3xl md:rounded-3xl p-6 shadow-2xl">
            <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
              <h3 className="text-xl font-bold text-gray-900">Lengkapi Data</h3>
              <button onClick={() => setShowBookingModal(false)}>
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>
            <form onSubmit={handleSubmitBooking} className="space-y-4">
              <input
                required
                type="text"
                placeholder="Nama Lengkap"
                className="w-full p-3 border rounded-xl bg-gray-50"
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
              <input
                required
                type="email"
                placeholder="Email"
                className="w-full p-3 border rounded-xl bg-gray-50"
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  required
                  type="tel"
                  placeholder="No. WA"
                  className="w-full p-3 border rounded-xl bg-gray-50"
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                />
                <input
                  required
                  type="date"
                  className="w-full p-3 border rounded-xl bg-gray-50"
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                />
              </div>
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-4 bg-blue-600 text-white font-bold rounded-xl shadow-lg mt-6"
              >
                {isProcessing ? "Memproses..." : "Konfirmasi Pemesanan"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* HEADER GAMBAR */}
      <div className="relative h-[40vh] w-full">
        <img
          src={destination.image}
          className="w-full h-full object-cover"
          alt={destination.name}
        />
        <div className="absolute top-0 left-0 right-0 p-4 flex justify-between bg-linear-to-b from-black/50 to-transparent">
          <button
            onClick={() => navigate(-1)}
            className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex gap-2">
            <button
              onClick={handleShare}
              className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white"
            >
              <Share2 className="w-5 h-5" />
            </button>
            {/* Perbaikan UI Tombol Favorit */}
            <button
              onClick={toggleFavorite}
              className={`p-2 backdrop-blur-md rounded-full transition ${
                isFavorite ? "bg-white text-red-500" : "bg-white/20 text-white"
              }`}
            >
              <Heart
                className={`w-5 h-5 ${isFavorite ? "fill-current" : ""}`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* KONTEN BAWAH */}
      <div className="px-6 py-6 -mt-8 relative bg-white rounded-t-3xl shadow-lg">
        <h1 className="text-2xl font-bold text-gray-900 flex-1 mb-2">
          {destination.fullName}
        </h1>
        <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg border border-yellow-100 w-fit mb-4">
          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
          <span className="font-bold text-yellow-700">
            {destination.rating}
          </span>
        </div>
        <div className="flex items-center text-gray-500 mb-6">
          <MapPin className="w-4 h-4 mr-1" />
          {destination.location}
        </div>
        <hr className="border-gray-100 mb-6" />
        <p className="text-gray-600 leading-relaxed text-justify mb-20">
          {destination.description}
        </p>

        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 md:static md:border-0 md:bg-transparent md:p-0">
          <button
            onClick={() => setShowBookingModal(true)}
            className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl shadow-lg hover:bg-blue-700"
          >
            Pesan Tiket Sekarang
          </button>
        </div>
      </div>
    </div>
  );
};

export default DestinationDetail;
