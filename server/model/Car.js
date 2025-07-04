import mongoose from "mongoose";
const {Schema} = mongoose;


const CarSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    "brand": {
        type: String,
        required: [true, "Merek mobil harus diisi"],
        trim: true
    },
    "type": {
        type: String,
        required: [true, "Jenis mobil harus diisi"],
        trim: true
    },
    "stock": {
        type: Number,
        min: [0, "Stok tidak boleh kurang dari 0!"]
    },
    "price": {
        type: Number,
        required: [true, "Harga mobil harus diisi!"],
        min: [10000000, "Harga mobil minimal 10 Juta Rupiah"]       
    },
    "description": {
        type: String,
        required: [true, "Keterangan mobil harus diisi"],
        trim: true
    }
},{
    timestamps: true
});

export default mongoose.model("Car", CarSchema);