import { useEffect, useState } from "react";
import ArticuloManufacturado from "../entidades/ArticuloManufacturado";
import { deleteArticuloManufacturadoXId, getArticulosManufacturados } from "../servicios/FuncionesArticuloManufacturadoApi";
import { Button } from "react-bootstrap";
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
        await deleteArticuloManufacturadoXId(idArticuloManufacturado);
        window.location.reload();
      }

    useEffect(() => {
        getListadoArticulosManufacturados();        
    }, []);

    return (
        <>
        <Button variant="info" style={{margin: 50}} onClick={handleOpenCreate}>
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
                <div className="col">
                <b>ID</b>
                </div>
                <div className="col">
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
                <div className="col">
                <b>Preparacion</b>
                </div>                
                <div className="col" style={{minWidth:"300px"}}>
                <b>Opciones</b>
                </div>
            </div>
            <hr/>
            {articulosmanufacturados.map((articulomanufacturado:ArticuloManufacturado, index) => 
            <div className="row" key={index}>
                <div className="col" style={{maxWidth:"80px"}}>
                {articulomanufacturado.id}
                </div>
                <div className="col" style={{minWidth:"150px"}}>
                {articulomanufacturado.denominacion}
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
                <div className="col">
                {articulomanufacturado.preparacion}
                </div>   
                <div className="col" style={{minWidth:"300px"}}>
                    <Button variant="outline-info" onClick={handleOpenEdit}>Insumos</Button>
                    <Button variant="outline-warning" onClick={() => { setSelectedId(articulomanufacturado.id); handleOpenEdit(); }}>Modificar</Button>
                    <Button variant="outline-danger" onClick={() => deleteArticuloManufacturado(articulomanufacturado.id)}>Eliminar</Button>
                </div>               
            </div> )}
       
        </>
    )
}