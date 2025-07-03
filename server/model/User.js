

import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const { Schema } = mongoose;

const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, "Username is required! "]
    },
    email: {
        type: String,
        required: [true, "Email is required!"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minLength: [6, "Password minimum length is 6"]
    }
    
}, {
    timestamps: true
});


UserSchema.plugin(uniqueValidator);


export default mongoose.model('User', UserSchema);