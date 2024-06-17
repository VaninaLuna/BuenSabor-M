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
        return json as Pedido[];
    } catch (e) {
        throw new Error('Error al hacer fetch de articuloInsumo')
    }
}

export async function getPedidosByEstado(estado: string) {
    const ENDPOINT = `http://localhost:8080/pedido/byEstado/${estado}`;

    try {
        const response = await fetch(ENDPOINT);

        if (!response.ok) {
            throw new Error(`Error al obtener los datos: ${response.status} ${response.statusText}`);
        }

        const json = await response.json();
        return json as Pedido[];
    } catch (e) {
        throw new Error('Error al hacer fetch de los pedidos')
    }
}

export async function getPedidosByCocinero() {
    const ENDPOINT = 'http://localhost:8080/pedido/byCocinero';

    try {
        const response = await fetch(ENDPOINT);

        if (!response.ok) {
            throw new Error(`Error al obtener los datos: ${response.status} ${response.statusText}`);
        }

        const json = await response.json();
        return json as Pedido[];
    } catch (e) {
        throw new Error('Error al hacer fetch de los pedidos')
    }
}

export async function getTiempoDemoraCocina() {
    const ENDPOINT = 'http://localhost:8080/pedido/tiempoEstimado';

    try {
        const response = await fetch(ENDPOINT);

        if (!response.ok) {
            throw new Error(`Error al obtener los datos: ${response.status} ${response.statusText}`);
        }

        const json = await response.json();
        return json;
    } catch (e) {
        throw new Error('Error al hacer fetch de los pedidos')
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

//POST - PUT
export async function savePedido(pedido?: PedidoCliente) {
    let endpoint = 'http://localhost:8080/pedido/guardar_pedido';
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

export async function updateEstadoPedido(pedidoId: number, estado: string) {
    const endpoint = `http://localhost:8080/pedido/actualizar_estado/${pedidoId}/${estado}`;

    const response = await fetch(endpoint, {
        "method": "PUT",
        "headers": {
            "Content-Type": 'application/json'
        }
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


//Delete logico
export async function updateEstadoEliminadoPedido(id: number) {
    const endpoint = `http://localhost:8080/pedido/cambiar_estado_eliminado/${id}`;

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
export async function getPedidoByEstaEliminado(eliminado: boolean) {
    const endpoint = `http://localhost:8080/pedido/esta_eliminado/${eliminado}`;

    try {
        const response = await fetch(endpoint);

        if (!response.ok) {
            throw new Error(`Error al obtener los datos: ${response.status} ${response.statusText}`);
        }

        const json = await response.json();
        return json as Pedido[];
    } catch (e) {
        throw new Error('Error al hacer fetch')
    }
}

