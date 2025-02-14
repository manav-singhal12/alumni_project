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
    query: () => `${EVENTS_URL}/allevents`,
    transformResponse: (response) => {
      console.log("API Response:", response); // Log to check the structure
      return response.data; // Since the jobs are inside the `data` field
    },
  })
    })
})

export const {useEventPostMutation ,useGetEventsQuery} = eventApiSlice;