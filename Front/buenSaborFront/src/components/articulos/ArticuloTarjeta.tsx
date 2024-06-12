import { useCarrito } from "../../hooks/UseCarrito";
import ArticuloDTO from "../../models/ArticuloDTO";
import ArticuloInsumo from "../../models/ArticuloInsumo";
import ArticuloManufacturado from "../../models/ArticuloManufacturado";
// import ArticuloManufacturadoDetalle from "../../models/ArticuloManufacturadoDetalle";
import { Button, Card, Image } from "react-bootstrap";
import "../../styles/ArticuloTarjeta.css";
import addCart from "../../assets/images/addCart.png";
import deleteCart from "../../assets/images/deleteCart.png";
import { getArticuloInsumoPorID } from "../../services/FuncionesArticuloInsumoApi";

type ArticuloParams = {
    articulo: ArticuloDTO;
}

export function ArticuloTarjeta(args: ArticuloParams) {
    const articulo = args.articulo;

    const { addCarrito, removeCarrito, cart, removeItemCarrito } = useCarrito();

    const verificaArticuloEnCarrito = (art: ArticuloDTO) => {
        return cart.some(item => item.articulo.id === art.id);
    }

    const isArticuloInCarrito = verificaArticuloEnCarrito(articulo);

    const checkStockAndToggleCarrito = async () => {
        if (articulo.type === "articuloInsumo") {
            const insumo: ArticuloInsumo = await getArticuloInsumoPorID(articulo.id);
            if (insumo.stockActual > 0) {
                toggleCarrito();
            } else {
                alert("No hay suficiente stock para este artículo.");
            }
        } else if (articulo.type === "articuloManufacturado") {
            const manufacturado: ArticuloManufacturado = articulo as ArticuloManufacturado;
            let suficienteStock = true;
            for (const detalle of manufacturado.articuloManufacturadoDetalles) {
                const insumo: ArticuloInsumo = await getArticuloInsumoPorID(detalle.id);
                if (insumo.stockActual < detalle.cantidad) {
                    suficienteStock = false;
                    break;
                }
            }
            if (suficienteStock) {
                toggleCarrito();
            } else {
                alert("No hay suficiente stock para uno o más componentes de este artículo manufacturado.");
            }
        }
    }

    const toggleCarrito = () => {
        isArticuloInCarrito
            ? removeCarrito(articulo)
            : addCarrito(articulo);
    };

    return (
        <Card className="m-4 mx-auto text-center articulo" style={{ width: '18rem' }}>
            <Card.Img variant="top" src={articulo.imagenes[0]?.url} alt={articulo.denominacion} className="card-img" />
            <Card.Body>
                <Card.Title>{articulo.denominacion}</Card.Title>
                <Card.Text>{`$${articulo.precioVenta}`}</Card.Text>
                <Card.Footer>
                    <p>
                        {
                            !isArticuloInCarrito
                                ? <a style={{ marginLeft: '20px', marginRight: '16px' }}>&nbsp;&nbsp;</a>
                                : <a className='iconoMasMenos' onClick={() => removeItemCarrito(articulo)}> - </a>
                        }

                        <Button className='colorFondoBlanco' onClick={checkStockAndToggleCarrito}>
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
    );
}
