import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  MapPin,
  Star,
  Heart,
  Share2,
  CheckCircle,
} from "lucide-react";

const DestinationDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [destination, setDestination] = useState(null);
  const [loading, setLoading] = useState(true);

  // --- GET DATA WISATA DARI API ---
  useEffect(() => {
    fetch(`http://localhost:3000/api/destinations/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setDestination(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  // --- LOGIC FAVORIT (TETAP PAKAI LOCALSTORAGE) ---
  const [isFavorite, setIsFavorite] = useState(false);
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    if (destination) {
      setIsFavorite(storedFavorites.includes(destination.id));
    }
  }, [destination]);

  const toggleFavorite = () => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    let newFavorites;
    if (isFavorite) {
      newFavorites = storedFavorites.filter(
        (favId) => favId !== destination.id
      );
    } else {
      newFavorites = [...storedFavorites, destination.id];
    }
    localStorage.setItem("favorites", JSON.stringify(newFavorites));
    setIsFavorite(!isFavorite);
  };

  // --- LOGIC SHARE ---
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: destination.fullName,
          text: `Yuk liburan ke ${destination.name}!`,
          url: window.location.href,
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link berhasil disalin!");
    }
  };

  // --- LOGIC BOOKING (KE API BACKEND) ---
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isBooking, setIsBooking] = useState(false); // Loading state saat booking

  const handleBooking = async () => {
    setIsBooking(true);

    // Siapkan data sesuai kolom di Supabase
    const orderData = {
      fullName: destination.fullName,
      location: destination.location,
      image: destination.image,
      date: new Date().toISOString(),
      status: "Lunas",
    };

    try {
      // KIRIM KE API
      const response = await fetch("http://localhost:3000/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        setShowSuccessModal(true); // Tampilkan Popup Sukses
      } else {
        alert("Gagal memesan tiket. Cek koneksi server.");
      }
    } catch (error) {
      console.error("Error booking:", error);
      alert("Terjadi kesalahan saat memesan.");
    } finally {
      setIsBooking(false);
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Memuat detail...
      </div>
    );
  if (!destination)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Data tidak ditemukan
      </div>
    );

  return (
    <div className="min-h-screen bg-white pb-24">
      {/* Modal Sukses */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-8 w-full max-w-sm text-center shadow-2xl">
            <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-green-100 mb-6">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Berhasil!</h3>
            <p className="text-gray-500 mb-8">
              Tiket ke {destination.name} berhasil diamankan.
            </p>
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

      {/* Header Gambar */}
      <div className="relative h-[40vh] w-full">
        <img
          src={destination.image}
          alt={destination.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-start bg-gradient-to-b from-black/50 to-transparent">
          <button
            onClick={() => navigate(-1)}
            className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex gap-2">
            <button
              onClick={handleShare}
              className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30"
            >
              <Share2 className="w-5 h-5" />
            </button>
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

      {/* Konten */}
      <div className="px-6 py-6 -mt-8 relative bg-white rounded-t-3xl shadow-lg">
        <div className="flex justify-between items-start mb-2">
          <h1 className="text-2xl font-bold text-gray-900 flex-1">
            {destination.fullName}
          </h1>
          <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg border border-yellow-100">
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            <span className="font-bold text-yellow-700">
              {destination.rating}
            </span>
          </div>
        </div>
        <div className="flex items-center text-gray-500 mb-6">
          <MapPin className="w-4 h-4 mr-1" />
          <span className="text-sm">{destination.location}</span>
        </div>
        <hr className="border-gray-100 mb-6" />
        <div className="space-y-4">
          <h3 className="font-bold text-lg text-gray-900">Tentang Destinasi</h3>
          <p className="text-gray-600 leading-relaxed text-justify">
            {destination.description}
          </p>
        </div>
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 md:static md:border-0 md:bg-transparent md:p-0 md:mt-8">
          <button
            onClick={handleBooking}
            disabled={isBooking}
            className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl shadow-lg hover:bg-blue-700 disabled:bg-gray-400 transition active:scale-95"
          >
            {isBooking ? "Memproses..." : "Pesan Tiket Sekarang"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DestinationDetail;
