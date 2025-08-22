import * as React from "react";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import DOMPurify from "dompurify";
import { Dayjs } from "dayjs";
import { useTheme } from "@mui/material/styles";

interface Nota {
    id: number;
    titulo: string;
    contenido: string;
    fecha_expiracion?: Dayjs | null;
}

interface NotaFijaPresentationalProps {
    nota: Nota;
    open: boolean;
    handleClickOpen: () => void;
    handleClose: (event: any, reason: string) => void;
    handleEditClick: (id: number) => void;
}

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const NotaFijaPresentational: React.FC<NotaFijaPresentationalProps> = ({
    nota,
    open,
    handleClickOpen,
    handleClose,
    handleEditClick,
}) => {
    const theme = useTheme();

    const { id, titulo, contenido, fecha_expiracion } = nota;

    const fecha_expiracion_format = fecha_expiracion?.format("DD/MM/YYYY");

    return (
        <>
            <Tooltip title={fecha_expiracion ? "Vence el " + fecha_expiracion_format : ""}>
                <Card
                    sx={{
                        border: (fecha_expiracion !== null) ? "2px solid" : "none",
                        borderColor: (fecha_expiracion !== null) ? "error.main" : "none",
                        borderRadius: 8,
                        p: 2,
                        pb: 2,
                        boxShadow: 3,
                        cursor: "pointer",
                        backgroundColor: theme.palette.background.paper,
                        color: theme.palette.text.primary,
                        height: '180px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                    onClick={handleClickOpen}
                >
                    <CardContent sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100%',
                        width: '100%',
                        p: 0,
                        '&:last-child': { pb: 0 }
                    }}>
                        <Typography
                            gutterBottom
                            variant="h4"
                            component="div"
                            align="center"
                            sx={{
                                fontSize: "25px",
                                mt: "15px",
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                display: '-webkit-box',
                                WebkitLineClamp: 3,
                                WebkitBoxOrient: 'vertical',
                                lineHeight: 1.2,
                                maxHeight: 'calc(25px * 1.2 * 3)',
                            }}
                        >
                            {titulo}
                        </Typography>
                    </CardContent>
                </Card>
            </Tooltip>

            <Dialog
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                disableEscapeKeyDown
                fullWidth
                maxWidth="sm"
                sx={{
                    "& .MuiPaper-root": {
                        borderRadius: "16px",
                        backgroundColor: theme.palette.background.paper,
                        color: theme.palette.text.primary,
                    }
                }}
            >
                <DialogTitle>
                    <Typography variant="h4" component="div" sx={{ textAlign: "center", color: theme.palette.text.primary }}>{titulo}</Typography>
                </DialogTitle>
                <DialogContent sx={{ paddingTop: "10px", color: theme.palette.text.secondary }}>
                    <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(contenido) }}></div>
                </DialogContent>
                <DialogActions>
                    <Button
                        startIcon={<EditIcon />}
                        color="secondary"
                        onClick={() => handleEditClick(id)}
                    >
                        Editar
                    </Button>
                    <Button
                        startIcon={<CloseIcon />}
                        color="secondary"
                        onClick={() => handleClose({}, "custom")}
                    >
                        Cerrar
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default NotaFijaPresentational;
