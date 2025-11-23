import { supabase } from "../config/supabaseClient.js";

export const OrderModel = {
  async create(orderData) {
    const { data, error } = await supabase
      .from("orders")
      .insert([orderData])
      .select();
    if (error) throw error;
    return data[0];
  },

  async getAll() {
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("id", { ascending: false });
    if (error) throw error;
    return data;
  },

  // FITUR UPDATE BARU
  async update(id, newData) {
    const { data, error } = await supabase
      .from("orders")
      .update(newData)
      .eq("id", id)
      .select();
    if (error) throw error;
    return data;
  },

  async remove(id) {
    const { error } = await supabase.from("orders").delete().eq("id", id);
    if (error) throw error;
    return true;
  },

  async removeAll() {
    const { error } = await supabase.from("orders").delete().neq("id", 0);
    if (error) throw error;
    return true;
  },
};
