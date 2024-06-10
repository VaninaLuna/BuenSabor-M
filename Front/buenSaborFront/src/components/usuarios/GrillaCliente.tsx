import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { UsuarioCliente } from "../../models/Usuario";
import { getClientes } from "../../services/UsuarioClienteAPI";

export function GrillaCliente() {

    const [clientes, setClientes] = useState<UsuarioCliente[]>([]);

    const getListaDeClientes = async () => {
        const datos: UsuarioCliente[] = await getClientes();
        setClientes(datos);
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