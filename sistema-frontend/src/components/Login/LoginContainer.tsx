import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useValidarIngresoMutation } from "@store/api/apiSlices";
import { ValidarIngreso } from "@/types/app/ingreso";

import LoginPresentational from './LoginPresentational';
import { toastRedirect } from "@/utils/toastRedirect";

const LoginContainer = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [validarIngreso] = useValidarIngresoMutation();
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ValidarIngreso>({
        defaultValues: {
            usuario: "",
            clave: "",
        },
    });

    const handleIngreso: SubmitHandler<ValidarIngreso> = async (data) => {
        setLoading(true);

        try {
            const payload = await validarIngreso(data).unwrap();
            const token = payload.data.access_token;

            sessionStorage.setItem('token', token);

            toastRedirect("Bienvenido al sistema", navigate, "/", "success", 3000);

        } catch (error: any) {
            console.error('Login failed', error);
            const message = error?.data?.message || String(import.meta.env.VITE_ERROR_AXIOS);
            toast.error(message, { autoClose: 3000 });
            setLoading(false);
        }
    };

    return (
        <LoginPresentational
            handleSubmit={handleSubmit(handleIngreso)}
            register={register}
            errors={errors}
            loading={loading}
        />
    );
};

export default LoginContainer;
