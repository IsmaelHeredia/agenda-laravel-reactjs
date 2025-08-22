import React, { useState, forwardRef, ForwardedRef, ReactElement, useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Typography,
    Grid,
    FormControlLabel,
    Checkbox,
    useMediaQuery,
    Paper,
    Slide,
    InputAdornment,
    useTheme,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import CloseIcon from '@mui/icons-material/Close';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CategoryIcon from '@mui/icons-material/Category';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { TransitionProps } from '@mui/material/transitions';
import { AutocompleteRenderOptionState } from '@mui/material/Autocomplete';

import {
    FormTextField,
    SearchCategoryAutocomplete,
    GeneralButton,
    GeneralIconButton,
    GeneralCheckbox,
} from '@/components/CustomTextFields/CustomTextFields';

import { useGetCategoriasQuery } from '@store/api/apiSlices';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { changeNotePage } from '@/store/reducers/paginationSlice';
import { changeFiltersNote } from '@/store/reducers/filtersSlice';

interface Categoria {
    id: number;
    nombre: string;
}

interface FiltrarNota {
    buscarNombre: string;
    buscarCategorias: Categoria[];
    buscarFavorita: boolean | null;
}

interface SearchModalProps {
    open: boolean;
    onClose: () => void;
}

const Transition = forwardRef(function Transition(
    props: TransitionProps & {
        children: ReactElement<any, any>;
    },
    ref: ForwardedRef<unknown>,
) {
    return <Slide direction="down" ref={ref} {...props} />;
});

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const SearchModal: React.FC<SearchModalProps> = ({ open, onClose }) => {

    const modalKey = open ? 'open-modal' : 'closed-modal';

    const isMobile = useMediaQuery('(max-width:600px)');
    const theme = useTheme();
    const dispatch = useDispatch<AppDispatch>();

    const filters = useSelector((state: RootState) => state.filters);

    const { data: dataCategorias } = useGetCategoriasQuery({});

    const {
        register: registerFiltro,
        handleSubmit: handleSubmitFiltro,
        control: controlFiltro,
        reset: resetFiltro,
        setValue: setValueFiltro,
    } = useForm<FiltrarNota>({
        defaultValues: {
            buscarNombre: '',
            buscarCategorias: [],
            buscarFavorita: null,
        },
    });

    useEffect(() => {
        if (open) {
            const categoriasSeleccionadas = dataCategorias?.categorias
                ? (filters.note_categories as Categoria[])
                    .map((filtroCat) =>
                        (dataCategorias?.categorias as Categoria[]).find((apiCat) => apiCat.id === filtroCat.id)
                    )
                    .filter(Boolean) as Categoria[]
                : [];

            resetFiltro({
                buscarNombre: filters.note_name,
                buscarCategorias: categoriasSeleccionadas,
                buscarFavorita: filters.note_favorite,
            });
        }
    }, [open, filters, resetFiltro, dataCategorias]);

    const handleClickFiltrar: SubmitHandler<FiltrarNota> = (data) => {
        dispatch(
            changeFiltersNote({
                name: data.buscarNombre,
                categories: data.buscarCategorias,
                favorite: data.buscarFavorita,
            })
        );
        dispatch(changeNotePage({ page: 1 }));
        onClose();
    };

    const handleClickBorrarFiltro = () => {
        dispatch(
            changeFiltersNote({
                name: '',
                categories: [],
                favorite: null,
            })
        );
        dispatch(changeNotePage({ page: 1 }));
        onClose();
    };

    return (
        <Dialog
            key={modalKey}
            open={open}
            onClose={onClose}
            TransitionComponent={Transition as React.JSXElementConstructor<TransitionProps & { children: ReactElement<any, any>; }>}
            maxWidth="md"
            fullWidth
            sx={{
                '& .MuiPaper-root': {
                    borderRadius: '24px',
                    background: theme.palette.background.paper,
                    color: theme.palette.text.primary,
                    padding: '20px',
                    boxShadow: '0px 0px 20px rgba(0,0,0,0.5)',
                },
            }}
        >
            <DialogTitle sx={{ textAlign: 'center', pb: 0 }}>
                <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
                    Búsqueda Avanzada
                </Typography>
                <GeneralIconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 16,
                        top: 16,
                    }}
                >
                    <CloseIcon />
                </GeneralIconButton>
            </DialogTitle>
            <DialogContent dividers sx={{ border: 'none' }}>
                <form onSubmit={handleSubmitFiltro(handleClickFiltrar)}>
                    <Grid container direction="column" spacing={2} sx={{ mt: 1 }}>
                        <Grid item xs={12}>
                            <FormTextField
                                {...registerFiltro('buscarNombre', { required: false })}
                                label="Ingrese nombre de la nota"
                                type="text"
                                fullWidth
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchIcon />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Controller
                                control={controlFiltro}
                                name="buscarCategorias"
                                render={({ field: { ref, onChange, ...field } }) => (
                                    <SearchCategoryAutocomplete
                                        multiple
                                        options={dataCategorias?.categorias || []}
                                        value={field.value || []}
                                        getOptionLabel={(option: Categoria) => (option?.nombre !== null) ? option.nombre : ''}
                                        isOptionEqualToValue={(option: Categoria, value: Categoria) => option.id === value.id}
                                        onChange={(_, data: Categoria[]) => onChange(data)}
                                        renderOption={(props, option: Categoria, { selected }: AutocompleteRenderOptionState) => {
                                            const { key, ...rest } = props;
                                            return (
                                                <li key={key} {...rest}>
                                                    <GeneralCheckbox
                                                        icon={icon}
                                                        checkedIcon={checkedIcon}
                                                        checked={selected}
                                                    />
                                                    {option?.nombre}
                                                </li>
                                            );
                                        }}
                                        renderInput={(params) => (
                                            <FormTextField
                                                {...field}
                                                {...params}
                                                fullWidth
                                                inputRef={ref}
                                                label="Categorías"
                                                InputProps={{
                                                    ...params.InputProps,
                                                    startAdornment: (
                                                        <>
                                                            <InputAdornment position="start">
                                                                <CategoryIcon />
                                                            </InputAdornment>
                                                            {params.InputProps.startAdornment}
                                                        </>
                                                    ),
                                                }}
                                            />
                                        )}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={
                                    <Controller
                                        name="buscarFavorita"
                                        control={controlFiltro}
                                        render={({ field: props }) => (
                                            <GeneralCheckbox
                                                {...props}
                                                checked={props.value === true}
                                                onChange={() => {
                                                    if (props.value === null) {
                                                        props.onChange(true);
                                                    } else if (props.value === true) {
                                                        props.onChange(false);
                                                    } else {
                                                        props.onChange(null);
                                                    }
                                                }}
                                                icon={<FavoriteBorderIcon />}
                                                checkedIcon={<FavoriteIcon />}
                                                indeterminateIcon={<FavoriteBorderIcon />}
                                                indeterminate={props.value === null}
                                            />
                                        )}
                                    />
                                }
                                label="Es favorita"
                                sx={{ color: theme.palette.text.secondary }}
                            />
                        </Grid>
                    </Grid>
                </form>
            </DialogContent>
            <DialogActions sx={{ justifyContent: 'center', p: 3, pt: 0 }}>
                <GeneralButton
                    onClick={handleSubmitFiltro(handleClickFiltrar)}
                    variant="outlined"
                    startIcon={<SearchIcon />}
                    size="large"
                    sx={{ width: isMobile ? '100%' : 'auto', mx: 1 }}
                >
                    Filtrar
                </GeneralButton>
                <GeneralButton
                    variant="outlined"
                    color="error"
                    startIcon={<ClearIcon />}
                    size="large"
                    onClick={handleClickBorrarFiltro}
                    sx={{ width: isMobile ? '100%' : 'auto', mx: 1 }}
                >
                    Borrar
                </GeneralButton>
            </DialogActions>
        </Dialog>
    );
};

export default SearchModal;