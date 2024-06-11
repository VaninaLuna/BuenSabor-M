import { Wallet, initMercadoPago } from "@mercadopago/sdk-react";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { PedidoCliente } from "../../models/Pedido";
import { savePreferenceMP } from "../../services/MercadoPagoApi";
import Factura from "../../models/Factura";
import { saveFactura } from "../../services/FacturaApi";

export function CheckoutMP({ pedido }: { pedido: PedidoCliente }) {
    const [preferenceId, setPreferenceId] = useState<string>('');

    useEffect(() => {
        initMercadoPago('TEST-7d543cd4-c0a9-4c4c-97ae-d50454fc3993', { locale: 'es-AR' });
    }, []);

    const getPreferenceMP = async () => {
        const preference = await savePreferenceMP(pedido);

        if (preference) {

            setPreferenceId(preference.id);

            if (preference.id) {
                await crearFactura(pedido);
            }
        }
    };

    const crearFactura = async (pedido: PedidoCliente) => {
        const factura = new Factura();
        factura.fechaFacturacion = pedido.fechaPedido;
        factura.mpPreferenceId = preferenceId;
        factura.totalVenta = pedido.total;
        factura.totalCosto = pedido.totalCosto;
        factura.pedido = pedido;
        factura.formaPago = "MercadoPago"

        await saveFactura(factura);
    }

    return (
        <>
            {/* <div className='text-center'>
                <Button variant="primary" className='text-center' size='lg' onClick={getPreferenceMP}>Generar Pago</Button>
                {
                    preferenceId
                        ? <Wallet initialization={{ preferenceId: preferenceId, redirectMode: "modal" }} customization={{ texts: { valueProp: 'smart_option' } }} />
                        : null
                }
            </div> */}

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