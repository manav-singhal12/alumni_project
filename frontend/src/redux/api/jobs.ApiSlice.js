import apiSlice from "./apiSlice.js";
import { JOBS_URL } from "../constant.js";

export const jobsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    jobPosting: builder.mutation({
      query: (data) => ({
        url: `${JOBS_URL}/jobposting`,
        method: "POST", // Fix HTTP method casing
        body: data,
      }),
    }),

    allJobs: builder.query({
      query: () => `${JOBS_URL}/allJobs`,
      transformResponse: (response) => {
        console.log("API Response:", response);
        return response?.data || []; // Ensure `data` exists
      },
    }),
  }),
});

export const { useJobPostingMutation, useAllJobsQuery } = jobsApiSlice;
