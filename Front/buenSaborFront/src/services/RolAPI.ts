import Rol from "../models/Rol";

//GET
export async function getRoles() {
    const ENDPOINT = 'http://localhost:8080/rol/all';

    try {
        const response = await fetch(ENDPOINT);

        if (!response.ok) {
            throw new Error(`Error al obtener los datos: ${response.status} ${response.statusText}`);
        }

        const json = await response.json();
        return json as Rol[];
    } catch (e) {
        throw new Error('Error al hacer fetch de articuloInsumo')
    }
}