import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import UnidadMedida from '../../models/UnidadMedida';
import { deleteUnidadMedidaPorID, getUnidadesMedidas } from '../../services/FuncionesUnidadMedidaApi';
import { ModalUnidadMedida } from './ModalUnidadMedida';
import { Button } from 'react-bootstrap';
import Usuario from '../../models/Usuario';
import { RolName } from '../../models/RolName';

export function GrillaUnidadMedida() {
    const [showUMedidaModal, setShowUMedidaModal] = useState(false);
    const [editing, setEditing] = useState(false);
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [uMedidas, setUMedidas] = useState<UnidadMedida[]>([]);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [jsonUsuario] = useState<any>(localStorage.getItem('usuario'));
    const usuarioLogueado: Usuario = JSON.parse(jsonUsuario) as Usuario;

    const getListadoUMedidas = async () => {
        const datos: UnidadMedida[] = await getUnidadesMedidas();
        setUMedidas(datos);
    };

    const handleOpen = async () => {
        setEditing(true)
        setShowUMedidaModal(true)
    }
    const handleClose = () => {
        setShowUMedidaModal(false);
        setEditing(false);
        setSelectedId(null);
    };

    const deleteUMedida = async (idUMedida: number) => {
        await deleteUnidadMedidaPorID(idUMedida);
        window.location.reload();
    }

    useEffect(() => {
        getListadoUMedidas();
    }, []);


    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'top', flexDirection: 'column', alignItems: 'center', minHeight: '100vh' }}>
                <h1 style={{ marginTop: '20px' }}>Unidades de Medida</h1>


                {
                    (usuarioLogueado && usuarioLogueado.rol && usuarioLogueado.rol.rolName == RolName.ADMIN) &&
                    <Button size="lg" style={{ margin: 10, backgroundColor: '#EE7F46', border: '#EE7F46' }} onClick={() => { setSelectedId(null); handleOpen(); }}>
                        Crear Unidad de Medida
                    </Button>

                }
                <ModalUnidadMedida
                    handleClose={handleClose}
                    showModal={showUMedidaModal}
                    editing={editing}
                    selectedId={selectedId}
                />

                <br />


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
                                {
                                    (usuarioLogueado && usuarioLogueado.rol && usuarioLogueado.rol.rolName == RolName.ADMIN) &&
                                    <td>
                                        <Button variant="outline-warning" style={{ maxHeight: "40px", marginRight: '10px' }}
                                            onClick={() => { setSelectedId(uMedida.id); handleOpen(); }}>Modificar</Button>
                                        <Button variant="outline-danger" style={{ maxHeight: "40px" }}
                                            onClick={() => deleteUMedida(uMedida.id)}>Eliminar</Button>
                                    </td>
                                }
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>
        </>
    );
}