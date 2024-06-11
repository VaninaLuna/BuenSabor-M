import { useEffect, useState } from "react";
import "../../styles/Carrito.css";
import { CCloseButton, COffcanvas, COffcanvasBody, COffcanvasHeader } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilCart } from "@coreui/icons";
import PedidoDetalle from "../../models/PedidoDetalle";
import ArticuloDTO from "../../models/ArticuloDTO";
import { useCarrito } from "../../hooks/UseCarrito";
import { PedidoCliente } from "../../models/Pedido";
import { savePedido } from "../../services/PedidoApi";
import { ModalMensaje } from "./ModalMensaje";
import { CheckoutMP } from "./CheckOut";
import { UsuarioCliente } from "../../models/Usuario";
import Cliente from "../../models/Cliente";
import { Form } from "react-bootstrap";

function CartItem({ item, addCarrito, removeItemCarrito }: { item: PedidoDetalle, addCarrito: (articulo: ArticuloDTO) => void, removeItemCarrito: (articulo: ArticuloDTO) => void }) {
    return (
        <li key={item.id}>
            <img
                className="cart-img"
                src={`${item.articulo.imagenes[0].url}`}
                alt={item.articulo.denominacion}
            />
            <div style={{ marginBottom: '10px' }}>
                <strong>{item.articulo.denominacion}</strong> - ${item.articulo.precioVenta}
            </div>
            <footer>
                <button onClick={() => removeItemCarrito(item.articulo)}>-</button>
                <small>
                    {item.cantidad} {item.cantidad === 1 ? 'unidad' : 'unidades'}
                </small>
                <button type="button" onClick={() => addCarrito(item.articulo)}>+</button>
            </footer>
        </li>
    );
}

export function Carrito({ visible, setVisible }: { visible: boolean, setVisible: (visible: boolean) => void }) {
    const { cart, addCarrito, removeItemCarrito, limpiarCarritoDespuesPago, totalPedido, totalCosto } = useCarrito();
    const [showModal, setShowModal] = useState(false);
    const [message, setMessage] = useState<string>('');
    const [pedidoGuardado, setPedidoGuardado] = useState<PedidoCliente>(new PedidoCliente());
    const [pagoRealizado] = useState(false);
    const [tipoEnvio, setTipoEnvio] = useState('');
    const [formaPago, setFormaPago] = useState('');

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [jsonUsuario] = useState<any>(localStorage.getItem('usuario'));
    const usuarioLogueado: UsuarioCliente = JSON.parse(jsonUsuario) as UsuarioCliente;

    const handleTipoEnvioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTipoEnvio(e.target.id);
        setFormaPago('');

        if (e.target.id === 'delivery') {
            handleFormaPagoChange({ target: { id: 'mp' } } as React.ChangeEvent<HTMLInputElement>);
        }
    };

    const handleFormaPagoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormaPago(e.target.id);
    };

    const guardarPedidoEfectivo = async () => {
        if (cart.length === 0) {
            setMessage("Al menos debe agregar un articulo al carrito");
            //setShowModal(true);
            return;
        }

        if (tipoEnvio === 'delivery' && !usuarioLogueado.cliente.domicilio) {
            setMessage("Debe configurar su domicilio antes de generar un pedido con envío");
            //setShowModal(true);
            return;
        }

        const fechaPedido = new Date();
        const pedido: PedidoCliente = new PedidoCliente();
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
            setPedidoGuardado(pedidoFromDB);
            ////setShowModal(true);
        } catch (error) {
            setMessage("Hubo un error al guardar el pedido. Intente nuevamente.");
            //setShowModal(true);
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    useEffect(() => {
        if (pagoRealizado) {
            limpiarCarritoDespuesPago();
        }
    }, [pagoRealizado, limpiarCarritoDespuesPago]);

    return (
        <>
            <COffcanvas placement="end" visible={visible} scroll={true} onHide={() => setVisible(false)} className="text-center cart">
                <COffcanvasHeader className="text-center">
                    <CCloseButton className="text-reset" onClick={() => setVisible(false)} />
                </COffcanvasHeader>
                <COffcanvasBody>
                    <h4><CIcon className="text-success" size="xl" style={{ marginRight: '10px' }} icon={cilCart} />
                        Carrito de Compras</h4>
                    <hr />
                    {cart && cart.length > 0 ? (
                        <>
                            <ul>
                                {
                                    cart.map(detalle =>
                                        <CartItem key={detalle.articulo.id} item={detalle} addCarrito={addCarrito} removeItemCarrito={removeItemCarrito} />
                                    )
                                }
                            </ul>
                            <div>
                                <h3>Total: ${totalPedido}</h3>
                            </div>
                            <br />
                            <button title='Limpiar Todo' onClick={() => limpiarCarritoDespuesPago()}>
                                <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' strokeWidth='1' stroke='currentColor' fill='none' strokeLinecap='round' strokeLinejoin='round'>
                                    <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                                    <path d='M6 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0' />
                                    <path d='M17 17a2 2 0 1 0 2 2' />
                                    <path d='M17 17h-11v-11' />
                                    <path d='M9.239 5.231l10.761 .769l-1 7h-2m-4 0h-7' />
                                    <path d='M3 3l18 18' />
                                </svg>
                            </button>
                            <br />
                            <br />

                            {
                                usuarioLogueado && usuarioLogueado.rol && (
                                    <>
                                        <Form>
                                            <Form.Group className="d-flex" style={{ justifyContent: 'space-evenly', marginTop: '50px', marginBottom: '50px' }}>
                                                <Form.Check type="radio" label="Envío a domicilio"
                                                    id="delivery" checked={tipoEnvio === 'delivery'} onChange={handleTipoEnvioChange}
                                                />
                                                <Form.Check type="radio" label="Retiro en el local" id="pickup"
                                                    checked={tipoEnvio === 'pickup'} onChange={handleTipoEnvioChange}
                                                />
                                            </Form.Group>

                                            {tipoEnvio && (
                                                <Form.Group className="d-flex" style={{ justifyContent: 'space-evenly', marginTop: '50px', marginBottom: '50px' }}>
                                                    <Form.Check type="radio" label="MercadoPago" id="mp" disabled={tipoEnvio === 'delivery'}
                                                        checked={formaPago === 'mp'} onChange={handleFormaPagoChange}
                                                    />
                                                    <Form.Check type="radio" label="Efectivo" id="efectivo" disabled={tipoEnvio === 'delivery'}
                                                        checked={formaPago === 'efectivo'} onChange={handleFormaPagoChange}
                                                    />
                                                </Form.Group>
                                            )}
                                        </Form>
                                        <div className="cart-actions">
                                            {formaPago === "mp" && (
                                                <CheckoutMP cart={cart} totalPedido={totalPedido}
                                                    totalCosto={totalCosto} usuarioLogueado={usuarioLogueado} />
                                            )}
                                            {formaPago === "efectivo" && (
                                                <button onClick={guardarPedidoEfectivo}>Finalizar pedido</button>
                                            )}
                                        </div>

                                    </>
                                )
                            }

                            <ModalMensaje
                                showModal={showModal}
                                pedido={pedidoGuardado}
                                message={message}
                                handleClose={handleCloseModal}
                            />
                        </>
                    ) : (
                        <p>No hay productos en el carrito.</p>
                    )}
                </COffcanvasBody>
            </COffcanvas>
        </>
    );
}
