import React, { memo } from "react";
import {
    Dialog,
    DialogContent,
    DialogActions,
    Stack,
    IconButton,
    Typography,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    useTheme,
    DialogTitle,
    Box,
    CircularProgress,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';
import LabelIcon from "@mui/icons-material/Label";
import SearchIcon from "@mui/icons-material/Search";

import {
    GeneralButton,
    GeneralLoadingButton,
    FormTextField,
} from "@/components/CustomTextFields/CustomTextFields";

import { Controller, SubmitHandler, Control, FieldErrors } from "react-hook-form";

interface Categoria {
    id: number;
    nombre: string;
}

interface CategoriaFormInputs {
    nombreCategoria: string;
}

const IconFormTextField: React.FC<{
    label: string;
    icon: React.ReactNode;
    name: keyof CategoriaFormInputs;
    control: Control<CategoriaFormInputs>;
    rules?: any;
    errors: FieldErrors<CategoriaFormInputs>;
    disabled?: boolean;
}> = memo(({ label, icon, name, control, rules, errors, disabled }) => (
    <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => (
            <FormTextField
                {...field}
                label={label}
                fullWidth
                InputProps={{
                    startAdornment: icon,
                }}
                error={!!errors[name]}
                helperText={errors[name] ? errors[name].message : ''}
                disabled={disabled}
            />
        )}
    />
));

interface ModalCategoriaPresentationalProps {
    open: boolean;
    onClose: () => void;
    pantallaActual: "listaCategorias" | "nuevaCategoria" | "editarCategoria";
    todasCategorias: Categoria[];
    categoriaAEditar: Categoria | null;
    busquedaCategoria: string;
    setBusquedaCategoria: (value: string) => void;
    loading: boolean;
    deletingId: number | null;
    loadingInitial: boolean;
    confirmDialog: {
        open: boolean;
        mensaje: string;
        onConfirm: () => void;
    };
    setConfirmDialog: React.Dispatch<React.SetStateAction<{
        open: boolean;
        mensaje: string;
        onConfirm: () => void;
    }>>;
    controlCategoria: Control<CategoriaFormInputs>;
    handleSubmitCategoria: (callback: SubmitHandler<CategoriaFormInputs>) => (e?: React.BaseSyntheticEvent) => Promise<void>;
    resetCategoria: () => void;
    setCategoriaValue: (name: keyof CategoriaFormInputs, value: any, options?: Record<string, boolean>) => void;
    errorsCategoria: FieldErrors<CategoriaFormInputs>;
    obtenerTituloPantalla: () => string;
    agregarCategoriaSubmit: SubmitHandler<CategoriaFormInputs>;
    iniciarEdicionCategoria: (categoria: Categoria) => void;
    guardarEdicionCategoriaSubmit: SubmitHandler<CategoriaFormInputs>;
    confirmarEliminarCategoria: (categoria: Categoria) => void;
    handleSetPantallaActual: (screen: "listaCategorias" | "nuevaCategoria" | "editarCategoria") => void;
}

