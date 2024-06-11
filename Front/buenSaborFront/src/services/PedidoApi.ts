import Pedido, { PedidoCliente } from "../models/Pedido";
import PedidosPorArticuloDTO from "../models/PedidosPorArticuloDTO";
import PedidosPorMesAnioDTO from "../models/PedidosPorMesAnioDTO";

//GET
export async function getPedidos() {
    const ENDPOINT = 'http://localhost:8080/pedido/all';

    try {
        const response = await fetch(ENDPOINT);

        if (!response.ok) {
            throw new Error(`Error al obtener los datos: ${response.status} ${response.statusText}`);
        }

        const json = await response.json();
        return json as Pedido[];
    } catch (e) {
        throw new Error('Error al hacer fetch de articuloInsumo')
    }
}

export async function getPedidosByCliente(clienteId: number) {
    const ENDPOINT = `http://localhost:8080/pedido/byCliente/${clienteId}`;

    try {
        const response = await fetch(ENDPOINT);

        if (!response.ok) {
            throw new Error(`Error al obtener los datos: ${response.status} ${response.statusText}`);
        }

        const json = await response.json();
        return json as [];
    } catch (e) {
        throw new Error('Error al hacer fetch de articuloInsumo')
    }
}

//POST - PUT
export async function savePedido(pedido?: PedidoCliente) {
    let endpoint = 'http://localhost:8080/pedido';
    let method: string = "POST";

    if (pedido && pedido.id !== 0) {
        endpoint = `http://localhost:8080/pedido/${pedido.id}`;
        method = "PUT";
    }

    const response = await fetch(endpoint, {
        "method": method,
        "headers": {
            "Content-Type": 'application/json'
        },
        "body": JSON.stringify(pedido)
    });

    return response.json();
}

//DELETE
export async function deletePedidoPorId(id: number) {
    const ENDPOINT = `http://localhost:8080/pedido/${id}`

    try {
        const response = await fetch(ENDPOINT, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error(`Error al eliminar el sucursal: ${response.status} ${response.statusText}`);
        }

        const isDeleted = await response.json();
        return isDeleted as boolean;
    } catch (e) {
        throw new Error('Error al hacer fetch de sucursal')
    }
}

export async function getPedidosPorMesAnio() {
    const ENDPOINT = 'http://localhost:8080/pedido/porMesAnio';

    try {
        const response = await fetch(ENDPOINT);

        if (!response.ok) {
            throw new Error(`Error al obtener los datos: ${response.status} ${response.statusText}`);
        }

        const json = await response.json();
        return json as PedidosPorMesAnioDTO[];
    } catch (e) {
        throw new Error('Error al hacer fetch de pedidos por mes y año');
    }
}

export async function getPedidosPorArticulo() {
    const ENDPOINT = 'http://localhost:8080/pedido/porArticulo';

    try {
        const response = await fetch(ENDPOINT);

        if (!response.ok) {
            throw new Error(`Error al obtener los datos: ${response.status} ${response.statusText}`);
        }

        const json = await response.json();
        console.log(json)
        return json as PedidosPorArticuloDTO[];
    } catch (e) {
        throw new Error('Error al hacer fetch de pedidos por articulo');
    }
}
