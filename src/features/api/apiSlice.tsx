import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import useToken from "../../customhooks/useToken";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://rebuy-solo-server-production.up.railway.app/api/",
    prepareHeaders: (headers, { }) => {
    //   const {token}=useToken();
    //   if (token) {
    //     headers.set("Authorization", `Bearer ${token}`);
    //   }
      return headers;
    },
  }),
  tagTypes: [],
  endpoints: () => ({}),
});
