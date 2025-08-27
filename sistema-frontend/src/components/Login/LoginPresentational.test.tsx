import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginPresentational from './LoginPresentational';
import { FieldErrorsImpl } from 'react-hook-form';
import { ValidarIngreso } from '@/types/app/ingreso';

import '@testing-library/jest-dom'; 

jest.mock("@/components/CustomTextFields/CustomTextFields", () => ({
    FormTextField: ({ label, onChange, error }: any) => {
        const isInvalid = error ? 'true' : 'false';
        
        return (
            <input
                data-testid={label}
                placeholder={label}
                aria-invalid={isInvalid}
                onChange={onChange}
            />
        );
    },
}));

const mockRegister = (name: string) => ({
    name,
    onChange: jest.fn(),
});
const mockErrors: FieldErrorsImpl<ValidarIngreso> = {};
const mockHandleSubmit = jest.fn((e?: React.FormEvent<HTMLFormElement>) => e?.preventDefault());

describe('LoginPresentational', () => {
    test('debe renderizar el título, los campos de entrada y el botón', () => {
        render(
            <LoginPresentational
                handleSubmit={mockHandleSubmit}
                register={mockRegister as any}
                errors={mockErrors}
                loading={false}
            />
        );

        expect(screen.getByText(/Iniciar sesión/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Usuario/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Clave/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Ingresar/i })).toBeInTheDocument();
    });

    test('el botón de ingresar debe mostrar el estado de carga y estar deshabilitado cuando loading es true', () => {
        render(
            <LoginPresentational
                handleSubmit={mockHandleSubmit}
                register={mockRegister as any}
                errors={mockErrors}
                loading={true}
            />
        );
        const loginButton = screen.getByRole('button', { name: /Ingresar/i });
        expect(loginButton).toBeDisabled();
    });

    test('debe llamar a handleSubmit cuando se envía el formulario', async () => {
        render(
            <LoginPresentational
                handleSubmit={mockHandleSubmit}
                register={mockRegister as any}
                errors={mockErrors}
                loading={false}
            />
        );

        const userInput = screen.getByPlaceholderText(/Usuario/i);
        const passwordInput = screen.getByPlaceholderText(/Clave/i);
        const loginButton = screen.getByRole('button', { name: /Ingresar/i });

        await userEvent.type(userInput, 'testuser');
        await userEvent.type(passwordInput, 'testpassword');
        await userEvent.click(loginButton);

        expect(mockHandleSubmit).toHaveBeenCalledTimes(1);
    });

    test('debe indicar un estado de error para el campo de usuario cuando hay un error', () => {
        const errorsWithUser = {
            usuario: { message: 'El usuario es requerido', type: 'required' },
        };
        render(
            <LoginPresentational
                handleSubmit={mockHandleSubmit}
                register={mockRegister as any}
                errors={errorsWithUser as any}
                loading={false}
            />
        );

        const userInput = screen.getByTestId(/Usuario/i);
        expect(userInput).toHaveAttribute('aria-invalid', 'true');
    });
});
