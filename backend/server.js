import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import mongoose from "mongoose";

import  authRoutes from "./routes/auth.route.js";
import  seatRoutes from "./routes/seat.route.js";
import  reservationRoutes from "./routes/reservation.route.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/seats", seatRoutes);
app.use("/api/reservations", reservationRoutes);

//console.log(process.env.MONGO_URI);
const PORT = process.env.PORT || 5000;
//connectDB(); 
app.listen(PORT, () => {
    connectDB();
    console.log("✅ Server successfully started at http://localhost:"+PORT);
})

app.get("/", (req, res) => {
  res.send("Backend is running!");
});
//8ac4QE1un07An0Mv