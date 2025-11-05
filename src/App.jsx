import React, { useState } from "react";
import {
  Home,
  MapPin,
  User,
  Search,
  Plane,
  Star,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

// Data destinasi wisata statis dengan gambar gradient
const destinations = [
  {
    id: 1,
    name: "Bali",
    fullName: "Bali, Indonesia",
    location: "Indonesia",
    description:
      "Bali adalah pulau yang indah dengan pantai berpasir putih, budaya yang kaya, dan pemandangan alam yang menakjubkan.",
    image:
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600'%3E%3Cdefs%3E%3ClinearGradient id='a' x1='0' x2='0' y1='0' y2='1'%3E%3Cstop offset='0' stop-color='%23f97316'/%3E%3Cstop offset='1' stop-color='%23ea580c'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='800' height='600' fill='url(%23a)'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='64' fill='white' text-anchor='middle' dy='.3em'%3EBali%3C/text%3E%3C/svg%3E",
    rating: 4.8,
    category: "Nature",
  },
  {
    id: 2,
    name: "Yogyakarta",
    fullName: "Yogyakarta, Indonesia",
    location: "Indonesia",
    description:
      "Yogyakarta adalah kota budaya dengan candi Borobudur dan Prambanan yang megah, serta keraton yang bersejarah.",
    image:
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600'%3E%3Cdefs%3E%3ClinearGradient id='b' x1='0' x2='0' y1='0' y2='1'%3E%3Cstop offset='0' stop-color='%234f46e5'/%3E%3Cstop offset='1' stop-color='%237c3aed'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='800' height='600' fill='url(%23b)'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='48' fill='white' text-anchor='middle' dy='.3em'%3EYogyakarta%3C/text%3E%3C/svg%3E",
    rating: 4.7,
    category: "Cultural",
  },
  {
    id: 3,
    name: "Raja Ampat",
    fullName: "Raja Ampat, Papua Barat",
    location: "Papua Barat",
    description:
      "Raja Ampat adalah surga bawah laut dengan keanekaragaman hayati laut terkaya di dunia, cocok untuk diving dan snorkeling.",
    image:
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600'%3E%3Cdefs%3E%3ClinearGradient id='c' x1='0' x2='0' y1='0' y2='1'%3E%3Cstop offset='0' stop-color='%2306b6d4'/%3E%3Cstop offset='1' stop-color='%230284c7'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='800' height='600' fill='url(%23c)'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='48' fill='white' text-anchor='middle' dy='.3em'%3ERaja Ampat%3C/text%3E%3C/svg%3E",
    rating: 4.9,
    category: "Nature",
  },
  {
    id: 4,
    name: "Lombok",
    fullName: "Lombok, Nusa Tenggara Barat",
    location: "Nusa Tenggara Barat",
    description:
      "Lombok adalah pulau yang menawarkan pantai eksotis, Gunung Rinjani yang megah, dan budaya Sasak yang unik.",
    image:
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600'%3E%3Cdefs%3E%3ClinearGradient id='d' x1='0' x2='0' y1='0' y2='1'%3E%3Cstop offset='0' stop-color='%2310b981'/%3E%3Cstop offset='1' stop-color='%23059669'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='800' height='600' fill='url(%23d)'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='64' fill='white' text-anchor='middle' dy='.3em'%3ELombok%3C/text%3E%3C/svg%3E",
    rating: 4.6,
    category: "Nature",
  },
  {
    id: 5,
    name: "Bandung",
    fullName: "Bandung, Jawa Barat",
    location: "Jawa Barat",
    description:
      "Bandung adalah kota yang sejuk dengan pemandangan pegunungan, kuliner lezat, dan factory outlet yang terkenal.",
    image:
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600'%3E%3Cdefs%3E%3ClinearGradient id='e' x1='0' x2='0' y1='0' y2='1'%3E%3Cstop offset='0' stop-color='%23ec4899'/%3E%3Cstop offset='1' stop-color='%23db2777'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='800' height='600' fill='url(%23e)'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='64' fill='white' text-anchor='middle' dy='.3em'%3EBandung%3C/text%3E%3C/svg%3E",
    rating: 4.5,
    category: "Urban",
  },
  {
    id: 6,
    name: "Bromo",
    fullName: "Gunung Bromo, Jawa Timur",
    location: "Jawa Timur",
    description:
      "Gunung Bromo adalah gunung berapi aktif yang terkenal dengan pemandangan sunrise spektakuler dan lautan pasir yang luas.",
    image:
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600'%3E%3Cdefs%3E%3ClinearGradient id='f' x1='0' x2='0' y1='0' y2='1'%3E%3Cstop offset='0' stop-color='%23f59e0b'/%3E%3Cstop offset='1' stop-color='%23d97706'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='800' height='600' fill='url(%23f)'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='64' fill='white' text-anchor='middle' dy='.3em'%3EBromo%3C/text%3E%3C/svg%3E",
    rating: 4.7,
    category: "Nature",
  },
  {
    id: 7,
    name: "Labuan Bajo",
    fullName: "Labuan Bajo, Nusa Tenggara Timur",
    location: "Nusa Tenggara Timur",
    description:
      "Labuan Bajo adalah gerbang menuju Taman Nasional Komodo dengan pantai pink dan kehidupan laut yang menakjubkan.",
    image:
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' x2='0' y1='0' y2='1'%3E%3Cstop offset='0' stop-color='%238b5cf6'/%3E%3Cstop offset='1' stop-color='%236d28d9'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='800' height='600' fill='url(%23g)'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='48' fill='white' text-anchor='middle' dy='.3em'%3ELabuan Bajo%3C/text%3E%3C/svg%3E",
    rating: 4.8,
    category: "Nature",
  },
  {
    id: 8,
    name: "Danau Toba",
    fullName: "Danau Toba, Sumatera Utara",
    location: "Sumatera Utara",
    description:
      "Danau Toba adalah danau vulkanik terbesar di Asia Tenggara dengan Pulau Samosir di tengahnya yang menawarkan keindahan alam.",
    image:
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600'%3E%3Cdefs%3E%3ClinearGradient id='h' x1='0' x2='0' y1='0' y2='1'%3E%3Cstop offset='0' stop-color='%2314b8a6'/%3E%3Cstop offset='1' stop-color='%230d9488'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='800' height='600' fill='url(%23h)'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='48' fill='white' text-anchor='middle' dy='.3em'%3EDanau Toba%3C/text%3E%3C/svg%3E",
    rating: 4.7,
    category: "Nature",
  },
  {
    id: 9,
    name: "Malang",
    fullName: "Malang, Jawa Timur",
    location: "Jawa Timur",
    description:
      "Malang adalah kota yang sejuk dengan banyak destinasi wisata alam, kuliner khas, dan arsitektur kolonial yang menarik.",
    image:
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600'%3E%3Cdefs%3E%3ClinearGradient id='i' x1='0' x2='0' y1='0' y2='1'%3E%3Cstop offset='0' stop-color='%2306b6d4'/%3E%3Cstop offset='1' stop-color='%2308a1c4'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='800' height='600' fill='url(%23i)'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='64' fill='white' text-anchor='middle' dy='.3em'%3EMalang%3C/text%3E%3C/svg%3E",
    rating: 4.6,
    category: "Urban",
  },
];

// Komponen Card Destinasi
const DestinationCard = ({ destination, onClick }) => (
  <div
    onClick={onClick}
    className="bg-white rounded-2xl shadow-md overflow-hidden cursor-pointer transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
  >
    <div className="relative h-64">
      <img
        src={destination.image}
        alt={destination.name}
        className="w-full h-full object-cover"
      />
      <div className="absolute top-4 right-4 bg-white px-3 py-1.5 rounded-full flex items-center gap-1 shadow-lg">
        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
        <span className="text-sm font-bold text-gray-800">
          {destination.rating}
        </span>
      </div>
    </div>
    <div className="p-5">
      <h3 className="text-xl font-bold text-gray-900 mb-1">
        {destination.fullName}
      </h3>
      <p className="text-sm text-gray-600 mb-3">{destination.location}</p>
      <p className="text-sm text-gray-700 line-clamp-2">
        {destination.description}
      </p>
    </div>
  </div>
);

// Komponen Modal Detail
const DestinationModal = ({ destination, onClose }) => {
  if (!destination) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative h-80">
          <img
            src={destination.image}
            alt={destination.name}
            className="w-full h-full object-cover"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="p-8">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {destination.fullName}
              </h2>
              <div className="flex items-center text-gray-600">
                <MapPin className="w-5 h-5 mr-2" />
                <span className="text-lg">{destination.location}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-yellow-50 px-4 py-2 rounded-full">
              <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
              <span className="text-xl font-bold">{destination.rating}</span>
            </div>
          </div>
          <p className="text-gray-700 text-lg leading-relaxed">
            {destination.description}
          </p>
        </div>
      </div>
    </div>
  );
};

