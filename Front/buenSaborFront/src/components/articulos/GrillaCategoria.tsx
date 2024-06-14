import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Categoria from '../../models/Categoria';
import { deleteCategoriaPorID, getCategorias } from '../../services/FuncionesCategoriaApi';
import { ModalCategoria } from './ModalCategoria';
import { Button } from 'react-bootstrap';
import { UsuarioCliente } from '../../models/Usuario';
import { RolName } from '../../models/RolName';

export function GrillaCategoria() {
    const [showCategoriaModal, setShowCategoriaModal] = useState(false);

    const [editing, setEditing] = useState(false);
    const [selectedId, setSelectedId] = useState<number | null>(null);

    const [categorias, setCategorias] = useState<Categoria[]>([]);


    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [jsonUsuario] = useState<any>(localStorage.getItem('usuario'));
    const usuarioLogueado: UsuarioCliente = JSON.parse(jsonUsuario) as UsuarioCliente;

    const getListadoCategorias = async () => {
        const datos: Categoria[] = await getCategorias();
        //const categoriasProcesadas = mapCategorias(datos);
        setCategorias(datos);
    };

    // const mapCategorias = (data: Categoria[]) => {
    //     const flatCategorias: Categoria[] = [];

    //     const processCategoria = (categoria: Categoria, parent: Categoria | null) => {
    //         const newCategoria = { ...categoria, categoriaPadre: parent };
    //         flatCategorias.push(newCategoria);

    //         if (categoria.subCategorias && categoria.subCategorias.length > 0) {
    //             categoria.subCategorias.forEach(subCategoria => processCategoria(subCategoria, newCategoria));
    //         }

    //     };
    //     data.forEach(categoria => processCategoria(categoria, null));

    //     return flatCategorias;
    // };


    const handleOpen = async () => {
        setEditing(true)
        setShowCategoriaModal(true)
    }

    const handleClose = () => {
        setShowCategoriaModal(false);

        setEditing(false);
        setSelectedId(null);
    };

    const deleteCategoria = async (idCategoria: number) => {
        await deleteCategoriaPorID(idCategoria);
        window.location.reload();
    }


    useEffect(() => {
        getListadoCategorias();
    }, []);


    return (
        <>

            <div style={{ display: 'flex', justifyContent: 'top', flexDirection: 'column', alignItems: 'center', minHeight: '100vh' }}>
                <h1 style={{ marginTop: '20px', color: "whitesmoke", backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: '15px 15px' }}>Categorias</h1>
                {
                    (usuarioLogueado && usuarioLogueado.rol && usuarioLogueado.rol.rolName == RolName.ADMIN) &&
                    <Button size="lg" style={{ margin: 20, backgroundColor: '#EE7F46', border: '#EE7F46' }} onClick={() => { setSelectedId(null); handleOpen(); }}>
                        Crear Categoria
                    </Button>
                }
                <ModalCategoria
                    handleClose={handleClose}
                    showModal={showCategoriaModal}
                    editing={editing}
                    selectedId={selectedId}
                />
                <br />
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Denominacion</th>
                            <th>Categoria Padre</th>
                            {
                                (usuarioLogueado && usuarioLogueado.rol && usuarioLogueado.rol.rolName == RolName.ADMIN) &&
                                <th style={{ minWidth: "220px" }}>Opciones</th>
                            }

                        </tr>
                    </thead>
                    <tbody>
                        {categorias.map((categoria: Categoria, index) =>
                            <tr key={index}>
                                <td>{categoria.denominacion}</td>
                                <td>{categoria.categoriaPadre?.denominacion}</td>
                                {
                                    (usuarioLogueado && usuarioLogueado.rol && usuarioLogueado.rol.rolName == RolName.ADMIN) &&
                                    <td>
                                        <Button variant="outline-warning" style={{ maxHeight: "40px", marginRight: '10px' }}
                                            onClick={() => { setSelectedId(categoria.id); handleOpen(); }}>Modificar</Button>
                                        <Button variant="outline-danger" style={{ maxHeight: "40px" }}
                                            onClick={() => deleteCategoria(categoria.id)}>Eliminar</Button>
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