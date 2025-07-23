import { connectDB } from "./config/db.js";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import CarRouter from "./routes/car.js";
import userRoutes from "./routes/userRoutes.js";
import { protect } from "./middleware/authMiddleware.js";

dotenv.config();

// Connect to MongoDB Database;
connectDB();


// Route
const app = express();


// for parsing application/json & parsing application/x-www-form-urlencoded
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 


// Activate CORS for Frontend  accessing API
app.use(cors({
    origin: "http://localhost:5173"
}));

app.use('/car', protect, CarRouter);
app.use('/users', userRoutes);




app.listen(process.env.EXPRESS_PORT, () => {
    console.log(`Server running on port ${process.env.EXPRESS_PORT}`);
});




