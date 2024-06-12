import { useCarrito } from "../../hooks/UseCarrito";
import ArticuloDTO from "../../models/ArticuloDTO";
import { Button, Card, Image, Modal } from "react-bootstrap";
import "../../styles/ArticuloTarjeta.css";
import addCart from "../../assets/images/addCart.png";
import deleteCart from "../../assets/images/deleteCart.png";
import { useState } from "react";
import ArticuloManufacturado from "../../models/ArticuloManufacturado";
import { getArticuloManufacturadoPorID } from "../../services/FuncionesArticuloManufacturadoApi";

type ArticuloParams = {
    articulo: ArticuloDTO;
}

export function ArticuloTarjeta(args: ArticuloParams) {
    const articulo = args.articulo;

    const { addCarrito, removeCarrito, cart, removeItemCarrito } = useCarrito();

    const [showModalDetalles, setShowModalDetalles] = useState(false);
    const [selectedArticulo, setSelectedArticulo] = useState<ArticuloManufacturado>(new ArticuloManufacturado());

    const getArticuloManufacturado = async () => {
        const artM: ArticuloManufacturado = await getArticuloManufacturadoPorID(articulo.id)
        setSelectedArticulo(artM);
    };

    const verificaArticuloEnCarrito = (art: ArticuloDTO) => {
        return cart.some(item => item.articulo.id === art.id);
    }

    const isArticuloInCarrito = verificaArticuloEnCarrito(articulo);

    const toggleCarrito = () => {
        isArticuloInCarrito
            ? removeCarrito(articulo)
            : addCarrito(articulo);
    };

    const handleShowDetalles = () => {
        getArticuloManufacturado()
        setShowModalDetalles(true);
    }

    const handleCloseDetalles = () => {
        setShowModalDetalles(false);
    }

    return (
        <>
            <Card className="m-4 mx-auto text-center articulo" style={{ width: '18rem' }}>
                <Card.Img variant="top" src={articulo.imagenes[0]?.url} alt={articulo.denominacion} className="card-img" />
                <Card.Body>
                    <Card.Title>{articulo.denominacion}</Card.Title>
                    <Card.Text>{`$${articulo.precioVenta}`}</Card.Text>
                    {articulo.type === 'articuloManufacturado' ?
                        <Card.Text><Button className="btn btn-success" style={{
                            width: '150px', backgroundColor: '#e06f72',
                            border: '#e06f72', fontWeight: 'initial', color: 'whitesmoke'
                        }}
                            onClick={handleShowDetalles}>Detalle</Button></Card.Text>
                        : <Card.Text style={{ height: '36px' }}></Card.Text>
                    }
                    <Card.Footer>
                        <p>
                            {
                                !isArticuloInCarrito
                                    ? <a style={{ marginLeft: '20px', marginRight: '16px' }}>&nbsp;&nbsp;</a>
                                    : <a className='iconoMasMenos' onClick={() => removeItemCarrito(articulo)}> - </a>
                            }

                            <Button className='colorFondoBlanco' onClick={toggleCarrito}>
                                {
                                    isArticuloInCarrito
                                        ? <Image src={deleteCart} title='Quitar' />
                                        : <Image src={addCart} title='Comprar' />
                                }
                            </Button>

                            <a className='iconoMasMenos' onClick={() => addCarrito(articulo)}>
                                +
                            </a>
                        </p>
                    </Card.Footer>
                </Card.Body>
            </Card>

            <Modal show={showModalDetalles} onHide={handleCloseDetalles}>
                <Modal.Header closeButton>
                    <Modal.Title>{articulo.denominacion}</Modal.Title>
                </Modal.Header>
                {articulo.type === "articuloManufacturado" && (
                    <Modal.Body>
                        <h5>Preparación:</h5>
                        <p>{selectedArticulo.preparacion}</p>
                        <h5>Descripcion: </h5>
                        <p>{selectedArticulo.descripcion}</p>
                        <p> <strong>Tiempo Estimado: </strong>{selectedArticulo.tiempoEstimadoMinutos} minutos</p>
                        <p><strong>Ingredientes:</strong></p>
                        {selectedArticulo.articuloManufacturadoDetalles.length > 0 && (
                            <ul>
                                {selectedArticulo.articuloManufacturadoDetalles.map((detalle, index) => (
                                    <li key={index}>
                                        {detalle.articuloInsumo.denominacion} - Cantidad: {detalle.cantidad} {detalle.articuloInsumo.unidadMedida.denominacion}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </Modal.Body>
                )}
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseDetalles}>
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
