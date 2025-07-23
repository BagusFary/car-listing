
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../model/User.js";

dotenv.config();

export const protect = async (req, res, next) => {
    
    const authHeaders = req.headers.authorization;

    if(authHeaders && authHeaders.startsWith('Bearer')){

        try {

            const token = authHeaders.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user =  await User.findById(decoded.userId).select('-password');
            next();
            
        } catch (error) {
            
            res.status(401).json({message: "Token tidak valid"});
            
        }

    } else {

        res.status(401).json({message: "Token tidak ada"});

    }
}