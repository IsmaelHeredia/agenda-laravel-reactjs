import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography, ListItem, ListItemIcon, ListItemText, Slide } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useTheme, useMediaQuery } from '@mui/material';
import InfoIcon from "@mui/icons-material/Info";
import { TransitionProps } from '@mui/material/transitions';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />
});

function About() {
  const [open, setOpen] = useState(false);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClose = (event: any, reason: string) => {
    if (reason && reason === "backdropClick") {
      return;
    }
    setOpen(false);
  };

  return (
    <div>
      <ListItem
        button
        sx={{
          backgroundColor: "inherit",
          "&:hover": { backgroundColor: theme.palette.action.hover },
        }}
        onClick={() => setOpen(true)}
      >
        <ListItemIcon sx={{ color: "text.primary" }}>
          <InfoIcon />
        </ListItemIcon>
        <ListItemText primary="About" sx={{ color: "text.primary" }} />
      </ListItem>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        TransitionComponent={Transition}
        className="center"
        disableEscapeKeyDown
        fullWidth
        fullScreen={isSmallScreen}
        maxWidth="sm"
        sx={{ "& .MuiPaper-root": { borderRadius: isSmallScreen ? "0px" : "16px" } }}
      >
        <DialogTitle>
          <Typography variant={isSmallScreen ? "h5" : "h4"} component="div">
            About
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Typography sx={{ mb: 1 }}>Nombre: <strong>Agenda Fénix</strong></Typography>
          <Typography sx={{ mb: 1 }}>Versión: <strong>1.0</strong></Typography>
          <Typography>Autor: <strong>Ismael Heredia</strong></Typography>
        </DialogContent>
        <DialogActions>
          <Button
            startIcon={<CloseIcon />}
            color="secondary"
            onClick={() => setOpen(false)} // Cierra el modal
            sx={{ px: 2, py: 1 }}
          >
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default About;