import React, { useState, useEffect } from "react";
import { Heart, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import DestinationCard from "../components/DestinationCard";
import { supabase } from "../services/supabaseClient";

const FavoritesPage = () => {
  const navigate = useNavigate();
  const [favoriteDestinations, setFavoriteDestinations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      setLoading(true);

      // 1. Ambil ID dari LocalStorage
      const storedFavorites =
        JSON.parse(localStorage.getItem("favorites")) || [];
      console.log("ID yang tersimpan di Browser:", storedFavorites); // Cek Console

      if (storedFavorites.length === 0) {
        setFavoriteDestinations([]);
        setLoading(false);
        return;
      }

      // 2. Ambil Data dari Supabase
      const { data, error } = await supabase
        .from("destinations")
        .select("*")
        .in("id", storedFavorites);

      if (error) {
        console.error("Error Supabase:", error);
      } else {
        console.log("Data ditemukan di Database:", data); // Cek Console
        setFavoriteDestinations(data || []);
      }
      setLoading(false);
    };

    fetchFavorites();
  }, []);

  // Fitur Reset Favorit (Untuk memperbaiki error ID lama)
  const handleResetFavorites = () => {
    if (confirm("Bersihkan daftar favorit yang error?")) {
      localStorage.removeItem("favorites");
      setFavoriteDestinations([]);
      window.location.reload();
    }
  };

  return (
    <div className="space-y-6 pb-20 md:pb-0">
      <div className="px-4 pt-4 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-1">Disimpan</h1>
          <p className="text-gray-500 text-sm">Daftar destinasi impian Anda</p>
        </div>
        {/* Tombol Bersihkan (Muncul jika ada data tersimpan tapi tidak tampil) */}
        <button
          onClick={handleResetFavorites}
          className="text-xs text-red-500 underline"
        >
          Reset Cache
        </button>
      </div>

      {loading ? (
        <div className="text-center py-20 text-gray-400 animate-pulse">
          Sedang memuat...
        </div>
      ) : favoriteDestinations.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
          {favoriteDestinations.map((dest) => (
            <DestinationCard
              key={dest.id}
              destination={dest}
              onClick={() => navigate(`/destination/${dest.id}`)}
            />
          ))}
        </div>
      ) : (
        <div className="min-h-[50vh] flex flex-col items-center justify-center text-center px-8">
          <div className="bg-red-50 p-6 rounded-full mb-4">
            <Heart className="w-12 h-12 text-red-400 fill-red-400" />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            Belum ada favorit
          </h3>
          <p className="text-gray-500 max-w-xs mb-6 text-sm">
            Jelajahi destinasi dan tekan tombol hati untuk menyimpannya di sini.
          </p>
          <button
            onClick={() => navigate("/explore")}
            className="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold shadow-lg hover:bg-blue-700 transition active:scale-95"
          >
            Mulai Jelajah
          </button>
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
