import mongoose from "mongoose";
import { Schema } from "mongoose";


const openSourceSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type :String,
        required:true
    },
    githubRepoLink:{
        type:String ,
        required:true
    }
})

export const OpenSource = mongoose.model("OpenSource",openSourceSchema)