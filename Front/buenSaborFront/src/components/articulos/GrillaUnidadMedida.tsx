import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import UnidadMedida from '../../models/UnidadMedida';
import { deleteUnidadMedidaPorID, getByEstaEliminado, getUnidadesMedidas, updateEstadoEliminado } from '../../services/FuncionesUnidadMedidaApi';
import { ModalUnidadMedida } from './ModalUnidadMedida';
import { Button } from 'react-bootstrap';
import { UsuarioCliente } from '../../models/Usuario';
import { RolName } from '../../models/RolName';

export function GrillaUnidadMedida() {
    const [showUMedidaModal, setShowUMedidaModal] = useState(false);
    const [editing, setEditing] = useState(false);
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [uMedidas, setUMedidas] = useState<UnidadMedida[]>([]);
    //estado para alternar entre obtener datos con eliminacion logica o no
    const [eliminados, setEliminados] = useState<boolean>(false);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [jsonUsuario] = useState<any>(localStorage.getItem('usuario'));
    const usuarioLogueado: UsuarioCliente = JSON.parse(jsonUsuario) as UsuarioCliente;

    const getListadoUMedidas = async () => {
        const datos: UnidadMedida[] = await getByEstaEliminado(eliminados);
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

    const updateEstadoDelete = async (idUMedida: number) => {
        await updateEstadoEliminado(idUMedida);
        getListadoUMedidas();
    }

    useEffect(() => {
        getListadoUMedidas();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [eliminados]);


    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'top', flexDirection: 'column', alignItems: 'center', minHeight: '100vh' }}>
                <h1 style={{ marginTop: '20px', color: "whitesmoke" }}> {eliminados ? "Unidades de Medida Eliminadas" : "Unidades de Medida"}</h1>


                {
                    (usuarioLogueado && usuarioLogueado.rol && usuarioLogueado.rol.rolName == RolName.ADMIN) &&
                    <div>
                        <Button size="lg" style={{ margin: 10, backgroundColor: '#EE7F46', border: '#EE7F46' }} onClick={() => { setSelectedId(null); handleOpen(); }}>
                            Crear Unidad de Medida
                        </Button>
                        <Button size="lg" style={{ margin: 10, backgroundColor: '#46b6ee', border: '#46b6ee' }} onClick={() => { setEliminados(!eliminados) }}>
                            {eliminados ? "Ver Unidades de Medidas Actuales" : "Ver Unidades de Medida Eliminadas"}
                        </Button>
                    </div>

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
                            <th>Denominacion</th>
                            <th>Opciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {uMedidas.map((uMedida: UnidadMedida, index) =>
                            <tr key={index}>
                                <td>{uMedida.denominacion}</td>
                                {
                                    (usuarioLogueado && usuarioLogueado.rol && usuarioLogueado.rol.rolName == RolName.ADMIN) &&
                                    <td>
                                        <Button variant="outline-warning" style={{ maxHeight: "40px", marginRight: '10px' }}
                                            onClick={() => { setSelectedId(uMedida.id); handleOpen(); }}>Modificar</Button>
                                        {
                                            eliminados
                                                ?
                                                <Button variant="outline-info" style={{ maxHeight: "40px" }}
                                                    onClick={() => updateEstadoDelete(uMedida.id)}>Restaurar</Button>
                                                :
                                                <Button variant="outline-danger" style={{ maxHeight: "40px" }}
                                                    onClick={() => updateEstadoDelete(uMedida.id)}>Eliminar</Button>
                                        }

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