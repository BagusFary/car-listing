

import express from "express";
import User from "../model/User.js";

const router = express.Router();


router.post('/register', async (req, res) => {

     try {


        await User.create(req.body);

        res.status(201).json({message: "Your Account has been successfully registered!"});

     } catch (error) {
        
        res.status(400).json(error.errors.email);
         
     }

});

export default router;