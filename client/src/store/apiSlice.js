import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseURI = "https://trackit-tfj4.onrender.com"; 


export const apiSlice = createApi({
  reducerPath: 'api', 
  baseQuery: fetchBaseQuery({ baseUrl: baseURI }), 
  tagTypes: ['transaction', 'categories'], // add tagTypes here
  endpoints: builder => ({
    // get categories
    getCategories: builder.query({
      query: () => '/api/categories',
      providesTags: ['categories']
    }),

    // get labels
    getLabels: builder.query({
      query: () => '/api/labels',
      providesTags: ['transaction'] // fixed typo here
    }),

    // add new transaction
    addTransaction: builder.mutation({
      query: (initialTransaction) => ({
        url: '/api/transaction',
        method: 'POST',
        body: initialTransaction
      }),
      invalidatesTags: ['transaction']
    }),

    // delete transaction
    deleteTransaction: builder.mutation({
      query: (recordId) => ({
        url: '/api/transaction',
        method: "DELETE",
        body: recordId,
      }),
      invalidatesTags: ['transaction']
    })
  }),
});

export const {
  useGetCategoriesQuery,
  useGetLabelsQuery,
  useAddTransactionMutation,
  useDeleteTransactionMutation
} = apiSlice;

export default apiSlice;
