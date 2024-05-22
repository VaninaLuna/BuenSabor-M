import {
    CCollapse,
    CContainer,
    CImage,
    CNavbar,
    CNavbarBrand,
    CNavbarToggler,
} from "@coreui/react";
import { useState } from "react";
import title from "../../assets/images/logo.png";

function NavBar() {
    const [visible, setVisible] = useState(false);
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
            </CContainer>
        </CNavbar>
    );
}

export default NavBar;
