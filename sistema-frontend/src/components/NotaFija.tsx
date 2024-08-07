import * as React from "react";
import { useState } from "react";
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
import { useNavigate } from "react-router-dom";
import DOMPurify from "dompurify";

import {
    useGetNotaQuery,
} from "@store/api/apiNotas";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface Props {
    idNota: number
}

const NotaFija = (props: Props) => {

    const { idNota } = props;

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = (event: any, reason: string) => {
        if (reason && reason === "backdropClick") {
            return;
        }
        setOpen(false);
    };

    const navigate = useNavigate();

    const { data: dataNota, isLoading } = useGetNotaQuery(idNota);

    const nota = dataNota?.nota;

    const id = nota?.id;
    const titulo = nota?.titulo;
    const contenido = nota?.contenido;
    const fecha_expiracion = nota?.fecha_expiracion;
    const fecha_expiracion_format = fecha_expiracion?.split("-").reverse().join("/");

    return(
        <>

            <Tooltip title={ fecha_expiracion ? "Vence el " + fecha_expiracion_format : "" }>
                <Card sx={{ border: (fecha_expiracion != null) ? "2px solid #ffb4a9" : "none" }} className="card-nota-fija" onClick={handleClickOpen}>
                    <CardContent>
                        <Typography gutterBottom variant="h4" component="div" align="center" style={{ fontSize: "25px", marginTop: "15px" }}>
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
            >
                <DialogTitle>
                    <Typography variant="h4" component="div" className="center">{titulo}</Typography>
                </DialogTitle>
                <DialogContent style={{ paddingTop: 10 }}>
                    <div className="content" dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(contenido)}}></div>
                </DialogContent>
                <DialogActions>
                    <Button
                        startIcon={<EditIcon />}
                        color="secondary"
                        onClick={() => navigate("/notas/" + id + "/editar") }
                    >
                    Editar
                    </Button>
                    <Button
                        startIcon={<CloseIcon />}
                        color="secondary"
                        onClick={() => setOpen(false) }
                    >
                    Cerrar
                  </Button>
                </DialogActions>
            </Dialog>
        </>
    );

};

export default NotaFija;