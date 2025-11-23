import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import destinationRoutes from "./routes/destinationRoutes.js";
import orderRoutes from "./routes/orderRoutes.js"; // <--- 1. IMPORT ROUTE ORDER

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Agar Frontend bisa akses Backend
app.use(express.json());

// Routes Utama
app.use("/api/destinations", destinationRoutes);
app.use("/api/orders", orderRoutes); // <--- 2. DAFTARKAN URL ORDER

// Cek status server
app.get("/", (req, res) => {
  res.send("Server Travel Nusantara Berjalan!");
});

// Jalankan Server
app.listen(port, () => {
  console.log(`Server backend berjalan di http://localhost:${port}`);
});
