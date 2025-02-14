import apiSlice from "./apiSlice.js";
import { PAYMENT_URL } from "../constant.js";

export const PaymentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    sendPayment: builder.mutation({
      query: (data) => ({
        url: `${PAYMENT_URL}/sendpayment`,
        method: "POST",
        body: data,
      }),
    }),

    getPayment: builder.query({
      query: () => `${PAYMENT_URL}/getpayment`,
      transformResponse: (response) => {
        console.log("API Response:", response);
        return response.data; // Assuming data contains the projects array
      }
    }),
  }),
});

export const { useSendPaymentMutation, useGetPaymentQuery } = PaymentApiSlice;
