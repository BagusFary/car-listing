import express from "express";
import mongoose from "mongoose";
import Car from "../model/Car.js";
import errorHandler from "../utils/errorHandler.js";

const router = express.Router();
const checkIdType = mongoose.Types.ObjectId;



router.get('/list', async (req, res) => {
    try {
        
        const data = await Car.find();
        res.status(200).json({
            message: "Sukses mengambil data mobil!",
            data: data
        });

    } catch (error) {
        
        const { status, body } = errorHandler(error);
        res.status(status).json(body);
        
    }
});

router.get('/:id', async (req, res) => {

    try {
        
        const { id } = req.params

        if (!checkIdType.isValid(id)) {
            return res.status(400).json(
                { message: "ID yang digunakan tidak valid" }
            );
        }

        const data = await Car.findById(id);

        if(!data){
            return res.status(404).json({
                message: "Data mobil tidak ditemukan"
            });
        }

        res.status(201).json({
            message:"Data mobil ditemukan!",
            data: data
        });
       

    } catch (error) {

        const { status, body } = errorHandler(error);
        res.status(status).json(body);
        
    }
});

router.post('/', async (req, res) => {

    try {

        
        if(!req.body){
            return res.status(400).json({
                message: "Body / data tidak boleh kosong"
            }); 
        }

        const { stock } = req.body;

        if(stock < 1){
            return res.status(400).json({
                message: "Stok mobil pertama kali input minimal harus 1"
            });
        }

        await Car.create(req.body);
        res.status(201).json({
            message: "Data Mobil telah berhasil dibuat!",
            data: req.body
        });

    } catch (error) {

        const { status, body } = errorHandler(error);
        res.status(status).json(body);

    }
});


router.put('/:id', async (req, res) => {

    try {
        
        const { id } = req.params; 

        if (!checkIdType.isValid(id)) {
            return res.status(400).json(
                { message: "ID yang digunakan tidak valid" }
            );
        }
        
        if(!req.body){
            return res.status(400).json({
                message:"Body / data tidak boleh kosong"
            });
        }
        
        const editedCar = await Car.findByIdAndUpdate({_id: id}, req.body, {runValidators: true});
        
        if(!editedCar){
            return res.status(404).json({
                message: "Data mobil tidak ditemukan"
            });
        }

        res.status(200).json({
            message: "Data mobil telah berhasil di update!"
        });

    } catch (error) {

        const { status, body } = errorHandler(error);
        res.status(status).json(body);

    }

});

router.delete('/:id', async (req, res) => {

    try {
        
        const { id } = req.params;

        if (!checkIdType.isValid(id)) {
            return res.status(400).json(
                { message: "ID yang digunakan tidak valid" }
            );
        }

        const deletedCar = await Car.findByIdAndDelete({_id: id});

        if(!deletedCar){
            return res.status(404).json({
                message: "Data mobil tidak ditemukan"
            });
        }

        res.status(200).json({
            message: "Data mobil berhasil dihapus"
        });

    } catch (error) {
        
        const { status, body } = errorHandler(error);
        res.status(status).json(body);

    }

});


export default router;