import React, { useState, useEffect } from "react";
import { Ticket, Calendar, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";

const OrdersPage = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Ambil data pesanan dari LocalStorage
    const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(storedOrders);
  }, []);

  return (
    <div className="space-y-6 pb-24 md:pb-8">
      <div className="px-4 pt-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Pesanan Saya</h1>
        <p className="text-gray-500">Riwayat tiket perjalanan Anda</p>
      </div>

      {orders.length > 0 ? (
        <div className="space-y-4 px-4">
          {orders.map((order, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-5 shadow-md border border-gray-100 flex gap-4 relative overflow-hidden"
            >
              {/* Garis Hiasan Kiri */}
              <div className="absolute left-0 top-0 bottom-0 w-2 bg-blue-600"></div>

              {/* Konten Tiket */}
              <div className="flex-1">
                <h3 className="font-bold text-lg text-gray-900">
                  {order.fullName}
                </h3>

                <div className="flex items-center text-gray-500 mt-1 text-sm">
                  <MapPin className="w-4 h-4 mr-1" />
                  {order.location}
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
                  <span className="font-bold text-blue-600">1x Tiket</span>
                </div>
              </div>

              {/* Icon Ticket */}
              <div className="flex items-center justify-center border-l border-dashed border-gray-200 pl-4">
                <Ticket className="w-8 h-8 text-gray-300" />
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
