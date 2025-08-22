import {
    GeneralButton,
    GeneralCheckbox,
    GeneralLoadingButton,
    FormDatePicker,
    FormTextField,
    SearchCategoryAutocomplete,
} from "@/components/CustomTextFields/CustomTextFields";
import React from "react";
import {
    useMediaQuery,
    Paper,
    FormControlLabel,
    Card,
    CardContent,
    CardActions,
    Typography,
    InputAdornment,
    AutocompleteRenderOptionState,
    Box,
    CircularProgress
} from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SaveIcon from "@mui/icons-material/Save";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { Controller, UseFormHandleSubmit, UseFormRegister, FieldErrors, Control } from "react-hook-form";
import Editor from "@editor/Editor";
import { type RichTextEditorRef } from "mui-tiptap";
import { Dayjs } from "dayjs";
import { Categoria, Nota } from "@/types/app/notas";

import TitleIcon from "@mui/icons-material/Title";
import CategoryIcon from "@mui/icons-material/Category";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

interface GuardarNotaPresentationProps {
    isMobile: boolean;
    categorias: Categoria[];
    es_favorita: boolean;
    contenidoEditor: string;
    disabled: boolean;
    isLoading: boolean;
    isLoadingSave: boolean;
    isPending: boolean;
    rteRef: React.RefObject<RichTextEditorRef>;
    handleSubmit: UseFormHandleSubmit<Nota>;
    handleClickGuardarNota: (data: Nota) => void;
    handleClickReturn: () => void;
    cambiarEstadoFavorita: (event: React.ChangeEvent<HTMLInputElement>) => void;
    formControl: {
        register: UseFormRegister<Nota>;
        errors: FieldErrors<Nota>;
        control: Control<Nota>;
    };
    uuid: string;
}

const GuardarNotaPresentation: React.FC<GuardarNotaPresentationProps> = ({
    isMobile,
    categorias,
    es_favorita,
    contenidoEditor,
    disabled,
    isLoading,
    isLoadingSave,
    isPending,
    rteRef,
    handleSubmit,
    handleClickGuardarNota,
    handleClickReturn,
    cambiarEstadoFavorita,
    formControl,
    uuid
}) => {
    const { register, errors, control } = formControl;

    return (
        <div className="contenedor-nota">
            {isLoading && !isPending ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                    <CircularProgress />
                </Box>
            ) : (
                <Box sx={{ opacity: isPending ? 0.6 : 1, transition: "opacity 0.3s ease-in-out" }}>
                    <Card sx={{ borderRadius: 8, boxShadow: 3 }} className="card-nota">
                        <form onSubmit={handleSubmit(handleClickGuardarNota)} noValidate>
                            <CardContent>
                                <Typography gutterBottom variant={isMobile ? "h5" : "h4"} component="div" align="center" sx={{ fontWeight: 'bold' }}>
                                    Gestión de nota
                                </Typography>
                                <FormTextField
                                    {...register("titulo", { required: "El título es obligatorio" })}
                                    label="Título"
                                    type="text"
                                    sx={{ mt: 2, mb: 2 }}
                                    fullWidth
                                    InputLabelProps={{ shrink: true }}
                                    error={!!errors.titulo}
                                    helperText={errors.titulo?.message}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <TitleIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                <div style={{ borderRadius: "12px", overflow: "hidden" }}>
                                    <Editor
                                        ref={rteRef}
                                        content={contenidoEditor}
                                        uuid={uuid}
                                        className="editor"
                                        style={{ border: "1px solid #ccc", borderRadius: "12px", padding: "10px", minHeight: "150px", outline: "none" }}
                                    />
                                </div>
                                <Controller
                                    control={control}
                                    name="categorias"
                                    render={({ field: { ref, onChange, ...field } }) => (
                                        <SearchCategoryAutocomplete
                                            sx={{ pt: 3, pb: 1 }}
                                            multiple
                                            options={categorias}
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
                                <div style={{ marginBottom: "20px" }}>
                                    <FormControlLabel
                                        control={
                                            <GeneralCheckbox
                                                checked={es_favorita}
                                                onChange={cambiarEstadoFavorita}
                                                icon={<FavoriteBorderIcon />}
                                                checkedIcon={<FavoriteIcon color="primary" />}
                                            />
                                        }
                                        label="Es favorita"
                                    />
                                </div>
                                <Controller
                                    control={control}
                                    name="fecha_expiracion"
                                    rules={{ required: false }}
                                    render={({ field, fieldState }) => (
                                        <FormDatePicker
                                            {...field}
                                            format="DD/MM/YYYY"
                                            label="Fecha de expiración"
                                            value={field.value ? field.value : null}
                                            onChange={(date) => field.onChange(date)}
                                            slotProps={{
                                                textField: {
                                                    error: !!fieldState.error,
                                                    helperText: fieldState.error?.message,
                                                },
                                            }}
                                        />
                                    )}
                                />
                            </CardContent>
                            <CardActions sx={{ flexDirection: isMobile ? "column" : "row", gap: isMobile ? 2 : 1, justifyContent: "center", mt: "6%" }}>
                                <GeneralLoadingButton
                                    startIcon={<SaveIcon />}
                                    loading={isLoadingSave}
                                    loadingPosition="start"
                                    color="info"
                                    variant="outlined"
                                    disabled={disabled}
                                    type="submit"
                                    sx={{ width: isMobile ? "100%" : 200 }}
                                >
                                    Guardar
                                </GeneralLoadingButton>
                                <GeneralButton
                                    color="secondary"
                                    variant="outlined"
                                    startIcon={<ArrowBackIcon />}
                                    disabled={disabled}
                                    sx={{ width: isMobile ? "100%" : 200 }}
                                    onClick={() => handleClickReturn()}
                                >
                                    Volver
                                </GeneralButton>
                            </CardActions>
                        </form>
                    </Card>
                </Box>
            )}
        </div>
    );
};

export default GuardarNotaPresentation;
