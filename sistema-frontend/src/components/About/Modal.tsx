import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Typography,
    IconButton,
    Slide,
    Button,
    useTheme
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { TransitionProps } from '@mui/material/transitions';

interface AboutModalProps {
    open: boolean;
    handleClose: () => void;
}

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const AboutModal: React.FC<AboutModalProps> = ({ open, handleClose }) => {
    const theme = useTheme();

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="about-modal-title"
            aria-describedby="about-modal-description"
            fullWidth
            maxWidth="sm"
            TransitionComponent={Transition}
        >
            <DialogTitle sx={{ textAlign: 'center' }}>
                <Typography
                    variant="h4"
                    component="div"
                    sx={{
                        fontWeight: 'bold',
                    }}
                >
                    Acerca del Programa
                </Typography>
            </DialogTitle>

            <DialogContent sx={{ textAlign: 'center' }}>
                <Typography
                    id="about-modal-description"
                    variant="body1"
                    sx={{ mt:1, mb: 1 }}
                >
                    Nombre del Programa: Agenda Fénix
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                    Versión: 1.0
                </Typography>
                <Typography variant="body1">
                    Autor: Ismael Heredia
                </Typography>
            </DialogContent>

            <DialogActions sx={{ justifyContent: 'flex-end' }}>
                <Button onClick={handleClose} color="secondary">
                    Cerrar
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AboutModal;