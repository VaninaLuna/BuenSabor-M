import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Categoria from '../../models/Categoria';
import { deleteCategoriaPorID, getArbolCategorias } from '../../services/FuncionesCategoriaApi';
import { ModalCategoria } from './ModalCategoria';
import { Button } from 'react-bootstrap';
import { UsuarioCliente } from '../../models/Usuario';
import { RolName } from '../../models/RolName';

export function GrillaCategoria() {
    const [showCategoriaModal, setShowCategoriaModal] = useState(false);
    const [editing, setEditing] = useState(false);
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<Categoria | null>(null);
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [jsonUsuario] = useState<any>(localStorage.getItem('usuario'));
    const usuarioLogueado: UsuarioCliente = JSON.parse(jsonUsuario) as UsuarioCliente;

    const getListadoCategorias = async () => {
        const datos: Categoria[] = await getArbolCategorias();
        setCategorias(datos);
    };

    const handleOpen = async () => {
        setEditing(true)
        setShowCategoriaModal(true)
    }

    const handleClose = () => {
        setShowCategoriaModal(false);
        setEditing(false);
        setCategoriaSeleccionada(null);
    };

    const deleteCategoria = async (idCategoria: number) => {
        await deleteCategoriaPorID(idCategoria);
        //window.location.reload();
    }

    useEffect(() => {
        getListadoCategorias();
    }, []);

    const renderCategorias = (categorias: Categoria[], /*prefix: string = ''*/): JSX.Element[] => {
        return categorias.map((categoria: Categoria /*, index: number */) => {
            // const currentPrefix = prefix ? `${prefix}.${index + 1}` : `${index + 1}`;
            // categoria.codigo = currentPrefix
            return (
                <React.Fragment key={categoria.id}>
                    <tr>
                        <td>{categoria.codigo} {categoria.denominacion}</td>
                        {usuarioLogueado?.rol?.rolName === RolName.ADMIN && (
                            <td>
                                <Button variant="outline-warning" style={{ maxHeight: "40px", marginRight: '10px' }}
                                    onClick={() => { setCategoriaSeleccionada(categoria); handleOpen(); }}>Modificar</Button>
                                <Button variant="outline-danger" style={{ maxHeight: "40px" }}
                                    onClick={() => deleteCategoria(categoria.id)}>Eliminar</Button>
                            </td>
                        )}
                    </tr>
                    {renderCategorias(categoria.subCategorias, /*currentPrefix*/)}
                </React.Fragment>
            );
        });
    };

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'top', flexDirection: 'column', alignItems: 'center', minHeight: '100vh' }}>
                <h1 style={{ marginTop: '20px', color: "whitesmoke", backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: '15px 15px' }}>Categorias</h1>
                {
                    (usuarioLogueado && usuarioLogueado.rol && usuarioLogueado.rol.rolName == RolName.ADMIN) &&
                    <Button size="lg" style={{ margin: 20, backgroundColor: '#EE7F46', border: '#EE7F46' }} onClick={() => { setCategoriaSeleccionada(null); handleOpen(); }}>
                        Crear Categoria
                    </Button>
                }
                <ModalCategoria
                    handleClose={handleClose}
                    showModal={showCategoriaModal}
                    editing={editing}
                    categoriaSeleccionada={categoriaSeleccionada}
                />
                <br />
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Denominacion</th>
                            {/* <th>Categoria Padre</th> */}
                            {
                                (usuarioLogueado && usuarioLogueado.rol && usuarioLogueado.rol.rolName == RolName.ADMIN) &&
                                <th style={{ minWidth: "220px" }}>Opciones</th>
                            }

                        </tr>
                    </thead>
                    <tbody>
                        {renderCategorias(categorias)}
                        {/* {categorias.map((categoria: Categoria, index) =>
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
                        )} */}
                    </tbody>
                </Table>
            </div>
        </>
    );
}