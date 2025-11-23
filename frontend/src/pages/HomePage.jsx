import React, { useState, useEffect } from "react";
import { MapPin, WifiOff } from "lucide-react"; // Tambah icon WifiOff
import { useNavigate } from "react-router-dom";
import DestinationCard from "../components/DestinationCard";
import Pagination from "../components/Pagination";

const HomePage = () => {
  const navigate = useNavigate();
  const [destinations, setDestinations] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isOffline, setIsOffline] = useState(false); // State untuk cek offline
  const itemsPerPage = 6;

  useEffect(() => {
    // Cek koneksi saat pertama kali buka
    if (!navigator.onLine) {
      setIsOffline(true);
    }

    fetch("http://localhost:3000/api/destinations")
      .then((response) => response.json())
      .then((data) => {
        setDestinations(data);
        setIsOffline(false); // Kalau berhasil ambil data, berarti online
      })
      .catch((error) => {
        console.error("Gagal mengambil data:", error);
        setIsOffline(true); // Kalau gagal, anggap offline/server mati
      });
  }, []);

  // Logic Pagination
  const totalPages = Math.ceil(destinations.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentDestinations = destinations.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const handleCardClick = (id) => {
    navigate(`/destination/${id}`);
  };

  return (
    <div className="space-y-6 pb-20 md:pb-0">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 rounded-3xl p-8 md:p-10 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Jelajahi Indonesia
          </h1>
          <p className="text-lg md:text-xl mb-6 text-blue-100">
            Temukan destinasi wisata terbaik di Nusantara
          </p>

          {/* GANTI LOGIC TAMPILAN JUMLAH DESTINASI */}
          {isOffline ? (
            <div className="inline-flex items-center gap-2 bg-red-500/20 backdrop-blur-md border border-red-400/30 rounded-xl px-5 py-3 shadow-lg">
              <WifiOff className="w-6 h-6 text-white" />
              <span className="font-semibold text-lg">Mode Offline</span>
            </div>
          ) : (
            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-5 py-3 shadow-lg">
              <MapPin className="w-6 h-6 text-yellow-400" />
              <span className="font-semibold text-lg">
                {destinations.length} Destinasi Menakjubkan
              </span>
            </div>
          )}
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl"></div>
      </div>

      {/* --- TAMPILAN JIKA OFFLINE --- */}
      {isOffline ? (
        <div className="text-center py-16 px-4">
          <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <WifiOff className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            Tidak Ada Koneksi
          </h3>
          <p className="text-gray-500 max-w-md mx-auto">
            Sepertinya Anda sedang offline atau server tidak dapat dihubungi.
            Silakan periksa koneksi internet Anda untuk melihat data terbaru.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition"
          >
            Coba Lagi
          </button>
        </div>
      ) : (
        // --- TAMPILAN NORMAL (ONLINE) ---
        <>
          <div className="flex justify-between items-center text-gray-600 px-2">
            <p>
              Menampilkan{" "}
              <span className="font-bold text-gray-900">
                {currentDestinations.length}
              </span>{" "}
              destinasi terpopuler
            </p>
          </div>

          {/* Grid Destinasi */}
          {destinations.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentDestinations.map((dest) => (
                <DestinationCard
                  key={dest.id}
                  destination={dest}
                  onClick={() => handleCardClick(dest.id)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-gray-500">
              Memuat data dari server...
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </>
      )}
    </div>
  );
};

export default HomePage;
