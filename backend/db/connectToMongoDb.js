import mongoose from 'mongoose';


const connectToMongoDB = async()=>{

   mongoose.connect(process.env.MONGO_DB_URI).then(()=>{
    console.log("Connected to db");

   }).catch((err)=>{
    console.log(err);
   })
}

export default connectToMongoDB;