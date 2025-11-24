import React, { useState, useEffect } from "react";
import {
  Calendar,
  MapPin,
  Trash2,
  AlertTriangle,
  Edit2,
  X,
  Save,
  Ticket,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../services/supabaseClient";

const OrdersPage = () => {
  const navigate = useNavigate(); // Ini harus dipakai di bawah
  const [orders, setOrders] = useState([]);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [targetDeleteId, setTargetDeleteId] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);
  const [newDate, setNewDate] = useState("");

  // --- READ (SUPABASE) ---
  const fetchOrders = async () => {
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("id", { ascending: false });

    if (error)
      console.error("Error fetching:", error); // Fix: Gunakan variable error
    else setOrders(data);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // --- DELETE (SUPABASE) ---
  const confirmDelete = async () => {
    try {
      if (targetDeleteId === "ALL") {
        await supabase.from("orders").delete().neq("id", 0);
      } else {
        await supabase.from("orders").delete().eq("id", targetDeleteId);
      }
      fetchOrders();
    } catch (error) {
      console.error(error); // Fix: Gunakan variable error
      alert("Gagal menghapus.");
    } finally {
      setShowDeleteModal(false);
      setTargetDeleteId(null);
    }
  };

  // --- UPDATE (SUPABASE) ---
  const confirmUpdate = async () => {
    try {
      const { error } = await supabase
        .from("orders")
        .update({
          date: new Date(newDate).toISOString(),
          status: "Reschedule",
        })
        .eq("id", editingOrder.id);

      if (!error) {
        fetchOrders();
        setShowEditModal(false);
        setEditingOrder(null);
      } else {
        alert("Gagal update: " + error.message);
      }
    } catch (error) {
      console.error(error); // Fix: Gunakan variable error
    }
  };

  const triggerDeleteOne = (e, id) => {
    e.stopPropagation();
    setTargetDeleteId(id);
    setShowDeleteModal(true);
  };
  const triggerEdit = (e, order) => {
    e.stopPropagation();
    setEditingOrder(order);
    setNewDate(new Date(order.date).toISOString().split("T")[0]);
    setShowEditModal(true);
  };
  const triggerDeleteAll = () => {
    setTargetDeleteId("ALL");
    setShowDeleteModal(true);
  };

  return (
    <div className="space-y-6 pb-24 md:pb-8">
      {/* Modal Edit */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl p-6 w-full max-w-sm">
            <div className="flex justify-between mb-4">
              <h3 className="font-bold">Ubah Jadwal</h3>
              <button onClick={() => setShowEditModal(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <input
              type="date"
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
              className="w-full border p-2 rounded mb-4"
            />
            <button
              onClick={confirmUpdate}
              className="w-full bg-blue-600 text-white py-2 rounded flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" /> Simpan
            </button>
          </div>
        </div>
      )}

      {/* Modal Hapus */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl p-6 w-full max-w-sm text-center">
            <AlertTriangle className="mx-auto h-12 w-12 text-red-500 mb-4" />
            <h3 className="font-bold mb-4">Hapus?</h3>
            <div className="flex gap-2">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 bg-gray-100 py-2 rounded"
              >
                Batal
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 bg-red-600 text-white py-2 rounded"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="px-4 pt-4 flex justify-between">
        <h1 className="text-3xl font-bold">Pesanan Saya</h1>
        {orders.length > 0 && (
          <button
            onClick={triggerDeleteAll}
            className="text-red-500 font-bold text-xs bg-red-50 px-2 py-1 rounded"
          >
            Hapus Semua
          </button>
        )}
      </div>

      {orders.length > 0 ? (
        <div className="space-y-4 px-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-2xl shadow border flex overflow-hidden group hover:shadow-md transition"
            >
              <div className="w-32 bg-gray-200 relative">
                <img
                  src={order.image}
                  className="w-full h-full object-cover"
                  alt={order.fullName}
                />
                <div className="absolute top-1 left-1 bg-blue-600 text-white text-[10px] px-1 rounded">
                  TIKET
                </div>
              </div>
              <div className="p-3 flex-1 relative">
                <div className="absolute top-2 right-2 flex gap-1 bg-white/80 p-1 rounded shadow-sm">
                  <button onClick={(e) => triggerEdit(e, order)}>
                    <Edit2 className="w-4 h-4 text-blue-500" />
                  </button>
                  <button onClick={(e) => triggerDeleteOne(e, order.id)}>
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </button>
                </div>
                <h3 className="font-bold line-clamp-1 pr-12">
                  {order.fullName}
                </h3>
                <div className="text-xs text-gray-500 mt-1">
                  <MapPin className="w-3 h-3 inline" /> {order.location}
                </div>
                <div className="text-xs text-gray-500">
                  <Calendar className="w-3 h-3 inline" />{" "}
                  {new Date(order.date).toLocaleDateString()}
                </div>
                <div className="mt-2 flex justify-between items-center">
                  <span className="bg-green-100 text-green-700 text-[10px] px-2 py-0.5 rounded">
                    {order.status || "Lunas"}
                  </span>
                  <span className="text-[10px] text-gray-400">#{order.id}</span>
                </div>
                {order.visitor_name && (
                  <div className="text-[10px] text-gray-500 mt-1">
                    Pemesan: {order.visitor_name}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 px-4">
          <Ticket className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 mb-4">Belum ada pesanan.</p>
          {/* Fix: Tombol ini menggunakan navigate */}
          <button
            onClick={() => navigate("/explore")}
            className="px-6 py-2 bg-blue-600 text-white rounded-full shadow-lg"
          >
            Cari Tiket
          </button>
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
