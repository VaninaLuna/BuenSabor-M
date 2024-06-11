import { Wallet, initMercadoPago } from "@mercadopago/sdk-react";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Pedido from "../../models/Pedido";
import { savePreferenceMP } from "../../services/MercadoPagoApi";
import Factura from "../../models/Factura";
import { saveFactura } from "../../services/FacturaApi";

type CheckoutMPParams = {
    pedido: Pedido;
}

export function CheckoutMP({ pedido }: CheckoutMPParams) {

    const [preferenceId, setPreferenceId] = useState<string>('');

    const getPreferenceMP = async () => {

        const preference = await savePreferenceMP(pedido);

        if (preference) setPreferenceId(preference.id)

        crearFactura(preference.id);
    }

    const crearFactura = async (preferenceId: string) => {

        const factura = new Factura();

        factura.fechaFacturacion = pedido.fechaPedido;
        factura.mpPreferenceId = preferenceId;
        factura.totalVenta = pedido.total;
        factura.totalCosto = pedido.totalCosto;
        factura.pedido = pedido;
        factura.formaPago = "MercadoPago"

        await saveFactura(factura);
    }

    useEffect(() => {
        initMercadoPago('TEST-7d543cd4-c0a9-4c4c-97ae-d50454fc3993', { locale: 'es-AR' });
    }, []);

    return (
        <>
            <div className='text-center'>

                {
                    pedido.id !== 0
                        ?
                        <Button variant="primary" className='text-center' size='lg' onClick={getPreferenceMP}>Generar Pago</Button>
                        : null
                }

                {
                    preferenceId
                        ? <Wallet initialization={{ preferenceId: preferenceId, redirectMode: "blank" }} customization={{ texts: { valueProp: 'smart_option' } }} />
                        : null
                }
            </div>
        </>
    )
}