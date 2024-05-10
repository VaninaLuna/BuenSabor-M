import Categoria from "../entidades/Categoria";

export async function getCategorias() {
    const INSTRUMENTOS_ENDPOINT = 'http://localhost:8080/categoria/all';

    try {
        const response = await fetch(INSTRUMENTOS_ENDPOINT);

        if (!response.ok) {
            throw new Error(`Error al obtener los datos: ${response.status} ${response.statusText}`);
        }

        const json = await response.json();
        return json as Categoria[];
    } catch (e) {
        throw new Error('Error al hacer fetch de articuloInsumo')
    }
}

export async function getCategoriaPorID(id: number) {
    const INSTRUMENTO_ENDPOINT = `http://localhost:8080/categoria/${id}`;

    try {
        const response = await fetch(INSTRUMENTO_ENDPOINT);

        if (!response.ok) {
            throw new Error(`Error al obtener los datos: ${response.status} ${response.statusText}`);
        }

        const json = await response.json();
        return json as Categoria;
    } catch (e) {
        throw new Error('Error al hacer fetch de articuloInsumo')
    }
}