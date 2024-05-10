import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { GrillaArticuloManufacturado } from './assets/componentes/GrillaArticuloManufacturado.tsx'
import { GrillaArticuloInsumo } from './assets/componentes/GrillaArticuloInsumo.tsx'

import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/app" element={<App />} />
        {/* <Route path="/detalleInstrumento">
        <Route path=":idInstrumento" element={<DetalleInstrumento />} />
      </Route>       */}
        <Route path="/grillaManufacturado" element={<GrillaArticuloManufacturado />} />
        <Route path="/grillaInsumo" element={<GrillaArticuloInsumo />} />
        {/* <Route path="/formulario/:idInstrumento" element={<Formulario/>} /> */}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
