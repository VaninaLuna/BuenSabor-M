import { useState } from "react";
import "../../styles/Carrito.css";
import { CCloseButton, COffcanvas, COffcanvasBody, COffcanvasHeader } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilCart } from "@coreui/icons";
import PedidoDetalle from "../../models/PedidoDetalle";
import ArticuloDTO from "../../models/ArticuloDTO";
import { useCarrito } from "../../hooks/UseCarrito";
import Pedido from "../../models/Pedido";
import { savePedido } from "../../services/PedidoApi";
import { ModalMensaje } from "./ModalMensaje";

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
    const { cart, addCarrito, removeItemCarrito, limpiarCarritoDespuesPago, totalPedido } = useCarrito();
    const [showModal, setShowModal] = useState(false);
    // const [savedPedido, setSavedPedido] = useState<Pedido | null>(null);
    const [message, setMessage] = useState<string>('');
    // const [pagoRealizado, setPagoRealizado] = useState(false);
    // const [pedidoGuardado, setPedidoGuardado] = useState(false);

    // const [jsonUsuario] = useState<any>(localStorage.getItem('usuario'));
    // const usuarioLogueado: Usuario = JSON.parse(jsonUsuario) as Usuario;

    const guardarPedido = async () => {
        if (cart.length === 0) {
            setMessage("Al menos debe agregar un instrumento al carrito");
            setShowModal(true);
            return;
        }

        const pedido = new Pedido();
        pedido.total = totalPedido ?? 0;
        pedido.pedidoDetalles = cart;

        try {
            const pedidoFromDB: Pedido = await savePedido(pedido);
            // setSavedPedido(pedidoFromDB);
            setMessage(`El pedido con id ${pedidoFromDB.id} se guardó correctamente`);
            setShowModal(true);
            // setPedidoGuardado(true);
        } catch (error) {
            setMessage("Hubo un error al guardar el pedido. Intente nuevamente.");
            setShowModal(true);
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
        limpiarCarritoDespuesPago()
    };

    // useEffect(() => {
    //     if (pagoRealizado) {
    //         limpiarCarritoDespuesPago();
    //         setPedidoGuardado(false);
    //     }
    // }, [pagoRealizado, limpiarCarritoDespuesPago]);

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
                                        <CartItem key={detalle.id} item={detalle} addCarrito={addCarrito} removeItemCarrito={removeItemCarrito} />
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

                            <button onClick={guardarPedido}> Generar Pedido </button>

                            <ModalMensaje
                                showModal={showModal}
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
