import React, { useState, useTransition } from "react";
import "react-toastify/dist/ReactToastify.css";

import { useTheme } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

import '@testing-library/jest-dom'; 
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Home from './Index';

jest.mock('@mui/material/styles', () => ({
    ...jest.requireActual('@mui/material/styles'),
    useTheme: jest.fn().mockReturnValue({
        palette: {
            background: {
                paper: '#fff',
                default: '#f4f4f4',
            },
            text: {
                primary: '#000',
            },
            divider: '#ccc',
        },
    }),
}));

const mockUseGetNotasPaginaQuery = jest.fn();
jest.mock('@store/api/apiSlices', () => ({
    useGetNotasPaginaQuery: (...args: any[]) => mockUseGetNotasPaginaQuery(...args),
}));

jest.mock('@layouts/LayoutAdmin', () => {
    return ({ children }: { children: React.ReactNode }) => <div>{children}</div>;
});

jest.mock('@/components/Note/NotaFijaContainer', () => {
    return ({ nota }: { nota: any }) => <div data-testid="nota-card">{nota.titulo}</div>;
});

jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useState: jest.requireActual('react').useState,
    useTransition: () => [false, (cb: () => void) => cb()],
}));

describe('Home', () => {
    const mockNotas = [
        { id: 1, titulo: 'Nota 1', contenido: 'Contenido 1', categorias: [], favorita: true },
        { id: 2, titulo: 'Nota 2', contenido: 'Contenido 2', categorias: [], favorita: true },
    ];

    const mockData = {
        notas: mockNotas,
        last_page: '3',
        current_page: '1',
    };

    beforeEach(() => {
        mockUseGetNotasPaginaQuery.mockReset();
    });

    test('debe mostrar el spinner de carga cuando isLoading es verdadero', () => {
        mockUseGetNotasPaginaQuery.mockReturnValue({
            data: null,
            isLoading: true,
            isError: false,
        });

        render(<Home />);
        expect(screen.getByRole('progressbar')).toBeInTheDocument();
        expect(screen.queryByText('Notas Fijadas')).not.toBeInTheDocument();
    });

    test('debe mostrar el título y las notas cuando la carga es exitosa', () => {
        mockUseGetNotasPaginaQuery.mockReturnValue({
            data: mockData,
            isLoading: false,
            isError: false,
        });

        render(<Home />);

        expect(screen.getByText('Notas Fijadas')).toBeInTheDocument();
        expect(screen.getByText('Nota 1')).toBeInTheDocument();
        expect(screen.getByText('Nota 2')).toBeInTheDocument();

        expect(screen.getByText(/Página 1 \/ 3/i)).toBeInTheDocument();
        
        const nextButton = screen.getByTestId('KeyboardArrowRightIcon');
        expect(nextButton).toBeInTheDocument();
    });

    test('debe mostrar un mensaje cuando no hay notas fijadas', () => {
        mockUseGetNotasPaginaQuery.mockReturnValue({
            data: { notas: [], last_page: '0', current_page: '1' },
            isLoading: false,
            isError: false,
        });

        render(<Home />);
        expect(screen.getByText(/No se encontraron notas fijadas/i)).toBeInTheDocument();
        expect(screen.queryByText('Notas Fijadas')).not.toBeInTheDocument();
    });

    test('debe mostrar un mensaje de error si la carga falla', () => {
        mockUseGetNotasPaginaQuery.mockReturnValue({
            data: null,
            isLoading: false,
            isError: true,
        });

        render(<Home />);
        expect(screen.getByText(/Ha ocurrido un error al cargar las notas./i)).toBeInTheDocument();
    });

    test('debe cambiar de página al hacer clic en el botón siguiente', async () => {
        mockUseGetNotasPaginaQuery.mockReturnValueOnce({
            data: mockData,
            isLoading: false,
            isError: false,
        });

        mockUseGetNotasPaginaQuery.mockReturnValue({
            data: {
                notas: [{ id: 3, titulo: 'Nota 3', contenido: 'Contenido 3', categorias: [], favorita: true }],
                last_page: '3',
                current_page: '2',
            },
            isLoading: false,
            isError: false,
        });

        render(<Home />);

        const nextButton = screen.getByTestId('KeyboardArrowRightIcon').closest('button');
        if (!nextButton) throw new Error('Botón de siguiente página no encontrado');
        await userEvent.click(nextButton);

        await waitFor(() => {
            expect(mockUseGetNotasPaginaQuery).toHaveBeenCalledWith({
                pagina: 2,
                titulo: "",
                categorias: [],
                favorita: true,
                cantidad: 8,
            });
        });
    });
});
