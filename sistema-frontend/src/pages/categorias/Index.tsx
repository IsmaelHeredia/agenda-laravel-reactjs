import LayoutAdmin from "@layouts/LayoutAdmin";
import React, { useState, useEffect, useRef } from "react";

import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import { TextField, Button, useMediaQuery } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ButtonGroup from "@mui/material/ButtonGroup";
import CircularProgress from "@mui/material/CircularProgress";
import LoadingButton from "@mui/lab/LoadingButton";

import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Categoria, FiltrarCategoria } from "@customTypes/app/categorias";
import { useForm, SubmitHandler, Controller } from "react-hook-form";

import { RootState } from "@customTypes/redux/global";
import { useSelector, useDispatch } from "react-redux";
import { changeFiltersCategory } from "@store/reducers/filtersSlice";

import {
    useGetCategoriasPaginaQuery,
    useCreateCategoriaMutation,
    useUpdateCategoriaMutation,
    useDeleteCategoriaMutation
} from "@store/api/apiCategorias";

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />
});

const ListarCategorias = () => {

    const isMobile = useMediaQuery("(max-width:600px)");

    const dispatch = useDispatch();

    const filters: any = useSelector((state: RootState) => state.filters);

    const [pagina, setPagina] = useState(1);

    const { data: dataCategorias, isLoading } = useGetCategoriasPaginaQuery({
        pagina: pagina,
        nombre: filters.category_name
    });

    const [createCategoria, { isLoading: isLoadingCreate }] = useCreateCategoriaMutation();
    const [updateCategoria, { isLoading: isLoadingUpdate }] = useUpdateCategoriaMutation();
    const [deleteCategoria, { isLoading: isLoadingDelete }] = useDeleteCategoriaMutation();

    const categorias: Categoria[] = dataCategorias?.categorias ? dataCategorias?.categorias : [];

    const [paginationData, setPaginationData] = useState({
        total: 0,
        paginas: 0,
        actual: 0,
        anterior: 0,
        siguiente: 0
    });

    const tablaCategoriasRef = useRef<HTMLDivElement>(null);

    const [disabledSave, setDisabledSave] = useState(false);
    const [disabledDelete, setDisabledDelete] = useState(false);

    useEffect(() => {

        if (dataCategorias) {

            const total = parseInt(dataCategorias.total);
            const paginas = parseInt(dataCategorias.last_page);
            const actual = parseInt(dataCategorias.current_page);
            const anterior = (actual - 1) > 0 ? (actual - 1) : 0;
            const siguiente = (actual + 1) < total ? (actual + 1) : total;

            setPaginationData({
                total: total,
                paginas: paginas,
                actual: actual,
                anterior: anterior,
                siguiente: siguiente
            });

            ajustarScrollTabla();

        }

    }, [dataCategorias]);

    const [open, setOpen] = useState(false);

    const ajustarScrollTabla = () => {
        if (tablaCategoriasRef.current) {
            tablaCategoriasRef.current.scrollTop = 0;
        }
    };

    const handleClickOpen = () => {

        cleanErrorsCategoria();

        setValueCategoria("id", 0);
        setValueCategoria("nombre", "");

        setOpen(true);

    };

    const handleClose = (event: any, reason: string) => {
        if (reason && reason === "backdropClick") {
            return;
        }
        setOpen(false);
    };

    const handleClickAtrasTodo = () => {
        setPagina(1);
        ajustarScrollTabla();
    };

    const handleClickAtras = () => {
        setPagina(paginationData.anterior);
        ajustarScrollTabla();
    };

    const handleClickSiguiente = () => {
        setPagina(paginationData.siguiente);
        ajustarScrollTabla();
    };

    const handleClickSiguienteTodo = () => {
        setPagina(paginationData.paginas);
        ajustarScrollTabla();
    };

    const handleClickGuardarCategoria: SubmitHandler<Categoria> = (data) => {

        if (data.id == null || data.id == 0) {

            createCategoria(data.nombre)
                .unwrap()
                .then((payload: any) => {

                    const estado = payload.estado;
                    const mensaje = payload.mensaje;

                    if (estado == 1) {
                        setOpen(false);
                        ajustarScrollTabla();
                        toast.success(mensaje, { autoClose: Number(import.meta.env.VITE_TIMEOUT_TOAST) });
                    } else {
                        toast.warning(mensaje, { autoClose: Number(import.meta.env.VITE_TIMEOUT_TOAST) });
                    }

                })
                .catch((error: any) => {
                    console.log('rejected', error);
                    toast.error(String(import.meta.env.VITE_ERROR_AXIOS), { autoClose: Number(import.meta.env.VITE_TIMEOUT_TOAST) });
                });

        } else {

            const datosForm = {
                "id": data.id,
                "nombre": data.nombre,
            };

            updateCategoria(datosForm)
                .unwrap()
                .then((payload: any) => {

                    const estado = payload.estado;
                    const mensaje = payload.mensaje;

                    if (estado == 1) {
                        setOpen(false);
                        ajustarScrollTabla();
                        toast.success(mensaje, { autoClose: Number(import.meta.env.VITE_TIMEOUT_TOAST) });
                    } else {
                        toast.warning(mensaje, { autoClose: Number(import.meta.env.VITE_TIMEOUT_TOAST) });
                    }

                })
                .catch((error: any) => {
                    console.log('rejected', error);
                    toast.error(String(import.meta.env.VITE_ERROR_AXIOS), { autoClose: Number(import.meta.env.VITE_TIMEOUT_TOAST) });
                });

        }

    };

    const handleEditCategoria = (id: number) => {

        setDisabledSave(false);

        let categoria = categorias.find((c => c.id === id));

        let nombre_categoria = categoria ? categoria.nombre : "";

        cleanErrorsCategoria();

        setValueCategoria("id", Number(id));
        setValueCategoria("nombre", nombre_categoria);

        setOpen(true);
    }

    const handleCloseConfirm = (event: any, reason: string) => {
        if (reason && reason === "backdropClick") {
            return;
        }
        setOpenConfirm(false);
    };

    const handleDeleteCategoria = (id: number) => {
        setDisabledDelete(false);
        let categoria = categorias.find((c => c.id === id));
        let id_categoria = categoria ? categoria.id : 0;
        let nombre_categoria = categoria ? categoria.nombre : "";
        setConfirmDeleteCategoriaId(id_categoria);
        setConfirmDeleteCategoriaNombre(nombre_categoria);
        setOpenConfirm(true);
    };

    const [openConfirm, setOpenConfirm] = useState(false);

    const [confirmDeleteCategoriaId, setConfirmDeleteCategoriaId] = useState(0);
    const [confirmDeleteCategoriaNombre, setConfirmDeleteCategoriaNombre] = useState("");

    const handleConfirmDelete = () => {

        deleteCategoria(confirmDeleteCategoriaId)
            .unwrap()
            .then((payload: any) => {

                const estado = payload.estado;
                const mensaje = payload.mensaje;

                if (estado == 1) {
                    setOpen(false);
                    ajustarScrollTabla();
                    toast.success(mensaje, { autoClose: Number(import.meta.env.VITE_TIMEOUT_TOAST) });
                } else {
                    toast.warning(mensaje, { autoClose: Number(import.meta.env.VITE_TIMEOUT_TOAST) });
                }

            })
            .catch((error: any) => {
                console.log('rejected', error);
                toast.error(String(import.meta.env.VITE_ERROR_AXIOS), { autoClose: Number(import.meta.env.VITE_TIMEOUT_TOAST) });
            });

        setOpenConfirm(false);
    };

    const handleClickFiltrar: SubmitHandler<FiltrarCategoria> = (data) => {
        dispatch(changeFiltersCategory({
            "name": data.buscarNombre
        }));
    };

    const handleClickBorrarFiltro = () => {
        dispatch(changeFiltersCategory({
            "name": ""
        }));
        setValueFiltro("buscarNombre", "");
    };

    const { register: registerCategoria, handleSubmit: handleSubmitCategoria, formState: { errors: errorsCategoria }, control: controlCategoria, setValue: setValueCategoria, clearErrors: cleanErrorsCategoria, getValues: getValueCategoria } = useForm<Categoria>({
        defaultValues: {
            nombre: "",
        }
    });

    const { register: registerFiltro, handleSubmit: handleSubmitFiltro, control: controlFiltro, setValue: setValueFiltro } = useForm<FiltrarCategoria>({
        defaultValues: {
            buscarNombre: filters.category_name,
        }
    });

    return (
        <LayoutAdmin>
            <div className="botones-principales">
                <Grid container justifyContent="flex-start" sx={{ px: isMobile ? 2 : 0 }}>
                    <Button
                        startIcon={<AddIcon />}
                        variant="contained"
                        color="primary"
                        sx={{ borderRadius: "12px" }}
                        onClick={handleClickOpen}
                    >
                        Agregar categoría
                    </Button>
                </Grid>
            </div>
            <Divider sx={{ width: "100%", my: 2 }} />
            <form onSubmit={handleSubmitFiltro(handleClickFiltrar)}>
                <Grid container justifyContent="center" alignItems="center" spacing={2}>
                    <Grid item xs={12} sm={6} md={4}>
                        <TextField
                            {...registerFiltro("buscarNombre", { required: false })}
                            label="Ingrese nombre"
                            variant="outlined"
                            color="primary"
                            type="text"
                            sx={{
                                mb: 3,
                                width: "100%",
                                "& .MuiOutlinedInput-root": { borderRadius: "12px" }
                            }}
                        />
                    </Grid>
                    <Grid item>
                        <div className={isMobile ? "" : "filtros-categorias"}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                startIcon={<SearchIcon />}
                                sx={{ borderRadius: "12px", ml: 1 }}
                            >
                                Filtrar
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                startIcon={<ClearIcon />}
                                sx={{ borderRadius: "12px", ml: 1 }}
                                onClick={handleClickBorrarFiltro}
                            >
                                Borrar
                            </Button>
                        </div>
                    </Grid>
                </Grid>
            </form>
            <Dialog
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                className="center"
                fullWidth
                maxWidth="sm"
                disableEscapeKeyDown
                sx={{ "& .MuiPaper-root": { borderRadius: "16px" } }}
            >
                <DialogTitle>
                    <Typography variant="h4" component="div">Gestión de categoría</Typography>
                </DialogTitle>
                <form onSubmit={handleSubmitCategoria(handleClickGuardarCategoria)} noValidate>
                    <DialogContent style={{ paddingTop: 10 }}>
                        <TextField
                            {...registerCategoria("nombre", { required: true })}
                            label="Nombre"
                            variant="outlined"
                            color="primary"
                            type="text"
                            fullWidth
                            error={!!errorsCategoria.nombre}
                            sx={{
                                mb: 3,
                                "& .MuiOutlinedInput-root": { borderRadius: "12px" }
                            }}
                        />
                    </DialogContent>
                    <DialogActions className="center-div" style={{ marginBottom: "10px" }}>
                        <LoadingButton
                            startIcon={<SaveIcon />}
                            color="primary"
                            variant="contained"
                            disabled={disabledSave}
                            loading={isLoadingCreate || isLoadingUpdate}
                            loadingPosition="start"
                            type="submit"
                            sx={{ borderRadius: "12px" }}
                        >
                            Guardar
                        </LoadingButton>
                        <Button
                            startIcon={<CloseIcon />}
                            color="primary"
                            variant="contained"
                            disabled={disabledSave}
                            sx={{ borderRadius: "12px" }}
                            onClick={() => setOpen(false)}
                        >
                            Cerrar
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>

            <Dialog
                open={openConfirm}
                onClose={handleCloseConfirm}
                TransitionComponent={Transition}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                className="center"
                fullWidth
                maxWidth="sm"
                disableEscapeKeyDown
                sx={{ "& .MuiPaper-root": { borderRadius: "16px" } }}
            >
                <DialogTitle>
                    <Typography variant="h4" component="div">Confirmación</Typography>
                </DialogTitle>
                <DialogContent style={{ paddingTop: 10 }}>
                    <Typography>¿ Desea borrar la categoría {confirmDeleteCategoriaNombre} ?</Typography>
                </DialogContent>
                <DialogActions className="center-div" style={{ marginBottom: "10px" }}>
                    <LoadingButton
                        startIcon={<DeleteIcon />}
                        color="primary"
                        variant="contained"
                        disabled={disabledDelete}
                        loading={isLoadingDelete}
                        loadingPosition="start"
                        type="submit"
                        sx={{ borderRadius: "12px" }}
                        onClick={handleConfirmDelete}
                    >
                        Borrar
                    </LoadingButton>
                    <Button
                        startIcon={<CloseIcon />}
                        color="primary"
                        variant="contained"
                        disabled={disabledDelete}
                        sx={{ borderRadius: "12px" }}
                        onClick={() => setOpenConfirm(false)}
                    >
                        Cerrar
                    </Button>
                </DialogActions>
            </Dialog>
            {isLoading ? (
                <Grid container justifyContent="center" sx={{ mt: 5 }}>
                    <CircularProgress color="secondary" size={50} />
                </Grid>
            ) : categorias.length === 0 ? (
                <Typography variant="h6" align="center" sx={{ mt: 3 }}>
                    No se encontraron categorías
                </Typography>
            ) : (
                <div className={(isMobile ? "" : "datos-tabla")}>
                    <TableContainer component={Paper} sx={{ mt: 2 }} className={(isMobile ? "" : "listado-categorias")}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Nombre</TableCell>
                                    <TableCell align="center">Opción</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {categorias.map((categoria) => (
                                    <TableRow key={categoria.id}>
                                        <TableCell>{categoria.nombre}</TableCell>
                                        <TableCell align="center">
                                            <IconButton onClick={() => handleEditCategoria(categoria.id)}>
                                                <EditIcon sx={{ color: "text.primary" }} />
                                            </IconButton>
                                            <IconButton onClick={() => handleDeleteCategoria(categoria.id)}>
                                                <DeleteIcon sx={{ color: "text.primary" }} />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Grid container justifyContent="space-between" alignItems="center" sx={{ mt: 5 }}>
                        <Typography>Página {paginationData.actual} / {paginationData.paginas}</Typography>
                        <ButtonGroup variant="contained">
                            <IconButton disabled={paginationData.actual == 1} onClick={handleClickAtrasTodo}>
                                <KeyboardDoubleArrowLeftIcon sx={{ color: "text.primary" }} fontSize="large" />
                            </IconButton>
                            <IconButton disabled={paginationData.actual == 1} onClick={handleClickAtras}>
                                <KeyboardArrowLeftIcon sx={{ color: "text.primary" }} fontSize="large" />
                            </IconButton>
                            <IconButton disabled={paginationData.actual == paginationData.paginas} onClick={handleClickSiguiente}>
                                <KeyboardArrowRightIcon sx={{ color: "text.primary" }} fontSize="large" />
                            </IconButton>
                            <IconButton disabled={paginationData.actual == paginationData.paginas} onClick={handleClickSiguienteTodo}>
                                <KeyboardDoubleArrowRightIcon sx={{ color: "text.primary" }} fontSize="large" />
                            </IconButton>
                        </ButtonGroup>
                    </Grid>
                </div>
            )}

        </LayoutAdmin>
    );

};

export default ListarCategorias;