// Komponen Pagination
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex justify-center items-center gap-2 mt-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`p-2 rounded-lg ${
          currentPage === 1
            ? "text-gray-400 cursor-not-allowed"
            : "text-gray-700 hover:bg-gray-100"
        }`}
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`w-10 h-10 rounded-lg font-semibold transition-all ${
            currentPage === page
              ? "bg-blue-600 text-white"
              : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`p-2 rounded-lg ${
          currentPage === totalPages
            ? "text-gray-400 cursor-not-allowed"
            : "text-gray-700 hover:bg-gray-100"
        }`}
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
};

// Halaman Beranda
const HomePage = ({ onDestinationClick }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const totalPages = Math.ceil(destinations.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentDestinations = destinations.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="bg-linear-to-br from-blue-600 via-blue-700 to-blue-800 rounded-3xl p-10 text-white shadow-xl">
        <h1 className="text-5xl font-bold mb-4">Jelajahi Indonesia</h1>
        <p className="text-xl mb-6">
          Temukan destinasi wisata terbaik di Nusantara
        </p>
        <div className="inline-flex items-center gap-3 bg-white rounded-xl px-5 py-3 shadow-lg">
          <MapPin className="w-6 h-6 text-blue-600" />
          <span className="font-semibold text-lg text-gray-900">
            {destinations.length} Destinasi Menakjubkan
          </span>
        </div>
      </div>

      {/* Results Info */}
      <div className="text-gray-600">
        Menampilkan{" "}
        <span className="font-semibold">
          {indexOfFirstItem + 1}-
          {Math.min(indexOfLastItem, destinations.length)}
        </span>{" "}
        dari <span className="font-semibold">{destinations.length}</span>{" "}
        destinasi
      </div>

      {/* Destinations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentDestinations.map((dest) => (
          <DestinationCard
            key={dest.id}
            destination={dest}
            onClick={() => onDestinationClick(dest)}
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

// Halaman Destinasi dengan Search
const DestinationsPage = ({ onDestinationClick }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Filter berdasarkan search
  const filteredDestinations = destinations.filter(
    (dest) =>
      dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dest.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dest.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Reset ke halaman 1 saat search berubah
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  // Pagination logic
  const totalPages = Math.ceil(filteredDestinations.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentDestinations = filteredDestinations.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-gray-900 mb-3">
          Semua Destinasi Wisata
        </h1>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Cari destinasi, negara, atau aktivitas..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Results Info */}
      <div className="text-gray-600">
        Menampilkan{" "}
        <span className="font-semibold">
          {filteredDestinations.length > 0 ? indexOfFirstItem + 1 : 0}-
          {Math.min(indexOfLastItem, filteredDestinations.length)}
        </span>{" "}
        dari{" "}
        <span className="font-semibold">{filteredDestinations.length}</span>{" "}
        destinasi
      </div>

      {/* Destinations Grid */}
      {currentDestinations.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentDestinations.map((dest) => (
              <DestinationCard
                key={dest.id}
                destination={dest}
                onClick={() => onDestinationClick(dest)}
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
        </>
      ) : (
        <div className="text-center py-16">
          <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            Tidak ada destinasi ditemukan
          </h3>
          <p className="text-gray-500">
            Coba gunakan kata kunci lain untuk mencari destinasi
          </p>
        </div>
      )}
    </div>
  );
};

// Halaman Profil
const ProfilePage = () => {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="bg-linear-to-br from-blue-600 via-blue-700 to-blue-800 rounded-3xl p-10 text-white shadow-xl">
        <div className="flex items-center gap-6">
          <img
            src="https://github.com/monstera77.png"
            alt="Foto Profil Mustofa Ahmad Rusli"
            className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
          />
          <div>
            <h1 className="text-4xl font-bold mb-2">Profil Mahasiswa</h1>
            <p className="text-blue-100 text-lg">
              Informasi Pengembang Aplikasi
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
        <div className="p-8 space-y-6">
          <div className="pb-6 border-b border-gray-200">
            <label className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-2 block">
              Nama Lengkap
            </label>
            <p className="text-3xl font-bold text-gray-900">
              Mustofa Ahmad Rusli
            </p>
          </div>

          <div className="pb-6 border-b border-gray-200">
            <label className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-2 block">
              NIM
            </label>
            <p className="text-3xl font-bold text-gray-900">21120123120034</p>
          </div>

          <div className="pb-6 border-b border-gray-200">
            <label className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-2 block">
              Kelompok
            </label>
            <p className="text-3xl font-bold text-gray-900">25</p>
          </div>

          <div className="pt-2">
            <label className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-3 block">
              Tentang Aplikasi
            </label>
            <p className="text-gray-700 leading-relaxed text-lg">
              Travel Nusantara adalah aplikasi Progressive Web App (PWA) yang
              menampilkan destinasi wisata terbaik di Indonesia. Aplikasi ini
              dapat diinstall di perangkat Anda dan bekerja secara offline.
            </p>
          </div>
        </div>

        <div className="bg-gray-50 px-8 py-6">
          <h3 className="font-bold text-gray-900 mb-4 text-lg">
            Teknologi yang Digunakan
          </h3>
          <div className="flex flex-wrap gap-3">
            {[
              "React.js",
              "Vite",
              "Tailwind CSS",
              "vite-plugin-pwa",
              "JavaScript",
            ].map((tech) => (
              <span
                key={tech}
                className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Komponen Utama
export default function TravelApp() {
  const [currentPage, setCurrentPage] = useState("home");
  const [selectedDestination, setSelectedDestination] = useState(null);

  const navItems = [
    { id: "home", label: "Beranda", icon: Home },
    { id: "destinations", label: "Destinasi", icon: MapPin },
    { id: "profile", label: "Profil", icon: User },
  ];

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage onDestinationClick={setSelectedDestination} />;
      case "destinations":
        return <DestinationsPage onDestinationClick={setSelectedDestination} />;
      case "profile":
        return <ProfilePage />;
      default:
        return <HomePage onDestinationClick={setSelectedDestination} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24 md:pb-0">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40 border-b border-gray-200">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 p-2 rounded-xl">
                <Plane className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">Travel App</h1>
            </div>

            <nav className="hidden md:flex md:gap-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setCurrentPage(item.id)}
                    className={`flex items-center gap-2 px-6 py-2 rounded-xl font-semibold transition-all ${
                      currentPage === item.id
                        ? "bg-blue-600 text-white"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {/* Label ini sekarang hanya akan tampil di desktop */}
                    <span className="sm:inline">{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 lg:px-8 py-8 pb-24 md:pb-8">
        {renderPage()}
      </main>

      {/* Modal */}
      {selectedDestination && (
        <DestinationModal
          destination={selectedDestination}
          onClose={() => setSelectedDestination(null)}
        />
      )}

      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-t-lg z-40">
        <div className="flex justify-around max-w-full mx-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`flex flex-col items-center justify-center w-full pt-2 pb-1 transition-all ${
                  isActive ? "text-blue-600" : "text-gray-500"
                }`}
              >
                <Icon className="w-6 h-6" />
                <span className="text-xs mt-1">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-16">
        <div className="container mx-auto px-4 lg:px-8 py-8 text-center">
          <p className="text-gray-300">
            © 2025 Travel Nusantara - Mustofa Kelompok 25
          </p>
          <p className="text-gray-400 text-sm mt-2">
            Progressive Web App by Mustofa Ahmad Rusli
          </p>
        </div>
      </footer>
    </div>
  );
}
