import LayoutAdmin from "@layouts/LayoutAdmin";
import React, { useState, useEffect } from "react";

import AddIcon from "@mui/icons-material/Add";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import { TextField, Button } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
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
import Chip from "@mui/material/Chip";
import Autocomplete from "@mui/material/Autocomplete";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import ButtonGroup from "@mui/material/ButtonGroup";
import CircularProgress from "@mui/material/CircularProgress";
import LoadingButton from "@mui/lab/LoadingButton";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

import { Categoria, Nota, FiltrarNota } from "@customTypes/app/notas";
import { useForm, SubmitHandler, Controller } from "react-hook-form";

import { useNavigate } from "react-router-dom";

import { useGetCategoriasQuery } from "@store/api/apiCategorias";

import { useGetNotasPaginaQuery, useDeleteNotaMutation } from "@store/api/apiNotas";

import { RootState } from "@customTypes/redux/global";
import { useSelector, useDispatch } from "react-redux";

import { changeFiltersNote } from "@store/reducers/filtersSlice";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />
});
  
const CustomPaper = (props: any) => {
    return <Paper sx={{ backgroundColor: "#282828" }} elevation={8} {...props} />;
};

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const ListarNotas = () => {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const filters: any = useSelector((state: RootState) => state.filters);

    const [pagina, setPagina] = useState(1);

    const { data: dataCategorias} = useGetCategoriasQuery({});

    const categorias: Categoria[] = dataCategorias?.categorias ? dataCategorias?.categorias : [];

    const { data: dataNotas, isLoading} = useGetNotasPaginaQuery({
        pagina: pagina,
        titulo: filters.note_name,
        categorias: filters.note_categories_id,
        favorita: filters.note_favorite
    });

    const notas: Nota[] = dataNotas?.notas ? dataNotas?.notas : [];

    const [deleteNota, { isLoading: isLoadingDelete }] = useDeleteNotaMutation();

    const [disabled, setDisabled] = useState(false);

    const [paginationData, setPaginationData] = useState({
        total: 0,
        paginas: 0,
        actual: 0,
        anterior: 0,
        siguiente: 0
    });

    useEffect(() => {
    
        if(dataNotas) {

            const total = parseInt(dataNotas.total);
            const paginas = parseInt(dataNotas.last_page);
            const actual = parseInt(dataNotas.current_page);
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
    
    }, [dataNotas]);

    const [open, setOpen] = useState(false);
        
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

    const handleCloseConfirm = (event: any, reason: string) => {
        if (reason && reason === "backdropClick") {
            return;
        }
        setOpenConfirm(false);
    };

    const handleDeleteNota = (id: number) => {
        setDisabled(false);
        let data_nota = notas.find(n => n.id === id);
        let id_nota = data_nota ? data_nota.id : 0;
        let titulo_nota = data_nota ? data_nota.titulo : "";
        setConfirmDeleteNotaId(id_nota);
        setConfirmDeleteNotaTitulo(titulo_nota);
        setOpenConfirm(true);
    };

    const [openConfirm, setOpenConfirm] = useState(false);

    const [confirmDeleteNotaId, setConfirmDeleteNotaId] = useState(0);
    const [confirmDeleteNotaTitulo, setConfirmDeleteNotaTitulo] = useState("");
  
    const handleConfirmDelete = () => {

        deleteNota(confirmDeleteNotaId)
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
        });

        setOpenConfirm(false);
    };

    const handleClickFiltrar: SubmitHandler<FiltrarNota> = (data) => {

        const categorias_id: number[] = [];

        const categorias_seleccionadas = data.buscarCategorias;

        categorias_seleccionadas.forEach(function(categoria_item) {
            categorias_id.push(categoria_item.id);
        });

        dispatch(changeFiltersNote({
            "name" : data.buscarNombre,
            "categories": data.buscarCategorias,
            "categories_id" : categorias_id,
            "favorite" : data.buscarFavorita
        }));
    };

    const handleClickBorrarFiltro = () => {

        dispatch(changeFiltersNote({
            "name" : "",
            "categories" : [],
            "categories_id": [],
            "favorite" : false
        }));

        setValueFiltro("buscarNombre", "");
        setValueFiltro("buscarCategorias", []);
        setValueFiltro("buscarFavorita", false);
    };

    const { register : registerNota, handleSubmit : handleSubmitNota, formState: { errors : errorsNota }, control : controlNota, setValue : setValueNota, clearErrors: cleanErrorsNota, getValues : getValueNota } = useForm<Nota>({
        defaultValues: { 
            titulo : "",
        }
    });

    const { register: registerFiltro , handleSubmit: handleSubmitFiltro , control : controlFiltro , setValue : setValueFiltro } = useForm<FiltrarNota>({
        defaultValues: {
            buscarNombre: filters.note_name,
            buscarCategorias: filters.note_categories,
            buscarFavorita: filters.note_favorite ? filters.note_favorite : false
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
                        onClick={() => navigate("/notas/agregar") }
                    >
                        Agregar nota
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
                        sx={{ mb: 3, mr: 1, width: "20%" }}
                    />
                    
                    <Controller
                        control={controlFiltro}
                        name="buscarCategorias"
                        render={({ field: { ref, onChange, ...field } }) => (
                            <Autocomplete
                                multiple
                                options={categorias ? categorias : []}
                                value={field.value || null}
                                defaultValue={controlFiltro._defaultValues.buscarCategorias}
                                getOptionLabel={(option) => (option?.nombre != null) ? option.nombre : ""}
                                isOptionEqualToValue={(option, value) => option?.id === value?.id}
                                onChange={(_, data) => onChange(data)}
                                sx={{ mb: 3, width: "30%" }}
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
                                        label="Categorías"
                                    />
                                )}
                            />
                        )}
                    />
                    
                    <FormControlLabel
                        control={
                        <Controller
                            name="buscarFavorita"
                            control={controlFiltro}
                            render={({ field: props }) => (
                            <Checkbox
                                {...props}
                                checked={props.value}
                                onChange={(e) => props.onChange(e.target.checked)}
                            />
                            )}
                        />
                        }
                        sx={{ ml: 1, mr: 3, mb: 3 }}
                        label="Es favorita"
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
                <Typography>Desea borrar la nota { confirmDeleteNotaTitulo } ?</Typography>
                </DialogContent>
                <DialogActions className="center-div" style={{ marginBottom: "10px" }}>
                    <LoadingButton 
                        startIcon={<DeleteIcon />}
                        color="primary"
                        variant="contained"
                        disabled={disabled}
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
                        disabled={disabled}
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
                
                {notas.length == 0 ?

                    <Typography variant="h5" className="center-div" style={{ marginTop:"30px" }}>No se encontraron notas</Typography>

                :
                
                    <>
                    <div className="datos-tabla">

                        <TableContainer style={{ maxHeight: "460px", overflowY: "auto" }} component={Paper}>
                            <Table aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Título</TableCell>
                                        <TableCell>Categorías</TableCell>
                                        <TableCell align="center">Opción</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>

                                    {notas.map((nota: Nota) => (
                                        <TableRow
                                            key={nota.id}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                <Grid container direction="row" alignItems="center">
                                                    {nota.favorita == 0 ? <StarBorderIcon /> : <StarIcon style={{ fill: "#CEA445" }} />}
                                                    <span style={{ marginTop: "5px", marginLeft: "5px" }}>{nota.titulo}</span>
                                                </Grid>
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                {nota.categorias.map((categoria: Categoria) => (
                                                    <Chip key={categoria.id} label={categoria.nombre} color="primary" sx={{ mr: 1 }} />
                                                ))}
                                            </TableCell>
                                            <TableCell align="center">

                                                <IconButton onClick={() => navigate("/notas/" + nota.id + "/editar")}>
                                                    <EditIcon />
                                                </IconButton>

                                                <IconButton onClick={() => handleDeleteNota(nota.id)}>
                                                    <DeleteIcon />
                                                </IconButton>

                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        </div>
                        <div className="paginas-notas" style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
                            <Typography className="left-notas" style={{ marginTop: "20px" }}>
                                Página {paginationData.actual} / {paginationData.paginas}
                            </Typography>
                            <div className="right-notas">
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

export default ListarNotas;