import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

//functions import
import connectDB from './config/db.js';


import userRoutes from './routes/userRoutes.js';
import serviceRoutes from './routes/serviceRoute.js';

const port = process.env.PORT || 5000;
connectDB();
const app = express();

app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/services', serviceRoutes);

app.listen(port, ()=>{
    console.log("server running");
})
