import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiNotas = createApi({
  tagTypes: ["Notas"],
  reducerPath: "apiNotas",
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
    getNotas: builder.query({
      query: (body) => ({ url : "/notas", method: "POST", body}),
      providesTags: ["Notas"],
      transformResponse: (response: any, meta, arg) => {
        return {
          notas: response.datos.data,
        }
      }
    }),
    getNotasPagina: builder.query({
      query: ({pagina, titulo, categorias, favorita, cantidad = null}) => ({ 
        url : "/notas/pagina/" + pagina,
        method: "POST",
        body: { titulo: titulo, categorias: categorias, favorita: favorita, cantidad: cantidad } 
      }),
      providesTags: ["Notas"],
      transformResponse: (response: any, meta, arg) => {
        return {
          notas: response.datos.data,
          total: response.datos.total,
          last_page: response.datos.last_page,
          current_page: response.datos.current_page
        }
      }
    }),
    getNota: builder.query({
      query: (id) => ({ url : "/notas/" + id, method: "GET"}),
      providesTags: ["Notas"],
      transformResponse: (response: any, meta, arg) => {
        return {
          nota: response.datos,
        }
      }
    }),
    createNota: builder.mutation({
      query: (payload) => {
        return {
          url: "/notas",
          method: "POST",
          body: payload
        }
      },
      invalidatesTags: ["Notas"],
    }),
    updateNota: builder.mutation({
      query: (payload) => {
        const { id, ...formData } = payload;
        return {
          url: "/notas/" + id,
          method: "PUT",
          body: formData
        }
      },
      invalidatesTags: ["Notas"],
    }),
    deleteNota: builder.mutation({
      query: (id) => {
        return {
          url: "/notas/" + id,
          method: "DELETE",
        }
      },
      invalidatesTags: ["Notas"],
    }),
    getNotaReporte: builder.query({
      query: () => ({ url : "/reportes", method: "GET"}),
      providesTags: ["Notas"],
      transformResponse: (response: any, meta, arg) => {
        return {
          datos: response.datos,
        }
      }
    }),   
  }),
});

export const {
    useGetNotasQuery,
    useGetNotasPaginaQuery,
    useGetNotaQuery,
    useCreateNotaMutation,
    useUpdateNotaMutation,
    useDeleteNotaMutation,
    useGetNotaReporteQuery,
} = apiNotas;