import React, { useState } from "react";
import { MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom"; // <--- Import penting buat pindah halaman
import DestinationCard from "../components/DestinationCard";
import Pagination from "../components/Pagination";
import { destinations } from "../data/destinations";

const HomePage = () => {
  const navigate = useNavigate(); // <--- Inisialisasi fungsi navigasi
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Logic Pagination
  const totalPages = Math.ceil(destinations.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentDestinations = destinations.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // Fungsi saat kartu diklik
  const handleCardClick = (id) => {
    navigate(`/destination/${id}`); // <--- Perintah pindah ke halaman detail
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
          <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-5 py-3 shadow-lg">
            <MapPin className="w-6 h-6 text-yellow-400" />
            <span className="font-semibold text-lg">
              {destinations.length} Destinasi Menakjubkan
            </span>
          </div>
        </div>
        {/* Hiasan Background */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl"></div>
      </div>

      {/* Info Data */}
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentDestinations.map((dest) => (
          <DestinationCard
            key={dest.id}
            destination={dest}
            onClick={() => handleCardClick(dest.id)} // Panggil fungsi pindah halaman
          />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
};

export default HomePage;
