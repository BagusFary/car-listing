import express from "express";
import Car from "../model/Car.js";
import mongoose from "mongoose";
const router = express.Router();



router.get('/list', async (req, res) => {
    try {
        
        const data = await Car.find();
        res.status(201).json({
            message: "Sukses mengambil data mobil!",
            data: data
        });

    } catch (error) {
        
        res.status(500).json({
            message: "Terjadi kesalahan pada server",
        })
        
    }
});

router.get('/:id', async (req, res) => {

    try {
        
        const { id } = req.params
        const data = await Car.findById(id);

        res.json(data);
        res.status(201).json({
            message:"Data mobil ditemukan!",
            data: data
        });
       

    } catch (error) {

        if(error instanceof mongoose.Error.CastError){
            res.status(404).json({
                message: "Data mobil tidak ditemukan"
            });
        } else {
            res.status(500).json({
                message: "Terjadi kesalahan pada server"
            });
        }
        
    }
});

router.post('/', async (req, res) => {

    try {
        
        await Car.create(req.body);
        res.status(201).json({
            message: "Data Mobil telah berhasil dibuat!",
            data: req.body
        });

    } catch (error) {

        if(error.name === "ValidationError"){

            const errorField = Object.values(error.errors).map((err) => {
                return {
                    field: err.path,
                    message: err.message
                }
            });

            res.status(400).json({
                message: "Validasi gagal",
                error: errorField
            });

        }

        res.status(500).json({
            message: "Terjadi kesalahan pada server"
        });

    }
});


router.put('/:id', async (req, res) => {

    try {

        const { id } = req.params;
        const carData = await Car.findOne({_id: id});
        res.json(carData);


    } catch (error) {
        
    }

})


export default router;