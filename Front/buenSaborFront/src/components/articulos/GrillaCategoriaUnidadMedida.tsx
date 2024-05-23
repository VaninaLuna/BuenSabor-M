import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Categoria from '../../models/Categoria';
import UnidadMedida from '../../models/UnidadMedida';
import { deleteCategoriaPorID, getCategorias } from '../../services/FuncionesCategoriaApi';
import { deleteUnidadMedidaPorID, getUnidadesMedidas } from '../../services/FuncionesUnidadMedidaApi';
import { ModalCategoria } from './ModalCategoria';
import { ModalUnidadMedida } from './ModalUnidadMedida';
import { Button } from 'react-bootstrap';

export function GrillaCategoriaUnidadMedida() {
    const [showCategoriaModal, setShowCategoriaModal] = useState(false);
    const [showUMedidaModal, setShowUMedidaModal] = useState(false);
    const [editing, setEditing] = useState(false);
    const [selectedId, setSelectedId] = useState<number | null>(null);

    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [uMedidas, setUMedidas] = useState<UnidadMedida[]>([]);

    const getListadoCategorias = async () => {
        const datos: Categoria[] = await getCategorias();
        setCategorias(datos);
    };

    const getListadoUMedidas = async () => {
        const datos: UnidadMedida[] = await getUnidadesMedidas();
        setUMedidas(datos);
    };

    const handleOpenCreate = async (esCategoria: boolean) => {
        setSelectedId(null)
        setEditing(true)
        if (esCategoria) {
            setShowCategoriaModal(true)
        } else {
            setShowUMedidaModal(true)
        }
    }

    const handleOpenEdit = async (esCategoria: boolean) => {
        setEditing(true);
        if (esCategoria) {
            setShowCategoriaModal(true)
        } else {
            setShowUMedidaModal(true)
        }
    }

    const handleClose = () => {
        setShowCategoriaModal(false);
        setShowUMedidaModal(false);
        setEditing(false);
        setSelectedId(null);
    };

    const deleteCategoria = async (idCategoria: number) => {
        await deleteCategoriaPorID(idCategoria);
        window.location.reload();
    }

    const deleteUMedida = async (idUMedida: number) => {
        await deleteUnidadMedidaPorID(idUMedida);
        window.location.reload();
    }

    useEffect(() => {
        getListadoCategorias();
        getListadoUMedidas();
    }, []);


    return (
        <>
            <Button size="lg" style={{ margin: 50, backgroundColor: '#EE7F46' }} onClick={() => handleOpenCreate(true)}>
                Crear Categoria
            </Button>
            <Button size="lg" style={{ margin: 50, backgroundColor: '#EE7F46' }} onClick={() => handleOpenCreate(false)}>
                Crear Unidad de Medida
            </Button>
            <ModalCategoria
                handleClose={handleClose}
                showModal={showCategoriaModal}
                editing={editing}
                selectedId={selectedId}
            />
            <ModalUnidadMedida
                handleClose={handleClose}
                showModal={showUMedidaModal}
                editing={editing}
                selectedId={selectedId}
            />
            <br />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Denominacion</th>
                            <th>Opciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categorias.map((categoria: Categoria, index) =>
                            <tr key={index}>
                                <td>{categoria.id}</td>
                                <td>{categoria.denominacion}</td>
                                <td>
                                    <Button variant="outline-warning" style={{ maxHeight: "40px", marginRight: '10px' }}
                                        onClick={() => { setSelectedId(categoria.id); handleOpenEdit(true); }}>Modificar</Button>
                                    <Button variant="outline-danger" style={{ maxHeight: "40px" }}
                                        onClick={() => deleteCategoria(categoria.id)}>Eliminar</Button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Denominacion</th>
                            <th>Opciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {uMedidas.map((uMedida: UnidadMedida, index) =>
                            <tr key={index}>
                                <td>{uMedida.id}</td>
                                <td>{uMedida.denominacion}</td>
                                <td>
                                    <Button variant="outline-warning" style={{ maxHeight: "40px", marginRight: '10px' }}
                                        onClick={() => { setSelectedId(uMedida.id); handleOpenEdit(false); }}>Modificar</Button>
                                    <Button variant="outline-danger" style={{ maxHeight: "40px" }}
                                        onClick={() => deleteUMedida(uMedida.id)}>Eliminar</Button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>
        </>
    );
}