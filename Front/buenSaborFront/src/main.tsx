import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { GrillaArticuloManufacturado } from './assets/componentes/GrillaArticuloManufacturado.tsx'
import { GrillaArticuloInsumo } from './assets/componentes/GrillaArticuloInsumo.tsx'

import 'bootstrap/dist/css/bootstrap.min.css';
import { Navegador } from './assets/componentes/Navegador.tsx'
import React from 'react'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Navegador />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/grillaManufacturado" element={<GrillaArticuloManufacturado />} />
        <Route path="/grillaInsumo" element={<GrillaArticuloInsumo />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
