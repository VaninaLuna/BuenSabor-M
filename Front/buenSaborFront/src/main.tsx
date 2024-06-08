import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';



import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { GrillaArticuloManufacturado } from './components/articulos/GrillaArticuloManufacturado.tsx'
import { GrillaArticuloInsumo } from './components/articulos/GrillaArticuloInsumo.tsx'
import Sidebar from './components/layout/Sidebar.tsx';
import NavBar from './components/layout/Navbar.tsx';
import { Home } from './components/layout/Home.tsx';
import { GrillaEmpresa } from './components/empresa/GrillaEmpresa.tsx';
import { GrillaSucursal } from './components/empresa/GrillaSucursal.tsx';
import { Articulos } from './components/articulos/articulos.tsx';
import { AuthProvider } from './components/context/AuthContext.tsx';
import Login from './components/auth/Login.tsx';
import Register from './components/auth/Register.tsx';
import RolUsuario from './components/controlAcceso/RolUsuario.tsx';
import { RolName } from './models/RolName.ts';
import { RutaPrivada } from './components/controlAcceso/RutaPrivada.tsx';
import { GrillaCategoria } from './components/articulos/GrillaCategoria.tsx';
import { GrillaUnidadMedida } from './components/articulos/GrillaUnidadMedida.tsx';
import { GrillaPedido } from './components/articulos/GrillaPedido.tsx';



ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Sidebar />
        <div className="h-100 w-100 flex-grow-1 ">
          <NavBar />
          <div className='content' style={{ marginLeft: 60, marginRight: 60 }}>
            <Routes>
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route index element={<Home />} />
              <Route path='/home' element={<Home />} />
              {/* EMPRESA */}
              <Route element={<RolUsuario roles={[RolName.ADMIN]} />}>
                <Route path="/empresas" element={<GrillaEmpresa />} />
              </Route>

              <Route element={<RolUsuario roles={[RolName.ADMIN]} />}>
                <Route path="/sucursales" element={<GrillaSucursal />} />
              </Route>

              {/* ARTICULOS */}
              <Route element={<RolUsuario roles={[RolName.ADMIN, RolName.OPERADOR]} />}>
                <Route path="/insumos" element={<GrillaArticuloInsumo />} />
              </Route>


              <Route path="/articulos" element={
                <RutaPrivada>
                  <Articulos />
                </RutaPrivada>} />


              <Route element={<RolUsuario roles={[RolName.ADMIN, RolName.OPERADOR]} />}>
                <Route path="/manufacturados" element={<GrillaArticuloManufacturado />} />
              </Route>

              <Route element={<RolUsuario roles={[RolName.ADMIN, RolName.OPERADOR]} />}>
                <Route path="/categorias" element={<GrillaCategoria />} />
              </Route>

              <Route element={<RolUsuario roles={[RolName.ADMIN, RolName.OPERADOR]} />}>
                <Route path="/unidadMedida" element={<GrillaUnidadMedida />} />
              </Route>

              <Route element={<RolUsuario roles={[RolName.ADMIN, RolName.OPERADOR]} />}>
                <Route path="/pedidos" element={<GrillaPedido />} />
              </Route>
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>,
)
