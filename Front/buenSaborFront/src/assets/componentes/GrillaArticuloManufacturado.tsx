import { useEffect, useState } from "react";
import ArticuloManufacturado from "../entidades/ArticuloManufacturado";
import { deleteArticuloManufacturadoPorID, getArticulosManufacturados } from "../servicios/FuncionesArticuloManufacturadoApi";
import { Button, Accordion } from "react-bootstrap";
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
            <div className="row">
                <div className="col" style={{maxWidth:"60px"}}>
                <b>ID</b>
                </div>
                <div className="col" style={{minWidth:"200px", maxWidth: "200px"}}>
                <b>Denominacion</b>
                </div>
                <div className="col">
                <b>Precio Venta</b>
                </div>
                <div className="col">
                <b>Imagen</b>
                </div>
                <div className="col">
                <b>Unidad de Medida</b>
                </div>
                <div className="col">
                <b>Categoria</b>
                </div>
                <div className="col">
                <b>Descripcion</b>
                </div>
                <div className="col">
                <b>Tiempo Estimado Minutos</b>
                </div>
                <div className="col" style={{minWidth:"150px"}}>
                <b>Preparacion</b>
                </div>                
                <div className="col" style={{minWidth:"200px"}}>
                <b>Opciones</b>
                </div>
            </div>
            <hr/>
            {articulosmanufacturados.map((articulomanufacturado:ArticuloManufacturado, index) => 
            <div className="row" key={index}>
                <div className="col" style={{maxWidth:"60px"}}>
                    {articulomanufacturado.id}
                </div>
                <div className="col" style={{minWidth:"200px", maxWidth: "200px"}}>                    
                    <Accordion defaultActiveKey="1" flush>
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>{articulomanufacturado.denominacion}</Accordion.Header>
                            <Accordion.Body>
                            {articulomanufacturado.articuloManufacturadoDetalles.map((detalle) => (
                                <p>{detalle.articuloInsumo.denominacion} ({detalle.cantidad} {detalle.articuloInsumo.unidadMedida.denominacion})</p>
                            ))}
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </div>
                <div className="col">
                    {articulomanufacturado.precioVenta}
                </div>
                <div className="col">
                    <img src={articulomanufacturado.imagenes[0].url} 
                        alt={articulomanufacturado.denominacion} width="50px"/>
                </div>
                <div className="col">
                    {articulomanufacturado.unidadMedida.denominacion}
                </div>
                <div className="col">
                    {articulomanufacturado.categoria.denominacion}
                </div>
                <div className="col">
                    {articulomanufacturado.descripcion}
                </div>
                <div className="col">
                    {articulomanufacturado.tiempoEstimadoMinutos}
                </div>
                <div className="col" style={{minWidth:"150px"}}>
                    {articulomanufacturado.preparacion}
                </div>   
                <div className="col" style={{minWidth:"200px"}}>
                    {/* <Button variant="outline-info" onClick={handleOpenEdit}>Insumos</Button> */}
                    <Button variant="outline-warning" onClick={() => { setSelectedId(articulomanufacturado.id); handleOpenEdit(); }}>Modificar</Button>
                    <Button variant="outline-danger" onClick={() => deleteArticuloManufacturado(articulomanufacturado.id)}>Eliminar</Button>
                </div>               
            </div> )}
       
        </>
    )
}