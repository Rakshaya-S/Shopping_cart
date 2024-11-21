import express from "express";
import { getproducts ,getsingleproduct } from "../controllers/productcontroller.js";

const router=express.Router();

router.get("/products",getproducts)
router.get("/products/:id",getsingleproduct)

export default router;