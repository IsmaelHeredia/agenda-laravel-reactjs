import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiCategorias = createApi({
  tagTypes: ["Categorias"],
  reducerPath: "apiCategorias",
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
    getCategorias: builder.query({
      query: () => ({ url : "/categorias", method: "GET"}),
      providesTags: ["Categorias"],
      transformResponse: (response: any, meta, arg) => {
        return {
          categorias: response.datos,
        }
      }
    }),
    getCategoriasPagina: builder.query({
      query: ({pagina, nombre}) => ({ url : "/categorias/pagina/" + pagina, method: "POST", body: { nombre: nombre } }),
      providesTags: ["Categorias"],
      transformResponse: (response: any, meta, arg) => {
          return {
            categorias: response.datos.data,
            total: response.datos.total,
            last_page: response.datos.last_page,
            current_page: response.datos.current_page
          }
      }
    }),
    getCategoria: builder.query({
      query: (id) => ({ url : "/categorias/" + id, method: "GET"}),
      transformResponse: (response: any, meta, arg) => {
        return {
          categoria: response.datos,
        }
      }
    }),
    createCategoria: builder.mutation({
      query: (nombre) => {
        return {
          url: "/categorias",
          method: "POST",
          body: { nombre }
        }
      },
      invalidatesTags: ["Categorias"],
    }),
    updateCategoria: builder.mutation({
      query: (payload) => {
        const { id, nombre } = payload;
        return {
          url: "/categorias/" + id,
          method: "PUT",
          body: { nombre }
        }
      },
      invalidatesTags: ["Categorias"],
    }),
    deleteCategoria: builder.mutation({
      query: (id) => {
        return {
          url: "/categorias/" + id,
          method: "DELETE",
        }
      },
      invalidatesTags: ["Categorias"],
    }),
  }),
});

export const {
    useGetCategoriasQuery,
    useGetCategoriasPaginaQuery,
    useGetCategoriaQuery,
    useCreateCategoriaMutation,
    useUpdateCategoriaMutation,
    useDeleteCategoriaMutation
} = apiCategorias;