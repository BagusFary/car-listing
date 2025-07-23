import User from "../model/User.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";
import { json } from "express";

export const RegisterUser = async (req, res) => {

    const { name, email, password}= req.body;

    if(password.length < 8) return res.status(400).json({message: "Password tidak boleh kurang dari 8 karakter!"});

    try {

        const userExist = await User.findOne({email: email});
        if(userExist) return res.status(400).json({message: "Email yang anda masukkan sudah digunakan"});

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name: name, 
            email: email, 
            password: hashedPassword
        });

        const token = generateToken(user._id);

        res.status(201).json({name: name, email: email, token: token});

    } catch (error) {
        
        res.status(500).json("Terjadi kesalahan pada server");

    }
    
}


export const LoginUser = async (req, res) => {

    const {email, password} = req.body;

    try {
        
        const user = await User.findOne({email: email});
        const matchPassword = await bcrypt.compare(password, user?.password || ''); 

        if(!user || !matchPassword){
            res.status(401).json({message: "Kredensial tidak valid"})
        }

        const token = generateToken(user._id);

        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: token
        });

    } catch (error) {

        res.status(500).json({message: "Terjadi kesalahan pada server"});

    }
}

