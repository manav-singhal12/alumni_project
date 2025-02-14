import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import {asyncHandler} from '../utils/asyncHandler.js'

import {Event} from '../models/event.model.js'

const eventPost = asyncHandler(async(req,res)=>{
    const {title , about , organiser,eventMode ,date, joiningLink}= req.body;


    if([title , about , organiser ,eventMode].some((field)=> field==="")){
        throw new ApiError(400 , "all fields are required")
    }
    const event = await Event.create({
        title ,
         about , 
        organiser,
        date,
        eventMode , 
        joiningLink:req.body?.joiningLink || null 

    })

    if(!event){
        throw new ApiError(400 , "something went wrong while posting a event ")
    }

    return res.status(200).json(new ApiResponse(200 , event , "event posted successfully"))
})


const getAllEvents = asyncHandler(async(req ,res)=>{

    const allEvents =await  Event.find({})
    if(!allEvents){
        throw new ApiError(400 , "something went wrong while fetching all events data")
    }
    return res.status(200).json(new ApiResponse(200 , allEvents , "all event fetched successfully"))
})


export {getAllEvents , eventPost} 