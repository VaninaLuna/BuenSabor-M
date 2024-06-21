import Pais from "../models/Pais";

//GET
export async function getPaises() {
    const ENDPOINT = 'https://buensabor-back-hpyp.onrender.com/pais/all';

    try {
        const response = await fetch(ENDPOINT);

        if (!response.ok) {
            throw new Error(`Error al obtener los datos: ${response.status} ${response.statusText}`);
        }

        const json = await response.json();
        return json as Pais[];
    } catch (e) {
        throw new Error('Error al hacer fetch de articuloInsumo')
    }
}
