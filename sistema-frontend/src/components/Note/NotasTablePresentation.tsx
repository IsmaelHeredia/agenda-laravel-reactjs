import React from "react";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CircularProgress from "@mui/material/CircularProgress";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { useTheme } from "@mui/material/styles";

import { GeneralIconButton, GeneralChip } from '@/components/CustomTextFields/CustomTextFields';

import { Nota } from "@/types/app/notas";

interface NotasTablePresentationProps {
    notas: Nota[];
    isMobile: boolean;
    isFullLoading: boolean;
    anyActionIsLoading: boolean;
    isFavoritingId: number | null;
    handleCreateNota: () => void;
    handleEditNota: (id: number) => void;
    handleDeleteNota: (id: number) => void;
    handleFavoriteNote: (id: number) => void;
    handleOpenCategoryModal: () => void;
    tablaNotasRef: React.RefObject<HTMLDivElement>;
}

const NotasTablePresentation: React.FC<NotasTablePresentationProps> = ({
    notas,
    isFullLoading,
    anyActionIsLoading,
    isFavoritingId,
    handleEditNota,
    handleDeleteNota,
    handleFavoriteNote,
    tablaNotasRef
}) => {
    const theme = useTheme();

    const emptyRows = 5 - notas.length;

    return (
        <div>
            {isFullLoading ? (
                <Grid container justifyContent="center" sx={{ mt: 5 }}>
                    <CircularProgress color="secondary" size="5rem" />
                </Grid>
            ) : notas.length === 0 ? (
                <Typography variant="h6" align="center" sx={{ mt: 3, color: theme.palette.text.secondary }}>
                    No se encontraron notas
                </Typography>
            ) : (
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    flexGrow: 1,
                    width: '100%',
                    paddingLeft: "10%",
                    paddingRight: "10%",
                }}>
                    <TableContainer className="listado-notas" component={Paper} ref={tablaNotasRef} sx={{ width: "100%" }}>
                        <Table aria-label="simple table" sx={{ minWidth: 650 }}>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Título</TableCell>
                                    <TableCell>Categorías</TableCell>
                                    <TableCell align="center">Opción</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {notas.map((nota) => (
                                    <TableRow
                                        key={nota.id}
                                    >
                                        <TableCell component="th" scope="row" sx={{ py: 2 }}>
                                            <Grid container direction="row" alignItems="center" spacing={1}>
                                                <Grid item>
                                                    <IconButton
                                                        onClick={() => handleFavoriteNote(nota.id)}
                                                        disabled={anyActionIsLoading}
                                                        sx={{ color: theme.palette.warning.main }}
                                                    >
                                                        {isFavoritingId === nota.id ? (
                                                            <CircularProgress size={24} sx={{ color: theme.palette.warning.main }} />
                                                        ) : (
                                                            nota.favorita === 0 ? <StarBorderIcon /> : <StarIcon />
                                                        )}
                                                    </IconButton>
                                                </Grid>
                                                <Grid item>
                                                    <Typography
                                                        onClick={() => handleEditNota(nota.id)}
                                                        sx={{
                                                            cursor: 'pointer',
                                                            color: theme.palette.text.primary
                                                        }}
                                                    >
                                                        {nota.titulo}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </TableCell>
                                        <TableCell sx={{ py: 2 }}>
                                            <Grid container spacing={1}>
                                                {nota.categorias.map((categoria) => (
                                                    <Grid item key={categoria.id}>
                                                        <GeneralChip label={categoria.nombre} />
                                                    </Grid>
                                                ))}
                                            </Grid>
                                        </TableCell>
                                        <TableCell align="center" sx={{ py: 2 }}>
                                            <GeneralIconButton onClick={() => handleEditNota(nota.id)} disabled={anyActionIsLoading}>
                                                <EditIcon />
                                            </GeneralIconButton>
                                            <GeneralIconButton onClick={() => handleDeleteNota(nota.id)} disabled={anyActionIsLoading}>
                                                <DeleteIcon />
                                            </GeneralIconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {emptyRows > 0 && [...Array(emptyRows)].map((_, index) => (
                                    <TableRow
                                        key={`empty-${index}`}
                                        sx={{
                                            height: 56,
                                            backgroundColor: theme.palette.background.default,
                                        }}
                                    >
                                        <TableCell colSpan={3} sx={{ borderBottom: 'none' }} />
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            )}
        </div>
    );
};

export default NotasTablePresentation;