const ModalCategoriaPresentational: React.FC<ModalCategoriaPresentationalProps> = ({
    open,
    onClose,
    pantallaActual,
    todasCategorias,
    categoriaAEditar,
    busquedaCategoria,
    setBusquedaCategoria,
    loading,
    deletingId,
    loadingInitial,
    confirmDialog,
    setConfirmDialog,
    controlCategoria,
    handleSubmitCategoria,
    resetCategoria,
    setCategoriaValue,
    errorsCategoria,
    obtenerTituloPantalla,
    agregarCategoriaSubmit,
    iniciarEdicionCategoria,
    guardarEdicionCategoriaSubmit,
    confirmarEliminarCategoria,
    handleSetPantallaActual,
}) => {
    const theme = useTheme();

    const filteredCategorias = todasCategorias.filter(c =>
        c.nombre.toLowerCase().includes(busquedaCategoria.toLowerCase())
    ).sort((a, b) => a.nombre.localeCompare(b.nombre));

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm"
            sx={{
                "& .MuiPaper-root": {
                    borderRadius: "16px",
                    backgroundColor: theme.palette.background.paper,
                    color: theme.palette.text.primary,
                }
            }}
        >
            <DialogContent sx={{ position: 'relative', pt: 4 }}>
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                    disabled={loading || loadingInitial}
                >
                    <CloseIcon />
                </IconButton>

                <Typography
                    variant="h5"
                    component="h3"
                    gutterBottom
                    sx={{
                        fontWeight: 'bold',
                        mt: 3,
                        textAlign: 'center',
                        mb: 4
                    }}
                >
                    {obtenerTituloPantalla()}
                </Typography>

                {loadingInitial ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 200 }}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <>
                        {pantallaActual === "listaCategorias" && (
                            <Stack spacing={2} sx={{ mt: 1 }}>
                                <FormTextField
                                    label="Buscar Categoría"
                                    fullWidth
                                    value={busquedaCategoria}
                                    onChange={(e) => setBusquedaCategoria(e.target.value)}
                                    disabled={loading}
                                    InputProps={{
                                        startAdornment: <SearchIcon />,
                                    }}
                                />
                                <GeneralButton
                                    startIcon={<AddIcon />}
                                    onClick={() => { handleSetPantallaActual("nuevaCategoria"); resetCategoria(); }}
                                    disabled={loading}
                                    variant="contained"
                                    color="primary"
                                >
                                    Nueva Categoría
                                </GeneralButton>
                                <List
                                    sx={{
                                        maxHeight: 300,
                                        overflowY: "auto",
                                        border: `1px solid ${theme.palette.divider}`,
                                        borderRadius: 1,
                                        backgroundColor: theme.palette.customList?.background,
                                    }}
                                >
                                    {filteredCategorias.length > 0 ? (
                                        filteredCategorias.map((cat) => (
                                            <ListItem key={cat.id} sx={{ borderBottom: `1px solid ${theme.palette.divider}` }}>
                                                <ListItemText primary={cat.nombre} sx={{ color: theme.palette.text.primary }} />
                                                <ListItemSecondaryAction>
                                                    <Stack direction="row" spacing={1} alignItems="center">
                                                        <IconButton
                                                            aria-label="edit"
                                                            onClick={() => iniciarEdicionCategoria(cat)}
                                                            sx={{ color: theme.palette.primary.main }}
                                                            disabled={loading}
                                                        >
                                                            <EditIcon />
                                                        </IconButton>

                                                        <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                                                            <IconButton
                                                                aria-label="delete"
                                                                onClick={() => confirmarEliminarCategoria(cat)}
                                                                color="error"
                                                                sx={{ color: theme.palette.error.main }}
                                                                disabled={loading}
                                                            >
                                                                <DeleteIcon />
                                                            </IconButton>
                                                            {loading && deletingId === cat.id && (
                                                                <CircularProgress
                                                                    size={24}
                                                                    sx={{
                                                                        color: theme.palette.error.main,
                                                                        position: 'absolute',
                                                                        top: '50%',
                                                                        left: '50%',
                                                                        marginTop: '-12px',
                                                                        marginLeft: '-12px',
                                                                    }}
                                                                />
                                                            )}
                                                        </Box>
                                                    </Stack>
                                                </ListItemSecondaryAction>
                                            </ListItem>
                                        ))
                                    ) : (
                                        <Typography variant="body2" color="textSecondary" sx={{ textAlign: 'center', mt: 2, p: 2 }}>
                                            No hay categorías para mostrar
                                        </Typography>
                                    )}
                                </List>
                            </Stack>
                        )}

                        {pantallaActual === "nuevaCategoria" && (
                            <Stack spacing={2} sx={{ mt: 1 }}>
                                <IconFormTextField
                                    label="Nombre de la Categoría"
                                    name="nombreCategoria"
                                    control={controlCategoria}
                                    rules={{
                                        required: "El nombre de la categoría es requerido",
                                        validate: (value: string) => {
                                            if (todasCategorias.some(cat => cat.nombre.toLowerCase() === value.toLowerCase())) {
                                                return "La categoría ya existe";
                                            }
                                            return true;
                                        }
                                    }}
                                    errors={errorsCategoria}
                                    icon={<LabelIcon sx={{ color: theme.palette.text.secondary }} />}
                                    disabled={loading}
                                />
                                <div style={{ display: "flex", gap: "16px", justifyContent: "flex-end", marginTop: "6%" }}>
                                    <GeneralLoadingButton
                                        color="info"
                                        variant="outlined"
                                        onClick={handleSubmitCategoria(agregarCategoriaSubmit)}
                                        startIcon={<AddIcon />}
                                        loading={loading}
                                        disabled={loading}
                                        loadingPosition="start"
                                    >
                                        Agregar Categoría
                                    </GeneralLoadingButton>
                                    <GeneralButton
                                        color="secondary"
                                        variant="outlined"
                                        onClick={() => { handleSetPantallaActual("listaCategorias"); resetCategoria(); }}
                                        disabled={loading}
                                        startIcon={<CancelIcon />}
                                    >
                                        Cancelar
                                    </GeneralButton>
                                </div>
                            </Stack>
                        )}

                        {pantallaActual === "editarCategoria" && (
                            <Stack spacing={2} sx={{ mt: 1 }}>
                                <IconFormTextField
                                    label="Nombre de la Categoría"
                                    name="nombreCategoria"
                                    control={controlCategoria}
                                    rules={{
                                        required: "El nombre de la categoría es requerido",
                                        validate: (value: string | null) => {
                                            const categoryName = value || '';
                                            if (categoriaAEditar && categoryName.toLowerCase() === categoriaAEditar.nombre.toLowerCase()) return true;
                                            if (todasCategorias.some(cat => cat.nombre.toLowerCase() === categoryName.toLowerCase())) {
                                                return "Ya existe una categoría con ese nombre";
                                            }
                                            return true;
                                        }
                                    }}
                                    errors={errorsCategoria}
                                    icon={<LabelIcon sx={{ color: theme.palette.text.secondary }} />}
                                    disabled={loading}
                                />
                                <div style={{ display: "flex", gap: "16px", justifyContent: "flex-end", marginTop: "6%" }}>
                                    <GeneralLoadingButton
                                        color="info"
                                        variant="outlined"
                                        onClick={handleSubmitCategoria(guardarEdicionCategoriaSubmit)}
                                        startIcon={<EditIcon />}
                                        loading={loading}
                                        disabled={loading}
                                        loadingPosition="start"
                                    >
                                        Guardar Cambios
                                    </GeneralLoadingButton>
                                    <GeneralButton
                                        color="secondary"
                                        variant="outlined"
                                        onClick={() => { handleSetPantallaActual("listaCategorias"); resetCategoria(); }}
                                        disabled={loading}
                                        startIcon={<CancelIcon />}
                                    >
                                        Cancelar
                                    </GeneralButton>
                                </div>
                            </Stack>
                        )}
                    </>
                )}
            </DialogContent>

            <DialogActions>
                {pantallaActual === "listaCategorias" && (
                    <GeneralButton
                        variant="outlined"
                        onClick={onClose}
                        disabled={loading || loadingInitial}
                    >
                        Cerrar
                    </GeneralButton>
                )}
            </DialogActions>

            <Dialog
                open={confirmDialog.open}
                onClose={() => setConfirmDialog({ ...confirmDialog, open: false })}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                sx={{
                    "& .MuiPaper-root": {
                        borderRadius: "16px",
                        backgroundColor: theme.palette.background.paper,
                        color: theme.palette.text.primary,
                    }
                }}
            >
                <DialogTitle id="alert-dialog-title" sx={{ textAlign: 'center', color: theme.palette.text.primary }}>Confirmar Acción</DialogTitle>
                <DialogContent>
                    <Typography id="alert-dialog-description" sx={{ color: theme.palette.text.secondary }}>
                        {confirmDialog.mensaje}
                    </Typography>
                </DialogContent>
                <DialogActions
                    sx={{
                        justifyContent: 'center',
                        p: 2,
                    }}
                >
                    <GeneralLoadingButton
                        onClick={() => { confirmDialog.onConfirm(); }}
                        startIcon={<DeleteIcon />}
                        variant="outlined"
                        color="error"
                        autoFocus
                        loading={loading}
                        disabled={loading}
                    >
                        Confirmar
                    </GeneralLoadingButton>
                    <GeneralButton
                        variant="outlined"
                        onClick={() => setConfirmDialog({ ...confirmDialog, open: false })}
                        disabled={loading}
                        startIcon={<CancelIcon />}
                    >
                        Cancelar
                    </GeneralButton>
                </DialogActions>
            </Dialog>
        </Dialog>
    );
};

export default ModalCategoriaPresentational;
