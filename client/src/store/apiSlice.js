import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseURI = "http://localhost:3000"; 

export const apiSlice = createApi({
  reducerPath: 'api', 
  baseQuery: fetchBaseQuery({ baseUrl: baseURI }), 
  endpoints: builder => ({
    // get categories
    getCategories: builder.query({
        // ge: http://localhost:3000/api/categories
      query: () => '/api/categories',
      providesTags:['categories']
    }),

    // get lables
    getLabels:builder.query({
        // get: http://localhost:3000/api/labels'
        query:()=> '/api/labels',
        providesTage: ['transaction']
    }),

    // add new transaction
    addTransaction:builder.mutation({
        query:(initialTransaction)=>({
            url:'/api/transaction',
            method: 'POST',
            body : initialTransaction
        }),
        invalidatesTags: ['transaction']
    }),

    // delete transaction
    deleteTransaction : builder.mutation({
        query:recordId=>({
            url:'/api/transaction',
            method: "DELETE",
            body:recordId,
        }),
        invalidatesTags: ['transaction']
    })
  }),
});

export const { useGetCategoriesQuery } = apiSlice; 

export default apiSlice;
