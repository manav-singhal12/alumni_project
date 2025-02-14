import { asyncHandler } from "../utils/asyncHandler.js";
import { OpenSource } from "../models/openSource.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";


const postProject = asyncHandler(async(req,res)=>{


    const {title  , description , githubRepoLink} = req.body;

    if([title  , description , githubRepoLink].some((field)=> field==="")){
        throw new ApiError(400 , "all fields are required")
    }

    const project = await OpenSource.create({

        title  , description , githubRepoLink
    })

    if(!project){
        throw new ApiError(400 , "something went wrong while posting the project ")
    }

   return res.status(200).json(new ApiResponse(200 , project , "project posted successfully"))



})


const getAllProject = asyncHandler(async(req,res)=>{
    const allProjects = await OpenSource.find({})
    // console.log(allProjects)
    if(!allProjects){
        throw new ApiError(400 , "something went wrong while fetching the projects data ")
    }

  return res.status(200).json(new ApiResponse(200 , allProjects , "projects data fetched successfully"))
})

export {getAllProject , postProject}