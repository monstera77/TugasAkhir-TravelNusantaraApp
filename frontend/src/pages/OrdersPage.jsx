/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import {
  Calendar,
  MapPin,
  Trash2,
  AlertTriangle,
  Edit2,
  X,
  Save,
} from "lucide-react"; // Tambah Icon Edit2, Save
import { useNavigate } from "react-router-dom";

const OrdersPage = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  // State Modal Hapus
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [targetDeleteId, setTargetDeleteId] = useState(null);

  // State Modal Edit (UPDATE)
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null); // Data tiket yang sedang diedit
  const [newDate, setNewDate] = useState(""); // Tanggal baru yang dipilih

  // --- READ ---
  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch(
        "http://https://tugas-akhir-travel-nusantara-app.vercel.app/api/orders"
      );
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error(error);
    }
  };

  // --- DELETE LOGIC ---
  const triggerDeleteOne = (id) => {
    setTargetDeleteId(id);
    setShowDeleteModal(true);
  };
  const triggerDeleteAll = () => {
    setTargetDeleteId("ALL");
    setShowDeleteModal(true);
  };
  const confirmDelete = async () => {
    try {
      if (targetDeleteId === "ALL") {
        await fetch(
          "http://https://tugas-akhir-travel-nusantara-app.vercel.app/api/orders",
          { method: "DELETE" }
        );
      } else {
        await fetch(
          `http://https://tugas-akhir-travel-nusantara-app.vercel.app/api/orders/${targetDeleteId}`,
          {
            method: "DELETE",
          }
        );
      }
      fetchOrders();
    } catch (error) {
      alert("Gagal menghapus.");
    } finally {
      setShowDeleteModal(false);
      setTargetDeleteId(null);
    }
  };

  // --- UPDATE LOGIC (BARU) ---
  const triggerEdit = (order) => {
    setEditingOrder(order);
    // Format tanggal untuk input date HTML (YYYY-MM-DD)
    const dateObj = new Date(order.date);
    const formattedDate = dateObj.toISOString().split("T")[0];
    setNewDate(formattedDate);
    setShowEditModal(true);
  };

  const confirmUpdate = async () => {
    try {
      const response = await fetch(
        `http://https://tugas-akhir-travel-nusantara-app.vercel.app/api/orders/${editingOrder.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            date: new Date(newDate).toISOString(), // Kirim tanggal baru
            status: "Reschedule", // Ubah status jadi Reschedule
          }),
        }
      );

      if (response.ok) {
        fetchOrders(); // Refresh data
        setShowEditModal(false);
        setEditingOrder(null);
      } else {
        alert("Gagal mengupdate tiket.");
      }
    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan.");
    }
  };

  return (
    <div className="space-y-6 pb-24 md:pb-8">
      {/* --- MODAL EDIT (UPDATE) --- */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 w-full max-w-sm shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-900">Ubah Jadwal</h3>
              <button onClick={() => setShowEditModal(false)}>
                <X className="w-6 h-6 text-gray-400" />
              </button>
            </div>

            <p className="text-sm text-gray-500 mb-2">
              Pilih tanggal keberangkatan baru:
            </p>
            <input
              type="date"
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-xl font-bold text-gray-700 mb-6 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />

            <button
              onClick={confirmUpdate}
              className="w-full py-3 bg-blue-600 text-white font-bold rounded-xl shadow-lg hover:bg-blue-700 flex items-center justify-center gap-2"
            >
              <Save className="w-5 h-5" /> Simpan Perubahan
            </button>
          </div>
        </div>
      )}

      {/* --- MODAL HAPUS --- */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 w-full max-w-sm text-center shadow-2xl">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-4">
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {targetDeleteId === "ALL" ? "Hapus Semua?" : "Hapus Tiket Ini?"}
            </h3>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 py-3 bg-gray-100 text-gray-700 font-bold rounded-xl"
              >
                Batal
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 py-3 bg-red-600 text-white font-bold rounded-xl shadow-lg"
              >
                Ya, Hapus
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="px-4 pt-4 flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-1">
            Pesanan Saya
          </h1>
          <p className="text-gray-500 text-sm">Kelola tiket perjalanan Anda</p>
        </div>
        {orders.length > 0 && (
          <button
            onClick={triggerDeleteAll}
            className="text-xs font-bold text-red-500 bg-red-50 px-3 py-2 rounded-lg hover:bg-red-100 transition"
          >
            Hapus Semua
          </button>
        )}
      </div>

      {/* List Orders */}
      {orders.length > 0 ? (
        <div className="space-y-4 px-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden flex flex-col md:flex-row"
            >
              {/* Gambar */}
              <div className="h-32 md:h-auto md:w-40 bg-gray-200 relative">
                <img
                  src={order.image}
                  alt={order.fullName}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 left-2 bg-blue-600 text-white text-[10px] font-bold px-2 py-1 rounded-md shadow-sm">
                  TIKET
                </div>
              </div>

              {/* Info */}
              <div className="p-4 flex-1 relative">
                <div className="absolute top-4 right-4 flex gap-2">
                  {/* TOMBOL EDIT (BARU) */}
                  <button
                    onClick={() => triggerEdit(order)}
                    className="text-gray-300 hover:text-blue-500 transition"
                    title="Ubah Jadwal"
                  >
                    <Edit2 className="w-5 h-5" />
                  </button>
                  {/* TOMBOL HAPUS */}
                  <button
                    onClick={() => triggerDeleteOne(order.id)}
                    className="text-gray-300 hover:text-red-500 transition"
                    title="Hapus"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>

                <h3 className="font-bold text-lg text-gray-900 pr-16 line-clamp-1">
                  {order.fullName || order.fullname || order.name}
                </h3>

                <div className="flex items-center text-gray-500 mt-1 text-xs md:text-sm">
                  <MapPin className="w-3 h-3 mr-1" />
                  {order.location}
                </div>

                <div className="flex items-center text-gray-500 mt-1 text-xs md:text-sm">
                  <Calendar className="w-3 h-3 mr-1" />
                  {new Date(order.date).toLocaleDateString("id-ID", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </div>

                <hr className="my-3 border-dashed border-gray-200" />

                <div className="flex items-center justify-between">
                  <span
                    className={`px-2 py-1 rounded text-[10px] font-bold border ${
                      order.status === "Reschedule"
                        ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                        : "bg-green-50 text-green-700 border-green-100"
                    }`}
                  >
                    {order.status || "LUNAS"}
                  </span>
                  <span className="text-gray-400 text-xs font-mono">
                    ID: #{order.id}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="min-h-[50vh] flex flex-col items-center justify-center text-center px-8">
          {/* Tampilan Kosong sama seperti sebelumnya... */}
          <p className="text-gray-500">Belum ada pesanan.</p>
          <button
            onClick={() => navigate("/explore")}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-full shadow-lg"
          >
            Cari Tiket
          </button>
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
