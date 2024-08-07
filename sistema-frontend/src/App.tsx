import "./App.css";

import Ingreso from "@pages/ingreso/Index";
import Home from "@pages/home/Index";
import ListarCategorias from "@pages/categorias/Index";
import ListarNotas from "@pages/notas/Index";
import GuardarNota from "@pages/notas/Guardar";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import RutasNormales from "@utils/RutasNormales";
import ProtegerRutas from "@utils/ProtegerRutas";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RutasNormales />}>
          <Route>
            <Route path="/ingreso" element={<Ingreso />} />
          </Route>
        </Route>
        <Route element={<ProtegerRutas />}>
          <Route path="/" element={<Home/>} />
          <Route path="/categorias" element={<ListarCategorias/>} />
          <Route path="/notas" element={<ListarNotas/>} />
          <Route path="/notas/agregar" element={<GuardarNota/>} />
          <Route path="/notas/:id/editar" element={<GuardarNota/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );

}

export default App;
