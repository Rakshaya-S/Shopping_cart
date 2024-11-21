import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import product from "./routes/product.js"; 
import orders from "./routes/order.js"; 
import { connectDB } from "./config/databaseconnect.js";

dotenv.config({ path: './config/config.env' });
const app=express();
app.use(bodyParser.urlencoded({extended:true}));
connectDB();
app.use(express.json())
app.use(cors())
app.use("/api/v1",product);
app.use("/api/v1",orders);
const port=process.env.PORT;

app.listen(port,()=>{
    console.log(`port running on : ${port}`);
})
