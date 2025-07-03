import mongoose from "mongoose";

const { Schema } = mongoose;

const ProductSchema = new Schema({
    name: {
        type: String,
        required: [true, "Product name is required!"],
    },
    price: {
        type: Number,
        required: [true, "Product price is required!"]
    },
    stock: {
        type: Number,
        required: [true, "Product stock is required!"],
    }
}, {
    timestamps: true
});

export default mongoose.model('Product', ProductSchema);