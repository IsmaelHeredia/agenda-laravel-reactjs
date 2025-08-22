import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQueryWithAuth = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    prepareHeaders: (headers) => {
        const token = sessionStorage.getItem('token');
        if (token) {
            headers.set("Authorization", `Bearer ${token}`);
        }
        return headers;
    },
});

export const apiIngreso = createApi({
    reducerPath: "apiIngreso",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_URL,
    }),
    endpoints: (builder) => ({
        validarIngreso: builder.mutation({
            query: ({ usuario, clave }) => {
                return {
                    url: "/ingreso",
                    method: "POST",
                    body: { usuario: usuario, clave: clave }
                }
            },
        }),
    }),
});

export const apiAuth = createApi({
    reducerPath: "apiAuth",
    baseQuery: baseQueryWithAuth,
    tagTypes: ["User"],
    endpoints: (builder) => ({
        validarToken: builder.query<any, void>({
            query: () => ({
                url: "/validar",
                method: "GET",
            }),
            transformResponse: (response: any) => ({
                message: response.message,
                user: response.data,
            }),
            providesTags: ["User"],
        }),
    }),
});

export const apiCategorias = createApi({
    tagTypes: ["Categorias"],
    reducerPath: "apiCategorias",
    baseQuery: baseQueryWithAuth,
    endpoints: (builder) => ({
        getCategorias: builder.query({
            query: () => ({ url: "/categorias", method: "GET" }),
            providesTags: ["Categorias"],
            transformResponse: (response: any) => ({
                categorias: response.data,
            }),
        }),
        getCategoriasPagina: builder.query({
            query: ({ pagina, nombre }) => ({
                url: "/categorias/pagina/" + pagina,
                method: "POST",
                body: { nombre: nombre }
            }),
            providesTags: ["Categorias"],
            transformResponse: (response: any) => ({
                categorias: response.data.data,
                total: response.data.total,
                last_page: response.data.last_page,
                current_page: response.data.current_page
            }),
        }),
        getCategoria: builder.query({
            query: (id) => ({ url: "/categorias/" + id, method: "GET" }),
            transformResponse: (response: any) => ({
                categoria: response.data.data,
            }),
        }),
        createCategoria: builder.mutation({
            query: (nombre) => ({
                url: "/categorias",
                method: "POST",
                body: { nombre }
            }),
            invalidatesTags: ["Categorias"],
        }),
        updateCategoria: builder.mutation({
            query: (payload) => {
                const { id, nombre } = payload;
                return {
                    url: "/categorias/" + id,
                    method: "PUT",
                    body: { nombre }
                };
            },
            invalidatesTags: ["Categorias"],
        }),
        deleteCategoria: builder.mutation({
            query: (id) => ({
                url: "/categorias/" + id,
                method: "DELETE",
            }),
            invalidatesTags: ["Categorias"],
        }),
    }),
});

export const apiNotas = createApi({
    tagTypes: ["Notas"],
    reducerPath: "apiNotas",
    baseQuery: baseQueryWithAuth,
    endpoints: (builder) => ({
        getNotasPagina: builder.query({
            query: ({ pagina, titulo, categorias, favorita, cantidad }) => {
                const params = new URLSearchParams();
                if (titulo) {
                    params.append('titulo', titulo);
                }
                if (categorias && categorias.length > 0) {
                    categorias.forEach((cat: string) => params.append('categorias[]', cat));
                }
                if (favorita !== undefined) {
                    params.append('favorita', favorita ? '1' : '0');
                }
                if (cantidad) {
                    params.append('cantidad', cantidad);
                }
                const queryString = params.toString();
                const url = `/notas/listar/${pagina}?${queryString}`;
                return {
                    url,
                    method: "GET",
                };
            },
            providesTags: ["Notas"],
            transformResponse: (response: any) => {
                return {
                    notas: response.data.data,
                    total: response.data.total,
                    last_page: response.data.last_page,
                    current_page: response.data.current_page
                };
            },
        }),
        getNota: builder.query({
            query: (id) => ({ url: "/notas/" + id, method: "GET" }),
            providesTags: ["Notas"],
            transformResponse: (response: any) => ({
                nota: response.data,
            }),
        }),
        createNota: builder.mutation({
            query: (payload) => ({
                url: "/notas",
                method: "POST",
                body: payload
            }),
            invalidatesTags: ["Notas"],
        }),
        updateNota: builder.mutation({
            query: (payload) => {
                const { id, ...formData } = payload;
                return {
                    url: "/notas/" + id,
                    method: "PUT",
                    body: formData
                };
            },
            invalidatesTags: ["Notas"],
        }),
        deleteNota: builder.mutation({
            query: (id) => ({
                url: "/notas/" + id,
                method: "DELETE",
            }),
            invalidatesTags: ["Notas"],
        }),
        getNotaReporte: builder.query({
            query: () => ({ url: "/reportes", method: "GET" }),
            providesTags: ["Notas"],
            transformResponse: (response: any) => ({
                datos: response.data,
            }),
        }),
        toggleNoteFavorite: builder.mutation({
            query: (id) => ({
                url: `/notas/${id}/cambiar-favorito`,
                method: 'PATCH',
            }),
            invalidatesTags: ["Notas"],
        }),
        uploadImage: builder.mutation({
            query: (payload) => ({
                url: "/imagenes",
                method: "POST",
                body: payload,
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
            transformResponse: (response: any) => response.data,
        }),
    }),
});

export const apiCuenta = createApi({
    reducerPath: "apiCuenta",
    baseQuery: baseQueryWithAuth,
    tagTypes: ["User"],
    endpoints: (builder) => ({
        actualizarCuenta: builder.mutation({
            query: (payload) => {
                const formData = new FormData();
                formData.append('clave_actual', payload.clave_actual);
                if (payload.nuevo_nombre !== undefined) {
                    formData.append('nuevo_nombre', payload.nuevo_nombre);
                }
                if (payload.nueva_clave !== undefined) {
                    formData.append('nueva_clave', payload.nueva_clave);
                }
                if (payload.avatar instanceof File) {
                    formData.append('avatar', payload.avatar);
                }
                formData.append('_method', 'PUT');

                return {
                    url: "/cuenta",
                    method: "POST",
                    body: formData,
                };
            },
            invalidatesTags: ["User"],
        }),
    }),
});

export const {
    useValidarIngresoMutation,
} = apiIngreso;

export const {
    useValidarTokenQuery
} = apiAuth;

export const {
    useGetCategoriasQuery,
    useGetCategoriasPaginaQuery,
    useGetCategoriaQuery,
    useCreateCategoriaMutation,
    useUpdateCategoriaMutation,
    useDeleteCategoriaMutation
} = apiCategorias;

export const {
    useGetNotasPaginaQuery,
    useGetNotaQuery,
    useCreateNotaMutation,
    useUpdateNotaMutation,
    useDeleteNotaMutation,
    useGetNotaReporteQuery,
    useToggleNoteFavoriteMutation,
    useUploadImageMutation
} = apiNotas;

export const { useActualizarCuentaMutation } = apiCuenta;