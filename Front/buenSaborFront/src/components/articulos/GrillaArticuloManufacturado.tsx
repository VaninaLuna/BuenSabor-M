import { useEffect, useState } from "react";
import ArticuloManufacturado from "../../models/ArticuloManufacturado";
import { deleteArticuloManufacturadoPorID, getArticulosManufacturados } from "../../services/FuncionesArticuloManufacturadoApi";
import { Button, Table, Form, Modal, Image } from "react-bootstrap";
import { ModalArticuloManufacturado } from "./ModalArticuloManufacturado";
import Usuario from "../../models/Usuario";
import { RolName } from "../../models/RolName";

export function GrillaArticuloManufacturado() {
    const [showModal, setShowModal] = useState(false);
    const [editing, setEditing] = useState(false);
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [articulosmanufacturados, setArticulosmanufacturados] = useState<ArticuloManufacturado[]>([]);
    const [filteredArticulos, setFilteredArticulos] = useState<ArticuloManufacturado[]>([]);
    const [filter, setFilter] = useState("");
    //  const [filterDenominacion, setFilterDenominacion] = useState("");
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [selectedArticulo, setSelectedArticulo] = useState<ArticuloManufacturado | null>(null);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [jsonUsuario] = useState<any>(localStorage.getItem('usuario'));
    const usuarioLogueado: Usuario = JSON.parse(jsonUsuario) as Usuario;

    const getListadoArticulosManufacturados = async () => {
        const datos: ArticuloManufacturado[] = await getArticulosManufacturados();
        setArticulosmanufacturados(datos);
        setFilteredArticulos(datos);
    };

    const handleOpenCreate = () => {
        setShowModal(true);
        setEditing(false);
    };

    const handleOpenEdit = () => {
        setShowModal(true);
        setEditing(true);
    };

    const handleClose = () => {
        setShowModal(false);
        setEditing(false);
        setSelectedId(null);
        setSelectedArticulo(null);
    };

    const deleteArticuloManufacturado = async (idArticuloManufacturado: number) => {
        await deleteArticuloManufacturadoPorID(idArticuloManufacturado);
        window.location.reload();
    }

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setFilter(value);

        const filtered = articulosmanufacturados.filter(articulo =>
            articulo.id.toString().includes(value) || articulo.denominacion.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredArticulos(filtered);
    };

    const handleShowDetails = (articulo: ArticuloManufacturado) => {
        setSelectedArticulo(articulo);
        setShowDetailModal(true);
    };

    const handleCloseDetailModal = () => {
        setShowDetailModal(false);
        setSelectedArticulo(null);
    };
    useEffect(() => {
        getListadoArticulosManufacturados();
    }, []);

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'top', flexDirection: 'column', alignItems: 'center', minHeight: '100vh' }}>
                <h1 style={{ marginTop: '20px' }}>Articulos Manufacturados</h1>

                <ModalArticuloManufacturado
                    handleClose={handleClose}
                    showModal={showModal}
                    editing={editing}
                    selectedId={selectedId}
                />
                <br />
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Form.Control
                        type="text"
                        placeholder="Filtrar por ID o Denominación"
                        value={filter}
                        onChange={handleFilterChange}
                        style={{ margin: 20, width: '300px', height: '50px' }}
                    />
                    {
                        (usuarioLogueado && usuarioLogueado.rol && usuarioLogueado.rol.rolName == RolName.ADMIN) &&
                        <Button size="lg" style={{ margin: 20, backgroundColor: '#EE7F46', border: '#EE7F46' }} onClick={handleOpenCreate}>
                            Crear Articulo Manufacturado
                        </Button>
                    }
                </div>

                {
                    <Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                                {/* <th style={{ maxWidth: "80px" }}>ID</th> */}
                                <th>Imagen</th>
                                <th style={{ minWidth: "150px" }}>Denominacion</th>
                                <th>Unidad de Medida</th>
                                <th>Categoria</th>
                                <th style={{ minWidth: "150px" }}>Descripcion</th>
                                <th>Precio Venta</th>
                                <th>Tiempo Estimado Minutos</th>
                                <th style={{ minWidth: "150px" }}>Preparacion</th>
                                <th style={{ minWidth: "300px" }}>Opciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredArticulos.map((articulomanufacturado: ArticuloManufacturado, index) =>
                                <tr key={index}>
                                    {/* <td>{articulomanufacturado.id}</td> */}
                                    <td>{articulomanufacturado.imagenes && articulomanufacturado.imagenes[0] ?
                                        <Image src={articulomanufacturado.imagenes[0].url}
                                            alt={articulomanufacturado.denominacion} style={{ height: "50px", width: "50px", objectFit: 'cover' }} rounded />
                                        : 'No image'
                                    }</td>
                                    <td>{articulomanufacturado.denominacion}</td>
                                    <td>{articulomanufacturado.unidadMedida.denominacion}</td>
                                    <td>{articulomanufacturado.categoria.denominacion}</td>
                                    <td>{articulomanufacturado.descripcion}</td>
                                    <td>{articulomanufacturado.precioVenta}</td>
                                    <td>{articulomanufacturado.tiempoEstimadoMinutos}</td>
                                    <td>{articulomanufacturado.preparacion}</td>
                                    <td>
                                        {
                                            (usuarioLogueado && usuarioLogueado.rol && usuarioLogueado.rol.rolName == RolName.ADMIN) &&
                                            <>
                                                <Button variant="outline-warning" style={{ maxHeight: "40px", marginRight: '10px' }} onClick={() => { setSelectedId(articulomanufacturado.id); handleOpenEdit(); }}>Modificar</Button>
                                                <Button variant="outline-danger" style={{ maxHeight: "40px", marginRight: '10px' }} onClick={() => deleteArticuloManufacturado(articulomanufacturado.id)}>Eliminar</Button>

                                            </>
                                        }

                                        <Button variant="outline-success" style={{ maxHeight: "40px", marginRight: '10px' }} onClick={() => handleShowDetails(articulomanufacturado)}>Detalle</Button>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                }

                <Modal show={showDetailModal} onHide={handleCloseDetailModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>{selectedArticulo?.denominacion}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {selectedArticulo && selectedArticulo.articuloManufacturadoDetalles.map((detalle, index) => (
                            <p key={index}>
                                <span style={{ fontWeight: 'bold' }}>Insumo:</span> {detalle.articuloInsumo.denominacion} <br />
                                <span style={{ fontWeight: 'bold' }}>Cantidad:</span> {detalle.cantidad} {detalle.articuloInsumo.unidadMedida.denominacion}
                            </p>
                        ))}
                    </Modal.Body>


                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseDetailModal}>
                            Cerrar
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </>
    );
}
