import ArticuloInsumo from "../entidades/ArticuloInsumo";


//GET
export async function getArticuloInsumo() {
    const INSTRUMENTOS_ENDPOINT = 'http://localhost:9000/instrumento/all';

    try {
        const response = await fetch(INSTRUMENTOS_ENDPOINT);

        if (!response.ok) {
            throw new Error(`Error al obtener los datos: ${response.status} ${response.statusText}`);
        }

        const json = await response.json();
        return json as ArticuloInsumo[];
    } catch (e) {
        throw new Error('Error al hacer fetch de instrumentos')
    }
}

export async function getArticuloInsumoPorID(id: number) {
    const INSTRUMENTO_ENDPOINT = `http://localhost:9000/instrumento/${id}`;

    try {
        const response = await fetch(INSTRUMENTO_ENDPOINT);

        if (!response.ok) {
            throw new Error(`Error al obtener los datos: ${response.status} ${response.statusText}`);
        }

        const json = await response.json();
        return json as ArticuloInsumo;
    } catch (e) {
        throw new Error('Error al hacer fetch de instrumentos')
    }
}

//POST - PUT
export async function saveArticuloInsumo(instrumento?: ArticuloInsumo) {
    let endpoint = 'http://localhost:9000/instrumento';
    let method: string = "POST";

    if (instrumento && instrumento.id != '') {
        endpoint = `http://localhost:9000/instrumento/${instrumento.id}`;
        method = "PUT";
    }

    await fetch(endpoint, {
        "method": method,
        "headers": {
            "Content-Type": 'application/json'
        },
        "body": JSON.stringify(instrumento)
    });
}

//DELETE
export async function deleteArticuloInsumo(id: number) {
    const DELETE_INSTRUMENTO_ENDPOINT = `http://localhost:9000/instrumento/${id}`

    try {
        const response = await fetch(DELETE_INSTRUMENTO_ENDPOINT, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error(`Error al eliminar el instrumento: ${response.status} ${response.statusText}`);
        }

        const isDeleted = await response.json();
        return isDeleted as boolean;
    } catch (e) {
        throw new Error('Error al hacer fetch de instrumentos')
    }
}
