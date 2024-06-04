import { useCarrito } from "../../hooks/UseCarrito";
import ArticuloDTO from "../../models/ArticuloDTO";
import { Button, Card, Image } from "react-bootstrap";
import "../../styles/ArticuloTarjeta.css"
import addCart from "../../assets/images/addCart.png";
import deleteCart from "../../assets/images/deleteCart.png";

type ArticuloParams = {
    articulo: ArticuloDTO;
}



export function ArticuloTarjeta(args: ArticuloParams) {

    const articulo = args.articulo;

    const { addCarrito, removeCarrito, cart, removeItemCarrito } = useCarrito()

    const verificaArticuloEnCarrito = (art: ArticuloDTO) => {
        return cart.some(item => item.articulo.id === art.id)
    }

    const isArticuloInCarrito = verificaArticuloEnCarrito(articulo)

    const toggleCarrito = () => {
        isArticuloInCarrito
            ? removeCarrito(articulo)
            : addCarrito(articulo)
    };

    return (
        <Card className="m-4 mx-auto text-center articulo" style={{ width: '18rem' }}>
            <Card.Img variant="top" src={articulo.imagenes[0].url} alt={articulo.denominacion} className="card-img" />
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
    );
}


