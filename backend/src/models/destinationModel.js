import { supabase } from "../config/supabaseClient.js";

export const DestinationModel = {
  // Ambil semua data
  async getAll() {
    const { data, error } = await supabase
      .from("destinations")
      .select("*")
      .order("id", { ascending: true }); // Urutkan berdasarkan ID

    if (error) throw error;
    return data;
  },

  // Ambil satu data berdasarkan ID
  async getById(id) {
    const { data, error } = await supabase
      .from("destinations")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;
    return data;
  },
};
