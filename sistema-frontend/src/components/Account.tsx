import * as React from "react";
import { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import { TextField, Button, useMediaQuery, useTheme, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ActualizarCuenta } from "@customTypes/app/cuenta";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { RootState } from "@customTypes/redux/global";
import { useSelector, useDispatch } from "react-redux";
import { setAuth } from "@store/reducers/authSlice";
import { useCambiarDatosMutation } from "@store/api/apiCuenta";
import { toastRedirect } from "@/utils/toastRedirect";

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />
});

const Account = () => {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);

    const usuario_actual = useSelector((state: RootState) => state.auth.username);

    const [cambiarDatos, { isLoading }] = useCambiarDatosMutation();

    const [disabled, setDisabled] = useState(false);

    const handleClickOpen = () => {

        cleanErrorsCuenta();

        setOpen(true);

    };

    const handleClose = (event: any, reason: string) => {
        if (reason && reason === "backdropClick") {
            return;
        }
        setOpen(false);
    };

    const handleClickActualizarCuenta: SubmitHandler<ActualizarCuenta> = (data) => {

        const datosForm = {
            "usuario": data.usuario,
            "nuevo_usuario": data.nuevo_usuario,
            "clave": data.clave,
            "nueva_clave": data.nueva_clave
        };

        cambiarDatos(datosForm)
            .unwrap()
            .then((payload: any) => {

                const estado = payload.estado;
                const mensaje = payload.mensaje;

                if (estado == 1) {

                    setOpen(false);

                    dispatch(setAuth({
                        "token": "",
                        "username": ""
                    }));

                    setDisabled(true);

                    toastRedirect(mensaje, navigate, "/ingreso", "success", Number(import.meta.env.VITE_TIMEOUT_REDIRECT));

                } else {
                    toast.warning(mensaje, { autoClose: Number(import.meta.env.VITE_TIMEOUT_TOAST) });
                }

            })
            .catch((error: any) => {
                console.log('rejected', error);
                toast.error(String(import.meta.env.VITE_ERROR_AXIOS), { autoClose: Number(import.meta.env.VITE_TIMEOUT_TOAST) });
            });

    }

    const { register: registerCuenta, handleSubmit: handleSubmitCuenta, formState: { errors: errorsCuenta }, control: controlCuenta, setValue: setValueCuenta, clearErrors: cleanErrorsCuenta } = useForm<ActualizarCuenta>({
        defaultValues: {
            usuario: usuario_actual,
            nuevo_usuario: "",
            clave: "",
            nueva_clave: ""
        }
    });

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

    return (
        <div>
            <ListItem
                button
                sx={{
                    backgroundColor: "inherit",
                    "&:hover": { backgroundColor: theme.palette.action.hover },
                }}
                onClick={() => setOpen(true)}
            >
                <ListItemIcon sx={{ color: "text.primary" }}>
                    <AccountCircleIcon />
                </ListItemIcon>
                <ListItemText primary="Cuenta" sx={{ color: "text.primary" }} />
            </ListItem>
            <Dialog
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                className="center"
                disableEscapeKeyDown
                fullWidth
                maxWidth="sm"
                sx={{ "& .MuiPaper-root": { borderRadius: "16px", p: 2 } }}
            >
                <DialogTitle>
                    <Typography variant={isSmallScreen ? "h5" : "h4"} component="div">
                        Actualizar datos de cuenta
                    </Typography>
                </DialogTitle>
                <form onSubmit={handleSubmitCuenta(handleClickActualizarCuenta)} noValidate>
                    <DialogContent sx={{ pt: 1 }}>
                        <TextField
                            {...registerCuenta("usuario", { required: true })}
                            label="Usuario actual"
                            variant="outlined"
                            color="primary"
                            type="text"
                            fullWidth
                            disabled
                            sx={{
                                mb: { xs: 2, sm: 3 },
                                "& .MuiOutlinedInput-root": { borderRadius: "12px" }
                            }}
                        />
                        <TextField
                            {...registerCuenta("nuevo_usuario", { required: true })}
                            label="Nuevo usuario"
                            variant="outlined"
                            color="primary"
                            type="text"
                            fullWidth
                            error={!!errorsCuenta.nuevo_usuario}
                            sx={{
                                mb: { xs: 2, sm: 3 },
                                "& .MuiOutlinedInput-root": { borderRadius: "12px" }
                            }}
                        />
                        <TextField
                            {...registerCuenta("clave", { required: true })}
                            label="Clave"
                            variant="outlined"
                            color="primary"
                            type="password"
                            fullWidth
                            error={!!errorsCuenta.clave}
                            sx={{
                                mb: { xs: 2, sm: 3 },
                                "& .MuiOutlinedInput-root": { borderRadius: "12px" }
                            }}
                        />
                        <TextField
                            {...registerCuenta("nueva_clave", { required: true })}
                            label="Nueva clave"
                            variant="outlined"
                            color="primary"
                            type="password"
                            fullWidth
                            error={!!errorsCuenta.nueva_clave}
                            sx={{
                                mb: { xs: 2, sm: 3 },
                                "& .MuiOutlinedInput-root": { borderRadius: "12px" }
                            }}
                        />
                    </DialogContent>
                    <DialogActions className="center-div" sx={{ mb: 2, flexWrap: "wrap" }}>
                        <LoadingButton
                            startIcon={<SaveIcon />}
                            color="primary"
                            variant="contained"
                            disabled={disabled}
                            loading={isLoading}
                            loadingPosition="start"
                            type="submit"
                            sx={{ borderRadius: "12px", minWidth: 120 }}
                        >
                            Guardar
                        </LoadingButton>
                        <Button
                            startIcon={<CloseIcon />}
                            color="primary"
                            variant="contained"
                            disabled={disabled}
                            sx={{ borderRadius: "12px", minWidth: 120 }}
                            onClick={() => setOpen(false)}
                        >
                            Cerrar
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    );

};

export default Account;