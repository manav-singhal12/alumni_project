import mongoose, { mongo } from "mongoose";
import { Schema } from "mongoose";


const eventSchema =  new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    about:{
        type:String,
        required:true
    },
    organiser:{
        type:String,
        required:true
    },
    eventMode:{
        type:String , 
        // enum:["online" ,"offline"],
        required:true,
    },
    date:{
        type:Date
        ,required:true
    }
    ,
    joiningLink:{
        type:String,
    }
},{timestamps:true})

export const Event = mongoose.model("Event" ,eventSchema);