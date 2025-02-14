import mongoose from "mongoose";
import { Schema } from "mongoose";
import bcrypt from 'bcryptjs'
import dotenv from "dotenv"
dotenv.config({
    path:"./.env"
})
import jwt from 'jsonwebtoken'

const userSchema = new Schema({

    fullName:{
        type:String,
        required:true,
        
    },

    userName:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        lowercase:true,
        index:true

    }
    ,
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        lowercase:true,
        index:true

    },
    password:{
        type:String,
        required:[true , "password is required "]

    },
    avatar:{
        type:String,
        required:true,
    },

    refreshToken :{
        type:String 
    },

    role:{
        type:String,
        enum:["student","alumni"],
        required:true
    }
,
    skills:[{type:String}],
    education:{
        type:String
        ,default:"btech",
    },
    batch:{
        type:Number
    },
    bio:{
        type:String
    },
    Linkdin:{
        type:String
        
    },
    Github:{
        type:String
    }
    ,
    solPubKey:{
        type:String
    },

    intrests:[{type:String}]

},{
    timestamps:true
})



userSchema.pre("save" ,async function(next){
    if(!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password , 10)
    next()
})

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}



userSchema.methods.generateAccessToken = function(){
  return  jwt.sign(
        {
            _id:this._id ,
            email:this.email,
            userName:this.userName,
            fullName:this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken = function(){
   return jwt.sign(
        {
            _id:this._id ,
            
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model("User",userSchema)

