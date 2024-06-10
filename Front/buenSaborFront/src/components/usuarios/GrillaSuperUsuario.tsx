import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { UsuarioCliente } from "../../models/Usuario";
import { getUsuariosCliente, saveUsuarioCliente } from "../../services/UsuarioClienteAPI";
import { RolName } from "../../models/RolName";
import Rol from "../../models/Rol";
import { getRoles } from "../../services/FuncionesRolesApi";

export function GrillaSuperUsuario() {

    const [usuarios, setUsuarios] = useState<UsuarioCliente[]>([]);
    const [roles, setRoles] = useState<Rol[]>([]);

    const getListaDeEmpleados = async () => {
        const datos: UsuarioCliente[] = await getUsuariosCliente();
        setUsuarios(datos);
    };

    const handleRolChange = async (usuario: UsuarioCliente, nuevoRolName: RolName) => {
        // Buscar el rol con el nombre seleccionado
        const nuevoRol = roles.find(rol => rol.rolName === nuevoRolName);

        if (!nuevoRol) {
            console.error(`No se encontró el rol con el nombre ${nuevoRolName}`);
            return;
        }

        // Actualizar el rol del usuario
        usuario.rol = nuevoRol;

        // Guardar el cambio
        await saveUsuarioCliente(usuario);

        // Actualizar la lista de usuarios
        getListaDeEmpleados();
    };

    useEffect(() => {
        getRoles().then(setRoles);
        getListaDeEmpleados();
    }, []);

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'top', flexDirection: 'column', alignItems: 'center', minHeight: '100vh' }}>
                <h1 style={{ marginTop: '20px' }}>Modificar Roles de los Usuarios</h1>

                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Cambiar Rol</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usuarios.map((usuario: UsuarioCliente) =>
                            <tr key={usuario.id}>
                                <td>{usuario.cliente?.nombre}</td>
                                <td>{usuario.cliente?.apellido}</td>
                                <td>
                                    <select value={usuario.rol.rolName} onChange={(e) => handleRolChange(usuario, e.target.value as RolName)}>
                                        {Object.values(RolName).map(rol =>
                                            <option key={rol} value={rol}>{rol}</option>
                                        )}
                                    </select>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>
        </>
    )
}