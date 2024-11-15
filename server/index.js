import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

//functions import
import connectDB from './config/db.js';


import userRoutes from './routes/userRoutes.js';

const port = process.env.PORT || 5000;
connectDB();
const app = express();

app.use(express.json());

app.use('/api/users', userRoutes);

app.listen(port, ()=>{
    console.log("server running");
})
