import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


export function PromocionTarjeta() {
    const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate('/articulos');
    };

    return (
        <>
            <Card className="m-4 mx-auto text-center sucursal" style={{ width: '18rem', background: "black" }} onClick={handleButtonClick}>
                <Card.Img variant="top" src={`./promociones/promo1.jpg`} alt="promo1" className="card-img" />
                <Card.Body>
                    <Card.Title style={{ color: 'whitesmoke' }}>Domigos de Papas</Card.Title>
                    <Card.Text style={{ color: 'whitesmoke' }}>30% Off</Card.Text>
                    <Card.Text style={{ color: 'whitesmoke' }}>Exclusivo Local</Card.Text>
                </Card.Body>
            </Card>
            <Card className="m-4 mx-auto text-center sucursal" style={{ width: '18rem', background: "black" }} onClick={handleButtonClick}>
                <Card.Img variant="top" src={`./promociones/promo2.jpg`} alt="promo2" className="card-img" />
                <Card.Body>
                    <Card.Title style={{ color: 'whitesmoke' }}>Lunes</Card.Title>
                    <Card.Text style={{ color: 'whitesmoke' }}>Burguer Libre</Card.Text>
                    <Card.Text style={{ color: 'whitesmoke' }}>Exclusivo Local</Card.Text>
                </Card.Body>
            </Card>
            <Card className="m-4 mx-auto text-center sucursal" style={{ width: '18rem', background: "black" }} onClick={handleButtonClick}>
                <Card.Img variant="top" src={`./promociones/promo3.jpg`} alt="promo3" className="card-img" />
                <Card.Body>
                    <Card.Title style={{ color: 'whitesmoke' }}>Picada de Papas</Card.Title>
                    <Card.Text style={{ color: 'whitesmoke' }}>20% Off</Card.Text>
                    <Card.Text style={{ color: 'whitesmoke' }}>Exclusivo Local</Card.Text>
                </Card.Body>
            </Card>
            <Card className="m-4 mx-auto text-center sucursal" style={{ width: '18rem', background: "black" }} onClick={handleButtonClick}>
                <Card.Img variant="top" src={`./promociones/promo4.jpg`} alt="promo4" className="card-img" />
                <Card.Body>
                    <Card.Title style={{ color: 'whitesmoke' }}>Papas Libres</Card.Title>
                    <Card.Text style={{ color: 'whitesmoke' }}>--</Card.Text>
                    <Card.Text style={{ color: 'whitesmoke' }}>Exclusivo Local</Card.Text>
                </Card.Body>
            </Card>
        </>
    );
}
