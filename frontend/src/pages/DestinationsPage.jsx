import React, { useState, useEffect } from "react";
import { Search, Plus } from "lucide-react"; // Tambah Plus
import { useNavigate } from "react-router-dom";
import DestinationCard from "../components/DestinationCard";
import Pagination from "../components/Pagination";
import { supabase } from "../services/supabaseClient"; // IMPORT SUPABASE

const DestinationsPage = () => {
  const navigate = useNavigate();
  const [destinations, setDestinations] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // --- AMBIL DATA LANGSUNG DARI SUPABASE ---
  useEffect(() => {
    const fetchDestinations = async () => {
      const { data, error } = await supabase
        .from("destinations")
        .select("*")
        .order("id", { ascending: true });

      if (error) console.error(error);
      else setDestinations(data);
    };
    fetchDestinations();
  }, []);

  // Filter Logic
  const filteredDestinations = destinations.filter(
    (dest) =>
      dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dest.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dest.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const totalPages = Math.ceil(filteredDestinations.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentDestinations = filteredDestinations.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  return (
    <div className="space-y-6 pb-20 md:pb-0 relative">
      <div className="px-2">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Semua Destinasi
        </h1>
        <p className="text-gray-500">Cari tempat liburan impianmu berikutnya</p>
      </div>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Cari Bali, Pantai, atau Gunung..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-2xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {currentDestinations.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentDestinations.map((dest) => (
              <DestinationCard
                key={dest.id}
                destination={dest}
                onClick={() => navigate(`/destination/${dest.id}`)}
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
        <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
          <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            {destinations.length === 0 ? "Memuat..." : "Tidak ditemukan"}
          </h3>
        </div>
      )}

      {/* FAB: TOMBOL TAMBAH DESTINASI (Revisi Asisten) */}
      <button
        onClick={() => navigate("/add-destination")}
        className="fixed bottom-24 right-4 bg-blue-600 text-white p-4 rounded-full shadow-xl z-30 hover:bg-blue-700 transition md:bottom-8 md:right-8"
      >
        <Plus className="w-6 h-6" />
      </button>
    </div>
  );
};

export default DestinationsPage;
