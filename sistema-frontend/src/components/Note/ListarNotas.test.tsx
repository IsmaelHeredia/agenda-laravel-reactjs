import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ListarNotas from '@/pages/notas/Index';

jest.mock('@mui/material', () => ({
    ...jest.requireActual('@mui/material'),
    useMediaQuery: jest.fn().mockReturnValue(false),
    Grid: jest.requireActual('@mui/material').Grid,
    Divider: jest.requireActual('@mui/material').Divider,
}));

const mockedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedNavigate,
}));

jest.mock('@layouts/LayoutAdmin', () => {
    return ({ children }: { children: React.ReactNode }) => <div data-testid="layout-admin">{children}</div>;
});

jest.mock('@/components/CustomTextFields/CustomTextFields', () => ({
    GeneralButton: ({ children, startIcon, onClick }: { children: React.ReactNode, startIcon: React.ReactNode, onClick: () => void }) => (
        <button onClick={onClick} data-testid={`button-${(children as string).toLowerCase().replace(' ', '-')}`}>
            <div data-testid={`icon-${(startIcon as any).type.displayName}`}></div>
            {children}
        </button>
    ),
}));

jest.mock('@/components/Note/ListarNotasContainer', () => {
    return () => <div data-testid="listar-notas-container">Listar Notas Container</div>;
});

jest.mock('@/components/Category/ModalCategoriaContainer', () => {
    return ({ open, onClose }: { open: boolean, onClose: () => void }) => (
        <div data-testid="modal-categoria-container" className={open ? 'visible' : 'hidden'}>
            Modal de Categorías
            <button onClick={onClose} data-testid="modal-close-button">Cerrar</button>
        </div>
    );
});


describe('ListarNotas', () => {
    test('debe renderizar el layout y los botones principales', () => {
        render(<ListarNotas />);
        
        expect(screen.getByTestId('layout-admin')).toBeInTheDocument();
        expect(screen.getByTestId('button-agregar-nota')).toBeInTheDocument();
        expect(screen.getByTestId('button-gestionar-categorías')).toBeInTheDocument();
        expect(screen.getByTestId('listar-notas-container')).toBeInTheDocument();
        expect(screen.getByTestId('modal-categoria-container')).toBeInTheDocument();
    });

    test('debe navegar a la página de agregar nota al hacer clic en el botón', () => {
        render(<ListarNotas />);
        const addButton = screen.getByTestId('button-agregar-nota');
        fireEvent.click(addButton);
        
        expect(mockedNavigate).toHaveBeenCalledWith('/notas/agregar');
    });

    test('debe abrir y cerrar el modal de categorías', async () => {
        render(<ListarNotas />);
        
        const openModalButton = screen.getByTestId('button-gestionar-categorías');
        const modal = screen.getByTestId('modal-categoria-container');
        
        expect(modal).toHaveClass('hidden');
        
        await userEvent.click(openModalButton);
        expect(modal).toHaveClass('visible');
        
        const closeModalButton = screen.getByTestId('modal-close-button');
        await userEvent.click(closeModalButton);
        expect(modal).toHaveClass('hidden');
    });
});
