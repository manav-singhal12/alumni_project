import apiSlice from "./apiSlice.js";
import { PROJECT_URL } from "../constant.js";

export const OpenSourceProjectApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    ProjectPost: builder.mutation({
      query: (data) => ({
        url: `${PROJECT_URL}/projectposting`,
        method: "POST",
        body: data,
      }),
    }),
    getProjects: builder.query({
      query: () => `${PROJECT_URL}/allprojects`,
      transformResponse: (response) => {
        console.log("API Response:", response);
        return response.data; // Assuming data contains the projects array
      }
    }),
  }),
});

export const { useProjectPostMutation, useGetProjectsQuery } = OpenSourceProjectApiSlice;
