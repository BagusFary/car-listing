
import express from "express";
import Product from "../model/Product.js";

const router = express.Router();


router.get('/', async (req, res) => {

    try {
        
        const product = await Product.find();
        res.json(product);

    } catch (error) {

        console.log(error.message);

    }
    
});

router.post('/', async (req, res) => {

    try {
        
        await Product.create(req.body);

        res.status(201).json({message: "Product has been created!"});

    } catch (error) {

        res.json(error);

        const errors = Object.values(error.errors).map((err) => {

            return {
                field: err.path,
                message: err.message
            }

        });
        
        res.status(400).json(errors);

    }

});


router.put('/:id', async (req, res) => {

    try {
        
        const id = req.params.id;

        const {name, price, stock} = req.body;

        await Product.updateOne({_id: id},{name: name, price: price, stock: stock});

        res.status(201).json({message: "Product has been update"});

    } catch (error) {

        res.status(400).json(error.message);
        
    }

});


router.delete('/:id', async (req, res) => {

    try {
        
        const id = req.params.id;

        await Product.deleteOne({_id: id});

        res.status(201).json({message: "Product has been deleted"});

    } catch (error) {
        
        res.status(400).json(error.message);

    }

})


export default router;
