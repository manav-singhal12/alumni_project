import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";
import dotenv from "dotenv";
dotenv.config({
    path:"./.env"
})


const connectDB = async ()=>{
    try{
        // console.log(process.env.MONGODB_URL)
        const connectionInstance =  await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
        console.log(`\n MongoDB connected connected !! DB HOST: ${connectionInstance.connection.host}`)
        
    }
    catch(error){
        console.log("mongodb connection error RESTART THE SERVER AGAIN IF GET FIX " ,error);
        process.exit(1)
    }
}

export default connectDB;