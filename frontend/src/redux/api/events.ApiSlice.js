import apiSlice from "./apiSlice.js";
import { EVENTS_URL } from "../constant.js";


export const eventApiSlice = apiSlice.injectEndpoints({

    endpoints:(builder)=>({
        eventPost:builder.mutation({
           query:(data)=>({
            url:`${EVENTS_URL}/eventposting`,
            method:"POST",
            body:data
           })

        })
,
    getEvents:builder.query({
    query: () => `${EVENTS_URL}/getEvents`,
    transformResponse: (response) => {
      console.log("API Response:", response); 
      return response; 
    },
  })
    })
})

export const {useEventPostMutation ,useGetEventsQuery} = eventApiSlice;