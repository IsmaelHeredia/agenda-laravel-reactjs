import React, { useState, useTransition } from "react";
import "react-toastify/dist/ReactToastify.css";

import { useTheme } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ButtonGroup from "@mui/material/ButtonGroup";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";

import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";

import LayoutAdmin from "@layouts/LayoutAdmin";
import NotaFijaContainer from "@/components/Note/NotaFijaContainer";
import { Nota } from "@/types/app/notas";

import { useGetNotasPaginaQuery } from "@store/api/apiSlices";

const Home = () => {
  const theme = useTheme();
  const [pagina, setPagina] = useState(1);

  const [isPending, startTransition] = useTransition();

  const { data: dataNotas, isLoading, isError } = useGetNotasPaginaQuery({
    pagina,
    titulo: "",
    categorias: [],
    favorita: true,
    cantidad: 8,
  });

  const notas = dataNotas?.notas || [];
  const totalPaginas = dataNotas?.last_page ? parseInt(dataNotas.last_page) : 0;
  const paginaActual = dataNotas?.current_page ? parseInt(dataNotas.current_page) : 1;
  const paginaAnterior = Math.max(1, paginaActual - 1);
  const paginaSiguiente = Math.min(totalPaginas, paginaActual + 1);

  const handlePaginaChange = (newPagina: number) => {
    if (newPagina !== pagina) {
      startTransition(() => {
        setPagina(newPagina);
      });
    }
  };

  if (isLoading && !isPending) {
    return (
      <LayoutAdmin>
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <CircularProgress color="secondary" size={50} />
        </Box>
      </LayoutAdmin>
    );
  }

  if (isError) {
    return (
      <LayoutAdmin>
        <Container
          maxWidth="lg"
          sx={{
            mt: 4,
            mb: 4,
            minHeight: "calc(100vh - 64px - 40px - 60px)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h5" color="error" sx={{ textAlign: "center" }}>
            Ha ocurrido un error al cargar las notas.
          </Typography>
        </Container>
      </LayoutAdmin>
    );
  }

  return (
    <LayoutAdmin>
      <Container
        maxWidth="lg"
        sx={{
          mt: 4,
          mb: 4,
          minHeight: "calc(100vh - 64px - 40px - 60px)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          opacity: isPending ? 0.6 : 1,
          transition: "opacity 0.3s ease-in-out",
        }}
      >
        {notas.length === 0 ? (
          <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Typography variant="h5" sx={{ mt: 2, textAlign: "center" }}>
              No se encontraron notas fijadas.
            </Typography>
          </Box>
        ) : (
          <>
            <Typography
              variant="h4"
              component="h2"
              sx={{
                fontWeight: "bold",
                mb: 4,
                textAlign: "center",
              }}
            >
              Notas Fijadas
            </Typography>
            <Grid container spacing={3} sx={{ flexGrow: 1 }}>
              {notas.map((nota: Nota) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={nota.id}>
                  <NotaFijaContainer nota={nota} />
                </Grid>
              ))}
            </Grid>
          </>
        )}

        {totalPaginas > 1 && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mt: 4,
              flexDirection: { xs: "column", sm: "row" },
              gap: 2,
              width: "100%",
            }}
          >
            <Typography sx={{ mt: { xs: 2, sm: 0 } }}>
              Página {paginaActual} / {totalPaginas}
            </Typography>
            <ButtonGroup
              variant="contained"
              sx={{
                backgroundColor: "background.paper",
                boxShadow: "none",
                border: `1px solid`,
                borderColor: "divider",
              }}
            >
              <IconButton
                disabled={paginaActual === 1 || isPending}
                onClick={() => handlePaginaChange(1)}
                sx={{
                  color: "text.primary",
                  borderRadius: 0,
                  "&:hover": {
                    backgroundColor: "background.default",
                    color: "text.primary",
                  },
                  "&:not(:last-of-type)": {
                    borderRight: "1px solid",
                    borderRightColor: "divider",
                  },
                }}
              >
                <KeyboardDoubleArrowLeftIcon fontSize="large" />
              </IconButton>
              <IconButton
                disabled={paginaActual === 1 || isPending}
                onClick={() => handlePaginaChange(paginaAnterior)}
                sx={{
                  color: "text.primary",
                  borderRadius: 0,
                  "&:hover": {
                    backgroundColor: "background.default",
                    color: "text.primary",
                  },
                  "&:not(:last-of-type)": {
                    borderRight: "1px solid",
                    borderRightColor: "divider",
                  },
                }}
              >
                <KeyboardArrowLeftIcon fontSize="large" />
              </IconButton>
              <IconButton
                disabled={paginaActual === totalPaginas || isPending}
                onClick={() => handlePaginaChange(paginaSiguiente)}
                sx={{
                  color: "text.primary",
                  borderRadius: 0,
                  "&:hover": {
                    backgroundColor: "background.default",
                    color: "text.primary",
                  },
                  "&:not(:last-of-type)": {
                    borderRight: "1px solid",
                    borderRightColor: "divider",
                  },
                }}
              >
                <KeyboardArrowRightIcon fontSize="large" />
              </IconButton>
              <IconButton
                disabled={paginaActual === totalPaginas || isPending}
                onClick={() => handlePaginaChange(totalPaginas)}
                sx={{
                  color: "text.primary",
                  borderRadius: 0,
                  "&:hover": {
                    backgroundColor: "background.default",
                    color: "text.primary",
                  },
                }}
              >
                <KeyboardDoubleArrowRightIcon fontSize="large" />
              </IconButton>
            </ButtonGroup>
          </Box>
        )}
      </Container>
    </LayoutAdmin>
  );
};

export default Home;
