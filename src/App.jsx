import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
// 1. KITA TAMBAH ICON 'TICKET' DI SINI
import { Home, Compass, Heart, User, Plane, Ticket } from "lucide-react";

// --- IMPORT HALAMAN ---
import HomePage from "./pages/HomePage";
import DestinationsPage from "./pages/DestinationsPage";
import ProfilePage from "./pages/ProfilePage";
import DestinationDetail from "./pages/DestinationDetail";
import FavoritesPage from "./pages/FavoritesPage";
import OrdersPage from "./pages/OrdersPage"; // Pastikan halaman ini sudah dibuat

// --- KOMPONEN NAVIGASI BAWAH (MOBILE) ---
const BottomNav = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  // 2. KITA TAMBAH MENU 'PESANAN' DI SINI
  const navItems = [
    { path: "/", label: "Beranda", icon: Home },
    { path: "/explore", label: "Jelajah", icon: Compass },
    { path: "/orders", label: "Pesanan", icon: Ticket }, // <--- MENU BARU
    { path: "/favorites", label: "Simpan", icon: Heart },
    { path: "/profile", label: "Profil", icon: User },
  ];

  // Sembunyikan navbar di halaman detail agar lebih luas
  if (location.pathname.startsWith("/destination/")) return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-50 pb-safe md:hidden">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center w-full h-full transition-colors ${
                active ? "text-blue-600" : "text-gray-400 hover:text-gray-600"
              }`}
            >
              <Icon className={`w-6 h-6 ${active ? "fill-current" : ""}`} />
              <span className="text-[10px] font-medium mt-1">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

// --- KOMPONEN HEADER (DESKTOP) ---
const Header = () => {
  const location = useLocation();
  // Sembunyikan header di halaman detail
  if (location.pathname.startsWith("/destination/")) return null;

  return (
    <header className="bg-white shadow-sm sticky top-0 z-40 border-b border-gray-200">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-xl">
              <Plane className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-900">Travel App</h1>
          </Link>

          {/* Menu Desktop - UPDATE DI SINI JUGA */}
          <nav className="hidden md:flex md:gap-6">
            <Link
              to="/"
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Beranda
            </Link>
            <Link
              to="/explore"
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Jelajah
            </Link>
            <Link
              to="/orders"
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Pesanan
            </Link>{" "}
            {/* <--- BARU */}
            <Link
              to="/favorites"
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Favorit
            </Link>
            <Link
              to="/profile"
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Profil
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

// --- KOMPONEN UTAMA APP ---
export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 pb-20 md:pb-0 min-h-window">
        <Header />

        {/* Definisi Routing (Pindah Halaman) */}
        <main className="container mx-auto px-4 lg:px-8 py-6 md:py-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/explore" element={<DestinationsPage />} />
            <Route path="/destination/:id" element={<DestinationDetail />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/orders" element={<OrdersPage />} />{" "}
            {/* Pastikan Route ini ada */}
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </main>

        <BottomNav />

        <footer className="hidden md:block bg-gray-900 text-white mt-16">
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
    </Router>
  );
}
