import {ApiError} from '../utils/ApiError.js'
import { asyncHandler } from '../utils/asyncHandler.js'
import { Job } from '../models/job.model.js';
import { ApiResponse } from '../utils/ApiResponse.js';


const PostJob = asyncHandler(async(req ,res)=>{
    const { title, company, location, jobType, description, requirements ,salary} =req.body;
    console.log(title ,company , location , jobType ,description , requirements,salary)
    
    if([title, company, location, jobType, description, requirements,salary].some((field)=> field==="")){
        throw new ApiError(400 , "all fields are required")
    }

    const job = await Job.create({
        title, 
        company, 
        location, 
        jobType, 
        description, 
        requirements,
        salary

    })

    return res.status(200).json(new ApiResponse(200 ,job , "job created successfully"))
        

})

const getAllJobs = asyncHandler(async(req ,res)=>{
    const jobs = await Job.find({})
    return res.status(200).json(new ApiResponse(200 , jobs , "all jobs fetched successfully "))
})

// const getjobsbysearch = asyncHandler(async(req ,res)=>{
//     const jobs = await Job.find({
//         $or:
//             [
//                 {location:{$regex:req.params.key}}
//             ]
        
//     })
//     return res.status(200).json(new ApiResponse(200 , jobs , "all jobs fetched successfully "))
// })



export {PostJob,getAllJobs}