import express from "express";
import { OrderController } from "../controllers/orderController.js";

const router = express.Router();

router.post("/", OrderController.createOrder); // Create
router.get("/", OrderController.getOrders); // Read
router.delete("/:id", OrderController.deleteOrder); // Delete One
router.delete("/", OrderController.deleteAll); // Delete All
router.put("/:id", OrderController.updateOrder);

export default router;
