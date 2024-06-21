import Cliente from "../models/Cliente";


//GET
export async function getClientePorUsuarioClienteId(id: number) {
    const ENDPOINT = `https://buensabor-back-hpyp.onrender.com/cliente/usuario_cliente_id/${id}`;

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

//POST - PUT
export async function saveCliente(cliente?: Cliente) {
    let endpoint = 'https://buensabor-back-hpyp.onrender.com/cliente';
    let method: string = "POST";

    if (cliente && cliente.id !== 0) {
        endpoint = `https://buensabor-back-hpyp.onrender.com/cliente/${cliente.id}`;
        method = "PUT";
    }

    const response = await fetch(endpoint, {
        "method": method,
        "headers": {
            "Content-Type": 'application/json'
        },
        "body": JSON.stringify(cliente)
    });

    return response.json() as Promise<Cliente>;
}