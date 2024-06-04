import Pedido from "../models/Pedido";

export async function savePedido(pedido?: Pedido) {
    const endpoint = 'http://localhost:8080/pedido';

    const response = await fetch(endpoint, {
        "method": "POST",
        "headers": {
            "Content-Type": 'application/json'
        },
        "body": JSON.stringify(pedido)
    });

    return response.json();
}