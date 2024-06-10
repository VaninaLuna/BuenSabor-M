import { useEffect, useState } from "react";
import { UsuarioCliente } from "../../models/Usuario";
import { getUsuariosCliente } from "../../services/UsuarioClienteAPI";
import { Table } from "react-bootstrap";
import { RolName } from "../../models/RolName";

export function GrillaEmpleado() {
    const [empleados, setEmpleados] = useState<UsuarioCliente[]>([]);

    const getListaDeEmpleados = async () => {
        const datos: UsuarioCliente[] = await getUsuariosCliente();

        // Filtrar los datos para incluir solo los usuarios que son empleados
        const empleados = datos.filter(usuario => {
            return [RolName.CAJERO, RolName.DELIVERY, RolName.COCINERO].includes(usuario.rol.rolName);
        });

        console.log(JSON.stringify(empleados))

        setEmpleados(empleados);
    };

    useEffect(() => {
        getListaDeEmpleados();
    }, []);

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'top', flexDirection: 'column', alignItems: 'center', minHeight: '100vh' }}>
                <h1 style={{ marginTop: '20px' }}>Empleados</h1>

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
                        {empleados.map((usuario: UsuarioCliente) =>
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