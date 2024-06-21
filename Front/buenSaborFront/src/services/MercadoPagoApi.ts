// ---------- PEDIDO / CREATE PREFERENCE MERCADO-PAGO  ------------

import Pedido from "../models/Pedido";
import PreferenceMP from "../models/mercadoPago/PreferenceMP";

export async function savePreferenceMP(pedido?: Pedido) {
    const endpoint = 'https://buensabor-back-hpyp.onrender.com/pedido/create_preference_mp';

    const response = await fetch(endpoint, {
        "method": "POST",
        "headers": {
            "Content-Type": 'application/json'
        },
        "body": JSON.stringify(pedido)
    });

    const json = await response.json();
    return json as PreferenceMP
}