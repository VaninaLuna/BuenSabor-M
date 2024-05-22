import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export function Navegador() {
  return (
    <Navbar expand="lg" style={{ backgroundColor: '#f2f2f2' }}>
      <Container>
        <Navbar.Brand href="/">Buen Sabor</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href={"/grillaInsumo"}>Articulos Insumo</Nav.Link>
            <Nav.Link href={"/grillaManufacturado"}>Ariticulos Manufacturados</Nav.Link>
            <Nav.Link href={"/grillaCategoriaUnidadMedida"}>Categoria y Unidad de Medida</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}