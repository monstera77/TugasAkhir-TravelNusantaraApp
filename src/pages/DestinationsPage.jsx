import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom"; // <--- Import Navigasi
import DestinationCard from "../components/DestinationCard";
import Pagination from "../components/Pagination";
import { destinations } from "../data/destinations";

const DestinationsPage = () => {
  const navigate = useNavigate(); // <--- Hook Navigasi
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Filter Logic
  const filteredDestinations = destinations.filter(
    (dest) =>
      dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dest.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dest.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Reset halaman ke 1 kalau user mengetik search baru
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredDestinations.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentDestinations = filteredDestinations.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  return (
    <div className="space-y-6 pb-20 md:pb-0">
      {/* Header */}
      <div className="px-2">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Semua Destinasi
        </h1>
        <p className="text-gray-500">Cari tempat liburan impianmu berikutnya</p>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Cari Bali, Pantai, atau Gunung..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition-all"
        />
      </div>

      {/* Content Grid */}
      {currentDestinations.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentDestinations.map((dest) => (
              <DestinationCard
                key={dest.id}
                destination={dest}
                onClick={() => navigate(`/destination/${dest.id}`)} // <--- Langsung navigasi
              />
            ))}
          </div>

          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </>
      ) : (
        // Tampilan kalau tidak ada hasil search
        <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
          <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            Tidak ada destinasi ditemukan
          </h3>
          <p className="text-gray-500 max-w-xs mx-auto">
            Coba gunakan kata kunci lain seperti "Pantai" atau nama kota.
          </p>
        </div>
      )}
    </div>
  );
};

export default DestinationsPage;
