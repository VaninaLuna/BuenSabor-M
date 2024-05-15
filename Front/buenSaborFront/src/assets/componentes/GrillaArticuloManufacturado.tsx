import { useEffect, useState } from "react";
import ArticuloManufacturado from "../entidades/ArticuloManufacturado";
import { deleteArticuloManufacturadoPorID, getArticulosManufacturados } from "../servicios/FuncionesArticuloManufacturadoApi";
import { Button, Accordion, Table } from "react-bootstrap";
import { ModalArticuloManufacturado } from "./ModalArticuloManufacturado";

export function GrillaArticuloManufacturado() {
    
    const [showModal, setShowModal] = useState(false);
    const [editing, setEditing] = useState(false);
    const [selectedId, setSelectedId] = useState<number | null>(null);
    
    
    const [articulosmanufacturados, setArticulosmanufacturados] = useState<ArticuloManufacturado[]>([]);
    
    const getListadoArticulosManufacturados =  async () => {
        const datos:ArticuloManufacturado[] = await getArticulosManufacturados();
        setArticulosmanufacturados(datos);
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
    };

    const deleteArticuloManufacturado = async (idArticuloManufacturado:number) => {
        await deleteArticuloManufacturadoPorID(idArticuloManufacturado);
        window.location.reload();
      }

    useEffect(() => {
        getListadoArticulosManufacturados();        
    }, []);

    return (
        <>
            <Button variant="secondary" size="lg" style={{margin: 50}} onClick={handleOpenCreate}>
                Crear Articulo Manufacturado
            </Button>
            <ModalArticuloManufacturado
                handleClose={handleClose}
                showModal={showModal}
                editing={editing}
                selectedId={selectedId}
            />
            <br/>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th style={{maxWidth:"80px"}}>ID</th>
                        <th>Imagen</th>
                        <th style={{minWidth:"150px"}}>Denominacion</th>
                        <th>Unidad de Medida</th>
                        <th>Categoria</th>
                        <th style={{minWidth:"150px"}}>Descripcion</th>
                        <th>Precio Venta</th>
                        <th>Tiempo Estimado Minutos</th>
                        <th style={{minWidth:"150px"}}>Preparacion</th>
                        <th style={{minWidth:"220px"}}>Opciones</th>
                    </tr>
                </thead>
                <tbody>
                    {articulosmanufacturados.map((articulomanufacturado:ArticuloManufacturado, index) => 
                        <tr key={index}>
                            <td>{articulomanufacturado.id}</td>
                            <td>{articulomanufacturado.imagenes && articulomanufacturado.imagenes[0] ? 
                                <img src={articulomanufacturado.imagenes[0].url} 
                                    alt={articulomanufacturado.denominacion} width="50px"/>
                                : 'No image'
                            }</td>
                            <td>
                                <Accordion defaultActiveKey="1" style={{background: 'transparent'}}>
                                    <Accordion.Item eventKey="0" style={{background: 'transparent'}}>
                                        <Accordion.Header style={{background: 'transparent'}}>{articulomanufacturado.denominacion}</Accordion.Header>
                                        <Accordion.Body style={{background: 'transparent'}}>
                                        {articulomanufacturado.articuloManufacturadoDetalles.map((detalle) => (
                                            <p>{detalle.articuloInsumo.denominacion} ({detalle.cantidad} {detalle.articuloInsumo.unidadMedida.denominacion})</p>
                                        ))}
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>    
                            </td>
                            <td>{articulomanufacturado.unidadMedida.denominacion}</td>
                            <td>{articulomanufacturado.categoria.denominacion}</td>
                            <td>{articulomanufacturado.descripcion}</td>
                            <td>{articulomanufacturado.precioVenta}</td>
                            <td>{articulomanufacturado.tiempoEstimadoMinutos}</td>
                            <td>{articulomanufacturado.preparacion}</td>
                            <td>
                                <Button variant="outline-warning" style={{ maxHeight:"40px", marginRight: '10px' }} onClick={() => { setSelectedId(articulomanufacturado.id); handleOpenEdit(); }}>Modificar</Button>
                                <Button variant="outline-danger" style={{maxHeight:"40px"}} onClick={() => deleteArticuloManufacturado(articulomanufacturado.id)}>Eliminar</Button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>       
        </>
    )
}