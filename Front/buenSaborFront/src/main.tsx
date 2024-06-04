import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';



import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { GrillaArticuloManufacturado } from './components/articulos/GrillaArticuloManufacturado.tsx'
import { GrillaArticuloInsumo } from './components/articulos/GrillaArticuloInsumo.tsx'
import { GrillaCategoriaUnidadMedida } from './components/articulos/GrillaCategoriaUnidadMedida.tsx'
import Sidebar from './components/layout/Sidebar.tsx';
import NavBar from './components/layout/Navbar.tsx';
import { Home } from './components/layout/Home.tsx';
import { GrillaEmpresa } from './components/empresa/GrillaEmpresa.tsx';
import { GrillaSucursal } from './components/empresa/GrillaSucursal.tsx';
import { Articulos } from './components/articulos/articulos.tsx';



ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Sidebar />
      <div className="h-100 w-100 flex-grow-1 ">
        <NavBar />
        {/* <Navegador /> */}
        <div className='content' style={{ marginLeft: 60, marginRight: 60 }}>
          <Routes>
            <Route index element={<Home />} />
            {/* EMPRESA */}
            <Route path="/empresas" element={<GrillaEmpresa />} />
            <Route path="/sucursales" element={<GrillaSucursal />} />

            {/* ARTICULOS */}
            <Route path="/insumos" element={<GrillaArticuloInsumo />} />
            <Route path="/articulos" element={<Articulos />} />
            <Route path="/manufacturados" element={<GrillaArticuloManufacturado />} />
            <Route path="/categorias" element={<GrillaCategoriaUnidadMedida />} />
            <Route path="/unidadMedida" element={<GrillaCategoriaUnidadMedida />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  </React.StrictMode>,
)
