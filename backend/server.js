import express from 'express'

import authRoutes from './routes/auth.routes.js'
import connectToMongoDB from './db/connectToMongoDb.js';
import dotenv from 'dotenv'
const app =  express()

dotenv.config();
const PORT = process.env.PORT || 5000;
//root route
app.use(express.json()); // from req.body
app.use("/api/auth", authRoutes);


// app.get("/" , (req , res)=>{
//     res.send("hello Sourabh")
// })



app.listen(PORT , ()=>{
    connectToMongoDB();
    console.log("server running on port " + PORT);
})