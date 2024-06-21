import Factura from "../models/Factura";

//GET
export async function getFacturas() {
    const ENDPOINT = 'https://buensabor-back-hpyp.onrender.com/factura/all';

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

export async function getFacturasByCliente(clienteId: number) {
    const ENDPOINT = `https://buensabor-back-hpyp.onrender.com/factura/byCliente/${clienteId}`;

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

export function getFacturaPDF(id: number) {
    return `https://buensabor-back-hpyp.onrender.com/factura/download_pdf_factura/${id}`
}

export async function sendMailFactura(facturaId: number, mailCliente: string) {
    const ENDPOINT = `https://buensabor-back-hpyp.onrender.com/factura/send_pdf_factura/${facturaId}/${mailCliente}`;

    try {
        const response = await fetch(ENDPOINT);

        if (!response.ok) {
            throw new Error(`Error al obtener los datos: ${response.status} ${response.statusText}`);
        }

    } catch (e) {
        throw new Error('Error al enviar la factura por correo electrónico')
    }
}

//POST - PUT
export async function saveFactura(factura?: Factura) {
    let endpoint = 'https://buensabor-back-hpyp.onrender.com/factura';
    let method: string = "POST";

    if (factura && factura.id !== 0) {
        endpoint = `https://buensabor-back-hpyp.onrender.com/factura/${factura.id}`;
        method = "PUT";
    }

    const response = await fetch(endpoint, {
        "method": method,
        "headers": {
            "Content-Type": 'application/json'
        },
        "body": JSON.stringify(factura)
    });

    return response.json();
}

//DELETE
export async function deleteFacturaPorId(id: number) {
    const ENDPOINT = `https://buensabor-back-hpyp.onrender.com/factura/${id}`

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