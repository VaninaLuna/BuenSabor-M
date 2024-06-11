import { Wallet, initMercadoPago } from "@mercadopago/sdk-react";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { PedidoCliente } from "../../models/Pedido";
import { savePreferenceMP } from "../../services/MercadoPagoApi";
import Factura from "../../models/Factura";
import { saveFactura } from "../../services/FacturaApi";
import PedidoDetalle from "../../models/PedidoDetalle";
import { UsuarioCliente } from "../../models/Usuario";
import Cliente from "../../models/Cliente";
import { savePedido } from "../../services/PedidoApi";
import { ModalMensaje } from "./ModalMensaje";

type CheckoutMPParams = {
    cart: PedidoDetalle[];
    totalPedido: number;
    totalCosto: number;
    usuarioLogueado: UsuarioCliente;
}

export function CheckoutMP({ cart, totalPedido, totalCosto, usuarioLogueado }: CheckoutMPParams) {
    const [preferenceId, setPreferenceId] = useState<string>('');
    const [showModal, setShowModal] = useState(false);
    const [message, setMessage] = useState<string>('');
    const [pedidoGuardado, setPedidoGuardado] = useState<PedidoCliente>(new PedidoCliente());

    useEffect(() => {
        initMercadoPago('TEST-7d543cd4-c0a9-4c4c-97ae-d50454fc3993', { locale: 'es-AR' });
    }, []);

    const getPreferenceMP = async () => {
        try {
            const fechaPedido = new Date();
            const pedido = new PedidoCliente();
            pedido.total = totalPedido ?? 0;
            pedido.totalCosto = totalCosto ?? 0;
            pedido.pedidoDetalles = cart;

            const dia = fechaPedido.getDate().toString().padStart(2, '0');
            const mes = (fechaPedido.getMonth() + 1).toString().padStart(2, '0');
            const año = fechaPedido.getFullYear();
            pedido.fechaPedido = `${dia}/${mes}/${año}`;

            fechaPedido.setMinutes(fechaPedido.getMinutes() + 30);
            const horas = fechaPedido.getHours().toString().padStart(2, '0');
            const minutos = fechaPedido.getMinutes().toString().padStart(2, '0');
            const segundos = fechaPedido.getSeconds().toString().padStart(2, '0');
            pedido.horaEstimadaFinalizacion = `${horas}:${minutos}:${segundos}`;

            const clienteActualizado = JSON.parse(JSON.stringify(usuarioLogueado.cliente)) as Cliente;

            pedido.cliente = clienteActualizado;

            try {
                const pedidoFromDB: PedidoCliente = await savePedido(pedido);

                console.log(pedidoFromDB);

                if (pedidoFromDB.id) {
                    setPedidoGuardado(pedidoFromDB);

                    const preference = await savePreferenceMP(pedidoFromDB);

                    if (preference) {

                        setPreferenceId(preference.id);

                        if (preference.id) {
                            await crearFactura(pedidoFromDB);
                        }
                    }
                }
            } catch (error) {
                setMessage("Hubo un error al guardar el pedido. Intente nuevamente.");
                //setShowModal(true);
            }
        } catch (error) {
            setMessage("Hubo un error al generar la preferencia de pago.");
            //setShowModal(true);
        }
    };

    const crearFactura = async (pedido: PedidoCliente) => {
        try {
            const factura = new Factura();
            factura.fechaFacturacion = pedido.fechaPedido;
            factura.mpPreferenceId = preferenceId;
            factura.totalVenta = pedido.total;
            factura.totalCosto = pedido.totalCosto;
            factura.pedido = pedido;
            factura.formaPago = "MercadoPago"

            await saveFactura(factura);

            setShowModal(true);
        } catch (error) {
            setMessage("Hubo un error al crear la factura. Intente nuevamente.");
            //setShowModal(true);
        }
    }

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <>
            <div className='text-center'>
                <Button variant="primary" className='text-center' size='lg' onClick={getPreferenceMP}>Generar Pago</Button>
                {
                    preferenceId
                        ? <Wallet initialization={{ preferenceId: preferenceId, redirectMode: "modal" }} customization={{ texts: { valueProp: 'smart_option' } }} />
                        : null
                }
            </div>

            {/* <div className='text-center'>

                {
                    pedidoGuardado.id !== 0
                        ?
                        <Button variant="primary" className='text-center' size='lg' onClick={getPreferenceMP}>Generar Pago</Button>
                        : null
                }

                {
                    preferenceId
                        ? <Wallet initialization={{ preferenceId: preferenceId, redirectMode: "blank" }} customization={{ texts: { valueProp: 'smart_option' } }} />
                        : null
                }
            </div> */}

            <ModalMensaje
                showModal={showModal}
                pedido={pedidoGuardado}
                message={message}
                handleClose={handleCloseModal}
            />
        </>
    )
}