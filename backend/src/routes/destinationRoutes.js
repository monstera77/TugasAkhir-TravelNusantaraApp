import express from "express";
import { DestinationController } from "../controllers/destinationController.js";

const router = express.Router();

// Route: GET /api/destinations
router.get("/", DestinationController.getAll);

// Route: GET /api/destinations/:id
router.get("/:id", DestinationController.getById);

export default router;
