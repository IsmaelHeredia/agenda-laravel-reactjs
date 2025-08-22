import React, { useState } from "react";
import LayoutAdmin from "@layouts/LayoutAdmin";
import { useMediaQuery, Grid, Divider } from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import CategoryIcon from "@mui/icons-material/Category";

import ModalCategoriaContainer from "@/components/Category/ModalCategoriaContainer";
import { GeneralButton } from "@/components/CustomTextFields/CustomTextFields";
import ListarNotasContainer from "@/components/Note/ListarNotasContainer";
import { useNavigate } from "react-router-dom";

const ListarNotas = () => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width:600px)");
  const [openCategoryModal, setOpenCategoryModal] = useState<boolean>(false);

  const handleClickCreateNota = () => navigate("/notas/agregar");
  const handleOpenCategoryModal = () => setOpenCategoryModal(true);
  const handleCloseCategoryModal = () => setOpenCategoryModal(false);

  return (
    <LayoutAdmin>
      <div className="botones-principales" style={{ marginBottom: "3%" }}>
        <Grid container justifyContent={isMobile ? "center" : "flex-start"} spacing={1}>
          <Grid item>
            <GeneralButton
              startIcon={<AddIcon />}
              variant="contained"
              color="primary"
              onClick={handleClickCreateNota}
            >
              Agregar nota
            </GeneralButton>
          </Grid>
          <Grid item>
            <GeneralButton
              startIcon={<CategoryIcon />}
              variant="contained"
              color="primary"
              sx={{ borderRadius: "12px" }}
              onClick={handleOpenCategoryModal}
            >
              Gestionar categorías
            </GeneralButton>
          </Grid>
        </Grid>
      </div>
      <ListarNotasContainer />
      <ModalCategoriaContainer open={openCategoryModal} onClose={handleCloseCategoryModal} />
    </LayoutAdmin>
  );
};

export default ListarNotas;
