import express from "express";
import { createorder } from "../controllers/ordercontroller.js";

const router=express.Router();

router.post("/order",createorder);

export default router;