import React, { useState, useEffect } from "react";
import { useMediaQuery, useTheme } from "@mui/material";
import ChartPresentational from './ChartPresentational';
import { useGetNotaReporteQuery } from "@store/api/apiSlices";

interface DatosReporte {
    cantidad: number;
    nombre_categoria: string;
}

interface ChartContainerProps {
  open: boolean;
  handleClose: () => void;
}

const ChartContainer: React.FC<ChartContainerProps> = ({ open, handleClose }) => {
    const { data: dataReporte, isLoading } = useGetNotaReporteQuery({});
    const datos: DatosReporte[] = dataReporte?.datos ? dataReporte.datos : [];

    const [datosGrafico, setDatosGrafico] = useState<Array<any>>([]);

    const handleCloseModal = (event: any, reason: string) => {
        if (reason && reason === "backdropClick") {
            return;
        }
        handleClose();
    };

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
        <ChartPresentational
            open={open}
            handleClose={handleCloseModal}
            datosGrafico={datosGrafico}
            isSmallScreen={isSmallScreen}
            isLoading={isLoading}
        />
    );
};

export default ChartContainer;
