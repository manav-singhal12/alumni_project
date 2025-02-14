import apiSlice from './apiSlice.js'
import { MAIN_URL}  from '../constant.js'


export const userApiSlice = apiSlice.injectEndpoints({
         
    endpoints:(builder)=>({
       
        login:builder.mutation({    
            query:(data)=>({
                url:`${MAIN_URL}/login`,
                method:"post",
                body:data ,
                

            })

        }),
        
          logout:builder.mutation({
              query: () => ({
                url: `${MAIN_URL}/logout`, 
                method: "POST",
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("accessToken")}`, // Ensure token is sent
                },
              }),
            }),


           register:builder.mutation({
            query:(data)=>({
              url:`${MAIN_URL}/register`,
              method:"post",
              body:data ,

            })

           }),


           getUser:builder.query({
              query: () => `${MAIN_URL}/getCurrentUser`,
                transformResponse: (response) => {
                  console.log("API Response:", response); // Log to check the structure
                  return response.data; // Since the jobs are inside the `data` field
                },
           })
           ,
           updateProfile:builder.mutation({
            query:(data)=>({
              url:`${MAIN_URL}/updateUserDetail`,
              method:"PUT",
              body:data
            })
           })



    })
});


export const  {useLoginMutation , useLogoutMutation , useRegisterMutation ,useGetUserQuery ,useUpdateProfileMutation} = userApiSlice;