import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { UsuarioCliente } from "../../models/Usuario";
import { getUsuariosCliente } from "../../services/UsuarioClienteAPI";

export function GrillaCliente() {

    const [clientes, setClientes] = useState<UsuarioCliente[]>([]);

    const getListaDeClientes = async () => {
        const datos: UsuarioCliente[] = await getUsuariosCliente();

        // Filtrar los datos para incluir solo los usuarios que son clientes
        const clientes = datos.filter(usuario => usuario.rol.rolName === 'CLIENTE');

        console.log(JSON.stringify(clientes))

        setClientes(clientes);
    };

    useEffect(() => {
        getListaDeClientes();
    }, []);

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'top', flexDirection: 'column', alignItems: 'center', minHeight: '100vh' }}>
                <h1 style={{ marginTop: '20px' }}>Clientes</h1>

                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Fecha Nacimiento</th>
                            <th>Email</th>
                            <th>Telefono</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clientes.map((usuario: UsuarioCliente) =>
                            <tr key={usuario.id}>
                                <td>{usuario.cliente?.nombre}</td>
                                <td>{usuario.cliente?.apellido}</td>
                                <td>{usuario.cliente?.fechaNacimiento}</td>
                                <td>{usuario.cliente?.email}</td>
                                <td>{usuario.cliente?.telefono}</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>
        </>
    )
}