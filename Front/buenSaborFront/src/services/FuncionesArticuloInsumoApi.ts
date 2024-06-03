import ArticuloInsumo from "../models/ArticuloInsumo";


//GET
export async function getArticulosInsumos() {
    const ENDPOINT = 'http://localhost:8080/articuloInsumo/all';

    try {
        const response = await fetch(ENDPOINT);

        if (!response.ok) {
            throw new Error(`Error al obtener los datos: ${response.status} ${response.statusText}`);
        }

        const json = await response.json();
        return json as ArticuloInsumo[];
    } catch (e) {
        throw new Error('Error al hacer fetch de articuloInsumo')
    }
}
export async function getArticulosInsumosByEsParaElaborar(esParaElaborar: boolean) {
    const ENDPOINT = `http://localhost:8080/articuloInsumo//esParaElaborar/${esParaElaborar}`;

    try {
        const response = await fetch(ENDPOINT);

        if (!response.ok) {
            throw new Error(`Error al obtener los datos: ${response.status} ${response.statusText}`);
        }

        const json = await response.json();
        return json as ArticuloInsumo[];
    } catch (e) {
        throw new Error('Error al hacer fetch de articuloInsumo')
    }
}

export async function getArticuloInsumoPorID(id: number) {
    const ENDPOINT = `http://localhost:8080/articuloInsumo/${id}`;

    try {
        const response = await fetch(ENDPOINT);

        if (!response.ok) {
            throw new Error(`Error al obtener los datos: ${response.status} ${response.statusText}`);
        }

        const json = await response.json();
        return json as ArticuloInsumo;
    } catch (e) {
        throw new Error('Error al hacer fetch de articuloInsumo')
    }
}

//POST - PUT
export async function saveArticuloInsumo(articuloInsumo?: ArticuloInsumo) {
    let endpoint = 'http://localhost:8080/articuloInsumo';
    let method: string = "POST";

    if (articuloInsumo && articuloInsumo.id !== 0) {
        endpoint = `http://localhost:8080/articuloInsumo/${articuloInsumo.id}`;
        method = "PUT";
    }

    await fetch(endpoint, {
        "method": method,
        "headers": {
            "Content-Type": 'application/json'
        },
        "body": JSON.stringify(articuloInsumo)
    });
}

//DELETE
export async function deleteArticuloInsumoPorID(id: number) {
    const DELETE_ENDPOINT = `http://localhost:8080/articuloInsumo/${id}`

    try {
        const response = await fetch(DELETE_ENDPOINT, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error(`Error al eliminar el articuloInsumo: ${response.status} ${response.statusText}`);
        }

        const isDeleted = await response.json();
        return isDeleted as boolean;
    } catch (e) {
        throw new Error('Error al hacer fetch de articuloInsumo')
    }
}
