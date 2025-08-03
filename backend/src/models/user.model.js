import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type: String,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
        minlenghth: 6,
    },
    confirmPassword:{
        type: String,
        required: true,
        minlenghth: 6
    },
    createdAt:{
        type: Date,
        default: Date.now
    },
    updatedAt:{
        type: Date,
        default: Date.now
    }


},{
    timestamps: true,
})

const User = mongoose.model("User", userSchema);

export default User;