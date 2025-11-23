import { DestinationModel } from "../models/destinationModel.js";

export const DestinationController = {
  async getAll(req, res) {
    try {
      const destinations = await DestinationModel.getAll();
      res.json(destinations);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async getById(req, res) {
    try {
      const { id } = req.params;
      const destination = await DestinationModel.getById(id);

      if (!destination) {
        return res.status(404).json({ error: "Wisata tidak ditemukan" });
      }

      res.json(destination);
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  },
};
