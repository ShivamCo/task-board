import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors'
import cookieParser from 'cookie-parser'

import axios from 'axios';
import 'dotenv/config'

import { Authentication } from './routes/Auth.js';
import { TaskData } from './routes/getData.js';

const app = express()
const PORT = process.env.PORT || 4000

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(cors());
app.use(cookieParser())

mongoose.connect(process.env.MONGO_DB_URL);



const Awake = async () => {

    try {
        const response = await axios.post("https://task-board-6dwd.onrender.com/api/awake")
        console.log(response.data)
    } catch (error) {
        console.log(error.message)
    }

}



setInterval(Awake, 14*60*1000);


app.use("/api", Authentication)
app.use("/api", TaskData)

app.listen(PORT, () => {
    console.log(`Server is Live on ${PORT}`)
})