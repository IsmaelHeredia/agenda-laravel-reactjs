import LayoutAdmin from "@layouts/LayoutAdmin";
import React, { useRef, useState, useEffect } from "react";

import { TextField, Button } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Autocomplete from "@mui/material/Autocomplete";
import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import LoadingButton from "@mui/lab/LoadingButton";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SaveIcon from "@mui/icons-material/Save";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

import { Categoria, Nota } from "@customTypes/app/notas";
import { useForm, SubmitHandler, Controller } from "react-hook-form";

import { useNavigate, useParams } from "react-router-dom";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import Editor from "@editor/Editor";

import { v4 as uuidv4 } from "uuid";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

import { type RichTextEditorRef } from "mui-tiptap";

import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/es";

import { useGetCategoriasQuery } from "@store/api/apiCategorias";

import {
    useGetNotaQuery,
    useCreateNotaMutation,
    useUpdateNotaMutation,
} from "@store/api/apiNotas";

const CustomPaper = (props: any) => {
    return <Paper sx={{ backgroundColor: "#282828" }} elevation={8} {...props} />;
};

const GuardarNota = () => {

    const navigate = useNavigate();

    let { id } = useParams();

    const { data: dataCategorias} = useGetCategoriasQuery({});

    const categorias: Categoria[] = dataCategorias?.categorias ? dataCategorias?.categorias : [];

    const [es_favorita, setEsFavorita] = useState(false); 
    const [contenidoEditor, setContenidoEditor] = useState("");

    const { data: dataNota, isLoading } = useGetNotaQuery(id ? id : 0);

    const [createNota, { isLoading: isLoadingCreate } ] = useCreateNotaMutation();
    const [updateNota, { isLoading: isLoadingUpdate } ] = useUpdateNotaMutation();

    const [uuid, setUuid] = useState(uuidv4());

    const [disabled, setDisabled] = useState(false);

    useEffect(() => {
    
        if(dataNota && id != null && Number(id) > 0) {

            const nota = dataNota.nota;

            setValueNota("id", Number(id));
            setValueNota("titulo", nota.titulo);
            setValueNota("contenido", nota.contenido);

            setContenidoEditor(nota.contenido);

            setTimeout(() => {
                rteRef.current?.editor?.commands.setContent(nota.contenido);
            });

            setEsFavorita((nota.favorita == 1) ? true : false);

            setValueNota("categorias", nota.categorias);

            let defaults = {
                categorias: nota.categorias
            };

            resetNota(defaults);

            setValueNota("fecha_expiracion", (nota.fecha_expiracion != null) ? dayjs(nota.fecha_expiracion, "YYYY-MM-DD") : null);

            setUuid(nota.uuid);

        }
    
    }, [dataNota, id]);

    const handleClickGuardarNota: SubmitHandler<Nota> = (data) => {

        const categorias_id: number[] = [];

        const categorias_seleccionadas = data.categorias;

        categorias_seleccionadas.forEach(function(categoria_item) {
            categorias_id.push(categoria_item.id);
        });
    
        var contenido = rteRef.current?.editor?.getHTML();

        if(contenido == "<p></p>") {
            contenido = "<p>" + data.titulo + "</p>";
        }

        const es_favorita_bd = (es_favorita == true) ? 1 : 0;

        const fecha_expiracion = data.fecha_expiracion ? data.fecha_expiracion?.format("YYYY-MM-DD") : null;

        if(id == null || Number(id) == 0) {
        
            const datosForm = {
                "titulo" : data.titulo,
                "contenido": contenido,
                "categorias": categorias_id,
                "favorita": es_favorita_bd,
                "fecha_expiracion": fecha_expiracion,
                "uuid": uuid
            };

            createNota(datosForm)
            .unwrap()
            .then((payload: any) => {

                const estado = payload.estado;
                const mensaje = payload.mensaje;

                if (estado == 1) {
                    toast.success(mensaje, {autoClose: Number(import.meta.env.VITE_TIMEOUT_TOAST)});

                    setDisabled(true);

                    setTimeout(() => {
                        navigate("/notas");
                    }, Number(import.meta.env.VITE_TIMEOUT_REDIRECT));

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
                "id": id,
                "titulo" : data.titulo,
                "contenido": contenido,
                "categorias": categorias_id,
                "favorita": es_favorita_bd,
                "fecha_expiracion": fecha_expiracion,
                "uuid": uuid
            };

            updateNota(datosForm)
            .unwrap()
            .then((payload: any) => {

                const estado = payload.estado;
                const mensaje = payload.mensaje;

                if (estado == 1) {
                    toast.success(mensaje, {autoClose: Number(import.meta.env.VITE_TIMEOUT_TOAST)});

                    setDisabled(true);

                    setTimeout(() => {
                        navigate("/notas");
                    }, Number(import.meta.env.VITE_TIMEOUT_REDIRECT));

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

    const { register : registerNota, handleSubmit : handleSubmitNota, formState: { errors : errorsNota }, control : controlNota, setValue : setValueNota, clearErrors: cleanErrorsNota, getValues : getValueNota, reset: resetNota } = useForm<Nota>({
        defaultValues: { 
            titulo : "",
            categorias: [],
            fecha_expiracion: null as Dayjs | null
        }
    });

    const rteRef = useRef<RichTextEditorRef>(null);

    const cambiarEstadoFavorita = (event: any) => {
        setEsFavorita(event.target.checked);
    }

    return(
        <LayoutAdmin>

            <div className="contenedor">
                <Card style={{ paddingBottom: 20 }}>

                    <form onSubmit={handleSubmitNota(handleClickGuardarNota)} noValidate>
                        <CardContent>
                            <Typography gutterBottom variant="h4" component="div" align="center">
                                Gestión de nota
                            </Typography>
                            <TextField 
                                {...registerNota("titulo", { required: true })}
                                label="Título"
                                variant="outlined"
                                color="primary"
                                type="text"
                                sx={{ mt: 3, mb: 3 }}
                                fullWidth
                                InputLabelProps={{ shrink: true }}
                                error={ !!errorsNota.titulo }
                            />

                            <div>
                                <Editor
                                    ref={rteRef}
                                    content={contenidoEditor}
                                    uuid={uuid}
                                />
                            </div>

                            <Controller
                                control={controlNota}
                                name="categorias"
                                rules={{ required: "true" }}
                                render={({ field: { ref, onChange, ...field } }) => (
                                    <Autocomplete
                                        multiple
                                        options={categorias}
                                        value={field.value || null}
                                        defaultValue={controlNota._defaultValues.categorias}
                                        getOptionLabel={(option) => (option?.nombre != null) ? option.nombre : ""}
                                        isOptionEqualToValue={(option, value) => option?.id === value?.id}
                                        onChange={(_, data) => onChange(data)}
                                        sx={{ mt: 3, mb: 3 }}
                                        limitTags={2}
                                        PaperComponent={CustomPaper}
                                        renderOption={(props, option, { selected }) => {
                                            const { key, ...optionProps } = props;
                                            return (
                                              <li key={key} {...optionProps}>
                                                <Checkbox
                                                  icon={icon}
                                                  checkedIcon={checkedIcon}
                                                  style={{ marginRight: 8 }}
                                                  checked={selected}
                                                />
                                                {option?.nombre}
                                              </li>
                                            );
                                        }}
                                        renderTags={(value, getTagProps) => {
                                            const numTags = value.length;
                                            const limitTags = 2;
                                    
                                            return (
                                              <>
                                                {value.slice(0, limitTags).map((option, index) => (
                                                  <Chip
                                                    {...getTagProps({ index })}
                                                    key={index}
                                                    label={option?.nombre}
                                                  />
                                                ))}
                                    
                                                {numTags > limitTags && ` +${numTags - limitTags}`}
                                              </>
                                            );
                                        }}
                                        renderInput={(params) => (
                                            <TextField
                                                {...field}
                                                {...params}
                                                fullWidth
                                                inputRef={ref}
                                                variant="outlined"
                                                error={!!errorsNota?.categorias}
                                                label="Categorías"
                                            />
                                        )}
                                    />
                                )}
                            />

                            <div style={{ marginBottom: "20px" }}>
                                <FormControlLabel control={<Checkbox checked={es_favorita} onChange={cambiarEstadoFavorita}  />} label="Es favorita" />
                            </div>

                            <Controller
                                control={controlNota}
                                name="fecha_expiracion"
                                rules={{ required: false }}
                                render={({ field }) => {
                                    return (
                                        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
                                        <DatePicker
                                            {...field}
                                            format="DD/MM/YYYY"
                                            label="Fecha de expiración"
                                            value={ field.value ? field.value : null}
                                            inputRef={field.ref}
                                            onChange={(date) => {
                                                field.onChange(date);
                                            }}
                                            slotProps={{
                                                textField: {
                                                    error: !!errorsNota.fecha_expiracion,
                                                },
                                            }}
                                        />
                                        </LocalizationProvider>
                                    );
                                }}
                            />
                                    
                        </CardContent>
                        <CardActions sx={{ mt: 3 }} className="center-div">
                            <LoadingButton 
                                startIcon={<SaveIcon />}
                                loading={isLoadingCreate || isLoadingUpdate}
                                loadingPosition="start"
                                variant="contained"
                                disabled={disabled}
                                color="primary"
                                type="submit"
                            >
                                Guardar
                            </LoadingButton>
                            <Button 
                                variant="contained"
                                color="primary"
                                startIcon={<ArrowBackIcon />}
                                disabled={disabled}
                                onClick={() => navigate("/notas") }
                            >
                                Volver
                            </Button>
                        </CardActions>
                    </form>

                </Card>
            </div>

        </LayoutAdmin>
    );

};

export default GuardarNota;