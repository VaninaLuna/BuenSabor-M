import {
    CCollapse,
    CContainer,
    CImage,
    CNavbar,
    CNavbarBrand,
    CNavbarToggler,
} from "@coreui/react";
import { useContext, useState } from "react";
import title from "../../assets/images/logo.png";
import { AuthContext } from "../context/AuthContext";
import Usuario from "../../models/Usuario";
import Logout from "../auth/Logout";

function NavBar() {
    const [visible, setVisible] = useState(false);

    const { auth } = useContext(AuthContext); // Obtiene el estado de autenticación del contexto
    const usuarioLogueado: Usuario | null = auth.usuario;
    return (
        // <nav className="navbar" style={{backgroundColor: }}> 
        //   <div className="container-fluid">
        //     <button className="btn btn-primary d-md-none" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarCollapse" aria-expanded="false" aria-controls="sidebarCollapse">
        //         <span className="navbar-toggler-icon"></span>
        //     </button>

        //     <div className="mx-auto">
        //     <span className="navbar-brand">Buen Sabor</span>
        //     </div>
        //   </div>
        // </nav>

        <CNavbar expand="lg" style={{ backgroundColor: 'rgb(224, 224, 224)' }}>
            <CContainer fluid style={{ margin: 30 }}>
                <CNavbarBrand className="navbar-center" href="/">
                    <CImage rounded src={title} width={250} height={80} />
                </CNavbarBrand>
                <CNavbarToggler
                    aria-label="Toggle navigation"
                    aria-expanded={visible}
                    onClick={() => setVisible(!visible)}
                />
                <CCollapse className="navbar-collapse" visible={visible}>
                </CCollapse>
                <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                    {(!usuarioLogueado || !usuarioLogueado.rol) ? (
                        <>
                            <li className="nav-item">
                                <a className="nav-link btn btn-secondary" style={{ fontWeight: 'bold' }} href="/login">Login</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link btn btn-secondary" style={{ fontWeight: 'bold' }} href="/register">Register</a>
                            </li>
                        </>
                    ) : (
                        <>
                            <li style={{ paddingRight: "10px", paddingTop: "5px" }}>
                                <p>Usuario: {usuarioLogueado.nombreUsuario} - {usuarioLogueado.rol.rolName}</p>
                            </li>
                            <li className="nav-item">
                                <Logout />
                            </li>
                        </>
                    )}
                </ul>
            </CContainer>
        </CNavbar>
    );
}

export default NavBar;
