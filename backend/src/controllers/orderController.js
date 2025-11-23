import { OrderModel } from "../models/orderModel.js";

export const OrderController = {
  // Tambah Pesanan
  async createOrder(req, res) {
    try {
      const newOrder = await OrderModel.create(req.body);
      res.status(201).json(newOrder);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Lihat Pesanan
  async getOrders(req, res) {
    try {
      const orders = await OrderModel.getAll();
      res.json(orders);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Hapus Satu Pesanan
  async deleteOrder(req, res) {
    try {
      await OrderModel.remove(req.params.id);
      res.json({ message: "Pesanan dihapus" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Hapus Semua Pesanan
  async deleteAll(req, res) {
    try {
      await OrderModel.removeAll();
      res.json({ message: "Semua pesanan dihapus" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};
