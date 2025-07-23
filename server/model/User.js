import mongoose from "mongoose";
import {Schema} from "mongoose";


const UserSchema = new Schema({
    name:{
        type: String,
        required: [true, "Nama harus diisi"],
        trim: true
    },
    email:{
        type: String,
        required: [true, "Email harus diisi"], 
        unique: [true, "Email yang anda masukkan sudah terpakai"],
        lowercase: [true, "Format email harus huruf kecil"],
        trim: true
    },
    password:{
        type: String,
        required: [true, "Password harus diisi!"],
    }
},{
    timestamps: true
});

export default mongoose.model("User", UserSchema);
