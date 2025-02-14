import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/Apiesponse.js";
import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import jwt from 'jsonwebtoken'
import bcrypt from "bcryptjs";


const generateAccessAndRefreshTokens = async(userId)=>{  
   try{
    const user = await User.findById(userId)
    const accessToken = user.generateAccessToken()
    const refreshToken = user.generateRefreshToken()
   
     user.refreshToken = refreshToken
     console.log(user.refreshToken)
  
     await user.save({validateBeforeSave:false})
     return {accessToken , refreshToken}
   }
   catch(err){
      throw new ApiError(500 ,err)
   }
}

const userRegistration = asyncHandler(async(req ,res)=>{

    const {fullName, userName,email,password,role,skills,batch,education,bio,intrests,Linkdin,Github} = req.body;

  console.log(req.body)
    if([fullName, userName,email,password,role,skills,batch,education,bio,intrests,Linkdin,Github].some((field)=> field?.trim()==="")){
        throw new ApiError(400 , "all fields are required")
    }

    const existedUser = await User.findOne({
        $or:[{email} , {userName}]
    })
    if(existedUser){
        throw new ApiError(400 , "username or email already exists , please try something different ")
    }
   
    const avatarLocalPath = req.file?.path;
    // console.log("content inside the req.file "  , req.file)
    // console.log("File saved at:", path.resolve(req.file.path)); // Full absolute path



    console.log(avatarLocalPath)
    if(!avatarLocalPath){
        throw new ApiError(400 , "path of profile  is unknown ")
    }
    console.log(avatarLocalPath)

    const avatarRes = await uploadOnCloudinary(avatarLocalPath)

    if(!avatarRes){
        throw new ApiError(400 , "profile pic  is required")
        
    }

    const user = await User.create({

        fullName, 
        userName:userName.toLowerCase(),
        email,
        password,
        avatar: avatarRes.url,
        role,
        skills,
        batch,
        education
        ,bio,
        intrests,
        Linkdin,
        Github
    })

     const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
     )
   
     
     
    
     if(!createdUser){
        throw new ApiError(500 , "something went wrong while registering the user ")
     }
     console.log(createdUser)

     return res.status(201).json(new ApiResponse(201 , createdUser , "user created successfully"))
    
    

})


const Login = asyncHandler(async(req ,res)=>{
    const {email , userName , password} = req.body;
console.log(email )
console.log(password)
    if(!(userName||email)){
        throw new ApiError(400 , "enter email or password ")
    }
    const user = await User.findOne({
        $or:[{email},{userName}]
    })
    if(!user){
        throw new ApiError(404 ,"user not found please check the username or email ")
    }
    // console.log(user)
    const isPasswordValid = await user.isPasswordCorrect(password) 
    if(!isPasswordValid){
        throw new ApiError(400 , "invalid password , try again ")
    }
//  console.log(user._id)
    const {accessToken ,refreshToken} = await generateAccessAndRefreshTokens(user._id)
const loggedIn = await User.findById(user._id).select("-password -refreshToken")

const options ={
    httpOnly:true,
    secure:true
  }
 
  console.log('success')
    return res
    .status(200)
    .cookie("accessToken",accessToken,options)
    .cookie("refreshToken" , refreshToken , options)
    .json(
       new ApiResponse(
          200,
          {
             user: loggedIn , accessToken ,
             refreshToken
          },
          "user logged in successully"
       )
    )
   
})

const Logout = asyncHandler(async(req,res)=>{

    const user = await User.findByIdAndUpdate( req.user._id ,{
        $unset:{
            refreshToken:1
        }

    },{new:true })

    const options ={
        httpOnly:true,
        secure:true
      }
      return res.status(200)
      .clearCookie("accessToken",options)
      .clearCookie("refreshToken",options)
      .json(new ApiResponse(200 , {},"user logged out succesfully"))
   
})

const getCurrentUser = asyncHandler(async(req,res)=>{
    
    return res.status(200).json(new ApiResponse(200 , req.user , "user data fetched successfully"))
})

const updateUserDetail = asyncHandler(async(req ,res)=>{
    const {fullName,email,role,skills,batch,education,bio,intrests,Linkdin,Github, password , newPassword}= req.body;
    const user = await User.findById(req.user?.id)
    console.log(user);
  
  
    const isPasswordCorrect = await user.isPasswordCorrect(password)
    console.log(isPasswordCorrect);
    
    if(!isPasswordCorrect){
      throw new ApiError(400 ,"old password is wrong ! ")
    }
    
  const hashedPassword = await bcrypt.hash(req.body.newPassword , 10)
  

  
  const updatedUser =await User.findByIdAndUpdate(user?._id,
    {
      $set:{
       
        email:req.body?.email || user.email,
        password:hashedPassword|| user.password ,
        fullName:req.body?.fullName||user.fullName, 
        role:req.body?.role || user.role,
        skills:req.body?.skills || user.skills,
        batch:req.body?.batch || user.batch,
        education:req.body?.education || user.education,
        bio:req.body?.bio || user.bio,
        intrests:req.body?.intrests || user.intrests,
        Linkdin:req.body?.Linkdin || user.Linkdin,
        Github:req.body?.Github || user.Github,
       
    
    }
    }
  )
  
    
    return res.status(200).json(new ApiResponse(200 , user,"user data updated successfully"))
})






export {userRegistration , Login,Logout,getCurrentUser,updateUserDetail} 