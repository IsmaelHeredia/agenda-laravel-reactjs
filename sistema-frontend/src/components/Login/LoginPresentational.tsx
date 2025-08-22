import React from 'react';
import {
    Card,
    CardActions,
    CardContent,
    Typography,
    InputAdornment,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import LoginIcon from "@mui/icons-material/Login";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { ValidarIngreso } from '@/types/app/ingreso';
import { FormTextField } from "@/components/CustomTextFields/CustomTextFields";

interface LoginPresentationalProps {
    handleSubmit: (e?: React.FormEvent<HTMLFormElement> | undefined) => void;
    register: UseFormRegister<ValidarIngreso>;
    errors: FieldErrors<ValidarIngreso>;
    loading: boolean;
}

const LoginPresentational: React.FC<LoginPresentationalProps> = ({
    handleSubmit,
    register,
    errors,
    loading,
}) => {
    return (
        <div className="ingreso">
            <Card
                style={{
                    padding: 24,
                    maxWidth: 600,
                    margin: "auto",
                    borderRadius: 3,
                    boxShadow:
                        "0px 3px 5px rgba(0, 0, 0, 0.1), 0px 6px 10px rgba(0, 0, 0, 0.08)",
                }}
            >
                <form onSubmit={handleSubmit} noValidate>
                    <CardContent>
                        <Typography
                            gutterBottom
                            variant="h4"
                            component="div"
                            align="center"
                            style={{ paddingBottom: 10, fontWeight: 'bold' }}
                        >
                            Iniciar sesión
                        </Typography>

                        <FormTextField
                            {...register("usuario", { required: true })}
                            label="Usuario"
                            variant="outlined"
                            color="primary"
                            type="text"
                            sx={{ mb: 3 }}
                            fullWidth
                            error={!!errors.usuario}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <PersonIcon color="action" />
                                    </InputAdornment>
                                ),
                            }}
                        />

                        <FormTextField
                            {...register("clave", { required: true })}
                            label="Clave"
                            variant="outlined"
                            color="primary"
                            type="password"
                            fullWidth
                            sx={{ mb: 1 }}
                            error={!!errors.clave}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LockIcon color="action" />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </CardContent>

                    <CardActions className="center-div">
                        <LoadingButton
                            startIcon={<LoginIcon />}
                            loadingPosition="start"
                            variant="contained"
                            color="primary"
                            type="submit"
                            loading={loading}
                            disabled={loading}
                        >
                            Ingresar
                        </LoadingButton>
                    </CardActions>
                </form>
            </Card>
        </div>
    );
};

export default LoginPresentational;