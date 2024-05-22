import {
    CCollapse,
    CContainer,
    CNavbar,
    CNavbarBrand,
    CNavbarToggler,
} from "@coreui/react";
import { useState } from "react";

function NavBar() {
    const [visible, setVisible] = useState(false);
    return (
        // <nav className="navbar" style={{backgroundColor: '#F3F4F7'}}> {/*'rgb(224, 224, 224)'*/}
        //   <div className="container-fluid">
        //     <button className="btn btn-primary d-md-none" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarCollapse" aria-expanded="false" aria-controls="sidebarCollapse">
        //         <span className="navbar-toggler-icon"></span>
        //     </button>

        //     <div className="mx-auto">
        //     <span className="navbar-brand">Buen Sabor</span>
        //     </div>
        //   </div>
        // </nav>

        <CNavbar expand="lg" colorScheme="dark" className="bg-primary">
            <CContainer fluid>
                <CNavbarBrand href="/">El Buen Sabor</CNavbarBrand>
                <CNavbarToggler
                    aria-label="Toggle navigation"
                    aria-expanded={visible}
                    onClick={() => setVisible(!visible)}
                />
                <CCollapse className="navbar-collapse" visible={visible}>
                </CCollapse>
            </CContainer>
        </CNavbar>
    );
}

export default NavBar;
