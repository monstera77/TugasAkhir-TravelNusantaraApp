import { supabase } from "../config/supabaseClient.js";

export const OrderModel = {
  // CREATE: Tambah pesanan baru
  async create(orderData) {
    const { data, error } = await supabase
      .from("orders")
      .insert([orderData])
      .select();

    if (error) throw error;
    return data[0];
  },

  // READ: Ambil semua pesanan
  async getAll() {
    // Urutkan dari yang terbaru (descending)
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("id", { ascending: false });

    if (error) throw error;
    return data;
  },

  // DELETE: Hapus pesanan berdasarkan ID
  async remove(id) {
    const { error } = await supabase.from("orders").delete().eq("id", id);

    if (error) throw error;
    return true;
  },

  // DELETE ALL: Hapus semua (Reset)
  async removeAll() {
    const { error } = await supabase.from("orders").delete().neq("id", 0); // Hapus yang ID-nya tidak 0 (semua data)

    if (error) throw error;
    return true;
  },
};
