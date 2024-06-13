import { useEffect, useState } from "react";
import Pedido from "../../models/Pedido";
import { Button, Modal, Table } from "react-bootstrap";
import { deletePedidoPorId, getPedidos, getPedidosByCliente, getPedidosByCocinero, updateEstadoPedido } from "../../services/PedidoApi";
import { UsuarioCliente } from "../../models/Usuario";
import { RolName } from "../../models/RolName";

export function GrillaPedido() {

    const [pedidos, setPedidos] = useState<Pedido[]>([]);
    //Modal detalles
    const [showModalDetalles, setShowModalDetalles] = useState(false);
    const [selectedPedido, setSelectedPedido] = useState<Pedido | null>(null);
    //Estados del envio
    const [estadosEnvio] = useState<string[]>(["Recibido", "Aprobado", "En Preparacion", "Listo", "En camino", "Entregado"])

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [jsonUsuario] = useState<any>(localStorage.getItem('usuario'));
    const usuarioLogueado: UsuarioCliente = JSON.parse(jsonUsuario) as UsuarioCliente;

    const getListaPedidos = async () => {
        let datos: Pedido[] = []
        if (usuarioLogueado && usuarioLogueado.rol.rolName == RolName.CLIENTE) {
            datos = await getPedidosByCliente(usuarioLogueado.cliente.id)
        } else if (usuarioLogueado && usuarioLogueado.rol.rolName == RolName.COCINERO) {
            datos = await getPedidosByCocinero()
        } else {
            datos = await getPedidos();
        }
        setPedidos(datos);
    };

    const handleShowDetalles = (pedido: Pedido) => {
        setSelectedPedido(pedido)
        setShowModalDetalles(true);

    }

    const handleCloseDetalles = () => {
        setShowModalDetalles(false);
        setSelectedPedido(null);
    };

    const deletePedido = async (idPedido: number) => {
        await deletePedidoPorId(idPedido);
        window.location.reload();
    }

    const handleEstadoChange = async (pedido: Pedido, e: string) => {
        // Guardar el cambio
        await updateEstadoPedido(pedido.id, e);

        // Actualizar la lista
        getListaPedidos();
    };

    useEffect(() => {
        getListaPedidos();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'top', flexDirection: 'column', alignItems: 'center', minHeight: '100vh' }}>
                <h1 style={{ marginTop: '20px', color: "whitesmoke" }}>Pedidos</h1>



                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Nro Pedido</th>
                            <th>Fecha pedido</th>
                            <th>Hora estimada de finalizacion</th>
                            <th>Total</th>
                            <th>Total costo</th>
                            <th>Estado</th>
                            <th>Opciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pedidos.map((pedido: Pedido) =>
                            <tr key={pedido.id}>
                                <td>{String(pedido.id).padStart(5, '0')}</td>
                                <td>{pedido.fechaPedido}</td>
                                <td>{pedido.horaEstimadaFinalizacion}</td>
                                <td>{pedido.total}</td>
                                <td>{pedido.totalCosto}</td>
                                <td>
                                    <select value={pedido.estado} onChange={(e) => handleEstadoChange(pedido, e.target.value)}>
                                        {estadosEnvio.map((estado, index) =>
                                            <option key={index} value={estado}>{estado}</option>
                                        )}
                                    </select>

                                </td>

                                <td>
                                    {
                                        (usuarioLogueado && usuarioLogueado.rol && usuarioLogueado.rol.rolName == RolName.ADMIN) &&
                                        <>
                                            <Button variant="outline-danger" style={{ maxHeight: "40px", marginRight: '10px' }} onClick={() => deletePedido(pedido.id)}>Eliminar</Button>
                                        </>
                                    }
                                    <Button variant="outline-success" style={{ maxHeight: "40px", marginRight: '10px' }} onClick={() => handleShowDetalles(pedido)}>Detalle</Button>
                                </td>

                            </tr>
                        )}
                    </tbody>
                </Table>

                {
                    <Modal show={showModalDetalles} onHide={handleCloseDetalles}>
                        <Modal.Header closeButton>
                            <Modal.Title>Detalles del pedido</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {selectedPedido && selectedPedido.pedidoDetalles.map((detalle) => (
                                <p key={detalle.id}>
                                    <span style={{ fontWeight: 'bold' }}>Articulo:</span> {detalle.articulo.denominacion} <br />
                                    <img style={{ maxWidth: "80px", objectFit: "contain" }}
                                        className="cart-img"
                                        src={`${detalle.articulo.imagenes[0].url}`}
                                        alt={detalle.articulo.denominacion}
                                    /> <br /> <br />
                                    <span style={{ fontWeight: 'bold' }}>Cantidad:</span> {detalle.cantidad} <br />
                                    <span style={{ fontWeight: 'bold' }}>Subtotal:</span> {detalle.subTotal}
                                    <hr />
                                </p>
                            ))}
                        </Modal.Body>


                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleCloseDetalles}>
                                Cerrar
                            </Button>
                        </Modal.Footer>
                    </Modal>
                }
            </div>
        </>
    );
}