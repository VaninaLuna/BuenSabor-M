import Sucursal from "../models/Sucursal";

//GET
export async function getSucursales() {
    const ENDPOINT = 'https://buensabor-back-hpyp.onrender.com/sucursal/all';

    try {
        const response = await fetch(ENDPOINT);

        if (!response.ok) {
            throw new Error(`Error al obtener los datos: ${response.status} ${response.statusText}`);
        }

        const json = await response.json();
        return json as Sucursal[];
    } catch (e) {
        throw new Error('Error al hacer fetch de articuloInsumo')
    }
}

export async function getSucursalPorId(id: number) {
    const ENDPOINT = `https://buensabor-back-hpyp.onrender.com/sucursal/${id}`;

    try {
        const response = await fetch(ENDPOINT);

        if (!response.ok) {
            throw new Error(`Error al obtener los datos: ${response.status} ${response.statusText}`);
        }

        const json = await response.json();
        return json as Sucursal;
    } catch (e) {
        throw new Error('Error al hacer fetch de sucursal')
    }
}

//POST - PUT
export async function saveSucursal(sucursal?: Sucursal) {
    let endpoint = 'https://buensabor-back-hpyp.onrender.com/sucursal';
    let method: string = "POST";

    if (sucursal && sucursal.id !== 0) {
        endpoint = `https://buensabor-back-hpyp.onrender.com/sucursal/${sucursal.id}`;
        method = "PUT";
    }

    await fetch(endpoint, {
        "method": method,
        "headers": {
            "Content-Type": 'application/json'
        },
        "body": JSON.stringify(sucursal)
    });
}

//DELETE
export async function deleteSucursalPorId(id: number) {
    const ENDPOINT = `https://buensabor-back-hpyp.onrender.com/sucursal/${id}`

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
