import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { ModalArticuloInsumo } from './ModalArticuloInsumo';
import ArticuloInsumo from '../entidades/ArticuloInsumo';
import { deleteArticuloInsumoPorID, getArticulosInsumos } from '../servicios/FuncionesArticuloInsumoApi';

export function GrillaArticuloInsumo() {
    const [showModal, setShowModal] = useState(false);
    const [editing, setEditing] = useState(false);
    const [selectedId, setSelectedId] = useState<number | null>(null);

    const [articulosInsumos, setArticulosInsumos] = useState<ArticuloInsumo[]>([]);

    const getListadoArticulosInsumos = async () => {
        const datos: ArticuloInsumo[] = await getArticulosInsumos();
        setArticulosInsumos(datos);
    };

    const handleOpenCreate = () => {
        setShowModal(true);
        setEditing(false);
        setSelectedId(null)
    };

    const handleOpenEdit = () => {
        setShowModal(true);
        setEditing(true);
    };

    const handleClose = () => {
        setShowModal(false);
        setEditing(false);
        setSelectedId(null);
    };

    const deleteArticuloInsumo = async (idArticuloInsumo:number) => {
        await deleteArticuloInsumoPorID(idArticuloInsumo);
        window.location.reload();
    }

    useEffect(() => {
        getListadoArticulosInsumos();
    }, []);

    return (
        <>
            <Button variant="secondary" size="lg" style={{margin: 50}} onClick={handleOpenCreate}>
                Crear Articulo Insumo
            </Button>
            <ModalArticuloInsumo
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
                <div className="col" style={{minWidth:"220px"}}>
                <b>Opciones</b>
                </div>               
            </div>
            <hr/>
            {articulosInsumos.map((articuloInsumo:ArticuloInsumo, index) =>
            <div className="row m-2" key={index}>
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
                {articuloInsumo.imagenes && articuloInsumo.imagenes[0] ? 
                        <img src={articuloInsumo.imagenes[0].url} 
                            alt={articuloInsumo.denominacion} width="50px"/>
                        : 'No image'
                    }
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
                <div className="col d-flex" style={{minWidth:"200px"}}>
                    <Button variant="outline-warning" style={{ maxHeight:"40px", marginRight: '10px' }} onClick={() => { setSelectedId(articuloInsumo.id); handleOpenEdit(); }}>Modificar</Button>
                    <Button variant="outline-danger" style={{maxHeight:"40px"}} onClick={() => deleteArticuloInsumo(articuloInsumo.id)}>Eliminar</Button>
                </div>
            </div> )}
        </>
    );
}
