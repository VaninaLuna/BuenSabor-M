import { UsuarioCliente } from "../models/Usuario";

//GET
export async function getUsuariosCliente() {
    const ENDPOINT = 'https://buensabor-back-hpyp.onrender.com/usuario_cliente/all';

    try {
        const response = await fetch(ENDPOINT);

        if (!response.ok) {
            throw new Error(`Error al obtener los datos: ${response.status} ${response.statusText}`);
        }

        const json = await response.json();
        return json as UsuarioCliente[];
    } catch (e) {
        throw new Error('Error al hacer fetch de articuloInsumo')
    }
}

export async function getUsuarioClientePorId(id: number) {
    const ENDPOINT = `https://buensabor-back-hpyp.onrender.com/usuario_cliente/${id}`;

    try {
        const response = await fetch(ENDPOINT);

        if (!response.ok) {
            throw new Error(`Error al obtener los datos: ${response.status} ${response.statusText}`);
        }

        const json = await response.json();
        return json as UsuarioCliente;
    } catch (e) {
        throw new Error('Error al hacer fetch de sucursal')
    }
}

export async function getEmpleados() {
    const ENDPOINT = `https://buensabor-back-hpyp.onrender.com/usuario_cliente/empleados`;

    try {
        const response = await fetch(ENDPOINT);

        if (!response.ok) {
            throw new Error(`Error al obtener los datos: ${response.status} ${response.statusText}`);
        }

        const json = await response.json();
        return json as UsuarioCliente[];
    } catch (e) {
        throw new Error('Error al hacer fetch de sucursal')
    }
}

export async function getClientes() {
    const ENDPOINT = `https://buensabor-back-hpyp.onrender.com/usuario_cliente/clientes`;

    try {
        const response = await fetch(ENDPOINT);

        if (!response.ok) {
            throw new Error(`Error al obtener los datos: ${response.status} ${response.statusText}`);
        }

        const json = await response.json();
        return json as UsuarioCliente[];
    } catch (e) {
        throw new Error('Error al hacer fetch de sucursal')
    }
}

//POST - PUT
export async function saveUsuarioCliente(usuarioCliente?: UsuarioCliente) {
    let endpoint = 'https://buensabor-back-hpyp.onrender.com/usuario_cliente';
    let method: string = "POST";

    if (usuarioCliente && usuarioCliente.id !== 0) {
        endpoint = `https://buensabor-back-hpyp.onrender.com/usuario_cliente/${usuarioCliente.id}`;
        method = "PUT";
    }

    await fetch(endpoint, {
        "method": method,
        "headers": {
            "Content-Type": 'application/json'
        },
        "body": JSON.stringify(usuarioCliente)
    });
}

export async function updateData(usuarioCliente?: UsuarioCliente) {
    const endpoint = 'https://buensabor-back-hpyp.onrender.com/usuario_cliente';

    await fetch(endpoint, {
        "method": "PUT",
        "headers": {
            "Content-Type": 'application/json'
        },
        "body": JSON.stringify(usuarioCliente)
    });
}

//DELETE
export async function deleteUsuarioClientePorId(id: number) {
    const ENDPOINT = `https://buensabor-back-hpyp.onrender.com/usuario_cliente/${id}`

    try {
        const response = await fetch(ENDPOINT, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error(`Error al eliminar el sucursal: ${response.status} ${response.statusText}`);
        }

        const isDeleted = await response.json();
        return isDeleted as boolean;
    } catch (e) {
        throw new Error('Error al hacer fetch de sucursal')
    }
}
