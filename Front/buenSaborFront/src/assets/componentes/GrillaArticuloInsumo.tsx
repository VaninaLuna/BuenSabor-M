import { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
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
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th style={{maxWidth:"80px"}}>ID</th>
                        <th>Imagen</th>
                        <th style={{minWidth:"150px"}}>Denominacion</th>
                        <th>Unidad de Medida</th>
                        <th>Categoria</th>
                        <th>Precio de Compra</th>
                        <th>Precio Venta</th>
                        <th>Stock Actual</th>
                        <th>Stock Maximo</th>
                        <th>Para Elaborar</th>
                        <th style={{minWidth:"220px"}}>Opciones</th>
                    </tr>
                </thead>
                <tbody>
                    {articulosInsumos.map((articuloInsumo:ArticuloInsumo, index) =>
                        <tr key={index}>
                            <td>{articuloInsumo.id}</td>
                            <td>{articuloInsumo.imagenes && articuloInsumo.imagenes[0] ? 
                                <img src={articuloInsumo.imagenes[0].url} 
                                    alt={articuloInsumo.denominacion} width="50px"/>
                                : 'No image'
                            }</td>
                            <td>{articuloInsumo.denominacion}</td>
                            <td>{articuloInsumo.unidadMedida.denominacion}</td>
                            <td>{articuloInsumo.categoria.denominacion}</td>
                            <td>{articuloInsumo.stockActual}</td>
                            <td>{articuloInsumo.stockMaximo}</td>
                            <td>{articuloInsumo.precioCompra}</td>
                            <td>{articuloInsumo.precioVenta}</td>
                            <td>{articuloInsumo.esParaElaborar ? 'Si' : 'No'}</td>
                            <td>
                                <Button variant="outline-warning" style={{ maxHeight:"40px", marginRight: '10px' }} onClick={() => { setSelectedId(articuloInsumo.id); handleOpenEdit(); }}>Modificar</Button>
                                <Button variant="outline-danger" style={{maxHeight:"40px"}} onClick={() => deleteArticuloInsumo(articuloInsumo.id)}>Eliminar</Button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </>
    );
}
