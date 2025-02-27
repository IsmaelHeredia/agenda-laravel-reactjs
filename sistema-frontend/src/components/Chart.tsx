import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import TooltipB from "@mui/material/Tooltip";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import BarChartIcon from "@mui/icons-material/BarChart";
import { ListItem, ListItemIcon, ListItemText, Tooltip } from "@mui/material";
import { PieChart, Pie, Tooltip as RechartsTooltip, Legend } from "recharts";

import {
  useGetNotaReporteQuery,
} from "@store/api/apiNotas";
import { useMediaQuery, useTheme } from "@mui/material";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />
});

interface DatosReporte {
  cantidad: number;
  nombre_categoria: string;
}

const Chart = () => {

  const { data: dataReporte, isLoading } = useGetNotaReporteQuery({});

  const datos: DatosReporte[] = dataReporte?.datos ? dataReporte.datos : [];

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

  const [datosGrafico, setDatosGrafico] = useState<Array<any>>([]);

  const colores = ["#0088FE", "#00C49F", "#FFBB28"];

  useEffect(() => {
    if (!datos || datos.length === 0) return;

    const registros = datos.map((categoria, index) => ({
      name: categoria.nombre_categoria,
      value: categoria.cantidad,
      fill: colores[index % colores.length],
    }));

    setDatosGrafico(registros);
  }, [datos]);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

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
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary="Estadísticas" sx={{ color: "text.primary" }} />
      </ListItem>

      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        fullScreen={isSmallScreen}
        maxWidth="sm"
        TransitionComponent={Transition}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className="center"
        disableEscapeKeyDown
        sx={{ "& .MuiPaper-root": { borderRadius: isSmallScreen ? "0px" : "16px" } }}
      >
        <DialogTitle>
          <Typography variant={isSmallScreen ? "h5" : "h4"} component="div">
            Estadísticas
          </Typography>
        </DialogTitle>
        <DialogContent>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: isSmallScreen ? 250 : 400 }}>
            <PieChart width={isSmallScreen ? 250 : 400} height={isSmallScreen ? 250 : 400}>
              <Pie
                dataKey="value"
                data={datosGrafico}
                cx="50%"
                cy="50%"
                innerRadius={isSmallScreen ? 50 : 100}
                outerRadius={isSmallScreen ? 100 : 150}
                fill="#8884d8"
              />
              <RechartsTooltip />
              <Legend />
            </PieChart>
          </div>
        </DialogContent>
        <DialogActions>
          <Button startIcon={<CloseIcon />} color="secondary" onClick={() => setOpen(false)}>Cerrar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );

};

export default Chart;