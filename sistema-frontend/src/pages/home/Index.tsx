import LayoutAdmin from "@layouts/LayoutAdmin";

import { useState, useEffect } from "react";
import * as React from "react";

import "react-toastify/dist/ReactToastify.css";

import CircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import ButtonGroup from "@mui/material/ButtonGroup";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";

import NotaFija from "@components/NotaFija";

import { useGetNotasPaginaQuery } from "@store/api/apiNotas";

import { Nota } from "@customTypes/app/notas";

const Home = () => {

    const [pagina, setPagina] = useState(1);

    const { data: dataNotas, isLoading} = useGetNotasPaginaQuery({
        pagina: pagina,
        titulo: "",
        categorias: [],
        favorita: true,
        cantidad: 10
    });

    const notas: Nota[] = dataNotas?.notas ? dataNotas?.notas : [];

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

    return(
        <LayoutAdmin>

            {isLoading ?
                <div className="center-div" style={{ marginTop:"70px" }}>
                    <CircularProgress color="secondary" size="5rem" className="center-div" style={{ marginTop:"100px" }} />
                </div>
            :
                <>
                    <div style={{ marginTop:"150px" }}></div>
                    {notas?.length == 0 ?
                        <Typography variant="h5" className="center-div" style={{ marginTop: "20px" }}>
                            No se encontraron notas fijadas
                        </Typography>
                    :
                        <>
                        <div className="container">
                            {notas.map((nota: Nota) => (
                                <div key={nota.id} className="item">
                                    <NotaFija idNota={nota.id} />
                                </div>
                            ))}
                        </div>
                        <div className="paginas-home" style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
                            <Typography className="left-home" style={{ marginTop: "20px" }}>
                                Página {paginationData.actual} / {paginationData.paginas}
                            </Typography>
                            <div className="right-home">
                                <ButtonGroup variant="contained" aria-label="Basic button group">
                                    <IconButton disabled={ paginationData.actual == 1 } onClick={handleClickAtrasTodo}>
                                        <KeyboardDoubleArrowLeftIcon sx={{ fontSize: 50 }} />
                                    </IconButton>
                                    <IconButton disabled={ paginationData.actual == 1 } onClick={handleClickAtras}>
                                        <KeyboardArrowLeftIcon sx={{ fontSize: 50 }} />
                                    </IconButton>
                                    <IconButton disabled={ paginationData.actual == paginationData.paginas } onClick={handleClickSiguiente}>
                                        <KeyboardArrowRightIcon sx={{ fontSize: 50 }} />
                                    </IconButton>
                                    <IconButton disabled={ paginationData.actual == paginationData.paginas } onClick={handleClickSiguienteTodo}>
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
  
export default Home;