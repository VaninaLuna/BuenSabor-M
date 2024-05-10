import UnidadMedida from "../entidades/UnidadMedida";

export async function getUnidades() {
    const INSTRUMENTOS_ENDPOINT = 'http://localhost:8080/unidadMedida/all';

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

export async function getUnidadesPorID(id: number) {
    const INSTRUMENTO_ENDPOINT = `http://localhost:8080/unidadMedida/${id}`;

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