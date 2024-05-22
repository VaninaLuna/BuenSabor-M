import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { GrillaArticuloManufacturado } from './components/GrillaArticuloManufacturado.tsx'
import { GrillaArticuloInsumo } from './components/GrillaArticuloInsumo.tsx'

import 'bootstrap/dist/css/bootstrap.min.css';
import { Navegador } from './components/layout/Navegador.tsx'
import React from 'react'
import { GrillaCategoriaUnidadMedida } from './components/GrillaCategoriaUnidadMedida.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Navegador />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/grillaManufacturado" element={<GrillaArticuloManufacturado />} />
        <Route path="/grillaInsumo" element={<GrillaArticuloInsumo />} />
        <Route path="/grillaCategoriaUnidadMedida" element={<GrillaCategoriaUnidadMedida />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
