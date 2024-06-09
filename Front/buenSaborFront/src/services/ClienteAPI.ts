import Cliente from "../models/Cliente";

//GET
export async function getClientePorUsuarioClienteId(id: number) {
    const ENDPOINT = `http://localhost:8080/cliente/usuario_cliente_id/${id}`;

    try {
        const response = await fetch(ENDPOINT);

        if (!response.ok) {
            throw new Error(`Error al obtener los datos: ${response.status} ${response.statusText}`);
        }

        const json = await response.json();
        return json as Cliente;
    } catch (e) {
        throw new Error('Error al hacer fetch de articuloInsumo')
    }
}