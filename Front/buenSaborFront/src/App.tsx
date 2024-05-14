import { useEffect } from 'react'
import './App.css'
import { Outlet, useNavigate } from 'react-router-dom'

function App() {
  const navigate = useNavigate() /* hook de navegacion */

  useEffect(() => navigate('/grillaInsumo'), []) /* ruta cargada por defecto */

  return (
    <div className="App">
      <Outlet/> { /* Outlet le dice al Router donde debe renderizar los elementos hijos */ }
    </div>
  );
}

export default App
