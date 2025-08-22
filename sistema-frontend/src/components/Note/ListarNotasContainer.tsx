import React, { useState, useEffect, useRef, useTransition } from "react";
import { useMediaQuery, Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Slide, Box, CircularProgress, IconButton, ButtonGroup } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import LoadingButton from "@mui/lab/LoadingButton";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "@mui/material/styles";

import NotasTablePresentation from "./NotasTablePresentation";

import { Categoria, Nota } from "@/types/app/notas";
import { useSelector, useDispatch } from "react-redux";
import { changeFiltersNote } from "@store/reducers/filtersSlice";
import { changeNotePage } from "@store/reducers/paginationSlice";
import { AppDispatch, RootState } from "@store/store";

import { useGetCategoriasQuery, useGetNotasPaginaQuery, useDeleteNotaMutation, useToggleNoteFavoriteMutation } from "@store/api/apiSlices";

import ModalCategoriaContainer from "@/components/Category/ModalCategoriaContainer";

interface FiltrarNotaForm {
    buscarNombre: string;
    buscarCategorias: Categoria[];
    buscarFavorita: boolean | null;
}

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const ListarNotasContainer: React.FC = () => {
    const isMobile = useMediaQuery("(max-width:600px)");
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const theme = useTheme();

    const filters = useSelector((state: RootState) => state.filters);
    const pagination = useSelector((state: RootState) => state.pagination);

    const [openConfirm, setOpenConfirm] = useState<boolean>(false);
    const [openCategoryModal, setOpenCategoryModal] = useState<boolean>(false);
    const [confirmDeleteNotaId, setConfirmDeleteNotaId] = useState<number>(0);
    const [confirmDeleteNotaTitulo, setConfirmDeleteNotaTitulo] = useState<string>("");
    const [isFavoritingId, setIsFavoritingId] = useState<number | null>(null);

    const [isPending, startTransition] = useTransition();

    const tablaNotasRef = useRef<HTMLDivElement>(null);

    const { data: dataCategorias } = useGetCategoriasQuery({});
    const { data: dataNotas, isLoading: isLoadingNotas } = useGetNotasPaginaQuery({
        pagina: pagination.note_page,
        titulo: filters.note_name,
        categorias: filters.note_categories.map((cat: { id: number; }) => cat.id),
        favorita: filters.note_favorite === null ? undefined : filters.note_favorite,
    });
    const [deleteNota, { isLoading: isLoadingDelete }] = useDeleteNotaMutation();
    const [toggleNoteFavorite] = useToggleNoteFavoriteMutation();

    const notas: Nota[] = dataNotas?.notas || [];
    const totalPaginas = dataNotas?.last_page ? parseInt(dataNotas.last_page as unknown as string) : 0;
    const paginaActual = dataNotas?.current_page ? parseInt(dataNotas.current_page as unknown as string) : 1;

    useEffect(() => {
        if (dataNotas) {
        }
    }, [dataNotas]);

    const { control: controlFiltro, setValue: setValueFiltro, handleSubmit: handleSubmitFiltro } = useForm<FiltrarNotaForm>({
        defaultValues: {
            buscarNombre: filters.note_name,
            buscarCategorias: filters.note_categories,
            buscarFavorita: filters.note_favorite,
        }
    });

    useEffect(() => {
        setValueFiltro("buscarNombre", filters.note_name);
        setValueFiltro("buscarCategorias", filters.note_categories);
        setValueFiltro("buscarFavorita", filters.note_favorite);
    }, [filters, setValueFiltro]);

    const ajustarScrollTabla = () => {
        if (tablaNotasRef.current) {
            tablaNotasRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const changePage = (page: number) => {
        if (page !== paginaActual) {
            startTransition(() => {
                dispatch(changeNotePage({ page }));
            });
            ajustarScrollTabla();
        }
    };

    const handleClickAtrasTodo = () => changePage(1);
    const handleClickAtras = () => changePage(paginaActual - 1);
    const handleClickSiguiente = () => changePage(paginaActual + 1);
    const handleClickSiguienteTodo = () => changePage(totalPaginas);

    const handleFavoriteNote = async (id: number) => {
        setIsFavoritingId(id);
        try {
            await toggleNoteFavorite(id).unwrap();
        } catch (error) {
            console.error("Error al actualizar la nota favorita:", error);
            toast.error("Error al actualizar la nota favorita", { autoClose: Number(import.meta.env.VITE_TIMEOUT_TOAST) });
        } finally {
            setIsFavoritingId(null);
        }
    };

    const handleClickCreateNota = () => navigate("/notas/agregar");
    const handleClickEditNota = (id: number) => navigate("/notas/" + id + "/editar");
    const handleCloseConfirm = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason && reason === "backdropClick") return;
        setOpenConfirm(false);
    };
    const handleClickDeleteNota = (id: number) => {
        const data_nota = notas.find(n => n.id === id);
        setConfirmDeleteNotaId(data_nota?.id || 0);
        setConfirmDeleteNotaTitulo(data_nota?.titulo || "");
        setOpenConfirm(true);
    };
    const handleConfirmDelete = () => {
        deleteNota(confirmDeleteNotaId)
            .unwrap()
            .then((payload: { estado: number; mensaje: string }) => {
                const { estado, mensaje } = payload;
                if (estado === 1) {
                    setOpenConfirm(false);
                    toast.success(mensaje, { autoClose: Number(import.meta.env.VITE_TIMEOUT_TOAST) });
                } else {
                    toast.warning(mensaje, { autoClose: Number(import.meta.env.VITE_TIMEOUT_TOAST) });
                }
            })
            .catch((error) => console.log('rejected', error));
        setOpenConfirm(false);
    };
    const handleOpenCategoryModal = () => setOpenCategoryModal(true);
    const handleCloseCategoryModal = () => setOpenCategoryModal(false);

    const anyActionIsLoading = isFavoritingId !== null || isLoadingDelete || isLoadingNotas;

    return (
        <>
            {isLoadingNotas && !isPending ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                    <CircularProgress />
                </Box>
            ) : (
                <Box sx={{ opacity: isPending ? 0.6 : 1, transition: "opacity 0.3s ease-in-out" }}>
                    <NotasTablePresentation
                        notas={notas}
                        isMobile={isMobile}
                        isFullLoading={isLoadingNotas}
                        anyActionIsLoading={anyActionIsLoading}
                        isFavoritingId={isFavoritingId}
                        handleCreateNota={handleClickCreateNota}
                        handleEditNota={handleClickEditNota}
                        handleDeleteNota={handleClickDeleteNota}
                        handleFavoriteNote={handleFavoriteNote}
                        handleOpenCategoryModal={handleOpenCategoryModal}
                        tablaNotasRef={tablaNotasRef}
                    />

                    {totalPaginas >= 1 && (
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                mt: 4,
                                flexDirection: { xs: "column", sm: "row" },
                                gap: 2,
                                width: "100%"
                            }}
                        >
                            <Typography sx={{ mt: { xs: 2, sm: 0 }, ml: 18 }}>
                                Página {paginaActual} / {totalPaginas}
                            </Typography>
                            <ButtonGroup
                                variant="contained"
                                sx={{
                                    backgroundColor: "background.paper",
                                    boxShadow: "none",
                                    border: `1px solid`,
                                    borderColor: "divider",
                                    mr: 18
                                }}
                            >
                                <IconButton
                                    onClick={handleClickAtrasTodo}
                                    disabled={paginaActual === 1 || isPending}
                                    sx={{
                                        color: "text.primary",
                                        borderRadius: 0,
                                        "&:hover": {
                                            backgroundColor: "background.default",
                                            color: "text.primary",
                                        },
                                        "&:not(:last-of-type)": {
                                            borderRight: "1px solid",
                                            borderRightColor: "divider",
                                        },
                                    }}
                                >
                                    <KeyboardDoubleArrowLeftIcon sx={{ color: "text.primary" }} fontSize="large" />
                                </IconButton>
                                <IconButton
                                    onClick={handleClickAtras}
                                    disabled={paginaActual === 1 || isPending}
                                    sx={{
                                        color: "text.primary",
                                        borderRadius: 0,
                                        "&:hover": {
                                            backgroundColor: "background.default",
                                            color: "text.primary",
                                        },
                                        "&:not(:last-of-type)": {
                                            borderRight: "1px solid",
                                            borderRightColor: "divider",
                                        },
                                    }}
                                >
                                    <KeyboardArrowLeftIcon sx={{ color: "text.primary" }} fontSize="large" />
                                </IconButton>
                                <IconButton
                                    onClick={handleClickSiguiente}
                                    disabled={paginaActual === totalPaginas || isPending}
                                    sx={{
                                        color: "text.primary",
                                        borderRadius: 0,
                                        "&:hover": {
                                            backgroundColor: "background.default",
                                            color: "text.primary",
                                        },
                                        "&:not(:last-of-type)": {
                                            borderRight: "1px solid",
                                            borderRightColor: "divider",
                                        },
                                    }}
                                >
                                    <KeyboardArrowRightIcon sx={{ color: "text.primary" }} fontSize="large" />
                                </IconButton>
                                <IconButton
                                    onClick={handleClickSiguienteTodo}
                                    disabled={paginaActual === totalPaginas || isPending}
                                    sx={{
                                        color: "text.primary",
                                        borderRadius: 0,
                                        "&:hover": {
                                            backgroundColor: "background.default",
                                            color: "text.primary",
                                        },
                                    }}
                                >
                                    <KeyboardDoubleArrowRightIcon sx={{ color: "text.primary" }} fontSize="large" />
                                </IconButton>
                            </ButtonGroup>
                        </Box>
                    )}
                </Box>
            )}

            <ModalCategoriaContainer open={openCategoryModal} onClose={handleCloseCategoryModal} />

            <Dialog
                open={openConfirm}
                onClose={handleCloseConfirm}
                TransitionComponent={Transition}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullWidth
                maxWidth="sm"
                disableEscapeKeyDown
                sx={{ "& .MuiPaper-root": { borderRadius: "16px" } }}
            >
                <DialogTitle id="confirm-dialog-title" sx={{ textAlign: 'center', fontWeight: 'bold' }}>
                    {"Confirmar eliminación de nota"}
                </DialogTitle>
                <DialogContent sx={{ textAlign: 'center' }}>
                    <Typography>¿Estás seguro de que quieres eliminar la nota <strong>{confirmDeleteNotaTitulo}</strong>?</Typography>
                </DialogContent>
                <DialogActions sx={{ justifyContent: 'center' }} style={{ marginBottom: "10px" }}>
                    <LoadingButton
                        variant="outlined"
                        color="error"
                        onClick={handleConfirmDelete}
                        startIcon={<DeleteIcon />}
                        disabled={isLoadingDelete}
                    >
                        Borrar
                    </LoadingButton>
                    <Button
                        variant="outlined"
                        onClick={() => setOpenConfirm(false)}
                        startIcon={<CloseIcon />}
                    >
                        Cerrar
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default ListarNotasContainer;