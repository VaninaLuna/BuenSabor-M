import UnidadMedida from "../models/UnidadMedida";

export async function getUnidadesMedidas() {
    const INSTRUMENTOS_ENDPOINT = 'https://buensabor-back-hpyp.onrender.com/unidadMedida/all';

    try {
        const response = await fetch(INSTRUMENTOS_ENDPOINT);

        if (!response.ok) {
            throw new Error(`Error al obtener los datos: ${response.status} ${response.statusText}`);
        }

        const json = await response.json();
        return json as UnidadMedida[];
    } catch (e) {
        throw new Error('Error al hacer fetch de articuloInsumo')
    }
}

export async function getUnidadMedidaPorID(id: number) {
    const INSTRUMENTO_ENDPOINT = `https://buensabor-back-hpyp.onrender.com/unidadMedida/${id}`;

    try {
        const response = await fetch(INSTRUMENTO_ENDPOINT);

        if (!response.ok) {
            throw new Error(`Error al obtener los datos: ${response.status} ${response.statusText}`);
        }

        const json = await response.json();
        return json as UnidadMedida;
    } catch (e) {
        throw new Error('Error al hacer fetch de articuloInsumo')
    }
}

export async function saveUnidadMedida(unidadMedida?: UnidadMedida) {
    let endpoint = 'https://buensabor-back-hpyp.onrender.com/unidadMedida';
    let method: string = "POST";

    if (unidadMedida && unidadMedida.id !== 0) {
        endpoint = `https://buensabor-back-hpyp.onrender.com/unidadMedida/${unidadMedida.id}`;
        method = "PUT";
    }

    await fetch(endpoint, {
        "method": method,
        "headers": {
            "Content-Type": 'application/json'
        },
        "body": JSON.stringify(unidadMedida)
    });
}

//DELETE
export async function deleteUnidadMedidaPorID(id: number) {
    const DELETE_INSTRUMENTO_ENDPOINT = `https://buensabor-back-hpyp.onrender.com/unidadMedida/${id}`

    try {
        const response = await fetch(DELETE_INSTRUMENTO_ENDPOINT, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error(`Error al eliminar la unidadMedida: ${response.status} ${response.statusText}`);
        }

        const isDeleted = await response.json();
        return isDeleted as boolean;
    } catch (e) {
        throw new Error('Error al hacer fetch de unidadMedida')
    }
}

//Delete logico
export async function updateEstadoEliminadoUM(id: number) {
    const endpoint = `https://buensabor-back-hpyp.onrender.com/unidadMedida/cambiar_estado_eliminado/${id}`;

    try {
        const response = await fetch(endpoint, {
            "method": "PUT",
            "headers": {
                "Content-Type": 'application/json'
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (e) {
        throw new Error('Error al cambiar el estado eliminado')
    }
}

//Get eliminados o no eliminados
export async function getUMByEstaEliminado(eliminado: boolean) {
    const endpoint = `https://buensabor-back-hpyp.onrender.com/unidadMedida/esta_eliminado/${eliminado}`;

    try {
        const response = await fetch(endpoint);

        if (!response.ok) {
            throw new Error(`Error al obtener los datos: ${response.status} ${response.statusText}`);
        }

        const json = await response.json();
        return json as UnidadMedida[];
    } catch (e) {
        throw new Error('Error al hacer fetch')
    }
}