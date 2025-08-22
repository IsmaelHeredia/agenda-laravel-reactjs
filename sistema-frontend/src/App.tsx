import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import RequireAuth from "@utils/RequireAuth";
import { RootState } from "@store/store";

const Ingreso = React.lazy(() => import("@pages/ingreso/Index"));
const Home = React.lazy(() => import("@pages/home/Index"));
const ListarCategorias = React.lazy(() => import("@pages/categorias/Index"));
const ListarNotas = React.lazy(() => import("@pages/notas/Index"));
const GuardarNota = React.lazy(() => import("@pages/notas/Guardar"));

import LoadingOverlay from "@/components/LoadingOverlay/LoadingOverlay";

import "./App.css";

function App() {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingOverlay open={true} message="Descargando componentes..." />}>
        <Routes>
          <Route
            path="/ingreso"
            element={isLoggedIn ? <Navigate to="/" /> : <Ingreso />}
          />

          <Route element={<RequireAuth />}>
            <Route path="/" element={<Home />} />
            <Route path="/categorias" element={<ListarCategorias />} />
            <Route path="/notas" element={<ListarNotas />} />
            <Route path="/notas/agregar" element={<GuardarNota />} />
            <Route path="/notas/:id/editar" element={<GuardarNota />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
