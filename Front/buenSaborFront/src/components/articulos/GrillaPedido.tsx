import { useEffect, useState } from "react";
import Pedido from "../../models/Pedido";
import { Button, Modal, Table } from "react-bootstrap";
import { getPedidoByEstaEliminado, getPedidosByCliente, getPedidosByCocinero, updateEstadoEliminadoPedido, updateEstadoPedido } from "../../services/PedidoApi";
import { UsuarioCliente } from "../../models/Usuario";
import { RolName } from "../../models/RolName";

export function GrillaPedido() {

    const [pedidos, setPedidos] = useState<Pedido[]>([]);
    //Modal detalles
    const [showModalDetalles, setShowModalDetalles] = useState(false);
    const [selectedPedido, setSelectedPedido] = useState<Pedido | null>(null);
    //Estados del envio
    const [estadosEnvio] = useState<string[]>(["Recibido", "Aprobado", "En Preparacion", "Listo", "En camino", "Entregado"])

    //estado para alternar entre obtener datos con eliminacion logica o no
    const [eliminados, setEliminados] = useState<boolean>(false);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [jsonUsuario] = useState<any>(localStorage.getItem('usuario'));
    const usuarioLogueado: UsuarioCliente = JSON.parse(jsonUsuario) as UsuarioCliente;

    const getListaPedidos = async () => {
        let datos: Pedido[] = []
        if (usuarioLogueado && usuarioLogueado.rol.rolName == RolName.CLIENTE) {
            console.log("cliente")
            datos = await getPedidosByCliente(usuarioLogueado.cliente.id)
        } else if (usuarioLogueado && usuarioLogueado.rol.rolName == RolName.COCINERO) {
            console.log("cocinero")
            datos = await getPedidosByCocinero()
        } else {
            console.log("eliminado")
            datos = await getPedidoByEstaEliminado(eliminados);
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

    const handleEstadoChange = async (pedido: Pedido, e: string) => {
        // Guardar el cambio
        await updateEstadoPedido(pedido.id, e);

        // Actualizar la lista
        getListaPedidos();
    };

    const updateEstadoDelete = async (id: number) => {

        console.log(id)

        await updateEstadoEliminadoPedido(id);
        getListaPedidos();
    }

    useEffect(() => {
        getListaPedidos();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [eliminados]);


    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'top', flexDirection: 'column', alignItems: 'center', minHeight: '100vh' }}>
                <h1 style={{ marginTop: '20px', color: "whitesmoke", backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: '15px 15px' }}>{eliminados ? "Pedidos Eliminados" : "Pedidos"}</h1>



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
                                            {
                                                eliminados
                                                    ?
                                                    <Button variant="outline-info" style={{ maxHeight: "40px", marginRight: '10px' }}
                                                        onClick={() => updateEstadoDelete(pedido.id)}>Restaurar</Button>
                                                    :
                                                    <Button variant="outline-danger" style={{ maxHeight: "40px", marginRight: '10px' }}

                                                        onClick={() => updateEstadoDelete(pedido.id)}>Eliminar</Button>
                                            }
                                        </>
                                    }
                                    <Button variant="outline-success" style={{ maxHeight: "40px", marginRight: '10px' }} onClick={() => handleShowDetalles(pedido)}>Detalle</Button>
                                </td>

                            </tr>
                        )}
                    </tbody>
                </Table>

                <div style={{ width: '100%', display: "flex", justifyContent: 'flex-end' }}>
                    <Button size="lg" style={{ margin: 10, backgroundColor: '#478372', border: '#478372' }} onClick={() => { setEliminados(!eliminados) }}>
                        {eliminados ? "Ver Actuales" : "Ver Eliminados"}
                    </Button>
                </div>

                {
                    <Modal show={showModalDetalles} onHide={handleCloseDetalles}>
                        <Modal.Header closeButton>
                            <Modal.Title>Detalles del pedido</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>

                            {selectedPedido && selectedPedido.pedidoDetalles.map((detalle) => (
                                <p key={detalle.id}>


                                    <p>{<h5><span style={{ fontWeight: 'bold' }}>Fecha </span> </h5>}</p>
                                    <p>{<span style={{ fontWeight: 'bold' }}></span>} {selectedPedido.fechaPedido}</p>
                                    <p>{<h5><span style={{ fontWeight: 'bold' }}>Hora del pedido </span> </h5>}</p>
                                    <p>{<span style={{ fontWeight: 'bold' }}></span>} {selectedPedido.horaEstimadaFinalizacion}</p>

                                    <p>{<h5><span style={{ fontWeight: 'bold' }}>Detalle del pedido </span> </h5>}</p>
                                    <p>{<span style={{ fontWeight: 'bold' }}></span>}  {detalle.articulo.denominacion}</p>

                                    <img style={{ maxWidth: "80px", objectFit: "contain" }}
                                        className="cart-img"
                                        src={`${detalle.articulo.imagenes[0].url}`}
                                        alt={detalle.articulo.denominacion}
                                    /> <br /> <br />
                                    <h5 style={{ fontWeight: 'bold' }}>Cantidad:</h5> {detalle.cantidad} <br />
                                    <h5 style={{ fontWeight: 'bold' }}>Subtotal:</h5> {detalle.subTotal}<br />
                                    <h4 style={{ fontWeight: 'bold' }}>Total:</h4> {selectedPedido.total}
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