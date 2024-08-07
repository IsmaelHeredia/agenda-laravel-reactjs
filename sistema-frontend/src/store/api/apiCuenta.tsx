import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiCuenta = createApi({
  reducerPath: "apiCuenta",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    prepareHeaders: (headers, { getState } : { getState: any }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    cambiarDatos: builder.mutation({
      query: ({usuario,nuevo_usuario,clave,nueva_clave}) => {
        return {
          url: "/cuenta",
          method: "POST",
          body: { 
            usuario: usuario,
            nuevo_usuario: nuevo_usuario,
            clave: clave,
            nueva_clave: nueva_clave
          }
        }
      },
    }),
  }),
});

export const {
    useCambiarDatosMutation,
} = apiCuenta;