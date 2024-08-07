import LayoutAdmin from "@layouts/LayoutAdmin";
import React, { useState, useEffect } from "react";

import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import { TextField, Button } from "@mui/material";
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

    const dispatch = useDispatch();

    const filters: any = useSelector((state: RootState) => state.filters);

    const [pagina, setPagina] = useState(1);

    const { data: dataCategorias, isLoading} = useGetCategoriasPaginaQuery({
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

    const [disabledSave, setDisabledSave] = useState(false);
    const [disabledDelete, setDisabledDelete] = useState(false);

    useEffect(() => {
    
        if(dataCategorias) {

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

        }
    
    }, [dataCategorias]);

    const [open, setOpen] = useState(false);

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
    };

    const handleClickAtras = () => {
        setPagina(paginationData.anterior);
    };

    const handleClickSiguiente = () => {
        setPagina(paginationData.siguiente);
    };

    const handleClickSiguienteTodo = () => {
        setPagina(paginationData.paginas);
    };

    const handleClickGuardarCategoria: SubmitHandler<Categoria> = (data) => {

        if(data.id == null || data.id == 0) {
        
            createCategoria(data.nombre)
            .unwrap()
            .then((payload: any) => {

                const estado = payload.estado;
                const mensaje = payload.mensaje;

                if (estado == 1) {
                    setOpen(false);
                    toast.success(mensaje, {autoClose: Number(import.meta.env.VITE_TIMEOUT_TOAST)});
                } else {
                    toast.warning(mensaje, {autoClose: Number(import.meta.env.VITE_TIMEOUT_TOAST)});
                }

            })
            .catch((error: any) => {  
                console.log('rejected', error);
                toast.error(String(import.meta.env.VITE_ERROR_AXIOS), {autoClose: Number(import.meta.env.VITE_TIMEOUT_TOAST)});
            });

        } else {

            const datosForm = {
                "id": data.id,
                "nombre" : data.nombre,
            };

            updateCategoria(datosForm)
            .unwrap()
            .then((payload: any) => {

                const estado = payload.estado;
                const mensaje = payload.mensaje;

                if (estado == 1) {
                    setOpen(false);
                    toast.success(mensaje, {autoClose: Number(import.meta.env.VITE_TIMEOUT_TOAST)});
                } else {
                    toast.warning(mensaje, {autoClose: Number(import.meta.env.VITE_TIMEOUT_TOAST)});
                }

            })
            .catch((error: any) => {  
                console.log('rejected', error);
                toast.error(String(import.meta.env.VITE_ERROR_AXIOS), {autoClose: Number(import.meta.env.VITE_TIMEOUT_TOAST)});
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
                toast.success(mensaje, {autoClose: Number(import.meta.env.VITE_TIMEOUT_TOAST)});
            } else {
                toast.warning(mensaje, {autoClose: Number(import.meta.env.VITE_TIMEOUT_TOAST)});
            }

        })
        .catch((error: any) => {  
            console.log('rejected', error);
            toast.error(String(import.meta.env.VITE_ERROR_AXIOS), {autoClose: Number(import.meta.env.VITE_TIMEOUT_TOAST)});
        });

        setOpenConfirm(false);
    };

    const handleClickFiltrar: SubmitHandler<FiltrarCategoria> = (data) => {
        dispatch(changeFiltersCategory({
            "name" : data.buscarNombre
        }));
    };

    const handleClickBorrarFiltro = () => {
        dispatch(changeFiltersCategory({
            "name" : ""
        }));
        setValueFiltro("buscarNombre","");
    };

    const { register : registerCategoria, handleSubmit : handleSubmitCategoria, formState: { errors : errorsCategoria }, control : controlCategoria, setValue : setValueCategoria, clearErrors: cleanErrorsCategoria, getValues : getValueCategoria } = useForm<Categoria>({
        defaultValues: { 
            nombre : "",
        }
    });

    const { register: registerFiltro , handleSubmit: handleSubmitFiltro , control : controlFiltro , setValue : setValueFiltro } = useForm<FiltrarCategoria>({
        defaultValues: {
            buscarNombre: filters.category_name,
        }
    });

    return(
        <LayoutAdmin>

            <div className="botones-principales">
                <Grid container justifyContent="flex-start" sx={{ mt: 10 }}>
                    <Button
                        startIcon={<AddIcon />}
                        variant="contained"
                        color="primary"
                        type="submit"
                        onClick={ handleClickOpen }
                    >
                        Agregar categoría
                    </Button>
                </Grid>
            </div>
            <Divider style={{ width:"100%" }} />
            <form onSubmit={handleSubmitFiltro(handleClickFiltrar)}>
                <Grid container justifyContent="center" alignItems="center" sx={{ mt : 2 }}>
                    <TextField 
                        {...registerFiltro("buscarNombre", { required: false })}
                        label="Ingrese nombre"
                        variant="outlined"
                        color="primary"
                        type="text"
                        sx={{ mb: 3, width: "25%" }}
                    />
                    <div style={{ marginBottom: "25px" }}>
                        <Button 
                            type="submit"
                            variant="contained"
                            color="primary"
                            startIcon={<SearchIcon />}
                            sx={{ ml: 1 }}
                        >
                            Filtrar
                        </Button>
                        <Button 
                            variant="contained"
                            color="primary"
                            startIcon={<ClearIcon />}
                            sx={{ ml: 1 }}
                            onClick={ handleClickBorrarFiltro }
                        >
                            Borrar
                        </Button>
                    </div>
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
            >
                <DialogTitle>
                    <Typography variant="h4" component="div">Categoría</Typography>
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
                            error={ !!errorsCategoria.nombre }
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
                        >
                            Guardar
                        </LoadingButton>
                        <Button 
                            startIcon={<CloseIcon />}
                            color="primary"
                            variant="contained"
                            disabled={disabledSave}
                            onClick={() => setOpen(false) }
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
            >
                <DialogTitle>
                    <Typography variant="h4" component="div">Confirmación</Typography>
                </DialogTitle>
                <DialogContent style={{ paddingTop: 10 }}>
                <Typography>Desea borrar la categoría { confirmDeleteCategoriaNombre } ?</Typography>
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
                        onClick={ handleConfirmDelete }
                    >
                        Borrar
                    </LoadingButton>
                    <Button 
                        startIcon={<CloseIcon />}
                        color="primary"
                        variant="contained"
                        disabled={disabledDelete}
                        onClick={() => setOpenConfirm(false) }
                    >
                        Cerrar
                    </Button>
                </DialogActions>
            </Dialog>

            {isLoading ?
                <div className="center-div" style={{ marginTop:"30px" }}>
                    <CircularProgress color="secondary" size="5rem" className="center-div" style={{ marginTop:"70px" }} />
                </div>
            :

                <>
                
                {categorias.length == 0 ?

            
                    <Typography variant="h5" className="center-div" style={{ marginTop:"30px" }}>No se encontraron categorías</Typography>

                :
                
                    <>
                    <div className="datos-tabla">

                        <TableContainer component={Paper}>
                            <Table sx={{ width: "100%" }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Nombre</TableCell>
                                        <TableCell align="center">Opción</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>

                                    {categorias.map((categoria: Categoria) => (
                                        <TableRow
                                            key={categoria.id}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                {categoria.nombre}
                                            </TableCell>
                                            <TableCell align="center">

                                                <IconButton onClick={() => handleEditCategoria(categoria.id)}>
                                                    <EditIcon />
                                                </IconButton>

                                                <IconButton onClick={() => handleDeleteCategoria(categoria.id)}>
                                                    <DeleteIcon />
                                                </IconButton>

                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        </div>
                        <div className="paginas-categorias" style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
                            <Typography className="left-categorias" style={{ marginTop: "20px" }}>
                                Página {paginationData.actual} / {paginationData.paginas}
                            </Typography>
                            <div className="right-categorias">
                                <ButtonGroup variant="contained" aria-label="Basic button group">
                                    <IconButton disabled={paginationData.actual == 1} onClick={handleClickAtrasTodo}>
                                        <KeyboardDoubleArrowLeftIcon sx={{ fontSize: 50 }} />
                                    </IconButton>
                                    <IconButton disabled={paginationData.actual == 1} onClick={handleClickAtras}>
                                        <KeyboardArrowLeftIcon sx={{ fontSize: 50 }} />
                                    </IconButton>
                                    <IconButton disabled={paginationData.actual == paginationData.paginas} onClick={handleClickSiguiente}>
                                        <KeyboardArrowRightIcon sx={{ fontSize: 50 }} />
                                    </IconButton>
                                    <IconButton disabled={paginationData.actual == paginationData.paginas} onClick={handleClickSiguienteTodo}>
                                        <KeyboardDoubleArrowRightIcon sx={{ fontSize: 50 }} />
                                    </IconButton>
                                </ButtonGroup>
                            </div>
                        </div>
                        </>
                }

                </>
                
            }

        </LayoutAdmin>
    );

};

export default ListarCategorias;