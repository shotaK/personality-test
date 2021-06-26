import first from "lodash.first";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import apiUrls from "Config/api-urls";

import { Test } from "./Types";

export const testsApi = createApi({
  reducerPath: "testApi",
  baseQuery: fetchBaseQuery({
    baseUrl: apiUrls.api.host,
  }),
  endpoints: (builder) => ({
    getTestsAll: builder.query<Test, void>({
      query: () => ({ url: apiUrls.api.tests.base }),
      transformResponse: (rawResult: Test[]) => {
        return first(rawResult) as Test;
      },
    }),
  }),
});

export const { useGetTestsAllQuery } = testsApi;
