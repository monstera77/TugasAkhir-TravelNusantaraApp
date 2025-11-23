import React, { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import DestinationCard from "../components/DestinationCard";

const FavoritesPage = () => {
  const navigate = useNavigate();
  const [favoriteDestinations, setFavoriteDestinations] = useState([]);

  useEffect(() => {
    // 1. Ambil ID Favorit dari LocalStorage
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];

    // 2. Ambil DATA LENGKAP dari API
    fetch(
      "http://https://tugas-akhir-travel-nusantara-app.vercel.app//api/destinations"
    )
      .then((res) => res.json())
      .then((allDestinations) => {
        // 3. Filter data API yang ID-nya ada di LocalStorage
        const favs = allDestinations.filter((dest) =>
          storedFavorites.includes(dest.id)
        );
        setFavoriteDestinations(favs);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="space-y-6 pb-20 md:pb-0">
      <div className="px-2">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Disimpan</h1>
        <p className="text-gray-500">Daftar destinasi impian Anda</p>
      </div>

      {favoriteDestinations.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favoriteDestinations.map((dest) => (
            <DestinationCard
              key={dest.id}
              destination={dest}
              onClick={() => navigate(`/destination/${dest.id}`)}
            />
          ))}
        </div>
      ) : (
        <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-8">
          <div className="bg-red-50 p-6 rounded-full mb-4 animate-pulse">
            <Heart className="w-12 h-12 text-red-400 fill-red-400" />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            Belum ada favorit
          </h3>
          <p className="text-gray-500 max-w-xs mb-6">
            Jelajahi destinasi dan tekan tombol hati untuk menyimpannya di sini.
          </p>
          <button
            onClick={() => navigate("/explore")}
            className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold shadow-lg hover:bg-blue-700 transition"
          >
            Mulai Jelajah
          </button>
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
