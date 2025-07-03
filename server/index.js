import { connectDB } from "./config/db.js";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import productRouter from "./routes/product.js";
import userRouter  from "./routes/user.js"; 

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



app.use('/', userRouter);
app.use('/api/product', productRouter);

app.listen(process.env.EXPRESS_PORT);




