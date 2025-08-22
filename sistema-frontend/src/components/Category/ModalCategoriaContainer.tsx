import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";

import {
  useGetCategoriasQuery,
  useCreateCategoriaMutation,
  useUpdateCategoriaMutation,
  useDeleteCategoriaMutation,
} from "@store/api/apiSlices";

import ModalCategoriaPresentational from "./ModalCategoriaPresentational";
import { RootState } from "@/store/store";

interface Categoria {
  id: number;
  nombre: string;
}

interface ModalCategoriaContainerProps {
  open: boolean;
  onClose: () => void;
}

interface CategoriaFormInputs {
  nombreCategoria: string;
}

const ModalCategoriaContainer: React.FC<ModalCategoriaContainerProps> = ({ open, onClose }) => {
  const dispatch = useDispatch<ThunkDispatch<RootState, any, any>>();

  const [pantallaActual, setPantallaActual] = useState<"listaCategorias" | "nuevaCategoria" | "editarCategoria">(
    "listaCategorias"
  );
  const [todasCategorias, setTodasCategorias] = useState<Categoria[]>([]);
  const [categoriaAEditar, setCategoriaAEditar] = useState<Categoria | null>(null);
  const [busquedaCategoria, setBusquedaCategoria] = useState("");
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const [confirmDialog, setConfirmDialog] = useState({
    open: false,
    mensaje: "",
    onConfirm: () => { },
  });

  const { data: categoriasData, isLoading: isLoadingCategorias, refetch: refetchCategorias } = useGetCategoriasQuery(undefined, {
    skip: !open,
  });
  const [createCategoriaMutation, { isLoading: isCreating }] = useCreateCategoriaMutation();
  const [updateCategoriaMutation, { isLoading: isUpdating }] = useUpdateCategoriaMutation();
  const [deleteCategoriaMutation, { isLoading: isDeleting }] = useDeleteCategoriaMutation();

  const loading = isCreating || isUpdating || isDeleting;
  const loadingInitial = isLoadingCategorias && !categoriasData;

  const {
    control: controlCategoria,
    handleSubmit: handleSubmitCategoria,
    reset: resetCategoria,
    setValue: setCategoriaValue,
    formState: { errors: errorsCategoria }
  } = useForm<CategoriaFormInputs>({
    defaultValues: {
      nombreCategoria: "",
    }
  });

  useEffect(() => {
    if (categoriasData?.categorias) {
      setTodasCategorias(categoriasData.categorias);
    }
  }, [categoriasData, dispatch]);

  useEffect(() => {
    if (open) {
      refetchCategorias();
      setPantallaActual("listaCategorias");
      setBusquedaCategoria("");
      resetCategoria();
      setDeletingId(null);
    }
  }, [open, resetCategoria, refetchCategorias]);

  const obtenerTituloPantalla = () => {
    switch (pantallaActual) {
      case "listaCategorias": return "Gestionar Categorías";
      case "nuevaCategoria": return "Agregar Categoría";
      case "editarCategoria": return "Editar Categoría";
      default: return "Categorías";
    }
  };

  const agregarCategoriaSubmit: SubmitHandler<CategoriaFormInputs> = async (data) => {
    const { nombreCategoria } = data;
    if (nombreCategoria) {
      if (todasCategorias.some(cat => cat.nombre.toLowerCase() === nombreCategoria.toLowerCase())) {
        toast.error("La categoría ya existe");
        return;
      }
      try {
        await createCategoriaMutation(nombreCategoria).unwrap();
        setPantallaActual("listaCategorias");
        resetCategoria();
        refetchCategorias();
      } catch (error) {
        console.error("Error al agregar categoría:", error);
        toast.error("Hubo un error al agregar la categoría");
      }
    }
  };

  const iniciarEdicionCategoria = (categoria: Categoria) => {
    setCategoriaAEditar(categoria);
    setCategoriaValue("nombreCategoria", categoria.nombre);
    setPantallaActual("editarCategoria");
  };

  const guardarEdicionCategoriaSubmit: SubmitHandler<CategoriaFormInputs> = async (data) => {
    const { nombreCategoria } = data;

    if (categoriaAEditar && nombreCategoria) {
      const categoriaConMismoNombreExiste = todasCategorias.some(
        cat => cat.nombre.toLowerCase() === nombreCategoria.toLowerCase() && cat.id !== categoriaAEditar.id
      );

      if (categoriaConMismoNombreExiste) {
        toast.error("Ya existe una categoría con ese nombre");
        return;
      }

      try {
        await updateCategoriaMutation({ id: categoriaAEditar.id, nombre: nombreCategoria }).unwrap();
        setCategoriaAEditar(null);
        setPantallaActual("listaCategorias");
        resetCategoria();
        refetchCategorias();
      } catch (error) {
        console.error("Error al editar categoría:", error);
        toast.error("Hubo un error al editar la categoría");
      }
    }
  };

  const confirmarEliminarCategoria = (categoria: Categoria) => {
    setConfirmDialog({
      open: true,
      mensaje: `¿Estás seguro de eliminar la categoría ${categoria.nombre}?`,
      onConfirm: async () => {
        setDeletingId(categoria.id);
        try {
          await deleteCategoriaMutation(categoria.id).unwrap();
          setConfirmDialog({ ...confirmDialog, open: false });
          refetchCategorias();
        } catch (error) {
          console.error("Error al eliminar categoría:", error);
          toast.error("Hubo un error al eliminar la categoría");
          setConfirmDialog({ ...confirmDialog, open: false });
        } finally {
          setDeletingId(null);
        }
      }
    });
  };

  const handleSetPantallaActual = (screen: "listaCategorias" | "nuevaCategoria" | "editarCategoria") => {
    setPantallaActual(screen);
  };

  return (
    <ModalCategoriaPresentational
      open={open}
      onClose={onClose}
      pantallaActual={pantallaActual}
      todasCategorias={todasCategorias}
      categoriaAEditar={categoriaAEditar}
      busquedaCategoria={busquedaCategoria}
      setBusquedaCategoria={setBusquedaCategoria}
      loading={loading}
      deletingId={deletingId}
      loadingInitial={loadingInitial}
      confirmDialog={confirmDialog}
      setConfirmDialog={setConfirmDialog}
      controlCategoria={controlCategoria}
      handleSubmitCategoria={handleSubmitCategoria}
      resetCategoria={resetCategoria}
      setCategoriaValue={setCategoriaValue}
      errorsCategoria={errorsCategoria}
      obtenerTituloPantalla={obtenerTituloPantalla}
      agregarCategoriaSubmit={agregarCategoriaSubmit}
      iniciarEdicionCategoria={iniciarEdicionCategoria}
      guardarEdicionCategoriaSubmit={guardarEdicionCategoriaSubmit}
      confirmarEliminarCategoria={confirmarEliminarCategoria}
      handleSetPantallaActual={handleSetPantallaActual}
    />
  );
};

export default ModalCategoriaContainer;
