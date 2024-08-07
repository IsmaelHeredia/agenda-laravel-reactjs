import React, { useState } from "react";
import Layout from "@layouts/Layout";
import { TextField } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import LoadingButton from "@mui/lab/LoadingButton";

import LoginIcon from "@mui/icons-material/Login";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useNavigate } from "react-router-dom";

import { ValidarIngreso } from "@customTypes/app/ingreso";
import { useForm, SubmitHandler } from "react-hook-form";

import { useDispatch } from "react-redux";
import { setAuth } from "@store/reducers/authSlice";

import {
    useValidarIngresoMutation,
} from "@store/api/apiIngreso";


import { apiCategorias } from "@store/api/apiCategorias";
import { apiNotas } from "@store/api/apiNotas";
import { apiCuenta } from "@store/api/apiCuenta";

const Ingreso = () => {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const [validarIngreso, { isLoading }] = useValidarIngresoMutation();

    const [disabled, setDisabled] = useState(false);
    
    const handleClickIngreso: SubmitHandler<ValidarIngreso> = (data) => {
            
        var datosForm = {
            "usuario": data.usuario,
            "clave": data.clave
        }

        validarIngreso(datosForm)
        .unwrap()
        .then((payload: any) => {

            const message = payload.mensaje ? payload.mensaje : "Datos incorrectos";

            if(payload.estado == "1") {

                var token = payload.datos;

                dispatch(apiCategorias.util.resetApiState());
                dispatch(apiNotas.util.resetApiState());
                dispatch(apiCuenta.util.resetApiState());

                dispatch(setAuth({
                    "token": token,
                    "username": data.usuario
                }));

                toast.success("Bienvenido al sistema", {autoClose: Number(import.meta.env.VITE_TIMEOUT_TOAST)});

                setDisabled(true);

                setTimeout(() => {
                    navigate("/");
                }, Number(import.meta.env.VITE_TIMEOUT_REDIRECT));

            } else {
                toast.warning(message, {autoClose: Number(import.meta.env.VITE_TIMEOUT_TOAST)});
            }   

        })
        .catch((error: any) => {  
            console.log('rejected', error);
            toast.error(String(import.meta.env.VITE_ERROR_AXIOS), {autoClose: Number(import.meta.env.VITE_TIMEOUT_TOAST)});
        });
          
    }

    const { register : registerIngreso, handleSubmit : handleSubmitIngreso, formState: { errors : errorsIngreso }, control : controlIngreso, setValue : setValueIngreso, clearErrors: cleanErrorsIngreso } = useForm<ValidarIngreso>({
        defaultValues: { 
            usuario : "",
            clave: "",
        }
    });

    return(
        <Layout>
            <div className="ingreso">
                <Card style={{ paddingBottom: 10 }}>
                    <form onSubmit={handleSubmitIngreso(handleClickIngreso)} noValidate>
                        <CardContent>
                            <Typography gutterBottom variant="h4" component="div" align="center" style={{ paddingBottom: 10 }}>
                                Iniciar sesión
                            </Typography>
                            <TextField 
                                {...registerIngreso("usuario", { required: true })}
                                label="Usuario"
                                variant="outlined"
                                color="primary"
                                type="text"
                                sx={{ mb: 3 }}
                                fullWidth
                                error={ !!errorsIngreso.usuario }
                            />
                            <TextField 
                                {...registerIngreso("clave", { required: true })}
                                label="Clave"
                                variant="outlined"
                                color="primary"
                                type="password"
                                fullWidth
                                sx={{ mb: 1 }}
                                error={ !!errorsIngreso.clave }
                            />
                        </CardContent>
                        <CardActions className="center-div">
                            <LoadingButton 
                                startIcon={<LoginIcon />}
                                loading={isLoading}
                                loadingPosition="start"
                                variant="contained"
                                color="primary"
                                type="submit"
                                disabled={disabled}
                            >
                                Ingresar
                            </LoadingButton>
                        </CardActions>
                    </form>
                </Card>
            </div>
        </Layout>
    );

};

export default Ingreso;