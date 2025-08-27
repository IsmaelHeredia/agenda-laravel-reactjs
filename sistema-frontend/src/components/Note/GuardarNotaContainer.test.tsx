import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter, Route, Routes, MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { apiNotas } from "@store/api/apiSlices";
import paginationSlice from "@/store/reducers/paginationSlice";
import { toast } from "react-toastify";
import * as utils from "@/utils/toastRedirect";
import { Dayjs } from "dayjs";
import dayjs from "dayjs";
import { v4 as uuidv4 } from "uuid";
import { Categoria, Nota } from "@/types/app/notas";
import type { Middleware, AnyAction } from '@reduxjs/toolkit';

const mockImportMeta = {
    env: {
        VITE_TIMEOUT_REDIRECT: "2000",
        VITE_TIMEOUT_TOAST: "2000",
    },
};

Object.defineProperty(global, 'import.meta', {
    value: mockImportMeta
});

jest.mock("@mui/material", () => ({
    ...jest.requireActual("@mui/material"),
    useMediaQuery: jest.fn().mockReturnValue(false),
}));
jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: jest.fn(),
    useParams: jest.fn(),
}));
jest.mock("@/utils/toastRedirect", () => ({
    toastRedirect: jest.fn(),
}));
jest.mock("react-toastify", () => ({
    toast: {
        warning: jest.fn(),
    },
}));
jest.mock("@store/api/apiSlices", () => ({
    useGetCategoriasQuery: jest.fn(),
    useGetNotaQuery: jest.fn(),
    useCreateNotaMutation: jest.fn(),
    useUpdateNotaMutation: jest.fn(),
    apiNotas: {
        reducerPath: "apiNotas",
        reducer: jest.fn(() => ({})),
        middleware: jest.fn(() => (next: (arg0: any) => any) => (action: any) => next(action)),
    },
}));
jest.mock("@/store/reducers/paginationSlice", () => ({
    changeNotePage: jest.fn(),
}));
jest.mock("uuid", () => ({
    v4: jest.fn(),
}));

jest.mock("@/components/Note/GuardarNotaContainer", () => {
    return jest.fn(() => <div>Mock GuardarNotaContainer</div>);
});
import GuardarNotaContainer from "@/components/Note/GuardarNotaContainer";

const mockStore = configureStore({
    reducer: {
        [apiNotas.reducerPath]: apiNotas.reducer,
        pagination: paginationSlice,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiNotas.middleware),
});

const mockCategorias: Categoria[] = [
    { id: 1, nombre: "Categoría 1" },
    { id: 2, nombre: "Categoría 2" }
];

const mockNota: Nota = {
    id: 1,
    titulo: "Mi nota de prueba",
    contenido: "Contenido de la nota",
    categorias: [mockCategorias[0]],
    favorita: 0,
    fecha_expiracion: dayjs("2024-01-01", "YYYY-MM-DD") as unknown as Dayjs,
    uuid: "test-uuid"
};

const renderWithProviders = (component: React.ReactNode, initialEntries = ['/']) => {
    return render(
        <Provider store={mockStore}>
            <MemoryRouter initialEntries={initialEntries}>
                <Routes>
                    <Route path="/" element={<div>Default Route</div>} />
                    <Route path="/notas/agregar" element={component} />
                    <Route path="/notas/editar/:id" element={component} />
                </Routes>
            </MemoryRouter>
        </Provider>
    );
};

describe("GuardarNotaContainer", () => {
    beforeEach(() => {
        jest.spyOn(console, 'warn').mockImplementation(() => {});
        jest.clearAllMocks();
        jest.spyOn(require("react-router-dom"), "useNavigate").mockReturnValue(jest.fn());
        (require("uuid").v4 as jest.Mock).mockReturnValue("new-uuid");

        (require("@store/api/apiSlices").useGetCategoriasQuery as jest.Mock).mockReturnValue({
            data: { categorias: mockCategorias },
            isLoading: false,
        });
        (require("@store/api/apiSlices").useGetNotaQuery as jest.Mock).mockReturnValue({
            data: null,
            isLoading: false,
        });
        (require("@store/api/apiSlices").useCreateNotaMutation as jest.Mock).mockReturnValue([
            jest.fn(() => Promise.resolve({ data: { id: 2, uuid: "new-uuid" }, message: "Nota creada" })),
            { isLoading: false },
        ]);
        (require("@store/api/apiSlices").useUpdateNotaMutation as jest.Mock).mockReturnValue([
            jest.fn(() => Promise.resolve({ data: { id: 1 }, message: "Nota actualizada" })),
            { isLoading: false },
        ]);
    });

    test("debe renderizar el formulario para crear una nueva nota", () => {
        (require("react-router-dom").useParams as jest.Mock).mockReturnValue({});
        (require("@store/api/apiSlices").useGetNotaQuery as jest.Mock).mockReturnValue({
            data: null,
            isLoading: false,
        });

        renderWithProviders(<GuardarNotaContainer />, ['/notas/agregar']);

        expect(screen.getByText("Mock GuardarNotaContainer")).toBeInTheDocument();
    });
});
