import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { ModalArticuloInsumo } from './ModalArticuloInsumo';
import ArticuloInsumo from '../entidades/ArticuloInsumo';
import { deleteArticuloInsumoXId, getArticulosInsumos } from '../servicios/FuncionesArticuloInsumoApi';

export function GrillaArticuloInsumo() {
    const [showModal, setShowModal] = useState(false);
    const [editing, setEditing] = useState(false);
    
    const [articulosInsumos, setArticulosInsumos] = useState<ArticuloInsumo[]>([]);
    
    const getListadoArticulosInsumos =  async () => {
        const datos:ArticuloInsumo[] = await getArticulosInsumos();
        setArticulosInsumos(datos);
      }


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

    const deleteArticuloInsumo = async (idArticuloInsumo:number) => {
        await deleteArticuloInsumoXId(idArticuloInsumo);
        window.location.reload();
      }

    useEffect(() => {
        getListadoArticulosInsumos();        
    }, []);


    return (
        <>
            <Button onClick={handleOpenCreate}>
                Crear Articulo Insumo
            </Button>
            <ModalArticuloInsumo
                handleClose={handleClose}
                showModal={showModal}
                editing={editing}
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
                <b>Precio de Compra</b>
                </div>
                <div className="col">
                <b>Stock Actual</b>
                </div>
                <div className="col">
                <b>Stock Maximo</b>
                </div>
                <div className="col">
                <b>Es Para Elaborar</b>
                </div>
                <div className="col">
                <b>Modificar</b>
                </div>
                <div className="col">
                <b>Eliminar</b>
                </div>
            </div>
            <hr/>
            {articulosInsumos.map((articuloInsumo:ArticuloInsumo, index) => 
            <div className="row" key={index}>
                <div className="col" style={{maxWidth:"80px"}}>
                {articuloInsumo.id}
                </div>
                <div className="col" style={{minWidth:"150px"}}>
                {articuloInsumo.denominacion}
                </div>
                <div className="col">
                {articuloInsumo.precioVenta}
                </div>
                <div className="col">
                <img src={articuloInsumo.imagenes[0].url} 
                    alt={articuloInsumo.denominacion} width="50px"/>
                </div>
                <div className="col">
                {articuloInsumo.unidadMedida.denominacion}
                </div>
                <div className="col">
                {articuloInsumo.categoria.denominacion}
                </div>
                <div className="col">
                {articuloInsumo.precioCompra}
                </div>
                <div className="col">
                {articuloInsumo.stockActual}
                </div>
                <div className="col">
                {articuloInsumo.stockMaximo}
                </div>
                <div className="col">
                {articuloInsumo.esParaElaborar ? 'Si' : 'No'}
                </div>
                <div className="col">
                <a className="btn btn-info" style={{ marginBottom:10 }} onClick={handleOpenEdit}>Modificar</a>
                </div>
                <div className="col">
                <a className="btn btn-danger" style={{ marginBottom:10 }} onClick={() => deleteArticuloInsumo(articuloInsumo.id)}>Eliminar</a>
                </div>               
            </div> )}
        </>
    );
}
