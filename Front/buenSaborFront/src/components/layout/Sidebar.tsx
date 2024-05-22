
import { NavLink } from 'react-router-dom';
import { cilBarChart, cilBuilding, cilCreditCard, cilFastfood, cilPeople } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { CImage, CNavGroup, CNavItem, CSidebar, CSidebarNav } from "@coreui/react";
import '@coreui/coreui/dist/css/coreui.min.css';
import title from "../../assets/images/title.png";


function Sidebar() {

    return (
        <div className="d-flex " >
            <CSidebar className=" collapse border-end d-md-block d-block" id="sidebarCollapse" style={{ position: 'relative', height: '100%', backgroundColor: '#E0E0E0' }} unfoldable>
                <CSidebarNav>
                    <CNavItem>
                        <NavLink to="/" className="nav-link">
                            <CImage rounded src={title} width={40} height={40} />
                            El Buen Sabor
                        </NavLink>
                    </CNavItem>
                    <CNavGroup
                        toggler={
                            <>
                                <CIcon customClassName="nav-icon" icon={cilBuilding} />
                                Empresas
                            </>
                        }
                    >
                        <CNavItem>
                            <NavLink to="/empresas" className="nav-link">
                                <span className="nav-icon"><span className="nav-icon-bullet"></span></span>
                                Empresas
                            </NavLink>
                        </CNavItem>
                        <CNavItem>
                            <NavLink to="/sucursales" className="nav-link">
                                <span className="nav-icon"><span className="nav-icon-bullet"></span></span>
                                Sucursales
                            </NavLink>
                        </CNavItem>
                    </CNavGroup>

                    <CNavGroup
                        toggler={
                            <>
                                <CIcon customClassName="nav-icon" icon={cilFastfood} />
                                Articulos
                            </>
                        }
                    >
                        <CNavItem>
                            <NavLink to="/insumos" className="nav-link" >
                                <span className="nav-icon"><span className="nav-icon-bullet"></span></span>
                                Insumos
                            </NavLink>
                        </CNavItem>
                        <CNavItem>
                            <NavLink to="/manufacturados" className="nav-link" >
                                <span className="nav-icon"><span className="nav-icon-bullet"></span></span>
                                Manufacturados
                            </NavLink>
                        </CNavItem>
                        <CNavItem>
                            <NavLink to="/categorias" className="nav-link">
                                <span className="nav-icon"><span className="nav-icon-bullet"></span></span>
                                Categorías
                            </NavLink>
                        </CNavItem>
                        <CNavItem>
                            <NavLink to="/unidadmedida" className="nav-link">
                                <span className="nav-icon"><span className="nav-icon-bullet"></span></span>
                                Unidades de Medida
                            </NavLink>
                        </CNavItem>
                        <CNavItem>
                            <NavLink to="/promociones" className="nav-link">
                                <span className="nav-icon"><span className="nav-icon-bullet"></span></span>
                                Promociones
                            </NavLink>
                        </CNavItem>
                    </CNavGroup>

                    <CNavGroup
                        toggler={
                            <>
                                <CIcon customClassName="nav-icon" icon={cilPeople} />
                                Usuarios
                            </>
                        }
                    >
                        <CNavItem>
                            <NavLink to="/clientes" className="nav-link" >
                                <span className="nav-icon"><span className="nav-icon-bullet"></span></span>
                                Clientes
                            </NavLink>
                        </CNavItem>
                        <CNavItem>
                            <NavLink to="/empleados" className="nav-link">
                                <span className="nav-icon"><span className="nav-icon-bullet"></span></span>
                                Empleados
                            </NavLink>
                        </CNavItem>
                    </CNavGroup>
                    <CNavItem>
                        <NavLink to="/facturacion" className="nav-link">
                            <CIcon customClassName="nav-icon" icon={cilCreditCard} />
                            Facturacion
                        </NavLink>
                    </CNavItem>
                    <CNavItem>
                        <NavLink to="/estadisticas" className="nav-link">
                            <CIcon customClassName="nav-icon" icon={cilBarChart} />
                            Estadisticas
                        </NavLink>
                    </CNavItem>
                </CSidebarNav>
            </CSidebar>
        </div>
    );
}

export default Sidebar;