import mongoose from 'mongoose';
import { TaskModel } from './TaskModel.js';
import { Schema } from 'mongoose';

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },

    tasks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TaskModel'
     }]
})

export const UserModel = mongoose.model("UserModel", UserSchema)