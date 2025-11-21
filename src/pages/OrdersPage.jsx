import React, { useState, useEffect } from "react";
import {
  Ticket,
  Calendar,
  MapPin,
  Trash2,
  AlertTriangle,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const OrdersPage = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  // State untuk Modal Konfirmasi
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [targetDeleteId, setTargetDeleteId] = useState(null); // Bisa ID pesanan atau "ALL"

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(storedOrders);
  }, []);

  // --- TRIGGER 1: TOMBOL SAMPAH DIKLIK ---
  const triggerDeleteOne = (id) => {
    setTargetDeleteId(id); // Simpan ID yang mau dihapus
    setShowDeleteModal(true); // Buka Modal
  };

  // --- TRIGGER 2: TOMBOL HAPUS SEMUA DIKLIK ---
  const triggerDeleteAll = () => {
    setTargetDeleteId("ALL"); // Tandai mau hapus semua
    setShowDeleteModal(true); // Buka Modal
  };

  // --- EKSEKUSI: SAAT USER KLIK "YA, HAPUS" DI MODAL ---
  const confirmDelete = () => {
    if (targetDeleteId === "ALL") {
      // Hapus Semua
      setOrders([]);
      localStorage.removeItem("orders");
    } else {
      // Hapus Satu
      const updatedOrders = orders.filter(
        (order) => order.orderId !== targetDeleteId
      );
      setOrders(updatedOrders);
      localStorage.setItem("orders", JSON.stringify(updatedOrders));
    }

    // Tutup Modal
    setShowDeleteModal(false);
    setTargetDeleteId(null);
  };

  return (
    <div className="space-y-6 pb-24 md:pb-8">
      {/* --- CUSTOM DELETE CONFIRMATION MODAL --- */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-6 w-full max-w-sm text-center shadow-2xl transform scale-100 animate-in zoom-in-95 duration-200">
            {/* Icon Peringatan */}
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-4">
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {targetDeleteId === "ALL"
                ? "Hapus Semua Tiket?"
                : "Hapus Tiket Ini?"}
            </h3>

            <p className="text-gray-500 mb-6 text-sm">
              Tindakan ini tidak dapat dibatalkan. Tiket yang sudah dihapus akan
              hilang dari riwayat Anda.
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 py-3 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition"
              >
                Batal
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 py-3 bg-red-600 text-white font-bold rounded-xl shadow-lg hover:bg-red-700 transition active:scale-95"
              >
                Ya, Hapus
              </button>
            </div>
          </div>
        </div>
      )}
      {/* ----------------------------------------- */}

      {/* Header */}
      <div className="px-4 pt-4 flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Pesanan Saya
          </h1>
          <p className="text-gray-500">Riwayat tiket perjalanan Anda</p>
        </div>

        {/* Tombol Hapus Semua */}
        {orders.length > 0 && (
          <button
            onClick={triggerDeleteAll} // Panggil Trigger Custom
            className="text-xs font-bold text-red-500 bg-red-50 px-3 py-2 rounded-lg hover:bg-red-100 transition"
          >
            Hapus Semua
          </button>
        )}
      </div>

      {/* List Tiket */}
      {orders.length > 0 ? (
        <div className="space-y-4 px-4">
          {orders.map((order) => (
            <div
              key={order.orderId}
              className="bg-white rounded-2xl p-5 shadow-md border border-gray-100 flex gap-4 relative overflow-hidden group transition hover:shadow-lg"
            >
              {/* Garis Hiasan Kiri */}
              <div className="absolute left-0 top-0 bottom-0 w-2 bg-blue-600"></div>

              {/* Tombol Hapus Per Item */}
              <button
                onClick={() => triggerDeleteOne(order.orderId)} // Panggil Trigger Custom
                className="absolute top-4 right-4 p-2 bg-gray-50 text-gray-400 rounded-full hover:bg-red-100 hover:text-red-600 transition z-10"
              >
                <Trash2 className="w-4 h-4" />
              </button>

              {/* Konten Tiket */}
              <div className="flex-1 pr-8">
                <h3 className="font-bold text-lg text-gray-900 line-clamp-1">
                  {order.fullName}
                </h3>

                <div className="flex items-center text-gray-500 mt-1 text-sm">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span className="line-clamp-1">{order.location}</span>
                </div>

                <div className="flex items-center text-gray-500 mt-1 text-sm">
                  <Calendar className="w-4 h-4 mr-1" />
                  {new Date(order.date).toLocaleDateString("id-ID", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <span className="bg-green-100 text-green-700 px-2 py-1 rounded-lg text-xs font-bold uppercase">
                    Lunas
                  </span>
                  <span className="font-bold text-blue-600 text-sm">
                    ID: {order.orderId.toString().slice(-6)}
                  </span>
                </div>
              </div>

              {/* Icon Ticket Hiasan */}
              <div className="absolute -bottom-4 -right-4 opacity-10 pointer-events-none">
                <Ticket className="w-24 h-24 text-blue-900" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="min-h-[50vh] flex flex-col items-center justify-center text-center px-8">
          <div className="bg-blue-50 p-6 rounded-full mb-4">
            <Ticket className="w-12 h-12 text-blue-400" />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            Belum ada tiket
          </h3>
          <p className="text-gray-500 mb-6">
            Anda belum memesan perjalanan apapun. Yuk cari destinasi!
          </p>
          <button
            onClick={() => navigate("/explore")}
            className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold shadow-lg hover:bg-blue-700 transition"
          >
            Cari Tiket
          </button>
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
