import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, Star, Heart, Share2 } from "lucide-react";
import { destinations } from "../data/destinations";

const DestinationDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const destination = destinations.find((d) => d.id === parseInt(id));

  // --- LOGIC 1: FAVORIT (LOVE) ---
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

  // --- LOGIC 2: BOOKING (PESAN TIKET) ---
  const handleBooking = () => {
    // 1. Siapkan data pesanan baru
    const newOrder = {
      ...destination,
      date: new Date().toISOString(), // Simpan tanggal hari ini
      orderId: Date.now(), // ID unik berdasarkan waktu
    };

    // 2. Ambil data pesanan lama dari LocalStorage
    const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];

    // 3. Gabungkan (Pesanan baru ditaruh paling atas)
    const updatedOrders = [newOrder, ...existingOrders];

    // 4. Simpan kembali ke LocalStorage
    localStorage.setItem("orders", JSON.stringify(updatedOrders));

    // 5. Beri notifikasi dan pindah ke halaman Pesanan
    alert("Tiket berhasil dipesan!");
    navigate("/orders");
  };

  if (!destination) return null;

  return (
    <div className="min-h-screen bg-white pb-24">
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
            className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>

          <div className="flex gap-2">
            <button className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition">
              <Share2 className="w-5 h-5" />
            </button>

            {/* Tombol Favorit */}
            <button
              onClick={toggleFavorite}
              className={`p-2 backdrop-blur-md rounded-full transition duration-300 ${
                isFavorite
                  ? "bg-white text-red-500 shadow-lg scale-110"
                  : "bg-white/20 text-white hover:bg-white/30"
              }`}
            >
              <Heart
                className={`w-5 h-5 ${isFavorite ? "fill-current" : ""}`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Konten Detail */}
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

        {/* Tombol Pesan Tiket */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 md:static md:border-0 md:bg-transparent md:p-0 md:mt-8">
          <button
            onClick={handleBooking} // <--- FUNGSI PESAN DIPANGGIL DI SINI
            className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl shadow-lg hover:bg-blue-700 transition active:scale-95"
          >
            Pesan Tiket Sekarang
          </button>
        </div>
      </div>
    </div>
  );
};

export default DestinationDetail;
