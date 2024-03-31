import mongoose from 'mongoose'
import { UserModel } from './UserModel.js';
import { Schema } from 'mongoose';


const TaskSchema = new mongoose.Schema({


    status: String,
    title: String,
    description: String,
    priority: String,
    team:String,
    assignee: String,
    person: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel',
        
     },

},
{ timestamps: true } )

export const TaskModel = mongoose.model("TaskModel", TaskSchema)