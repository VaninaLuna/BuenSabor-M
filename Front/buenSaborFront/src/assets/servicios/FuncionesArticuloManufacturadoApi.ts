import ArticuloManufacturado from "../entidades/ArticuloManufacturado";

//GET
export async function getArticulosManufacturados() {
    const INSTRUMENTOS_ENDPOINT = 'http://localhost:8080/articuloManufacturado/all';

    try {
        const response = await fetch(INSTRUMENTOS_ENDPOINT);

        if (!response.ok) {
            throw new Error(`Error al obtener los datos: ${response.status} ${response.statusText}`);
        }

        const json = await response.json();
        return json as ArticuloManufacturado[];
    } catch (e) {
        throw new Error('Error al hacer fetch de articuloManufacturado')
    }
}

export async function getArticuloManufacturadoPorID(id: number) {
    const INSTRUMENTO_ENDPOINT = `http://localhost:8080/articuloManufacturado/${id}`;

    try {
        const response = await fetch(INSTRUMENTO_ENDPOINT);

        if (!response.ok) {
            throw new Error(`Error al obtener los datos: ${response.status} ${response.statusText}`);
        }

        const json = await response.json();
        return json as ArticuloManufacturado;
    } catch (e) {
        throw new Error('Error al hacer fetch de articuloManufacturado')
    }
}





//POST - PUT
export async function saveArticuloManufacturado(articuloManufacturado?: ArticuloManufacturado) {
    let endpoint = 'http://localhost:8080/articuloManufacturado';
    let method: string = "POST";

    if (articuloManufacturado && articuloManufacturado.id !== 0) {
        endpoint = `http://localhost:8080/articuloManufacturado/${articuloManufacturado.id}`;
        method = "PUT";
    }

    await fetch(endpoint, {
        "method": method,
        "headers": {
            "Content-Type": 'application/json'
        },
        "body": JSON.stringify(articuloManufacturado)
    });
}

//DELETE
export async function deleteArticuloManufacturadoXId(id: number) {
    const DELETE_INSTRUMENTO_ENDPOINT = `http://localhost:8080/articuloManufacturado/${id}`

    try {
        const response = await fetch(DELETE_INSTRUMENTO_ENDPOINT, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error(`Error al eliminar el articuloManufacturado: ${response.status} ${response.statusText}`);
        }

        const isDeleted = await response.json();
        return isDeleted as boolean;
    } catch (e) {
        throw new Error('Error al hacer fetch de articuloManufacturado')
    }
}
