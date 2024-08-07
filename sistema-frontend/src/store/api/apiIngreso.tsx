import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiIngreso = createApi({
  reducerPath: "apiIngreso",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
  }),
  endpoints: (builder) => ({
    validarIngreso: builder.mutation({
      query: ({usuario,clave}) => {
        return {
          url: "/ingreso",
          method: "POST",
          body: { usuario: usuario, clave: clave }
        }
      },
    }),
  }),
});

export const {
    useValidarIngresoMutation,
} = apiIngreso;